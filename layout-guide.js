const reference = 'https://ant.design/docs/spec/layout-cn/';

function gridExample(spans) {
  return `<div class="att-grid-row layout-guide-grid">${spans.map(span =>
    `<div class="att-grid-cell" style="grid-column:span ${span}">${span}/24</div>`
  ).join('')}</div>`;
}

export function layoutExample(index, demo, patternFilter) {
  switch (index) {
    case 1:
      return demo('Layout');
    case 2:
      return `<div class="demo-layout layout-guide-centered">
        <header>ATT · 顶部导航 60px</header>
        <div><article>居中内容区<br><span class="caption">两侧最小留白 24px</span></article></div>
      </div>`;
    case 4:
      return `<div class="layout-guide-stack">${[[24], [12,12], [8,8,8], [6,6,6,6]].map(gridExample).join('')}</div>`;
    case 5:
      return `<div class="layout-guide-stack">
        <div class="api-scroll"><table class="api-table">
          <thead><tr><th scope="col">可用宽度</th><th scope="col">列数</th><th scope="col">字段跨度</th></tr></thead>
          <tbody><tr><td>≥ 960px</td><td>4 列</td><td>6/24</td></tr>
          <tr><td>≥ 480px 且 &lt; 960px</td><td>2 列</td><td>12/24</td></tr>
          <tr><td>&lt; 480px</td><td>1 列</td><td>24/24</td></tr></tbody>
        </table></div>
        ${patternFilter('筛选示例 · 调整窗口宽度查看换行')}
        <p><a href="#/component/Grid">在 Grid 中调整容器宽度，查看四列、两列和单列 →</a></p>
      </div>`;
    case 6:
      return `<div class="api-scroll"><table class="api-table">
        <thead><tr><th scope="col">间距</th><th scope="col">ATT 使用场景</th></tr></thead>
        <tbody><tr><td>4px</td><td>紧凑元素间距</td></tr>
        <tr><td>8px</td><td>标签到控件、控件到帮助或错误提示、图文、同组按钮</td></tr>
        <tr><td>12px</td><td>表格单元格内边距</td></tr>
        <tr><td>16px</td><td>同级卡片、筛选行列、表单字段、标题到表单或表格</td></tr>
        <tr><td>24px</td><td>页面与卡片内边距、表单到按钮组</td></tr>
        <tr><td>32 / 48px</td><td>独立业务分组 / 长页面章节（场景扩展值）</td></tr></tbody>
      </table></div>`;
    case 7:
      return `<p><a href="${reference}" target="_blank" rel="noreferrer">参考来源 · Ant Design 布局 ↗</a></p>`;
    default:
      return '';
  }
}
