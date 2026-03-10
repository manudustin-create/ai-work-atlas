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
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideOverlayPanel();
        }
    });
    // Backdrop rimosso — navigazione back del browser gestita da popstate
    window.addEventListener('popstate', function() { checkHash(); });
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
    m.style.gridTemplateRows = 'auto auto repeat(' + ROWS.length + ', 1fr)';

    // Build header via DOM to avoid innerHTML += destroying event listeners
    var corner = document.createElement('div');
    corner.className = 'matrix-corner';
    m.appendChild(corner);
    
    COLS.forEach(function(c) {
        var ch = document.createElement('div');
        ch.className = 'col-head' + (c.group ? ' col-grouped' : '');
        var html = '';
        if (c.group) html += '<span class="col-group-label">' + c.group + '</span>';
        html += '<h2>' + c.t + '</h2><p>' + c.s + '</p>';
        ch.innerHTML = html;
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
            
            if (cellImg) {
                var thumb = document.createElement('div');
                thumb.className = 'cell-thumb';
                thumb.innerHTML = '<img src="' + cellImg + '" alt="' + row + ' / ' + col.k + '">';
                thumb.style.cursor = 'pointer';
                thumb.onclick = (function(itms) { return function() { if (itms.length > 0) showDetail(itms[0].id); }; })(items);
                front.appendChild(thumb);
            }

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
                    var isAnthro = (row === 'Worker' && ANTHRO_LABELS[col.k]);
                    var displayName = isAnthro ? ANTHRO_LABELS[col.k] : item.name;
                    t.innerHTML =
                        '<div class="tile-ovrow">' + icons + '</div>' +
                        '<div class="tile-name' + (isAnthro ? ' anthro' : '') + '">' + displayName + '</div>';
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
        Augment:'--c-augment', Govern:'--c-govern', Meaning:'--c-meaning',
        Extract:'--c-extract', Judge:'--c-judge', Architect:'--c-architect'
    };

    // Highlight tile in matrix
    $$('.tile').forEach(function(t) { t.classList.remove('active'); });
    var tileEl = document.querySelector('.tile[data-id="' + id + '"]');
    if (tileEl) tileEl.classList.add('active');

    history.pushState(null, '', '#' + id);

    var cellImg = CELL_IMAGES[item.layer] && CELL_IMAGES[item.layer][item.role] ? CELL_IMAGES[item.layer][item.role] : null;

    var html = '';
    html += '<div class="overlay-header">';
    html += '<div>';
    html += '<div class="overlay-id" style="color:var(' + (FAMILY_COLOR[item.family] || '--grey-50') + ')">' + item.id + '</div>';
    html += '<div class="overlay-name">' + item.name + '</div>';
    html += '<div class="overlay-meta">';
    html += '<div class="overlay-tag">Family: <span>' + item.family + '</span></div>';
    html += '<div class="overlay-tag">Layer: <span>' + item.layer + '</span></div>';
    html += '<div class="overlay-tag">Role: <span>' + (item.role || '—') + '</span></div>';
    html += '</div>';
    html += '<div class="overlay-overlays">';
    item.overlays.forEach(function(o) { html += '<span class="overlay-ov-badge">' + o + '</span>'; });
    html += '</div>';
    html += '</div>';
    html += '<button class="overlay-close" onclick="hideOverlayPanel()">← Mappa</button>';
    html += '</div>';

    html += '<div class="overlay-columns' + (cellImg ? ' has-image' : '') + '">';

    if (cellImg) {
        html += '<div class="overlay-col-img">';
        html += '<img class="overlay-img" src="' + cellImg + '" alt="' + item.name + '">';
        html += '</div>';
    }

    html += '<div class="overlay-col-text">';
    html += '<div class="overlay-body">';
    html += '<div class="overlay-section"><h3>Definizione</h3><p>' + item.definition + '</p></div>';

    html += '<div class="overlay-section"><h3>Segnali</h3><ul>';
    item.signals.forEach(function(s) { html += '<li>' + s + '</li>'; });
    html += '</ul></div>';

    html += '<div class="overlay-section"><h3>Failure mode</h3><div class="overlay-callout failure">' + item.failure + '</div></div>';
    html += '<div class="overlay-section"><h3>Guardrail</h3><div class="overlay-callout guardrail">' + item.guardrail + '</div></div>';

    html += '<div class="overlay-section"><h3>Sources</h3><div class="overlay-sources">';
    item.sources.forEach(function(s, i) {
        if (i > 0) html += ' · ';
        html += '<span class="overlay-source">' + s + '</span>';
    });
    html += '</div></div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    showOverlayPanel(html);
}

