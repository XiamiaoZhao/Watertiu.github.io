const text = (value, language) => typeof value === 'string' ? value : value?.[language] || value?.en || value?.zh || '';

export function profileTranslations(profile, language) {
  if (!profile) return {};
  const copy = Object.fromEntries(Object.entries(profile.site || {}).map(([key, value]) => [key, text(value, language)]));
  copy.position = text(profile.position, language);
  if (profile.updatedAt) {
    const date = new Date(`${profile.updatedAt}T12:00:00`);
    if (!Number.isNaN(date.getTime())) copy.lastUpdated = language === 'zh'
      ? `最近更新 · ${date.getFullYear()} 年 ${date.getMonth() + 1} 月`
      : `Last updated · ${date.toLocaleDateString('en', {month:'long',year:'numeric'})}`;
  }
  return copy;
}

export function renderProfileSections(profile, language) {
  if (!profile) return;
  const make = (tag, value, className) => {
    const node = document.createElement(tag);
    node.textContent = text(value, language);
    if (className) node.className = className;
    return node;
  };
  const title = document.getElementById('hero-title');
  if (title) {
    const [first, ...last] = text(profile.name, 'en').split(/\s+/);
    title.replaceChildren(document.createTextNode(first), document.createElement('br'), document.createTextNode(last.join(' ')), make('span', text(profile.name, 'zh'), 'name-cn'));
  }
  const wordmark = document.querySelector('.wordmark-name');
  if (wordmark) wordmark.textContent = text(profile.name, 'en');
  const timeline = document.querySelector('#experience .timeline');
  if (timeline) {
    const honors = timeline.querySelector('.honors');
    const render = (item, isVisit = false) => {
      const article = document.createElement('article');
      article.append(make('div', item.period, 'timeline-date'));
      const content = document.createElement('div');
      content.append(make('h3', item.institution));
      if (item.degree) content.append(make('p', item.degree));
      for (const detail of item.details || []) content.append(make('p', detail, isVisit ? '' : 'muted'));
      article.append(content);
      return article;
    };
    const education = profile.education || [];
    const articles = [education[0] && render(education[0]), ...(profile.visits || []).map(item => render(item, true)), ...education.slice(1).map(item => render(item))].filter(Boolean);
    if (honors) {
      const heading = honors.querySelector('h3');
      honors.replaceChildren(...(heading ? [heading] : []));
      for (const honor of profile.honors || []) {
        const row = document.createElement('p');
        row.append(make('span', String(honor.year || '')), make('span', honor.title));
        honors.append(row);
      }
      articles.push(honors);
    }
    timeline.replaceChildren(...articles);
  }
  for (const link of document.querySelectorAll('a[href^="mailto:"]')) {
    if (profile.email) { link.href = `mailto:${profile.email}`; link.textContent = profile.email; }
  }
  const publicURL = value => {
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; }
  };
  for (const link of document.querySelectorAll('a[href*="scholar.google.com/citations"]')) {
    const current = new URL(link.href);
    if (current.searchParams.has('citation_for_view') || current.searchParams.get('view_op') === 'view_citation') continue;
    const url = publicURL(profile.scholar);
    if (url) link.href = url;
  }
  for (const link of document.querySelectorAll('.text-links a[href^="https://github.com/"]')) {
    const url = publicURL(profile.github);
    if (url) link.href = url;
  }
}
