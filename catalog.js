export const FIGMA='https://www.figma.com/design/dR8XDKfAOTTQ17bPEnZSYB/AI组件';
export const groups=['通用','布局','导航','数据录入','数据展示','反馈','其他'];
const rows=[
['Button','按钮','通用',2,'用明确的动作引导用户完成任务。','一个操作区域最多一个主按钮；危险操作同时说明后果。','type|primary / default / dashed / text|default;size|large / medium / small / mini|medium;disabled|boolean|false;loading|boolean|false'],
['Typography','排版','通用',56,'使用文字层级组织信息，保持页面阅读节奏。','页面标题32/44，区块24/36，正文16/26；卡片标题独立使用18/26 Medium。','level|page / section / body / caption|body;ellipsis|boolean|false'],
['Icon','图标','通用',54,'用语义明确的图标辅助识别操作。','操作图标须有可访问名称；同一含义保持同一图形。','name|string|—;size|number|16;label|string|—'],
['Link','链接','通用',55,'在相关内容与目的地之间建立连接。','链接使用操作色，不用品牌蓝替代；目的地文案清晰。','href|string|—;target|string|_self;disabled|boolean|false'],
['Divider','分割线','布局',57,'分隔不同内容区域。','优先用空间表达分组；只有边界不清时使用分割线。','direction|horizontal / vertical|horizontal'],
['Grid','栅格','布局',58,'使用24栅格构建稳定布局。','筛选默认四列，每项6/24；列与行间距16px。','columns|number|24;span|number|6;gap|number|16'],
['Layout','布局','布局',59,'组合导航、侧栏与内容区域。','顶部60px、侧栏196px、页面边距24px；内容不足960px时调整列数。','headerHeight|number|60;siderWidth|number|196;padding|number|24'],
['Tab','标签页','导航',3,'切换同一上下文中的平级内容。','切换后保留各页状态；不要用标签页替代分步流程。','items|array|[];activeKey|string|第一项;onChange|function|—'],
['Breadcrumb','面包屑','导航',48,'帮助用户理解当前位置并返回上级。','从实际业务上级开始，首页不纳入层级。当前页不做链接。GSP 框架中面包屑高 24px，项间距 4px，距标题 4px。','items|array|[];separator|string|/'],
['Dropdown','下拉菜单','导航',49,'收纳同一对象的次要操作。','点击触发展开；菜单只承载动作，选值请使用 Select；危险项单独分组。','trigger|click / hover|click;items|array|[];placement|bottomStart / bottomEnd|bottomStart'],
['Menu','导航菜单','导航',50,'提供稳定的全局和分组导航。','当前入口高亮；展开状态与选中状态分别表达；菜单文字不得截断关键信息。','items|array|[];selectedKey|string|—;collapsed|boolean|false'],
['PageHeader','页头','导航',51,'组织页面标题与当前页面操作。','页面标题使用二级样式 24/36。仅在明确要求时添加副标题。标题到表单或表格 16px。','title|string|—;actions|array|[]'],
['Pagination','分页','导航',52,'在明确总量的数据集合中翻页。','中号页码与箭头为 32px，控件间距 8px。支持切换每页条数和输入页码后按 Enter 跳转。筛选后回到第一页，与表格间隔 16px。','total|number|0;page|number|1;pageSize|number|10'],
['Steps','步骤条','导航',53,'展示有顺序的任务进程。','图标32px，文字居中放在图标下方，间隔8px；已完成为蓝色描边勾选，进行中为蓝底白色编号，未开始为灰边编号。','current|number|0;items|array|[];status|process / error|process'],
['Input','输入框','数据录入',4,'输入简短文本内容。','标签始终可见，14/22；默认高32px，标签到控件8px，辅助说明或错误提示距控件8px。','value|string|空;placeholder|string|—;disabled|boolean|false;status|default / error|default'],
['Textarea','文本域','数据录入',5,'录入多行文本和备注。','展示字数上限；内容增长推动后续字段，避免覆盖。','value|string|空;maxLength|number|200;rows|number|4'],
['InputNumber','数字输入框','数据录入',6,'录入有范围、精度和单位的数值。','金额与数量分开配置精度；限制同时提供文字说明。','value|number|0;min|number|0;max|number|100;step|number|1'],
['InputTag','标签输入框','数据录入',7,'录入多个离散标签。','Enter 确认，删除操作可恢复；禁止空值和重复值。','value|string[]|[];maxCount|number|5'],
['Select','选择器','数据录入',8,'从已知的固定选项中选择。','默认高32px；区分加载、空结果、禁用；选项较多时提供搜索。','value|string|—;options|array|[];multiple|boolean|false;disabled|boolean|false'],
['AutoComplete','自动完成','数据录入',9,'为自由文本输入提供建议。','允许输入建议之外的值；不要与只能选固定值的 Select 混用。','options|string[]|[];value|string|空'],
['Cascader','级联选择','数据录入',10,'选择具有上下级关系的选项。','显示完整选择路径；变更上级时清理不适用下级。','options|tree|[];value|string[]|[]'],
['TreeSelect','树选择','数据录入',11,'在树形结构中选择一个或多个节点。','区分展开与选择；父子选择关系需要说明。','treeData|tree|[];multiple|boolean|false'],
['Checkbox','多选框','数据录入',12,'在多个独立选项中选择。','全选具备半选状态；标签和控件共同响应点击。','checked|boolean|false;indeterminate|boolean|false;disabled|boolean|false'],
['Radio','单选框','数据录入',13,'从一组互斥选项中选择一个。','同组只选一项；不隐藏关键选项，默认值应有明确依据。','value|string|—;options|array|[]'],
['Switch','开关','数据录入',14,'即时更改一个布尔设置。','默认56×28px、滑块24px；小号44×20px、滑块16px。更改即时生效；需要提交的表单选择优先使用 Checkbox。','checked|boolean|false;loading|boolean|false;disabled|boolean|false'],
['Slider','滑动输入条','数据录入',15,'在连续或有刻度的范围内选择。','数值需要精确录入时配合 InputNumber；保留键盘操作。','value|number|40;min|number|0;max|number|100;step|number|1'],
['Rate','评分','数据录入',16,'展示或收集有序等级评价。','0星灰色、1–2星错误红、3星警告橙、4–5星成功绿；重复点击当前评分清零；同时显示文字分值。','value|number|3;count|number|5;readonly|boolean|false'],
['DatePicker','日期选择器','数据录入',17,'选择经营日期或日期范围。','标明业务时区；不可选日期禁用并说明原因。','value|string|—;min|string|—;max|string|—'],
['TimePicker','时间选择器','数据录入',18,'选择一天中的具体时间。','24小时制；时区和业务截止规则由场景解释。','value|string|—;step|number|60'],
['Form','表单','数据录入',19,'组织数据录入、验证与提交。','新建编辑使用顶部标签纵向单列；字段整体间16px；校验失败保留输入并定位。','onSubmit|function|—;disabled|boolean|false'],
['Upload','上传','数据录入',20,'选择和检查文件。','上传前说明格式、大小与数量；失败提供重试，不把选中文件误报为已上传。','accept|string|image/*;maxSize|number|5MB;multiple|boolean|false'],
['Transfer','穿梭框','数据录入',21,'在两个明确的集合之间移动选项。','左右集合含义清晰；移动后保留可见结果与撤销路径。','dataSource|array|[];targetKeys|string[]|[]'],
['Table','表格','数据展示',22,'对齐展示结构化数据并支持逐项操作。','单元格padding12px；表头和正文左对齐；行内操作间距16px。','columns|array|[];dataSource|array|[];rowKey|string|id;sort|function|—'],
['Tag','标签','数据展示',23,'呈现分类、属性与状态。','分类与状态不要混用；状态文字和颜色同时表达，避免颜色独占意义。','color|default / success / warning / danger|default;closable|boolean|false'],
['Avatar','头像','数据展示',24,'识别用户、店铺或组织。','优先图片，失败退回文字；店铺头像32px，名称14/22，ID12/20。','src|string|—;alt|string|—;size|24 / 32 / 40 / 64|32'],
['Badge','徽标数','数据展示',25,'在关联对象上展示数量或状态。','计数有上限；实时变化不应打断用户；提供可读数量。','count|number|0;max|number|99;dot|boolean|false'],
['Calendar','日历','数据展示',26,'按日期组织事件和计划。','选中态与今天分别表达；事件文字可访问。','value|string|—;events|array|[]'],
['Card','卡片','数据展示',27,'组织一个边界清晰的业务信息组。','圆角8px、padding24px；标题18/26 Medium；标题到内容16px；阴影仅外层。','title|string|—;extra|slot|—;body|slot|—'],
['Carousel','走马灯','数据展示',28,'在有限空间切换平级展示内容。','重要信息不要只放在未展示页；支持手动控制和暂停。','items|array|[];autoplay|boolean|false'],
['Collapse','折叠面板','数据展示',29,'按需展开次要信息，缩短页面。','标题保持可见；展开与收起有明确状态，键盘可操作。','items|array|[];accordion|boolean|false'],
['Descriptions','描述列表','数据展示',30,'以标签和值展示对象属性。','标签与内容对齐；编辑场景使用 Form。','items|array|[];columns|number|2'],
['Image','图片','数据展示',31,'展示内容图片并支持查看。','保持比例；图片说明有 alt；失败有明确回退。','src|string|—;alt|string|—;preview|boolean|true'],
['List','列表','数据展示',32,'展示结构相似的信息条目。','条目主次信息稳定；可点击区域与行内操作分开。','items|array|[];renderItem|function|—'],
['Popover','气泡卡片','数据展示',33,'在当前上下文补充少量可操作内容。','使用浮层阴影与8px圆角；内容复杂时改用 Drawer。','title|string|—;content|slot|—;trigger|click / hover|click'],
['Timeline','时间轴','数据展示',35,'按时间或顺序展示事件。','时间使用绝对值；当前节点与已完成节点区分。','items|array|[];reverse|boolean|false'],
['Tree','树形控件','数据展示',36,'展示和操作层级内容。','展开与选择分别处理；保留父子关系与键盘可达性。','data|tree|[];checkable|boolean|false'],
['QuickFilter','快捷筛选','数据展示',37,'用少量高频条件快速缩小结果。','最多展示常用条件；切换后回第一页，与完整筛选口径一致。','options|array|[];value|string|all'],
['Tooltip','文字提示','数据展示',38,'解释图标或提供简短辅助信息。','不承载必须阅读的信息或可交互控件；悬停和聚焦均可显示。','content|string|—;placement|string|top'],
['Alert','警告提示','反馈',39,'在上下文中呈现持续的重要信息。','说明发生了什么、影响和下一步；不要用全局 Message 替代持续阻断。','type|info / success / warning / error|info;closable|boolean|false'],
['Message','全局提示','反馈',40,'提供简短的操作反馈。','成功可自动消失；失败需要恢复入口；不遮挡用户当前操作。','type|success / error / info|info;duration|number|3000'],
['Notification','通知提醒','反馈',41,'展示可稍后处理的重要通知。','标题说明主题，正文提供行动；业务任务与已读状态分开。','title|string|—;description|string|—;duration|number|5000'],
['Popconfirm','气泡确认','反馈',42,'就近确认轻量的有风险操作。','明确对象和后果；不可逆复杂操作使用 Modal，取消不改变数据。','title|string|—;onConfirm|function|—'],
['Progress','进度条','反馈',43,'展示任务完成比例或过程。','未知进度不要伪造百分比；完成、失败状态同时有文字。','percent|number|0;status|normal / success / error|normal'],
['Drawer','抽屉','反馈',44,'保持主页面上下文，承载详情或编辑。','padding24px；标题正文底部各24px；关闭后焦点回触发处。','open|boolean|false;title|string|—;onClose|function|—'],
['Empty','空状态','反馈',45,'解释当前为什么没有数据。','区分尚无数据、筛选无结果、无权限和失败；给下一步入口。','description|string|暂无数据;action|slot|—'],
['Result','结果页','反馈',46,'展示一项重要流程的最终结果。','说明结果、业务标识与后续操作；不能把提交成功当作最终完成。','status|success / error / warning|success;title|string|—'],
['Skeleton','骨架屏','反馈',47,'在首次加载中预告内容结构。','骨架接近最终布局；加载失败切换错误状态；避免无限闪烁。','rows|number|3;active|boolean|true'],
['Countdown','倒计时','数据展示',60,'展示距离明确截止点的剩余时间。','截止后停止，提供绝对截止时间；不使用倒计时制造压力。','seconds|number|90;onFinish|function|—'],
['Modal','对话框','反馈',61,'让用户专注完成一个必须确认的任务。','圆角8px，弹窗阴影；正文与操作区间24px；主操作明确且唯一。','open|boolean|false;title|string|—;onConfirm|function|—'],
['Loading','加载中','反馈',62,'说明当前操作正在等待结果。','只锁定必要区域，避免重复提交；长任务提供结果或取消。','loading|boolean|false;label|string|加载中'],
];
export const components=rows.map(([id,zh,group,n,desc,rule,api])=>({id,zh,group,desc,rule,api,status:'existing',page:n===61?'34:8744':n===62?'34:8745':`28:${n}`}));
const added=[
['FloatButton','悬浮按钮','通用','为滚动页提供持续可达的次要入口。','用于回顶部或帮助；不要遮挡主操作或表格末列。'],
['Flex','弹性布局','布局','对齐一维布局中的内容。','使用4/8/12/16/24间距；业务卡片默认16px，表单分组24px。'],
['Space','间距','布局','管理一组控件之间的一致间距。','同组按钮8px，独立业务组24px；不要叠加父子间距。'],
['Splitter','分隔面板','布局','拖动调整相邻面板的可用空间。','限制最小宽度；键盘方向键每次调整；保留用户调整值。'],
['Masonry','瀑布流','布局','排列高度不同的内容卡片。','只用于浏览型内容；阅读顺序有要求时使用 Grid。'],
['Anchor','锚点','导航','在长页面中定位章节。','标题层级稳定；滚动偏移避开60px顶部栏。'],
['ColorPicker','颜色选择器','数据录入','选择并校验颜色数值。','产品样式使用 ATT 语义变量；颜色选择仅用于业务内容编辑。'],
['Mentions','提及','数据录入','在输入中插入明确的人或对象。','建议列表不覆盖输入；选择后显示可识别的名称，业务保存使用ID。'],
['Segmented','分段控制器','数据展示','在少量互斥视图间即时切换。','2至5项短标签；焦点与选中分别表达，不代替流程导航。'],
['Tour','漫游式引导','数据展示','按步骤解释一个新流程。','允许跳过与退出；引导不触发实际业务操作，不强制重复出现。'],
['QRCode','二维码','数据展示','把已知的链接转换成可扫描入口。','同时提供原始链接；不编码密钥或敏感凭据；保持安静区。'],
['VirtualList','虚拟列表','数据展示','按可见范围渲染大量条目。','保留可访问条目和滚动位置；不用于需要浏览器全文查找的文档。'],
['Watermark','水印','反馈','在内容上展示轻量的归属标记。','不能作为防泄漏或权限控制；不降低正文可读性。'],
['Affix','固钉','其他','让关键辅助区域在滚动时保持可见。','避免与固定顶部栏重叠；窄屏还原正常文档流。'],
['App','应用容器','其他','统一全局反馈、弹层层级与语言上下文。','局部状态留在模块；全局反馈使用一个共享容器。'],
['BorderBeam','边框强调','其他','用短暂边框动效强调新出现的内容。','仅用于非关键展示，遵循克制动效；不改变8px圆角与卡片阴影。']
];
components.push(...added.map(([id,zh,group,desc,rule])=>({id,zh,group,desc,rule,status:'supplement',api:'disabled|boolean|false;label|string|—'})));
export const guides=[
['principles','设计原则','围绕用户任务组织信息，用一致的状态、反馈与规则降低理解成本。','已有 ATT 约束 + 网站补充',[
['一致与可预期','同类任务使用相同组件；同一操作区最多一个主按钮。默认、悬停、聚焦、禁用、加载、错误状态分别表达。'],['信息先于装饰','用对齐、字号和间距表达层次。不要用阴影补救信息结构，普通正文、辅助信息不使用品牌蓝，交互状态按组件语义变量显示。'],['语义与责任','缺数、未开通、无权限、失败分别表达。操作结果需说明对象、影响与可恢复路径。']]],
['color','颜色','以原稿·色彩参考为唯一色源，组件按用途引用Assets语义颜色。','ATT 原稿·色彩参考 / Assets 330:23',[
['变量分层','底层原始值与参考色板保存原稿色值，组件使用ATT/语义颜色。品牌、操作、文字、状态、背景和边框按用途选择；同色不同用途不合并。'],['文字颜色','标题与重点信息使用黑色85%；正文65%；次要信息、帮助及占位45%；禁用25%；反白纯白。保留透明度，不换成白底上的实色灰。链接使用品牌交互色，风险文字使用对应状态色。'],['品牌与操作','品牌和操作共用Brand1色阶：默认#0278FF、悬停#3593FF、按下#0260CC。一般禁用#A3C9FF，文字禁用#DBEAFF，浅色背景#ECF5FF。按用途绑定各自语义变量，不将品牌蓝用于普通正文。'],['功能状态','错误#FF3E3E、成功#15C179、警告#FF7B34。各系列分别使用默认、悬停、按下、禁用、subtle背景和soft强调层级；状态同时配合文字或图标。'],['背景与边框','白色表面#FFFFFF；页面与表格悬停#F9FAFB；表头#F2F2F2；白底悬停及禁用填充#E0E1E2。控件边框#E0E1E2、表格分隔#E2E5E9、明显分割#D4D5D5。'],['扩展系统色','保留原稿橙红、Cyan、Gold、Blue、Purple、Yellow、Lime、Pink Purple和Magenta系列，用于业务分类，不代替成功、警告、错误。'],['组件应用','主组件和示例共用111项语义颜色，覆盖默认、悬停、按下、选中、禁用、只读、错误和加载。组件已定义的反白、品牌禁用等专用颜色以实际变体为准。图标沿用原稿；透明蒙层、动效及渐变保留结构和透明度，位图素材保持原图。']]],
['typography','字体与排版','建立稳定、可区分的阅读层级。','ATT/字体 + 原 Card',[
['基础层级','页面32/44，区块24/36，正文16/26，控件14/22，辅助12/20。Web优先系统苹方，回退 Noto Sans SC。'],['组件例外','页面标题32/44和区块标题24/36为Bold 700；Card标题18/26为Medium 500。正文16/26、控件14/22、辅助12/20为Regular 400，组件专用文字规格沿用原稿。'],['文字用色','标题使用85%黑，正文65%，次要及辅助45%，禁用25%，反白纯白。颜色独立于字号，禁止用降低整个控件透明度的方式模拟禁用文字。'],['长内容','允许必要换行；截断时提供完整内容入口。金额使用等宽数字，不缩小字号来塞入固定高度。']]],
['page-framework','页面框架','复用商家工作台框架，按页面结构选择 GSP 或 CSP 模板。','ATT 页面模板',[
['GSP · 带面包屑和 Tab','适合有上下级路径、且需要在同一层切换内容的页面。'],
['CSP · 仅页面标题','适合进入页面后直接查看业务内容的场景。'],
['尺寸与间距','顶部导航高 60px，侧栏宽 196px。内容区顶部与左右留白 24px，同级内容间距 16px。标题使用二级标题样式 24px / 36px。蓝色和绿色是设计标尺，业务页面应移除。']]],
['workbench-nav','顶部导航','TT跨境工作台的品牌区、店铺切换和账户入口。','ATT 工作台导航',[
['结构','导航高 60px。左侧显示 TT跨境工作台，店铺区显示头像、店铺名称与店铺 ID，右侧保留账户入口。'],
['单店展示','仅有一个可用店铺时，只显示该店铺。'],
['多店切换','最多展示三个可用店铺。点击店铺切换当前店铺，选中项使用 ATT 品牌蓝和选中底色。'],
['切换示例','<label class="check"><input type="radio" name="nav-store-demo" checked>耐克官方旗舰店 · 100001</label>　<label class="check"><input type="radio" name="nav-store-demo">阿迪达斯官方旗舰店 · 100002</label>　<label class="check"><input type="radio" name="nav-store-demo">李宁官方旗舰店 · 100003</label>']]],
['layout','布局与适配','从画板、页面框架到筛选与内容栅格，明确哪些尺寸固定，哪些区域随可用宽度调整。','ATT 布局使用说明',[
['统一画板','以 1440px 作为本指南的桌面交付示例。在 1920、1440、1366 和 1280px 下复核导航、内容和表格，并在筛选断点两侧检查换行。画板宽度是设计与验收的参考，工作区在浏览器中随可用宽度变化。'],
['左右布局','适用于有持续侧栏导航的商家工作台。顶部导航高 60px，左侧栏宽 196px，主内容区两侧各留 24px。侧栏保持展开时，可用内容宽 = 视口宽 − 196 − 2 × 24。以 1440px 视口为例，内容宽为 1196px。局部卡片内的栅格还要扣除卡片内边距。'],
['上下布局','适用于以顶部导航为主的页面。顶部导航高 60px，主内容居中，两侧留白至少 24px。宽屏上的内容最大宽度按页面任务确定，并在设计交付中标明。两侧留白缩到 24px 后，由内容区继续缩放。'],
['网格单位','ATT 以 4px 为间距基准。优先使用已有的 4、8、12、16、24px 档位。外边距、内边距与同级间距分别标注，父子容器避免重复叠加同一层留白。'],
['24 栅格','用 24 份描述区块跨度。整行占 24 份，两等分各占 12 份，三等分各占 8 份，四等分各占 6 份。区块从列起点对齐到列终点。在同一布局内，列宽随容器变化，列间距按场景固定。交付时标明适用宽度、列跨度、横纵间距和超出一行时的换行顺序。'],
['筛选栅格与断点','用筛选容器实际可用宽度判断列数。行距、列距均为 16px，标签距控件 8px，默认控件高 32px。四列时字段宽 =（内容宽 − 3 × 16）÷ 4，例如 1196px 对应 287px。录入表单沿用顶部标签、纵向单列。'],
['常用尺寸与间距','GSP 框架中面包屑到标题 4px，标题到表单或表格 16px。仅在明确要求时添加副标题。同级卡片相隔 16px、同排等高且内容顶部对齐。筛选到结果、工具栏到表格、表格到分页均留 16px。'],
['按内容选择布局','优先保证标题、关键字段、反馈和操作完整可见。窄空间内按阅读顺序换行，长文本自然折行，表格需要横向滚动时将滚动限制在表格容器。复核同排长短内容、错误反馈出现后的高度变化，以及键盘阅读顺序。']]],
['spacing','间距与圆角','以4px基准组织空间，保持既有 ATT 圆角。','ATT/尺寸',[
['空间语义','4px反馈；8px标签到控件与按钮组；12px单元格；16px同级卡片与表单字段；24px页面与卡片内边距。'],['圆角','常规8px，紧凑6px，胶囊100px。组件已定义的专用外形沿用原稿；不要把另一套库的默认圆角带入 ATT。'],['分组','独立业务组32px，长文独立章节48px作为场景扩展；父子不重复叠加同一层间距。']]],
['shadow','投影与层级','投影表达层级，只施加在容器最外层。','ATT/投影',[
['卡片','三层：0 0 1px #000000 8%；0 1px 4px #000000 4%；0 2px 8px #000000 4%。'],['浮层与弹窗','Dropdown、Popover 使用0 4px 16px黑色12%；Modal 使用0 12px 32px黑色18%。不能给内容子节点再叠加一层。'],['空间','阴影不计入组件间距。卡片与浮层仍用8px圆角；阴影强度不随状态任意改变。']]],
['motion','动效','参考 Ant Design 的自然、高效、克制原则，保留 ATT 外观。','网站补充 · 参考 Ant Design Motion',[
['交互反馈','颜色、边框与透明度用短过渡；不通过大幅位移表现按钮悬停。网站补充建议：轻反馈100ms、常规展开200ms、弹层300ms。'],['空间关系','下拉淡入并轻微缩放；抽屉沿边缘进入；弹窗淡入与小幅缩放；折叠保持文档流。关闭反馈应直接、快速。'],['减少动态效果','尊重 prefers-reduced-motion；关闭非必要动画，保留状态文字和最终结果。动画时长是网站补充建议，不宣称原 Figma 已定义。']]],
['form','表单','顶部标签、纵向单列，让数据录入路径清晰。','ATT 表单使用场景',[
['结构','新建、编辑、设置默认单列；标签14/22，控件高32px，标签到控件8px，字段之间16px。必填星号放在字段名前，使用 ATT 错误红。'],['控件选择','单选框用于互斥选项，复选框用于可同时选中的选项，开关用于开启或关闭独立设置。穿梭框用于在可用项与已选项之间移动多项。文件上传提前标明格式和大小限制，选中文件后反馈校验结果。'],['状态','展示默认、聚焦、错误、禁用、只读和校验中。禁用说明原因，校验中保留已填内容。'],['验证','辅助说明或错误提示置于控件下方，与控件间距8px，左边线对齐。错误说明原因和修正动作。失败保留输入、定位第一个错误；异步提交禁止重复。'],['动作','一个主提交按钮，取消为次操作。字段帮助在输入前可理解，不能只依赖 placeholder。']]],
['filter','列表筛选','使用固定栅格与明确触发规则。','ATT 筛选栅格使用规范',[
['布局','按筛选内容宽度排版：960px 起为四列，480px 至不足 960px 为两列，不足 480px 为单列。行列间距 16px，标签到控件 8px，控件默认高 32px。'],['触发','不超过三项时，选项和日期变更即时生效，文本按 Enter 触发。超过三项时，搜索和重置作为一组跟在末项后，组内间距 8px。同行时与控件底部对齐，换行后与上一行相隔 16px。'],['使用场景','全局筛选仅一行时可不包卡片；恰好两行时按页面布局决定；超过两行时须使用独立 ATT 卡片。仅影响下方列表数据的筛选，与对应列表放在同一张 ATT 卡片内。 筛选变更后回到第一页。']]],
['accessibility','无障碍','让鼠标、键盘和辅助技术获得相同的完成能力。','网站补充',[
['键盘','Tab按逻辑顺序到达控件，Enter或Space触发，Esc关闭非强制弹层。焦点边框始终可见。'],['语义','输入有可见label；图标按钮有名称；表格表头明确；实时状态使用role=status而非反复抢焦点。'],['反馈','错误不只靠颜色；禁用说明原因；弹窗约束焦点并在关闭后回到触发处。系统减少动效设置优先。']]],
['writing','内容与文案','用准确、直接、可操作的文字解释状态。','网站补充',[
['名称','按钮用动词，如保存、创建、重试。标题指明对象，避免“温馨提示”等无信息表达。'],['异常','说明问题、影响与下一步。不要只显示“失败”或用空列表替代接口错误。'],['数据','明确单位、币种、截止时间和统计范围；不把未接入指标显示成零。']]]
].map(([id,title,intro,source,sections])=>({id,title,intro,source,sections}));
export const findComponent=id=>components.find(c=>c.id.toLowerCase()===String(id).toLowerCase());
const extraAPI={FloatButton:'action|top / help|top;label|string|返回顶部',Flex:'direction|row / column|row;gap|4 / 8 / 12 / 16 / 24|16;align|string|center',Space:'gap|4 / 8 / 12 / 16 / 24|8;wrap|boolean|true',Splitter:'value|number|50;min|number|20;max|number|80;onChange|function|—',Masonry:'columns|number|3;gap|number|16',Anchor:'items|array|[];offsetTop|number|84',ColorPicker:'value|hex color|#0278FF;onChange|function|—',Mentions:'options|array|[];prefix|string|@',Segmented:'options|string[]|[];value|string|第一项;onChange|function|—',Tour:'steps|array|[];current|number|0;open|boolean|false;onClose|function|—',QRCode:'value|string|ATT Figma 链接;size|number|132;dynamic|boolean|false（静态示例）',VirtualList:'count|number|1000;itemHeight|number|40;height|number|200',Watermark:'content|string|ATT DESIGN;opacity|number|低对比度;securityBoundary|boolean|false',Affix:'offsetTop|number|0;container|element|当前示例滚动容器',App:'messageHost|element|共享反馈容器;modalHost|element|共享弹层容器',BorderBeam:'duration|number|2000;iterations|number|1;reducedMotion|boolean|跟随系统'};
for(const c of components)if(extraAPI[c.id])c.api=extraAPI[c.id];

