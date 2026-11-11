const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = new URL('./pagination.css', import.meta.url);
document.head.append(stylesheet);

export function pagination({ total, page, pageSize, unit = '条' }) {
  const last = Math.max(1, Math.ceil(total / pageSize));
  const start = Math.max(2, Math.min(page - 1, last - 4));
  const pages = last <= 7 ? Array.from({length:last}, (_, i) => i + 1)
    : [1, ...(start > 2 ? ['…'] : []), ...Array.from({length:4}, (_, i) => start + i),
      ...(start + 4 < last ? ['…'] : []), last];
  const arrow = (direction, target, label) => `<button type="button" class="att-pagination-item" data-pagination-page="${target}" aria-label="${label}" ${target < 1 || target > last ? 'disabled' : ''}><span class="att-pagination-arrow ${direction}" aria-hidden="true"></span></button>`;
  return `<div class="att-pagination" role="group" aria-label="分页">
    <span>共 ${total} ${unit}</span>
    ${arrow('prev',page - 1,'上一页')}
    ${pages.map(n => n === '…' ? '<span class="att-pagination-item" aria-hidden="true">···</span>' : `<button type="button" class="att-pagination-item" data-pagination-page="${n}" aria-label="第 ${n} 页" ${n === page ? 'aria-current="page"' : ''}>${n}</button>`).join('')}
    ${arrow('next',page + 1,'下一页')}
    <select class="att-pagination-size" aria-label="每页条数" data-pagination-size>
      ${[10,20,50].map(n => `<option value="${n}" ${n === pageSize ? 'selected' : ''}>${n}条/页</option>`).join('')}
    </select>
    <form class="att-pagination-jump" data-pagination-jump>
      <label>跳至 <input type="number" name="page" min="1" max="${last}" step="1" required aria-label="跳至页码，按回车确认" ${last === 1 ? 'disabled' : ''}></label>
    </form>
  </div>`;
}

export function bindPagination(root, update) {
  root.addEventListener('click', event => {
    const button = event.target.closest('button[data-pagination-page]');
    if (!button || button.disabled) return;
    update(Number(button.dataset.paginationPage));
    root.querySelector('[aria-current="page"]')?.focus();
  });
  root.addEventListener('change', event => {
    if (!event.target.matches('[data-pagination-size]')) return;
    update(1, Number(event.target.value));
    root.querySelector('[data-pagination-size]')?.focus();
  });
  root.addEventListener('submit', event => {
    if (!event.target.matches('[data-pagination-jump]')) return;
    event.preventDefault();
    const input = event.target.elements.namedItem('page');
    if (!input.checkValidity()) return;
    update(input.valueAsNumber);
    root.querySelector('[aria-current="page"]')?.focus();
  });
}
