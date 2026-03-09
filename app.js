var _DATA_OK = typeof DATA !== 'undefined' && typeof COLS !== 'undefined';
if (!_DATA_OK) console.error('[AI&Work Atlas] data.js non caricato!');
var lens = null;
var activeTour = null;
var activeTourStep = 0;

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
    $('#intro-btn').addEventListener('click', showIntro);
    $('#tour-btn').addEventListener('click', showTourList);
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
        ch.addEventListener('click', (function(col) { return function() { showColDetail(col.k); }; })(c));
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
        rh.addEventListener('click', (function(r) { return function() { showRowDetail(r); }; })(row));
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

function showColDetail(colKey) {
    var col = COLS.find(function(c) { return c.k === colKey; });
    if (!col) return;
    $$('.tile').forEach(function(t) { t.classList.remove('active'); });
    var pp = document.getElementById('panel-placeholder');
    var pc = document.getElementById('panel-content');
    pp.style.display = 'none';
    pc.style.display = 'block';
    pc.innerHTML = '';
    history.replaceState(null, '', location.pathname + '#col-' + colKey);

    var header = document.createElement('div');
    header.className = 'panel-header';
    var idEl = document.createElement('div');
    idEl.className = 'panel-id';
    idEl.textContent = '↕';
    idEl.style.color = 'var(--grey-50)';
    header.appendChild(idEl);
    var nameEl = document.createElement('div');
    nameEl.className = 'panel-name';
    nameEl.textContent = col.t;
    header.appendChild(nameEl);
    var metaEl = document.createElement('div');
    metaEl.className = 'panel-meta';
    var tag = document.createElement('div');
    tag.className = 'panel-tag';
    tag.textContent = col.s;
    metaEl.appendChild(tag);
    header.appendChild(metaEl);
    var closeA = document.createElement('a');
    closeA.className = 'panel-close';
    closeA.href = '#';
    closeA.textContent = '✕ chiudi';
    closeA.addEventListener('click', function(e) { e.preventDefault(); hideDetail(); });
    header.appendChild(closeA);
    pc.appendChild(header);

    var body = document.createElement('div');
    body.className = 'panel-body';
    if (col.desc) {
        var sec = document.createElement('div');
        sec.className = 'panel-section';
        var h3 = document.createElement('h3');
        h3.textContent = 'Descrizione';
        sec.appendChild(h3);
        var p = document.createElement('p');
        p.textContent = col.desc;
        sec.appendChild(p);
        body.appendChild(sec);
    }
    var tiles = DATA.filter(function(d) { return d.role === colKey; });
    if (tiles.length) {
        var sec2 = document.createElement('div');
        sec2.className = 'panel-section';
        var h3b = document.createElement('h3');
        h3b.textContent = 'Celle in questa colonna';
        sec2.appendChild(h3b);
        var ul = document.createElement('ul');
        tiles.forEach(function(d) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#' + d.id;
            a.textContent = d.layer + ' → ' + d.name;
            a.addEventListener('click', function(e) { e.preventDefault(); showDetail(d.id); });
            li.appendChild(a);
            ul.appendChild(li);
        });
        sec2.appendChild(ul);
        body.appendChild(sec2);
    }
    pc.appendChild(body);
}

function showRowDetail(rowName) {
    var desc = ROW_DESC[rowName] || '';
    var sub = ROW_SUB[rowName] || '';
    $$('.tile').forEach(function(t) { t.classList.remove('active'); });
    var pp = document.getElementById('panel-placeholder');
    var pc = document.getElementById('panel-content');
    pp.style.display = 'none';
    pc.style.display = 'block';
    pc.innerHTML = '';
    history.replaceState(null, '', location.pathname + '#row-' + rowName);

    var header = document.createElement('div');
    header.className = 'panel-header';
    var idEl = document.createElement('div');
    idEl.className = 'panel-id';
    idEl.textContent = '↔';
    idEl.style.color = 'var(--grey-50)';
    header.appendChild(idEl);
    var nameEl = document.createElement('div');
    nameEl.className = 'panel-name';
    nameEl.textContent = rowName;
    header.appendChild(nameEl);
    var metaEl = document.createElement('div');
    metaEl.className = 'panel-meta';
    var tag = document.createElement('div');
    tag.className = 'panel-tag';
    tag.textContent = sub;
    metaEl.appendChild(tag);
    header.appendChild(metaEl);
    var closeA = document.createElement('a');
    closeA.className = 'panel-close';
    closeA.href = '#';
    closeA.textContent = '✕ chiudi';
    closeA.addEventListener('click', function(e) { e.preventDefault(); hideDetail(); });
    header.appendChild(closeA);
    pc.appendChild(header);

    var body = document.createElement('div');
    body.className = 'panel-body';
    if (desc) {
        var sec = document.createElement('div');
        sec.className = 'panel-section';
        var h3 = document.createElement('h3');
        h3.textContent = 'Descrizione';
        sec.appendChild(h3);
        var p = document.createElement('p');
        p.textContent = desc;
        sec.appendChild(p);
        body.appendChild(sec);
    }
    var tiles = DATA.filter(function(d) { return d.layer === rowName; });
    if (tiles.length) {
        var sec2 = document.createElement('div');
        sec2.className = 'panel-section';
        var h3b = document.createElement('h3');
        h3b.textContent = 'Celle in questa riga';
        sec2.appendChild(h3b);
        var ul = document.createElement('ul');
        tiles.forEach(function(d) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#' + d.id;
            a.textContent = (d.role || '') + ' → ' + d.name;
            a.addEventListener('click', function(e) { e.preventDefault(); showDetail(d.id); });
            li.appendChild(a);
            ul.appendChild(li);
        });
        sec2.appendChild(ul);
        body.appendChild(sec2);
    }
    pc.appendChild(body);
}