// Ant Design component overview order; ATT-only entries follow their closest peer.
export const componentOrder={
 '通用':['Button','FloatButton','Icon','Typography','Link'],
 '布局':['Divider','Flex','Grid','Layout','Masonry','Space','Splitter'],
 '导航':['Anchor','Breadcrumb','Dropdown','Menu','Pagination','Steps','Tab','PageHeader'],
 '数据录入':['AutoComplete','Cascader','Checkbox','ColorPicker','DatePicker','Form','Input','Textarea','InputTag','InputNumber','Mentions','Radio','Rate','Select','Slider','Switch','TimePicker','Transfer','TreeSelect','Upload'],
 '数据展示':['Avatar','Badge','Calendar','Card','Carousel','Collapse','Descriptions','Empty','Image','List','VirtualList','Popover','QRCode','Segmented','Countdown','Table','Tag','Timeline','Tooltip','Tour','Tree','QuickFilter'],
 '反馈':['Alert','Drawer','Message','Modal','Notification','Popconfirm','Progress','Result','Skeleton','Loading','Watermark'],
 '其他':['Affix','App','BorderBeam']
};
for(const [group,ids] of Object.entries(componentOrder))for(const id of ids){const c=components.find(c=>c.id===id);if(c)c.group=group;}
const orderedIds=groups.flatMap(group=>componentOrder[group]);
components.sort((a,b)=>orderedIds.indexOf(a.id)-orderedIds.indexOf(b.id));

