import { icon } from './att-controls.js';

const glyph = name => icon('common-'+name);
const control = (name,attrs = '') => `<input class="input" aria-label="${name}" ${attrs}>`;
const action = (name,symbol,attrs = '') => `<button class="btn text input-icon" type="button" aria-label="${name}" ${attrs}>${glyph(symbol)}</button>`;
const example = (name,body) => `<section class="stack"><h3>${name}</h3>${body}</section>`;

export function inputExamples(mini) {
  if (mini) return control('店铺名称','placeholder="请输入店铺名称"');
  return `<div class="stack att-input-examples" data-input-examples>
    ${example('基础与尺寸',`
      <label class="field">店铺名称${control('店铺名称','placeholder="请输入店铺名称"')}</label>
      <div class="row">${[36,32,28,24].map(height=>`<label class="field">${height}px${control(height+'px','data-size="'+height+'" placeholder="请输入"')}</label>`).join('')}</div>
      <div class="row">${control('禁用','value="禁用状态" disabled')}${control('只读','value="只读状态" readonly')}</div>`)}
    ${example('输入形态',`<div class="row">${control('线框','placeholder="线框输入"')}
      ${control('填充','data-variant="filled" placeholder="填充输入"')}
      ${control('无边框','data-variant="borderless" placeholder="无边框输入"')}
      ${control('下划线','data-variant="underlined" placeholder="下划线输入"')}</div>`)}
    ${example('紧凑组合与前后缀',`
      <div class="input-compact"><select aria-label="国家区号"><option>+86</option><option>+49</option><option>+33</option></select>
        ${control('手机号','type="tel" placeholder="请输入手机号"')}</div>
      <div class="input-affix"><span aria-hidden="true">¥</span>${control('人民币金额','inputmode="decimal" placeholder="请输入金额"')}<span>元</span></div>`)}
    ${example('搜索与加载',`<form data-input-search class="stack"><div class="input-compact">
      <div class="input-affix">${glyph('search')}${control('搜索商品','name="query" required placeholder="输入商品名称"')}</div>
      <button class="btn primary" type="submit">搜索</button></div><span class="caption" role="status"></span></form>`)}
    ${example('文本域与自适应高度',`<label class="field">备注<textarea rows="3" placeholder="请输入备注"></textarea></label>
      <label class="field">自适应文本域<textarea data-input-auto rows="2" placeholder="输入多行内容试试"></textarea></label>`)}
    ${example('一次性验证码',`<div role="group" aria-label="六位验证码" class="row input-otp">${Array.from({length:6},(_,i)=>control('第 '+(i+1)+' 位验证码','inputmode="numeric" data-otp placeholder="·"')).join('')}</div>`)}
    ${example('输入格式化',`<label class="field">手机号${control('格式化手机号','type="tel" data-input-format placeholder="138 0000 1234"')}</label>`)}
    ${example('密码与清除',`<div class="input-affix">${control('密码','type="password" placeholder="请输入密码"')}${action('显示密码','eye','data-input-toggle aria-pressed="false"')}</div>
      <div class="input-affix">${control('可清除输入','value="示例内容"')}${action('清除内容','close','data-input-clear')}</div>`)}
    ${example('字数与自定义计数',`<label class="field">商品短标题${control('商品短标题','maxlength="20" data-input-count="characters"')}<span class="caption" data-input-count-output>0 / 20 字符</span></label>
      <label class="field">物流备注${control('物流备注','data-input-count="bytes"')}<span class="caption" data-input-count-output>0 / 80 字节</span></label>`)}
    ${example('错误与警告',`<label class="field">店铺名称${control('店铺名称','aria-invalid="true" aria-describedby="att-input-error" data-status="error"')}
      <span id="att-input-error" class="caption input-error">请输入店铺名称。</span></label>
      <label class="field">商品编码${control('商品编码','value="SKU-01" aria-describedby="att-input-warning" data-status="warning"')}
      <span id="att-input-warning" class="caption input-warning">请确认编码适用于当前市场。</span></label>`)}
    ${example('聚焦与语义结构',`<div class="input-affix" data-input-semantic><span>SKU</span>${control('商品 SKU','value="SKU-001" data-focus-target')}</div>
      <div class="row"><button class="btn" type="button" data-input-focus>聚焦并选中文本</button></div>
      <p class="caption">可分别设置容器、前缀、输入区及后缀的类名，统一使用 ATT 样式变量。</p>`)}
  </div>`;
}

