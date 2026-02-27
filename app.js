var _DATA_OK = typeof DATA !== 'undefined' && typeof COLS !== 'undefined';
if (!_DATA_OK) console.error('[AI&Work Atlas] data.js non caricato!');
var lens = null;

var OV_SVG = {
    S0: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10 A8 8 0 0 1 20 10"/><line x1="12" y1="10" x2="12" y2="18"/><circle cx="12" cy="20" r="2"/></svg>',
    EX: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="6" r="1.5" fill="currentColor" stroke="none"/><line x1="6" y1="7.5" x2="12" y2="18"/><line x1="18" y1="7.5" x2="12" y2="18"/><line x1="12" y1="7.5" x2="12" y2="18"/></svg>',
    K: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="4" x2="8" y2="20"/><line x1="8" y1="12" x2="16" y2="4"/><line x1="8" y1="12" x2="16" y2="20"/></svg>',
    T: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="14" r="2"/><circle cx="18" cy="14" r="2"/><line x1="8" y1="14" x2="16" y2="14"/><path d="M6 12 A6 6 0 0 1 18 12"/></svg>',
    N: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="4" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="20" cy="12" r="2"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="18" y2="12"/></svg>',
    CT: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 12 L10 8 L14 16 L17 12"/></svg>',
    G: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="4" x2="6" y2="20"/><line x1="18" y1="4" x2="18" y2="20"/><line x1="12" y1="8" x2="12" y2="16"/></svg>'
};

var OV_ICON = OV_SVG;

function $(s) { return document.querySelector(s); }
function $$(s) { return document.querySelectorAll(s); }

function validateData() {
    var colKeys = COLS.map(function(c) { return c.k; });
    var warns = [];
    DATA.forEach(function(d) {
        if (!d.role) warns.push('DATA id="' + d.id + '" ha role null (manca in ROLE map)');
        if (d.role && colKeys.indexOf(d.role) === -1) warns.push('DATA id="' + d.id + '" role="' + d.role + '" non corrisponde a nessuna colonna');
        if (ROWS.indexOf(d.layer) === -1) warns.push('DATA id="' + d.id + '" layer="' + d.layer + '" non corrisponde a nessuna riga');
    });
    ROWS.forEach(function(row) {
        colKeys.forEach(function(col) {
            var items = DATA.filter(function(d) { return d.layer === row && d.role === col; });
            var hasKw = CELL_KWS[row] && CELL_KWS[row][col] && CELL_KWS[row][col] !== '—';
            if (items.length > 0 && !hasKw) warns.push('Cella ' + row + '×' + col + ': ha ' + items.length + ' tile ma manca in CELL_KWS');
        });
    });
    if (warns.length) {
        console.warn('[AI&Work Atlas] Validazione dati (' + warns.length + ' warning):');
        warns.forEach(function(w) { console.warn('  ⚠ ' + w); });
    } else {
        console.log('[AI&Work Atlas] Validazione dati OK');
    }
}

function init() {
    validateData();
    buildBands();
    buildLenses();
    buildMatrix();
    $('#search').addEventListener('input', filter);
    $('#reset').addEventListener('click', resetView);
    $('#view-toggle').addEventListener('change', toggleView);
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') hideDetail(); });
    checkHash();
    window.addEventListener('hashchange', checkHash);
}



function buildBands() {
    var container = $('#bands');
    BANDS.forEach(function(b) {
        var div = document.createElement('div');
        div.className = 'band ' + b.css;

        var tag = document.createElement('span');
        tag.className = 'band-tag';
        tag.textContent = b.code;
        div.appendChild(tag);

        var title = document.createElement('span');
        title.className = 'band-title';
        title.textContent = b.title;
        div.appendChild(title);

        var text = document.createElement('p');
        text.className = 'band-text';
        text.textContent = b.text;
        div.appendChild(text);

        var link = document.createElement('span');
        link.className = 'band-link';
        link.textContent = 'Scheda →';
        link.onclick = function() { showDetail(b.link); };
        div.appendChild(link);

        container.appendChild(div);
    });
}