function hideDetail() {
    hideOverlayPanel();
    endTour();
}

function showColDetail(colKey) {
    var col = COLS.find(function(c) { return c.k === colKey; });
    if (!col) return;
    history.pushState(null, '', location.pathname + '#col-' + colKey);

    var html = '';
    html += '<div class="overlay-header">';
    html += '<div>';
    html += '<div class="overlay-id" style="color:var(--grey-50)">↕</div>';
    html += '<div class="overlay-name">' + col.t + '</div>';
    html += '<div class="overlay-meta">';
    if (col.group) html += '<div class="overlay-tag">Gruppo: <span>' + col.group + '</span></div>';
    html += '<div class="overlay-tag">' + col.s + '</div>';
    html += '</div>';
    html += '</div>';
    html += '<button class="overlay-close" onclick="hideOverlayPanel()">← Mappa</button>';
    html += '</div>';

    html += '<div class="overlay-body">';
    if (col.desc) {
        html += '<div class="overlay-section"><h3>Descrizione</h3><p>' + col.desc + '</p></div>';
    }
    var tiles = DATA.filter(function(d) { return d.role === colKey; });
    if (tiles.length) {
        html += '<div class="overlay-section"><h3>Celle in questa colonna</h3><ul>';
        tiles.forEach(function(d) {
            html += '<li><a href="#' + d.id + '" onclick="event.preventDefault();hideOverlayPanel();showDetail(\'' + d.id + '\')">' + d.layer + ' → ' + d.name + '</a></li>';
        });
        html += '</ul></div>';
    }
    html += '</div>';

    showOverlayPanel(html);
}

function showRowDetail(rowName) {
    var desc = ROW_DESC[rowName] || '';
    var sub = ROW_SUB[rowName] || '';
    history.pushState(null, '', location.pathname + '#row-' + rowName);

    var html = '';
    html += '<div class="overlay-header">';
    html += '<div>';
    html += '<div class="overlay-id" style="color:var(--grey-50)">↔</div>';
    html += '<div class="overlay-name">' + rowName + '</div>';
    html += '<div class="overlay-meta"><div class="overlay-tag">' + sub + '</div></div>';
    html += '</div>';
    html += '<button class="overlay-close" onclick="hideOverlayPanel()">← Mappa</button>';
    html += '</div>';

    html += '<div class="overlay-body">';
    if (desc) {
        html += '<div class="overlay-section"><h3>Descrizione</h3><p>' + desc + '</p></div>';
    }
    var tiles = DATA.filter(function(d) { return d.layer === rowName; });
    if (tiles.length) {
        html += '<div class="overlay-section"><h3>Celle in questa riga</h3><ul>';
        tiles.forEach(function(d) {
            html += '<li><a href="#' + d.id + '" onclick="event.preventDefault();hideOverlayPanel();showDetail(\'' + d.id + '\')">' + (d.role || '') + ' → ' + d.name + '</a></li>';
        });
        html += '</ul></div>';
    }
    html += '</div>';

    showOverlayPanel(html);
}

function showIntro() {
    history.pushState(null, '', location.pathname + '#intro');

    var html = '';
    html += '<div class="overlay-header">';
    html += '<div>';
    html += '<div class="overlay-id" style="color:var(--grey-50)">◇</div>';
    html += '<div class="overlay-name">AI & Work Atlas</div>';
    html += '</div>';
    html += '<button class="overlay-close" onclick="hideOverlayPanel()">← Mappa</button>';
    html += '</div>';

    html += '<div class="overlay-body"><div class="overlay-section"><h3>Guida alla mappa</h3>';
    INTRO_TEXT.split('\n\n').forEach(function(para) {
        html += '<p>' + para + '</p>';
    });
    html += '</div></div>';

    showOverlayPanel(html);
}

function showTourList() {
    endTour();
    history.pushState(null, '', location.pathname + '#tours');

    var html = '';
    html += '<div class="overlay-header">';
    html += '<div>';
    html += '<div class="overlay-id" style="color:var(--accent)">⟡</div>';
    html += '<div class="overlay-name">Percorsi guidati</div>';
    html += '</div>';
    html += '<button class="overlay-close" onclick="hideOverlayPanel()">← Mappa</button>';
    html += '</div>';

    html += '<div class="overlay-body">';
    html += '<div class="overlay-section"><h3>Scegli un percorso</h3>';
    html += '<p>Cinque percorsi di lettura attraverso la mappa. Ogni percorso collega celle diverse con testi che ne illuminano le connessioni.</p></div>';

    TOURS.forEach(function(tour, i) {
        html += '<div class="tour-card" onclick="hideOverlayPanel();startTour(' + i + ')">';
        html += '<div class="tour-card-title">' + tour.title + '</div>';
        html += '<div class="tour-card-sub">' + tour.subtitle + '</div>';
        html += '<div class="tour-card-steps">' + tour.steps.length + ' tappe</div>';
        html += '</div>';
    });

    html += '</div>';

    showOverlayPanel(html);
}