function showIntro() {
    $$('.tile').forEach(function(t) { t.classList.remove('active'); });
    var pp = document.getElementById('panel-placeholder');
    var pc = document.getElementById('panel-content');
    pp.style.display = 'none';
    pc.style.display = 'block';
    pc.innerHTML = '';
    history.replaceState(null, '', location.pathname + '#intro');

    var header = document.createElement('div');
    header.className = 'panel-header';
    var idEl = document.createElement('div');
    idEl.className = 'panel-id';
    idEl.textContent = '◇';
    idEl.style.color = 'var(--grey-50)';
    header.appendChild(idEl);
    var nameEl = document.createElement('div');
    nameEl.className = 'panel-name';
    nameEl.textContent = 'AI & Work Atlas';
    header.appendChild(nameEl);
    var closeA = document.createElement('a');
    closeA.className = 'panel-close';
    closeA.href = '#';
    closeA.textContent = '✕ chiudi';
    closeA.addEventListener('click', function(e) { e.preventDefault(); hideDetail(); });
    header.appendChild(closeA);
    pc.appendChild(header);

    var body = document.createElement('div');
    body.className = 'panel-body';
    var sec = document.createElement('div');
    sec.className = 'panel-section';
    var h3 = document.createElement('h3');
    h3.textContent = 'Guida alla mappa';
    sec.appendChild(h3);
    INTRO_TEXT.split('\n\n').forEach(function(para) {
        var p = document.createElement('p');
        p.textContent = para;
        sec.appendChild(p);
    });
    body.appendChild(sec);
    pc.appendChild(body);
}

function showTourList() {
    endTour();
    $$('.tile').forEach(function(t) { t.classList.remove('active'); });
    var pp = document.getElementById('panel-placeholder');
    var pc = document.getElementById('panel-content');
    pp.style.display = 'none';
    pc.style.display = 'block';
    pc.innerHTML = '';
    history.replaceState(null, '', location.pathname + '#tours');

    var header = document.createElement('div');
    header.className = 'panel-header';
    var idEl = document.createElement('div');
    idEl.className = 'panel-id';
    idEl.textContent = '⟡';
    idEl.style.color = 'var(--accent)';
    header.appendChild(idEl);
    var nameEl = document.createElement('div');
    nameEl.className = 'panel-name';
    nameEl.textContent = 'Percorsi guidati';
    header.appendChild(nameEl);
    var closeA = document.createElement('a');
    closeA.className = 'panel-close';
    closeA.href = '#';
    closeA.textContent = '✕ chiudi';
    closeA.addEventListener('click', function(e) { e.preventDefault(); hideDetail(); });
    header.appendChild(closeA);
    pc.appendChild(header);

    var body = document.createElement('div');
    body.className = 'panel-body';
    var sec = document.createElement('div');
    sec.className = 'panel-section';
    var h3 = document.createElement('h3');
    h3.textContent = 'Scegli un percorso';
    sec.appendChild(h3);
    var intro = document.createElement('p');
    intro.textContent = 'Quattro percorsi di lettura attraverso la mappa. Ogni percorso collega celle diverse con testi che ne illuminano le connessioni.';
    sec.appendChild(intro);
    body.appendChild(sec);

    TOURS.forEach(function(tour, i) {
        var card = document.createElement('div');
        card.className = 'tour-card';
        var title = document.createElement('div');
        title.className = 'tour-card-title';
        title.textContent = tour.title;
        card.appendChild(title);
        var sub = document.createElement('div');
        sub.className = 'tour-card-sub';
        sub.textContent = tour.subtitle;
        card.appendChild(sub);
        var steps = document.createElement('div');
        steps.className = 'tour-card-steps';
        steps.textContent = tour.steps.length + ' tappe';
        card.appendChild(steps);
        card.addEventListener('click', (function(idx) { return function() { startTour(idx); }; })(i));
        body.appendChild(card);
    });

    pc.appendChild(body);
}

