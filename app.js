/* app.js — Shared utilities: Mermaid (diagrams.html only), Lightbox */

// Mermaid — chỉ khởi tạo khi CDN được tải (diagrams.html)
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

// Toggle FR detail rows (requirements.html)
function toggleFR(id) {
  const row = document.getElementById('detail-' + id);
  const arr = document.getElementById('arr-' + id);
  if (!row) return;
  const isOpen = row.classList.toggle('open');
  if (arr) arr.textContent = isOpen ? '▾' : '▸';
  // Render Mermaid diagrams on first open
  if (isOpen && typeof mermaid !== 'undefined') {
    const nodes = Array.from(row.querySelectorAll('.mermaid:not([data-processed="true"])'));
    if (nodes.length) mermaid.run({ nodes });
  }
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
