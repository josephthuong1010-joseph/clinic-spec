/* app.js — Shared utilities: Mermaid, Expandable Rows, Filtering, Subnav ScrollSpy, Lightbox */

if (typeof mermaid !== 'undefined') {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    themeVariables: {
      primaryColor: '#dbeafe',
      primaryTextColor: '#1e3a5f',
      primaryBorderColor: '#93c5fd',
      lineColor: '#2563eb',
      secondaryColor: '#f0fdf4',
      tertiaryColor: '#fef9c3',
      background: '#ffffff',
      mainBkg: '#eff6ff',
      nodeBorder: '#93c5fd',
      clusterBkg: '#f8fafc',
      titleColor: '#0f172a',
      edgeLabelBackground: '#f1f5f9',
      attributeBackgroundColorOdd: '#ffffff',
      attributeBackgroundColorEven: '#f8fafc',
    },
  });
}

// Toggle FR / UC / NFR detail rows
function toggleFR(id) {
  const row = document.getElementById('detail-' + id);
  const arr = document.getElementById('arr-' + id);
  if (!row) return;
  const isOpen = row.classList.toggle('open');
  if (arr) arr.textContent = isOpen ? '▾' : '▸';
  if (isOpen && typeof mermaid !== 'undefined') {
    const nodes = Array.from(row.querySelectorAll('.mermaid:not([data-processed="true"])'));
    if (nodes.length) mermaid.run({ nodes });
  }
}

// Interactive filter/search across tables
window._sectionFilters = window._sectionFilters || {};

function _normalizeText(str) {
  return (str || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

function setModuleFilter(sectionId, moduleCode, btnEl) {
  const state = window._sectionFilters[sectionId] || { module: 'ALL', query: '' };
  state.module = moduleCode;
  window._sectionFilters[sectionId] = state;
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btnEl.classList.add('active');
  }
  applySectionFilter(sectionId);
}

function setSearchFilter(sectionId, query) {
  const state = window._sectionFilters[sectionId] || { module: 'ALL', query: '' };
  state.query = query || '';
  window._sectionFilters[sectionId] = state;
  applySectionFilter(sectionId);
}

function applySectionFilter(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const state = window._sectionFilters[sectionId] || { module: 'ALL', query: '' };
  const targetMod = state.module || 'ALL';
  const qNorm = _normalizeText(state.query).trim();

  const rows = section.querySelectorAll('tbody tr.fr-row, tbody tr.plain-row');
  let visible = 0;
  rows.forEach(tr => {
    const mods = (tr.dataset.module || '').split(/\s+/).filter(Boolean);
    const modOk = targetMod === 'ALL' || mods.includes(targetMod);
    const id = tr.dataset.id;
    const detail = id ? document.getElementById('detail-' + id) : null;
    const hay = _normalizeText((tr.textContent || '') + ' ' + (tr.dataset.search || '') + ' ' + (detail ? detail.textContent || '' : ''));
    const qOk = !qNorm || hay.includes(qNorm);
    const show = modOk && qOk;
    tr.style.display = show ? '' : 'none';
    if (show) visible++;
    if (detail) {
      if (!show) {
        detail.classList.remove('open');
        detail.style.display = 'none';
        const arr = id ? document.getElementById('arr-' + id) : null;
        if (arr) arr.textContent = '▸';
      } else {
        detail.style.display = '';
      }
    }
  });

  const counter = document.getElementById('count-' + sectionId);
  if (counter) counter.textContent = 'Hiển thị ' + visible + ' / ' + rows.length + ' mục';
}

function toggleAllDetails(sectionId, expand) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const nodes = [];
  section.querySelectorAll('tbody tr.fr-row').forEach(tr => {
    if (tr.style.display === 'none') return;
    const id = tr.dataset.id;
    if (!id) return;
    const detail = document.getElementById('detail-' + id);
    const arr = document.getElementById('arr-' + id);
    if (!detail) return;
    if (expand) {
      detail.classList.add('open');
      if (arr) arr.textContent = '▾';
      detail.querySelectorAll('.mermaid:not([data-processed="true"])').forEach(n => nodes.push(n));
    } else {
      detail.classList.remove('open');
      if (arr) arr.textContent = '▸';
    }
  });
  if (expand && nodes.length && typeof mermaid !== 'undefined') {
    mermaid.run({ nodes });
  }
}

// Scroll spy for left #diag-subnav sidebar (diagrams.html, requirements.html)
function initSubnavScrollSpy() {
  const links = document.querySelectorAll('#diag-subnav a');
  if (!links.length) return;
  const ids = Array.from(links).map(a => a.getAttribute('href').slice(1));

  function update() {
    const offset = 110;
    let current = ids[0] || '';
    for (let i = ids.length - 1; i >= 0; i--) {
      const el = document.getElementById(ids[i]);
      if (el && el.getBoundingClientRect().top <= offset) {
        current = ids[i];
        break;
      }
    }
    links.forEach(a => {
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();

  links.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// Switch UC detail tabs (usecases.html)
function switchUCTab(id, tab) {
  const detail = document.getElementById('detail-' + id);
  if (!detail) return;
  detail.querySelectorAll('.uc-tab-pane').forEach(p => p.style.display = 'none');
  detail.querySelectorAll('.uc-tab').forEach(b => b.classList.remove('active'));
  const pane = document.getElementById('uctab-' + tab + '-' + id);
  if (pane) pane.style.display = 'block';
  const btn = detail.querySelector('[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');
}

// Lightbox
function lb(src) {
  document.getElementById('lb-img').src = src;
  document.getElementById('lb').classList.add('open');
}
function closeLb() {
  document.getElementById('lb').classList.remove('open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
