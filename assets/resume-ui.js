const STORAGE_KEY = 'xz-resume-supplements-v1';
const BILINGUAL_FIELDS = ['researchPlan', 'teaching', 'projects', 'experience', 'skills'];
const copy = {
  zh: {
    intro: '为下一步，准备一份恰当的简历。', introText: '选择求职场景，直接下载中文或英文 PDF。内容随个人主页更新，论文仅收录已正式发表的工作。',
    scenarioLabel: '选择使用场景', faculty: '高校 · 数学学院', facultyTag: 'ACADEMIC CV', facultyText: '呈现研究方向、学术成果与研究交流，适合数学学院的学术岗位。',
    llm: '大模型 · 研究实习', llmTag: 'RESEARCH INTERNSHIP', llmText: '突出数学研究、论文成果与跨学科研究经历，面向算法研究实习。',
    facultyTitle: '研究脉络清楚，学术成果完整。', llmTitle: '以数学研究为基础，迈向算法研究。',
    facultyLead: '以教育背景、研究方向和已发表论文为核心，补充学术交流与荣誉。研究计划、教学经历可在下方按需添加。',
    llmLead: '围绕研究训练与已有成果组织内容，突出可核实的跨学科研究经历。后续可补充大模型项目与实习成果。',
    facultyModules: ['教育背景', '研究方向', '学术交流', '已发表论文', '荣誉奖励'],
    llmModules: ['研究简介', '教育背景', '相关研究', '已发表论文', '荣誉与技能'],
    gap: '当前版本以已有数学研究和跨学科论文为基础；添加项目或实习信息后，对应模块会自动纳入。',
    contents: '内容结构', papers: '篇已发表论文', syncing: '正在读取主页数据', fresh: '每次生成均重新读取最新主页资料', update: '资料更新',
    language: '预览语言', chinese: '中文', english: 'English', downloadZh: '下载中文 PDF', downloadEn: 'Download English PDF',
    preview: '预览排版', closePreview: '收起预览', previewTitle: '简历 PDF 预览', privacy: '补充信息仅保存在当前浏览器，不会发布到个人主页。',
    editor: '补充求职信息', editorHint: '选填 · 本机保存', editorLead: '以下内容只用于生成简历。中英文分别填写；留空的模块会自动省略。',
    common: '基本信息', expectedGraduation: '预计毕业年月', phone: '联系电话', phonePlaceholder: '选填',
    researchPlan: '研究计划', teaching: '教学经历', projects: '研究项目', experience: '实习 / 工作经历', skills: '补充技能',
    researchPlanHint: '可填写计划研究的问题、方法与未来方向。', teachingHint: '可填写课程、助教职责与教学成果。',
    projectsHint: '可填写项目目标、你的职责、方法与可核实的结果。', experienceHint: '可填写单位、时间、职责与成果。', skillsHint: '简要列出实际掌握的技能即可。',
    fieldZh: '中文内容', fieldEn: 'English content', saved: '已保存到当前浏览器', saveUnavailable: '当前浏览器未允许保存；本次仍可生成简历。',
    backup: '备份补充资料', restore: '导入备份', clear: '清空补充内容', clearConfirm: '确认清空', clearDone: '已清空补充内容，恢复主页资料。',
    backupDone: '补充资料备份已下载。', importDone: '补充资料已导入并保存。', importError: '无法读取备份，请选择此模块导出的 JSON 文件。',
    loading: '正在读取最新主页资料…', generating: '正在排版 PDF；首次生成中文版本可能需要稍候…', ready: '资料已就绪，选择场景即可下载。',
    done: 'PDF 已生成并开始下载', pages: '页', previewDone: '预览已生成。下载时会再次读取最新主页资料。',
    loadError: '主页资料暂时无法读取，请检查网络连接后重试。', generationError: 'PDF 暂时无法生成，请稍后重试。', retry: '重新读取',
    publicationOnly: '仅含已发表论文', appendix: '完整论文列表随 PDF 一并生成', note: '场景只改变内容重点；所有经历均来自主页或你填写的补充资料。'
  },
  en: {
    intro: 'A considered CV for your next step.', introText: 'Choose a destination and download a Chinese or English PDF. Each CV uses the current homepage and includes published papers only.',
    scenarioLabel: 'Choose a destination', faculty: 'Faculty · Mathematics', facultyTag: 'ACADEMIC CV', facultyText: 'Research interests, publications and academic exchange, arranged for mathematics department applications.',
    llm: 'LLM · Research internship', llmTag: 'RESEARCH INTERNSHIP', llmText: 'Mathematical research, published work and interdisciplinary experience, arranged for research internships.',
    facultyTitle: 'A clear research profile. A complete academic record.', llmTitle: 'From mathematical research to algorithm research.',
    facultyLead: 'Education, research interests and published work form the core, alongside research visits and honors. Add a research plan or teaching experience below when relevant.',
    llmLead: 'Organized around research training and verified work, with relevant interdisciplinary research. Add future LLM projects and internship achievements below.',
    facultyModules: ['Education', 'Research interests', 'Research visits', 'Published papers', 'Honors'],
    llmModules: ['Research profile', 'Education', 'Relevant research', 'Published papers', 'Honors & skills'],
    gap: 'This version draws on existing mathematical research and interdisciplinary publications. Projects and internships will appear when you add them.',
    contents: 'Inside the CV', papers: 'published papers', syncing: 'Reading homepage data', fresh: 'Latest homepage data fetched for every PDF', update: 'Profile updated',
    language: 'Preview language', chinese: '中文', english: 'English', downloadZh: '下载中文 PDF', downloadEn: 'Download English PDF',
    preview: 'Preview layout', closePreview: 'Close preview', previewTitle: 'CV PDF preview', privacy: 'Supplemental information stays in this browser and is never published to the homepage.',
    editor: 'Add application details', editorHint: 'Optional · saved locally', editorLead: 'These details are used only in your CV. Fill in each language separately; empty sections are omitted.',
    common: 'Basic information', expectedGraduation: 'Expected graduation', phone: 'Phone number', phonePlaceholder: 'Optional',
    researchPlan: 'Research plan', teaching: 'Teaching experience', projects: 'Research projects', experience: 'Internships / work', skills: 'Additional skills',
    researchPlanHint: 'Questions, methods and future research directions.', teachingHint: 'Courses, teaching responsibilities and outcomes.',
    projectsHint: 'Project goal, your role, methods and verifiable results.', experienceHint: 'Organization, dates, responsibilities and outcomes.', skillsHint: 'A brief list of skills you actually use.',
    fieldZh: '中文内容', fieldEn: 'English content', saved: 'Saved in this browser', saveUnavailable: 'This browser could not save your details. You can still generate a CV in this session.',
    backup: 'Back up details', restore: 'Import backup', clear: 'Clear added details', clearConfirm: 'Confirm clear', clearDone: 'Added details cleared. Homepage information will be used.',
    backupDone: 'Your supplemental details backup has been downloaded.', importDone: 'Supplemental details imported and saved.', importError: 'The backup could not be read. Choose a JSON backup exported by this module.',
    loading: 'Reading the latest homepage information…', generating: 'Typesetting your PDF. The first Chinese PDF may take a little longer…', ready: 'Information ready. Choose a destination to download your CV.',
    done: 'PDF generated and download started', pages: 'pages', previewDone: 'Preview ready. Downloads will fetch the latest homepage information again.',
    loadError: 'Homepage information could not be read. Check your connection and try again.', generationError: 'The PDF could not be generated. Please try again.', retry: 'Reload information',
    publicationOnly: 'Published papers only', appendix: 'The PDF includes the full publication list', note: 'The destination changes the emphasis. All experience comes from the homepage or your own supplemental details.'
  }
};