function buildLenses() {
    var c = $('#lenses');
    OVERLAYS.forEach(function(o) {
        var b = document.createElement('button');
        b.className = 'lens';
        b.dataset.code = o.c;
        b.innerHTML = '<span class="lens-icon">' + OV_SVG[o.c] + '</span><span class="lens-code">' + o.c + '</span>';
        b.title = o.l + ': ' + o.d;
        b.onclick = function() { toggleLens(o.c); };
        c.appendChild(b);
    });
}

function toggleLens(code) {
    lens = lens === code ? null : code;
    $$('.lens').forEach(function(b) { b.classList.toggle('active', b.dataset.code === lens); });
    
    var m = $('#matrix');
    m.classList.remove('show-s0', 'show-ex');
    if (lens === 'S0') m.classList.add('show-s0');
    if (lens === 'EX') m.classList.add('show-ex');
    
    filter();
}

function toggleView() {
    var m = $('#matrix');
    var isImages = $('#view-toggle').checked;
    m.classList.toggle('view-images', isImages);
}

function buildMatrix() {
    var m = $('#matrix');
    m.innerHTML = '';

    // Grid dinamica: colonne e righe calcolate da COLS/ROWS
    m.style.gridTemplateColumns = '100px repeat(' + COLS.length + ', 1fr)';
    m.style.gridTemplateRows = 'auto auto repeat(' + ROWS.length + ', minmax(110px, 1fr))';

    // Build header via DOM to avoid innerHTML += destroying event listeners
    var corner = document.createElement('div');
    corner.className = 'matrix-corner';
    m.appendChild(corner);
    
    COLS.forEach(function(c) {
        var ch = document.createElement('div');
        ch.className = 'col-head';
        ch.innerHTML = '<h2>' + c.t + '</h2><p>' + c.s + '</p>';
        m.appendChild(ch);
    });
    
    var subCorner = document.createElement('div');
    subCorner.className = 'subhead-corner';
    subCorner.innerHTML = '<span title="INFORG (Floridi): the self as an informational organism shaped within socio-technical infrastructures. This strip encodes: Identity / Datafied agency / Contestability per role.">Inforg</span>';
    m.appendChild(subCorner);

    var inforgStrip = document.createElement('div');
    inforgStrip.className = 'inforg-strip';
    inforgStrip.style.gridTemplateColumns = 'repeat(' + COLS.length + ', 1fr)';
    inforgStrip.innerHTML = COLS.map(function(col){
        var t = INFORG_TRIADS[col.k];
        if(!t) return '<div class="inforg-cell" title="—">—</div>';
        var visible = t.id;
        var tip = t.id + ' self — agency: ' + t.ag + ', contestability: ' + t.ct;
        return '<div class="inforg-cell" title="' + tip + '">' + visible + '</div>';
    }).join('');
    m.appendChild(inforgStrip);
    
    ROWS.forEach(function(row) {
        var rh = document.createElement('div');
        rh.className = 'row-head';
        rh.innerHTML = '<h2>' + row + '</h2><span class="row-sub">' + (ROW_SUB[row] || '') + '</span>';
        m.appendChild(rh);
        
        COLS.forEach(function(col) {
            var items = DATA.filter(function(d) { return d.layer === row && d.role === col.k; });
            var hasS0 = items.some(function(d) { return d.overlays.includes('S0'); });
            var hasEX = items.some(function(d) { return d.overlays.includes('EX'); });
            
            var cellKw = CELL_KWS[row] && CELL_KWS[row][col.k] ? CELL_KWS[row][col.k] : '—';
            var cellImg = CELL_IMAGES[row] && CELL_IMAGES[row][col.k] ? CELL_IMAGES[row][col.k] : null;
            var cellEmpty = CELL_EMPTY[row] && CELL_EMPTY[row][col.k] ? CELL_EMPTY[row][col.k] : null;
            
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.hasS0 = hasS0;
            cell.dataset.hasEx = hasEX;
            
            // Cell inner container
            var inner = document.createElement('div');
            inner.className = 'cell-inner';
            
            // Front side (text)
            var front = document.createElement('div');
            front.className = 'cell-front';
            
            if (cellKw === '—' && cellEmpty) {
                // Empty cell with semantic annotation
                var emptyDiv = document.createElement('div');
                emptyDiv.className = 'cell-empty-note';
                var parts = cellEmpty.split('→');
                if (parts.length > 1) {
                    emptyDiv.innerHTML = parts[0] + '→ <span class="ref">' + parts[1].trim() + '</span>';
                } else {
                    emptyDiv.textContent = cellEmpty;
                }
                front.appendChild(emptyDiv);
            } else {
                // Add anthropological label for Worker row
                if (row === 'Worker' && ANTHRO_LABELS[col.k]) {
                    var anthroLabel = document.createElement('div');
                    anthroLabel.className = 'cell-anthro-label';
                    anthroLabel.textContent = ANTHRO_LABELS[col.k];
                    front.appendChild(anthroLabel);
                }
                
                var kwDiv = document.createElement('div');
                kwDiv.className = 'cell-kws' + (cellKw === '—' ? ' empty' : '');
                kwDiv.textContent = cellKw;
                front.appendChild(kwDiv);
            }
            
            if (items.length > 0) {
                var tilesContainer = document.createElement('div');
                tilesContainer.className = 'tiles-container';
                
                items.forEach(function(item) {
                    var t = document.createElement('div');
                    t.className = 'tile';
                    t.dataset.id = item.id;
                    t.dataset.f = item.family;
                    t.dataset.ov = item.overlays.join(',');
                    t.dataset.search = (item.id + ' ' + item.name + ' ' + item.definition + ' ' + cellKw + ' ' + item.overlays.join(' ')).toLowerCase();
                    var icons = item.overlays.map(function(o){
                        var sym = OV_ICON[o] || '•';
                        return '<span class="ov-badge" data-ov="' + o + '" title="' + o + '"><span class="ov-sym">' + sym + '</span><span class="ov-code">[' + o + ']</span></span>';
                    }).join('');
                    t.innerHTML =
                        '<div class="tile-ovrow">' + icons + '</div>' +
                        '<div class="tile-name">' + item.name + '</div>';
                    t.onclick = function() { showDetail(item.id); };
                    tilesContainer.appendChild(t);
                });
                
                front.appendChild(tilesContainer);
            }
            
            inner.appendChild(front);
            
            // Back side (image or placeholder)
            var back = document.createElement('div');
            back.className = 'cell-back';
            if (cellImg) {
                back.innerHTML = '<img src="' + cellImg + '" alt="' + row + ' / ' + col.k + '">';
            } else {
                var placeholder = document.createElement('div');
                placeholder.className = 'cell-placeholder';
                placeholder.textContent = 'no img';
                back.appendChild(placeholder);
            }
            inner.appendChild(back);
            
            cell.appendChild(inner);
            
            m.appendChild(cell);
        });
        

    });
}