function startTour(tourIndex) {
    activeTour = tourIndex;
    activeTourStep = 0;
    showTourStep();
}

function showTourStep() {
    if (activeTour === null) return;
    var tour = TOURS[activeTour];
    if (!tour) return;
    var isClosing = activeTourStep >= tour.steps.length;
    var step = isClosing ? null : tour.steps[activeTourStep];
    var item = step ? DATA.find(function(d) { return d.id === step.tile; }) : null;

    // Evidenzia tile nella matrice
    var tourTileIds = tour.steps.map(function(s) { return s.tile; });
    $$('.tile').forEach(function(t) {
        t.classList.remove('active', 'tour-active', 'tour-path');
        if (tourTileIds.indexOf(t.dataset.id) !== -1) {
            if (!isClosing && t.dataset.id === step.tile) {
                t.classList.add('tour-active');
            } else {
                t.classList.add('tour-path');
            }
        }
    });

    // Scroll alla tile corrente
    if (!isClosing && step) {
        var tileEl = document.querySelector('.tile[data-id="' + step.tile + '"]');
        if (tileEl) tileEl.scrollIntoView({behavior:'smooth', block:'center'});
    }

    // Deep link
    if (isClosing) {
        history.replaceState(null, '', location.pathname + '#tour-' + tour.id + '-end');
    } else {
        history.replaceState(null, '', location.pathname + '#tour-' + tour.id + '-' + activeTourStep);
    }

    // Popola side panel
    var pp = document.getElementById('panel-placeholder');
    var pc = document.getElementById('panel-content');
    pp.style.display = 'none';
    pc.style.display = 'block';
    pc.innerHTML = '';

    // Header percorso
    var header = document.createElement('div');
    header.className = 'panel-header';
    var idEl = document.createElement('div');
    idEl.className = 'panel-id';
    idEl.textContent = '⟡';
    idEl.style.color = 'var(--accent)';
    header.appendChild(idEl);
    var nameEl = document.createElement('div');
    nameEl.className = 'panel-name';
    nameEl.textContent = tour.title;
    header.appendChild(nameEl);
    var metaEl = document.createElement('div');
    metaEl.className = 'panel-meta';
    var indicator = document.createElement('div');
    indicator.className = 'panel-tag';
    if (isClosing) {
        indicator.textContent = 'Chiusura';
    } else {
        indicator.textContent = 'Tappa ' + (activeTourStep + 1) + ' di ' + tour.steps.length;
    }
    metaEl.appendChild(indicator);
    header.appendChild(metaEl);
    var closeA = document.createElement('a');
    closeA.className = 'panel-close';
    closeA.href = '#';
    closeA.textContent = '✕ esci dal percorso';
    closeA.addEventListener('click', function(e) { e.preventDefault(); endTour(); hideDetail(); });
    header.appendChild(closeA);
    pc.appendChild(header);

    var body = document.createElement('div');
    body.className = 'panel-body';

    if (isClosing) {
        // Testo di chiusura
        var closingSec = document.createElement('div');
        closingSec.className = 'panel-section';
        var ch3 = document.createElement('h3');
        ch3.textContent = 'Chiusura';
        closingSec.appendChild(ch3);
        var cp = document.createElement('div');
        cp.className = 'tour-connective';
        cp.textContent = tour.closing;
        closingSec.appendChild(cp);
        body.appendChild(closingSec);
    } else {
        // Testo connettivo
        if (step.text) {
            var connSec = document.createElement('div');
            connSec.className = 'panel-section';
            var connH3 = document.createElement('h3');
            connH3.textContent = activeTourStep === 0 ? 'Introduzione' : 'Connessione';
            connSec.appendChild(connH3);
            var connP = document.createElement('div');
            connP.className = 'tour-connective';
            connP.textContent = step.text;
            connSec.appendChild(connP);
            body.appendChild(connSec);
        }

        // Contenuto tile (come showDetail ma inline)
        if (item) {
            var FAMILY_COLOR = {
                Augment:'--c-augment', Govern:'--c-govern', Meaning:'--c-meaning',
                Extract:'--c-extract', Judge:'--c-judge', Architect:'--c-architect'
            };

            var tileSec = document.createElement('div');
            tileSec.className = 'panel-section';
            var tileH3 = document.createElement('h3');
            tileH3.textContent = item.name;
            tileH3.style.color = 'var(' + (FAMILY_COLOR[item.family] || '--grey-50') + ')';
            tileH3.style.fontSize = '0.72rem';
            tileH3.style.textTransform = 'none';
            tileH3.style.fontWeight = '500';
            tileSec.appendChild(tileH3);
            var defP = document.createElement('p');
            defP.textContent = item.definition;
            tileSec.appendChild(defP);
            body.appendChild(tileSec);

            var sigSec = document.createElement('div');
            sigSec.className = 'panel-section';
            var sigH3 = document.createElement('h3');
            sigH3.textContent = 'Segnali';
            sigSec.appendChild(sigH3);
            var ul = document.createElement('ul');
            item.signals.forEach(function(s) {
                var li = document.createElement('li');
                li.textContent = s;
                ul.appendChild(li);
            });
            sigSec.appendChild(ul);
            body.appendChild(sigSec);

            var failSec = document.createElement('div');
            failSec.className = 'panel-section';
            var failH3 = document.createElement('h3');
            failH3.textContent = 'Failure mode';
            failSec.appendChild(failH3);
            var failDiv = document.createElement('div');
            failDiv.className = 'panel-callout failure';
            failDiv.textContent = item.failure;
            failSec.appendChild(failDiv);
            body.appendChild(failSec);

            var guardSec = document.createElement('div');
            guardSec.className = 'panel-section';
            var guardH3 = document.createElement('h3');
            guardH3.textContent = 'Guardrail';
            guardSec.appendChild(guardH3);
            var guardDiv = document.createElement('div');
            guardDiv.className = 'panel-callout guardrail';
            guardDiv.textContent = item.guardrail;
            guardSec.appendChild(guardDiv);
            body.appendChild(guardSec);
        }
    }

    // Navigazione
    var nav = document.createElement('div');
    nav.className = 'tour-nav';

    var prevBtn = document.createElement('button');
    prevBtn.className = 'tour-nav-btn';
    if (activeTourStep === 0) {
        prevBtn.textContent = '← Percorsi';
        prevBtn.addEventListener('click', function() { endTour(); showTourList(); });
    } else {
        prevBtn.textContent = '← Indietro';
        prevBtn.addEventListener('click', function() { activeTourStep--; showTourStep(); });
    }
    nav.appendChild(prevBtn);

    var stepIndicator = document.createElement('span');
    stepIndicator.className = 'tour-step-indicator';
    if (isClosing) {
        stepIndicator.textContent = '✓';
    } else {
        stepIndicator.textContent = (activeTourStep + 1) + ' / ' + tour.steps.length;
    }
    nav.appendChild(stepIndicator);

    var nextBtn = document.createElement('button');
    nextBtn.className = 'tour-nav-btn';
    if (isClosing) {
        nextBtn.textContent = 'Percorsi →';
        nextBtn.addEventListener('click', function() { endTour(); showTourList(); });
    } else if (activeTourStep === tour.steps.length - 1) {
        nextBtn.textContent = 'Chiusura →';
        nextBtn.addEventListener('click', function() { activeTourStep++; showTourStep(); });
    } else {
        nextBtn.textContent = 'Avanti →';
        nextBtn.addEventListener('click', function() { activeTourStep++; showTourStep(); });
    }
    nav.appendChild(nextBtn);

    body.appendChild(nav);
    pc.appendChild(body);
}

