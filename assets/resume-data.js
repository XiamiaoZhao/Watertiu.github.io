/** The website and its exported CVs read the same two public data files. */
export async function loadResumeSnapshot() {
  const stamp = Date.now();
  const read = async name => {
    const url = new URL(name, import.meta.url);
    url.searchParams.set('fresh', String(stamp));
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Could not load ${name} (${response.status})`);
    return response.json();
  };
  const [profile, allPublications] = await Promise.all([read('profile.json'), read('publications.json')]);
  if (!profile?.name?.zh || !profile?.name?.en || !Array.isArray(profile.education) || !Array.isArray(allPublications)) {
    throw new Error('The public profile data is incomplete.');
  }
  const seen = new Set();
  const publications = allPublications.filter(paper => {
    if (paper.status !== 'published') return false;
    const identity = (paper.journal || paper.arxiv || paper.id || paper.title).toLowerCase();
    if (seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });
  return { profile, publications, updatedAt: profile.updatedAt, fetchedAt: new Date().toISOString() };
}
