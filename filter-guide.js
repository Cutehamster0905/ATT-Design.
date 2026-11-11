const fields = {
  lookup: ['订单 / 包裹 / 运单检索', '请输入订单号 / 包裹号 / 运单号'],
  store: ['店铺', '请选择店铺', ['耐克官方旗舰店', '阿迪达斯官方旗舰店', '李宁官方旗舰店']],
  reportDate: ['统计日期', '请选择统计日期', 'date'],
  createdDate: ['创建时间', '请选择创建时间', 'date'],
  exception: ['异常类型', '请选择异常类型', ['库存异常', '履约异常']],
  channel: ['物流渠道', '请选择物流渠道', ['标准配送', '快速配送']],
  fulfillment: ['履约状态', '请选择履约状态', ['待发货', '已发货', '已送达']],
};

const cases = [
  {
    title: '01 / 默认四列 · 不足四项保留空位',
    fields: ['store', 'reportDate', 'lookup'],
    note: '四列布局下保留第四个空位。选择店铺或日期后立即应用，文本检索按 Enter 触发。',
  },
  {
    title: '02 / 超过四项 · 依次换行',
    fields: ['lookup', 'store', 'createdDate', 'exception', 'channel', 'fulfillment'],
    note: '四列布局下，前四项占满第一行，其余字段依序换行。搜索和重置紧跟末项，同行时与控件底部对齐。',
  },
  {
    title: '03 / 四项筛选 · 操作换行',
    fields: ['lookup', 'store', 'createdDate', 'exception'],
    note: '字段占满一行时，按钮组整体移到下一行。行间距为 16px，按钮间距为 8px。',
  },
  {
    title: '单行 · 增加快筛',
    quick: true,
    fields: ['store', 'reportDate', 'lookup'],
    note: '快筛位于字段上方。筛选字段不超过 3 项时，选项变更即时生效，文本按 Enter 或搜索图标触发。',
  },
  {
    title: '双行 · 增加快筛',
    quick: true,
    fields: ['lookup', 'store', 'createdDate', 'exception', 'channel', 'fulfillment'],
    note: '快筛位于字段上方。筛选字段超过 3 项时，搜索与重置紧跟末项，与前一项间距 16px，按钮间距 8px，并与控件底部对齐。',
  },
];

function fieldMarkup(key) {
  const [label, placeholder, options] = fields[key];
  const control = Array.isArray(options)
    ? `<select name="${key}"><option value="">${placeholder}</option>${options.map(option => `<option>${option}</option>`).join('')}</select>`
    : `<input class="input" name="${key}" type="${options || 'text'}" placeholder="${placeholder}">`;
  return `<label class="field">${label}${control}</label>`;
}

export function filterGuide() {
  return `<div class="filter-guide-cases">${cases.map(example => {
    const manual = example.fields.length > 3;
    return `<div class="demo-frame">
      <div class="demo-stage vertical filter-case">
        <h2>${example.title}</h2>
        <form class="pattern-filters filter-case-grid" data-filter-case="${manual ? 'manual' : 'instant'}">
          ${example.quick ? `<div class="row" role="group" aria-label="快筛" style="grid-column:1 / -1;gap:12px">
            ${Array.from({length:9}, (_, index) => `<button type="button" class="chip${index ? '' : ' blue'}" data-quick-filter aria-label="${index ? '标签 '+index : '全部'}，1 项" aria-pressed="${index === 0}" style="height:32px;min-width:88px;justify-content:center;border-radius:100px">${index ? '标签' : '全部'} (1)</button>`).join('')}
          </div>` : ''}
          ${example.fields.map(fieldMarkup).join('')}
          ${manual ? `<div class="row filter-case-actions">
            <button class="btn primary" type="submit">搜索</button>
            <button class="btn" type="reset">重置</button>
          </div>` : ''}
        </form>
        <p class="filter-case-note">${example.note}</p>
        <span class="caption" data-filter-status role="status"></span>
      </div>
    </div>`;
  }).join('')}</div>`;
}

function applyFilters(form) {
  const count = [...new FormData(form).values()].filter(value => value.trim()).length;
  form.parentElement.querySelector('[data-filter-status]').textContent =
    count ? `已应用 ${count} 项筛选 · 回到第 1 页` : '已清空筛选 · 回到第 1 页';
}

document.addEventListener('submit', event => {
  if (!event.target.matches('[data-filter-case]')) return;
  event.preventDefault();
  applyFilters(event.target);
});

document.addEventListener('change', event => {
  const form = event.target.closest('[data-filter-case="instant"]');
  if (form && event.target.matches('select, .att-picker-input')) applyFilters(form);
});

document.addEventListener('reset', event => {
  if (!event.target.matches('[data-filter-case]')) return;
  event.target.parentElement.querySelector('[data-filter-status]').textContent = '已重置筛选 · 回到第 1 页';
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Enter' || event.isComposing || !event.target.matches('input[name="lookup"]')) return;
  const form = event.target.closest('[data-filter-case="instant"]');
  if (!form) return;
  event.preventDefault();
  form.requestSubmit();
});

document.addEventListener('click', event => {
  const button = event.target.closest('[data-quick-filter]');
  if (!button) return;
  for (const option of button.parentElement.querySelectorAll('[data-quick-filter]')) {
    option.classList.toggle('blue', option === button);
    option.setAttribute('aria-pressed', String(option === button));
  }
  const status = button.closest('.filter-case').querySelector('[data-filter-status]');
  status.textContent = `快筛：${button.getAttribute('aria-label')} · 回到第 1 页`;
});