function showOverlayPanel(html) {
    var page = $('#detail-page');
    var content = $('#detail-content');
    content.innerHTML = html;
    page.classList.add('visible');
    document.body.classList.add('detail-open');
    window.scrollTo(0, 0);
}

function hideOverlayPanel() {
    history.back();
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

    var FAMILY_COLOR = {
        Augment:'--c-augment', Govern:'--c-govern', Meaning:'--c-meaning',
        Extract:'--c-extract', Judge:'--c-judge', Architect:'--c-architect'
    };

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

    // Build popup content
    var html = '';
    html += '<div class="overlay-header">';
    html += '<div>';
    html += '<div class="overlay-id" style="color:var(--accent)">⟡</div>';
    html += '<div class="overlay-name">' + tour.title + '</div>';
    html += '<div class="overlay-meta"><div class="overlay-tag">';
    html += isClosing ? 'Chiusura' : 'Tappa ' + (activeTourStep + 1) + ' di ' + tour.steps.length;
    html += '</div></div>';
    html += '</div>';
    html += '<button class="overlay-close" onclick="endTour();hideOverlayPanel()">✕</button>';
    html += '</div>';

    html += '<div class="overlay-body">';

    if (isClosing) {
        html += '<div class="overlay-section"><div class="tour-connective">' + tour.closing + '</div></div>';
    } else {
        // Testo connettivo
        if (step.text) {
            html += '<div class="overlay-section"><h3>' + (activeTourStep === 0 ? 'Introduzione' : 'Connessione') + '</h3>';
            html += '<div class="tour-connective">' + step.text + '</div></div>';
        }

        // Contenuto tile
        if (item) {
            html += '<div class="overlay-section"><h3 style="color:var(' + (FAMILY_COLOR[item.family] || '--grey-50') + ');font-size:0.72rem;text-transform:none;font-weight:500">' + item.name + '</h3>';
            html += '<p>' + item.definition + '</p></div>';

            html += '<div class="overlay-section"><h3>Segnali</h3><ul>';
            item.signals.forEach(function(s) { html += '<li>' + s + '</li>'; });
            html += '</ul></div>';

            html += '<div class="overlay-section"><h3>Failure mode</h3><div class="overlay-callout failure">' + item.failure + '</div></div>';
            html += '<div class="overlay-section"><h3>Guardrail</h3><div class="overlay-callout guardrail">' + item.guardrail + '</div></div>';
        }
    }

    // Navigazione
    html += '<div class="tour-nav">';
    if (activeTourStep === 0) {
        html += '<button class="tour-nav-btn" onclick="endTour();showTourList()">← Percorsi</button>';
    } else {
        html += '<button class="tour-nav-btn" onclick="activeTourStep--;showTourStep()">← Indietro</button>';
    }
    html += '<span class="tour-step-indicator">' + (isClosing ? '✓' : (activeTourStep + 1) + ' / ' + tour.steps.length) + '</span>';
    if (isClosing) {
        html += '<button class="tour-nav-btn" onclick="endTour();showTourList()">Percorsi →</button>';
    } else if (activeTourStep === tour.steps.length - 1) {
        html += '<button class="tour-nav-btn" onclick="activeTourStep++;showTourStep()">Chiusura →</button>';
    } else {
        html += '<button class="tour-nav-btn" onclick="activeTourStep++;showTourStep()">Avanti →</button>';
    }
    html += '</div>';

    html += '</div>';

    showOverlayPanel(html);
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
    hideOverlayPanel();
    $$('.lens').forEach(function(b) { b.classList.remove('active'); });
    $('#matrix').classList.remove('show-s0', 'show-ex', 'view-images');
    $('#view-toggle').checked = false;
    $('#search').value = '';
    $$('.tile').forEach(function(t) {
        t.classList.remove('dim', 'highlight', 'active');
        t.style.display = '';
    });
}

function checkHash() {
    var h = location.hash.slice(1);
    if (!h) {
        // Nessun hash → torna alla mappa
        var page = $('#detail-page');
        if (page.classList.contains('visible')) {
            page.classList.remove('visible');
            document.body.classList.remove('detail-open');
            $('#detail-content').innerHTML = '';
            endTour();
        }
        return;
    }
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
