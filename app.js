import {filterGuide} from './filter-guide.js';
import {layoutExample} from './layout-guide.js';
import {colorUsageGuide} from './color-guide.js';
import {mountControls} from './att-controls.js';
import {components,groups,guides,FIGMA,findComponent} from './catalog.js';
import {demo,esc,toast,mountDemos,disposeDemos,bindDemoEvents} from './demos.js';
let audit=[];try{const response=await fetch('./figma-audit.json');if(response.ok)audit=(await response.json()).filter(p=>p.id!=='28:34')}catch{}
let figmaSync=null;try{const response=await fetch('./figma-supplements.json');if(response.ok){figmaSync=await response.json();for(const entry of figmaSync.components){const c=components.find(c=>c.id===entry.id);if(c){c.page=entry.page;c.review=entry.review;c.synced=true;c.designKind=entry.componentSet?'component':'integration';}}for(const entry of figmaSync.guides){const g=guides.find(g=>g.id===entry.id);if(g){g.page=entry.page;g.review=entry.review;g.source='ATT Figma · 同步补充指南';}}}}catch{}
const $=s=>document.querySelector(s);const content=$('#content');let category='全部',query='',tab='examples';
const existing=components.filter(c=>c.status==='existing'),supplements=components.filter(c=>c.status==='supplement');
const sourceLink=c=>c.page?`${FIGMA}?node-id=${(c.visualSourcePage||c.page).replace(':','-')}`:'';
function status(c){return `<span class="chip ${c.status==='existing'?'green':'blue'}">${c.status==='existing'?'Figma 已有':c.synced?'已同步 Figma · 补充':'Web 补充'}</span>`}
function auditOf(c){const original=audit.find(a=>a.id===c.page);if(original)return original;const entry=figmaSync?.components.find(r=>r.id===c.id);return entry?{id:entry.page,sets:entry.componentSet?[{id:entry.componentSet,name:c.id,count:entry.variants.length}]:[],notes:[]}:null}
const footer=()=>`<footer class="page-footer"><span>ATT Design · Web / Figma · 2026-11-02</span><button class="btn" type="button" data-share-page>复制分享链接</button><a href="#/guide/spacing">圆角与投影遵循 ATT 规范 ↗</a></footer>`;
function pageHead(title,intro,meta='',eyebrow='ATT DESIGN / WEB'){return `<header class="page-head"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="page-intro">${intro}</p>${meta?`<div class="meta-row">${meta}</div>`:''}</header>`}
function sideNav(){const guideMode=location.hash.startsWith('#/guide/');let html=`<a class="side-link" href="#/overview">组件总览 <small>${components.length}</small></a><a class="side-link" href="#/coverage">补充清单 <small>${supplements.length}</small></a>`;if(guideMode){html+=`<div class="side-group">设计指南</div>`+guides.map(g=>`<a class="side-link" href="#/guide/${g.id}">${g.title}</a>`).join('')}else{for(const g of groups){const items=components.filter(c=>c.group===g&&(!query||(c.id+' '+c.zh).toLowerCase().includes(query.toLowerCase())));if(!items.length)continue;html+=`<div class="side-group">${g} <span>${items.length}</span></div>`+items.map(c=>`<a class="side-link" href="#/component/${c.id}"><span>${c.id} <small>${c.zh}</small></span>${c.status==='supplement'?'<i class="new-dot" title="Web补充"></i>':''}</a>`).join('')}}$('#sidebar-nav').innerHTML=html;document.querySelectorAll('.side-link').forEach(n=>n.classList.toggle('active',n.getAttribute('href')===location.hash));}
function toc(items){$('#toc').innerHTML='<strong>本页目录</strong>'+items.map(([id,name])=>`<a href="#${id}" data-toc="${id}">${name}</a>`).join('')}
function tile(c){return `<a class="component-tile" href="#/component/${c.id}" aria-label="${c.id} ${c.zh}"><div class="tile-preview" aria-hidden="true" inert>${demo(c.id,{mini:true}).replace(/<a\b[^>]*>/g,"<span>").replace(/<\/a>/g,"</span>")}</div><div class="tile-footer">${c.id}<small>${c.zh}</small>${c.status==='supplement'?'<i class="new-dot" title="Web补充"></i>':''}</div></a>`}
function renderCatalog(){const available=components.filter(c=>(category==='全部'||category==='已有设计'&&c.status==='existing'||category==='新增补充'&&c.status==='supplement')&&(!query||(c.id+' '+c.zh+' '+c.group).toLowerCase().includes(query.toLowerCase())));const el=$('#catalog-list');if(!el)return;el.innerHTML=available.length?groups.map(g=>{const items=available.filter(c=>c.group===g);return items.length?`<section id="group-${groups.indexOf(g)}"><div class="section-heading"><h2>${g}</h2><small>${items.length}</small></div><div class="component-grid">${items.map(tile).join('')}</div></section>`:''}).join(''):'<div class="empty">没有匹配的组件，请调整搜索条件。</div>';mountControls(el);const counter=$('#catalog-counter');if(counter)counter.textContent=`显示 ${available.length} / ${components.length} 个组件`;toc(groups.filter(g=>available.some(c=>c.group===g)).map(g=>['group-'+groups.indexOf(g),g]));}
function overview(){content.innerHTML=pageHead('组件总览','用一致的组件，构建清晰可靠的业务体验。以 ATT 为视觉基础，覆盖 Web 产品的设计、交互与实现。',`<span class="chip green">${existing.length} 类原有组件</span><span class="chip blue">${supplements.length} 类 Web 补充</span><span class="chip">${guides.length} 篇设计指南</span>`)+`<div class="hero-panel"><div><h2>从设计规则，到可操作的组件</h2><p>原有组件直接关联 Figma；新增组件沿用 ATT 的字号、颜色、圆角与投影。示例可操作，规则可查，来源可追溯。</p><div class="count-row"><span><strong>8</strong>px 常规圆角</span><span><strong>4</strong>px 间距基准</span><span><strong>24</strong>栅格体系</span></div></div><div class="hero-marks" aria-hidden="true">${'<i></i>'.repeat(9)}</div></div><div class="catalog-toolbar"><div class="filters" aria-label="组件来源筛选">${['全部','已有设计','新增补充'].map(s=>`<button class="filter ${s===category?'active':''}" data-filter="${s}" aria-pressed="${s===category}">${s}</button>`).join('')}</div><input class="input catalog-search" id="catalog-search" type="search" placeholder="搜索组件名称，如 Button / 按钮" aria-label="搜索组件" value="${esc(query)}"></div><p class="caption" id="catalog-counter"></p><div id="catalog-list"></div>`+footer();renderCatalog()}
function apiTable(c){const rows=c.api.split(';').map(s=>s.split('|'));return `<div class="api-scroll"><table class="api-table"><thead><tr><th>属性</th><th>类型 / 可选值</th><th>默认值</th></tr></thead><tbody>${rows.map(([a,b,d])=>`<tr><td><code>${esc(a)}</code></td><td>${esc(b)}</td><td><code>${esc(d)}</code></td></tr>`).join('')}</tbody></table></div>`}
function component(id){const c=findComponent(id);if(!c)return notFound();const a=auditOf(c);const count=a?.sets.reduce((n,s)=>n+s.count,0);const actualNote=a?.notes?.find(s=>!s.includes('规范')&&!s.includes('本页包含')&&!s.includes('检查要点'));content.innerHTML=`<header class="page-head"><div class="eyebrow">组件 / ${c.group}</div><div class="page-head-top"><h1>${c.id}<span class="title-zh">${c.zh}</span></h1>${c.page?`<a class="btn" href="${sourceLink(c)}" target="_blank" rel="noreferrer">在 Figma 中查看 ↗</a>`:''}</div><p class="page-intro">${c.desc}</p><div class="meta-row">${status(c)}<span class="chip">Web</span>${a?`<span class="chip">${a.sets.length} 个组件集合 · ${count} 个设计变体</span>`:''}</div></header><div class="doc-tabs" role="tablist" aria-label="组件文档类型">${[['examples','使用与演示'],['design','设计规范'],['api','Web 参数']].map(([key,label])=>`<button role="tab" data-doc-tab="${key}" aria-selected="${tab===key}" class="${tab===key?'active':''}">${label}</button>`).join('')}</div><div id="component-body"></div>`+footer();const body=$('#component-body');
if(tab==='design'){body.innerHTML=`<section class="doc-section" id="design-rule"><h2>设计规则</h2><p>${c.rule}</p></section>${actualNote?`<div class="notice"><strong>Figma 原说明</strong><br>${esc(actualNote)}</div>`:''}<div class="spec-grid"><div class="spec-card"><h3>尺寸与排版</h3><p>通用控件文字14/22、默认高32px。Tag、Checkbox、Switch等专用组件，以本页设计规则及原稿实际尺寸为准。</p><code>Card 18/26 Medium</code></div><div class="spec-card"><h3>圆角</h3><p>常规8px，紧凑6px，胶囊100px。保留原组件定义的专用外形。</p><code>radius / 8 · 6 · 100</code></div><div class="spec-card"><h3>投影</h3><p>卡片仅外层三层阴影；浮层12%，弹窗18%。不引入 Ant Design 默认阴影。</p><a href="#/guide/shadow">查看投影规范 →</a></div></div><section class="doc-section" id="states"><h2>状态与行为</h2><ul class="rule-list"><li>交互组件提供默认、悬停、聚焦、激活、禁用；录入类补充只读与错误。</li><li>异步操作提供加载与失败反馈，保留输入内容，防止重复提交。</li><li>键盘焦点可见，状态同时提供文字，支持减少动态效果。</li></ul></section><section class="doc-section" id="provenance"><h2>来源与补充边界</h2><p>${c.status==='existing'?'该组件已在 ATT Figma 中存在。网站是 Web 示例实现，当前仅覆盖本页展示的交互，不等于已实现全部 '+count+' 个设计变体。':c.synced?(c.designKind==='component'?'该组件为本次 ATT 补充，已同步新增 Figma 主组件、状态变体、实例示例与规范说明。网站覆盖本页展示的基础交互。':'此项为非视觉接入能力，已同步到 Figma 独立说明页，明确配置契约与示例，不作为可见 UI 主组件。'):'该组件未在本次 ATT 页面目录中发现，属于本网站补充设计与 Web 示例。沿用已有 ATT 变量与视觉规则，尚不代表 Figma 已新增主组件。'}</p></section>`;toc([['design-rule','设计规则'],['states','状态与行为'],['provenance','来源与边界']]);}
else if(tab==='api'){body.innerHTML=`<section class="doc-section" id="api"><h2>Web 参数</h2><div class="notice">下表描述本网站 Web 示例的配置建议，不是已发布 npm 包的 API，也不是 Ant Design API 的完整复刻。</div>${apiTable(c)}</section><section class="doc-section" id="events"><h2>交互约定</h2><ul class="rule-list"><li>输入事件只更新当前内容；业务提交由调用方处理。</li><li>弹层关闭不丢弃未提交内容；危险操作显式确认。</li><li>程序输出使用安全文本，事件监听使用标准 DOM API。</li></ul></section>`;toc([['api','Web 参数'],['events','交互约定']]);}
else{const snippet=demo(c.id);body.innerHTML=`<section class="doc-section" id="when"><h2>何时使用</h2><p>${c.rule}</p></section><section class="doc-section" id="examples"><h2>代码演示</h2><div class="demo-frame"><div class="demo-stage">${snippet}</div><div class="demo-description"><h3>基础用法</h3><p>${c.desc}${c.status==='supplement'?' 本示例为 ATT Web / Figma 同步补充。':''}</p></div><div class="demo-tools"><button data-copy-code>复制示例</button><button data-toggle-code aria-expanded="false">〈 / 〉 查看代码</button></div><pre id="example-code" hidden><code>${esc(snippet)}</code></pre></div></section><section class="doc-section" id="notes"><h2>使用建议</h2><ul class="rule-list"><li>${c.rule}</li><li>保留原组件的文字、圆角和投影层级，使用语义颜色表示状态。</li><li>例子仅作用于浏览器当前页面，不发送真实业务请求。</li></ul></section><section class="doc-section" id="api"><h2>Web 参数</h2>${apiTable(c)}</section>`;toc([['when','何时使用'],['examples','代码演示'],['notes','使用建议'],['api','Web 参数']]);mountDemos();}}
function designVisual(id){if(id==='color')return colorUsageGuide();if(id==='typography')return [['页面标题',32,44],['区块标题',24,36],['卡片标题',18,26],['正文内容',16,26],['控件文字',14,22],['辅助说明',12,20]].map(([name,size,line])=>`<div class="type-sample"><span style="font-size:${size}px;line-height:${line}px;color:var(${size>=18?'--att-color-text-primary':size===12?'--att-color-text-tertiary':'--att-color-text-body'});font-weight:${size>=24?700:size===18?500:400}">${name} · ATT Design</span><small>${size} / ${line}</small></div>`).join('');if(id==='shadow')return `<div class="spec-grid">${[['卡片','--att-shadow-card'],['浮层','--att-shadow-popover'],['弹窗','--att-shadow-modal']].map(([s,v])=>`<div class="shadow-sample" style="box-shadow:var(${v})"><h3>${s}</h3><code>${v}</code></div>`).join('')}</div>`;if(id==='spacing')return `<div class="spec-grid">${[6,8,100].map(n=>`<div class="spec-card"><div style="width:64px;height:64px;border-radius:${n}px;background:var(--selected);border:1px solid var(--border)"></div><h3 style="margin-top:16px">${n}px 圆角</h3></div>`).join('')}</div>`;if(id==='motion')return `<div class="demo-frame"><div class="demo-stage">${demo('Dropdown')}${demo('Modal')}${demo('Loading')}</div><div class="demo-description"><p>点击查看展开、弹层与加载反馈。系统设置减少动态效果时自动停用非必要过渡。</p></div></div>`;if(id==='form')return `<div class="demo-frame"><div class="demo-stage">${demo('Form',{extendedForm:true})}</div></div>`;if(id==='filter')return filterGuide();return ''}

