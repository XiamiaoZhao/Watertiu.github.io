'use strict';
const SOURCES=[
['苏州市官方景区价格公示','https://credit.suzhou.gov.cn/html/wap_jgsc'],
['苏州博物馆 2026 预约规则（苏州市政府）','https://www.suzhou.gov.cn/szsrmzf/mszx/202603/b998c7daa6944c1fb26aac4faf7a1186.shtml'],
['苏州文旅：游船参考价格与运营时间','https://visitsz.wglj.suzhou.com.cn/news-detail.aspx?id=2782'],
['金鸡湖音乐喷泉 2026 安排（苏州市政府）','https://www.suzhou.gov.cn/szsrmzf/mszx/202602/c96780f3e9914363a3709dff91717101.shtml'],
['昆曲博物馆开放公告（苏州文旅）','https://wglj.suzhou.gov.cn/szwhgdhlyj/hdxx/202409/e8a1594e70774b499c3ee1a384b5df2c.shtml'],
['新民桥菜场美食（苏州文旅）','https://wglj.suzhou.gov.cn/szwhgdhlyj/hcgms/202510/df94c7c1a829418ab825ead853f8838c.shtml'],
['徐州地标美食（中国江苏网）','https://jsnews.jschina.com.cn/xz/a/202312/t20231218_3334971.shtml'],
['武康路—安福路街区（上海市政府）','https://www.shanghai.gov.cn/citywalk/20260625/3492b1b945c146fc96c4585d7b04f00d.html'],
['上海美食街 2026 搬迁信息（上海市政府）','https://www.shanghai.gov.cn/nw4411/20260211/11359d7cb6ef484c86b26abdc4bd05bc.html'],
['南京西路换乘通道建设信息（上海市政府）','https://www.shanghai.gov.cn/nw15343/20260703/34ae6a8618fa447082256b5f2d1873ab.html'],
['高德官方：搜索 URI 与唤起 App','https://lbs.amap.com/api/uri-api/guide/search/search'],
['12306 官方铁路服务','https://www.12306.cn/'],
['徐州博物馆实名免费预约声明（馆方声明转载）','https://api.app.anhuinews.com/appcontent/9109744.html'],
['宝莲寺公开旅行资料（非寺院公告）','https://you.ctrip.com/sight/xuzhou230/136003800.html'],
['原版欧洲旅行口袋站（功能参考）','https://xiaomiao-trip-2026.zyxwyp.chatgpt.site/']
];
const HOTEL_XZ='徐州苏宁广场中山南路轻居酒店';const HOTEL_SZ='苏州拙政别苑酒店 东北街168号';
const DAYS=[{"date":"10.26","week":"周一","city":"徐州","title":"第一站，老城烟火","tag":"抵达日 · 轻装逛","desc":"先把行李放下，第一天只留给老城与晚饭。","route":"石家庄 → 徐州东 → 酒店 → 户部山 / 文庙 → 回龙窝","food":"下午别吃太满，晚饭尝把子肉或烙馍；富国街与夜市选一处即可。","stay":"徐州苏宁广场中山南路轻居酒店","stops":[["09:33","石家庄 → 徐州东","G2815 已购，12:50 到达，历时 3 小时 17 分。建议提前 45–60 分钟到石家庄站。","石家庄站","石家庄"],["13:30","进城办理入住","徐州东站乘地铁 1 号线往市区，导航中山南路 48 号；具体站口按高德选择。办理入住后休息 1 小时。","徐州苏宁广场中山南路轻居酒店","徐州"],["16:00","户部山 · 文庙","看老城坡道、街巷和建筑。先逛公共街区，进入收费院落前核对票价和开放时间。","徐州户部山","徐州"],["17:30","回龙窝街区","把傍晚留给小巷与晚饭，不必每个店都排队。","徐州回龙窝","徐州"],["19:00","富国街 / 壹捌夜市","两处择一补一点小吃。首日觉得累，就直接回酒店。夜市摊位与营业以现场为准。","徐州富国街","徐州",true]],"tip":"订单显示酒店已订三晚，但分成三笔；前台先确认可否原房连住。","ticket":"今晚不必赶预约型景点。先把 10/27 徐州博物馆处理好。"},{"date":"10.27","week":"周二","city":"徐州","title":"寺院、汉风与一段湖岸","tag":"徐州压缩日 · 打车串联","desc":"上午先去宝莲寺，再回市区参观徐州博物馆；下午只走云龙山山脚与一段云龙湖。登顶、环湖和夜市不叠加。","route":"酒店 → 宝莲寺 → 徐州博物馆 → 云龙山山脚（可选） → 云龙湖","food":"午饭放在博物馆周边；晚饭按体力选酒店附近或云龙湖一带的徐州菜。","stay":"徐州苏宁广场中山南路轻居酒店","stops":[["07:45","早餐后出发","建议打车去宝莲寺；按高德当天路况调整出门时间，随身带证件。","徐州宝莲寺","徐州"],["08:30","宝莲寺","计划约1小时，以寺院当日开放时间为准；不为素面排长队，10点前往市区。","徐州宝莲寺","徐州"],["10:30","徐州博物馆","优先预约这个时段附近，留约1.5–2小时看基本陈列。若预约时段不同，先按博物馆调整全日顺序。","徐州博物馆","徐州"],["12:30","午饭与休息","在博物馆或云龙山附近吃饭，坐下来休息约1小时。","徐州博物馆","徐州"],["14:00","云龙山山脚（可选）","只走山脚与平缓路段；想上山则相应减少湖边时间。同行老人以体力和台阶情况为准。","徐州云龙山","徐州",true],["15:00","云龙湖一段岸线","选近岸步道慢走约1小时，不环湖。累了可直接回酒店，把晚餐留在住处附近。","徐州云龙湖","徐州"],["17:00","回酒店休息 · 晚饭","次日要转场苏州，晚上收拾行李；不再追加跨城区夜游。","徐州苏宁广场中山南路轻居酒店","徐州"]],"tip":"如果只想轻松玩，保留博物馆+云龙湖，宝莲寺与登山按体力删减。第二天不把所有项目都当必去。","ticket":"10/27 徐州博物馆优先预约；宝莲寺常规入寺免费参考。云龙湖公共区域免费，索道游船另计。"},{"date":"10.28","week":"周三","city":"苏州","title":"入江南，沿运河等灯亮","tag":"转场日 · 西线","desc":"上午选择直达高铁去苏州，优先保住下午游览时间。抵达后先去东北街酒店寄存行李，再走西园寺—留园—山塘。","route":"酒店寄存行李 → 西园寺 → 留园 → 七里山塘夜游","food":"西园寺素食随现场供应；山塘主街挑小吃，正餐可往新民桥附近找。","stay":"苏州拙政别苑酒店 东北街168号","stops":[["08:25","徐州东 → 苏州北","建议G937，08:25出发、10:55到达；尚未购票。出站后接驳东北街酒店约45–65分钟，午饭后再出发去西园寺。","徐州东站","徐州"],["抵达后","先放行李，再走西线","酒店在东北街，去西园寺与留园需接驳。若到达晚，保留留园或西园寺一处。","苏州拙政别苑酒店 东北街168号","苏州"],["14:00","西园寺","建议慢走约 1 小时；进入寺院按现场要求购票。","苏州西园寺","苏州"],["15:20","留园","按已预约时段入园，建议 1–1.5 小时。入园截止与闭园时间再查当日官方提示。","苏州留园","苏州"],["17:30","七里山塘 · 晚饭 · 夜船","天色暗后适合观光画舫；手摇船通常是白天项目，不要买错。遇雨大风或停航就改河岸散步。","苏州七里山塘","苏州"]],"tip":"计划把苏州连住日期改为10/28、10/29，10/30退房；酒店尚需改期确认。晚到时西园寺与留园二选一。","ticket":"参考：西园寺 ¥5、留园 ¥55（10 月旺季）。山塘夜游选观光画舫，票价与末班现场再核对。"},{"date":"10.29","week":"周四","city":"苏州","title":"园林、水巷与一程手摇船","tag":"提前预约 · 可减量","desc":"这天原计划过满。推荐拙政园 + 苏博本馆 + 平江路，狮子林与耦园作为替换。","route":"拙政园 → 苏博本馆 → 平江路日游手摇船 → 金鸡湖（可选）","food":"平江路边走边吃桂花糖粥、糕团；正餐选苏式面，甜口菜可少点。","stay":"苏州拙政别苑酒店 东北街168号","stops":[["08:30","拙政园","尽量早入园，预留约 1.5–2 小时。以实际可预约时段调整上午顺序。","苏州拙政园","苏州"],["11:00","苏州博物馆本馆","提前实名分时预约，预留约 1.5–2 小时。预约不上就将这个时段换成狮子林，而不要临时改去距离较远的西馆。","苏州博物馆本馆","苏州"],["替换项","狮子林（替换一处，不叠加）","更喜欢假山时，用狮子林替换拙政园或预约不到的苏博时段；不把它再塞进上午三个必去项目。","苏州狮子林","苏州",true],["13:00","午饭与短休","从东北街片区向平江路走，别在太阳或雨里连续走整天。","苏州平江路","苏州"],["14:00","平江路 · 白天手摇船","把船放在白天，按当日码头排队与停航规则安排。相门站 3 号口是南端参考入口，从你酒店出发可直接比较步行路线。","苏州平江路游船码头","苏州"],["15:30","耦园 / 昆曲博物馆","只想再看一处时二选一。昆曲馆公开开放时间为周二至周日 09:00–17:00，16:30 停入，临时安排以公告为准。","中国昆曲博物馆","苏州",true],["晚上","金鸡湖湖岸夜景（可选）","10/29为周四；现有公告主要列周五、周六喷泉场次，因此不安排喷泉必看。古城往返金鸡湖需接驳，累了直接在古城吃晚饭。","苏州金鸡湖","苏州",true]],"tip":"若你更想看狮子林的假山，把它替换拙政园或苏博时段；不建议上午三连园。","ticket":"参考：拙政园 ¥80，狮子林 ¥40，耦园 ¥25，平江路手摇船约 ¥40/人。苏博本馆免费预约。"},{"date":"10.30","week":"周五","city":"上海","title":"沿苏州河，走到外滩","tag":"上海初见 · 经典线","desc":"上午抵达上海、酒店寄存行李或入住，下午到傍晚只走一条连续路线。","route":"上海邮政博物馆外观 → 乍浦路桥 → 外白渡桥 → 外滩 → 南京东路","food":"南京东路片区尝生煎、排骨年糕；避开为打卡而长排队。","stay":"上海酒店待定","stops":[["09:14","苏州站 → 上海站","建议G7003，09:14出发、09:40到达，车程26分钟；尚未购票。两端均为市区站，抵沪后先去酒店寄存行李。","苏州站","苏州"],["12:00","酒店放行李 · 午饭","首选人民广场/南京东路片区连住两晚。若上午无法入住，先问前台能否寄存行李。","人民广场地铁站","上海"],["14:30","苏州河与邮政大楼外观","从北苏州路一侧起步，看河岸与老建筑。仅外观散步，不依赖博物馆开放。","上海邮政博物馆","上海"],["15:30","乍浦路桥 → 外白渡桥","桥上人多时别停在通行线，走走停停即可。","乍浦路桥","上海"],["17:00","外滩等城市灯亮","按当日天色安排，不预设准确亮灯时间；沿江风大，外套拿出来。","上海外滩","上海"],["18:30","南京东路附近晚饭","饭后看体力走一小段步行街，再回酒店。","上海南京东路步行街","上海"]],"tip":"10/30周五抵沪；上海站通常更适合本次人民广场—外滩住宿与散步片区，订票仍需看实际酒店地址。","ticket":"河岸、桥梁、外滩公共空间无需门票；游船与登楼为付费选项，本版不强加。"},{"date":"10.31","week":"周六","city":"上海","title":"梧桐树下，把时间放慢","tag":"衡复街区 · 轻松走","desc":"不追赶展馆，把一天留给武康路、安福路、复兴西路和街边咖啡。","route":"武康大楼 → 武康路 → 安福路 → 乌鲁木齐中路 → 复兴西路","food":"早餐生煎或馄饨；午饭家常本帮菜，下午选一家顺路咖啡馆坐下。","stay":"上海酒店待定","stops":[["09:30","到武康大楼附近","地铁/公交到达后步行，具体站口由高德安排。只在公共人行道拍外观，不进入居民门洞。","武康大楼","上海"],["10:00","武康路慢走","从建筑、街角和树影里找细节，别只围着路口拍照。","上海武康路","上海"],["11:30","安福路 · 午饭","热闹街区可能排队，看到顺路且不用久等的店就吃。","上海安福路","上海"],["14:00","乌鲁木齐中路 → 复兴西路","边逛边休息，这一段不必走满；雨天换成短距离咖啡与室内餐馆。","上海复兴西路","上海"],["17:30","回酒店片区吃晚饭","不再横跨城市赶另一个日落。若住静安寺/南京西路，可就近散步。","上海南京西路","上海"]],"tip":"10/31周六街区可能热闹；午饭避开长队，按体力缩短路线，不将进入居民楼当游览项目。","ticket":"公共街道免费。故居、展览、寺院入内可能收费或预约，本日默认只逛街区。"},{"date":"11.01","week":"周日","city":"上海","title":"喝完早茶，再说再见","tag":"返程日 · 弹性半天","desc":"行程整体提前一天，按11/1返程规划；先确认返程目的地、车站与时刻，再决定张园是否保留。","route":"早餐 → 张园 / 南京西路短逛 → 取行李 → 车站","food":"找一家酒店附近的早餐店，把最后一顿留给小馄饨、葱油拌面或生煎。","stay":"当日退房","stops":[["09:00","慢慢吃早餐","返程若很早，直接取消闲逛；退房与寄存行李政策问前台。","上海人民广场","上海"],["10:00","张园 / 南京西路","11/1周日，返程时间充足时只逛张园公共街区；展览开放另查，不临时加必须预约的新项目。","上海张园","上海",true],["返程前","回酒店取行李","市区到车站接驳时间由高德实查，再额外预留进站和安检时间。返程站不同，出发时间也不同。","上海南京西路","上海"],["待确认","前往返程车站","返程车次、站点、目的地与出发时间均未提供，暂不编造精确时刻。","上海虹桥站","上海"]],"tip":"11/1返程车次和目的地尚未提供。早班车直接取消张园，按车票时间倒推取行李与去车站。","ticket":"公共街区无需门票。未加入任何必须预约的新项目，避免返程赶场。"}];
const TICKETS=[["徐州","徐州博物馆","免费","优先进入“徐州博物馆”官方微信公众号的实名预约入口；放票日与最新规则在官方入口核实。","10/27 优先；有效证件随身。","https://api.app.anhuinews.com/appcontent/9109744.html"],["徐州","云龙山 / 云龙湖公共区域","免费*","开放区域与收费项目以官方现场为准。","登山强度自选；索道、游船等另计。","https://jsnews.jschina.com.cn/xz/a/201805/t20180503_1573864.shtml"],["徐州","宝莲寺","免费参考","公开旅行平台列为免费；最新入寺规则以寺院/现场公告为准，不预设已预约。","10/27 上午；素面供应与消费另看。","https://you.ctrip.com/sight/xuzhou230/136003800.html"],["徐州","户部山 / 文庙 / 回龙窝街区","街区免费*","公共街区可散步；院落、展馆和活动另核实。","10/26 以室外街区为主。","https://jsnews.jschina.com.cn/xz/a/202311/t20231113_3317155.shtml"],["苏州","西园寺","¥5","参考官方价格公示；以当日售票为准。","10/28；礼佛与拍摄按现场要求。","https://credit.suzhou.gov.cn/html/wap_jgsc"],["苏州","留园","¥55","10月旺季票参考；通过官方“苏州园林旅游”等核对实名票和时段。","10/28；转场晚到则与西园寺二选一。","https://credit.suzhou.gov.cn/html/wap_jgsc"],["苏州","拙政园","¥80","10月旺季票参考；官方渠道实名购票。","10/29 早场优先，按余票调整。","https://credit.suzhou.gov.cn/html/wap_jgsc"],["苏州","狮子林（替换项）","¥40","10月旺季票参考；官方渠道实名购票。","可替换苏博或拙政园，不必三连园。","https://credit.suzhou.gov.cn/html/wap_jgsc"],["苏州","苏州博物馆本馆","免费","实名分时预约，提前7天（含预约当天），系统服务8:00–23:00。","10/29；10/24 起留意可预约日期，放票细则以页面为准。","https://www.suzhou.gov.cn/szsrmzf/mszx/202603/b998c7daa6944c1fb26aac4faf7a1186.shtml"],["苏州","平江路手摇船","约¥40/人","文旅2026公示参考：约40分钟，08:30–17:30。","10/29 白天；码头、票价、末班及天气再确认。","https://visitsz.wglj.suzhou.com.cn/news-detail.aspx?id=2782"],["苏州","山塘夜游观光画舫","约¥50/人","文旅2026公示参考：往返约30分钟，08:00–20:50。","10/28 夜船选画舫；手摇船通常白天。","https://visitsz.wglj.suzhou.com.cn/news-detail.aspx?id=2782"],["苏州","耦园（加选）","¥25","10月旺季票参考；按官方售票与当日开放。","体力充足时选一处，别压缩平江路坐船。","https://credit.suzhou.gov.cn/html/wap_jgsc"],["苏州","昆曲博物馆（加选）","免费*","公开开放公告为周二至周日09–17，16:30停入；预约及临时展另核实。","10/29；不把演出默认成免费。","https://wglj.suzhou.gov.cn/szwhgdhlyj/hdxx/202409/e8a1594e70774b499c3ee1a384b5df2c.shtml"],["苏州","金鸡湖公共湖岸 / 喷泉","免费","2026公告：周五、周六19:30一场，恶劣天气暂停。","10/29周四只按湖岸夜景安排，喷泉须另看当日公告。","https://www.suzhou.gov.cn/szsrmzf/mszx/202602/c96780f3e9914363a3709dff91717101.shtml"],["上海","外滩 / 苏州河 / 南京东路","公共区域免费","步行无需购买船票或观景台票。","10/31；游船、登楼均为另付费选项。","https://www.shanghai.gov.cn/xxzfgzwj/20210608/f92e05cdda3041dfbd6cfcf9950d38eb.html"],["上海","武康路 / 安福路 / 张园街区","公共区域免费","公共街区散步；特展、场馆及私有建筑另看规则。","11/1–11/2；不默认可入居民楼。","https://www.shanghai.gov.cn/citywalk/20260625/3492b1b945c146fc96c4585d7b04f00d.html"]];
const PHOTOS=[["徐州 · 10/26","回龙窝巷口","傍晚看街巷层次，饭后拍一张灯下合影；避开店门和居民入口。","徐州回龙窝","徐州"],["徐州 · 10/27","云龙湖的一段岸线","午后到傍晚找开阔湖岸，不为机位绕完整个湖；逆光或大风时早收工。","徐州云龙湖","徐州"],["苏州 · 10/28","山塘河岸与灯影","岸上拍桥和水面倒影；船上优先坐稳，不站起挡住其他游客。","苏州七里山塘","苏州"],["苏州 · 10/29","平江路小桥与白墙","白天拍船与水巷，先走开主街人流；不跨护栏，也不为拍照挡桥。","苏州平江路","苏州"],["上海 · 10/30","乍浦路桥与外滩","先拍苏州河两岸，再去江边等天色；不要在机动车道上取景。","乍浦路桥","上海"],["上海 · 10/31","武康路树影与街角","武康大楼外观拍完继续走，树影和街角也好看；人行道上注意行人。","上海武康路","上海"]];
const TASKS=[["hotel-date-change","调整徐州与苏州酒店日期","徐州取消10/28晚；苏州增订10/28晚并取消10/30晚，保留10/29晚。先问酒店改期与退款条件。"],["train-oct28","确定10/28徐州→苏州车票","时间优先主选与备选见交通页；若原G599已买，请在12306办理日期和车次调整。"],["shanghai-stay-new","选定上海10/30→11/1两晚酒店","预算每晚200–350元；两人双床暂定，优先人民广场/南京东路。"],["shanghai-train-new","确定10/30苏州→上海车票","优先市区站直达，按交通页候选核对余票与实际时刻。"],["return-nov1","补充11/1返程目的地与时刻","车次、出发站、发车时间；确认后再决定张园半日。"],["museum-booking-new","处理新日期的博物馆与园林预约","10/27徐州博物馆、10/29苏博本馆；苏州园林改至10/28–29。原预约需同步调整。"],["room-details","核对房型、连住与同行需求","苏州“初见”床型仍需核实；酒店改期成功后再记新订单金额。"],["preferences","补充口味与步行偏好","徐州压缩后有一天较集中；是否少爬山、有无忌口可写在便签里。"]];
const STORE='xiaomiao-china-trip-2026-v1';let state={day:0,mode:'relaxed',foodCity:'全部',ticketCity:'全部',booked:{},tasks:{},notes:'',hotel:''};let storageOK=true;
function parseState(raw){const s=typeof raw==='string'?JSON.parse(raw):raw;if(!s||typeof s!=='object'||Array.isArray(s))return {};const out={};if(s.planRevision===2)out.planRevision=2;if(Number.isInteger(s.day)&&s.day>=0&&s.day<DAYS.length)out.day=s.day;if(['relaxed','full'].includes(s.mode))out.mode=s.mode;for(const k of ['foodCity','ticketCity'])if(['全部','徐州','苏州','上海'].includes(s[k]))out[k]=s[k];for(const k of ['notes','hotel'])if(typeof s[k]==='string')out[k]=s[k].slice(0,k==='notes'?10000:500);for(const k of ['booked','tasks'])if(s[k]&&typeof s[k]==='object'&&!Array.isArray(s[k]))out[k]=Object.fromEntries(Object.entries(s[k]).filter(([id,v])=>/^[\w-]{1,60}$/.test(id)&&typeof v==='boolean'));return out;}
try{state={...state,...parseState(document.getElementById('saved-state').textContent)};}catch(e){}
try{const local=localStorage.getItem(STORE);if(local)state={...state,...parseState(local)};}catch(e){storageOK=false;}
if(state.planRevision!==2){if(state.day>=2)state.day--;state.booked=Object.fromEntries(Object.entries(state.booked).filter(([k])=>Number(k.replace('ticket-',''))<4));state.planRevision=2;}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function amap(name,city){return 'https://uri.amap.com/search?keyword='+encodeURIComponent(name)+'&city='+encodeURIComponent(city)+'&view=map&src=xiaomiao-trip&callnative=1';}
function mapLink(name,city,label='高德 ↗'){return '<a class="map-link" href="'+amap(name,city)+'" target="_blank" rel="noopener noreferrer" aria-label="高德打开'+esc(name)+'">'+esc(label)+'</a>';}
function icon(id){return '<svg fill="none" stroke="currentColor"><use href="#i-'+id+'"/></svg>';}
function renderDayBase(){const d=DAYS[state.day];document.getElementById('day-tabs').innerHTML=DAYS.map((day,i)=>'<button class="day-tab '+(state.day===i?'active':'')+'" id="day-tab-'+i+'" role="tab" type="button" aria-controls="day-content" aria-selected="'+(state.day===i)+'" tabindex="'+(state.day===i?0:-1)+'" data-day="'+i+'"><span>'+esc(day.week)+'</span><b>'+day.date+'</b><span>'+day.city+'</span></button>').join('');const visible=d.stops.filter(s=>state.mode==='full'||!s[5]);document.getElementById('day-content').setAttribute('aria-labelledby','day-tab-'+state.day);document.getElementById('day-content').innerHTML='<div class="day-heading"><h3>'+esc(d.city+' · '+d.title)+'</h3><span class="tag">'+esc(d.tag)+'</span></div><p class="day-description">'+esc(d.desc)+'</p><div class="route-ribbon">'+esc(d.route)+'</div><div class="switch-row"><span>按体力取舍，别让行程追着你跑</span><div class="switch" aria-label="行程强度"><button type="button" data-mode="relaxed" class="'+(state.mode==='relaxed'?'active':'')+'" aria-pressed="'+(state.mode==='relaxed')+'">轻松主线</button><button type="button" data-mode="full" class="'+(state.mode==='full'?'active':'')+'" aria-pressed="'+(state.mode==='full')+'">含备选</button></div></div><div class="timeline">'+visible.map(s=>'<div class="stop '+(s[5]?'optional':'')+'"><div class="stop-time">'+esc(s[0])+'</div><div class="stop-body"><div class="stop-title"><h4>'+esc(s[1])+(s[5]?' <span class="tag gray">可选</span>':'')+'</h4>'+(s[1]==='前往返程车站'?'<a class="map-link" href="transport.html">选择正确车站 ↗</a>':s[1]==='回酒店取行李'?(state.hotel?mapLink(state.hotel,'上海'):'<a class="map-link" href="stay.html">确认上海酒店 ↗</a>'):mapLink(s[3],s[4]))+'</div><p>'+esc(s[2])+'</p></div></div>').join('')+'</div>';
const canMap=d.stay===HOTEL_XZ||d.stay===HOTEL_SZ;document.getElementById('day-aside').innerHTML='<div class="card side-card dark"><div class="side-title">'+icon('bed')+'今晚住这里</div><h4>'+esc(d.stay===HOTEL_XZ?'中山南路的老城落脚点':d.stay===HOTEL_SZ?'东北街，园林就在这一带':d.stay)+'</h4><p>'+esc(d.stay===HOTEL_XZ?'计划10/26–10/28住两晚；原订单含10/28晚，需取消或改期。':d.stay===HOTEL_SZ?'东北街168号；计划10/28–10/30连住两晚，原订单需改期。':state.hotel||'优先人民广场附近，每晚200–350元；酒店和床型待定。')+'</p><div class="link-row"><span>'+d.date+' · '+d.week+'</span>'+(canMap?mapLink(d.stay,d.city,'打开酒店 ↗'):'<a class="map-link" href="stay.html">看住宿建议 ↗</a>')+'</div></div><div class="card side-card"><div class="side-title">'+icon('bowl')+'今天吃什么</div><p>'+esc(d.food)+'</p><a class="map-link" href="food.html">翻开美食清单 ↗</a></div><div class="card side-card"><div class="side-title">'+icon('ticket')+'出门前记得</div><p>'+esc(d.ticket)+'</p><p style="margin-bottom:0;color:#9a7658">'+esc(d.tip)+'</p></div>';}
function renderFilter(target,selected,key){document.getElementById(target).innerHTML=['全部','徐州','苏州','上海'].map(c=>'<button type="button" data-'+key+'="'+c+'" class="'+(selected===c?'active':'')+'" aria-pressed="'+(selected===c)+'">'+c+'</button>').join('');}
function ticketId(i){return 'ticket-'+i;}
function renderTasks(){const count=TASKS.filter(t=>state.tasks[t[0]]).length;const badge=document.getElementById("task-count");if(badge)badge.textContent=TASKS.length-count;if(!document.getElementById("task-list"))return;document.getElementById('task-list').innerHTML=TASKS.map(t=>'<div class="task '+(state.tasks[t[0]]?'done':'')+'"><input type="checkbox" id="task-'+t[0]+'" data-task="'+t[0]+'" '+(state.tasks[t[0]]?'checked':'')+'><label for="task-'+t[0]+'">'+esc(t[1])+'<small>'+esc(t[2])+'</small></label></div>').join('');document.getElementById('task-progress').textContent='已确认 '+count+' / '+TASKS.length+' 项';}
let toastTimer;function toast(text){const el=document.getElementById('toast');el.textContent=text;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,4000);}
function download(content,type,name){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}