const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const emptySupplements = () => ({expectedGraduation:'',phone:'',...Object.fromEntries(BILINGUAL_FIELDS.map(field => [field,{zh:'',en:''}]))});
const downloadIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 15v5h14v-5"/></svg>';
const checkIcon = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m5 10 3.2 3.2L15 6.5"/></svg>';

function sanitizeSupplements(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid supplements');
  const result = emptySupplements();
  if (value.expectedGraduation !== undefined) {
    if (typeof value.expectedGraduation !== 'string' || (value.expectedGraduation && !/^\d{4}-(0[1-9]|1[0-2])$/.test(value.expectedGraduation))) throw new Error('Invalid date');
    result.expectedGraduation = value.expectedGraduation;
  }
  if (typeof value.phone === 'string') result.phone = value.phone.slice(0,80);
  for (const field of BILINGUAL_FIELDS) {
    if (value[field] === undefined) continue;
    if (!value[field] || typeof value[field] !== 'object' || Array.isArray(value[field])) throw new Error('Invalid field');
    for (const language of ['zh','en']) {
      if (value[field][language] !== undefined && typeof value[field][language] !== 'string') throw new Error('Invalid text');
      result[field][language] = (value[field][language] || '').slice(0,6000);
    }
  }
  return result;
}

export function initResumeBuilder({loadSnapshot, generatePdf}) {
  const root = document.getElementById('resume-builder-root');
  if (!root) return null;
  if (typeof loadSnapshot !== 'function' || typeof generatePdf !== 'function') throw new TypeError('Resume builder requires a data loader and PDF generator.');
  let uiLanguage = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
  const state = {scenario:'faculty',pdfLanguage:uiLanguage,snapshot:null,busy:false,supplements:emptySupplements(),editorOpen:false,previewUrl:null,clearPending:false,saveUnavailable:false};
  let statusKey = 'loading';
  let statusKind = 'neutral';
  let statusExtra = '';
  let saveTimer;
  let clearTimer;
  let destroyed = false;
  const downloadUrls = new Set();
  const t = () => copy[uiLanguage];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.version === 1) state.supplements = sanitizeSupplements(parsed.supplements);
    }
  } catch { state.saveUnavailable = true; }

  function status(key, kind = 'neutral', extra = '') {
    statusKey = key; statusKind = kind; statusExtra = extra;
    const element = root.querySelector('[data-resume-status]');
    if (!element) return;
    element.textContent = `${t()[key] || key}${extra ? ` · ${extra}` : ''}`;
    element.dataset.kind = kind;
    element.setAttribute('role',kind === 'error' ? 'alert' : 'status');
  }

  function published() { return (state.snapshot?.publications || []).filter(paper => paper.status === 'published'); }

  function updateDataNote() {
    const count = root.querySelector('[data-resume-count]');
    if (count) count.textContent = state.snapshot ? `${published().length} ${t().papers}` : t().syncing;
    const graduation = root.querySelector('[data-resume-field="expectedGraduation"]');
    if (graduation && !state.supplements.expectedGraduation && document.activeElement !== graduation) graduation.value = state.snapshot?.profile.expectedGraduation || '';
    const updated = root.querySelector('[data-resume-updated]');
    if (!updated) return;
    const raw = state.snapshot?.updatedAt;
    const date = raw ? new Date(raw) : null;
    updated.textContent = date && !Number.isNaN(date.valueOf()) ? `${t().update} · ${date.toLocaleDateString(uiLanguage === 'zh' ? 'zh-CN' : 'en-GB',{year:'numeric',month:'short',day:'numeric'})}` : t().fresh;
  }

  function fieldMarkup(field) {
    return `<fieldset class="resume-fieldset"><legend>${escapeHTML(t()[field])}</legend><p class="resume-field-hint">${escapeHTML(t()[`${field}Hint`])}</p><div class="resume-bilingual-fields">${['zh','en'].map(language => `<label class="resume-field"><span>${escapeHTML(t()[language === 'zh' ? 'fieldZh' : 'fieldEn'])}</span><textarea lang="${language === 'zh' ? 'zh-CN' : 'en'}" rows="${field === 'skills' ? 2 : 4}" maxlength="6000" data-resume-field="${field}" data-resume-field-language="${language}">${escapeHTML(state.supplements[field][language])}</textarea></label>`).join('')}</div></fieldset>`;
  }

  function render() {
    if (destroyed) return;
    const strings = t();
    const scenarioFields = state.scenario === 'faculty' ? ['researchPlan','teaching'] : ['projects','experience'];
    root.innerHTML = `<div class="resume-intro"><h3>${strings.intro}</h3><p>${strings.introText}</p></div>
      <div class="resume-scenarios" role="group" aria-label="${strings.scenarioLabel}">${['faculty','llm'].map((scenario,index) => `<button type="button" class="resume-scenario${state.scenario === scenario ? ' is-selected' : ''}" data-resume-scenario="${scenario}" aria-pressed="${state.scenario === scenario}"><span class="resume-scenario-top"><span class="resume-kicker">${strings[`${scenario}Tag`]}</span><span class="resume-scenario-check">${state.scenario === scenario ? checkIcon : `<span>0${index + 1}</span>`}</span></span><strong>${strings[scenario]}</strong><span class="resume-scenario-description">${strings[`${scenario}Text`]}</span></button>`).join('')}</div>
      <div class="resume-template"><div class="resume-template-heading"><span class="resume-kicker">${strings.contents}</span><span class="resume-published-tag">${checkIcon}<span data-resume-count>${strings.syncing}</span></span></div><h4>${strings[`${state.scenario}Title`]}</h4><p class="resume-template-lead">${strings[`${state.scenario}Lead`]}</p><ol class="resume-module-list">${strings[`${state.scenario}Modules`].map((module,index) => `<li><span>0${index + 1}</span>${module}</li>`).join('')}</ol>${state.scenario === 'llm' ? `<p class="resume-gap-note">${strings.gap}</p>` : ''}<div class="resume-template-foot"><span>${strings.publicationOnly}</span><span>${strings.appendix}</span></div></div>
      <div class="resume-actions"><div class="resume-downloads"><button type="button" class="resume-download resume-download-primary" data-resume-download="zh">${downloadIcon}<span>${strings.downloadZh}</span></button><button type="button" class="resume-download resume-download-secondary" data-resume-download="en">${downloadIcon}<span>${strings.downloadEn}</span></button></div><div class="resume-preview-controls"><span class="resume-language-label" id="resume-preview-language-label">${strings.language}</span><div class="resume-language-group" role="group" aria-labelledby="resume-preview-language-label">${['zh','en'].map(language => `<button type="button" class="resume-language${state.pdfLanguage === language ? ' is-selected' : ''}" data-resume-language="${language}" aria-pressed="${state.pdfLanguage === language}">${strings[language === 'zh' ? 'chinese' : 'english']}</button>`).join('')}</div><button type="button" class="resume-preview-button" data-resume-preview>${strings.preview}<span aria-hidden="true"> ↗</span></button></div><p class="resume-data-note" data-resume-updated>${strings.fresh}</p><div class="resume-status-row"><p class="resume-status" data-resume-status role="status" aria-live="polite"></p><button type="button" class="resume-text-button resume-retry" data-resume-retry hidden>${strings.retry}</button></div></div>
      <div class="resume-preview-panel" data-resume-preview-panel hidden><div class="resume-preview-panel-head"><span>${strings.previewTitle}</span><button type="button" class="resume-text-button" data-resume-close-preview>${strings.closePreview} <span aria-hidden="true">×</span></button></div><iframe class="resume-preview-frame" title="${strings.previewTitle}" data-resume-preview-frame></iframe></div>
      <details class="resume-editor"${state.editorOpen ? ' open' : ''}><summary><span>${strings.editor}</span><span class="resume-editor-hint">${strings.editorHint}</span><span class="resume-summary-plus" aria-hidden="true">+</span></summary><div class="resume-editor-body"><p class="resume-editor-lead">${strings.editorLead}</p><fieldset class="resume-fieldset"><legend>${strings.common}</legend><div class="resume-common-fields"><label class="resume-field"><span>${strings.expectedGraduation}</span><input type="month" data-resume-field="expectedGraduation" value="${escapeHTML(state.supplements.expectedGraduation)}"></label><label class="resume-field"><span>${strings.phone}</span><input type="tel" autocomplete="tel" maxlength="80" data-resume-field="phone" placeholder="${strings.phonePlaceholder}" value="${escapeHTML(state.supplements.phone)}"></label></div></fieldset>${scenarioFields.map(fieldMarkup).join('')}${fieldMarkup('skills')}<p class="resume-save-status" role="status" aria-live="polite" data-resume-save>${strings[state.saveUnavailable ? 'saveUnavailable' : 'saved']}</p><div class="resume-backup-actions"><button type="button" class="resume-text-button" data-resume-backup>${strings.backup}</button><button type="button" class="resume-text-button" data-resume-restore>${strings.restore}</button><input type="file" class="resume-file-input" accept=".json,application/json" data-resume-file tabindex="-1" aria-label="${strings.restore}"><button type="button" class="resume-text-button resume-clear" data-resume-clear>${strings[state.clearPending ? 'clearConfirm' : 'clear']}</button></div></div></details>
      <p class="resume-privacy"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="4" y="8" width="12" height="9" rx="1.5"/><path d="M6.5 8V5a3.5 3.5 0 0 1 7 0v3m-3.5 4v2"/></svg><span>${strings.privacy}</span></p><p class="resume-provenance">${strings.note}</p>`;
    updateDataNote();
    status(statusKey,statusKind,statusExtra);
    root.querySelector('[data-resume-retry]').hidden = statusKind !== 'error';
    if (state.previewUrl) showPreview(state.previewUrl);
    setBusy(state.busy);
  }

  function setBusy(busy) {
    state.busy = busy;
    root.setAttribute('aria-busy',String(busy));
    root.querySelectorAll('[data-resume-download], [data-resume-preview], [data-resume-language], [data-resume-retry], [data-resume-scenario], [data-resume-restore], [data-resume-clear]').forEach(button => {button.disabled = busy;});
    root.querySelectorAll('[data-resume-download]').forEach(button => button.classList.toggle('is-loading',busy));
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,updatedAt:new Date().toISOString(),supplements:state.supplements}));
      state.saveUnavailable = false;
    } catch { state.saveUnavailable = true; }
    const element = root.querySelector('[data-resume-save]');
    if (element) element.textContent = t()[state.saveUnavailable ? 'saveUnavailable' : 'saved'];
  }

  function downloadBlob(blob,filename) {
    const url = URL.createObjectURL(blob);
    downloadUrls.add(url);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = filename; anchor.hidden = true;
    document.body.append(anchor); anchor.click(); anchor.remove();
    setTimeout(() => { URL.revokeObjectURL(url); downloadUrls.delete(url); },60000);
  }

  function showPreview(url) {
    const panel = root.querySelector('[data-resume-preview-panel]');
    panel.hidden = false;
    root.querySelector('[data-resume-preview-frame]').src = url;
  }

  function clearPreview() {
    root.querySelector('[data-resume-preview-panel]').hidden = true;
    root.querySelector('[data-resume-preview-frame]').removeAttribute('src');
    if (state.previewUrl) URL.revokeObjectURL(state.previewUrl);
    state.previewUrl = null;
  }

  async function refresh() {
    try {
      const snapshot = await loadSnapshot();
      if (!snapshot?.profile || !Array.isArray(snapshot.publications)) throw new Error('Invalid profile snapshot');
      if (destroyed) return null;
      state.snapshot = snapshot;
      updateDataNote();
      return snapshot;
    } catch (error) {
      if (!destroyed) { status('loadError','error'); root.querySelector('[data-resume-retry]').hidden = false; }
      throw error;
    }
  }

  async function runPdf(language,preview = false) {
    if (state.busy || destroyed) return;
    const supplements = JSON.parse(JSON.stringify(state.supplements));
    const scenario = state.scenario;
    setBusy(true);
    root.querySelector('[data-resume-retry]').hidden = true;
    status('loading');
    try {
      const snapshot = await refresh();
      if (destroyed || !snapshot) return;
      status('generating');
      const result = await generatePdf({profile:snapshot.profile,publications:snapshot.publications.filter(paper => paper.status === 'published'),scenario,language,supplements});
      if (destroyed) return;
      if (!result?.bytes || !result.filename) throw new Error('Invalid PDF');
      const blob = new Blob([result.bytes],{type:'application/pdf'});
      if (preview) {
        if (state.previewUrl) URL.revokeObjectURL(state.previewUrl);
        state.previewUrl = URL.createObjectURL(blob);
        showPreview(state.previewUrl);
        status('previewDone','success');
      } else {
        downloadBlob(blob,result.filename);
        status('done','success',`${language === 'zh' ? t().chinese : t().english}${result.pageCount ? ` · ${result.pageCount} ${t().pages}` : ''}`);
      }
    } catch (error) {
      if (!destroyed && statusKey !== 'loadError') status('generationError','error');
      if (!destroyed) root.querySelector('[data-resume-retry]').hidden = false;
      console.error('CV generation failed:',error);
    } finally { if (!destroyed) setBusy(false); }
  }

  function onClick(event) {
    const button = event.target.closest('button');
    if (!button || !root.contains(button) || button.disabled) return;
    if (button.dataset.resumeScenario) {
      state.editorOpen = root.querySelector('.resume-editor').open;
      if (state.scenario !== button.dataset.resumeScenario) clearPreview();
      state.scenario = button.dataset.resumeScenario;
      render();
      root.querySelector(`[data-resume-scenario="${state.scenario}"]`).focus({preventScroll:true});
    } else if (button.dataset.resumeLanguage) {
      if (state.pdfLanguage !== button.dataset.resumeLanguage) clearPreview();
      state.pdfLanguage = button.dataset.resumeLanguage;
      root.querySelectorAll('[data-resume-language]').forEach(element => {
        const selected = element.dataset.resumeLanguage === state.pdfLanguage;
        element.classList.toggle('is-selected',selected); element.setAttribute('aria-pressed',String(selected));
      });
    } else if (button.dataset.resumeDownload) { runPdf(button.dataset.resumeDownload); }
    else if (button.hasAttribute('data-resume-preview')) { runPdf(state.pdfLanguage,true); }
    else if (button.hasAttribute('data-resume-close-preview')) {
      clearPreview();
    } else if (button.hasAttribute('data-resume-retry')) {
      setBusy(true); status('loading');
      refresh().then(() => {status('ready');root.querySelector('[data-resume-retry]').hidden = true;}).catch(() => {}).finally(() => setBusy(false));
    } else if (button.hasAttribute('data-resume-backup')) {
      const backup = {version:1,updatedAt:new Date().toISOString(),supplements:state.supplements};
      downloadBlob(new Blob([JSON.stringify(backup,null,2)],{type:'application/json'}),'xiamiao-zhao-cv-details.json');
      status('backupDone','success');
    } else if (button.hasAttribute('data-resume-restore')) root.querySelector('[data-resume-file]').click();
    else if (button.hasAttribute('data-resume-clear')) {
      if (!state.clearPending) {
        state.clearPending = true; button.textContent = t().clearConfirm;
        clearTimer = setTimeout(() => {state.clearPending = false;const clearButton = root.querySelector('[data-resume-clear]');if (clearButton) clearButton.textContent = t().clear;},5000);
      } else {
        clearTimeout(clearTimer); state.clearPending = false; state.supplements = emptySupplements(); state.editorOpen = true; save(); render(); status('clearDone','success');
      }
    }
  }

  function onInput(event) {
    const element = event.target;
    const field = element.dataset.resumeField;
    if (!field) return;
    if (BILINGUAL_FIELDS.includes(field)) state.supplements[field][element.dataset.resumeFieldLanguage] = element.value;
    else if (field === 'expectedGraduation' || field === 'phone') state.supplements[field] = element.value;
    clearTimeout(saveTimer); saveTimer = setTimeout(save,250);
  }

  async function onChange(event) {
    if (!event.target.hasAttribute('data-resume-file')) return;
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      if (file.size > 150000) throw new Error('Backup too large');
      const backup = JSON.parse(await file.text());
      if (backup.version !== 1) throw new Error('Unsupported backup');
      state.supplements = sanitizeSupplements(backup.supplements);
      state.editorOpen = true; save(); render(); status('importDone','success');
    } catch { status('importError','error'); }
    event.target.value = '';
  }

  function onLanguageChange(event) {
    const value = typeof event.detail === 'string' ? event.detail : event.detail?.language;
    uiLanguage = value?.startsWith('zh') || (!value && document.documentElement.lang.startsWith('zh')) ? 'zh' : 'en';
    state.editorOpen = root.querySelector('.resume-editor')?.open || false;
    render();
  }
  root.addEventListener('click',onClick);
  root.addEventListener('input',onInput);
  root.addEventListener('change',onChange);
  document.addEventListener('xz:languagechange',onLanguageChange);
  render();
  refresh().then(() => {if (!destroyed) status('ready');}).catch(() => {});
  return {
    refresh,
    destroy() {
      destroyed = true; clearTimeout(saveTimer); clearTimeout(clearTimer);
      root.removeEventListener('click',onClick); root.removeEventListener('input',onInput); root.removeEventListener('change',onChange); document.removeEventListener('xz:languagechange',onLanguageChange);
      if (state.previewUrl) URL.revokeObjectURL(state.previewUrl);
      downloadUrls.forEach(url => URL.revokeObjectURL(url));
    }
  };
}