function filter() {
    var q = $('#search').value.toLowerCase();
    
    $$('.tile').forEach(function(t) {
        var searchText = t.dataset.search || '';
        var ov = t.dataset.ov.split(',');
        
        var show = !q || searchText.includes(q);
        var highlight = lens && ov.includes(lens);
        var dim = lens && !highlight;
        
        t.classList.toggle('dim', dim && show);
        t.classList.toggle('highlight', highlight && show);
        t.style.display = show ? '' : 'none';
    });
}

function showDetail(id) {
    var item = DATA.find(function(d) { return d.id === id; });
    if (!item) return;

    var FAMILY_COLOR = {
        Augment:'--c-augment',
        Govern:'--c-govern',
        Meaning:'--c-meaning',
        Extract:'--c-extract',
        Judge:'--c-judge',
        Architect:'--c-architect'
    };

    $$('.tile').forEach(function(t) { t.classList.remove('active'); });
    var tileEl = document.querySelector('.tile[data-id="' + id + '"]');
    if (tileEl) tileEl.classList.add('active');

    history.replaceState(null, '', '#' + id);

    document.getElementById('panel-placeholder').style.display = 'none';
    var pc = document.getElementById('panel-content');
    pc.style.display = 'block';
    pc.innerHTML = '';

    // Helper: crea elemento con classe e testo
    function el(tag, cls, text) {
        var e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text) e.textContent = text;
        return e;
    }

    // Header
    var header = el('div', 'panel-header');

    var idEl = el('div', 'panel-id', item.id);
    idEl.style.color = 'var(' + (FAMILY_COLOR[item.family] || '--grey-50') + ')';
    header.appendChild(idEl);

    header.appendChild(el('div', 'panel-name', item.name));

    var meta = el('div', 'panel-meta');
    [['Family', item.family], ['Layer', item.layer], ['Role', item.role || '—']].forEach(function(pair) {
        var tag = el('div', 'panel-tag');
        tag.textContent = pair[0] + ': ';
        var span = document.createElement('span');
        span.textContent = pair[1];
        tag.appendChild(span);
        meta.appendChild(tag);
    });
    header.appendChild(meta);

    var overlays = el('div', 'panel-overlays');
    item.overlays.forEach(function(o) {
        overlays.appendChild(el('span', 'panel-overlay', o));
    });
    header.appendChild(overlays);

    var close = el('div', 'panel-close', '✕ Chiudi');
    close.onclick = hideDetail;
    header.appendChild(close);

    pc.appendChild(header);

    // Body
    var body = el('div', 'panel-body');

    // Sezione generica
    function addSection(title, content) {
        var sec = el('div', 'panel-section');
        sec.appendChild(el('h3', null, title));
        sec.appendChild(content);
        body.appendChild(sec);
    }

    addSection('Definizione', el('p', null, item.definition));

    var ul = document.createElement('ul');
    item.signals.forEach(function(s) {
        ul.appendChild(el('li', null, s));
    });
    addSection('Segnali', ul);

    var failDiv = el('div', 'panel-callout failure', item.failure);
    addSection('Failure mode', failDiv);

    var guardDiv = el('div', 'panel-callout guardrail', item.guardrail);
    addSection('Guardrail', guardDiv);

    var srcDiv = el('div', 'panel-sources');
    item.sources.forEach(function(s, i) {
        if (i > 0) srcDiv.appendChild(document.createTextNode(' · '));
        srcDiv.appendChild(el('span', 'panel-source', s));
    });
    addSection('Sources', srcDiv);

    pc.appendChild(body);
}

function hideDetail() {
    $$('.tile').forEach(function(t) { t.classList.remove('active'); });
    document.getElementById('panel-placeholder').style.display = 'flex';
    document.getElementById('panel-content').style.display = 'none';
    history.replaceState(null, '', location.pathname);
}

function resetView() {
    lens = null;
    $$('.lens').forEach(function(b) { b.classList.remove('active'); });
    $('#matrix').classList.remove('show-s0', 'show-ex', 'view-images');
    $('#view-toggle').checked = false;
    $('#search').value = '';
    $$('.tile').forEach(function(t) {
        t.classList.remove('dim', 'highlight', 'active');
        t.style.display = '';
    });
    hideDetail();
}

function checkHash() {
    var h = location.hash.slice(1);
    if (h && DATA.find(function(d) { return d.id === h; })) {
        showDetail(h);
        // Scroll fino al tile corrispondente
        var tileEl = document.querySelector('.tile[data-id="' + h + '"]');
        if (tileEl) tileEl.scrollIntoView({behavior:'smooth', block:'center'});
    }
}

init();