function endTour() {
    activeTour = null;
    activeTourStep = 0;
    $$('.tile').forEach(function(t) {
        t.classList.remove('tour-active', 'tour-path');
    });
}

function resetView() {
    lens = null;
    endTour();
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
    if (!h) return;
    if (h === 'intro') { showIntro(); return; }
    if (h === 'tours') { showTourList(); return; }
    if (h.indexOf('tour-') === 0) {
        var parts = h.slice(5);
        var lastDash = parts.lastIndexOf('-');
        if (lastDash !== -1) {
            var tourId = parts.slice(0, lastDash);
            var stepPart = parts.slice(lastDash + 1);
            var tourIdx = TOURS.findIndex(function(t) { return t.id === tourId; });
            if (tourIdx !== -1) {
                activeTour = tourIdx;
                activeTourStep = stepPart === 'end' ? TOURS[tourIdx].steps.length : parseInt(stepPart, 10) || 0;
                showTourStep();
                return;
            }
        }
    }
    if (h.indexOf('col-') === 0) { showColDetail(h.slice(4)); return; }
    if (h.indexOf('row-') === 0) { showRowDetail(h.slice(4)); return; }
    if (DATA.find(function(d) { return d.id === h; })) {
        showDetail(h);
        var tileEl = document.querySelector('.tile[data-id="' + h + '"]');
        if (tileEl) tileEl.scrollIntoView({behavior:'smooth', block:'center'});
    }
}

init();
