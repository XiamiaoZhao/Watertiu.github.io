# Xiamiao Zhao — Academic Homepage

赵夏淼的学术主页，展示组合数学与图论研究、论文及学术经历。

Website: https://xiamiaozhao.github.io/Watertiu.github.io/

## Content

- Chinese / English language switching (English by default)
- Research interests, education, research visit, honors, and academic contact
- Personal portrait and a concise introduction
- Seven published papers and 25 preprints / manuscripts
- Paper filters, short research overviews, journal / arXiv links, and BibTeX citations
- Responsive layout, keyboard navigation, and print styles
- A bilingual CV studio for mathematics faculty applications and LLM research internships
- Fresh profile/publication data on each PDF export, with published papers only
- Optional application details saved in the current browser, with JSON backup and restore

## Updating the website

Public biographical data, education, visits, honors, CV summaries, and verified contributions are in `assets/profile.json`. The homepage and PDF studio both read this file. Update `expectedGraduation` there to change the default graduation date; keep dates out of summary prose to avoid stale duplicate dates. The current June 2028 graduation date and Python skill were confirmed by the owner on November 25, 2026.

Paper records are in `assets/publications.json`; the downloadable bibliography is `publications.bib`. A PDF export always fetches both JSON files again with `cache: no-store` and includes only `status: "published"` records. Future publication years are retained when they belong to an already published journal volume. `contributions[].publicationId` links the CV's research experience to a published paper. The scButterfly contribution is limited to participation in results analysis.
Keep the static paper list in `index.html` in sync when editing paper data so it remains available without JavaScript and can be indexed by search engines.

The CV studio is in `assets/resume-ui.js`, with styles in `assets/resume.css`; `assets/resume-pdf.js` creates selectable-text, A4 PDFs directly in the browser. Chinese fonts and PDF libraries load only when a PDF is requested. Public profile data belongs in `profile.json`; personal application additions stay in the browser's `xz-resume-supplements-v1` localStorage item and are never uploaded by the studio. Use its backup/import controls to move those additions to another device. Empty supplementary sections are omitted. Dependencies and font licenses are recorded in `assets/vendor/THIRD-PARTY-NOTICES.txt`.

The workflow in `.github/workflows/static.yml` publishes to GitHub Pages when the `main` branch changes. In repository **Settings → Pages**, the publishing source should be **GitHub Actions**.

## Content sources

Education, research visit and honors were supplied in the owner's 2026 scholarship application. The portrait was supplied by the owner. Academic contact is from the author's public arXiv paper [2608.04615](https://arxiv.org/abs/2608.04615). Paper metadata was checked against Google Scholar, journal and arXiv pages on October 9, 2026.

All 33 records visible on the owner's [Google Scholar profile](https://scholar.google.com/citations?user=CRjqCMsAAAAJ&pagesize=100) are represented by 31 distinct works. The journal and arXiv records for the Berge matching and minimum edge-pancyclic papers are combined, preserving both links. Revised arXiv titles and author orders are used. The existing Nature Communications paper is also retained, giving 32 website entries. The Scholar-listed manuscript *Cycles are Turán-Good* has a public PDF link; its year is left unspecified because the source does not provide one. Each Scholar-derived entry retains its source record links in `assets/publications.json`.

The original `2.html` page remains available.
