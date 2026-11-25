/*
 * Browser PDF renderer. Content is supplied at export time; the public profile
 * and publication JSON remain the source of truth. No preprints enter this CV.
 * Dependencies are loaded from the same site only, on the first export.
 */

const FONT_URL = new URL('./fonts/NotoSansSC-Regular.ttf', import.meta.url);
const LATIN_FONT_URL = new URL('./fonts/NotoSans-Regular.ttf', import.meta.url);
const PDF_LIB_URL = new URL('./vendor/pdf-lib.min.js', import.meta.url);
const FONTKIT_URL = new URL('./vendor/fontkit.umd.min.js', import.meta.url);
let fontRequest;
let latinFontRequest;
const scriptRequests = new Map();

const copy = {
  zh: {
    faculty: '高校数学系 · 学术简历',
    llm: '大模型算法研究 · 科研实习简历',
    education: '教育背景',
    summary: '研究概况',
    research: '研究方向',
    visits: '学术交流',
    contributions: '研究经历',
    honors: '荣誉奖励',
    skills: '技能',
    researchPlan: '研究计划',
    teaching: '教学经历',
    projects: '项目经历',
    experience: '实习与工作经历',
    publications: '已发表论文',
    expectedGraduation: '预计毕业',
    generated: '生成于',
    page: '页',
    journal: '期刊原文',
    scholar: 'Google Scholar',
    website: '个人主页',
  },
  en: {
    faculty: 'ACADEMIC CV · MATHEMATICS',
    llm: 'RESEARCH INTERNSHIP · LLM ALGORITHMS',
    education: 'EDUCATION',
    summary: 'RESEARCH PROFILE',
    research: 'RESEARCH INTERESTS',
    visits: 'RESEARCH VISITS',
    contributions: 'RESEARCH EXPERIENCE',
    honors: 'HONORS & AWARDS',
    skills: 'SKILLS',
    researchPlan: 'RESEARCH PLAN',
    teaching: 'TEACHING EXPERIENCE',
    projects: 'PROJECTS',
    experience: 'PROFESSIONAL EXPERIENCE',
    publications: 'PUBLISHED PAPERS',
    expectedGraduation: 'Expected graduation',
    generated: 'Generated',
    page: 'Page',
    journal: 'Journal article',
    scholar: 'Google Scholar',
    website: 'Homepage',
  },
};

function plain(value) {
  return String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').replace(/\r\n?/g, '\n').trim();
}

function local(value, language, fallback = true) {
  if (value == null) return '';
  if (typeof value === 'object' && !Array.isArray(value)) {
    return plain(value[language] || (fallback ? value.en || value.zh : ''));
  }
  return plain(value);
}

function values(value) {
  return Array.isArray(value) ? value : value == null ? [] : [value];
}