function pageFrameworkPreview(withTabs) {
  const menu = withTabs
    ? ['首页','商品管理','交易','物流','营销活动','联盟营销','生意参谋','合规中心','资金账户','店铺','成长中心']
    : ['首页','商品','竞价','交易','物流','店铺','营销','推广','B2B2CC中心','资金','账号认证','生意参谋','体检'];
  return `<div class="demo-frame" style="overflow:auto">
    <div style="min-width:640px;background:var(--canvas)">
      <header class="row" style="height:60px;padding:0 24px;justify-content:space-between;background:var(--surface)">
        <div class="row"><img src="assets/att-logo.svg" width="32" height="28" alt=""><strong>TT跨境电商</strong></div>
        <span class="caption">消息　通知　林晓 · 主管</span>
      </header>
      <div style="display:grid;grid-template-columns:196px minmax(0,1fr)">
        <aside class="stack" aria-label="侧栏示例" style="padding:8px;gap:4px">
          ${menu.map((label,index)=>`<span class="side-link${index===0?' active':''}">${label}</span>`).join('')}
        </aside>
        <div style="padding:24px;background:linear-gradient(90deg,var(--att-color-brand-soft),transparent) top left/100% 24px no-repeat,linear-gradient(var(--att-color-brand-soft),transparent) top left/24px 100% no-repeat">
          ${withTabs ? '<div class="caption">首页 › 新闻</div>' : ''}
          <div style="font-size:24px;line-height:36px;font-weight:700">标题</div>
          ${withTabs ? '<div class="tabs-demo"><button type="button" class="active" aria-pressed="true" data-framework-tab>Tab 1</button><button type="button" aria-pressed="false" data-framework-tab>Tab 2</button><button type="button" aria-pressed="false" data-framework-tab>Tab 3</button><button type="button" aria-pressed="false" data-framework-tab>Tab 4</button></div>' : ''}
          <div style="padding-top:16px;background:linear-gradient(90deg,var(--att-success-border),transparent) top/100% 16px no-repeat">
            <div class="demo-frame" style="background:var(--surface);padding:24px;min-height:144px">
              <span class="caption">蓝色区域标注页面外边距 24px，绿色区域标注内容间距 16px。</span>
            </div>
          </div>
          <div style="padding-top:16px;background:linear-gradient(90deg,var(--att-success-border),transparent) top/100% 16px no-repeat">
            <div class="demo-frame" style="background:var(--surface);min-height:144px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

document.addEventListener('click', event => {
  const tab = event.target.closest('[data-framework-tab]');
  if (!tab) return;
  for (const item of tab.parentElement.children) {
    item.classList.toggle('active', item === tab);
    item.setAttribute('aria-pressed', String(item === tab));
  }
});


function pageFrameworkPreview(withTabs) {
  const menu = withTabs
    ? ['首页','商品管理','交易','物流','营销活动','联盟营销','生意参谋','合规中心','资金账户','店铺','成长中心']
    : ['首页','商品','竞价','交易','物流','店铺','营销','推广','B2B2CC中心','资金','账号认证','生意参谋','体检'];
  return `<div class="demo-frame" style="overflow:auto">
    <div style="min-width:640px;background:var(--canvas)">
      <header class="row" style="height:60px;padding:0 24px;justify-content:space-between;background:var(--surface)">
        <div class="row"><img src="assets/att-logo.svg" width="32" height="28" alt=""><strong>TT跨境电商</strong></div>
        <span class="caption">消息　通知　林晓 · 主管</span>
      </header>
      <div style="display:grid;grid-template-columns:196px minmax(0,1fr)">
        <aside class="stack" aria-label="侧栏示例" style="padding:8px;gap:4px">
          ${menu.map((label,index)=>`<span class="side-link${index===0?' active':''}">${label}</span>`).join('')}
        </aside>
        <div style="padding:24px;background:linear-gradient(90deg,var(--att-color-brand-soft),transparent) top left/100% 24px no-repeat,linear-gradient(var(--att-color-brand-soft),transparent) top left/24px 100% no-repeat">
          ${withTabs ? '<div class="caption">首页 › 新闻</div>' : ''}
          <div style="font-size:24px;line-height:36px;font-weight:700">标题</div>
          ${withTabs ? '<div class="tabs-demo"><button type="button" class="active" aria-pressed="true" data-framework-tab>Tab 1</button><button type="button" aria-pressed="false" data-framework-tab>Tab 2</button><button type="button" aria-pressed="false" data-framework-tab>Tab 3</button><button type="button" aria-pressed="false" data-framework-tab>Tab 4</button></div>' : ''}
          <div style="padding-top:16px;background:linear-gradient(90deg,var(--att-success-border),transparent) top/100% 16px no-repeat">
            <div class="demo-frame" style="background:var(--surface);padding:24px;min-height:144px">
              <span class="caption">蓝色区域标注页面外边距 24px，绿色区域标注内容间距 16px。</span>
            </div>
          </div>
          <div style="padding-top:16px;background:linear-gradient(90deg,var(--att-success-border),transparent) top/100% 16px no-repeat">
            <div class="demo-frame" style="background:var(--surface);min-height:144px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

document.addEventListener('click', event => {
  const tab = event.target.closest('[data-framework-tab]');
  if (!tab) return;
  for (const item of tab.parentElement.children) {
    item.classList.toggle('active', item === tab);
    item.setAttribute('aria-pressed', String(item === tab));
  }
});

function guide(id){const g=guides.find(g=>g.id===id);if(!g)return notFound();content.innerHTML=pageHead(g.title,g.intro,`<span class="chip">${g.source}</span>${g.page?`<a href="${FIGMA}?node-id=${g.page.replace(':','-')}" target="_blank" rel="noreferrer">Figma 指南 ↗</a>`:''}`,'ATT DESIGN / 设计指南')+`<article class="design-article${id==='layout'?' layout-guide':id==='filter'?' filter-guide':''}">${designVisual(id)}${g.sections.map(([title,text],i)=>`<section id="guide-${i}"><h2>${title}</h2><p>${text}</p>${id==='layout'?layoutExample(i, demo, patternFilter):id==='page-framework'&&i<2?pageFrameworkPreview(i===0):''}</section>`).join('')}${id==='motion'?'<div class="notice">参考来源：<a href="https://ant.design/docs/spec/motion-cn/" target="_blank" rel="noreferrer">Ant Design 动效原则 ↗</a>。100/200/300ms为本网站补充建议值。</div>':''}<section id="related"><h2>相关组件</h2><div class="row">${(id==='form'?['Input','Select','Radio','Checkbox','Switch','Transfer','Upload','Form']:id==='motion'?['Dropdown','Modal','Drawer']:id==='shadow'?['Card','Popover','Modal']:id==='typography'?['Typography','Card']:['Grid','Layout','Button']).map(cid=>`<a class="btn" href="#/component/${cid}">${cid}</a>`).join('')}</div></section></article>`+footer();toc([...g.sections.map(([title],i)=>['guide-'+i,title]),['related','相关组件']]);mountDemos()}
function patternFilter(caption='四列筛选 · 列间16px · 标签间8px · 默认控件32px'){return `<div class="demo-frame"><div class="demo-stage vertical"><div class="pattern-filters" style="width:100%">${['店铺名称','销售国家','履约仓','经营日期'].map((s,i)=>`<label class="field">${s}${i===0?'<input class="input" placeholder="请输入店铺名称">':i===3?'<input class="input" type="date" value="2026-10-29">':`<select><option>全部${s}</option><option>${i===1?'德国':'柏林仓'}</option><option>${i===1?'法国':'巴黎仓'}</option></select>`}</label>`).join('')}</div><div class="row" style="gap:8px"><button class="btn primary" data-message="已应用示例筛选">搜索</button><button class="btn" data-pattern-reset>重置</button></div></div><div class="demo-description"><p>${caption}</p></div></div>`}
function patterns(){content.innerHTML=pageHead('业务模式','把原有组件组合为可复用的任务路径，连接设计规范与实际业务。',`<span class="chip">已有 ATT 规范</span><span class="chip blue">组合示例</span>`)+`<section class="doc-section" id="pattern-filter"><h2>列表筛选</h2><p><a href="#/guide/filter">查看列表筛选的容器使用规则</a>。</p>${patternFilter()}</section><section class="doc-section" id="pattern-form"><h2>新建与编辑</h2><div class="demo-frame"><div class="demo-stage">${demo('Form')}</div></div></section><section class="doc-section" id="pattern-table"><h2>表格与反馈</h2><div class="demo-frame"><div class="demo-stage">${demo('Table')}</div></div></section>`+footer();toc([['pattern-filter','列表筛选'],['pattern-form','新建与编辑'],['pattern-table','表格与反馈']]);mountDemos()}
function coverage(){const sets=audit.reduce((n,a)=>n+a.sets.length,0),variants=audit.reduce((n,a)=>n+a.sets.reduce((s,c)=>s+c.count,0),0);content.innerHTML=pageHead('补充清单','以当前 ATT Figma 目录为基础，对照 Ant Design Web 组件分类，明确原有能力与补充内容。',`<span class="chip">核对日期 2026-11-01</span><span class="chip">${audit.length} 个原有组件页已读取</span>`)+`<div class="spec-grid"><div class="spec-card"><h3>${existing.length} 类原有组件</h3><p>${sets} 个组件集合，${variants.toLocaleString()} 个设计变体。包含辅助元件，不作为 Web 已实现数量。</p></div><div class="spec-card"><h3>${supplements.length} 类 Web 补充</h3><p>补充布局、辅助导航、内容展示与应用容器，复用 ATT 视觉规则。</p></div><div class="spec-card"><h3>4 类设计说明补充</h3><p>设计原则、动效、无障碍、内容文案。已有规则优先引用。</p></div></div><section class="doc-section" id="added"><h2>新增 Web 组件</h2><div class="notice">以下为本次新增补充：已同步15套 Figma 主组件及45个状态变体，另有 App 非视觉能力说明页；设计规则与基础Web示例可双向查看。生产级完整API、全变体、兼容性与自动化无障碍验证不在当前演示覆盖内。</div><div class="api-scroll"><table class="api-table"><thead><tr><th>组件</th><th>补充目的</th><th>查看</th></tr></thead><tbody>${supplements.map(c=>`<tr><td>${c.id} ${c.zh}</td><td>${c.desc}</td><td><a href="#/component/${c.id}">Web →</a>${c.page?` · <a href="${sourceLink(c)}" target="_blank" rel="noreferrer">Figma ↗</a>`:''}</td></tr>`).join('')}</tbody></table></div></section><section class="doc-section" id="original"><h2>原有 Figma 资产</h2><p>保留 Card、Form、QuickFilter 等原组件分类；Tab 对应 Ant Design 的 Tabs，Loading 对应 Spin，不重复新增同义组件。</p><div class="api-scroll" style="margin-top:16px"><table class="api-table"><thead><tr><th>组件</th><th>设计集合</th><th>设计变体</th><th>设计来源</th></tr></thead><tbody>${existing.map(c=>{const a=auditOf(c);return `<tr><td><a href="#/component/${c.id}">${c.id}</a></td><td>${a?.sets.length??'—'}</td><td>${a?.sets.reduce((s,r)=>s+r.count,0)??'—'}</td><td><a href="${sourceLink(c)}" target="_blank" rel="noreferrer">Figma ↗</a></td></tr>`}).join('')}</tbody></table></div></section><section class="doc-section" id="references"><h2>参考与边界</h2><ul class="rule-list"><li><a href="${FIGMA}" target="_blank" rel="noreferrer">ATT Figma 组件库</a>是视觉来源。</li><li><a href="https://ant.design/components/overview-cn/" target="_blank" rel="noreferrer">Ant Design 组件总览</a>用于分类与能力对照，不引入 antd 依赖。</li><li><a href="https://ant.design/docs/spec/motion-cn/" target="_blank" rel="noreferrer">Ant Design 动效原则</a>用于交互参考，圆角和投影保持 ATT。</li><li>本网站为本地 HTML/CSS/JavaScript 文档和交互示例，不是已发布 npm SDK。</li></ul></section>`+footer();toc([['added','新增 Web 组件'],['original','Figma 原有资产'],['references','参考与边界']]);}
function notFound(){content.innerHTML=pageHead('未找到页面','该文档入口不存在。')+'<a class="btn primary" href="#/overview">返回组件总览</a>';toc([])}
function route(){disposeDemos();const parts=location.hash.slice(2).split('/');if(!location.hash||location.hash==='#'){history.replaceState(null,'','#/overview');parts[0]='overview'}const [type,id]=parts;query='';$('#side-search').value='';sideNav();document.querySelectorAll('[data-nav]').forEach(n=>n.classList.toggle('active',n.dataset.nav===(type==='component'||type==='overview'?'components':type==='guide'?'guide':type)));document.querySelector('#notification').hidden=true;document.querySelector('#demo-dialog').close();if(type==='overview')overview();else if(type==='component')component(id);else if(type==='guide')guide(id);else if(type==='patterns')patterns();else if(type==='coverage')coverage();else notFound();document.title=(type==='component'?(findComponent(id)?.zh||'组件'):type==='guide'?(guides.find(g=>g.id===id)?.title||'设计指南'):type==='patterns'?'业务模式':type==='coverage'?'补充清单':'组件总览')+' · ATT Design';window.scrollTo({top:0,behavior:'instant'});}
function search(value=''){const q=value.trim().toLowerCase();const hits=[...components.map(c=>({name:c.id+' '+c.zh,group:c.group,href:'#/component/'+c.id})),...guides.map(g=>({name:g.title,group:'设计指南',href:'#/guide/'+g.id}))].filter(x=>!q||(x.name+' '+x.group).toLowerCase().includes(q));$('#search-results').innerHTML=hits.length?hits.map(x=>`<a href="${x.href}" data-search-result><span>${esc(x.name)}</span><small>${x.group} ↗</small></a>`).join(''):'<div class="empty">没有匹配结果</div>'}
function openSearch(){$('#search-dialog').showModal();$('#global-search').value='';search();$('#global-search').focus()}
bindDemoEvents();$('#open-search').addEventListener('click',openSearch);$('#global-search').addEventListener('input',e=>search(e.target.value));$('#side-search').addEventListener('input',e=>{query=e.target.value;sideNav();if(location.hash==='#/overview')renderCatalog()});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}if(e.key==='Enter'&&e.target.id==='global-search'){$('#search-results a')?.click()}});
document.addEventListener('input',e=>{if(e.target.id==='catalog-search'){query=e.target.value;renderCatalog()}});
document.addEventListener('click',async e=>{const n=e.target.closest('button,a');if(!n)return;
if(n.hasAttribute('data-share-page')){
  const url = new URL(location.href);
  url.search = '';
  try {
    await navigator.clipboard.writeText(url.href);
    toast('已复制当前页面链接');
  } catch {
    window.prompt('复制当前页面链接', url.href);
  }
  return;
}
if(n.dataset.toc){e.preventDefault();document.getElementById(n.dataset.toc)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'})}if(n.dataset.filter){category=n.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===n);b.setAttribute('aria-pressed',String(b===n))});renderCatalog()}if(n.dataset.docTab){tab=n.dataset.docTab;component(location.hash.split('/')[2])}if(n.hasAttribute('data-search-result'))$('#search-dialog').close();if(n.hasAttribute('data-toggle-code')){const code=$('#example-code');code.hidden=!code.hidden;n.setAttribute('aria-expanded',String(!code.hidden));n.textContent=code.hidden?'〈 / 〉 查看代码':'〈 / 〉 收起代码'}if(n.hasAttribute('data-copy-code')){try{await navigator.clipboard.writeText($('#example-code').textContent);toast('示例代码已复制')}catch{const code=$('#example-code');code.hidden=false;const range=document.createRange();range.selectNodeContents(code);getSelection().removeAllRanges();getSelection().addRange(range);toast('已选中示例代码，请按 Ctrl/Cmd+C 复制')}}if(n.hasAttribute('data-pattern-reset')){const box=n.closest('.demo-stage');box.querySelectorAll('input').forEach(i=>i.value=i.classList.contains('att-picker-input')?i.defaultValue:'');box.querySelectorAll('select').forEach(s=>{s.selectedIndex=0;s.dispatchEvent(new Event('change',{bubbles:true}))});toast('筛选已重置')}});
window.addEventListener('hashchange',()=>{tab='examples';route()});route();
