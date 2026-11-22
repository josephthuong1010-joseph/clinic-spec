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
  const loc = window.location;
  const isDiagPage = /diagrams(?:\.html)?$/i.test(loc.pathname);
  if (loc.protocol === 'file:') {
    const baseDir = loc.href.replace(/[^/]*(\?.*)?(#.*)?$/, '');
    return baseDir + 'diagrams.html?open=' + encodeURIComponent(slug);
  }
  const targetPath = isDiagPage
    ? loc.pathname
    : loc.pathname.replace(/[^/]*$/, '') + (loc.pathname.endsWith('.html') ? 'diagrams.html' : 'diagrams');
  return loc.origin + targetPath + '?open=' + encodeURIComponent(slug);
}

function copyTextWithFeedback(text, btnEl) {
  const flash = () => {
    if (!btnEl) return;
    const orig = btnEl.dataset.origLabel || btnEl.textContent;
    btnEl.dataset.origLabel = orig;
    btnEl.textContent = '✓ Đã copy';
    btnEl.classList.add('copied');
    clearTimeout(btnEl._copyTimer);
    btnEl._copyTimer = setTimeout(() => {
      btnEl.textContent = orig;
      btnEl.classList.remove('copied');
    }, 1600);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(flash).catch(() => {
      window.prompt('Sao chép liên kết sơ đồ:', text);
    });
  } else {
    window.prompt('Sao chép liên kết sơ đồ:', text);
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

// ── Auto-enhance Diagram Cards & Deep-Link Router ──
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

function _initDeepLinks() {
  const params = new URLSearchParams(window.location.search);
  const openParam = (params.get('open') || params.get('diagram') || params.get('view') || '').trim();
  const rawHash = decodeURIComponent((window.location.hash || '').replace(/^#/, '')).trim();

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

    const openItem = matchDiagram(openParam);
    if (openItem) {
      openItem.cardEl.classList.add('diag-target');
      openItem.cardEl.scrollIntoView({ behavior: 'auto', block: 'center' });
      lb(openItem.src, openItem.label);
      return;
    }

    if (rawHash && /^diag-/i.test(rawHash)) {
      const hashItem = matchDiagram(rawHash);
      if (hashItem) {
        hashItem.cardEl.classList.add('diag-target');
        setTimeout(() => hashItem.cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
        return;
      }
    }
  }

  // 2. FR / NFR / UC deep-link (#FR-01, #NFR-01, #UC-27 or ?open=FR-01)
  const rowTargetId = openParam || rawHash;
  if (rowTargetId) {
    const row = document.querySelector(`tr.fr-row[data-id="${CSS.escape ? CSS.escape(rowTargetId) : rowTargetId}"]`);
    if (row) {
      row.classList.add('diag-target');
      const detail = document.getElementById('detail-' + rowTargetId);
      if (detail && !detail.classList.contains('open')) toggleFR(rowTargetId);
      setTimeout(() => row.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    }
  }
}

(function initSpecEnhancements() {
  _setupLightboxDom();
  _enhanceDiagramCards();
  _initDeepLinks();
})();
