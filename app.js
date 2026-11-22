/* app.js — Shared utilities: Mermaid, Expandable Rows, Filtering, Subnav ScrollSpy, Lightbox & Complete Deep-Linking */

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

// ── Scroll & URL Helpers ──
function _scrollToElement(el, offset) {
  if (!el || typeof el.getBoundingClientRect !== 'function') return;
  const topOffset = typeof offset === 'number' ? offset : 64;
  if (typeof window.scrollTo === 'function') {
    const y = Math.max(0, el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0) - topOffset);
    window.scrollTo({ top: y, behavior: 'smooth' });
  } else if (typeof el.scrollIntoView === 'function') {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function buildPageUrl(pageName, opts) {
  const loc = window.location;
  const o = opts || {};
  let base = '';
  if (!pageName) {
    base = loc.protocol === 'file:'
      ? loc.href.replace(/[?#].*$/, '')
      : loc.origin + loc.pathname;
  } else {
    const cleanPage = String(pageName).replace(/\.html$/i, '').replace(/^\/+/, '');
    if (loc.protocol === 'file:') {
      const baseDir = loc.href.replace(/[^/]*(\?.*)?(#.*)?$/, '');
      base = baseDir + cleanPage + '.html';
    } else if (/\.html$/i.test(loc.pathname)) {
      const dir = loc.pathname.replace(/[^/]*$/, '');
      base = loc.origin + dir + cleanPage + '.html';
    } else {
      const dir = loc.pathname.replace(/[^/]*$/, '');
      base = loc.origin + dir + (cleanPage === 'index' ? '' : cleanPage);
    }
  }
  const qs = o.open ? '?open=' + encodeURIComponent(o.open) : '';
  const hs = o.hash ? '#' + encodeURIComponent(o.hash) : '';
  return base + qs + hs;
}

function _syncRowOpenParam(id, isOpen) {
  if (!window.history || !window.history.replaceState) return;
  try {
    const url = new URL(window.location.href);
    if (isOpen) {
      url.searchParams.set('open', id);
      url.searchParams.delete('diagram');
      url.searchParams.delete('view');
      url.hash = '';
    } else if ((url.searchParams.get('open') || '').toUpperCase() === String(id || '').toUpperCase()) {
      url.searchParams.delete('open');
    }
    window.history.replaceState(null, '', url.toString());
  } catch (_) {}
}

// Toggle FR / UC / NFR detail rows
function toggleFR(id, opts) {
  const row = document.getElementById('detail-' + id);
  const arr = document.getElementById('arr-' + id);
  if (!row) return;
  const isOpen = row.classList.toggle('open');
  if (arr) arr.textContent = isOpen ? '▾' : '▸';
  if (isOpen && typeof mermaid !== 'undefined') {
    const nodes = Array.from(row.querySelectorAll('.mermaid:not([data-processed="true"])'));
    if (nodes.length) mermaid.run({ nodes });
  }
  if (!opts || opts.syncUrl !== false) {
    _syncRowOpenParam(id, isOpen);
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
  const ids = Array.from(links).map(a => (a.getAttribute('href') || '').replace(/^#/, ''));

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
      const id = (a.getAttribute('href') || '').replace(/^#/, '');
      const target = document.getElementById(id);
      if (target) {
        _scrollToElement(target, 56);
        if (window.history && window.history.replaceState) {
          try {
            const url = new URL(window.location.href);
            url.searchParams.delete('open');
            url.searchParams.delete('diagram');
            url.searchParams.delete('view');
            url.hash = id;
            window.history.replaceState(null, '', url.toString());
          } catch (_) {}
        }
      }
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

// ── Diagram Slug & Deep-Link Helpers ──
const _COLLIDING_DIAGRAM_BASENAMES = new Set(['medical-record', 'telehealth']);

function diagramSlugFromSrc(src) {
  const clean = (src || '').replace(/\\/g, '/').replace(/^.*assets\/design\//i, '').replace(/\.png$/i, '');
  const parts = clean.split('/').filter(Boolean);
  if (!parts.length) return '';
  const base = parts[parts.length - 1];
  const dir = parts.length > 1 ? parts[parts.length - 2] : '';
  if (_COLLIDING_DIAGRAM_BASENAMES.has(base)) {
    if (dir === 'sequence-diagrams') return 'seq-' + base;
    if (dir === 'state-diagrams') return 'state-' + base;
  }
  return base;
}

function buildDiagramShareUrl(slug) {
  return buildPageUrl('diagrams', { open: slug });
}

function copyTextWithFeedback(text, btnEl) {
  const flash = () => {
    if (!btnEl) return;
    const orig = btnEl.dataset.origLabel || btnEl.textContent;
    btnEl.dataset.origLabel = orig;
    btnEl.textContent = btnEl.classList.contains('inline-copy') ? '✓' : '✓ Đã copy';
    btnEl.classList.add('copied');
    clearTimeout(btnEl._copyTimer);
    btnEl._copyTimer = setTimeout(() => {
      btnEl.textContent = orig;
      btnEl.classList.remove('copied');
    }, 1600);
  };
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(flash).catch(() => {
      window.prompt('Sao chép liên kết:', text);
    });
  } else {
    window.prompt('Sao chép liên kết:', text);
  }
}

// ── Enhanced Interactive Lightbox (Zoom / Pan / Prev-Next / Copy Link) ──
const _lbState = {
  items: [],       // [{ slug, src, label, cardEl }]
  index: -1,
  currentSrc: '',
  currentSlug: '',
  currentLabel: '',
  scale: 1,
  tx: 0,
  ty: 0,
  dragging: false,
  moved: false,
  startX: 0,
  startY: 0,
  startTx: 0,
  startTy: 0,
};

function _applyLbTransform() {
  const img = document.getElementById('lb-img');
  if (img) img.style.transform = `translate(${_lbState.tx}px, ${_lbState.ty}px) scale(${_lbState.scale})`;
  const z = document.getElementById('lb-zoom-val');
  if (z) z.textContent = Math.round(_lbState.scale * 100) + '%';
}

function _resetLbView() {
  _lbState.scale = 1;
  _lbState.tx = 0;
  _lbState.ty = 0;
  _applyLbTransform();
}

function _zoomLb(delta) {
  const next = Math.min(4, Math.max(0.5, Number((_lbState.scale + delta).toFixed(2))));
  _lbState.scale = next;
  if (next <= 1) { _lbState.tx = 0; _lbState.ty = 0; }
  _applyLbTransform();
}

function _syncUrlOpenParam(slug) {
  if (!/diagrams(?:\.html)?$/i.test(window.location.pathname) || !window.history || !window.history.replaceState) return;
  try {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set('open', slug);
    else {
      url.searchParams.delete('open');
      url.searchParams.delete('diagram');
      url.searchParams.delete('view');
    }
    window.history.replaceState(null, '', url.toString());
  } catch (_) {}
}

function _setupLightboxDom() {
  const lbEl = document.getElementById('lb');
  if (!lbEl || lbEl.dataset.enhanced === 'true') return;
  lbEl.dataset.enhanced = 'true';
  lbEl.removeAttribute('onclick');
  lbEl.innerHTML = `
    <div class="lb-bar" id="lb-bar">
      <div class="lb-title"><span class="lb-idx" id="lb-idx" style="display:none"></span><span id="lb-caption">Sơ đồ</span></div>
      <div class="lb-tools">
        <button type="button" class="lb-btn" id="lb-prev" title="Sơ đồ trước (←)">←</button>
        <button type="button" class="lb-btn" id="lb-next" title="Sơ đồ sau (→)">→</button>
        <button type="button" class="lb-btn" id="lb-zout" title="Thu nhỏ (-)">−</button>
        <span class="lb-zoom-val" id="lb-zoom-val">100%</span>
        <button type="button" class="lb-btn" id="lb-zin" title="Phóng to (+)">+</button>
        <button type="button" class="lb-btn" id="lb-fit" title="Đặt lại vừa màn hình (0)">Vừa khung</button>
        <button type="button" class="lb-btn" id="lb-copy" title="Sao chép link mở thẳng sơ đồ này">🔗 Copy link</button>
        <a class="lb-btn" id="lb-raw" href="#" target="_blank" rel="noopener" title="Mở ảnh PNG gốc ở tab mới">↗ Ảnh gốc</a>
        <button type="button" class="lb-btn lb-btn-close" id="lb-close" title="Đóng (Esc)">✕</button>
      </div>
    </div>
    <div class="lb-stage" id="lb-stage">
      <img id="lb-img" src="" alt="">
      <div class="lb-hint">Cuộn chuột để zoom · Kéo để di chuyển · Nhấp đúp để phóng to · Phím ← / → chuyển sơ đồ · Esc đóng</div>
    </div>
  `;

  document.getElementById('lb-close').addEventListener('click', closeLb);
  document.getElementById('lb-zin').addEventListener('click', () => _zoomLb(0.3));
  document.getElementById('lb-zout').addEventListener('click', () => _zoomLb(-0.3));
  document.getElementById('lb-fit').addEventListener('click', _resetLbView);
  document.getElementById('lb-prev').addEventListener('click', () => _stepLb(-1));
  document.getElementById('lb-next').addEventListener('click', () => _stepLb(1));
  document.getElementById('lb-copy').addEventListener('click', function () {
    if (_lbState.currentSlug) copyTextWithFeedback(buildDiagramShareUrl(_lbState.currentSlug), this);
  });

  const stage = document.getElementById('lb-stage');
  stage.addEventListener('wheel', e => {
    e.preventDefault();
    _zoomLb(e.deltaY < 0 ? 0.2 : -0.2);
  }, { passive: false });

  stage.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    _lbState.dragging = true;
    _lbState.moved = false;
    _lbState.startX = e.clientX;
    _lbState.startY = e.clientY;
    _lbState.startTx = _lbState.tx;
    _lbState.startTy = _lbState.ty;
    stage.classList.add('dragging');
  });

  window.addEventListener('mousemove', e => {
    if (!_lbState.dragging) return;
    const dx = e.clientX - _lbState.startX;
    const dy = e.clientY - _lbState.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) _lbState.moved = true;
    _lbState.tx = _lbState.startTx + dx;
    _lbState.ty = _lbState.startTy + dy;
    _applyLbTransform();
  });

  window.addEventListener('mouseup', () => {
    if (!_lbState.dragging) return;
    _lbState.dragging = false;
    stage.classList.remove('dragging');
  });

  stage.addEventListener('dblclick', () => {
    if (_lbState.scale > 1.05) _resetLbView();
    else { _lbState.scale = 1.8; _lbState.tx = 0; _lbState.ty = 0; _applyLbTransform(); }
  });

  stage.addEventListener('click', e => {
    if (_lbState.moved) { _lbState.moved = false; return; }
    if (e.target === stage) closeLb();
  });
}

function _renderLbCurrent() {
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-caption');
  const idxEl = document.getElementById('lb-idx');
  const rawEl = document.getElementById('lb-raw');
  const prevBtn = document.getElementById('lb-prev');
  const nextBtn = document.getElementById('lb-next');
  const copyBtn = document.getElementById('lb-copy');

  if (img) img.src = _lbState.currentSrc;
  if (cap) cap.textContent = _lbState.currentLabel || _lbState.currentSlug || 'Sơ đồ';
  if (rawEl) rawEl.href = _lbState.currentSrc;
  if (copyBtn) copyBtn.style.display = _lbState.currentSlug ? '' : 'none';

  const hasList = _lbState.items.length > 1 && _lbState.index >= 0;
  if (idxEl) {
    idxEl.style.display = hasList ? '' : 'none';
    if (hasList) idxEl.textContent = `${_lbState.index + 1} / ${_lbState.items.length}`;
  }
  if (prevBtn) { prevBtn.style.display = hasList ? '' : 'none'; prevBtn.disabled = _lbState.index <= 0; }
  if (nextBtn) { nextBtn.style.display = hasList ? '' : 'none'; nextBtn.disabled = _lbState.index >= _lbState.items.length - 1; }
  _resetLbView();
}

function _stepLb(dir) {
  if (_lbState.items.length <= 1 || _lbState.index < 0) return;
  const nextIdx = _lbState.index + dir;
  if (nextIdx < 0 || nextIdx >= _lbState.items.length) return;
  const item = _lbState.items[nextIdx];
  _lbState.index = nextIdx;
  _lbState.currentSrc = item.src;
  _lbState.currentSlug = item.slug;
  _lbState.currentLabel = item.label;
  _renderLbCurrent();
  _syncUrlOpenParam(item.slug);
}

function lb(src, labelOverride) {
  _setupLightboxDom();
  const slug = diagramSlugFromSrc(src);
  const idx = _lbState.items.findIndex(x => x.src === src || (slug && x.slug === slug));
  _lbState.index = idx;
  _lbState.currentSrc = src;
  _lbState.currentSlug = slug;
  _lbState.currentLabel = labelOverride || (idx >= 0 ? _lbState.items[idx].label : slug);
  _renderLbCurrent();
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (slug) _syncUrlOpenParam(slug);
}

function closeLb() {
  const lbEl = document.getElementById('lb');
  if (!lbEl || !lbEl.classList.contains('open')) return;
  lbEl.classList.remove('open');
  document.body.style.overflow = '';
  _syncUrlOpenParam(null);
}

document.addEventListener('keydown', e => {
  const lbEl = document.getElementById('lb');
  if (!lbEl || !lbEl.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  else if (e.key === 'ArrowLeft') _stepLb(-1);
  else if (e.key === 'ArrowRight') _stepLb(1);
  else if (e.key === '+' || e.key === '=') _zoomLb(0.25);
  else if (e.key === '-') _zoomLb(-0.25);
  else if (e.key === '0') _resetLbView();
});

// ── Auto-enhance Diagram Cards, Expandable Details, Reference Items & Section Headers ──
function _enhanceDiagramCards() {
  const cards = document.querySelectorAll('.img-card');
  if (!cards.length) return;
  _lbState.items = [];
  cards.forEach(card => {
    const img = card.querySelector('img');
    if (!img) return;
    const src = img.getAttribute('src') || '';
    const slug = diagramSlugFromSrc(src);
    if (!slug) return;
    card.id = 'diag-' + slug;
    card.dataset.diagram = slug;

    const labelEl = card.querySelector('.ic-label');
    const labelText = labelEl ? labelEl.textContent.trim() : (img.getAttribute('alt') || slug);
    _lbState.items.push({ slug, src, label: labelText, cardEl: card });

    if (labelEl && !labelEl.querySelector('.ic-copy')) {
      const span = document.createElement('span');
      span.className = 'ic-label-text';
      span.innerHTML = labelEl.innerHTML;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ic-copy';
      btn.title = 'Sao chép liên kết mở thẳng sơ đồ này';
      btn.textContent = '🔗 Copy link';
      btn.addEventListener('click', e => {
        e.stopPropagation();
        copyTextWithFeedback(buildDiagramShareUrl(slug), btn);
      });
      labelEl.innerHTML = '';
      labelEl.appendChild(span);
      labelEl.appendChild(btn);
    }
  });
}

function _enhanceExpandableRows() {
  const rows = document.querySelectorAll('tr.fr-row[data-id]');
  if (!rows.length) return;
  rows.forEach(tr => {
    const id = tr.dataset.id;
    if (!id) return;
    if (!document.getElementById(id)) tr.id = id;

    const detail = document.getElementById('detail-' + id);
    if (!detail) return;
    const dcard = detail.querySelector('.fr-dcard');
    if (!dcard || dcard.querySelector('.detail-bar')) return;

    const bar = document.createElement('div');
    bar.className = 'detail-bar';

    const left = document.createElement('div');
    left.className = 'detail-bar-left';
    const badge = document.createElement('span');
    badge.className = 'pill';
    badge.textContent = 'Chi tiết ' + id;
    left.appendChild(badge);

    const frMatch = /^FR-(\d{2})$/i.exec(id);
    const ucMatch = /^UC-(\d{2})$/i.exec(id);
    if (frMatch) {
      const targetUc = 'UC-' + frMatch[1];
      const xref = document.createElement('a');
      xref.className = 'xref-link';
      xref.href = buildPageUrl('usecases', { open: targetUc });
      xref.textContent = 'Mở ' + targetUc + ' →';
      xref.title = 'Chuyển sang Use Case ' + targetUc;
      left.appendChild(xref);
    } else if (ucMatch) {
      const targetFr = 'FR-' + ucMatch[1];
      const xref = document.createElement('a');
      xref.className = 'xref-link';
      xref.href = buildPageUrl('requirements', { open: targetFr });
      xref.textContent = 'Mở ' + targetFr + ' →';
      xref.title = 'Chuyển sang Yêu cầu ' + targetFr;
      left.appendChild(xref);
    }

    const actions = document.createElement('div');
    actions.className = 'detail-bar-actions';
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'ic-copy';
    copyBtn.textContent = '🔗 Copy link mở chi tiết';
    copyBtn.title = 'Sao chép liên kết mở thẳng chi tiết ' + id;
    copyBtn.addEventListener('click', e => {
      e.stopPropagation();
      copyTextWithFeedback(buildPageUrl(null, { open: id }), copyBtn);
    });
    actions.appendChild(copyBtn);

    bar.appendChild(left);
    bar.appendChild(actions);
    dcard.insertBefore(bar, dcard.firstChild);
  });
}

function _appendCellCopyBtn(cell, urlGetter, title) {
  if (!cell || cell.querySelector('.inline-copy')) return;
  const wrap = document.createElement('div');
  wrap.className = 'cell-with-copy';
  const main = document.createElement('div');
  main.className = 'cell-main';
  while (cell.firstChild) main.appendChild(cell.firstChild);
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'inline-copy';
  btn.textContent = '🔗';
  btn.title = title;
  btn.setAttribute('aria-label', title);
  btn.addEventListener('click', e => {
    e.stopPropagation();
    copyTextWithFeedback(urlGetter(), btn);
  });
  wrap.appendChild(main);
  wrap.appendChild(btn);
  cell.appendChild(wrap);
}

function _enhanceReferenceItems() {
  // 1. Business Rules (#br -> BR-01..BR-19) & Screens (#screens -> SCR-01..SCR-23, DLG-01..DLG-06)
  document.querySelectorAll('#br tbody tr.plain-row, #screens tbody tr.plain-row').forEach(tr => {
    const firstTd = tr.querySelector('td');
    const code = firstTd ? firstTd.textContent.trim() : '';
    if (!/^(?:BR-\d{2}|SCR-\d{2}[A-Z]?|DLG-\d{2})$/i.test(code)) return;
    if (!document.getElementById(code)) tr.id = code;
    const tds = tr.querySelectorAll('td');
    const lastTd = tds[tds.length - 1];
    _appendCellCopyBtn(lastTd, () => buildPageUrl(null, { open: code }), 'Sao chép link tới ' + code);
  });

  // 2. PCL Test Cases (#pcl -> TC-N01..TC-A14)
  document.querySelectorAll('#pcl tbody tr').forEach(tr => {
    const firstTd = tr.querySelector('td');
    const code = firstTd ? firstTd.textContent.trim() : '';
    if (!/^TC-[A-Z0-9-]+$/i.test(code)) return;
    tr.classList.add('plain-row', 'pcl-row');
    if (!document.getElementById(code)) tr.id = code;
    _appendCellCopyBtn(firstTd, () => buildPageUrl(null, { open: code }), 'Sao chép link tới ' + code);
  });

  // 3. Formulas (#formulas -> formula-1..formula-6)
  document.querySelectorAll('#formulas .formula-card').forEach((card, idx) => {
    const id = card.id || ('formula-' + (idx + 1));
    card.id = id;
    const h4 = card.querySelector('h4');
    if (!h4 || h4.querySelector('.inline-copy')) return;
    const badge = h4.querySelector('.badge');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'inline-copy';
    btn.textContent = '🔗';
    btn.title = 'Sao chép link tới công thức này';
    btn.setAttribute('aria-label', btn.title);
    btn.addEventListener('click', e => {
      e.stopPropagation();
      copyTextWithFeedback(buildPageUrl(null, { open: id }), btn);
    });
    if (badge) {
      const meta = document.createElement('span');
      meta.className = 'formula-meta';
      h4.insertBefore(meta, badge);
      meta.appendChild(badge);
      meta.appendChild(btn);
    } else {
      h4.appendChild(btn);
    }
  });

  // 4. Modules (#modules -> M01..M09)
  document.querySelectorAll('#modules .mod').forEach(card => {
    const h4 = card.querySelector('h4');
    if (!h4) return;
    const m = /^(M\d{2})\b/i.exec(h4.textContent.trim());
    if (!m) return;
    const code = m[1].toUpperCase();
    if (!document.getElementById(code)) card.id = code;
    if (h4.querySelector('.inline-copy')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'inline-copy';
    btn.textContent = '🔗';
    btn.title = 'Sao chép link tới phân hệ ' + code;
    btn.setAttribute('aria-label', btn.title);
    btn.addEventListener('click', e => {
      e.stopPropagation();
      copyTextWithFeedback(buildPageUrl(null, { open: code }), btn);
    });
    h4.appendChild(btn);
  });

  // 5. Review Matrix (#review-matrix -> click FR-XX jumps & opens FR-XX detail)
  document.querySelectorAll('#review-matrix tbody tr.plain-row').forEach(tr => {
    const firstTd = tr.querySelector('td');
    const code = firstTd ? firstTd.textContent.trim() : '';
    if (!/^FR-\d{2}$/i.test(code)) return;
    if (firstTd.querySelector('.matrix-jump')) return;
    const a = document.createElement('a');
    a.className = 'matrix-jump';
    a.href = '#' + code;
    a.textContent = code;
    a.title = 'Nhảy tới và mở chi tiết ' + code;
    a.addEventListener('click', e => {
      e.preventDefault();
      _openAndFocusTarget(code, { updateUrlOpen: true });
    });
    firstTd.innerHTML = '';
    firstTd.appendChild(a);
  });
}

function _enhanceSectionHeaders() {
  document.querySelectorAll('section.section[id] > .sh').forEach(sh => {
    const sec = sh.parentElement;
    if (!sec || !sec.id || sh.querySelector('.sec-copy')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ic-copy sec-copy';
    btn.textContent = '🔗 Copy link mục';
    btn.title = 'Sao chép liên kết tới mục #' + sec.id;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      copyTextWithFeedback(buildPageUrl(null, { hash: sec.id }), btn);
    });
    sh.appendChild(btn);
  });
}

// ── Deep-Link Router (?open=<ID|slug>, #<ID|diag-slug>) ──
function _clearDeepTargets() {
  document.querySelectorAll('.diag-target').forEach(el => el.classList.remove('diag-target'));
}

function _resetFilterIfHidden(el) {
  if (!el || el.style.display !== 'none') return;
  const sec = el.closest ? el.closest('section.section[id]') : null;
  if (!sec || !sec.id) return;
  const secId = sec.id;
  window._sectionFilters[secId] = { module: 'ALL', query: '' };
  const input = sec.querySelector('.search-in');
  if (input) input.value = '';
  sec.querySelectorAll('.chip').forEach((c, idx) => c.classList.toggle('active', idx === 0));
  applySectionFilter(secId);
}

function _findExpandableRow(token) {
  const norm = String(token || '').trim().toLowerCase();
  if (!norm) return null;
  const rows = document.querySelectorAll('tr.fr-row[data-id]');
  for (let i = 0; i < rows.length; i++) {
    if ((rows[i].dataset.id || '').toLowerCase() === norm) return rows[i];
  }
  return null;
}

function _findElementByIdInsensitive(token) {
  const norm = String(token || '').trim().toLowerCase();
  if (!norm) return null;
  const exact = document.getElementById(token);
  if (exact) return exact;
  const all = document.querySelectorAll('[id]');
  for (let i = 0; i < all.length; i++) {
    if ((all[i].id || '').toLowerCase() === norm) return all[i];
  }
  return null;
}

function _openAndFocusTarget(rawTarget, opts) {
  const o = opts || {};
  const targetStr = String(rawTarget || '').trim();
  if (!targetStr) return false;

  // 1. Expandable rows (FR-01..27, NFR-01..16, UC-01..27, comma-separated supported)
  const tokens = targetStr.split(',').map(s => s.trim()).filter(Boolean);
  const matchedRows = tokens.map(_findExpandableRow).filter(Boolean);
  if (matchedRows.length) {
    _clearDeepTargets();
    matchedRows.forEach(row => {
      const realId = row.dataset.id;
      _resetFilterIfHidden(row);
      row.classList.add('diag-target');
      const detail = document.getElementById('detail-' + realId);
      if (detail) {
        detail.classList.add('diag-target');
        if (!detail.classList.contains('open')) toggleFR(realId, { syncUrl: false });
      }
    });
    if (o.updateUrlOpen && matchedRows.length === 1) {
      _syncRowOpenParam(matchedRows[0].dataset.id, true);
    }
    setTimeout(() => _scrollToElement(matchedRows[0], 64), 80);
    return true;
  }

  // 2. Reference items (BR-*, TC-*, formula-*, M01..*) or section anchors (#standards, #fr, ...)
  const el = _findElementByIdInsensitive(tokens[0]);
  if (el) {
    _clearDeepTargets();
    _resetFilterIfHidden(el);
    if (!el.classList.contains('section')) {
      el.classList.add('diag-target');
    }
    setTimeout(() => _scrollToElement(el, 64), 70);
    return true;
  }
  return false;
}

function _initDeepLinks(preferHash) {
  const params = new URLSearchParams(window.location.search || '');
  const openParam = (params.get('open') || params.get('diagram') || params.get('view') || '').trim();
  let rawHash = '';
  try {
    rawHash = decodeURIComponent((window.location.hash || '').replace(/^#/, '')).trim();
  } catch (_) {
    rawHash = (window.location.hash || '').replace(/^#/, '').trim();
  }

  // 1. Diagram deep-link (?open=<slug> opens Lightbox; #diag-<slug> scrolls & highlights)
  if (_lbState.items.length) {
    const matchDiagram = token => {
      if (!token) return null;
      const clean = token.replace(/^diag-/i, '').replace(/\.png$/i, '');
      const normalizedFromPath = diagramSlugFromSrc(clean);
      return _lbState.items.find(x =>
        x.slug.toLowerCase() === clean.toLowerCase() ||
        x.slug.toLowerCase() === normalizedFromPath.toLowerCase() ||
        x.src.toLowerCase().endsWith('/' + clean.toLowerCase() + '.png')
      );
    };

    if (!preferHash && openParam) {
      const openItem = matchDiagram(openParam);
      if (openItem) {
        _clearDeepTargets();
        openItem.cardEl.classList.add('diag-target');
        _scrollToElement(openItem.cardEl, 72);
        lb(openItem.src, openItem.label);
        return;
      }
    }

    if (rawHash && /^diag-/i.test(rawHash)) {
      const hashItem = matchDiagram(rawHash);
      if (hashItem) {
        _clearDeepTargets();
        hashItem.cardEl.classList.add('diag-target');
        setTimeout(() => _scrollToElement(hashItem.cardEl, 72), 60);
        return;
      }
    }
  }

  // 2. Item / Section deep-link
  const chosen = preferHash ? (rawHash || openParam) : (openParam || rawHash);
  if (chosen) _openAndFocusTarget(chosen, { updateUrlOpen: false });
}

window.addEventListener('hashchange', () => _initDeepLinks(true));

(function initSpecEnhancements() {
  _setupLightboxDom();
  _enhanceDiagramCards();
  _enhanceExpandableRows();
  _enhanceReferenceItems();
  _enhanceSectionHeaders();
  _initDeepLinks(false);
})();