// Popconfirm uses the user-selected Popover shell while keeping its confirmation behavior.
components.find(c=>c.id==='Popconfirm').visualSourcePage='28:33';

guides.push({id:'button',title:'按钮使用规范',intro:'依据ATT按钮原组件组织主次动作、风险状态和特殊用法。',source:'ATT Button原稿 + Web使用规范',sections:[['何时使用','按钮触发当前任务的动作；导航使用Link。同一操作区域仅一个主要按钮。'],['类型与优先级','ATT提供主要、次要、虚框、线框、文本五类。先确定动作优先级，再选择类型；不要把所有操作都设为主按钮。'],['文案与图标','使用清晰动词，例如保存、创建、重试。图标前置或后置按语义选用；纯图标按钮必须有可访问名称。'],['形状与尺寸','长方形、全圆角、方形、圆形使用原稿变体。大36/中32/小28/迷你24px；图文间8px，常规圆角8px、迷你6px。'],['风险与反馈','危险操作说明对象与后果，结合Popconfirm或Modal确认；异步使用Loading防止重复提交，失败保留用户输入。'],['专用状态配色','Button按原组件变体使用颜色：主要按钮禁用为F2F2F2底与白字；次要按钮禁用为F9FAFB底、E0E1E2边框及25%黑字；线框和文本按钮禁用使用A3C9FF。不能统一降低整个按钮透明度。'],['组合与布局','同组按钮8px，不同组24px；对话框操作区靠右。整行按钮只改变宽度，保持原稿字号与控件高度。'],['参考与缺口','分类和交互参考Ant Design Button；不引入antd。白色幽灵、渐变、自定义波纹没有对应ATT变体，暂不新增视觉样式。']]});
components.find(c=>c.id==='Button').api='type|primary / default / dashed / outlined / text|default;shape|rectangle / round / square / circle|rectangle;size|large / medium / small / mini|medium;disabled|boolean|false;loading|boolean|false;block|boolean|false;iconPlacement|start / end|start';
components.find(c=>c.id==='Grid').api='columns|number|24;span|1–24|6;gutter|8 / 16 / 24|16;offset|0–23|0;order|number|0;responsive|content-width|960 / 480';

const colorGuide=guides.find(g=>g.id==='color');colorGuide.page='330:23';

guides.find(g=>g.id==='page-framework').page='388:8414';



guides.find(g=>g.id==='workbench-nav').page='215:8747';