const VENUES=[{"id":"xz-dazhang","city":"徐州","type":"restaurant","name":"大张烙馍村（滨湖东街店）","dishes":["烙馍卷馓子","地锅鸡","蒜爆鱼"],"area":"云龙湖滨湖新天地","address":"滨湖新天地步行街东街 B 区 1 楼 5-2 号","nearWalk":0,"budget":"人均约 60–90 元 · 规划估计","budgetCnyPerPerson":[60,90],"mapQuery":"徐州 大张烙馍村 滨湖东街店","tip":"更适合 10 月 27 日云龙湖游览后安排正餐，两人先点一份主菜和烙馍，地锅口味可提前询问辣度。","verificationNote":"省级本地新闻将此门店列入云龙湖餐饮路线；具体地址由门店资料补充。","sources":[{"title":"中国江苏网：徐州旅游线路","url":"https://jsnews.jschina.com.cn/xz/a/202304/t20230426_3205487.shtml","kind":"local_media"},{"title":"携程：大张烙馍村滨湖东街店","url":"https://gs.ctrip.com/html5/you/foods/fooddetail/230/19098774.html","kind":"venue_listing"}]},{"id":"xz-lujia","city":"徐州","type":"restaurant","name":"路家棉布地锅鸡（样板店·苏堤北路店）","dishes":["地锅鸡","贴饼","馓子"],"area":"苏堤北路","address":"苏堤北路，具体门牌请导航确认","nearWalk":0,"budget":"人均约 50–80 元 · 规划估计","budgetCnyPerPerson":[50,80],"mapQuery":"徐州 路家棉布地锅鸡 样板店 苏堤北路","tip":"作为专门吃地锅鸡的备选，需要接驳，不必为它折返。地锅分量较大，两人先问小份。","verificationNote":"核对到苏堤北路分店资料；不与西苑路亮总店混写地址。","sources":[{"title":"携程：路家棉布地锅鸡苏堤北路店","url":"https://gs.ctrip.com/html5/you/foods/fooddetail/230/7722211.html","kind":"venue_listing"},{"title":"中国江苏网：徐州特色美食","url":"https://jsnews.jschina.com.cn/xz/a/202312/t20231218_3334971.shtml","kind":"local_media"}]},{"id":"xz-laoshi","city":"徐州","type":"restaurant","name":"老拾烧烤（丰储街总店）","dishes":["羊肉串","烤馍","烤蔬菜"],"area":"户部山 / 丰储街","address":"丰储北巷 81 号-2 号","nearWalk":0,"budget":"人均约 60–100 元 · 规划估计","budgetCnyPerPerson":[60,100],"mapQuery":"徐州 老拾烧烤 丰储街总店","tip":"可作为老城夜游后的坐店晚饭。提前问清单串规格与价格，再分批加串。","verificationNote":"店名和地址核对高德具体门店页面；没有使用未核实的网红排名。","sources":[{"title":"高德地图：老拾烧烤丰储街总店","url":"https://ditu.amap.com/place/B0FFFV3HC8","kind":"map_listing"}]},{"id":"xz-baiwei","city":"徐州","type":"restaurant","name":"百味地锅鸡（一店·夹河西街店）","dishes":["地锅鸡","锅边贴饼"],"area":"夹河西街","address":"夹河西街与西安北路交叉口往西约 100 米，金庭嘉园附近","nearWalk":0,"budget":"人均约 50–80 元 · 规划估计","budgetCnyPerPerson":[50,80],"mapQuery":"徐州 百味地锅鸡 一店 夹河西街","tip":"作为徐州两日里的正餐备选，按住处与当晚路线决定；不为地锅鸡专程跨城绕路。","verificationNote":"具体分店由公开门店资料核对；省级本地新闻提供品牌与徐州地锅菜背景。","sources":[{"title":"携程：百味地锅鸡夹河西街店","url":"https://gs.ctrip.com/html5/you/foods/fooddetail/230/46207.html","kind":"venue_listing"},{"title":"城市吧：百味地锅鸡地址","url":"https://xuzhou.city8.com/cater/893vq37c5tdzb5c2dc","kind":"map_listing"},{"title":"中国江苏网：徐州旅游线路","url":"https://jsnews.jschina.com.cn/xz/a/202304/t20230426_3205487.shtml","kind":"local_media"}]},{"id":"xz-lianglaifeng","city":"徐州","type":"snack","name":"两来风（文亭街店）","dishes":["辣汤","煎包","锅贴"],"area":"文亭街 / 市中心","address":"文亭街 8 号","nearWalk":0,"budget":"人均约 15–25 元 · 规划估计","budgetCnyPerPerson":[15,25],"mapQuery":"徐州 两来风 文亭街店","tip":"适合 27 或 28 日早饭。先小份辣汤配煎包，注意辣汤与饣它汤是不同选择。","verificationNote":"核对具体门店资料与文亭街地址；营业时段需临行确认。","sources":[{"title":"携程：两来风文亭街店","url":"https://gs.ctrip.com/html5/you/foods/fooddetail/230/46097.html","kind":"venue_listing"},{"title":"图吧：两来风文亭街地址","url":"https://dianhua.mapbar.com/MAPIFBYMJBTICPXRYMXOC.html","kind":"map_listing"}]},{"id":"xz-mashijie","city":"徐州","type":"snack","name":"马市街饣它汤店（解放路店）","dishes":["饣它汤","锅贴"],"area":"解放路老城","address":"解放路，门牌以导航门店为准","nearWalk":0,"budget":"人均约 15–25 元 · 规划估计","budgetCnyPerPerson":[15,25],"mapQuery":"徐州 马市街饣它汤 解放路店","tip":"作为徐州另一顿早餐，和两来风分开安排；饣它汤常写作食它汤，导航可试两种写法。","verificationNote":"核对具体解放路门店；老字号品牌信息有商务部公开资料支持。","sources":[{"title":"Trip.com：马市街食它汤","url":"https://hk.trip.com/restaurant/china/xuzhou/detail/ma-shi-jie-shi-ta-tang-103529/","kind":"venue_listing"},{"title":"商务部：老字号数字博物馆","url":"https://lzhbwg.mofcom.gov.cn/edi_ecms_web_front/thb/detail/a7b55969eb3944379e3bb30ab0088dae","kind":"official"}]},{"id":"xz-xulaoba","city":"徐州","type":"snack","name":"许老八包子铺（回龙窝店）","dishes":["羊肉包子"],"area":"回龙窝","address":"回龙窝历史文化街区内","nearWalk":0,"budget":"人均约 10–25 元 · 规划估计","budgetCnyPerPerson":[10,25],"mapQuery":"徐州 许老八包子铺 回龙窝店","tip":"10 月 26 日回龙窝散步时尝一两个即可，留胃给晚饭；具体口味看当天供应。","verificationNote":"2026 年人民网江苏报道核对到回龙窝许老八；包子口味另有本地报道。","sources":[{"title":"人民网江苏：徐州老城消费街区","url":"https://js.people.com.cn/n2/2026/0609/c360301-41604756.html","kind":"local_media"},{"title":"本地报道：回龙窝美食","url":"https://k.sina.cn/article_5675440730_152485a5a020019j0v.html?from=news&subch=onews","kind":"local_media"}],"xhsEvidence":{"title":"小红书：徐州土著连夜整理！无广纯享版必吃清单（页面显示1天前，10/21读取）","url":"https://www.xiaohongshu.com/explore/6ad6d9b1000000002601ec59","kind":"xiaohongshu_note","text":"近期笔记提到回龙窝店的羊肉煎包与早餐排队，可提前留一点时间。"}},{"id":"xz-sanzhenzhai","city":"徐州","type":"snack","name":"三珍斋（大同街店）","dishes":["馄饨","蒸饺"],"area":"大同街 / 市中心","address":"大同街，具体门牌请导航确认","nearWalk":0,"budget":"人均约 15–30 元 · 规划估计","budgetCnyPerPerson":[15,30],"mapQuery":"徐州 三珍斋 大同街","tip":"适合安排一顿清淡的馄饨简餐，老城走累了可坐下休息。","verificationNote":"地方文明实践平台介绍三珍斋恢复营业及馄饨蒸饺；2026 年本地报道核对品牌仍在老城线索中。","sources":[{"title":"云龙文明实践：老字号街区","url":"https://www.ylwmsj.cn/News/Detail/32057","kind":"official_local"},{"title":"人民网江苏：徐州老城消费街区","url":"https://js.people.com.cn/n2/2026/0609/c360301-41604756.html","kind":"local_media"}]},{"id":"xz-azhe","city":"徐州","type":"snack","name":"云龙湖阿喆米线（总店）","dishes":["米线","卤味"],"area":"云龙湖滨湖公园","address":"滨湖公园水晶宫码头，水文阁往东约 20 米","nearWalk":0,"budget":"人均约 20–35 元 · 规划估计","budgetCnyPerPerson":[20,35],"mapQuery":"徐州 云龙湖阿喆米线 总店","tip":"27 日湖边午餐想吃简便些时，与大张烙馍村二选一，不用为吃饭绕回市中心。","verificationNote":"中国江苏网的云龙湖线路提及阿喆米线；门店位置由高德核对。","sources":[{"title":"高德地图：云龙湖阿喆米线总店","url":"https://ditu.amap.com/place/B0FFHBUD1R","kind":"map_listing"},{"title":"中国江苏网：徐州旅游线路","url":"https://jsnews.jschina.com.cn/xz/a/202304/t20230426_3205487.shtml","kind":"local_media"}]},{"id":"sz-yuxingji","city":"苏州","type":"restaurant","name":"裕兴记（西北街总店）","dishes":["爆鱼面","焖肉面","两面黄"],"area":"西北街 / 东北街酒店附近","address":"西北街 11 号","nearWalk":2,"budget":"人均约 35–65 元 · 规划估计","budgetCnyPerPerson":[35,65],"mapQuery":"苏州 裕兴记 西北街总店","tip":"29日进园前或30日转场前可就近吃苏式面；十月底不预设供应三虾面，按当天菜单选浇头。","verificationNote":"高德具体门店地址与携程菜品资料核对。","sources":[{"title":"高德地图：裕兴记西北街总店","url":"https://www.amap.com/place/B0200177KR","kind":"map_listing"},{"title":"携程：裕兴记","url":"https://gs.ctrip.com/html5/you/foods/fooddetail/2015750/5125945.html","kind":"venue_listing"}]},{"id":"sz-deyuelou","city":"苏州","type":"restaurant","name":"得月楼（观前店）","dishes":["松鼠鳜鱼","响油鳝糊","苏式时蔬"],"area":"观前街 / 太监弄","address":"太监弄 43 号","nearWalk":2,"budget":"人均约 90–160 元 · 规划估计","budgetCnyPerPerson":[90,160],"mapQuery":"苏州 得月楼 观前店 太监弄","tip":"适合专门安排一顿苏帮菜，需从平江路接驳到观前片区。两人不必同时点整鱼和多道大菜。","verificationNote":"核对观前店具体地址和苏帮菜门店资料；价格为规划估计。","sources":[{"title":"高德地图：得月楼观前店","url":"https://ditu.amap.com/place/B020000FA2","kind":"map_listing"},{"title":"携程：得月楼观前店","url":"https://gs.ctrip.com/html5/you/foods/fooddetail/11/4925252.html","kind":"venue_listing"}]},{"id":"sz-songhelou","city":"苏州","type":"restaurant","name":"松鹤楼（山塘店）","dishes":["松鼠鳜鱼","清炒虾仁","响油鳝糊"],"area":"七里山塘","address":"山塘街 198 号","nearWalk":1,"budget":"人均约 100–180 元 · 规划估计","budgetCnyPerPerson":[100,180],"mapQuery":"苏州 松鹤楼 山塘店","tip":"28日山塘夜游前后坐下来吃苏帮菜，按胃口少点几道；是否排队及价格以门店为准。","verificationNote":"苏州市文旅公开美食文章核对具体山塘店和地址。","sources":[{"title":"苏州文旅：山塘美食","url":"https://visitsz.wglj.suzhou.com.cn/news-detail.aspx?id=298","kind":"official_tourism"}]},{"id":"sz-danfeng","city":"苏州","type":"snack","name":"丹凤楼食府（新民桥菜场）","dishes":["包子","大馄饨","赤豆糊小圆子"],"area":"新民桥菜场入口","address":"新民桥菜场入口附近，门牌以导航为准","nearWalk":1,"budget":"人均约 15–35 元 · 规划估计","budgetCnyPerPerson":[15,35],"mapQuery":"苏州 丹凤楼食府 新民桥","tip":"28日留园到山塘这段的正餐备选，先确认当日营业和定位，不把它当路边小吃。","verificationNote":"2025 年苏州文旅新民桥美食专题具体介绍这家店及小吃。","sources":[{"title":"苏州市文旅局：新民桥美食","url":"https://wglj.suzhou.gov.cn/szwhgdhlyj/hcgms/202510/df94c7c1a829418ab825ead853f8838c.shtml","kind":"official_tourism"}]},{"id":"sz-xiekehuang","city":"苏州","type":"snack","name":"江南蟹壳皇（西北街店）","dishes":["蟹壳黄烧饼"],"area":"西北街 / 酒店附近","address":"西北街 33 号","nearWalk":2,"budget":"人均约 10–20 元 · 规划估计","budgetCnyPerPerson":[10,20],"mapQuery":"苏州 江南蟹壳皇 西北街33号","tip":"住东北街时买一两只作早餐或路上点心即可。名称里的蟹壳指外形，馅料以当天菜单为准。","verificationNote":"苏州文旅文章同时介绍新民桥店与西北街 33 号分店；本行选择靠近酒店的分店。","sources":[{"title":"苏州文旅：江南蟹壳皇分店信息","url":"https://visitsz.wglj.suzhou.com.cn/news-detail.aspx?id=298","kind":"official_tourism"},{"title":"苏州市文旅局：新民桥美食","url":"https://wglj.suzhou.gov.cn/szwhgdhlyj/hcgms/202510/df94c7c1a829418ab825ead853f8838c.shtml","kind":"official_tourism"}]},{"id":"sz-madongpei","city":"苏州","type":"snack","name":"马栋佩烧卖（新民桥店）","dishes":["糯米烧卖","蛋黄烧卖"],"area":"广济路 / 新民桥菜市场","address":"广济路 236 号一楼 A7、A8","nearWalk":1,"budget":"人均约 15–30 元 · 规划估计","budgetCnyPerPerson":[15,30],"mapQuery":"苏州 马栋佩烧卖 新民桥","tip":"可与丹凤楼二选一，再向山塘方向走；糯米烧卖顶饱，先少量买。","verificationNote":"苏州文旅介绍烧卖店与菜品，具体铺位由门店资料补充。","sources":[{"title":"苏州市文旅局：新民桥美食","url":"https://wglj.suzhou.gov.cn/szwhgdhlyj/hcgms/202510/df94c7c1a829418ab825ead853f8838c.shtml","kind":"official_tourism"},{"title":"Trip.com：马栋佩烧卖","url":"https://hk.trip.com/restaurant/china/suzhou/detail/restaurant-36970933/","kind":"venue_listing"}]},{"id":"sz-rongyanglou","city":"苏州","type":"snack","name":"荣阳楼（山塘街店）","dishes":["油氽团子","小馄饨"],"area":"山塘街","address":"山塘街 329 号","nearWalk":1,"budget":"人均约 15–30 元 · 规划估计","budgetCnyPerPerson":[15,30],"mapQuery":"苏州 荣阳楼 山塘街329号","tip":"29 日尽量在傍晚前尝，先买一只团子现吃；不要默认夜游结束后老店仍营业。","verificationNote":"苏州文旅公开文章核对地址与油氽团子；晚间时段请现场确认。","sources":[{"title":"苏州文旅：山塘老字号","url":"https://visitsz.wglj.suzhou.com.cn/news-detail.aspx?id=298","kind":"official_tourism"},{"title":"携程：荣阳楼","url":"https://gs.ctrip.com/html5/you/foods/Suzhou11/5123655.html","kind":"venue_listing"}]},{"id":"sz-taohuayuan","city":"苏州","type":"snack","name":"平江桃花源记（平江 1 店）","dishes":["赤豆糊糖粥","酱鸡脚","鸡汤馄饨"],"area":"平江路","address":"平江路 115 号","nearWalk":2,"budget":"人均约 20–40 元 · 规划估计","budgetCnyPerPerson":[20,40],"mapQuery":"苏州 平江桃花源记 平江1店 平江路115号","tip":"30 日平江路手摇船前后作甜口歇脚站，排队长就换附近店，不挤占船和园林时间。","verificationNote":"具体分店、地址和菜品核对公开门店资料，未使用未经核验的社交平台评分。","sources":[{"title":"携程：平江桃花源记平江1店","url":"https://gs.ctrip.com/html5/you/foods/Suzhou11/5133429.html","kind":"venue_listing"}]},{"id":"sz-wanfuxing","city":"苏州","type":"snack","name":"万福兴（山塘街店）","dishes":["苏式糕团","时令糕点"],"area":"山塘街","address":"山塘街 303 号","nearWalk":1,"budget":"人均约 10–25 元 · 规划估计","budgetCnyPerPerson":[10,25],"mapQuery":"苏州 万福兴 山塘街303号","tip":"与荣阳楼相邻片区，适合买少量糕团分着尝；品种随时令与当日出品变化。","verificationNote":"苏州文旅文章核对山塘分店及地址；不保证某一时令糕点持续供应。","sources":[{"title":"苏州文旅：山塘美食与万福兴","url":"https://visitsz.wglj.suzhou.com.cn/news-detail.aspx?id=298","kind":"official_tourism"}],"xhsEvidence":{"title":"小红书：苏州纯吃攻略丨本地人的逛吃清单（10/09，10/21读取）","url":"https://www.xiaohongshu.com/explore/6ac8a226000000001c01eea6","kind":"xiaohongshu_note","text":"笔记推荐糕团，但评论里有人觉得口感偏实、黏牙。先买少量试口味，两人分食即可。"}},{"id":"sh-lanxin","city":"上海","type":"restaurant","name":"兰心餐厅（进贤路）","dishes":["红烧肉","酱鸭","油爆虾"],"area":"进贤路 / 茂名南路","address":"进贤路 130 号","nearWalk":4,"budget":"人均约 80–130 元 · 规划估计","budgetCnyPerPerson":[80,130],"mapQuery":"上海 兰心餐厅 进贤路130号","tip":"11 月 1 日若想吃本帮菜，可从复兴西路一带接驳过来；它不在武康路沿线，别当成步行必经点。","verificationNote":"2026 年上海政府英文美食专题提及兰心红烧肉；具体地址由门店页面补充。","sources":[{"title":"上海市政府：2026 上海本地风味","url":"https://english.shanghai.gov.cn/en-GlobalTasteinShanghai2026-LocalFlavors/20260509/3cb184e834064f4cbb1af26cfc34dc1e.html","kind":"official"},{"title":"去哪儿：兰心餐厅","url":"https://touch.travel.qunar.com/poi/3165802","kind":"venue_listing"}]},{"id":"sh-haijinze","city":"上海","type":"restaurant","name":"海金滋（陕西南路店）","dishes":["葱烤大排","红烧肉","本帮时蔬"],"area":"进贤路 / 陕西南路","address":"进贤路 240 号","nearWalk":4,"budget":"人均约 70–110 元 · 规划估计","budgetCnyPerPerson":[70,110],"mapQuery":"上海 海金滋 陕西南路店 进贤路240号","tip":"可与兰心二选一，适合两人点两三道菜。分店名称虽写陕西南路，实际核对地址为进贤路 240 号。","verificationNote":"2026 年更新的公开店铺资料核对地址；本地媒体历史报道支持葱烤大排等菜式线索。","sources":[{"title":"城市惠：海金滋陕西南路店","url":"https://www.cityhui.com/shop/17938.html","kind":"venue_listing"},{"title":"周到上海：海金滋","url":"https://static.zhoudaosh.com/files/63AE2C5EC299E10FDAB0550435E2BD18969CC2B31B39961F436485FF8706393C/6ab32a272a99cc126725643ea2f4ddb84ac50a08.html","kind":"local_media"}]},{"id":"sh-oldjesse","city":"上海","type":"restaurant","name":"老吉士饭馆（天平路店）","dishes":["红烧肉","熏鱼","蟹粉豆腐"],"area":"天平路 / 淮海中路","address":"天平路 41 号","nearWalk":4,"budget":"人均约 150–250 元 · 规划估计","budgetCnyPerPerson":[150,250],"mapQuery":"上海 老吉士饭馆 天平路41号","tip":"离武康大楼片区较近，作为提高一餐预算的可选项。先确认订位和菜单；若按经济预算吃，可选兰心或海金滋。","verificationNote":"高德核对具体天平路门店地址；菜式为公开餐厅介绍线索，预算不代表当前菜单。","sources":[{"title":"高德地图：老吉士饭馆","url":"https://ditu.amap.com/place/B00156G74J","kind":"map_listing"},{"title":"上海餐厅指南：Old Jesse","url":"https://www.shanghai-restaurant.com/restaurant/old-jesse/","kind":"restaurant_guide"}]},{"id":"sh-xiaoshaoxing","city":"上海","type":"restaurant","name":"小绍兴（山西南路新店）","dishes":["白斩鸡","鸡粥","桂花米乳"],"area":"山西南路 / 南京东路","address":"山西南路新店，具体门牌请高德确认","nearWalk":3,"budget":"人均约 50–90 元 · 规划估计","budgetCnyPerPerson":[50,90],"mapQuery":"上海 小绍兴 山西南路","tip":"10 月 31 日南京东路步行前后吃白斩鸡，点半只或小份先问店员。2026 年有迁址信息，别照旧攻略跑云南南路。","verificationNote":"上海市政府 2026-02-11 公开报道核对迁至山西南路；未编造新店门牌。鸡粥是否当日供应请看菜单。","sources":[{"title":"上海市政府：小绍兴鲜得来迁址后的新店","url":"https://www.shanghai.gov.cn/nw4411/20260211/11359d7cb6ef484c86b26abdc4bd05bc.html","kind":"official"}]},{"id":"sh-xiandelai","city":"上海","type":"snack","name":"鲜得来（福建中路新总店）","dishes":["排骨年糕"],"area":"福建中路 / 南京东路片区","address":"福建中路新总店，具体门牌请高德确认","nearWalk":3,"budget":"人均约 30–50 元 · 规划估计","budgetCnyPerPerson":[30,50],"mapQuery":"上海 鲜得来 总店 福建中路","tip":"31 日想用一份上海小吃解决简餐时可选，与小绍兴挑一个就够。优先核对新总店，旧云南南路信息可能已过时。","verificationNote":"2026 年上海市政府报道明确其总店迁至福建中路，并介绍排骨年糕。","sources":[{"title":"上海市政府：小绍兴鲜得来迁址后的新店","url":"https://www.shanghai.gov.cn/nw4411/20260211/11359d7cb6ef484c86b26abdc4bd05bc.html","kind":"official"}]},{"id":"sh-dahuchun","city":"上海","type":"snack","name":"大壶春（山西南路店）","dishes":["生煎"],"area":"山西南路 / 南京东路","address":"山西南路与南京路步行街交叉口附近，西北方向约 40 米","nearWalk":3,"budget":"人均约 20–35 元 · 规划估计","budgetCnyPerPerson":[20,35],"mapQuery":"上海 大壶春 山西南路店","tip":"住人民广场或南京东路时适合早餐；生煎先小口咬开，趁热慢吃。","verificationNote":"上海民政局转发的 2026 年公开报道核对山西南路新店已开；高德核对路口位置。","sources":[{"title":"上海民政：山西南路新店信息","url":"https://mzj.sh.gov.cn/lnb-xw/20260113/492b829efb374c35953724c97036d5b4.html","kind":"official"},{"title":"高德地图：大壶春山西南路店","url":"https://www.amap.com/place/B0L3TX90XG","kind":"map_listing"}]},{"id":"sh-shendacheng","city":"上海","type":"snack","name":"沈大成（南京东路总店）","dishes":["条头糕","双酿团","时令糕团"],"area":"南京东路步行街","address":"南京东路 636 号","nearWalk":3,"budget":"人均约 15–35 元 · 规划估计","budgetCnyPerPerson":[15,35],"mapQuery":"上海 沈大成 南京东路636号","tip":"在步行街顺路买一两样分着吃；打包前确认保存方式，鲜糕团不宜一路久放。","verificationNote":"2026 年上海政府美食专题与高德均核对南京东路 636 号；糕团品种按当日出品。","sources":[{"title":"上海市政府：2026 沈大成风味信息","url":"https://english.shanghai.gov.cn/en-GlobalTasteinShanghai2026-LocalFlavors/20260618/a74fedaf5c884243855303f04741060b.html","kind":"official"},{"title":"高德地图：沈大成南京东路总店","url":"https://www.amap.com/place/B00155H99S","kind":"map_listing"},{"title":"Trip.com：沈大成","url":"https://tw.trip.com/restaurant/china/shanghai/detail/shen-dacheng-10561270/","kind":"venue_listing"}]},{"id":"sh-baiyulan","city":"上海","type":"snack","name":"白玉兰食品（甜云店）","dishes":["烧卖","肉包","蟹壳黄"],"area":"北外滩 / 白玉兰广场","address":"东长治路 588 号白玉兰广场 LG2-M59-60","nearWalk":3,"budget":"人均约 15–35 元 · 规划估计","budgetCnyPerPerson":[15,35],"mapQuery":"上海 白玉兰食品 甜云店 白玉兰广场","tip":"只在外滩线愿意延伸到北外滩时选，不为了它硬加路程。合作节目提及白玉兰品牌，本次选择的甜云分店由公开门店资料另行核对。","yamiEvidence":"partner_program_brand_only","yamiLabel":"鸭觅合作节目提及品牌 · 非 App 当前推荐认证","verificationNote":"具体分店地址由门店资料核对；鸭觅合作节目只支持品牌线索，不支持该分店的当前 App 推荐、评分或金勺子状态。","sources":[{"title":"Trip.com：白玉兰食品甜云店","url":"https://us.trip.com/restaurant/china/shanghai/detail/restaurant-70027295/","kind":"venue_listing"},{"title":"携程：白玉兰食品甜云店","url":"https://gs.ctrip.com/html5/you/foods/fooddetail/2/24937256.html","kind":"venue_listing"},{"title":"小宇宙：鸭觅合作节目大食话 Vol-102","url":"https://www.xiaoyuzhoufm.com/episode/697c7834073030367a788c20","kind":"partner_program"}]},{"id":"xz-yiwaipo-wuzhuang","city":"徐州","type":"restaurant","name":"忆外婆地锅鸡（吴庄店）","dishes":["地锅鸡","蒜爆鲤鱼","香菜馓子"],"area":"吴庄片区 · 需接驳","address":"吴庄店；具体门牌与营业时间请在高德核对","nearWalk":0,"budgetCnyPerPerson":[50,80],"mapQuery":"徐州 忆外婆地锅鸡 吴庄店","tip":"地锅鸡正餐备选。徐州压缩为两天后，和大张烙馍村、路家地锅鸡择一；不为多吃一家增加往返。","verificationNote":"读到小红书10/20左右笔记；点评平台交叉核对店名，尚未核定当前门牌。","sources":[{"title":"携程：忆外婆地锅鸡吴庄店","url":"https://you.ctrip.com/food/xuzhou230/16647881-dianping.html","kind":"venue_listing"},{"title":"小红书：徐州土著连夜整理！无广纯享版必吃清单（页面显示1天前，10/21读取）","url":"https://www.xiaohongshu.com/explore/6ad6d9b1000000002601ec59","kind":"xiaohongshu_note"}],"xhsEvidence":{"title":"小红书：徐州土著连夜整理！无广纯享版必吃清单（页面显示1天前，10/21读取）","url":"https://www.xiaohongshu.com/explore/6ad6d9b1000000002601ec59","kind":"xiaohongshu_note","text":"近期笔记提及地锅鸡、蒜爆鲤鱼和香菜馓子，可用作点菜线索。"}},{"id":"xz-panji-xinglong","city":"徐州","type":"restaurant","name":"潘记红烧肉（兴隆街店）","dishes":["红烧肉","盖浇饭","家常小炒"],"area":"彭城老城 · 兴隆街","address":"兴隆街店；导航时核对分店","nearWalk":0,"budgetCnyPerPerson":[25,45],"mapQuery":"徐州 潘记红烧肉 兴隆街店","tip":"适合想吃一顿简单米饭和家常菜的时候。26日晚或27日回市区后按实际位置选，不需要额外赶一场夜宵。","verificationNote":"小红书近期笔记与旅行平台均有兴隆街店信息。","sources":[{"title":"Trip.com：潘记红烧肉兴隆街店","url":"https://hk.trip.com/restaurant/china/xuzhou/detail/restaurant-42450326/","kind":"venue_listing"},{"title":"小红书：徐州土著连夜整理！无广纯享版必吃清单（页面显示1天前，10/21读取）","url":"https://www.xiaohongshu.com/explore/6ad6d9b1000000002601ec59","kind":"xiaohongshu_note"}],"xhsEvidence":{"title":"小红书：徐州土著连夜整理！无广纯享版必吃清单（页面显示1天前，10/21读取）","url":"https://www.xiaohongshu.com/explore/6ad6d9b1000000002601ec59","kind":"xiaohongshu_note","text":"近期笔记提及兴隆街店的红烧肉；甜口是否合适，点单时先问。"}},{"id":"sz-qiujuan","city":"苏州","type":"snack","name":"秋娟馄饨店","dishes":["大馄饨","肉汤圆"],"area":"山塘附近 · 居民巷子","address":"广济路西杨安浜3号楼（高德公开店址）","nearWalk":1,"budgetCnyPerPerson":[15,30],"mapQuery":"苏州 秋娟馄饨店 西杨安浜","tip":"适合西园—山塘这天的早午餐或小吃停靠。店在巷内，先查营业再走过去；不能默认夜间仍营业。","verificationNote":"已读10/09小红书笔记，并用高德店址交叉确认。","sources":[{"title":"高德：秋娟馄饨店","url":"https://www.amap.com/place/B0FFJ2AAIX","kind":"map_listing"},{"title":"小红书：苏州纯吃攻略丨本地人的逛吃清单（10/09，10/21读取）","url":"https://www.xiaohongshu.com/explore/6ac8a226000000001c01eea6","kind":"xiaohongshu_note"}],"xhsEvidence":{"title":"小红书：苏州纯吃攻略丨本地人的逛吃清单（10/09，10/21读取）","url":"https://www.xiaohongshu.com/explore/6ac8a226000000001c01eea6","kind":"xiaohongshu_note","text":"笔记推荐大馄饨和肉汤圆。个人消费只作参考，按当天菜单点单。"}},{"id":"sh-jiangzhanggui","city":"上海","type":"restaurant","name":"蒋掌柜·老上海本帮美食（武康大楼店）","dishes":["排骨年糕","响油鳝丝面","罗宋汤"],"area":"武康大楼 · 淮海中路","address":"淮海中路1793号","nearWalk":4,"budgetCnyPerPerson":[60,100],"mapQuery":"上海 蒋掌柜 老上海本帮美食 武康大楼店 淮海中路1793号","tip":"适合武康路开始前吃午饭。喜欢浓油赤酱可选本帮面，清淡口味可少点浇头；两人分一份排骨年糕再各选主食。","verificationNote":"已读09/30探店正文；高德与Trip.com交叉核对门牌。","sources":[{"title":"高德：蒋掌柜老上海本帮美食","url":"https://www.amap.com/place/B0HA9U9FSU","kind":"map_listing"},{"title":"小红书：武康大楼附近吃什么（09/30，10/21读取）","url":"https://www.xiaohongshu.com/explore/6abd289100000000150118a0","kind":"xiaohongshu_note"}],"xhsEvidence":{"title":"小红书：武康大楼附近吃什么（09/30，10/21读取）","url":"https://www.xiaohongshu.com/explore/6abd289100000000150118a0","kind":"xiaohongshu_note","text":"探店笔记偏爱排骨年糕与鳝丝面，同时提到咸甜偏浓、吃多易腻；可按口味少量点。"}},{"id":"sh-kukuang-new","city":"上海","type":"snack","name":"酷矿冰淇淋（武康大楼店）","area":"武康大楼淮海中路1852号","address":"武康大楼淮海中路1852号","mapQuery":"上海 酷矿冰淇淋（武康大楼店）","dishes":["牛乳冰淇淋"],"tip":"补充候选，非小红书或鸭觅认证；若天冷不想吃冰可直接跳过。未声称实地试吃。 武康大楼底层约0–3分钟","budgetCnyPerPerson":[20,45],"nearWalk":"sh-hengfu","sources":[{"title":"门店与地图公开资料","url":"https://www.amap.com/place/B0FFKSCPJF"},{"title":"门店与地图公开资料","url":"https://k.sina.com.cn/article_5140679079_1326889a701900ujs6.html"}]},{"id":"sh-wangjiasha-new","city":"上海","type":"snack","name":"王家沙点心店（南京西路总店）","area":"南京西路805号","address":"南京西路805号","mapQuery":"上海 王家沙点心店（南京西路总店）","dishes":["挑当日柜台点心，或以一碗馄饨作简餐"],"tip":"柜台糕点适合带走；青团属季节品，不保证11月供应。 张园北行至南京西路约5–10分钟","budgetCnyPerPerson":[20,45],"nearWalk":"sh-depart","sources":[{"title":"门店与地图公开资料","url":"https://www.amap.com/place/B00155HNAR"},{"title":"门店与地图公开资料","url":"https://www.shanghai.gov.cn/nw4411/20260123/1cc9dd0a374945aeb3bb8517d30adb28.html"}]},{"id":"sh-nanxiang-new","city":"上海","type":"snack","name":"南翔馒头店（城隍庙店）","area":"豫园路87号","address":"豫园路87号","mapQuery":"上海 南翔馒头店（城隍庙店）","dishes":["鲜肉小笼，一笼分着尝"],"tip":"小笼店也有堂食套餐；只安排一笼传统点心，不默认要吃整餐。排队过长就跳过。 豫园外商城约3–5分钟","budgetCnyPerPerson":[30,60],"nearWalk":"sh-yuyuan","sources":[{"title":"门店与地图公开资料","url":"https://ditu.amap.com/place/B00155IMN4"}]}];
const FORECASTS=[{"date":"2026-10-26","city":"徐州","high":21,"low":14,"condition":"多云","kind":"7天预报","issuedAt":"2026102108","source":"https://www.weather.com.cn/weather/101190801.shtml"},{"date":"2026-10-27","city":"徐州","high":20,"low":9,"condition":"晴转阴","kind":"7天预报","issuedAt":"2026102108","source":"https://www.weather.com.cn/weather/101190801.shtml"},{"date":"2026-10-28","city":"苏州","high":21,"low":14,"condition":"多云转阴","kind":"8–15天趋势","issuedAt":"2026102108","source":"https://www.weather.com.cn/weather15d/101190401.shtml"},{"date":"2026-10-29","city":"苏州","high":18,"low":14,"condition":"阴转雨","kind":"8–15天趋势","issuedAt":"2026102108","source":"https://www.weather.com.cn/weather15d/101190401.shtml"},{"date":"2026-10-30","city":"上海","high":20,"low":16,"condition":"雨转阴","kind":"8–15天趋势","issuedAt":"2026102108","source":"https://www.weather.com.cn/weather15d/101020100.shtml"},{"date":"2026-10-31","city":"上海","high":24,"low":20,"condition":"阴","kind":"8–15天趋势","issuedAt":"2026102108","source":"https://www.weather.com.cn/weather15d/101020100.shtml"},{"date":"2026-11-01","city":"上海","high":24,"low":20,"condition":"阴转雨","kind":"8–15天趋势","issuedAt":"2026102108","source":"https://www.weather.com.cn/weather15d/101020100.shtml"}];
function renderDay(){if(!document.getElementById('day-tabs'))return;renderDayBase();const w=FORECASTS[state.day];document.querySelector('.route-ribbon').insertAdjacentHTML('afterend','<div class="day-weather"><span>'+esc(w.condition)+' · '+esc(w.kind)+' · 10/21 发布</span><a href="weather.html"><b>'+w.high+'° / '+w.low+'°</b> 查看天气 ↗</a></div>');}
// Shared interactive route atlas and travel tools.
function spot(name,query,icon,x,y,intro,ticket=null,optional=false,note=''){return {name,query,icon,x,y,intro,ticket,optional,note};}
const ROUTE_MAPS=[
{city:'徐州',date:'10.26',title:'彭城老街 · 灯火初上',subtitle:'古城、庙宇与一条有晚饭的街',duration:'约 2–3 小时，含吃饭',terrain:'oldtown',routeNote:'以酒店为落脚点，文庙—户部山—回龙窝为核心；富国街和壹捌夜市随体力择一。街区先逛，收费院落另核验。',nodes:[spot('酒店出发',HOTEL_XZ,'house',105,275,'中山南路的落脚点。先办理入住、休息，再带轻便随身包出门。',null,false,'中山南路 48 号'),spot('文庙','徐州文庙','gate',255,135,'看屋脊、院墙与老城街道的关系。公共街区适合慢走，入殿与展馆按现场开放。',3),spot('户部山','徐州户部山','temple',420,265,'坡道与古民居构成彭城的旧城肌理。可以先逛外部街巷，细看门楼与砖雕。',3),spot('回龙窝','徐州回龙窝','house',600,150,'白天看街巷，傍晚看灯影。小巷里停一停，晚饭就放在附近，不必赶满所有店。',3),spot('富国街','徐州富国街','stall',590,350,'老城夜游后补一点小吃，吃够了就回酒店；壹捌夜市可作为替换。',null,true)]},
{city:'苏州',date:'10.28',title:'西园到山塘 · 等一盏灯',subtitle:'先园林，后运河，把夜色留给水面',duration:'约半天，按抵达时间减量',terrain:'canal',routeNote:'计划东北街同店连住10/28、10/29两晚，原订单需改期。酒店到西线先乘车接驳；如果抵达较晚，西园寺与留园选一处，再去山塘。',nodes:[spot('东北街酒店',HOTEL_SZ,'house',620,115,'新计划10/28、10/29两晚住拙政别苑，10/30退房；原订单改期后再确认。先寄存行李，再乘车去西园寺。',null,false,'东北街168号 · 新日期待改期'),spot('西园寺','苏州西园寺','temple',125,300,'寺院与园林相连，可沿廊下看庭院、树影和建筑。礼佛空间保持安静，素面随现场供应。',4),spot('留园','苏州留园','garden',315,175,'适合看长廊如何串起庭院、湖石与窗景。沿步道慢慢走，比急着寻找单一机位更有意思。',5),spot('七里山塘','苏州七里山塘','bridge',540,330,'运河两岸的民居、桥与灯影构成夜游主角。公共街区免费，游船是另付费的体验。',10)]},
{city:'苏州',date:'10.29',title:'园林与平江 · 枕河而行',subtitle:'一扇花窗，一程白天的手摇船',duration:'主线一天，可删减加选',terrain:'pingjiang',routeNote:'酒店就在东北街片区。拙政园、苏博本馆与平江路为主线；狮子林可替换一处，耦园/昆曲馆选一处。金鸡湖需另行接驳。',nodes:[spot('拙政园','苏州拙政园','garden',165,130,'把水面、亭廊与树木当成一幅不断变化的画来看。早场或预约时段优先，慢走约两小时。',6),spot('苏博本馆','苏州博物馆本馆','museum',355,130,'白墙、灰屋顶与几何庭院延续江南建筑的线索。先安排预约时段，再把周边园林串起来。',8),spot('狮子林','苏州狮子林','rock',220,295,'以假山与曲折路径见长。更喜欢叠石时，用它替换一处主线，不必上午连看三园。',7,true),spot('平江手摇船','苏州平江路游船码头','boat',470,285,'沿河看小桥、白墙和日常生活。把坐船放在白天，班次、票种与天气以码头为准。',9),spot('昆曲博物馆','中国昆曲博物馆','stage',620,160,'可作为水巷散步中的文化停靠点；入馆与演出是不同项目，别把演出默认包含在免费参观里。',12,true),spot('耦园','苏州耦园','garden',640,370,'水巷边的另一处园林选择。若上午已经看过园林，下午也可以只散步、喝茶。',11,true)]},
{city:'上海',date:'10.30',title:'苏州河到外滩 · 江河相逢',subtitle:'桥、老楼与一段向江边延伸的散步',duration:'规划约 3–4 公里，2–3 小时',terrain:'rivers',routeNote:'邮政大楼以外观为主，不依赖展馆开门。天色与亮灯按当天实际安排；最后在南京东路附近吃饭。',nodes:[spot('邮政大楼','上海邮政博物馆','post',130,160,'沿北苏州路看老建筑的立面、钟塔和河岸。此处默认外观散步，进馆需另查开放信息。',14),spot('乍浦路桥','上海乍浦路桥','bridge',300,240,'看苏州河两岸建筑层次的好停靠点。站在人行区域拍照，给过桥的人留空间。',14),spot('外白渡桥','上海外白渡桥','steelbridge',490,155,'钢桥、河口与两岸老楼一起构成上海的城市记忆。顺着人流过桥，不在桥面长时间占位。',14),spot('外滩','上海外滩','bund',615,325,'一侧是历史建筑，一侧是黄浦江。沿公共岸线慢走即可，不必另买游船或登楼票。',14),spot('南京东路','上海南京东路步行街','house',350,365,'把晚饭和糕团留在这一带，吃够了再回酒店。步行街热闹，按体力走一段就好。',14)]},
{city:'上海',date:'10.31',title:'衡复街区 · 梧桐树下',subtitle:'转过一个街角，坐下来喝一杯咖啡',duration:'规划约 3–5 公里，含休息 4–6 小时',terrain:'avenue',routeNote:'武康大楼—武康路—安福路—乌鲁木齐中路—复兴西路，不必每家店都打卡。建筑是居民的生活空间，默认只在公共街道活动。',nodes:[spot('武康大楼','上海武康大楼','wukang',120,350,'独特的转角形态让这栋老楼成为街区标志。人行道上拍完外观，就沿武康路继续走。',15),spot('武康路','上海武康路','treehouse',245,190,'沿街建筑、树影和小路口都值得停一下。看建筑的层次，也给日常通行的人留出空间。',15),spot('安福路','上海安福路','cafe',430,125,'适合午饭、小店与咖啡。遇到长队就换一家，给真正坐下来休息留时间。',15),spot('乌鲁木齐中路','上海乌鲁木齐中路','stall',620,245,'把街头小吃和日常生活的热闹串进路线，按当天营业挑一家顺路的小店。',15),spot('复兴西路','上海复兴西路','treehouse',430,365,'用更安静的一段街道给散步收尾。雨天可缩短步行，在餐馆或咖啡馆多坐一会儿。',15)]},
{city:'上海',date:'11.01',title:'张园半日 · 给归程留白',subtitle:'早餐、石库门与一段不赶时间的告别',duration:'返程允许时安排约 1–2 小时',terrain:'zhangyuan',routeNote:'返程车次还未提供。先确认车站与发车时刻，再决定能否逛张园；早班车直接取消此段。',nodes:[spot('张园','上海张园','shikumen',190,185,'从石库门街巷的尺度和砖墙细节看上海的城市肌理。此处默认公共空间游览，展览活动另核实。',15),spot('南京西路','上海南京西路','house',430,160,'最后一顿早餐或一杯咖啡就近解决，避免带着行李来回折返。',15),spot('取回行李','上海人民广场','house',420,355,'酒店最终位置确认后，以酒店为起点倒推去车站的时间。不要把示意图当实际导航。',null),spot('返程车站','上海虹桥站','train',640,325,'上海站与上海虹桥站是不同车站；车票明确后，再使用交通页对应的高德入口。',null,true)]}
];
const TICKET_CHANNELS=[
{wx:'徐州博物馆',label:'微信官方预约',help:'微信搜索公众号“徐州博物馆”，进入参观预约；带本人有效证件。',senior:'基本陈列对所有年龄免费；老人免预约资格请在馆方入口核对。'},
{help:'公共区域无需购票；索道、游船等按所选项目另购。',senior:'公共区域免费，索道及游船不据此自动免费。'},
{help:'常规入寺公开资料列为免费，现场按寺方公告入寺；饮食消费另计。',senior:'常规入寺免费参考；临时活动与消费项目单独确认。'},
{help:'公共街区无需购票；古民居院落、临时展馆等另核实。',senior:'公共街区免费；进入另收费院落时再核对优待。'},
{url:'https://piao.qunar.com/ticket/detail_12937.html',label:'西园寺购票',help:'去哪儿景点售票页；70+请先携证核验免票资格，不必购买成人票。',senior:'70周岁（含）以上凭本人有效身份证件免日间门票。'},
{url:'https://www.szylly.com/',label:'官方预约购票',wx:'苏州园林旅游',help:'进入官方平台选择“留园”与入园时段。',senior:'70+凭证免日间门票；当日是否需预约或窗口核验，出发前在官方渠道确认。'},
{url:'https://www.szylly.com/',label:'官方预约购票',wx:'苏州园林旅游',help:'进入官方平台选择“拙政园”；同行成人按自身资格购票。',senior:'70+凭证免日间门票；2026当地公开信息说明可凭身份证免预约，临行复核入园安排。'},
{url:'https://www.szylly.com/',label:'官方预约购票',wx:'苏州园林旅游',help:'进入官方平台选择“狮子林”，先选游览日期。',senior:'70+凭证免日间门票；预约豁免以官方当前入园方式为准。'},
{url:'https://www.szmuseum.com/',label:'苏博官方预约',wx:'苏州博物馆全预约',help:'微信小程序“苏州博物馆全预约”，选择本馆。普通观众提前7天（含预约当天）查看名额。',senior:'参观免费。70+行动不便者按官网可带1名登记成人免预约、同时进出；每三个月一次。其他情况提前预约或电话核实。'},
{map:'苏州平江历史文化街区手摇船码头售票处',label:'高德去售票码头',help:'未找到稳定网页直购入口，码头按当日船型与票价购买；不跳转新闻“资料”。',senior:'船票单独计费；70+免船票未核实，凭证向码头询价。'},
{url:'https://m.ly.com/scenery_1/detail/?sceneryId=20718',label:'同程山塘游船',wx:'七里山塘',help:'核对船型、码头、是否夜航与末班时间；画舫与手摇船分开选。',senior:'不统一承诺70+免船票。白居易码头个别产品列陪同免票，须先向该码头确认；其他船型另询。'},
{url:'https://www.szylly.com/',label:'官方预约购票',wx:'苏州园林旅游',help:'在官方平台选择“耦园”，不混选夜游或讲解产品。',senior:'70+凭证免日间门票；预约与验证方式按官方当天说明。'},
{wx:'苏州戏曲博物馆',label:'微信查询参观',help:'常规参观与昆曲演出是不同项目；演出票及临时展请在馆方核对。',senior:'常规免费参观不分年龄；付费演出不默认免票。'},
{help:'公共湖岸与音乐喷泉无需购票；是否开演看当天公告。',senior:'公共区域免费，湖上游船另收费。'},
{help:'公共河岸、桥梁与步行街无需门票。游船和观景台另购。',senior:'公共区域免费，不分年龄。'},
{help:'公共街道及开放街区无需门票；故居、特展和私人空间另看规则。',senior:'公共街区免费；收费展馆按具体场馆核对70+优惠。'}
];
let activeWalk=0,activeSpot=1;let foodKind='all';
function purchaseMarkup(i){const c=TICKET_CHANNELS[i];if(!c)return '';return '<div class="purchase-actions">'+(c.url?'<a class="buy-main" href="'+esc(c.url)+'" target="_blank" rel="noopener noreferrer">'+esc(c.label)+' ↗</a>':'')+(c.wx?'<button type="button" data-copy="'+esc(c.wx)+'">复制微信名称</button>':'')+(c.map?mapLink(c.map,'苏州',c.label+' ↗'):'')+(!c.url&&!c.wx&&!c.map?'<span class="tag">无需购票</span>':'')+'</div><div class="purchase-caption">'+esc(c.help)+'</div>';}
function routeBackground(route){const isRiver=route.terrain==='rivers';let art='<rect x="0" y="0" width="740" height="465" fill="#f8f3e5"/><g fill="none" stroke="#e3ddc8" stroke-width="10" stroke-linecap="round"><path d="M40 210 690 210M340 65 340 410M80 395 660 80"/><path d="M75 80 635 390" stroke-width="6"/></g>';
if(['canal','pingjiang','rivers'].includes(route.terrain)){art+='<path d="'+(isRiver?'M-30 135C140 95 260 180 430 110S650 72 750 112':'M20 115C170 95 180 340 360 330S550 160 745 210')+'" fill="none" stroke="#d3dfcf" stroke-width="34"/><path d="'+(isRiver?'M-30 135C140 95 260 180 430 110S650 72 750 112':'M20 115C170 95 180 340 360 330S550 160 745 210')+'" fill="none" stroke="#bccdb7" stroke-width=".8"/>';}
if(isRiver)art+='<path d="M690 68Q620 220 730 450" fill="none" stroke="#d3dfcf" stroke-width="65"/><text x="687" y="290" class="map-bg-label" transform="rotate(75 687 290)">黄 浦 江</text><text x="345" y="86" class="map-bg-label">苏 州 河</text>';
if(route.terrain==='pingjiang')art+='<text x="525" y="430" class="map-bg-label">平 江 河</text><text x="65" y="72" class="map-bg-label">东 北 街</text>';
if(route.terrain==='canal')art+='<text x="375" y="365" class="map-bg-label">山 塘 河</text><text x="410" y="80" class="map-bg-label">姑 苏 古 城</text>';
if(route.terrain==='oldtown')art+='<text x="65" y="75" class="map-bg-label">彭 城 老 街</text><text x="70" y="402" class="map-bg-label">云 龙 城 区</text>';
if(route.terrain==='avenue')art+='<g stroke="#c3c9ae" fill="#dfe2cc" stroke-width=".7">'+[70,175,280,385,490,595,690].map((x,i)=>'<path d="M'+x+' '+(60+i%2*350)+'q-15-19 0-30 18 15 0 30Zm0-4v17"/>').join('')+'</g><text x="290" y="435" class="map-bg-label">衡 复 风 貌 街 区</text>';
if(route.terrain==='zhangyuan')art+='<text x="75" y="75" class="map-bg-label">南 京 西 路 街 区</text>';
art+='<g stroke="#bfb89b" stroke-width=".8" fill="none"><path d="M24 35v-18h18M698 17h18v18M24 425v18h18M698 443h18v-18"/></g>';return art;}
function renderWalks(){if(!document.getElementById('map-tabs'))return;const r=ROUTE_MAPS[activeWalk];document.getElementById('map-tabs').innerHTML=ROUTE_MAPS.map((r,i)=>'<button type="button" class="map-tab '+(i===activeWalk?'active':'')+'" data-walk="'+i+'" aria-pressed="'+(i===activeWalk)+'"><small>0'+(i+1)+' / '+r.date+'</small><b>'+r.city+' · '+r.title.split(' · ')[0]+'</b></button>').join('');
let path='';let previous=null;r.nodes.forEach((n,i)=>{if(n.optional)return;if(previous){const mid=(previous.x+n.x)/2;path+='<path class="'+(activeWalk===1&&i===1?'route-transfer':'route-main')+'" d="M'+previous.x+' '+(previous.y+8)+' Q'+mid+' '+(Math.min(previous.y,n.y)-40)+' '+n.x+' '+(n.y+8)+'"/>';}previous=n;});
r.nodes.forEach((n,i)=>{if(n.optional){const anchor=r.nodes[Math.max(0,i-1)];path+='<path class="route-transfer" d="M'+anchor.x+' '+anchor.y+'L'+n.x+' '+n.y+'"/>';}});
const nodes=r.nodes.map((n,i)=>'<g class="map-node '+(i===activeSpot?'selected':'')+'" data-spot="'+i+'" tabindex="0" role="button" aria-label="查看'+esc(n.name)+'简介和购票信息" transform="translate('+n.x+' '+n.y+')"><ellipse class="pin-bg" cx="0" cy="-19" rx="49" ry="43"/><use href="#lm-'+n.icon+'" x="-38" y="-65" width="76" height="65"/><circle class="num-circle" cx="-35" cy="11" r="10"/><text class="node-num" x="-35" y="14" text-anchor="middle">'+(i+1)+'</text><text class="node-name" y="35" text-anchor="middle">'+esc(n.name)+'</text>'+(n.optional?'<text class="node-sub" y="51" text-anchor="middle">可选 / 可替换</text>':'')+'</g>').join('');
document.getElementById('route-map-board').innerHTML='<div class="map-board-head"><h3>'+esc(r.title)+'</h3><span>点击建筑，打开景点手册<br>手绘示意 · 非按比例</span></div><div class="map-svg-scroll"><svg viewBox="0 0 740 465" aria-label="'+esc(r.title)+'手绘路线图">'+routeBackground(r)+path+nodes+'</svg></div><div class="map-foot"><b>'+esc(r.duration)+'</b><span>赤陶虚线：游览顺序　灰绿虚线：接驳 / 加选</span></div>';
document.getElementById('spot-list').innerHTML=r.nodes.map((s,i)=>'<button type="button" data-spot="'+i+'" class="'+(i===activeSpot?'active':'')+'">'+(i+1)+' · '+esc(s.name)+'</button>').join('');document.getElementById('route-intro').textContent=r.routeNote;renderSpot();}
function renderSpot(){const r=ROUTE_MAPS[activeWalk],s=r.nodes[activeSpot]||r.nodes[0],c=s.ticket!==null?TICKET_CHANNELS[s.ticket]:null;const price=s.ticket!==null?TICKETS[s.ticket][2]:'无需门票';document.getElementById('landmark-info').innerHTML='<div class="detail-kicker">'+r.city+' / '+r.date+' · '+(activeSpot+1)+' 号停靠点</div><div class="detail-art"><svg viewBox="0 0 200 95" aria-hidden="true"><use href="#lm-'+s.icon+'" x="55" y="3" width="90" height="80"/></svg></div><h3>'+esc(s.name)+'</h3><p class="detail-intro">'+esc(s.intro)+'</p><div class="detail-meta"><span>门票参考<b>'+esc(price)+'</b></span><span>'+(s.optional?'可选 / 替换':'路线主线')+'<br>'+esc(s.note||r.city)+'</span></div>'+(c?'<div class="detail-senior">'+esc(c.senior)+'</div>'+purchaseMarkup(s.ticket):'<p class="purchase-caption">'+(s.icon==='train'?'车站以已购车票为准，不预设返程站。':'酒店、公共街道与外观停靠点不需要景点门票。')+'</p>')+'<div class="link-row">'+(s.icon==='train'?'<a class="map-link" href="transport.html">选择返程车站 ↗</a>':mapLink(s.query,r.city,'高德打开此站 ↗'))+'<a class="map-link" href="tickets.html">全部预约 / 优惠 ↗</a></div>';}
function renderFoods(){if(!document.getElementById('food-grid'))return;renderFilter('food-filter',state.foodCity,'food-city');document.getElementById('food-kind-filter').innerHTML=[['all','全部吃法'],['restaurant','坐下来吃饭'],['snack','小吃与早茶']].map(([k,v])=>'<button type="button" data-food-kind="'+k+'" class="'+(foodKind===k?'active':'')+'" aria-pressed="'+(foodKind===k)+'">'+v+'</button>').join('');const filtered=VENUES.filter(f=>(state.foodCity==='全部'||state.foodCity===f.city)&&(foodKind==='all'||foodKind===f.type));
const card=f=>'<article class="card food-card"><span class="food-visual" aria-hidden="true">'+(f.type==='restaurant'?'膳':'味')+'</span><div class="eyebrow" style="font-size:9px;letter-spacing:1px">'+esc(f.city+' / '+f.area)+'</div><h3>'+esc(f.name)+'</h3><div class="dish-line">'+esc(f.dishes.join(' · '))+'</div><p>'+esc(f.tip)+'</p><span class="food-budget">¥'+f.budgetCnyPerPerson.join('–')+' / 人 · 规划预算</span><div class="food-address">'+esc(f.address)+'</div><div class="food-card-links">'+mapLink(f.mapQuery,f.city,'高德找店 ↗')+'<a href="https://www.xiaohongshu.com/search_result?keyword='+encodeURIComponent(f.city+' '+f.name)+'" target="_blank" rel="noopener noreferrer">小红书搜店 ↗</a><a href="'+esc(f.sources[0].url)+'" target="_blank" rel="noopener noreferrer">门店信息 ↗</a></div>'+(f.xhsEvidence?'<div class="food-source-note xhs-note"><a href="'+esc(f.xhsEvidence.url)+'" target="_blank" rel="noopener noreferrer">已读小红书笔记 ↗</a><br>'+esc(f.xhsEvidence.text)+'</div>':'')+(f.yamiEvidence?'<div class="food-source-note">鸭觅合作节目品牌线索 · '+esc(f.yamiLabel)+'</div>':'')+'</article>';
document.getElementById('food-grid').innerHTML=['restaurant','snack'].map(type=>{const fs=filtered.filter(f=>f.type===type);return fs.length?'<div class="food-section-head"><h3>'+(type==='restaurant'?'坐下来，好好吃一顿':'边逛边吃，留一点胃口')+'</h3><p>'+fs.length+' 家'+(type==='restaurant'?'正餐餐厅':'小吃 / 早餐 / 糕团')+' · 按路线选一两家就好</p></div><div class="food-grid">'+fs.map(card).join('')+'</div>':'';}).join('');}
function renderTickets(){if(!document.getElementById('ticket-body'))return;renderFilter('ticket-filter',state.ticketCity,'ticket-city');document.getElementById('ticket-body').innerHTML=TICKETS.map((t,i)=>({t,i})).filter(({t})=>state.ticketCity==='全部'||state.ticketCity===t[0]).map(({t,i})=>'<tr><td>'+esc(t[1])+'<div class="muted">'+t[0]+'</div></td><td><span class="money">'+esc(t[2])+'</span><span class="senior-badge">'+esc(TICKET_CHANNELS[i].senior)+'</span></td><td>'+esc(t[3])+'</td><td>'+esc(t[4])+'</td><td>'+purchaseMarkup(i)+'</td><td class="check-cell"><label><input type="checkbox" data-ticket="'+ticketId(i)+'" aria-label="标记'+esc(t[1])+'已处理" '+(state.booked[ticketId(i)]?'checked':'')+'></label></td></tr>').join('');document.getElementById('booking-progress').textContent='已标记 '+TICKETS.filter((t,i)=>state.booked[ticketId(i)]).length+' / '+TICKETS.length+' 项';}
function renderForecast(){const el=document.getElementById('weather-grid');if(!el)return;el.innerHTML=FORECASTS.map((w,i)=>'<article class="card weather-card"><div class="weather-date">'+w.date.slice(5).replace('-','.')+'<small>'+DAYS[i].week+'</small></div><h3>'+esc(w.city)+' · '+esc(w.condition)+'</h3><div class="temperature"><strong>'+w.high+'°</strong><span>/ '+w.low+'°</span></div><p>最高 / 最低温 · ℃</p><div class="forecast-kind">'+esc(w.kind)+' · 10/21 08:00 发布</div><a class="map-link" href="'+esc(w.source)+'" target="_blank" rel="noopener noreferrer">官方最新预报 ↗</a></article>').join('');}
function renderOther(){if(document.getElementById('photo-grid'))document.getElementById('photo-grid').innerHTML=PHOTOS.map((p,i)=>'<article class="card photo-card"><span class="photo-num">0'+(i+1)+'</span><div><span class="eyebrow" style="font-size:9px">'+esc(p[0])+'</span><h3>'+esc(p[1])+'</h3><p>'+esc(p[2])+'</p>'+mapLink(p[3],p[4],'高德查看 ↗')+'</div></article>').join('');renderForecast();if(document.getElementById('sources-list'))document.getElementById('sources-list').innerHTML=SOURCES.map(s=>'<li><a href="'+esc(s[1])+'" target="_blank" rel="noopener noreferrer">'+esc(s[0])+' ↗</a></li>').join('');if(document.getElementById('print-days'))document.getElementById('print-days').innerHTML=DAYS.map(d=>'<article class="print-day"><h3>'+d.date+' '+d.week+' · '+esc(d.city+' / '+d.title)+'</h3><p>'+esc(d.desc)+'</p><ul>'+d.stops.map(s=>'<li><strong>'+esc(s[0]+' '+s[1])+'</strong>'+(s[5]?'（备选）':'')+'：'+esc(s[2])+'</li>').join('')+'</ul><p>'+esc(d.tip)+'</p></article>').join('');document.querySelectorAll('[data-place]').forEach(a=>{a.href=amap(a.dataset.place,a.dataset.city);a.target='_blank';a.rel='noopener noreferrer';});}
function save(){try{localStorage.setItem(STORE,JSON.stringify(state));storageOK=true;}catch(e){storageOK=false;}const e=document.getElementById('notes-status');if(e)e.textContent=storageOK?'已保存到当前浏览器 · 不同子页面共享 · 换设备请导出备份':'当前浏览器不允许保存 · 请导出备份保留内容';}
function updateHotel(){const a=document.getElementById('custom-hotel-map');if(!a)return;a.hidden=!state.hotel.trim();a.href=amap(state.hotel,'上海');}
function renderAll(){renderDay();renderWalks();renderFoods();renderTickets();renderTasks();renderOther();const n=document.getElementById('notes'),h=document.getElementById('shanghai-hotel');if(n)n.value=state.notes;if(h)h.value=state.hotel;updateHotel();save();}
function downloadOffline(){if(document.body.dataset.page==='offline'){const doc=document.documentElement.cloneNode(true);doc.querySelector('#saved-state').textContent=JSON.stringify({...state,day:0}).replace(/</g,'\\u003c');doc.querySelector('#toast').hidden=true;download('<!doctype html>\n'+doc.outerHTML,'text/html;charset=utf-8','秋日慢行-完整离线手册.html');}else{const a=document.createElement('a');a.href=document.body.dataset.page==='guides'?'../offline.html':'offline.html';a.download='秋日慢行-完整离线手册.html';document.body.appendChild(a);a.click();a.remove();toast('完整离线版已开始下载；便签与勾选可另行导出。');}}
async function copyName(value){try{await navigator.clipboard.writeText(value);toast('已复制：'+value+'。打开微信搜索即可。');}catch(e){const input=document.createElement('textarea');input.value=value;document.body.appendChild(input);input.select();const ok=document.execCommand('copy');input.remove();toast(ok?'已复制：'+value:'请在微信搜索：'+value);}}
function on(id,event,fn){const e=document.getElementById(id);if(e)e.addEventListener(event,fn);}
document.addEventListener('click',e=>{const a=e.target.closest('[data-day]');if(a){state.day=Number(a.dataset.day);renderDay();save();return;}const m=e.target.closest('[data-mode]');if(m){state.mode=m.dataset.mode;renderDay();save();return;}const w=e.target.closest('[data-walk]');if(w){activeWalk=Number(w.dataset.walk);activeSpot=activeWalk<2?1:0;renderWalks();return;}const s=e.target.closest('[data-spot]');if(s){activeSpot=Number(s.dataset.spot);renderWalks();return;}const f=e.target.closest('[data-food-city]');if(f){state.foodCity=f.dataset.foodCity;renderFoods();save();return;}const k=e.target.closest('[data-food-kind]');if(k){foodKind=k.dataset.foodKind;renderFoods();return;}const t=e.target.closest('[data-ticket-city]');if(t){state.ticketCity=t.dataset.ticketCity;renderTickets();save();return;}const copy=e.target.closest('[data-copy]');if(copy){copyName(copy.dataset.copy);return;}const menu=document.getElementById('site-directory');if(menu&&!menu.contains(e.target))menu.open=false;});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const menu=document.getElementById('site-directory');if(menu)menu.open=false;}const s=e.target.closest('[data-spot]');if(s&&(e.key==='Enter'||e.key===' ')){e.preventDefault();activeSpot=Number(s.dataset.spot);renderWalks();}});
document.addEventListener('change',e=>{if(e.target.dataset.ticket){state.booked[e.target.dataset.ticket]=e.target.checked;save();renderTickets();}if(e.target.dataset.task){state.tasks[e.target.dataset.task]=e.target.checked;save();renderTasks();}});
on('day-tabs','keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();if(e.key==='Home')state.day=0;else if(e.key==='End')state.day=DAYS.length-1;else state.day=(state.day+(e.key==='ArrowRight'?1:-1)+DAYS.length)%DAYS.length;renderDay();save();document.getElementById('day-tab-'+state.day).focus();});
on('notes','input',e=>{state.notes=e.target.value;save();});on('shanghai-hotel','input',e=>{state.hotel=e.target.value;updateHotel();save();});on('download-top','click',downloadOffline);on('download-bottom','click',downloadOffline);on('export-data','click',()=>{download(JSON.stringify({version:1,trip:'xiaomiao-china-2026',savedAt:new Date().toISOString(),...state},null,2),'application/json;charset=utf-8','秋日旅行-便签与勾选备份.json');toast('备份已导出，可在另一设备导入。');});on('import-data','click',()=>document.getElementById('import-file').click());on('import-file','change',async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>200000)throw Error();const data=JSON.parse(await file.text());if(data.trip!=='xiaomiao-china-2026')throw Error();state={...state,...parseState(data)};if(data.planRevision!==2){state.booked=Object.fromEntries(Object.entries(state.booked).filter(([k])=>Number(k.replace('ticket-',''))<4));}state.planRevision=2;renderAll();toast('备份已导入。');}catch(error){toast('无法读取备份，请选择本手册导出的JSON文件。');}e.target.value='';});on('print','click',()=>window.print());
if(document.body.dataset.page==='home'){const redirects={walks:'city-walk.html',food:'food.html',tickets:'tickets.html',stay:'stay.html',trains:'transport.html',weather:'weather.html',photo:'photo.html',checklist:'checklist.html'};if(redirects[location.hash.slice(1)])location.replace(redirects[location.hash.slice(1)]);}