export function mountInputExamples() {
  const root = document.querySelector('[data-input-examples]');
  if (!root) return;
  const otp = [...root.querySelectorAll('[data-otp]')];
  function enterOTP(target,value) {
    const digits = value.replace(/\D/g,'');
    const index = otp.indexOf(target);
    target.value = '';
    [...digits].slice(0,otp.length-index).forEach((digit,offset)=>{otp[index+offset].value = digit;});
    if (digits) otp[Math.min(index+digits.length,otp.length-1)].focus();
  }
  root.addEventListener('input',event=>{
    const target = event.target;
    if (target.matches('[data-otp]')) enterOTP(target,target.value);
    if (target.matches('[data-input-format]')) target.value = target.value.replace(/\D/g,'').slice(0,11).replace(/^(\d{3})(\d{1,4})?(\d{1,4})?$/,(_,a,b,c)=>[a,b,c].filter(Boolean).join(' '));
    if (target.matches('[data-input-auto]')) {
      target.style.height = 'auto';
      target.style.height = target.scrollHeight + 2 + 'px';
    }
    if (target.matches('[data-input-count]')) {
      const bytes = target.dataset.inputCount === 'bytes';
      const count = bytes ? new TextEncoder().encode(target.value).length : target.value.length;
      const output = target.parentElement.querySelector('[data-input-count-output]');
      output.textContent = bytes ? count+' / 80 字节' : count+' / 20 字符';
      const exceeded = bytes && count > 80;
      output.classList.toggle('input-error',exceeded);
      target.setAttribute('aria-invalid',String(exceeded));
    }
  });
  root.addEventListener('paste',event=>{
    if (!otp.includes(event.target)) return;
    event.preventDefault();
    enterOTP(event.target,event.clipboardData.getData('text'));
  });
  root.addEventListener('keydown',event=>{
    const index = otp.indexOf(event.target);
    if (index > 0 && event.key === 'Backspace' && !event.target.value) otp[index-1].focus();
  });
  root.addEventListener('click',event=>{
    const button = event.target.closest('button');
    if (!button) return;
    const input = button.closest('.input-affix')?.querySelector('input');
    if (button.hasAttribute('data-input-clear')) {
      input.value = '';
      input.dispatchEvent(new Event('input',{bubbles:true}));
      input.focus();
    }
    if (button.hasAttribute('data-input-toggle')) {
      const visible = input.type === 'password';
      input.type = visible ? 'text' : 'password';
      button.setAttribute('aria-label',visible ? '隐藏密码' : '显示密码');
      button.setAttribute('aria-pressed',String(visible));
      button.innerHTML = glyph(visible ? 'eye-off' : 'eye');
    }
    if (button.hasAttribute('data-input-focus')) { const target = root.querySelector('[data-focus-target]'); target.focus(); target.select(); }
  });
  const search = root.querySelector('[data-input-search]');
  search.addEventListener('submit',event=>{
    event.preventDefault();
    const query = new FormData(search).get('query').trim();
    if (!query) return;
    const submit = search.querySelector('button');
    const status = search.querySelector('[role="status"]');
    submit.disabled = true;
    submit.setAttribute('aria-busy','true');
    submit.innerHTML = '<span class="spinner" aria-hidden="true"></span>搜索中';
    status.textContent = '正在搜索…';
    setTimeout(()=>{
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
      submit.textContent = '搜索';
      status.textContent = '已完成示例搜索：'+query;
    },700);
  });
}