function safeUrl(value) {
  try {
    const url = new URL(plain(value));
    return ['https:', 'http:', 'mailto:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function loadScript(url, globalName) {
  if (globalThis[globalName]) return Promise.resolve(globalThis[globalName]);
  if (!scriptRequests.has(url.href)) {
    scriptRequests.set(url.href, new Promise((resolve, reject) => {
      if (typeof document === 'undefined') {
        reject(new Error(`Missing PDF dependency: ${globalName}`));
        return;
      }
      const element = document.createElement('script');
      element.src = url.href;
      element.async = true;
      element.onload = () => globalThis[globalName] ? resolve(globalThis[globalName]) : reject(new Error(`Unable to initialize ${globalName}`));
      element.onerror = () => reject(new Error(`Unable to load ${globalName}`));
      document.head.append(element);
    }).catch(error => {
      scriptRequests.delete(url.href);
      throw error;
    }));
  }
  return scriptRequests.get(url.href);
}

async function loadDependencies(injected = {}) {
  const [PDFLib, fontkit] = await Promise.all([
    injected.PDFLib || loadScript(PDF_LIB_URL, 'PDFLib'),
    injected.fontkit || loadScript(FONTKIT_URL, 'fontkit'),
  ]);
  if (!injected.fontBytes && !fontRequest) {
    fontRequest = fetch(FONT_URL).then(response => {
      if (!response.ok) throw new Error(`Unable to load the résumé font (${response.status})`);
      return response.arrayBuffer();
    }).catch(error => { fontRequest = undefined; throw error; });
  }
  if (!injected.latinFontBytes && !latinFontRequest) {
    latinFontRequest = fetch(LATIN_FONT_URL).then(response => {
      if (!response.ok) throw new Error(`Unable to load the résumé Latin font (${response.status})`);
      return response.arrayBuffer();
    }).catch(error => { latinFontRequest = undefined; throw error; });
  }
  const [fontBytes, latinFontBytes] = await Promise.all([injected.fontBytes || fontRequest, injected.latinFontBytes || latinFontRequest]);
  return { PDFLib, fontkit, fontBytes, latinFontBytes };
}

export function publishedPapersOnly(publications = []) {
  const seen = new Set();
  return publications.filter(paper => {
    if (paper?.status !== 'published' || !plain(paper.title)) return false;
    const doi = plain(paper.doi || (plain(paper.journal).includes('doi.org/') ? plain(paper.journal).split('doi.org/')[1] : '')).replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '').toLowerCase();
    const keys = [doi && `doi:${doi}`, paper.arxiv && `arxiv:${plain(paper.arxiv).replace(/v\d+$/, '')}`, paper.id && `id:${plain(paper.id)}`, `title:${plain(paper.title).toLowerCase().replace(/\s+/g, ' ')}`].filter(Boolean);
    if (keys.some(key => seen.has(key))) return false;
    keys.forEach(key => seen.add(key));
    return true;
  });
}

/**
 * @param {object} options
 * @param {object} options.profile Bilingual public profile, fetched at export time.
 * @param {Array} options.publications Latest website publication records.
 * @param {'faculty'|'llm'} options.scenario
 * @param {'zh'|'en'} options.language
 * @param {object} [options.supplements] Private, browser-local optional fields.
 * @param {object} [options.dependencies] PDFLib/fontkit/fontBytes/latinFontBytes injection for QA.
 * @returns {Promise<{bytes: Uint8Array, filename: string, pageCount: number}>}
 */
export async function generateResumePdf({ profile = {}, publications = [], scenario = 'faculty', language = 'zh', supplements = {}, generatedAt, dependencies } = {}) {
  if (!['faculty', 'llm'].includes(scenario)) throw new Error('Unknown résumé scenario');
  if (!['zh', 'en'].includes(language)) throw new Error('Unknown résumé language');
  const { PDFLib, fontkit, fontBytes, latinFontBytes } = await loadDependencies(dependencies);
  const { PDFDocument, StandardFonts, rgb, PDFString } = PDFLib;
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const [cjk, extended, regular, bold, italic, display] = await Promise.all([
    doc.embedFont(fontBytes, { subset: dependencies?.fontSubset !== false, features: { locl: false, liga: false } }),
    doc.embedFont(latinFontBytes, { subset: true }),
    doc.embedFont(StandardFonts.Helvetica),
    doc.embedFont(StandardFonts.HelveticaBold),
    doc.embedFont(StandardFonts.HelveticaOblique),
    doc.embedFont(StandardFonts.TimesRomanBold),
  ]);
  const fonts = { cjk, extended, regular, bold, italic, display };
  const supported = new Map(Object.values(fonts).map(font => [font, new Set(font.getCharacterSet())]));
  const palette = {
    navy: rgb(0.085, 0.17, 0.30),
    ink: rgb(0.14, 0.18, 0.22),
    muted: rgb(0.38, 0.42, 0.47),
    bronze: rgb(0.56, 0.36, 0.15),
    rule: rgb(0.83, 0.85, 0.86),
    pale: rgb(0.965, 0.97, 0.973),
  };
  const text = copy[language];
  const name = local(profile.name, language) || 'Xiamiao Zhao';
  const nameEnglish = local(profile.name, 'en') || name;
  const otherName = local(profile.name, language === 'zh' ? 'en' : 'zh');
  const l = value => {
    const valueText = local(value, language);
    const sourceDate = graduationText(profile.expectedGraduation);
    const overrideDate = graduationText(supplements.expectedGraduation);
    return sourceDate && overrideDate && sourceDate !== overrideDate ? valueText.split(sourceDate).join(overrideDate) : valueText;
  };
  // Optional bilingual inputs deliberately do not fall back to the other language.
  const optional = key => local(supplements[key], language, false);
  const date = generatedAt instanceof Date ? generatedAt : generatedAt ? new Date(generatedAt) : new Date();
  const validDate = Number.isNaN(date.valueOf()) ? new Date() : date;
  const dateParts = Object.fromEntries(new Intl.DateTimeFormat('en', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(validDate).map(part => [part.type, part.value]));
  const dateStamp = `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
  const scenarioProfile = profile.scenarios?.[scenario] || {};
  const papers = publishedPapersOnly(publications);
  const width = 595.28;
  const height = 841.89;
  const margin = 46;
  const contentWidth = width - margin * 2;
  const bottom = 57;
  const bodySize = language === 'zh' ? 10 : 9.65;
  const bodyLeading = language === 'zh' ? 15.6 : 14.5;
  let page;
  let y;
  const pageKinds = [];

  doc.setTitle(`${nameEnglish} — ${scenario === 'faculty' ? 'Academic CV' : 'Research Internship Résumé'} (${language === 'zh' ? 'Chinese' : 'English'})`);
  doc.setAuthor(nameEnglish);
  doc.setSubject(text[scenario]);
  doc.setCreator('Xiamiao Zhao · Personal website');
  doc.setProducer('pdf-lib · embedded fonts');
  doc.setLanguage(language === 'zh' ? 'zh-CN' : 'en');
  doc.setCreationDate(validDate);
  doc.setModificationDate(validDate);

  function fontFor(character, style = {}) {
    const preferred = style.display ? display : style.bold ? bold : style.italic ? italic : regular;
    if (supported.get(preferred).has(character.codePointAt(0))) return preferred;
    if (supported.get(extended).has(character.codePointAt(0))) return extended;
    if (supported.get(cjk).has(character.codePointAt(0))) return cjk;
    // Emoji or uncommon symbols in optional text must not break the entire export.
    return regular;
  }

  function glyph(character, style = {}) {
    const font = fontFor(character, style);
    const char = supported.get(font).has(character.codePointAt(0)) ? character : '?';
    return { character: char, font, size: style.size || bodySize, color: style.color || palette.ink, href: safeUrl(style.href), bold: !!style.bold };
  }

  function measure(value, style = {}) {
    return Array.from(plain(value)).reduce((sum, character) => {
      const item = glyph(character, style);
      return sum + item.font.widthOfTextAtSize(item.character, item.size);
    }, 0);
  }

  function rich(value, style = {}) {
    const spans = Array.isArray(value) ? value : [{ text: value, ...style }];
    return spans.flatMap(span => Array.from(String(span.text ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').replace(/\r\n?/g, '\n')).map(character => ({ ...glyph(character, { ...style, ...span }), original: character })));
  }

  function wrap(value, maxWidth = contentWidth, style = {}) {
    const characters = rich(value, style);
    const lines = [];
    let line = [];
    let used = 0;
    const charWidth = item => item.font.widthOfTextAtSize(item.character, item.size);
    const flush = () => {
      while (line.length && /\s/.test(line[line.length - 1].original)) line.pop();
      lines.push(line);
      line = [];
      used = 0;
    };
    for (const item of characters) {
      if (item.original === '\n') { flush(); continue; }
      const itemWidth = charWidth(item);
      if (line.length && used + itemWidth > maxWidth) {
        let breakAt = -1;
        for (let index = line.length - 1; index >= 0; index--) {
          if (/\s/.test(line[index].original) || /[\u2e80-\u9fff]/.test(line[index].original)) { breakAt = index + 1; break; }
        }
        if (breakAt > 0 && breakAt < line.length) {
          const carry = line.splice(breakAt);
          flush();
          line = carry;
          while (line.length && /\s/.test(line[0].original)) line.shift();
          used = line.reduce((sum, part) => sum + charWidth(part), 0);
        } else {
          flush();
        }
      }
      if (!line.length && /[ \t]/.test(item.original)) continue;
      line.push(item);
      used += itemWidth;
    }
    if (line.length) flush();
    return lines;
  }

  function linkAnnotation(x, baseline, linkWidth, size, href) {
    if (!href || linkWidth <= 0) return;
    const annotation = doc.context.register(doc.context.obj({
      Type: 'Annot', Subtype: 'Link', Rect: [x, baseline - 2, x + linkWidth, baseline + size + 1],
      Border: [0, 0, 0], A: { Type: 'Action', S: 'URI', URI: PDFString.of(href) },
    }));
    page.node.addAnnot(annotation);
  }

  function drawLine(items, x, baseline) {
    let cursor = x;
    let index = 0;
    while (index < items.length) {
      const first = items[index];
      let value = first.character;
      let next = index + 1;
      while (next < items.length && items[next].font === first.font && items[next].size === first.size && items[next].color === first.color && items[next].href === first.href) value += items[next++].character;
      page.drawText(value, { x: cursor, y: baseline, font: first.font, size: first.size, color: first.color });
      // PDF Tj uses each glyph's advance; measuring the whole run introduces
      // standard-font kerning that is absent from Tj and crowds font changes.
      const runWidth = Array.from(value).reduce((sum, character) => sum + first.font.widthOfTextAtSize(character, first.size), 0);
      linkAnnotation(cursor, baseline, runWidth, first.size, first.href);
      cursor += runWidth;
      index = next;
    }
  }

  function drawAt(value, x, baseline, style = {}) {
    drawLine(rich(value, style), x, baseline);
  }

  function newPage(kind = 'body') {
    page = doc.addPage([width, height]);
    pageKinds.push(kind);
    y = height - margin;
    page.drawRectangle({ x: 0, y: height - 5, width, height: 5, color: palette.navy });
    if (doc.getPageCount() > 1) {
      drawAt(name, margin, y - 2, { size: 14, display: language === 'en', color: palette.navy });
      const caption = text[scenario];
      drawAt(caption, width - margin - measure(caption, { size: 8 }), y, { size: 8, color: palette.muted });
      y -= 17;
      page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 0.6, color: palette.rule });
      y -= 27;
    }
  }

  function ensure(space, kind = 'body') {
    if (y - space < bottom) newPage(kind);
  }

  function paragraph(value, { size = bodySize, leading = bodyLeading, color = palette.ink, bold: isBold = false, x = margin, maxWidth = contentWidth, gap = 6, href = '', italic: isItalic = false } = {}) {
    if (!plain(typeof value === 'string' ? value : 'rich') || !value) return;
    const lines = wrap(value, maxWidth, { size, color, bold: isBold, href, italic: isItalic });
    for (const line of lines) {
      ensure(leading + 2, pageKinds[pageKinds.length - 1]);
      drawLine(line, x, y);
      y -= leading;
    }
    y -= gap;
  }

  function section(label, { minimum = 40 } = {}) {
    ensure(35 + minimum);
    y -= 7;
    drawAt(label, margin, y, { size: language === 'zh' ? 12.1 : 10.3, bold: true, color: palette.navy });
    const labelWidth = measure(label, { size: language === 'zh' ? 12.1 : 10.3, bold: true });
    page.drawLine({ start: { x: margin + labelWidth + 14, y: y + 3 }, end: { x: width - margin, y: y + 3 }, thickness: 0.55, color: palette.rule });
    page.drawLine({ start: { x: margin, y: y - 7 }, end: { x: margin + 25, y: y - 7 }, thickness: 1.5, color: palette.bronze });
    y -= 25;
  }

  function bullets(items, { size = bodySize, leading = bodyLeading, gap = 4 } = {}) {
    for (const item of items.filter(Boolean)) {
      const lines = wrap(item, contentWidth - 12, { size });
      ensure(Math.min(lines.length * leading + gap, 90));
      page.drawCircle({ x: margin + 2, y: y + size * 0.35, size: 1.35, color: palette.bronze });
      paragraph(item, { size, leading, x: margin + 12, maxWidth: contentWidth - 12, gap });
    }
  }

  function optionalSection(key) {
    const value = optional(key);
    if (!value) return;
    section(text[key]);
    const lines = value.split('\n').map(line => line.trim()).filter(Boolean);
    if (lines.length > 1) bullets(lines.map(line => line.replace(/^[-•*]\s*/, '')));
    else paragraph(value);
  }

  function entries(items, label, isEducation = false) {
    const list = values(items).filter(item => l(item.institution || item.title));
    if (!list.length) return;
    section(label, { minimum: 56 });
    for (const [entryIndex, item] of list.entries()) {
      const institution = l(item.institution || item.title);
      const period = l(item.period);
      const degree = l(item.degree || item.role);
      const expected = isEducation && (entryIndex === 0 || item.expectedGraduation || item.current)
        ? graduationText(supplements.expectedGraduation || item.expectedGraduation || profile.expectedGraduation) : '';
      const details = values(item.details).map(l).filter(detail => detail && (!expected || !/预计.*毕业|expected graduation/i.test(detail)));
      const available = contentWidth - (period ? Math.min(145, measure(period, { size: 8.5 })) + 14 : 0);
      const institutionLines = wrap(institution, available, { size: bodySize + 0.4, bold: true });
      const degreeLines = degree ? wrap(degree, contentWidth, { size: bodySize - 0.2 }) : [];
      const entrySpace = institutionLines.length * bodyLeading + degreeLines.length * bodyLeading + details.reduce((sum, detail) => sum + wrap(detail, contentWidth, { size: bodySize - 0.45 }).length * (bodyLeading - 1), 0) + (expected ? bodyLeading : 0) + 12;
      ensure(Math.min(entrySpace, 180));
      if (period) drawAt(period, width - margin - measure(period, { size: 8.5 }), y + 0.5, { size: 8.5, color: palette.muted });
      paragraph(institution, { size: bodySize + 0.4, bold: true, maxWidth: available, gap: 2 });
      if (degree) paragraph(degree, { size: bodySize - 0.2, gap: 1 });
      for (const detail of details) paragraph(detail, { size: bodySize - 0.45, leading: bodyLeading - 1, color: palette.muted, gap: 1 });
      if (expected) paragraph(`${text.expectedGraduation}: ${expected}`, { size: bodySize - 0.45, leading: bodyLeading - 1, color: palette.muted, gap: 1 });
      y -= 8;
    }
  }

  function graduationText(value) {
    const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(plain(value));
    if (!match) return '';
    if (language === 'zh') return `${match[1]} 年 ${Number(match[2])} 月`;
    return new Date(`${match[1]}-${match[2]}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  }

  function header() {
    drawAt(text[scenario], margin, y - 3, { size: 8.7, bold: true, color: palette.bronze });
    y -= 43;
    const nameSize = language === 'zh' ? 29 : 31;
    drawAt(name, margin, y, { size: nameSize, display: language === 'en', color: palette.navy });
    const nameWidth = measure(name, { size: nameSize, display: language === 'en' });
    if (otherName && otherName !== name) drawAt(otherName, margin + nameWidth + 16, y + 1, { size: language === 'zh' ? 13 : 15, color: palette.muted });
    y -= 25;
    const position = l(scenarioProfile.objective || profile.position);
    if (position) paragraph(position, { size: 10.2, color: palette.navy, leading: 15, gap: 4 });
    const contacts = [];
    if (profile.email) contacts.push({ text: plain(profile.email), href: safeUrl(`mailto:${plain(profile.email)}`) });
    if (plain(supplements.phone)) contacts.push({ text: plain(supplements.phone) });
    if (profile.website) contacts.push({ text: safeUrl(profile.website).replace(/^https?:\/\//, '').replace(/\/$/, ''), href: safeUrl(profile.website) });
    if (contacts.length) {
      const spans = contacts.flatMap((item, index) => [...(index ? [{ text: '  |  ', color: palette.rule }] : []), { ...item, color: palette.muted }]);
      paragraph(spans, { size: 8.15, leading: 12.8, gap: 3 });
    }
    const links = [];
    if (safeUrl(profile.scholar)) links.push({ text: text.scholar, href: profile.scholar });
    if (safeUrl(profile.github)) links.push({ text: 'GitHub', href: profile.github });
    for (const link of values(supplements.links).filter(item => safeUrl(item?.url))) links.push({ text: l(link.label) || safeUrl(link.url), href: link.url });
    if (links.length) paragraph(links.flatMap((link, index) => [...(index ? [{ text: '   /   ', color: palette.rule }] : []), { ...link, color: palette.bronze }]), { size: 8.15, leading: 12, gap: 5 });
    page.drawLine({ start: { x: margin, y: y - 1 }, end: { x: width - margin, y: y - 1 }, thickness: 0.8, color: palette.navy });
    y -= 13;
  }

  function honors() {
    const items = values(profile.honors).filter(item => l(item.title));
    if (!items.length) return;
    section(text.honors, { minimum: 24 });
    for (const item of items) {
      const title = l(item.title);
      const year = plain(item.year);
      const lines = wrap(title, contentWidth - 52, { size: bodySize - 0.25 });
      ensure(lines.length * (bodyLeading - 1) + 3);
      if (year) drawAt(year, margin, y, { size: bodySize - 0.5, color: palette.bronze });
      paragraph(title, { x: margin + 50, maxWidth: contentWidth - 50, size: bodySize - 0.25, leading: bodyLeading - 1, gap: 2 });
    }
  }

  function skills() {
    const all = [...values(profile.skills).map(l), ...optional('skills').split(/[\n,，;；]/)].map(plain).filter(Boolean);
    const unique = all.filter((item, index) => all.findIndex(value => value.toLowerCase() === item.toLowerCase()) === index);
    const value = unique.join(language === 'zh' ? '；' : '; ');
    if (!value) return;
    section(text.skills, { minimum: 15 });
    paragraph(value, { gap: 2 });
  }

  function research() {
    const areas = values(profile.research?.areas).map(item => {
      if (!item || typeof item !== 'object' || !('title' in item)) return l(item);
      const title = l(item.title);
      const description = l(item.description);
      return [title, description].filter(Boolean).join(language === 'zh' ? '：' : '. ');
    }).filter(Boolean);
    if (areas.length) {
      section(text.research);
      bullets(areas, { gap: 3 });
    }
  }

  function contributions() {
    const items = values(profile.contributions).filter(item => !item.publicationId || papers.some(paper => paper.id === item.publicationId));
    if (!items.length) return;
    section(text.contributions, { minimum: 55 });
    for (const item of items) {
      const title = l(item.title);
      const details = values(item.details).map(l).filter(Boolean);
      ensure(40 + Math.min(details.length * bodyLeading, 70));
      if (title) paragraph(title, { bold: true, size: bodySize + 0.1, gap: 2 });
      bullets(details, { size: bodySize - 0.15, gap: 2 });
      y -= 3;
    }
  }

  newPage();
  header();
  const summary = local(supplements.summary, language, false) || l(scenarioProfile.summary || profile.research?.summary);
  if (summary) {
    section(text.summary, { minimum: 35 });
    paragraph(summary, { leading: bodyLeading + 0.2 });
  }
  entries(profile.education, text.education, true);
  if (scenario === 'faculty') {
    research();
    entries(profile.visits, text.visits);
    optionalSection('researchPlan');
    optionalSection('teaching');
    honors();
    skills();
  } else {
    contributions();
    skills();
    optionalSection('projects');
    optionalSection('experience');
    entries(profile.visits, text.visits);
    honors();
  }

  if (papers.length) {
    newPage('publications');
    section(`${text.publications}  /  ${papers.length}`, { minimum: 60 });
    papers.forEach((paper, index) => {
      const paperX = margin + 26;
      const paperWidth = contentWidth - 26;
      const titleStyle = { size: 10.1, bold: true, color: palette.navy };
      const authorStyle = { size: 9.1, color: palette.ink };
      const authors = values(paper.authors).map(author => plain(author));
      const authorSpans = authors.flatMap((author, authorIndex) => [...(authorIndex ? [{ text: ', ', ...authorStyle }] : []), { text: author, ...authorStyle, bold: author === nameEnglish || author === 'Xiamiao Zhao' }]);
      const venue = plain(paper.venue || paper.journal_name);
      const doi = plain(paper.doi || (safeUrl(paper.journal).includes('doi.org/') ? safeUrl(paper.journal).split('doi.org/')[1] : ''));
      const link = safeUrl(paper.journal || (doi ? `https://doi.org/${doi}` : ''));
      const linkLabel = doi ? `DOI: ${doi}` : link ? text.journal : '';
      const titleLines = wrap(paper.title, paperWidth, titleStyle);
      const authorLines = wrap(authorSpans, paperWidth, authorStyle);
      const venueLines = wrap(venue, paperWidth, { size: 9.1 });
      const linkLines = linkLabel ? wrap(linkLabel, paperWidth, { size: 8.4 }) : [];
      const total = titleLines.length * 14.4 + authorLines.length * 13 + venueLines.length * 13 + linkLines.length * 12.1 + 16;
      ensure(total, 'publications');
      drawAt(`[${index + 1}]`, margin, y, { size: 9, color: palette.bronze });
      paragraph(plain(paper.title), { x: paperX, maxWidth: paperWidth, size: titleStyle.size, bold: true, color: palette.navy, leading: 14.4, gap: 2 });
      paragraph(authorSpans, { x: paperX, maxWidth: paperWidth, size: authorStyle.size, leading: 13, gap: 1.5 });
      if (venue) paragraph(venue, { x: paperX, maxWidth: paperWidth, size: 9.1, leading: 13, color: palette.muted, gap: 1 });
      if (linkLabel) paragraph(linkLabel, { x: paperX, maxWidth: paperWidth, size: 8.4, leading: 12.1, color: palette.bronze, href: link, gap: 0 });
      y -= 11;
    });
  }

  const allPages = doc.getPages();
  allPages.forEach((currentPage, index) => {
    page = currentPage;
    page.drawLine({ start: { x: margin, y: 42 }, end: { x: width - margin, y: 42 }, thickness: 0.55, color: palette.rule });
    drawAt(`${nameEnglish}  ·  ${text.generated} ${dateStamp}`, margin, 27, { size: 7.25, color: palette.muted });
    const counter = `${index + 1} / ${allPages.length}`;
    drawAt(counter, width - margin - measure(counter, { size: 8 }), 27, { size: 8, color: palette.muted });
  });
  const bytes = await doc.save();
  const filename = `Xiamiao_Zhao_${scenario === 'faculty' ? 'Academic_CV' : 'LLM_Research_Intern'}_${language.toUpperCase()}_${dateStamp}.pdf`;
  return { bytes, filename, pageCount: doc.getPageCount() };
}