const ATLAS_V3=[
  {
    "id": "xz-oldtown",
    "date": "10.26",
    "city": "徐州",
    "title": "彭城老城夜游",
    "nodes": [
      {
        "id": "xz-fuguojie",
        "name": "富国街",
        "lon": 117.184333,
        "lat": 34.2661,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://www.amap.com/place/B020401IRN",
        "coordinateNote": "以富国街1号富国大厦作东段锚点；不是整条街中心",
        "approximate": true,
        "query": "富国街",
        "ticket": 3,
        "intro": "富国街在老城主线西北侧。若从酒店出发想尝小吃，可先来这里再向南逛；不饿则直接去文庙。"
      },
      {
        "id": "xz-wenmiao",
        "name": "文庙街区",
        "lon": 117.189088,
        "lat": 34.266739,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B0H2KA7FCF",
        "coordinateNote": "高德POI，河清路80号街区代表点",
        "approximate": false,
        "query": "文庙东方街区",
        "ticket": 3,
        "intro": "沿文庙东方街区看院墙与老城的街巷关系。此处按公共街区漫步，进入院落或展馆需看现场开放。"
      },
      {
        "id": "xz-huilongwo",
        "name": "回龙窝",
        "lon": 117.190103,
        "lat": 34.259018,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B02040TYOK",
        "coordinateNote": "高德POI，街区代表点",
        "approximate": false,
        "query": "回龙窝",
        "ticket": 3,
        "intro": "白墙灰瓦的回龙窝适合傍晚慢走、顺路吃一点包子；遇到店铺售罄，不必改变整晚路线。"
      },
      {
        "id": "xz-hubushan",
        "name": "户部山",
        "lon": 117.187935,
        "lat": 34.257784,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B020401K8P",
        "coordinateNote": "高德POI，彭城路229号入口附近",
        "approximate": false,
        "query": "户部山步行街",
        "ticket": 3,
        "intro": "看坡道、古民居门楼与砖雕。夜晚只逛开放街巷，收费古民居参观另查。"
      }
    ],
    "legs": [
      {
        "from": 0,
        "to": 1,
        "mode": "步行",
        "time": "10–15分钟",
        "note": "如不想加餐可跳过富国街",
        "estimateOnly": true
      },
      {
        "from": 1,
        "to": 2,
        "mode": "步行",
        "time": "15–20分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 2,
        "to": 3,
        "mode": "步行",
        "time": "5–10分钟",
        "note": "",
        "estimateOnly": true
      }
    ],
    "snacks": [
      {
        "venueId": "xz-xulaoba",
        "venueName": "许老八包子铺（回龙窝店）",
        "lon": 117.19,
        "lat": 34.259,
        "buy": "羊肉包子；路过买一两个分着尝",
        "detour": "街区内约0–5分钟",
        "near": "回龙窝",
        "sources": [
          "https://js.people.com.cn/n2/2026/0609/c360301-41604756.html",
          "https://k.sina.cn/article_5675440730_152485a5a020019j0v.html?from=news&subch=onews",
          "https://ditu.amap.com/place/B02040TYOK"
        ],
        "coordinateSystem": "GCJ-02（高德）或同底图约位",
        "coordinateNote": "约位：回龙窝街区锚点，不是包子铺店门精确坐标",
        "approximate": true,
        "estimateOnly": true,
        "priority": "优先尝一份",
        "note": "小吃店可能早售罄；入街区时先看营业，不为单店改变整晚路线。"
      }
    ],
    "note": "此顺序先北后南，减少把富国街留到最后再北返。酒店位置待核精确坐标，先高德导航到第一站。 18夜市为可选餐饮段，具体入口需按营业定位；不画成独立远距离景点。",
    "duration": "按体力慢行，交通时间不含参观"
  },
  {
    "id": "xz-culture",
    "date": "10.27",
    "city": "徐州",
    "title": "宝莲寺与云龙山水",
    "nodes": [
      {
        "id": "xz-baolian",
        "name": "宝莲寺",
        "lon": 117.268035,
        "lat": 34.294512,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B02040RDFT",
        "coordinateNote": "高德POI，寺院代表点；实际入口以导航为准",
        "approximate": false,
        "query": "宝莲寺",
        "ticket": 2,
        "intro": "宝莲寺在徐州东北方向，和博物馆之间建议打车。只安排约一小时，留出预约入馆与午休的时间。"
      },
      {
        "id": "xz-museum",
        "name": "徐州博物馆",
        "lon": 117.186653,
        "lat": 34.251058,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B020400196",
        "coordinateNote": "高德POI",
        "approximate": false,
        "query": "徐州博物馆",
        "ticket": 0,
        "intro": "先按已约时段参观基本陈列，重点看汉代徐州的历史与文物。压缩行程时保留约1.5–2小时，别与寺院和登山同时赶。"
      },
      {
        "id": "xz-yunlongnorth",
        "name": "云龙山北门",
        "lon": 117.185934,
        "lat": 34.249501,
        "coordinateSystem": "GCJ-02",
        "sourceUrl": "https://ditu.amap.com/place/B020402G67",
        "coordinateNote": "高德POI，北门入口",
        "approximate": false,
        "query": "云龙山北门",
        "guide": "yunlong",
        "art": "yunlong",
        "ticket": 1,
        "intro": "本次以北门与山脚为主。可先听历史开篇，了解苏轼、徐州治水与佛教石刻；完整语音导览包含山上景点，不代表这天必须爬完。"
      },
      {
        "id": "xz-lake",
        "name": "云龙湖北岸",
        "lon": 117.1776,
        "lat": 34.245,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B0FFHBUD1R",
        "coordinateNote": "约位，以水文阁往东20米的阿喆米线POI推定湖岸街段；非云龙湖中心",
        "approximate": true,
        "query": "云龙湖北岸·水文阁附近",
        "ticket": 1,
        "intro": "只选水文阁附近一段湖岸慢走。云龙湖在云龙山西侧，不安排完整环湖；累了可以坐下吃一小碗米线后回酒店。"
      }
    ],
    "legs": [
      {
        "from": 0,
        "to": 1,
        "mode": "打车",
        "time": "30–45分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 1,
        "to": 2,
        "mode": "步行",
        "time": "5–10分钟",
        "note": "只走北门及山脚；登顶需额外时间",
        "estimateOnly": true
      },
      {
        "from": 2,
        "to": 3,
        "mode": "步行或短程打车",
        "time": "步行25–35分钟 / 打车10–15分钟",
        "note": "去水文阁附近湖岸，不绕完整云龙湖",
        "estimateOnly": true
      }
    ],
    "snacks": [
      {
        "venueId": "xz-azhe",
        "venueName": "阿喆米线（云龙湖总店）",
        "lon": 117.177601,
        "lat": 34.245044,
        "buy": "一小碗米线；想尝卤味按人少量点",
        "detour": "湖岸水文阁附近约0–5分钟",
        "near": "云龙湖东北岸水文阁",
        "sources": [
          "https://ditu.amap.com/place/B0FFHBUD1R"
        ],
        "coordinateSystem": "GCJ-02（高德）或同底图约位",
        "coordinateNote": "高德门店POI，水文阁往东20米",
        "approximate": false,
        "estimateOnly": true,
        "priority": "散步后坐下吃",
        "note": "这是一碗主食型小吃，适合替代一顿简餐，不额外叠加重正餐。"
      }
    ],
    "note": "压缩到两天后这天较满；优先宝莲寺+博物馆+湖岸，云龙山改山脚短停。老人同行或疲劳时宝莲寺与博物馆二选一。 不把宝莲寺画在市中心，不把云龙湖画在云龙山东侧。",
    "duration": "打车串联 · 山脚与一段湖岸"
  },
  {
    "id": "sz-west",
    "date": "10.28",
    "city": "苏州",
    "title": "西园寺—留园—山塘夜色",
    "nodes": [
      {
        "id": "sz-hotel",
        "name": "东北街酒店",
        "lon": 120.63135,
        "lat": 31.324327,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B0FFG5NYOE",
        "coordinateNote": "高德POI，东北街168号",
        "approximate": false,
        "query": "拙政别苑酒店",
        "price": "酒店 / 非景点",
        "ticketNote": "计划10/28、10/29同店连住；原订单改期仍需确认。",
        "intro": "拙政别苑酒店，东北街168号。抵达苏州后先寄存行李，西园寺在城西，需乘车接驳。",
        "ticket": null
      },
      {
        "id": "sz-xiyuan",
        "name": "西园寺",
        "lon": 120.587,
        "lat": 31.315,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B02000K6IM",
        "coordinateNote": "寺院约位，以已核对北门31.316265,120.586842和留园路地址推定；导航用西园寺而非北门",
        "approximate": true,
        "query": "西园寺",
        "ticket": 4,
        "intro": "西园寺在留园西侧，先逛寺院，再向东走到留园。礼佛区域保持安静，素面视供应与排队决定。"
      },
      {
        "id": "sz-liuyuan",
        "name": "留园",
        "lon": 120.59226,
        "lat": 31.315369,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B02000IFFA",
        "coordinateNote": "高德POI",
        "approximate": false,
        "query": "留园",
        "ticket": 5,
        "guide": "liuyuan",
        "art": "liuyuan",
        "intro": "从园主更替与厅堂布局读留园。留意曲廊如何控制视线、冠云峰怎样成为庭院中心；语音导览含历史开篇和六处讲解。"
      },
      {
        "id": "sz-shantang",
        "name": "七里山塘",
        "lon": 120.602105,
        "lat": 31.317059,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B0200178TG",
        "coordinateNote": "高德POI，山塘街177号附近",
        "approximate": false,
        "query": "七里山塘",
        "ticket": 10,
        "art": "pingjiang",
        "intro": "把傍晚留给运河、桥与灯影。街区免费，游船另付费。想吃荣阳楼应提前到，晚间售罄或关门就跳过。"
      }
    ],
    "legs": [
      {
        "from": 0,
        "to": 1,
        "mode": "打车",
        "time": "20–35分钟",
        "note": "酒店在园林东侧，西园寺在城西；跨区接驳不是短步行",
        "estimateOnly": true
      },
      {
        "from": 1,
        "to": 2,
        "mode": "步行",
        "time": "10–15分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 2,
        "to": 3,
        "mode": "步行",
        "time": "20–30分钟",
        "note": "经广济路进入山塘；累时打车10–15分钟",
        "estimateOnly": true
      }
    ],
    "snacks": [
      {
        "venueId": "sz-qiujuan",
        "venueName": "秋娟馄饨店",
        "lon": 120.600963,
        "lat": 31.316878,
        "buy": "大馄饨；肉汤圆看当天供应",
        "detour": "广济路进山塘前约5–10分钟",
        "near": "留园→山塘的广济路接驳段",
        "sources": [
          "https://www.amap.com/place/B0FFJ2AAIX"
        ],
        "coordinateSystem": "GCJ-02（高德）或同底图约位",
        "coordinateNote": "高德门店POI，西杨安浜3号楼",
        "approximate": false,
        "estimateOnly": true,
        "priority": "想坐下歇脚可选",
        "note": "不能默认晚间营业；若到山塘已晚，跳过不折返。"
      },
      {
        "venueId": "sz-rongyanglou",
        "venueName": "荣阳楼（山塘街店）",
        "lon": 120.599,
        "lat": 31.32,
        "buy": "油氽团子，趁热两人分一份",
        "detour": "由山塘177号段向西北约10–15分钟单程",
        "near": "山塘街329号街段",
        "sources": [
          "https://visitsz.wglj.suzhou.com.cn/news-detail.aspx?id=248",
          "https://gs.ctrip.com/html5/you/foods/fooddetail/11/5123655.html"
        ],
        "coordinateSystem": "GCJ-02（高德）或同底图约位",
        "coordinateNote": "约位：山塘街329号所在西北街段，精确门口以导航为准",
        "approximate": true,
        "estimateOnly": true,
        "priority": "提前到山塘时优先",
        "note": "公开门店页标到17:30，售完可能提前结束；晚船前到得太迟便跳过。"
      }
    ],
    "note": "西园在留园西侧，山塘在留园东北；按由西向东路线安排。 山塘游船到码头确认班次与运营，不承诺固定发船时刻。",
    "duration": "按体力慢行，交通时间不含参观"
  },
  {
    "id": "sz-gardens",
    "date": "10.29",
    "city": "苏州",
    "title": "东北街园林与平江水巷",
    "nodes": [
      {
        "id": "sz-hotel",
        "name": "东北街酒店",
        "lon": 120.63135,
        "lat": 31.324327,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B0FFG5NYOE",
        "coordinateNote": "高德POI，东北街168号",
        "approximate": false,
        "query": "拙政别苑酒店",
        "price": "酒店 / 非景点",
        "ticketNote": "计划10/28、10/29同店连住；原订单改期仍需确认。",
        "intro": "拙政别苑酒店，东北街168号。抵达苏州后先寄存行李，西园寺在城西，需乘车接驳。",
        "ticket": null
      },
      {
        "id": "sz-zhuozheng",
        "name": "拙政园",
        "lon": 120.629211,
        "lat": 31.324194,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B020001R2Q/",
        "coordinateNote": "高德POI，园区代表点；入园走东北街正式入口",
        "approximate": false,
        "query": "拙政园",
        "ticket": 6,
        "guide": "zhuozheng",
        "art": "zhuozheng",
        "intro": "先听王献臣、文徵明与园林理水的历史开篇，再看水面、岛山和亭廊如何组织景物。按预约时段入园。"
      },
      {
        "id": "sz-museum",
        "name": "苏博本馆",
        "lon": 120.627856,
        "lat": 31.322948,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B020001285",
        "coordinateNote": "高德POI；按预约时段调整拙政园先后",
        "approximate": false,
        "query": "苏州博物馆本馆",
        "ticket": 8,
        "intro": "参观前落实预约，拙政园与苏博先后可随预约时段调整。除了建筑，也给馆藏留足时间；不是打卡外观就离开。"
      },
      {
        "id": "sz-lion",
        "name": "狮子林",
        "lon": 120.629095,
        "lat": 31.321068,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B020001B0C",
        "coordinateNote": "高德POI",
        "approximate": false,
        "query": "狮子林",
        "ticket": 7,
        "intro": "可替换一处园林或只路过外观。以叠石与曲折路径见长，不与拙政园、苏博、耦园全叠加。",
        "optional": true
      },
      {
        "id": "sz-pingjiang",
        "name": "平江路",
        "lon": 120.634,
        "lat": 31.315,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://www.amap.com/place/B0FFF35FRK",
        "coordinateNote": "约位，以平江路115号桃花源记POI为街段锚点；非游船码头",
        "approximate": true,
        "query": "平江路中段",
        "ticket": 9,
        "guide": "pingjiang",
        "art": "pingjiang",
        "intro": "从宋代城图、古桥、家族与昆曲读水巷。白天适合手摇船，但船程可能返回原码头；地图中的街段点不代表具体售票口。"
      },
      {
        "id": "sz-kunqu",
        "name": "昆曲博物馆",
        "lon": 120.635691,
        "lat": 31.313091,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://www.amap.com/place/B02000IFFD",
        "coordinateNote": "高德POI，中张家巷14号",
        "approximate": false,
        "query": "中国昆曲博物馆",
        "ticket": 12,
        "intro": "可选文化停靠，了解昆曲与会馆。免费参观、预约和付费演出分开核对；累了只走平江路即可。",
        "optional": true
      },
      {
        "id": "sz-ouyuan",
        "name": "耦园",
        "lon": 120.63835,
        "lat": 31.31623,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B0FFF5U2QK",
        "coordinateNote": "高德POI",
        "approximate": false,
        "query": "耦园",
        "ticket": 11,
        "intro": "位于平江路东侧的可选园林，从平江中段单独往返。不要假定能从园内穿行到下一条街；与狮子林二选一即可。",
        "optional": true
      }
    ],
    "legs": [
      {
        "from": 0,
        "to": 1,
        "mode": "步行",
        "time": "5–10分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 1,
        "to": 2,
        "mode": "步行",
        "time": "5–10分钟",
        "note": "以实际出入口为准，按苏博预约时段交换先后",
        "estimateOnly": true
      },
      {
        "from": 2,
        "to": 3,
        "mode": "步行",
        "time": "10–15分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 3,
        "to": 4,
        "mode": "步行",
        "time": "15–25分钟",
        "note": "从园林路转进平江路；边逛时间另计",
        "estimateOnly": true
      },
      {
        "from": 4,
        "to": 5,
        "mode": "步行",
        "time": "5–10分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 4,
        "to": 6,
        "mode": "可选步行支线",
        "time": "单程10–15分钟",
        "note": "原路返回平江路；园内参观另留45–60分钟"
      }
    ],
    "snacks": [
      {
        "venueId": "sz-taohuayuan",
        "venueName": "平江桃花源记（平江路115号店）",
        "lon": 120.633675,
        "lat": 31.314561,
        "buy": "赤豆糊或糖粥；只安排一份小吃",
        "detour": "主步行街旁约0–5分钟",
        "near": "平江路中段",
        "sources": [
          "https://www.amap.com/place/B0FFF35FRK",
          "https://gs.ctrip.com/html5/you/foods/Suzhou11/5133429.html"
        ],
        "coordinateSystem": "GCJ-02（高德）或同底图约位",
        "coordinateNote": "高德门店POI",
        "approximate": false,
        "estimateOnly": true,
        "priority": "平江路甜口停靠",
        "note": "这家也做正餐；图中只推荐糖粥/赤豆糊的小吃停靠，不把整桌菜当小吃。"
      }
    ],
    "note": "拙政园+苏博+平江路为主；狮子林/耦园只加一处，避免一日四园馆。 耦园在平江路东侧；从平江中段往返约20–30分钟步行，再加园内45–60分钟。 平江游船需以售票码头和当日运行为准，坐船后可能回原码头，不能当作必然单程接驳。 金鸡湖属跨区可选夜游，建议打车25–40分钟；若腿累直接回酒店。",
    "duration": "按体力慢行，交通时间不含参观",
    "water": [
      {
        "label": "平江河",
        "width": 12,
        "points": [
          [
            120.6334,
            31.3243
          ],
          [
            120.634,
            31.32
          ],
          [
            120.6343,
            31.316
          ],
          [
            120.6338,
            31.3108
          ]
        ]
      }
    ]
  },
  {
    "id": "sh-river",
    "date": "10.30",
    "city": "上海",
    "title": "苏州河—外滩—南京东路—陆家嘴",
    "nodes": [
      {
        "id": "sh-post",
        "name": "邮政大楼",
        "lon": 121.484749,
        "lat": 31.244286,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://www.amap.com/place/B00155F9RW",
        "coordinateNote": "高德上海邮政博物馆POI，用于大楼外观定位；内部开放另核",
        "approximate": false,
        "query": "邮政大楼",
        "ticket": 14,
        "guide": "bund",
        "art": "bund",
        "intro": "从邮政大楼外观开始，听通信、贸易与近代城市的关系。建筑内部开放另查，路线不依赖进馆。"
      },
      {
        "id": "sh-zhapu",
        "name": "乍浦路桥",
        "lon": 121.487653,
        "lat": 31.243871,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B0FFF7M0EA",
        "coordinateNote": "高德POI",
        "approximate": false,
        "query": "乍浦路桥",
        "ticket": 14,
        "art": "bund",
        "intro": "站在人行区域看苏州河与陆家嘴方向的层次。拍完照继续向东到外白渡桥，留出行人通行空间。"
      },
      {
        "id": "sh-waibaidu",
        "name": "外白渡桥",
        "lon": 121.49006,
        "lat": 31.242896,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B00155IL1T",
        "coordinateNote": "高德POI",
        "approximate": false,
        "query": "外白渡桥",
        "ticket": 14,
        "guide": "bund",
        "art": "bund",
        "intro": "外白渡桥连接苏州河两岸，过桥后向南进入外滩。语音导览会讲钢桥、邮局和金融建筑的关系。"
      },
      {
        "id": "sh-bund",
        "name": "外滩",
        "lon": 121.491,
        "lat": 31.239,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://www.shanghai.gov.cn/xxzfgzwj/20220127/d2c2979752314dc69738454f24cd515c.html",
        "coordinateNote": "约位，南京东路东端与外滩相交的街段锚点；非精确景点门口",
        "approximate": true,
        "query": "外滩·南京东路口观景段",
        "ticket": 14,
        "guide": "bund",
        "art": "bund",
        "intro": "一边是海关、银行等历史建筑，一边是黄浦江。按体力走南京东路口附近一段即可，不必把整条江岸走完。"
      },
      {
        "id": "sh-nanjinge",
        "name": "南京东路",
        "lon": 121.482303,
        "lat": 31.23689,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://www.amap.com/place/B0L3TX90XG",
        "coordinateNote": "以山西南路口大壶春POI作街段锚点；若去沈大成须继续向西再返回地铁",
        "approximate": true,
        "query": "南京东路步行街",
        "ticket": 14,
        "photo": "nanjing",
        "intro": "南京路正式放进这天主线。生煎、糕团二选一；沈大成在更西侧，买完去陆家嘴要折返南京东路地铁站。"
      },
      {
        "id": "sh-pearl",
        "name": "陆家嘴·东方明珠",
        "lon": 121.499718,
        "lat": 31.239703,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B00150F6D6",
        "coordinateNote": "高德POI；外观散步与购票登塔分开",
        "approximate": false,
        "query": "陆家嘴·东方明珠外观",
        "ticket": 14,
        "photo": "lujiazui",
        "intro": "从南京东路站坐2号线一站到陆家嘴，再步行看东方明珠等建筑外观。这里的免费是公共空间，登塔门票另计。"
      }
    ],
    "legs": [
      {
        "from": 0,
        "to": 1,
        "mode": "步行",
        "time": "5–10分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 1,
        "to": 2,
        "mode": "步行",
        "time": "5–10分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 2,
        "to": 3,
        "mode": "步行",
        "time": "10–15分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 3,
        "to": 4,
        "mode": "步行",
        "time": "15–25分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 4,
        "to": 5,
        "mode": "地铁2号线",
        "time": "25–40分钟",
        "note": "步行到南京东路站→陆家嘴站1站→地面；含进出站和步行，不能步行跨江",
        "estimateOnly": true
      }
    ],
    "snacks": [
      {
        "venueId": "sh-dahuchun",
        "venueName": "大壶春（山西南路店）",
        "lon": 121.482303,
        "lat": 31.23689,
        "buy": "生煎，小份现吃",
        "detour": "南京东路转山西南路约0–5分钟",
        "near": "南京东路山西南路口",
        "sources": [
          "https://www.amap.com/place/B0L3TX90XG",
          "https://mzj.sh.gov.cn/lnb-xw/20260113/492b829efb374c35953724c97036d5b4.html"
        ],
        "coordinateSystem": "GCJ-02（高德）或同底图约位",
        "coordinateNote": "高德门店POI",
        "approximate": false,
        "estimateOnly": true,
        "priority": "咸口优先"
      },
      {
        "venueId": "sh-shendacheng",
        "venueName": "沈大成（南京东路总店）",
        "lon": 121.478317,
        "lat": 31.235726,
        "buy": "条头糕、双酿团，挑一两样",
        "detour": "从山西南路口继续向西约8–12分钟单程；回南京东路站需折返",
        "near": "南京东路636号",
        "sources": [
          "https://www.amap.com/place/B00155H99S",
          "https://english.shanghai.gov.cn/en-GlobalTasteinShanghai2026-LocalFlavors/20260618/a74fedaf5c884243855303f04741060b.html"
        ],
        "coordinateSystem": "GCJ-02（高德）或同底图约位",
        "coordinateNote": "高德门店POI",
        "approximate": false,
        "estimateOnly": true,
        "priority": "甜口二选一",
        "note": "若按南京东路地铁跨江，买完向东返回地铁；赶日落时不加这段，不能写零绕路。"
      }
    ],
    "note": "从苏州到沪并入住后，这条线较满；14点前开走较从容。到得晚就减掉邮政大楼和乍浦桥，保留南京路、外滩和陆家嘴。 首选浦西看万国建筑、浦东看近处摩天楼和对岸外滩，陆家嘴先安排室外；登塔会另占约1.5–3小时，不与全部步行硬叠。 外滩走南京东路口附近一段即可，不必把整条江岸走完再折返。北外滩另列可选支线。",
    "duration": "下午至夜晚 · 跨江乘地铁",
    "water": [
      {
        "label": "苏州河",
        "width": 24,
        "points": [
          [
            121.479,
            31.2427
          ],
          [
            121.4847,
            31.2426
          ],
          [
            121.488,
            31.2423
          ],
          [
            121.4917,
            31.2421
          ]
        ]
      },
      {
        "label": "黄浦江",
        "width": 52,
        "points": [
          [
            121.494,
            31.249
          ],
          [
            121.4936,
            31.242
          ],
          [
            121.4956,
            31.236
          ],
          [
            121.501,
            31.23
          ]
        ]
      }
    ]
  },
  {
    "id": "sh-hengfu",
    "date": "10.31",
    "city": "上海",
    "title": "衡复街区梧桐散步",
    "nodes": [
      {
        "id": "sh-wukangbuilding",
        "name": "武康大楼",
        "lon": 121.438278,
        "lat": 31.20443,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B00155ITJ1",
        "coordinateNote": "高德POI，住宅外观游览",
        "approximate": false,
        "query": "武康大楼",
        "ticket": 15,
        "guide": "wukang",
        "art": "wukang",
        "intro": "辨认船头般的转角、底层拱廊与上层阳台。建筑是居民住处，在街道上听历史和看外观即可。"
      },
      {
        "id": "sh-wukang",
        "name": "武康路",
        "lon": 121.440627,
        "lat": 31.209252,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B0IA3PHRXP",
        "coordinateNote": "高德道路代表点；整条道路需向北走到安福路",
        "approximate": false,
        "query": "武康路",
        "ticket": 15,
        "guide": "wukang",
        "art": "wukang",
        "intro": "沿梧桐街道向北走，听建筑师与居民的故事。少追店铺清单，多留一点时间看路口与房屋的尺度。"
      },
      {
        "id": "sh-anfu",
        "name": "安福路",
        "lon": 121.444314,
        "lat": 31.214156,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B0IA3KDZMI",
        "coordinateNote": "高德道路代表点；整条路东西向",
        "approximate": false,
        "query": "安福路",
        "ticket": 15,
        "guide": "wukang",
        "art": "wukang",
        "intro": "适合午饭、咖啡与小店。遇到长队换一家，坐下来休息也是这条路线的一部分。"
      },
      {
        "id": "sh-wulumuqi",
        "name": "乌鲁木齐中路",
        "lon": 121.44592,
        "lat": 31.212771,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/BZAFR00259",
        "coordinateNote": "高德道路代表点",
        "approximate": false,
        "query": "乌鲁木齐中路",
        "ticket": 15,
        "art": "wukang",
        "intro": "从安福路向南转进街头生活更密集的一段，按营业挑小店，不必为了网红店折返。"
      },
      {
        "id": "sh-fuxingxi",
        "name": "复兴西路",
        "lon": 121.442479,
        "lat": 31.210704,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B00155PR2Q",
        "coordinateNote": "高德道路代表点，乌鲁木齐中路转向西走一小段",
        "approximate": false,
        "query": "复兴西路",
        "ticket": 15,
        "guide": "wukang",
        "art": "wukang",
        "intro": "用梧桐与老房子给散步收尾。按体力选择较短路段，私人建筑仅外观。"
      }
    ],
    "legs": [
      {
        "from": 0,
        "to": 1,
        "mode": "步行",
        "time": "15–20分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 1,
        "to": 2,
        "mode": "步行",
        "time": "10–15分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 2,
        "to": 3,
        "mode": "步行",
        "time": "5–10分钟",
        "note": "",
        "estimateOnly": true
      },
      {
        "from": 3,
        "to": 4,
        "mode": "步行",
        "time": "10–15分钟",
        "note": "沿乌鲁木齐中路向南，再转复兴西路向西一小段；不是直线穿街区。",
        "estimateOnly": true
      }
    ],
    "snacks": [
      {
        "venueId": "sh-kukuang-new",
        "venueName": "酷矿冰淇淋（武康大楼店）",
        "lon": 121.438137,
        "lat": 31.204222,
        "buy": "牛乳冰淇淋；口味看柜台当日供应",
        "detour": "武康大楼底层约0–3分钟",
        "near": "武康大楼淮海中路1852号",
        "sources": [
          "https://www.amap.com/place/B0FFKSCPJF",
          "https://k.sina.com.cn/article_5140679079_1326889a701900ujs6.html"
        ],
        "coordinateSystem": "GCJ-02（高德）或同底图约位",
        "coordinateNote": "高德门店POI",
        "approximate": false,
        "estimateOnly": true,
        "priority": "可选甜品",
        "outsideOriginalFoodPool": true,
        "note": "补充候选，非小红书或鸭觅认证；若天冷不想吃冰可直接跳过。未声称实地试吃。"
      }
    ],
    "note": "线路按武康路向北、安福路向东、乌鲁木齐中路向南展开，形成小环；不需要重复走武康大楼。 总步行约3–4公里的街区规划，停留、拍照、咖啡另算；私宅只外观，不进入住户区域。",
    "duration": "按体力慢行，交通时间不含参观"
  },
  {
    "id": "sh-depart",
    "date": "11.01",
    "city": "上海",
    "title": "张园短逛与返程",
    "nodes": [
      {
        "id": "sh-zhangyuan",
        "name": "张园",
        "lon": 121.460064,
        "lat": 31.227971,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B00155QIPB",
        "coordinateNote": "高德POI；本次只按已开放西区街区规划",
        "approximate": false,
        "query": "张园西区",
        "ticket": 15,
        "intro": "返程允许时，逛石库门公共街区与街巷尺度；临时展览和开放院落另看规定。"
      },
      {
        "id": "sh-nanjingw",
        "name": "南京西路",
        "lon": 121.46,
        "lat": 31.23,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://www.swireproperties.com/zh-cn/portfolio/current-developments/zhangyuan/",
        "coordinateNote": "约位，以张园北侧南京西路商业街区为示意锚点",
        "approximate": true,
        "query": "南京西路·吴江路口附近",
        "ticket": 15,
        "intro": "王家沙就在这一带，顺路买柜台点心或吃一碗馄饨。随后去酒店取行李，具体接驳按酒店与车票安排。"
      }
    ],
    "legs": [
      {
        "from": 0,
        "to": 1,
        "mode": "步行",
        "time": "5–10分钟",
        "note": "",
        "estimateOnly": true
      }
    ],
    "snacks": [
      {
        "venueId": "sh-wangjiasha-new",
        "venueName": "王家沙点心店（南京西路总店）",
        "lon": 121.461318,
        "lat": 31.230402,
        "buy": "挑当日柜台点心，或以一碗馄饨作简餐",
        "detour": "张园北行至南京西路约5–10分钟",
        "near": "南京西路805号",
        "sources": [
          "https://www.amap.com/place/B00155HNAR",
          "https://www.shanghai.gov.cn/nw4411/20260123/1cc9dd0a374945aeb3bb8517d30adb28.html"
        ],
        "coordinateSystem": "GCJ-02（高德）或同底图约位",
        "coordinateNote": "高德门店POI",
        "approximate": false,
        "estimateOnly": true,
        "priority": "张园旁顺路点心",
        "outsideOriginalFoodPool": true,
        "note": "柜台糕点适合带走；青团属季节品，不保证11月供应。"
      }
    ],
    "note": "豫园可替换张园安排半天；不建议返程日上午把张园、豫园、北外滩全塞进去。",
    "duration": "约1–2小时 · 以返程时间为先"
  },
  {
    "id": "sh-yuyuan",
    "date": "11.01",
    "city": "上海",
    "title": "豫园—城隍庙商圈半日",
    "optional": true,
    "nodes": [
      {
        "id": "sh-yuyuan",
        "name": "豫园入口周边",
        "lon": 121.492497,
        "lat": 31.227714,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B00155MF55",
        "coordinateNote": "高德POI，付费园林与外围商圈分开",
        "approximate": false,
        "query": "豫园",
        "photo": "yuyuan",
        "price": "商城街区免费；豫园本体另购票",
        "intro": "返程较晚时可用豫园商城、九曲桥一带替换张园。配图展示收费豫园内部，仅作参考；本条轻松方案不默认入园。",
        "ticketNote": "豫园园林、城隍庙和商城分别管理，门票与老人优惠需按所选场馆核验。",
        "ticket": null
      }
    ],
    "legs": [],
    "snacks": [
      {
        "venueId": "sh-nanxiang-new",
        "venueName": "南翔馒头店（城隍庙店）",
        "lon": 121.49151,
        "lat": 31.226577,
        "buy": "鲜肉小笼，一笼分着尝",
        "detour": "豫园外商城约3–5分钟",
        "near": "豫园路87号",
        "sources": [
          "https://ditu.amap.com/place/B00155IMN4"
        ],
        "coordinateSystem": "GCJ-02（高德）或同底图约位",
        "coordinateNote": "高德门店POI",
        "approximate": false,
        "estimateOnly": true,
        "priority": "豫园支线可选",
        "outsideOriginalFoodPool": true,
        "note": "小笼店也有堂食套餐；只安排一笼传统点心，不默认要吃整餐。排队过长就跳过。"
      }
    ],
    "note": "建议替换11/1张园或另有半天空档才加。豫园内部、城隍庙、豫园商城是不同票务对象。",
    "duration": "可选支线 · 替换，不叠加"
  },
  {
    "id": "sh-northbund",
    "date": "10.30",
    "city": "上海",
    "title": "北外滩国客中心滨江",
    "optional": true,
    "nodes": [
      {
        "id": "sh-waibaidu",
        "name": "外白渡桥",
        "lon": 121.49006,
        "lat": 31.242896,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://ditu.amap.com/place/B00155IL1T",
        "coordinateNote": "高德POI",
        "approximate": false,
        "query": "外白渡桥",
        "ticket": 14,
        "guide": "bund",
        "art": "bund",
        "intro": "外白渡桥连接苏州河两岸，过桥后向南进入外滩。语音导览会讲钢桥、邮局和金融建筑的关系。"
      },
      {
        "id": "sh-northbund",
        "name": "北外滩滨江",
        "lon": 121.501,
        "lat": 31.249,
        "coordinateSystem": "GCJ-02（高德）；约位条目为同底图街段推定",
        "sourceUrl": "https://www.shhk.gov.cn/xwzx/002014/20250418/67c9d29b-3a84-4f30-9201-ee60f32a223a.html",
        "coordinateNote": "约位，东大名路500号南侧滨江街段，不是精确入口",
        "approximate": true,
        "query": "北外滩国客中心滨江",
        "ticket": 14,
        "photo": "lujiazui",
        "intro": "从苏州河北岸看黄浦江与陆家嘴天际线。可替换一次江边散步，不和陆家嘴同晚强行加满。"
      }
    ],
    "legs": [
      {
        "from": 0,
        "to": 1,
        "mode": "步行或短程打车",
        "time": "步行25–35分钟 / 打车10–15分钟",
        "note": "",
        "estimateOnly": true
      }
    ],
    "snacks": [
      {
        "venueId": "sh-baiyulan",
        "venueName": "白玉兰食品（甜云店）",
        "lon": 121.498,
        "lat": 31.249,
        "buy": "小烧卖、肉包；按人数小份购买",
        "detour": "滨江转白玉兰广场约8–15分钟单程，含找地下层",
        "near": "白玉兰广场LG2",
        "sources": [
          "https://ditu.amap.com/place/B0FFLG5O9K",
          "https://gs.ctrip.com/html5/you/foods/fooddetail/2/24937256.html"
        ],
        "coordinateSystem": "GCJ-02（高德）或同底图约位",
        "coordinateNote": "约位：采用白玉兰广场商场锚点，店在地下LG2-M59-60，不能以地面坐标当铺位",
        "approximate": true,
        "estimateOnly": true,
        "priority": "北外滩支线顺路",
        "note": "不在浦西外滩主线；只有真的去北外滩才推荐，不为买包子专程跨区。"
      }
    ],
    "note": "此支线在苏州河北岸；若已安排浦东陆家嘴不必同晚追加。",
    "duration": "可选支线 · 替换，不叠加"
  }
];
const FOOD_LINKS_V3={
  "checkedAt": "2026-10-21",
  "scope": "30家现有门店的平台链接修复研究，不涉及网站修改",
  "xiaohongshu": {
    "status": "3篇原笔记已重新找到有效带参数链接并打开验证；店名搜索入口也已实际验证",
    "searchTemplate": "https://www.xiaohongshu.com/search_result?keyword={encodeURIComponent(city+\" \"+name)}&source=web_search_result_notes",
    "searchVerification": "用苏州 秋娟馄饨店在已登录浏览器验证，显示20多条搜索结果，原苏州清单在其中。",
    "notes": [
      {
        "oldUrl": "https://www.xiaohongshu.com/explore/6ac8a226000000001c01eea6",
        "url": "https://www.xiaohongshu.com/search_result/6ac8a226000000001c01eea6?xsec_token=ABZQ9858bh4gB0JhjaLomcTYm_4MO3lde-2RRyouivHrQ=&xsec_source=pc_search",
        "title": "苏州纯吃攻略丨本地人的逛吃清单📝",
        "verification": "2026-10-21 通过已登录小红书网页搜索找到原笔记，点击链接后标题与正文正常展开。参数来自网页公开链接，未读取Cookie。",
        "durability": "平台访问参数可能过期；不能承诺跨设备/未登录可直接读。应同时提供标题复制和搜索兜底。"
      },
      {
        "oldUrl": "https://www.xiaohongshu.com/explore/6ad6d9b1000000002601ec59",
        "url": "https://www.xiaohongshu.com/explore/6ad6d9b1000000002601ec59?xsec_token=ABhQ1pJVQOODbyjdTci3gYtAlIAkzWs2TbBJl2dzdO5TY=&xsec_source=pc_search&source=web_search_result_notes",
        "title": "徐州土著连夜整理！无广纯享版必吃清单",
        "verification": "2026-10-21 通过已登录小红书网页搜索找到原笔记，点击链接后标题与正文正常展开。参数来自网页公开链接，未读取Cookie。",
        "durability": "平台访问参数可能过期；不能承诺跨设备/未登录可直接读。应同时提供标题复制和搜索兜底。"
      },
      {
        "oldUrl": "https://www.xiaohongshu.com/explore/6abd289100000000150118a0",
        "url": "https://www.xiaohongshu.com/explore/6abd289100000000150118a0?xsec_token=ABvrW4LsYLxvSqqEC7ipfZADz4Z9VPEi3CWQIikJ-FoZo=&xsec_source=pc_search&source=web_search_result_notes",
        "title": "武康大楼附近吃什么",
        "verification": "2026-10-21 通过已登录小红书网页搜索找到原笔记，点击链接后标题与正文正常展开。参数来自网页公开链接，未读取Cookie。",
        "durability": "平台访问参数可能过期；不能承诺跨设备/未登录可直接读。应同时提供标题复制和搜索兜底。"
      }
    ],
    "uiRecommendation": "主入口“小红书搜店”；有原笔记的卡片额外“参考笔记”；旁边“复制店名/笔记标题”，遇到登录/无法跳转时粘贴到App。不要给裸explore链接。"
  },
  "meituan": {
    "status": "未核验到任何一家的准确门店详情链接；搜索路线也未通过成功结果页验证",
    "actualDetailLinksVerified": 0,
    "blocking": "m.meituan.com 浏览器超时；i.meituan.com 浏览器超时，公开HTTP读取转身份核实；上海城市搜索页不可访问。未绕过验证。",
    "officialEntry": "https://i.meituan.com/",
    "officialDownload": "https://www.meituan.com/",
    "uiRecommendation": "统一提供“复制店名，去美团查店”，先复制城市+具体分店名，再打开官方入口；不要把美团首页或未验证搜索地址命名为餐馆详情。若用户能在手机分享1–2个原生门店链接，可补准确详情链接。",
    "appSearchCandidate": {
      "template": "imeituan://www.meituan.com/search?q={encodeURIComponent(city+\" \"+name)}",
      "verification": "只找到社区维护的URL Scheme示例，未在手机美团实测；未找到官方文档，不能标已验证。可作为明确“尝试打开美团App”的辅助入口，需复制店名兜底。",
      "source": "https://github.com/tofrankie/url-scheme-collection/blob/main/README.md"
    },
    "doNotUse": [
      "https://m.meituan.com/ 当前验证失败",
      "从第三方商家ID猜测美团poiId",
      "把外卖商户当堂食店详情",
      "把美团搜索页伪装成精确分店详情"
    ]
  },
  "venues": [
    {
      "id": "xz-dazhang",
      "name": "大张烙馍村（滨湖东街店）",
      "city": "徐州",
      "query": "徐州 大张烙馍村 滨湖东街店",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E5%BE%90%E5%B7%9E%20%E5%A4%A7%E5%BC%A0%E7%83%99%E9%A6%8D%E6%9D%91%EF%BC%88%E6%BB%A8%E6%B9%96%E4%B8%9C%E8%A1%97%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "xz-lujia",
      "name": "路家棉布地锅鸡（样板店·苏堤北路店）",
      "city": "徐州",
      "query": "徐州 路家棉布地锅鸡 样板店 苏堤北路",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E5%BE%90%E5%B7%9E%20%E8%B7%AF%E5%AE%B6%E6%A3%89%E5%B8%83%E5%9C%B0%E9%94%85%E9%B8%A1%EF%BC%88%E6%A0%B7%E6%9D%BF%E5%BA%97%C2%B7%E8%8B%8F%E5%A0%A4%E5%8C%97%E8%B7%AF%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "xz-laoshi",
      "name": "老拾烧烤（丰储街总店）",
      "city": "徐州",
      "query": "徐州 老拾烧烤 丰储街总店",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E5%BE%90%E5%B7%9E%20%E8%80%81%E6%8B%BE%E7%83%A7%E7%83%A4%EF%BC%88%E4%B8%B0%E5%82%A8%E8%A1%97%E6%80%BB%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "xz-baiwei",
      "name": "百味地锅鸡（一店·夹河西街店）",
      "city": "徐州",
      "query": "徐州 百味地锅鸡 一店 夹河西街",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E5%BE%90%E5%B7%9E%20%E7%99%BE%E5%91%B3%E5%9C%B0%E9%94%85%E9%B8%A1%EF%BC%88%E4%B8%80%E5%BA%97%C2%B7%E5%A4%B9%E6%B2%B3%E8%A5%BF%E8%A1%97%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "xz-lianglaifeng",
      "name": "两来风（文亭街店）",
      "city": "徐州",
      "query": "徐州 两来风 文亭街店",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E5%BE%90%E5%B7%9E%20%E4%B8%A4%E6%9D%A5%E9%A3%8E%EF%BC%88%E6%96%87%E4%BA%AD%E8%A1%97%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "xz-mashijie",
      "name": "马市街饣它汤店（解放路店）",
      "city": "徐州",
      "query": "徐州 马市街饣它汤 解放路店",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E5%BE%90%E5%B7%9E%20%E9%A9%AC%E5%B8%82%E8%A1%97%E9%A5%A3%E5%AE%83%E6%B1%A4%E5%BA%97%EF%BC%88%E8%A7%A3%E6%94%BE%E8%B7%AF%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "xz-xulaoba",
      "name": "许老八包子铺（回龙窝店）",
      "city": "徐州",
      "query": "徐州 许老八包子铺 回龙窝店",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E5%BE%90%E5%B7%9E%20%E8%AE%B8%E8%80%81%E5%85%AB%E5%8C%85%E5%AD%90%E9%93%BA%EF%BC%88%E5%9B%9E%E9%BE%99%E7%AA%9D%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": "https://www.xiaohongshu.com/explore/6ad6d9b1000000002601ec59?xsec_token=ABhQ1pJVQOODbyjdTci3gYtAlIAkzWs2TbBJl2dzdO5TY=&xsec_source=pc_search&source=web_search_result_notes"
    },
    {
      "id": "xz-sanzhenzhai",
      "name": "三珍斋（大同街店）",
      "city": "徐州",
      "query": "徐州 三珍斋 大同街",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E5%BE%90%E5%B7%9E%20%E4%B8%89%E7%8F%8D%E6%96%8B%EF%BC%88%E5%A4%A7%E5%90%8C%E8%A1%97%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "xz-azhe",
      "name": "云龙湖阿喆米线（总店）",
      "city": "徐州",
      "query": "徐州 云龙湖阿喆米线 总店",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E5%BE%90%E5%B7%9E%20%E4%BA%91%E9%BE%99%E6%B9%96%E9%98%BF%E5%96%86%E7%B1%B3%E7%BA%BF%EF%BC%88%E6%80%BB%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sz-yuxingji",
      "name": "裕兴记（西北街总店）",
      "city": "苏州",
      "query": "苏州 裕兴记 西北街总店",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E8%8B%8F%E5%B7%9E%20%E8%A3%95%E5%85%B4%E8%AE%B0%EF%BC%88%E8%A5%BF%E5%8C%97%E8%A1%97%E6%80%BB%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sz-deyuelou",
      "name": "得月楼（观前店）",
      "city": "苏州",
      "query": "苏州 得月楼 观前店 太监弄",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E8%8B%8F%E5%B7%9E%20%E5%BE%97%E6%9C%88%E6%A5%BC%EF%BC%88%E8%A7%82%E5%89%8D%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sz-songhelou",
      "name": "松鹤楼（山塘店）",
      "city": "苏州",
      "query": "苏州 松鹤楼 山塘店",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E8%8B%8F%E5%B7%9E%20%E6%9D%BE%E9%B9%A4%E6%A5%BC%EF%BC%88%E5%B1%B1%E5%A1%98%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sz-danfeng",
      "name": "丹凤楼食府（新民桥菜场）",
      "city": "苏州",
      "query": "苏州 丹凤楼食府 新民桥",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E8%8B%8F%E5%B7%9E%20%E4%B8%B9%E5%87%A4%E6%A5%BC%E9%A3%9F%E5%BA%9C%EF%BC%88%E6%96%B0%E6%B0%91%E6%A1%A5%E8%8F%9C%E5%9C%BA%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sz-xiekehuang",
      "name": "江南蟹壳皇（西北街店）",
      "city": "苏州",
      "query": "苏州 江南蟹壳皇 西北街33号",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E8%8B%8F%E5%B7%9E%20%E6%B1%9F%E5%8D%97%E8%9F%B9%E5%A3%B3%E7%9A%87%EF%BC%88%E8%A5%BF%E5%8C%97%E8%A1%97%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sz-madongpei",
      "name": "马栋佩烧卖（新民桥店）",
      "city": "苏州",
      "query": "苏州 马栋佩烧卖 新民桥",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E8%8B%8F%E5%B7%9E%20%E9%A9%AC%E6%A0%8B%E4%BD%A9%E7%83%A7%E5%8D%96%EF%BC%88%E6%96%B0%E6%B0%91%E6%A1%A5%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sz-rongyanglou",
      "name": "荣阳楼（山塘街店）",
      "city": "苏州",
      "query": "苏州 荣阳楼 山塘街329号",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E8%8B%8F%E5%B7%9E%20%E8%8D%A3%E9%98%B3%E6%A5%BC%EF%BC%88%E5%B1%B1%E5%A1%98%E8%A1%97%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sz-taohuayuan",
      "name": "平江桃花源记（平江 1 店）",
      "city": "苏州",
      "query": "苏州 平江桃花源记 平江1店 平江路115号",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E8%8B%8F%E5%B7%9E%20%E5%B9%B3%E6%B1%9F%E6%A1%83%E8%8A%B1%E6%BA%90%E8%AE%B0%EF%BC%88%E5%B9%B3%E6%B1%9F%201%20%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sz-wanfuxing",
      "name": "万福兴（山塘街店）",
      "city": "苏州",
      "query": "苏州 万福兴 山塘街303号",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E8%8B%8F%E5%B7%9E%20%E4%B8%87%E7%A6%8F%E5%85%B4%EF%BC%88%E5%B1%B1%E5%A1%98%E8%A1%97%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": "https://www.xiaohongshu.com/search_result/6ac8a226000000001c01eea6?xsec_token=ABZQ9858bh4gB0JhjaLomcTYm_4MO3lde-2RRyouivHrQ=&xsec_source=pc_search"
    },
    {
      "id": "sh-lanxin",
      "name": "兰心餐厅（进贤路）",
      "city": "上海",
      "query": "上海 兰心餐厅 进贤路130号",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E4%B8%8A%E6%B5%B7%20%E5%85%B0%E5%BF%83%E9%A4%90%E5%8E%85%EF%BC%88%E8%BF%9B%E8%B4%A4%E8%B7%AF%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sh-haijinze",
      "name": "海金滋（陕西南路店）",
      "city": "上海",
      "query": "上海 海金滋 陕西南路店 进贤路240号",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E4%B8%8A%E6%B5%B7%20%E6%B5%B7%E9%87%91%E6%BB%8B%EF%BC%88%E9%99%95%E8%A5%BF%E5%8D%97%E8%B7%AF%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sh-oldjesse",
      "name": "老吉士饭馆（天平路店）",
      "city": "上海",
      "query": "上海 老吉士饭馆 天平路41号",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E4%B8%8A%E6%B5%B7%20%E8%80%81%E5%90%89%E5%A3%AB%E9%A5%AD%E9%A6%86%EF%BC%88%E5%A4%A9%E5%B9%B3%E8%B7%AF%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sh-xiaoshaoxing",
      "name": "小绍兴（山西南路新店）",
      "city": "上海",
      "query": "上海 小绍兴 山西南路",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E4%B8%8A%E6%B5%B7%20%E5%B0%8F%E7%BB%8D%E5%85%B4%EF%BC%88%E5%B1%B1%E8%A5%BF%E5%8D%97%E8%B7%AF%E6%96%B0%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sh-xiandelai",
      "name": "鲜得来（福建中路新总店）",
      "city": "上海",
      "query": "上海 鲜得来 总店 福建中路",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E4%B8%8A%E6%B5%B7%20%E9%B2%9C%E5%BE%97%E6%9D%A5%EF%BC%88%E7%A6%8F%E5%BB%BA%E4%B8%AD%E8%B7%AF%E6%96%B0%E6%80%BB%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sh-dahuchun",
      "name": "大壶春（山西南路店）",
      "city": "上海",
      "query": "上海 大壶春 山西南路店",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E4%B8%8A%E6%B5%B7%20%E5%A4%A7%E5%A3%B6%E6%98%A5%EF%BC%88%E5%B1%B1%E8%A5%BF%E5%8D%97%E8%B7%AF%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sh-shendacheng",
      "name": "沈大成（南京东路总店）",
      "city": "上海",
      "query": "上海 沈大成 南京东路636号",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E4%B8%8A%E6%B5%B7%20%E6%B2%88%E5%A4%A7%E6%88%90%EF%BC%88%E5%8D%97%E4%BA%AC%E4%B8%9C%E8%B7%AF%E6%80%BB%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "sh-baiyulan",
      "name": "白玉兰食品（甜云店）",
      "city": "上海",
      "query": "上海 白玉兰食品 甜云店 白玉兰广场",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E4%B8%8A%E6%B5%B7%20%E7%99%BD%E7%8E%89%E5%85%B0%E9%A3%9F%E5%93%81%EF%BC%88%E7%94%9C%E4%BA%91%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": null
    },
    {
      "id": "xz-yiwaipo-wuzhuang",
      "name": "忆外婆地锅鸡（吴庄店）",
      "city": "徐州",
      "query": "徐州 忆外婆地锅鸡 吴庄店",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E5%BE%90%E5%B7%9E%20%E5%BF%86%E5%A4%96%E5%A9%86%E5%9C%B0%E9%94%85%E9%B8%A1%EF%BC%88%E5%90%B4%E5%BA%84%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": "https://www.xiaohongshu.com/explore/6ad6d9b1000000002601ec59?xsec_token=ABhQ1pJVQOODbyjdTci3gYtAlIAkzWs2TbBJl2dzdO5TY=&xsec_source=pc_search&source=web_search_result_notes"
    },
    {
      "id": "xz-panji-xinglong",
      "name": "潘记红烧肉（兴隆街店）",
      "city": "徐州",
      "query": "徐州 潘记红烧肉 兴隆街店",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E5%BE%90%E5%B7%9E%20%E6%BD%98%E8%AE%B0%E7%BA%A2%E7%83%A7%E8%82%89%EF%BC%88%E5%85%B4%E9%9A%86%E8%A1%97%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": "https://www.xiaohongshu.com/explore/6ad6d9b1000000002601ec59?xsec_token=ABhQ1pJVQOODbyjdTci3gYtAlIAkzWs2TbBJl2dzdO5TY=&xsec_source=pc_search&source=web_search_result_notes"
    },
    {
      "id": "sz-qiujuan",
      "name": "秋娟馄饨店",
      "city": "苏州",
      "query": "苏州 秋娟馄饨店 西杨安浜",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E8%8B%8F%E5%B7%9E%20%E7%A7%8B%E5%A8%9F%E9%A6%84%E9%A5%A8%E5%BA%97&source=web_search_result_notes",
      "xiaohongshuNoteUrl": "https://www.xiaohongshu.com/search_result/6ac8a226000000001c01eea6?xsec_token=ABZQ9858bh4gB0JhjaLomcTYm_4MO3lde-2RRyouivHrQ=&xsec_source=pc_search"
    },
    {
      "id": "sh-jiangzhanggui",
      "name": "蒋掌柜·老上海本帮美食（武康大楼店）",
      "city": "上海",
      "query": "上海 蒋掌柜 老上海本帮美食 武康大楼店 淮海中路1793号",
      "meituanDetailUrl": null,
      "meituanVerification": "unresolved_not_verified",
      "meituanEntryUrl": "https://i.meituan.com/",
      "meituanLabel": "复制店名 · 去美团查店",
      "xiaohongshuSearchUrl": "https://www.xiaohongshu.com/search_result?keyword=%E4%B8%8A%E6%B5%B7%20%E8%92%8B%E6%8E%8C%E6%9F%9C%C2%B7%E8%80%81%E4%B8%8A%E6%B5%B7%E6%9C%AC%E5%B8%AE%E7%BE%8E%E9%A3%9F%EF%BC%88%E6%AD%A6%E5%BA%B7%E5%A4%A7%E6%A5%BC%E5%BA%97%EF%BC%89&source=web_search_result_notes",
      "xiaohongshuNoteUrl": "https://www.xiaohongshu.com/explore/6abd289100000000150118a0?xsec_token=ABvrW4LsYLxvSqqEC7ipfZADz4Z9VPEi3CWQIikJ-FoZo=&xsec_source=pc_search&source=web_search_result_notes"
    }
  ],
  "sources": [
    {
      "url": "https://www.meituan.com/",
      "kind": "official",
      "finding": "官方企业主页可读，提供美团App下载和关注入口；非餐馆详情。"
    },
    {
      "url": "https://i.meituan.com/",
      "kind": "official",
      "finding": "官方移动站此次转身份核实，不能确认搜索或店铺落地。"
    },
    {
      "url": "https://h5.waimai.meituan.com/",
      "kind": "official",
      "finding": "公开可见外卖搜索框，但属于外卖并依赖定位，不建议当作堂食详情替代。"
    }
  ],
  "localFindings": [
    "C:/Users/admin/Documents/Codex/2026-10-21/ni/work 与 outputs 目录为空；无可复用公开链接。",
    "已有 xhs-suzhou-note.txt 和 xhs-xuzhou-note.txt 只存正文，没有原访问参数。"
  ],
  "contentCorrectionHints": [
    {
      "id": "xz-baiwei",
      "issue": "现有tip仍说10月28日休息日下午，和新行程冲突；应改为徐州两日正餐备选。"
    },
    {
      "id": "sz-yuxingji",
      "issue": "现有tip仍说30日进园/31日出发；应改29日进园或30日出发。"
    },
    {
      "id": "sz-songhelou",
      "issue": "现有tip仍说29日山塘夜游，应改28日。"
    },
    {
      "id": "sz-danfeng",
      "issue": "现有tip仍说29日留园到山塘，应改28日。"
    }
  ]
};
const PHOTO_ASSETS_V3=[{"id":"yunlong","file":"yunlong.webp","source":"https://commons.wikimedia.org/wiki/File:20260722_Yunlong_Mountain_North_Gate_Xuzhou_01.jpg","title":"File:20260722 Yunlong Mountain North Gate Xuzhou 01.jpg","author":"祝鱼贵","license":"CC BY-SA 4.0","licenseURL":"https://creativecommons.org/licenses/by-sa/4.0","description":"Yunlong Mountain Scenic Area in Xuzhou, Jiangsu, China","photoDate":"2026-07-22 14:20:26","width":1200,"height":900,"bytes":278782,"changes":"仅缩放、校正 EXIF 显示方向与 WebP 压缩；未改画面内容","checkedAt":"2026-10-21","attribution":"祝鱼贵 / Wikimedia Commons / CC BY-SA 4.0","src":"assets/photos/yunlong.webp"},{"id":"liuyuan","file":"liuyuan.webp","source":"https://commons.wikimedia.org/wiki/File:Lingering_Garden2.jpg","title":"File:Lingering Garden2.jpg","author":"钉钉","license":"CC BY-SA 4.0","licenseURL":"https://creativecommons.org/licenses/by-sa/4.0","description":"Lingering Garden","photoDate":"2020-12-10 14:28:42","width":1200,"height":900,"bytes":292068,"changes":"仅缩放、校正 EXIF 显示方向与 WebP 压缩；未改画面内容","checkedAt":"2026-10-21","attribution":"钉钉 / Wikimedia Commons / CC BY-SA 4.0","src":"assets/photos/liuyuan.webp"},{"id":"zhuozheng","file":"zhuozheng.webp","source":"https://commons.wikimedia.org/wiki/File:Humble_Administrator%27s_Garden_Suzhou_November_2017_008.jpg","title":"File:Humble Administrator's Garden Suzhou November 2017 008.jpg","author":"King of Hearts","license":"CC BY-SA 4.0","licenseURL":"https://creativecommons.org/licenses/by-sa/4.0","description":"Mountain View Tower, Humble Administrator's Garden, Suzhou, China.","photoDate":"2017-11-27 11:45","width":1200,"height":900,"bytes":299518,"changes":"仅缩放、校正 EXIF 显示方向与 WebP 压缩；未改画面内容","checkedAt":"2026-10-21","attribution":"King of Hearts / Wikimedia Commons / CC BY-SA 4.0","src":"assets/photos/zhuozheng.webp"},{"id":"pingjiang","file":"pingjiang.webp","source":"https://commons.wikimedia.org/wiki/File:Riverside_of_Pingjiang_Road,_Gusu,_Suzhou,_Jiangsu,_China,_215000.jpg","title":"File:Riverside of Pingjiang Road, Gusu, Suzhou, Jiangsu, China, 215000.jpg","author":"song songroov","license":"CC BY 3.0","licenseURL":"https://creativecommons.org/licenses/by/3.0","description":"Pingjiang Road, Gusu, Suzhou, Jiangsu, China, 215000","photoDate":"Taken on 17 April 2016","width":1200,"height":675,"bytes":270340,"changes":"仅缩放、校正 EXIF 显示方向与 WebP 压缩；未改画面内容","checkedAt":"2026-10-21","attribution":"song songroov / Wikimedia Commons / CC BY 3.0","src":"assets/photos/pingjiang.webp"},{"id":"bund","file":"bund.webp","source":"https://commons.wikimedia.org/wiki/File:2014.11.16.144807_HSBC_Building_Customs_House_The_Bund_Shanghai.jpg","title":"File:2014.11.16.144807 HSBC Building Customs House The Bund Shanghai.jpg","author":"Hermann Luyken","license":"CC0","licenseURL":"http://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Hongkong & Shanghai Banking Corporation (HSBC) Building and Customs House at the Bund - Shanghai, China, 16.22.2014","photoDate":"2014-11-16 14:48:07","width":1200,"height":800,"bytes":161150,"changes":"仅缩放、校正 EXIF 显示方向与 WebP 压缩；未改画面内容","checkedAt":"2026-10-21","attribution":"Hermann Luyken / Wikimedia Commons / CC0","src":"assets/photos/bund.webp"},{"id":"wukang","file":"wukang.webp","source":"https://commons.wikimedia.org/wiki/File:Wukang_Mansion.jpg","title":"File:Wukang Mansion.jpg","author":"钉钉","license":"CC BY-SA 4.0","licenseURL":"https://creativecommons.org/licenses/by-sa/4.0","description":"Wukang Mansion","photoDate":"2022-08-28","width":1200,"height":1600,"bytes":283528,"changes":"仅缩放、校正 EXIF 显示方向与 WebP 压缩；未改画面内容","checkedAt":"2026-10-21","attribution":"钉钉 / Wikimedia Commons / CC BY-SA 4.0","src":"assets/photos/wukang.webp"},{"id":"lujiazui","file":"lujiazui.webp","source":"https://commons.wikimedia.org/wiki/File:Pudong_Shanghai_November_2017_panorama.jpg","title":"File:Pudong Shanghai November 2017 panorama.jpg","author":"King of Hearts","license":"CC BY-SA 4.0","licenseURL":"https://creativecommons.org/licenses/by-sa/4.0","description":"Four-segment panorama of Pudong, Shanghai, China.","photoDate":"Taken on 20 November 2017, 17:08:32","width":1200,"height":600,"bytes":87786,"changes":"仅缩放、校正 EXIF 显示方向与 WebP 压缩；未改画面内容","checkedAt":"2026-10-21","attribution":"King of Hearts / Wikimedia Commons / CC BY-SA 4.0","src":"assets/photos/lujiazui.webp"},{"id":"nanjing","file":"nanjing.webp","source":"https://commons.wikimedia.org/wiki/File:2014.11.15.184711_East_Nanjing_Road_Pedestrian_Zone_Shanghai.jpg","title":"File:2014.11.15.184711 East Nanjing Road Pedestrian Zone Shanghai.jpg","author":"Hermann Luyken","license":"CC0","licenseURL":"http://creativecommons.org/publicdomain/zero/1.0/deed.en","description":"Pedestrian zone East Nanjing Road at night - Shanghai, 15.11.2014","photoDate":"2014-11-15 18:47:11","width":1200,"height":800,"bytes":239094,"changes":"仅缩放、校正 EXIF 显示方向与 WebP 压缩；未改画面内容","checkedAt":"2026-10-21","attribution":"Hermann Luyken / Wikimedia Commons / CC0","src":"assets/photos/nanjing.webp"},{"id":"yuyuan","file":"yuyuan.webp","source":"https://commons.wikimedia.org/wiki/File:Shanghai_-_Yu_Garden_-_0035.jpg","title":"File:Shanghai - Yu Garden - 0035.jpg","author":"Stefan Fussan","license":"CC BY-SA 3.0","licenseURL":"https://creativecommons.org/licenses/by-sa/3.0","description":"Tingtao Tower Exhibit Hall and a pond in Yu Garden, Shanghai, China","photoDate":"2016-09-20","width":1200,"height":705,"bytes":264324,"changes":"仅缩放、校正 EXIF 显示方向与 WebP 压缩；未改画面内容","checkedAt":"2026-10-21","attribution":"Stefan Fussan / Wikimedia Commons / CC BY-SA 3.0","src":"assets/photos/yuyuan.webp"}];
// Revised pocket edition. Coordinates are approximate planning anchors, not GPS directions.
const GUIDE_LINKS={yunlong:'guides/yunlong/index.html',liuyuan:'guides/liuyuan/index.html',zhuozheng:'guides/zhuozheng/index.html',pingjiang:'guides/pingjiang/index.html',bund:'guides/bund/index.html',wukang:'guides/wukang/index.html'};
const DAY_GUIDES=[[],['yunlong'],['liuyuan'],['zhuozheng','pingjiang'],['bund'],['wukang'],[]];
const GUIDE_NAMES={yunlong:'云龙山',liuyuan:'留园',zhuozheng:'拙政园',pingjiang:'平江路',bund:'苏州河—外滩',wukang:'武康路—衡复'};
const GUIDE_ART_POS={yunlong:'0% 0%',liuyuan:'50% 0%',zhuozheng:'100% 0%',pingjiang:'0% 100%',bund:'50% 100%',wukang:'100% 100%'};
const tripBase='https://xiamiaozhao.github.io/Watertiu.github.io/china-trip-2026/';
Object.assign(DAYS[0],{route:'酒店 → 富国街（可选）→ 文庙 → 回龙窝 → 户部山',food:'富国街只少量尝味，回龙窝附近坐下来吃晚饭。许老八包子若已售罄就跳过，不必为了买到折返。',tip:'按新计划在徐州住10/26、10/27两晚，原10/28晚订单需调整。到店确认能否原房连住。'});
DAYS[0].stops=[...DAYS[0].stops.slice(0,2),['15:45','富国街 · 先尝一点','按体力可选，少量分享小吃；跳过这里可直接前往文庙。','徐州富国街','徐州',true],['16:15','文庙街区','看看屋脊、院墙和街巷。以公共区域为主，入内参观按现场开放。','徐州文庙','徐州'],['17:00','回龙窝 · 晚饭','沿古巷慢逛，顺路看看许老八包子是否营业；小吃不代替坐下来休息。','徐州回龙窝','徐州'],['18:00','户部山街巷','看坡道、门楼与古民居外观；晚上不安排收费院落。体力不足就回酒店。','徐州户部山','徐州']];
function localPage(url){return document.body.dataset.page==='offline'?tripBase+url:document.body.dataset.page==='guides'?'../'+url:url;}
// Retain the existing dates and booked journeys; add Shanghai's two requested classics.
Object.assign(DAYS[4],{title:'两岸上海 · 从老楼到天际线',tag:'苏州河 / 南京路 / 陆家嘴',desc:'上午抵沪、寄存行李并休息。下午听苏州河—外滩的人文导览，逛南京东路，再坐地铁2号线到陆家嘴看天际线。按体力压缩步行，登塔不是必需。',route:'苏州河 → 外白渡桥 → 外滩 → 南京东路 → 地铁2号线 → 陆家嘴滨江',food:'南京东路顺路买沈大成糕团；正餐提前在市区解决，江边只留轻松散步。',tip:'南京东路站→陆家嘴站为2号线一站；连同进出站和街段步行约25–40分钟。不要按地图直线跨江步行。累了可把陆家嘴改到次日晚上。'});
DAYS[4].stops=[DAYS[4].stops[0],['10:30','酒店寄存行李 · 午饭休息','抵达后先放行李，午饭坐下来吃；下午从苏州河开始，避免拖着箱子走路线。',state.hotel||'上海人民广场','上海'],['13:00','邮政大楼 → 乍浦路桥','沿北苏州路看邮政大楼外观与河岸。可打开人文语音导览，听通信、桥梁与城市贸易的故事。','上海邮政博物馆','上海'],['14:00','外白渡桥 → 外滩','外白渡桥过河，沿外滩看历史建筑与黄浦江。只走公共岸线，不默认购买游船。','上海外滩','上海'],['15:30','南京东路步行街','南京路这次明确放进主线。按体力走一段，顺路买糕团或生煎，别为了全街打卡折返。','上海南京东路步行街','上海'],['17:00','地铁到陆家嘴 · 晚饭','南京东路站乘2号线到陆家嘴站；连同进出站和街段步行约25–40分钟。先吃饭或休息，再去滨江。','上海陆家嘴地铁站','上海'],['18:00','陆家嘴滨江 · 城市天际线','看东方明珠、上海中心等建筑外观与对岸外滩。夜景按实际天色与亮灯安排；观景台另购票，地面游览足够精彩。','上海陆家嘴滨江大道','上海']];
DAYS[6].desc='返程日留两种轻松方案：住南京西路附近就逛张园；更想看老上海，可用豫园商城—九曲桥替换。先确定返程车站与时刻，两条路线只选一条。';
DAYS[6].tip='豫园商城、九曲桥是公共街区路线；豫园园林本体另购票。返程时间不明时，不安排入园；至少留足取行李、去车站和进站时间。';
function renderDay(){if(!document.getElementById('day-tabs'))return;renderDayBase();const w=FORECASTS[state.day];const ribbon=document.querySelector('.route-ribbon');if(w)ribbon.insertAdjacentHTML('afterend','<div class="day-weather"><span>'+esc(w.condition)+' · '+esc(w.kind)+'</span><a href="'+localPage('weather.html')+'"><b>'+w.high+'° / '+w.low+'°</b> 天气 ↗</a></div>');const date=DAYS[state.day].date;const dayRoutes=ATLAS_V3.filter(r=>r.date===date);const links='<div class="day-links">'+dayRoutes.map((r,i)=>'<a class="'+(!i?'primary':'')+'" href="'+localPage('city-walk.html?route='+r.id)+'">'+(i?'备选路线':'今天的路线与小吃')+' ↗</a>').join('')+DAY_GUIDES[state.day].map(g=>'<a href="'+localPage(GUIDE_LINKS[g])+'">听'+GUIDE_NAMES[g]+' ↗</a>').join('')+'</div>';ribbon.insertAdjacentHTML('afterend',links);if(state.day===4||state.day===6){document.getElementById('day-content').insertAdjacentHTML('beforeend',classicOptions(state.day));}}
function classicOptions(day){return '<div class="classic-options">'+(day===4?[
['陆家嘴滨江','已加入10/30','东方明珠、上海中心与对岸外滩同框。选地面外观和滨江步道，登塔随意。','上海陆家嘴滨江大道'],
['南京东路','已加入10/30','老字号、步行街和近代商业街景；沈大成糕团可以顺路少买几块。','上海南京东路步行街'],
['北外滩滨江','另一个夜景选择','更适合看陆家嘴全景。可替换一晚的江边散步，不和全部景点叠加。','上海北外滩滨江绿地']]:[
['豫园商城—九曲桥','替换张园 / 返程允许','老城厢传统建筑与湖心亭外观。只逛公共区域约1–2小时，入豫园本体另购票。','上海豫园九曲桥'],
['张园—南京西路','就近轻松方案','石库门公共街区与南京西路，适合住人民广场或南京西路、时间较短的早晨。','上海张园']]).map(c=>'<article class="classic-card"><span class="tag">'+c[1]+'</span><h4>'+c[0]+'</h4><p>'+c[2]+'</p>'+mapLink(c[3],'上海','高德查看 ↗')+'</article>').join('')+'</div>';}
function selectedRoute(){return ATLAS_V3[activeWalk]||ATLAS_V3[0];}
function atlasDimensions(){return matchMedia("(max-width:760px)").matches?{w:430,h:560}:{w:900,h:650};}
function projectRoute(r){const {w,h}=atlasDimensions();const pts=[...r.nodes,...(r.snacks||[])].filter(p=>Number.isFinite(p.lon)&&Number.isFinite(p.lat));const minX=Math.min(...pts.map(p=>p.lon)),maxX=Math.max(...pts.map(p=>p.lon)),minY=Math.min(...pts.map(p=>p.lat)),maxY=Math.max(...pts.map(p=>p.lat));const cos=Math.cos((minY+maxY)/2*Math.PI/180),dx=Math.max((maxX-minX)*cos,.001),dy=Math.max(maxY-minY,.001),s=Math.min((w-150)/dx,(h-180)/dy);const ox=(w-(maxX-minX)*cos*s)/2,oy=(h-(maxY-minY)*s)/2;return p=>({x:ox+(p.lon-minX)*cos*s,y:oy+(maxY-p.lat)*s});}
function atlasSvg(r){const {w,h}=atlasDimensions();const project=projectRoute(r),points=r.nodes.map(project),snacks=(r.snacks||[]).map(project);const labels=[];let svg='<rect width="'+w+'" height="'+h+'" fill="#f6f0df"/><defs><pattern id="atlas-grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#e9e0cb" stroke-width=".5"/></pattern></defs><rect width="'+w+'" height="'+h+'" fill="url(#atlas-grid)"/><g fill="#8a795b" font-size="12"><path transform="translate('+(w-900)+' 0)" d="M846 91V43l-8 17 8-5 8 5Z" fill="#7e8d74"/><text x="'+(w-59)+'" y="32">北</text><text x="27" y="'+(h-25)+'">方位依据地理坐标 · 连线为游览顺序</text></g>';
for(const water of r.water||[]){const ps=water.points.map(c=>project({lon:c[0],lat:c[1]}));svg+='<polyline class="atlas-water" points="'+ps.map(p=>p.x+','+p.y).join(' ')+'" stroke-width="'+(water.width||25)+'"/>';if(water.label){const p=ps[Math.floor(ps.length/2)];svg+='<text class="atlas-bg-label" x="'+(p.x+15)+'" y="'+(p.y-13)+'">'+esc(water.label)+'</text>';}}
for(const leg of r.legs||[]){const a=points[leg.from],b=points[leg.to];if(!a||!b)continue;svg+='<path class="atlas-line '+(/步行/.test(leg.mode)?'':'transit')+'" d="M'+a.x+' '+a.y+'L'+b.x+' '+b.y+'"/>';}
function labelBox(p,name){const width=Math.max(66,Math.min(168,name.length*14+42)),height=31;const options=[[19,-40],[19,10],[-width-19,-40],[-width-19,10],[-width/2,-62],[-width/2,31],[20,-16],[-width-20,-16],[-width/2,-95],[-width/2,64],[20,-130],[-width-20,96],[-width/2,-170],[-width/2,130]];let best;for(const [dx,dy]of options){const box={x:Math.max(15,Math.min(w-15-width,p.x+dx)),y:Math.max(70,Math.min(h-60,p.y+dy)),w:width,h:height};const overlap=labels.reduce((a,b)=>a+Math.max(0,Math.min(box.x+box.w,b.x+b.w)-Math.max(box.x,b.x))*Math.max(0,Math.min(box.y+box.h,b.y+b.h)-Math.max(box.y,b.y)),0)+points.reduce((a,q)=>a+(q.x>box.x-10&&q.x<box.x+width+10&&q.y>box.y-10&&q.y<box.y+height+10?800:0),0);if(!best||overlap<best.overlap)best={...box,overlap};if(overlap===0)break;}labels.push(best);return best;}
r.nodes.forEach((n,i)=>{const p=points[i],b=labelBox(p,n.name);svg+='<g class="atlas-marker '+(i===activeSpot?'selected':'')+'" data-spot="'+i+'" tabindex="0" role="button" aria-label="查看'+esc(n.name)+'"><line class="marker-leader" x1="'+p.x+'" y1="'+p.y+'" x2="'+(b.x+16)+'" y2="'+(b.y+16)+'"/><rect class="atlas-label-bg" x="'+b.x+'" y="'+b.y+'" width="'+b.w+'" height="'+b.h+'" rx="5"/><text x="'+(b.x+b.w/2+12)+'" y="'+(b.y+21)+'" text-anchor="middle">'+esc(n.name)+'</text><circle cx="'+p.x+'" cy="'+p.y+'" r="4" fill="#506e5e"/><circle class="marker-dot" cx="'+(b.x+16)+'" cy="'+(b.y+16)+'" r="12"/><text class="marker-number" x="'+(b.x+16)+'" y="'+(b.y+20)+'" text-anchor="middle">'+(i+1)+'</text></g>';});
(r.snacks||[]).forEach((n,i)=>{const a=snacks[i];let p={x:a.x+27,y:a.y+22};for(const [dx,dy]of [[27,22],[35,-25],[-30,25],[45,45],[-40,-32],[65,0]]){const c={x:Math.min(w-20,Math.max(20,a.x+dx)),y:Math.min(h-40,Math.max(50,a.y+dy))};if(!labels.some(b=>c.x>b.x-16&&c.x<b.x+b.w+16&&c.y>b.y-16&&c.y<b.y+b.h+16)){p=c;break;}}svg+='<line class="marker-leader" x1="'+a.x+'" y1="'+a.y+'" x2="'+p.x+'" y2="'+p.y+'"/>';svg+='<g class="atlas-snack" data-snack="'+i+'" role="button" tabindex="0" aria-label="顺路小吃：'+esc(n.name||n.venueName)+'"><circle cx="'+p.x+'" cy="'+p.y+'" r="13"/><text x="'+p.x+'" y="'+(p.y+4)+'" text-anchor="middle">食'+(i+1)+'</text></g>';});return svg;}
function renderWalks(){if(!document.getElementById('map-tabs')||!ATLAS_V3.length)return;const r=selectedRoute();document.getElementById('map-tabs').innerHTML=ATLAS_V3.map((r,i)=>'<button type="button" class="map-tab '+(i===activeWalk?'active':'')+'" data-walk="'+i+'" aria-pressed="'+(i===activeWalk)+'"><small>'+r.date+' / '+r.city+(r.optional?' · 备选':'')+'</small><b>'+esc(r.title)+'</b></button>').join('');document.getElementById('route-map-board').innerHTML='<div class="map-board-head"><h3>'+esc(r.title)+'</h3><span>'+esc(r.duration||'按体力取舍')+'</span></div><div class="atlas-view" id="atlas-view"><svg viewBox="0 0 '+atlasDimensions().w+' '+atlasDimensions().h+'" aria-label="'+esc(r.title)+'地理方位路线图">'+atlasSvg(r)+'</svg></div><div class="atlas-tools"><div class="atlas-legend">● 数字：景点　<span style="color:#a96b36">● 食：顺路小吃</span><br>橙线：步行　灰绿线：乘车</div><button type="button" id="atlas-zoom" aria-pressed="false">放大地图 ＋</button></div>';
document.getElementById('spot-list').innerHTML=r.nodes.map((n,i)=>'<button data-spot="'+i+'" type="button" class="'+(i===activeSpot?'active':'')+'">'+(i+1)+' · '+esc(n.name)+'</button>').join('');document.getElementById('route-intro').textContent=r.note||'';const legs=document.getElementById('route-legs');if(legs)legs.innerHTML=(r.legs||[]).map((l,i)=>'<article class="leg"><span class="leg-index">'+(i+1)+'</span><div><strong>'+esc(r.nodes[l.from].name)+' → '+esc(r.nodes[l.to].name)+'</strong><p>'+esc(l.mode)+' · '+esc(l.time)+(l.note?'｜'+esc(l.note):'')+'</p>'+mapLink(r.nodes[l.to].query||r.nodes[l.to].name,r.city,'高德导航到下一站 ↗')+'</div></article>').join('');const s=document.getElementById('walk-snacks');if(s)s.innerHTML=snackMarkup(r);renderSpot();}
function snackMarkup(r){return '<h3>路过时，尝一口</h3><p>按顺路程度挑选；小份分享就好。位置为门店或所在街段附近，出发前核对营业。</p>'+(r.snacks||[]).map((s,i)=>{const f=VENUES.find(f=>f.id===s.venueId||f.name===s.venueName);return '<article class="snack-stop" id="snack-'+i+'"><h4>食'+(i+1)+' · '+esc(s.name||s.venueName)+'</h4><p><strong>尝什么：</strong>'+esc(s.buy)+'</p><p>'+esc(s.near)+' · '+esc(s.detour)+(s.approximate?' · 地图为街段约位':'')+'</p><div class="snack-actions">'+mapLink(f?.mapQuery||s.name||s.venueName,r.city,'高德去买 ↗')+(f?meituanLink(f):'')+'<a href="'+localPage('food.html')+'">完整美食清单 ↗</a></div></article>';}).join('')+(!(r.snacks||[]).length?'<p>这一段优先看景，没有硬凑绕路小吃；餐饮留在出发或返回市区时。</p>':'');}
function renderSpot(){const box=document.getElementById('landmark-info');if(!box||!ATLAS_V3.length)return;const r=selectedRoute(),n=r.nodes[activeSpot]||r.nodes[0],index=r.nodes.indexOf(n),ticket=n.ticket,c=ticket!==null&&ticket!==undefined?TICKET_CHANNELS[ticket]:null;const art=n.art||n.guide;const photo=PHOTO_ASSETS_V3.find(p=>p.id===(n.photo||(['xz-yunlongnorth','sz-liuyuan','sz-zhuozheng','sz-pingjiang','sh-bund','sh-wukangbuilding','sh-wukang'].includes(n.id)?art:null))&&p.src);const artMarkup=photo?'<img src="'+esc(photo.src)+'" alt="'+esc(n.name)+'实景照片">':false&&art&&GUIDE_ART_POS[art]?'<div class="landmark-painting" role="img" aria-label="'+esc(n.name)+'精细手绘意象" style="background-position:'+GUIDE_ART_POS[art]+'"></div>':n.image?'<img src="'+esc(n.image)+'" alt="'+esc(n.name)+'建筑手绘">':'<img src="assets/jiangnan-scroll-v3.webp" alt="江南山水建筑手绘意象">';box.innerHTML='<div class="detail-kicker">'+r.city+' / '+r.date+' · '+(index+1)+' 号停靠点</div><div class="detail-art">'+artMarkup+'</div><h3>'+esc(n.name)+'</h3><p class="detail-intro">'+esc(n.intro||'按当天的路线顺路停留，实际出入口请查看高德。')+'</p>'+(n.guide?'<div class="day-links"><a class="primary" href="'+localPage(GUIDE_LINKS[n.guide])+'">进入'+GUIDE_NAMES[n.guide]+'语音导览 ↗</a></div>':'')+'<div class="detail-meta"><span>门票参考<b>'+esc(n.price||(c?TICKETS[ticket][2]:'公共区域 / 外观免费'))+'</b></span></div>'+(c?'<div class="detail-senior">'+esc(c.senior)+'</div>'+purchaseMarkup(ticket):'<p class="purchase-caption">'+esc(n.ticketNote||'本路线按公共区域或建筑外观安排，进入收费场馆、登塔和游船需另购票。')+'</p>')+'<div class="link-row">'+mapLink(n.query||n.name,r.city,'高德打开此站 ↗')+'<a class="map-link" href="'+localPage('tickets.html')+'">全部预约 / 优惠 ↗</a></div><p class="small muted">地图为街区方位手绘示意；照片为往期实景，插画为艺术表现。图片作者和授权见图片来源页。</p>';}
function meituanEntry(f){const entries=Array.isArray(FOOD_LINKS_V3)?FOOD_LINKS_V3:(FOOD_LINKS_V3.venues||FOOD_LINKS_V3.entries||[]);return entries.find(e=>e.id===f.id||e.name===f.name)||{};}
function meituanLink(f){const e=meituanEntry(f);const url=e.meituanDetailUrl||e.meituanEntryUrl||'https://i.meituan.com/';return '<a class="meituan" data-mt-copy="'+esc(e.query||f.city+' '+f.name)+'" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+(e.meituanDetailUrl?'美团门店详情':'复制店名 · 打开美团')+' ↗</a>';}
function renderFoods(){if(!document.getElementById('food-grid'))return;renderFilter('food-filter',state.foodCity,'food-city');document.getElementById('food-kind-filter').innerHTML=[['all','全部吃法'],['restaurant','坐下来吃饭'],['snack','小吃与早茶']].map(([k,v])=>'<button type="button" data-food-kind="'+k+'" class="'+(foodKind===k?'active':'')+'" aria-pressed="'+(foodKind===k)+'">'+v+'</button>').join('');const filtered=VENUES.filter(f=>(state.foodCity==='全部'||state.foodCity===f.city)&&(foodKind==='all'||foodKind===f.type));const card=f=>{const e=meituanEntry(f),xhs=e.xiaohongshuSearchUrl||'https://www.xiaohongshu.com/search_result?keyword='+encodeURIComponent(f.city+' '+f.name)+'&source=web_search_result_notes';return '<article class="card food-card" id="'+f.id+'"><span class="food-visual" aria-hidden="true">'+(f.type==='restaurant'?'膳':'味')+'</span><div class="eyebrow">'+esc(f.city+' / '+f.area)+'</div><h3>'+esc(f.name)+'</h3><div class="dish-line">'+esc(f.dishes.join(' · '))+'</div><p>'+esc(f.tip)+'</p><span class="food-budget">¥'+f.budgetCnyPerPerson.join('–')+' / 人 · 规划预算</span><div class="food-address">'+esc(f.address)+'</div><div class="food-card-links">'+meituanLink(f)+mapLink(f.mapQuery,f.city,'高德找店 ↗')+'<a href="'+esc(xhs)+'" target="_blank" rel="noopener noreferrer">小红书搜店 ↗</a><button data-copy-text="'+esc(f.city+' '+f.name)+'" type="button">复制店名</button></div>'+(!e.meituanDetailUrl?'<p class="food-source-note">点击后打开美团 App，并尝试复制店名；粘贴搜索后请核对分店。</p>':'')+(f.xhsEvidence?'<details class="food-source-note"><summary>小红书已读笔记要点</summary>'+(e.xiaohongshuNoteUrl?'<a href="'+esc(e.xiaohongshuNoteUrl)+'" target="_blank" rel="noopener noreferrer">打开参考笔记 ↗</a>':'')+'<p>'+esc(f.xhsEvidence.text)+'</p><p>笔记直链已更新，仍可能需要登录；无法打开时，可用搜店或复制店名。</p></details>':'')+'</article>';};document.getElementById('food-grid').innerHTML=['restaurant','snack'].map(type=>{const foods=filtered.filter(f=>f.type===type);return foods.length?'<div class="food-section-head"><h3>'+(type==='restaurant'?'坐下来，好好吃一顿':'边逛边吃，留一点胃口')+'</h3><p>'+foods.length+' 家 · 按路线选一两家就好</p></div><div class="food-grid">'+foods.map(card).join('')+'</div>':'';}).join('');}
function mobilizeTables(){document.querySelectorAll('.table-wrap table').forEach(table=>{const headers=Array.from(table.querySelectorAll('thead th')).map(t=>t.textContent.trim());table.querySelectorAll('tbody tr').forEach(row=>Array.from(row.children).forEach((td,i)=>td.dataset.label=headers[i]||''));});}
const originalTickets=renderTickets;renderTickets=function(){originalTickets();mobilizeTables();};
document.addEventListener('click',e=>{const snack=e.target.closest('[data-snack]');if(snack){document.getElementById('snack-'+snack.dataset.snack)?.scrollIntoView({behavior:'smooth',block:'center'});}const z=e.target.closest('#atlas-zoom');if(z){const v=document.getElementById('atlas-view');v.classList.toggle('zoomed');z.setAttribute('aria-pressed',v.classList.contains('zoomed'));z.textContent=v.classList.contains('zoomed')?'全图 −':'放大地图 ＋';}const mt=e.target.closest('[data-mt-copy]');if(mt){navigator.clipboard.writeText(mt.dataset.mtCopy).then(()=>toast('已复制店名，进入美团粘贴搜索。')).catch(()=>{});}const copy=e.target.closest('[data-copy-text]');if(copy){const text=copy.dataset.copyText;navigator.clipboard.writeText(text).then(()=>toast('店名已复制，打开美团或小红书粘贴搜索。')).catch(()=>toast('请搜索：'+text));}if(e.target.closest('[data-spot]')&&matchMedia('(max-width:760px)').matches){document.getElementById('landmark-info')?.scrollIntoView({behavior:'smooth',block:'start'});}const walk=e.target.closest('[data-walk]');if(walk&&document.body.dataset.page!=='offline'){const r=selectedRoute();history.replaceState(null,'','?route='+r.id);}});
document.addEventListener('keydown',e=>{if(e.target.closest('[data-snack]')&&(e.key==='Enter'||e.key===' ')){e.preventDefault();e.target.closest('[data-snack]').dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
if(ATLAS_V3.length){const requested=new URLSearchParams(location.search).get('route');const found=ATLAS_V3.findIndex(r=>r.id===requested);activeWalk=found>=0?found:0;activeSpot=0;}
const baseOfflineDownload=downloadOffline;downloadOffline=function(){if(document.body.dataset.page==='guides'){location.href='../offline.html';return;}baseOfflineDownload();};

// A hand-drawn neighbourhood atlas: relative bearings, deliberately not to scale.
const WALK_DRAWINGS={
 'xz-oldtown':{caption:'彭城烟火 · 沿着老街向南',nodes:[[105,155,'house'],[335,185,'gate'],[325,405,'house'],[145,515,'gate']],snacks:[[400,445]],roads:[['中山南路','M55 45Q65 290 55 600',28,300,-90],['淮海路','M20 100Q230 110 455 90',195,88,0],['富国街','M65 165L235 165',125,197,0],['彭城路','M230 60Q225 300 230 590',207,340,-90],['建国东路','M20 300Q235 315 455 300',325,288,0],['解放南路','M435 80L435 600',455,350,-90]],legs:['M105 170L230 170L230 200L335 200','M335 200L435 200L435 315L325 315L325 420','M325 420L230 420L230 530L145 530'],greens:[[120,395,72,46],[365,525,58,65]],districts:[[90,250,'老城街巷'],[325,570,'户部山古民居']],trees:[[55,370],[75,500],[395,250],[380,560]]},
 'xz-culture':{caption:'寺院在城北，山水在城南',nodes:[[365,125,'pagoda'],[275,325,'museum'],[280,440,'gate'],[95,510,'pavilion']],snacks:[[155,565]],roads:[['和平路','M35 275Q225 285 450 265',250,264,0],['解放南路','M330 260Q350 420 355 610',375,450,-90],['湖东路','M195 350Q175 465 205 610',215,550,-90]],legs:['M365 140C420 225 280 200 275 340','M275 340Q260 390 280 455','M280 455Q230 450 195 510L95 525'],water:[['M0 370Q90 345 155 390Q190 450 155 530Q175 610 90 650H0Z','云龙湖',67,438,0]],greens:[[275,535,68,86],[100,195,100,75]],districts:[[145,230,'市区接驳'],[272,580,'云龙山']],trees:[[225,510],[305,570],[160,340],[90,300]],hills:true},
 'sz-west':{caption:'城西园林 · 一路到山塘灯火',nodes:[[385,115,'house'],[85,390,'pagoda'],[245,385,'pavilion'],[325,250,'bridge']],snacks:[[375,320],[245,165]],roads:[['东北街','M320 155L465 155',395,182,0],['西园路','M25 445Q150 450 270 435',95,472,0],['留园路','M70 425L285 425Q335 420 335 350',220,455,0],['广济路','M320 80Q350 260 350 565',380,425,-90],['山塘街','M175 90Q225 185 315 280',213,235,45]],legs:['M385 130C435 550 80 530 85 405','M85 405L85 425L245 425L245 400','M245 400L335 400L335 280L325 265'],water:[['M140 45Q165 130 215 190T310 280L328 264Q265 215 235 170T163 40Z','山塘河',165,145,45]],greens:[[90,350,65,88],[240,360,65,80]],districts:[[110,550,'姑苏城西'],[400,70,'东北街']],trees:[[35,330],[40,500],[285,485],[415,535]]},
 'sz-gardens':{caption:'园林与水巷 · 姑苏慢慢走',nodes:[[385,95,'house'],[225,100,'pavilion'],[85,205,'museum'],[185,290,'rock'],[275,445,'bridge'],[365,555,'gate'],[400,350,'pavilion']],snacks:[[350,470]],roads:[['东北街','M25 155L455 155',285,181,0],['园林路','M215 165L215 345',195,250,-90],['白塔东路','M25 335L455 335',100,360,0],['平江路','M285 365L285 625',305,400,-90],['中张家巷','M285 525L460 525',379,513,0],['干将东路','M25 615L460 615',130,603,0],['小新桥巷','M285 385L440 385',384,407,0]],legs:['M385 110L385 155L225 155L225 115','M225 115L225 155L85 155L85 220','M85 220L85 335L185 335L185 305','M185 305L185 335L285 335L285 460','M285 460L285 525L365 525L365 570','M365 570L285 570L285 385L400 385L400 365'],water:[['M250 340Q240 405 245 475L245 650H265V475Q260 405 268 340Z','平江河',233,505,-90]],greens:[[225,90,72,55],[400,345,55,60]],districts:[[85,460,'平江历史街区']],trees:[[40,400],[70,535],[420,455],[435,590]]},
 'sh-river':{caption:'从苏州河畔，到浦江两岸',nodes:[[75,140,'clock'],[180,220,'bridge'],[280,220,'bridge'],[285,355,'dome'],[125,450,'shop'],[410,365,'pearl']],snacks:[[170,490],[65,535]],roads:[['北苏州路','M15 175L295 175',105,167,0],['中山东一路','M285 245Q300 420 295 610',307,525,-90],['南京东路','M20 445L295 445',190,470,0],['四川中路','M220 265L220 610',205,570,-90],['世纪大道','M375 405L475 460',415,450,25]],legs:['M75 155L75 175L180 175L180 235','M180 235L180 175L280 175L280 235','M280 235L285 370','M285 370L295 445L125 465','M125 465C235 540 395 520 410 380'],water:[['M335 35Q320 175 340 300T385 480L455 650H480V35Z','黄浦江',365,570,60],['M0 200Q130 205 220 195L345 195V222L220 220Q120 230 0 220Z','苏州河',95,249,0]],greens:[[395,200,45,65]],districts:[[88,330,'浦西 · 外滩'],[420,95,'浦东 · 陆家嘴']],trees:[[35,380],[245,560],[445,300]],badges:[[260,505,'地铁 2 号线 · 过江']]},
 'sh-hengfu':{caption:'梧桐树下 · 街角与旧时光',nodes:[[105,535,'wukang'],[150,365,'house'],[285,165,'shop'],[380,285,'shop'],[255,425,'house']],snacks:[[65,580]],roads:[['武康路','M85 590Q145 390 190 170',112,435,-75],['安福路','M50 170Q270 190 460 145',345,145,0],['乌鲁木齐中路','M380 105L380 570',404,390,-90],['复兴西路','M100 465Q250 420 430 405',280,475,-9],['淮海中路','M20 610L460 555',340,580,-7]],legs:['M105 550Q130 460 150 380','M150 380Q165 250 190 180L285 180','M285 180L380 180L380 300','M380 300L380 410Q315 410 255 440'],greens:[[75,270,55,65],[280,310,65,65]],districts:[[265,565,'衡复风貌区']],trees:[[95,235],[100,330],[180,475],[315,240],[320,345],[425,480],[215,550]],noWater:true},
 'sh-depart':{caption:'石库门里 · 留一段返程前的闲逛',nodes:[[260,365,'shikumen'],[170,175,'shop']],snacks:[[105,225]],roads:[['南京西路','M20 280Q210 195 455 145',315,205,-17],['茂名北路','M155 245L155 560',134,435,-90],['石门一路','M365 180L365 560',389,430,-90],['威海路','M40 530Q235 530 455 520',245,554,0],['吴江路','M180 285L355 285',285,275,0]],legs:['M260 380L155 380L155 245L170 190'],greens:[[65,440,35,60],[420,365,34,70]],districts:[[265,470,'张园 · 石库门']],trees:[[65,340],[410,300],[310,570]],noWater:true},
 'sh-yuyuan':{caption:'老城厢 · 园林、曲桥与小笼',nodes:[[290,230,'pavilion']],snacks:[[105,450]],roads:[['福佑路','M20 120L455 120',120,102,0],['安仁街','M405 120L405 590',427,395,-90],['豫园老街','M45 535L405 535',155,562,0]],legs:[],water:[['M190 330Q240 295 295 340T330 440Q260 485 190 440Q165 400 190 330Z','荷花池',255,462,0]],greens:[[260,220,110,80]],districts:[[260,70,'豫园园林 · 入园另购票'],[85,340,'豫园商城'],[270,595,'老城厢']],trees:[[55,245],[365,280],[365,485]],gardenBridge:true},
 'sh-northbund':{caption:'桥边出发 · 北外滩看天际线',nodes:[[100,490,'bridge'],[355,270,'pavilion']],snacks:[[265,160]],roads:[['北苏州路','M15 455L155 455',80,440,0],['东长治路','M50 380Q210 285 420 150',190,300,-30],['旅顺路','M155 200Q190 315 215 425',170,360,-70]],legs:['M100 505L155 455Q225 420 280 350T355 285'],water:[['M480 285Q360 365 275 460T230 650H480Z','黄浦江',380,495,-45],['M0 490L160 490Q200 490 245 520L238 545Q195 520 150 515H0Z','苏州河',65,550,0]],greens:[[325,300,65,60]],districts:[[105,100,'虹口 · 北外滩'],[370,615,'对岸 · 陆家嘴']],trees:[[300,255],[245,375],[175,405]],skyline:true}
};
// Keep river banks and street relationships even when the drawing is compressed.
WALK_DRAWINGS['sh-river'].water[0][0]='M335 35Q320 175 340 300T385 480L455 650H480V605L432 470Q398 380 382 300T390 35Z';
WALK_DRAWINGS['sh-river'].water[0].splice(2,3,430,545,60);
WALK_DRAWINGS['sh-river'].nodes[5]=[430,365,'pearl'];
WALK_DRAWINGS['sh-river'].legs[4]='M125 465C235 540 410 520 430 380';
WALK_DRAWINGS['sh-river'].roads[4]=['世纪大道','M415 410L475 450',443,455,25];
WALK_DRAWINGS['sz-west'].water.push(['M0 510Q140 485 285 510L315 530Q140 510 0 535Z','上塘河',145,540,0]);
WALK_DRAWINGS['sz-west'].districts[0]=[110,592,'姑苏城西'];
WALK_DRAWINGS['sz-west'].roads.push(['桐泾北路','M28 240L28 590',48,575,-90]);
WALK_DRAWINGS['sz-gardens'].water.push(['M465 65L480 65V650H457Q468 420 465 65Z','外城河',449,495,-90]);
WALK_DRAWINGS['sh-yuyuan'].water[0][1]='九曲桥池水';
WALK_DRAWINGS['sh-yuyuan'].roads.push(['方浜中路','M20 590L455 590',150,614,0]);
WALK_DRAWINGS['sh-yuyuan'].districts[2]=[270,570,'老城厢'];
WALK_DRAWINGS['sh-northbund'].roads.push(['东大名路','M90 430Q240 355 435 210',285,315,-30],['滨江步道','M140 465Q230 430 300 350T420 275',320,397,-30]);
WALK_DRAWINGS['sh-northbund'].badges=[[130,590,'从外白渡桥北端出发']];
WALK_DRAWINGS['xz-oldtown'].roads.push(['河清路','M255 225L425 225',335,250,0]);
function atlasDimensions(){return {w:480,h:650};}
function sketchTree(x,y,s=1){return `<g transform="translate(${x} ${y}) scale(${s})" class="sketch-tree"><path d="M0 8V-23m0 10-10-9m10 4 10-13"/><path d="M-19-18Q-30-35-14-40Q-14-57 1-49Q20-57 23-36Q35-23 17-16Q1-8-19-18Z" fill="#a8b69b" fill-opacity=".7" stroke="#8c9e7b"/></g>`;}
function sketchBuilding(kind,x,y){let s='';const win=(cols,rows,left,top,step=10)=>Array.from({length:cols*rows},(_,i)=>`<rect x="${left+i%cols*step}" y="${top+Math.floor(i/cols)*11}" width="4" height="6" fill="#899784" stroke="none"/>`).join('');
 if(kind==='bridge')s='<path d="M-30 0Q0-32 30 0L30 8Q0-18-30 8Z" fill="#dfd9bc"/><path d="M-30-1Q0-36 30-1M-27-3V-12M-17-12V-20M-7-17V-26M7-17V-26M17-12V-20M27-3V-12" fill="none"/><path d="M-37 15q16-5 30 0t39 0" stroke="#97b3aa"/>';
 else if(kind==='pearl')s='<path d="M-24 8V-18h12V8M10 8V-25h10V8M26 8V-47h10V8" fill="#a9bcb2" stroke="#738f85"/><path d="M0-69V9M-10 9-3-30M10 9 3-30" stroke-width="2"/><circle cy="-40" r="12" fill="#c9917f"/><circle cy="-62" r="5" fill="#c9917f"/><path d="M-10-41H10M-8-36H8"/><path d="M-8 8H8" stroke-width="4"/>';
 else if(kind==='pagoda'){s='<path d="M-15 9V-48H15V9" fill="#e3ddc6"/>';for(let i=0;i<4;i++)s+=`<path d="M${-24+i*4} ${3-i*17}Q0 ${-6-i*17} ${24-i*4} ${3-i*17}L${17-i*3} ${-5-i*17}H${-17+i*3}Z" fill="#82927c"/>`;s+='<path d="M0-64V-70"/>';}
 else if(kind==='clock'||kind==='dome'||kind==='museum'){s='<path d="M-34 8V-30H34V8Z" fill="#e5dfc9"/>'+win(6,2,-27,-23,10);if(kind==='clock')s+='<path d="M-9-30V-53H9V-30M-12-53 0-66 12-53Z" fill="#aab49a"/><circle cy="-43" r="5" fill="#fbf8e9"/><path d="M0-47V-43L3-41"/>';if(kind==='dome')s+='<path d="M-18-30Q-18-57 0-57Q18-57 18-30Z" fill="#a6b19b"/><path d="M0-60V-66"/>';if(kind==='museum')s+='<path d="M-40-31 0-48 40-31Z" fill="#87957f"/><path d="M-28 8V-27M-14 8V-27M0 8V-27M14 8V-27M28 8V-27" stroke="#a5aa95" stroke-width="3"/>';}
 else if(kind==='rock')s='<path d="M-36 9-26-9-17-7-9-32 4-25 8-44 18-30 17-9 28-14 37 9Z" fill="#bcc2ad"/><path d="M-18 8-12-6-4-10 1 3M8-26l-4 12 10-4M20-5l8 4" fill="none"/>';
 else if(kind==='wukang'){s='<path d="M-34 8V-27L-7-45 33-29V8Z" fill="#cfb69a"/><path d="M-7-45V8M-35-26-7-44 35-28"/>'+win(3,3,0,-25,10)+'<path d="M-28 8V-1q5-8 10 0V8M0 8V-1q5-8 10 0V8M18 8V-1q5-8 10 0V8" fill="#f1ead5"/>';}
 else{s='<path d="M-30 8V-25H30V8Z" fill="#e9e3ce"/><path d="M-38-24Q-27-25-23-35H23Q27-25 38-24L30-20H-30Z" fill="#83917c"/>'+win(2,2,-21,-16,38)+'<path d="M-7 8V-12Q0-21 7-12V8" fill="#a8b39c"/>';if(kind==='gate'||kind==='shikumen')s+='<path d="M-14 8V-22H14V8M-16-22 0-33 16-22" fill="none" stroke-width="2"/>';if(kind==='pavilion')s+='<path d="M-13-35V-48H13V-35M-22-47 0-59 22-47Z" fill="#93a185"/>';if(kind==='shop')s+='<path d="M-30-8H30V-1H-30Z" fill="#bd8568" stroke="none"/>';}
 return `<g transform="translate(${x} ${y})" class="sketch-building"><ellipse cy="13" rx="38" ry="6" fill="#b4b59c" opacity=".2" stroke="none"/>${s}</g>`;}
function atlasSvg(r){const c=WALK_DRAWINGS[r.id];if(!c)return '';let svg=`<defs><pattern id="paper-dots-v4" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".6" fill="#98a487" opacity=".13"/></pattern><pattern id="water-ripples-v4" width="42" height="30" patternUnits="userSpaceOnUse"><path d="M6 16q8-3 16 0" fill="none" stroke="#a7beb3" stroke-width="1" opacity=".5"/></pattern></defs><rect width="480" height="650" fill="#f4f0e1"/><rect width="480" height="650" fill="url(#paper-dots-v4)"/><rect x="12" y="12" width="456" height="626" rx="8" fill="none" stroke="#d7d1b9"/><text class="sketch-caption" x="30" y="39">${esc(c.caption)}</text>`;
 for(const g of c.greens||[])svg+=`<ellipse cx="${g[0]}" cy="${g[1]}" rx="${g[2]}" ry="${g[3]}" fill="#dbe1c8" opacity=".65"/><ellipse cx="${g[0]+6}" cy="${g[1]-5}" rx="${g[2]*.8}" ry="${g[3]*.85}" fill="#d1dac0" opacity=".45"/>`;
 for(const w of c.water||[])svg+=`<path d="${w[0]}" fill="#bed4c8" stroke="#a6bfb0" stroke-width="1.1"/><path d="${w[0]}" fill="url(#water-ripples-v4)"/>`;
 // Secondary lanes and courtyard blocks are intentionally unnamed pictorial texture.
 if(c.noWater||r.id==='xz-oldtown')for(let i=0;i<12;i++){const x=35+(i%3)*138,y=90+Math.floor(i/3)*132;svg+=`<path d="M${x} ${y}l68 -3 6 37 -65 5Z" fill="#e7e3d1" opacity=".55" stroke="#d8d4bf" stroke-width=".7"/>`;}
 for(const d of c.roads)svg+=`<path class="sketch-road-edge" d="${d[1]}"/><path class="sketch-road" d="${d[1]}"/>`;
 for(const d of c.districts||[])svg+=`<text class="sketch-district" x="${d[0]}" y="${d[1]}" text-anchor="middle">${esc(d[2])}</text>`;
 if(r.id==='xz-culture')svg+='<rect x="305" y="62" width="135" height="120" rx="12" fill="none" stroke="#acb89d" stroke-dasharray="4 5"/><text class="sketch-road-label" x="310" y="203">东北郊 · 打车接驳</text>';
 if(c.hills)svg+='<path d="M210 570Q220 475 245 515Q266 430 290 490Q320 453 330 550" fill="none" stroke="#a4b597" stroke-width="1.2"/>';
 for(const t of c.trees||[])svg+=sketchTree(t[0],t[1],.7);
 if(c.gardenBridge)svg+='<path d="M185 420L220 400L205 380L250 365L275 380L300 365L330 390" fill="none" stroke="#f7f2dd" stroke-width="12"/><path d="M185 420L220 400L205 380L250 365L275 380L300 365L330 390" fill="none" stroke="#9b9f87" stroke-width="1"/>'+sketchBuilding('pavilion',255,385)+'<text class="sketch-road-label" x="215" y="432">九曲桥 · 湖心亭</text>';
 if(c.skyline)svg+='<g opacity=".55">'+sketchBuilding('pearl',390,570)+'</g>';
 c.legs.forEach((d,i)=>{const transit=!/步行/.test(r.legs[i]?.mode||'步行');svg+=`<path class="sketch-route-under" d="${d}"/><path class="sketch-route ${transit?'transit':''}" d="${d}"/>`;});
 for(const d of c.roads)svg+=`<text class="sketch-road-label" x="${d[2]}" y="${d[3]}" transform="rotate(${d[4]} ${d[2]} ${d[3]})" text-anchor="middle">${esc(d[0])}</text>`;
 for(const w of c.water||[])svg+=`<text class="sketch-water-label" x="${w[2]}" y="${w[3]}" transform="rotate(${w[4]} ${w[2]} ${w[3]})" text-anchor="middle">${esc(w[1])}</text>`;
 for(const b of c.badges||[])svg+=`<rect x="${b[0]-85}" y="${b[1]-15}" width="170" height="24" rx="12" fill="#eef0e3" stroke="#bbc9b6"/><text class="sketch-road-label" x="${b[0]}" y="${b[1]+1}" text-anchor="middle">${esc(b[2])}</text>`;
 r.nodes.forEach((n,i)=>{const p=c.nodes[i];if(!p)return;const name=n.name.replace('陆家嘴·东方明珠','陆家嘴 / 东方明珠'),width=Math.min(156,Math.max(80,name.length*14+24)),labelX=Math.max(15+width/2,Math.min(465-width/2,p[0]));svg+=`<g class="atlas-marker sketch-marker ${i===activeSpot?'selected':''}" data-spot="${i}" tabindex="0" role="button" aria-label="查看${esc(n.name)}"><rect x="${p[0]-Math.max(45,width/2)}" y="${p[1]-75}" width="${Math.max(90,width)}" height="112" fill="transparent"/>${sketchBuilding(p[2],p[0],p[1]-8)}<rect class="sketch-name-plate" x="${labelX-width/2}" y="${p[1]+16}" width="${width}" height="25" rx="4"/><text class="sketch-node-name" x="${labelX}" y="${p[1]+33}" text-anchor="middle">${esc(name)}</text><circle class="marker-dot" cx="${p[0]-34}" cy="${p[1]-43}" r="13"/><text class="marker-number" x="${p[0]-34}" y="${p[1]-39}" text-anchor="middle">${i+1}</text></g>`;});
 (r.snacks||[]).forEach((n,i)=>{const p=c.snacks[i];if(!p)return;svg+=`<g class="atlas-snack sketch-snack" data-snack="${i}" role="button" tabindex="0" aria-label="顺路小吃：${esc(n.name||n.venueName)}"><rect x="${p[0]-25}" y="${p[1]-24}" width="50" height="50" fill="transparent"/><path d="M${p[0]-19} ${p[1]+15}h38l-4 12h-30Z" fill="#cfac73" stroke="#9b774c"/><circle cx="${p[0]}" cy="${p[1]}" r="19"/><text x="${p[0]}" y="${p[1]+5}" text-anchor="middle">食${i+1}</text></g>`;});
 return svg+'<g transform="translate(445 68)" stroke="#7f9277" fill="none"><path d="M0 32V0M-6 11 0 0 6 11"/><text x="0" y="-8" fill="#657b5f" stroke="none" font-size="12" text-anchor="middle">北</text></g><text class="sketch-footnote" x="28" y="628">街区方位示意 · 非等比例 · 具体走法请打开高德</text>';}
const drawWalksBaseV4=renderWalks;
renderWalks=function(){drawWalksBaseV4();const board=document.getElementById('route-map-board');if(board){board.classList.add('pictorial-atlas');board.querySelector('svg')?.setAttribute('aria-label',selectedRoute().title+'街道与河流手绘示意图');board.querySelector('.atlas-legend').innerHTML='橙色虚线 · 步行　灰绿虚线 · 乘车<br>点建筑看景点，点「食」找小吃';}const note=document.querySelector('.map-foot');if(note)note.textContent='按主要街道、河流和景点相对方位绘制，局部为阅读舒展；路线与建筑均为示意，不按距离比例。交通时间参考见下方，实际道路与入口请用高德。';};

// Official application schemes; the system/browser decides whether an app may open.
function phonePlatformV4(){const ua=navigator.userAgent;return /iPhone|iPad|iPod/i.test(ua)||(/Macintosh/i.test(ua)&&navigator.maxTouchPoints>1)?'ios':'android';}
function resolveAppLinkV4(web,platform=phonePlatformV4()){
 let u;try{u=new URL(web,location.href);}catch{return null;}if(!/^https?:$/.test(u.protocol))return null;const h=u.hostname.toLowerCase();
 if(/(^|\.)amap\.com$/.test(h)){const keyword=u.searchParams.get('keyword')||u.searchParams.get('query')||u.searchParams.get('name');if(!keyword)return null;const city=u.searchParams.get('city')||'',query=city&&!keyword.includes(city)?city+' '+keyword:keyword;return {app:'高德地图',kind:'amap',query,web:(u.searchParams.set('callnative','0'),u.href),native:(platform==='ios'?'iosamap://poi?sourceApplication=xiaomiao-trip&name=':'androidamap://poi?sourceApplication=xiaomiao-trip&keywords=')+encodeURIComponent(query)+'&dev=0'};}
 if(/(^|\.)xiaohongshu\.com$/.test(h)){const note=u.pathname.match(/\/(?:explore|discovery\/item|search_result)\/([0-9a-f]{24})(?:\/|$)/i);const query=u.searchParams.get('keyword')||'徐州 苏州 上海 旅行美食';return {app:'小红书',kind:'xhs',query:note?'':query,web:u.href,native:note?'xhsdiscover://item/'+note[1]:'xhsdiscover://search/result?keyword='+encodeURIComponent(query)+'&target_search=notes'};}
 if(/(^|\.)meituan\.com$/.test(h))return {app:'美团',kind:'meituan',query:'',web:u.href,native:'imeituan://www.meituan.com/home'};
 return null;
}
function decorateAppLinksV4(root=document){const nodes=root.matches?.('a[href]')?[root]:root.querySelectorAll?.('a[href]')||[];for(const a of nodes){if(a.hasAttribute('data-app-fallback')||a.hasAttribute('data-native-retry'))continue;const info=resolveAppLinkV4(a.getAttribute('href'));if(!info)continue;a.dataset.appWeb=info.web;a.dataset.appNative=info.native;a.dataset.appKind=info.kind;a.dataset.appName=info.app;a.dataset.appQuery=a.dataset.mtCopy||info.query;a.href=info.native;a.removeAttribute('target');if(info.kind==='meituan'&&a.classList.contains('meituan'))a.textContent='美团 App 查店 ↗';if(info.kind==='xhs'&&a.textContent.includes('小红书搜店'))a.textContent='小红书 App 搜店 ↗';a.setAttribute('title','在'+info.app+' App 打开');}}
function initAppLinksV4(){decorateAppLinksV4();new MutationObserver(records=>{for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1)decorateAppLinksV4(n);}).observe(document.body,{childList:true,subtree:true});
 const sheet=document.createElement('dialog');sheet.className='app-launch-sheet';sheet.setAttribute('aria-label','打开手机应用');document.body.appendChild(sheet);let timer=null,active=null,returnFocus=null,clipboardOK=false;
 const close=()=>{if(timer)clearTimeout(timer);timer=null;if(sheet.open)sheet.close();returnFocus?.focus();};
 const show=()=>{if(!active||document.hidden)return;const inWechat=/MicroMessenger/i.test(navigator.userAgent);sheet.innerHTML='<button type="button" class="app-sheet-close" data-app-close aria-label="关闭打开应用提示">×</button><span class="eyebrow">带着攻略，去路上</span><h2>打开'+esc(active.app)+'</h2><p>'+(active.kind==='meituan'?(clipboardOK?'店名已复制。进入美团后，粘贴搜索并核对分店。':'进入美团后，按下方店名搜索并核对分店。'):'若手机还没有打开 App，可再试一次。')+'</p>'+(active.query?'<div class="app-copy-query">'+esc(active.query)+'</div>':'')+'<div class="app-launch-actions"><a href="'+esc(active.native)+'" data-native-retry>再次打开 '+esc(active.app)+' ↗</a>'+(active.query?'<button type="button" data-app-copy>复制'+(active.kind==='amap'?'地点':'店名')+'</button>':'')+'<a href="'+esc(active.web)+'" data-app-fallback target="_blank" rel="noopener noreferrer">使用网页版 ↗</a></div><p class="app-launch-help">'+(inWechat?'微信内可能拦截外部 App，请点右上角“…”选择在浏览器打开，再点击。':'请先安装对应 App，并在系统提示中选择“打开”。若浏览器拦截，可用手机自带浏览器打开本页。')+'</p><p class="app-copy-status" role="status"></p>';if(!sheet.open)sheet.showModal();};
 document.addEventListener('click',e=>{const a=e.target.closest('a[data-app-native]');if(!a)return;e.preventDefault();e.stopImmediatePropagation();close();returnFocus=a;active={app:a.dataset.appName,kind:a.dataset.appKind,native:a.dataset.appNative,web:a.dataset.appWeb,query:a.dataset.appQuery};clipboardOK=false;
 // Do not await clipboard permission: app launch must retain the user's click activation.
 if(active.kind==='meituan'&&active.query)navigator.clipboard?.writeText(active.query).then(()=>{clipboardOK=true;}).catch(()=>{});
 timer=setTimeout(show,1500);try{location.assign(active.native);}catch{show();}
 },true);
 sheet.addEventListener('click',e=>{if(e.target===sheet||e.target.closest('[data-app-close]')){close();return;}if(e.target.closest('[data-app-copy]')&&active?.query){const status=sheet.querySelector('.app-copy-status');if(!navigator.clipboard){status.textContent='请长按上方文字复制。';return;}navigator.clipboard.writeText(active.query).then(()=>{status.textContent='已复制，可到 App 粘贴搜索。';clipboardOK=true;}).catch(()=>{status.textContent='请长按上方文字复制。';});}if(e.target.closest('[data-native-retry]')){if(timer)clearTimeout(timer);timer=setTimeout(show,1500);}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(timer)clearTimeout(timer);timer=null;if(sheet.open)sheet.close();}});window.addEventListener('pagehide',()=>{if(timer)clearTimeout(timer);});
}

renderAll();mobilizeTables();initAppLinksV4();