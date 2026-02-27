var DATA = [
    {id:"AUG",name:"Potenziamento locale",family:"Augment",layer:"Worker",x:0,overlays:["K","S0"],definition:"Potenzia l'output locale — velocità e volume — ma rischia la delega comoda: sintesi e memoria esternalizzate senza crescita di agency.",signals:["Output individuale accelerato","Delega di sintesi e memoria al modello","Benefici diseguali tra persone/team"],failure:"Comfort trap: produttività sale, capacità critica scende.",guardrail:"Task redesign + ownership della sintesi: il tool amplifica, non sostituisce il pensiero.",sources:["Choudary","Floridi"]},
    {id:"LIT",name:"Literacy → Fluency",family:"Augment",layer:"HR",x:0,overlays:["G"],definition:"Capacità organizzativa: dall'uso del tool al redesign del lavoro.",signals:["Linee guida operative","Pratiche di revisione"],failure:"Formazione cosmetica.",guardrail:"Fluency come standard: ruoli, escalation, evidenze.",sources:["Floridi","Choudary"]},
    {id:"PRO",name:"Produttività a isole",family:"Augment",layer:"Organization",x:0,overlays:["K"],definition:"Adozione bolt-on: isole di automazione senza redesign dei vincoli.",signals:["Tool diversi per team","Processi core invariati"],failure:"Efficienza locale, inefficienza sistemica.",guardrail:"Standard minimi + mappa decision loop prima di scalare.",sources:["Choudary","Roversi"]},
    {id:"SIG",name:"Miniera segnali",family:"Extract",layer:"Worker",x:1,overlays:["EX"],definition:"Persona diventa training data.",signals:["Raccolta tracce","Classificazioni"],failure:"Espropriazione.",guardrail:"Minimizzazione, consenso.",sources:["Pasquinelli","Floridi"]},
    {id:"GWS",name:"Ghost worker",family:"Extract",layer:"Worker",x:1,overlays:["EX","K"],definition:"Lavoro umano invisibile (labeling, moderazione, micro-task) che rende possibile l'IA.",signals:["Piattaforme micro-task","Outsourcing data-labeling","Moderazione contenuti"],failure:"Invisibilità + precarizzazione (responsabilità scaricate a valle).",guardrail:"Trasparenza supply-chain + standard minimi + audit fornitori.",sources:["Gray&Suri","Ekbia","Taylor","Zuboff"]},
    {id:"CAP",name:"Cattura sapere",family:"Extract",layer:"Organization",x:1,overlays:["EX"],definition:"Appropriazione general intellect.",signals:["Standardizzazione","Lock-in"],failure:"Monopolio.",guardrail:"Governance + portabilità.",sources:["Pasquinelli","Marx"]},
    {id:"GHO",name:"Lavoro invisibile",family:"Extract",layer:"Society",x:1,overlays:["EX","K"],definition:"Catene globali di lavoro non riconosciuto.",signals:["Moderazione","Micro-tasking"],failure:"Invisibilità sistemica.",guardrail:"Supply-chain accountability.",sources:["Ekbia","Taylor"]},
    {id:"ORA",name:"Deferenza oracolare",family:"Judge",layer:"Worker",x:2,overlays:["S0","G"],definition:"Si delega giudizio al modello.",signals:["Decisioni col modello"],failure:"Deresponsabilizzazione.",guardrail:"Contraddittorio.",sources:["Floridi","Popper"]},
    {id:"SCO",name:"Score/Gatekeeping",family:"Judge",layer:"HR",x:2,overlays:["G","K"],definition:"Ranking orienta accessi.",signals:["Screening auto","Ranking interni"],failure:"Cristallizzazione.",guardrail:"Audit, rettifica.",sources:["Ajunwa","Sandel"]},
    {id:"BIA",name:"Bias infrastrutturale",family:"Judge",layer:"Society",x:2,overlays:["G","S0"],definition:"Il passato diventa norma.",signals:["Stabilità ranking"],failure:"Riproduzione disug.",guardrail:"Metriche equità.",sources:["Ajunwa","Zuboff"]},
    {id:"KPI",name:"Regime KPI",family:"Govern",layer:"HR",x:3,overlays:["EX","K"],definition:"Dataficazione della performance.",signals:["Dashboard individuali","Feedback automatizzati"],failure:"Metric fixation.",guardrail:"KPI sobri + contestazione.",sources:["Ajunwa","Zuboff"]},
    {id:"ROU",name:"Routing algoritmico",family:"Govern",layer:"Organization",x:3,overlays:["CT"],definition:"Allocazione del lavoro via regole: riduce attrito, comprime agency.",signals:["Assegnazioni automatiche","Ottimizzazione tempi"],failure:"Ottimizzazione cieca.",guardrail:"Gestione eccezioni + accountability.",sources:["Roversi","Zuboff"]},
    {id:"SUR",name:"Sorveglianza",family:"Govern",layer:"Society",x:3,overlays:["EX","K"],definition:"Monitoraggio pervasivo come infrastruttura.",signals:["Tracciamento sistematico","Valutazioni continue"],failure:"Chilling effect.",guardrail:"Limiti, trasparenza, audit.",sources:["Zuboff","Foucault"]},
    {id:"VIS",name:"Regia visibilità",family:"Meaning",layer:"Worker",x:4,overlays:["N"],definition:"Definisce ciò che emerge: attenzione come valuta.",signals:["Pressione a mostrarsi","Metriche engagement"],failure:"Auto-sorveglianza.",guardrail:"Criteri espliciti.",sources:["Han","Salmon"]},
    {id:"ATT",name:"Economia attenzione",family:"Meaning",layer:"Organization",x:4,overlays:["N","K"],definition:"Potere passa per canali di attenzione.",signals:["Storytelling","Hype"],failure:"Propaganda org.",guardrail:"Evidenze + contraddittorio.",sources:["Salmon","Klein"]},
    {id:"REP",name:"Capitale reputazionale",family:"Meaning",layer:"Society",x:4,overlays:["N","K"],definition:"Stratificazione via reputazione.",signals:["Ranking","Status"],failure:"Esclusione.",guardrail:"Pluralità criteri.",sources:["Han","Sandel"]},
    {id:"POD",name:"AI Pods",family:"Architect",layer:"Organization",x:5,overlays:["CT"],definition:"Riduzione unità operative.",signals:["Team piccoli"],failure:"Isolamento.",guardrail:"Interfacce standard.",sources:["Roversi","Coase"]},
    {id:"OS",name:"Motore organizzativo",family:"Architect",layer:"Organization",x:5,overlays:["CT","T"],definition:"AI orchestra workflow.",signals:["Decision loop","Audit trail"],failure:"Chokepoint.",guardrail:"Governance-by-design.",sources:["Roversi","Floridi"]},
    {id:"S0",name:"Sfondo cognitivo",family:"Architect",layer:"Society",x:5,overlays:["S0","T"],definition:"Pre-filtri diventano default.",signals:["Default","Dipendenza ranking"],failure:"Cattura epistemica.",guardrail:"Pluralità fonti.",sources:["Floridi","McLuhan"]},
    {id:"QWK",name:"Quantified self",family:"Govern",layer:"Worker",x:3,overlays:["K"],definition:"La persona viene governata da metriche e scoring: target dinamici, nudging e scheduling comprimono discrezionalità.",signals:["Score/target in tempo reale","Nudging e micro-ranking","Scheduling/allocazione automatica"],failure:"Intensificazione + metric fixation (ansia, gaming, chilling effect).",guardrail:"Contestabilità + diritto di override + limiti a KPI individuali + audit log.",sources:["Zuboff","Foucault","Han","Ajunwa"]},
    {id:"AOS",name:"Action-space preconfigured",family:"Architect",layer:"Worker",x:5,overlays:["CT"],definition:"Quando l'AI è infrastruttura, la persona agisce dentro percorsi di default: l'ambiente pre-configura opzioni e sequenze.",signals:["Next-best-action ovunque","Workflow obbligati","Assenza di opt-out reale"],failure:"Collasso dell'agency (eterodirezione soft) + deskilling.",guardrail:"Trasparenza sui default + percorsi alternativi + modalità manuale + audit.",sources:["McLuhan","Floridi","Anders"]}
];

var ROLE = {
    AUG:'Tool',PRO:'Tool',LIT:'Tool',
    SIG:'Estrattiva',GWS:'Estrattiva',GHO:'Estrattiva',CAP:'Estrattiva',
    ORA:'Oracolo',SCO:'Oracolo',BIA:'Oracolo',
    KPI:'Mgmt',ROU:'Mgmt',SUR:'Mgmt',QWK:'Mgmt',
    VIS:'Visibilità',ATT:'Visibilità',REP:'Visibilità',
    POD:'OS',OS:'OS',S0:'OS',AOS:'OS'
};

DATA.forEach(function(d) { d.role = ROLE[d.id] || null; });

var COLS = [
            {k:'Estrattiva',t:'Extractive',s:'datafying'},
            {k:'Tool',t:'Tool',s:'assistive'},
            {k:'Oracolo',t:'Oracle',s:'inferential'},
            {k:'Mgmt',t:'Algorithmic Mgmt',s:'actuating'},
            {k:'Visibilità',t:'Visibility',s:'reputational'},
            {k:'OS',t:'Operating System',s:'infrastructural'}
        ];

// Anthropological conception labels for Worker row (mapped by column key)
var ANTHRO_LABELS = {
    'Estrattiva': 'Heteromated / Ghost',
    'Tool': 'Augmented',
    'Oracolo': 'Antiquato / Idiota',
    'Mgmt': 'Quantified',
    'Visibilità': 'Branded',
    'OS': 'System-shaped'
};

var INFORG_TRIADS = {
    'Estrattiva': { id:'captured',   ag:'heteromated',    ct:'opaque' },
    'Tool':       { id:'assisted',   ag:'augmented',      ct:'user-controlled' },
    'Oracolo':    { id:'antiquated',  ag:'delegated',      ct:'forfeited' },
    'Mgmt':       { id:'measured',   ag:'constrained',    ct:'procedural' },
    'Visibilità': { id:'performed',  ag:'curated',        ct:'social' },
    'OS':         { id:'system-shaped', ag:'preconfigured', ct:'infrastructural' }
};




var ROWS = ['Worker','HR','Organization','Society'];

var ROW_SUB = {
    "Worker":"MICRO",
    "HR":"MESO",
    "Organization":"MESO",
    "Society":"MACRO"
};

var CELL_KWS = {
    "Worker": {
        "Tool": "Output↑ locale · delega sintesi/memoria · agency?",
        "Estrattiva": "Segnali · tracce · training data (heteromated/ghost)",
        "Mgmt": "score · target · nudging · scheduling · telemetry",
        "Visibilità": "Visibilità · attenzione · auto-brand",
        "Oracolo": "Autorità cognitiva · delega giudizio · narcotizzazione · deresponsabilizzazione",
        "OS": "Ambiente pre-configurato · default · opzioni vincolate · eterodirezione soft"
    },
    "HR": {
        "Tool": "Fluency · redesign · capability",
        "Estrattiva": "Normalizzazione cattura · riuso dati · persona come fonte dati",        "Mgmt": "KPI · dataficazione · telemetria",
        "Visibilità": "—",
        "Oracolo": "Score · gatekeeping · accessi",
        "OS": "—"
    },
    "Organization": {
        "Tool": "Isole · bolt-on · incoerenza",
        "Estrattiva": "Cattura · standard · lock-in",
        "Mgmt": "Routing · allocazione · ottimizzazione",
        "Visibilità": "Attenzione · hype · storytelling",
        "Oracolo": "—",
        "OS": "Pods · workflow · orchestration"
    },
    "Society": {
        "Tool": "—",
        "Estrattiva": "Lavoro invisibile · supply chain · micro-task",
        "Mgmt": "Sorveglianza · monitoraggio · chilling",
        "Visibilità": "Reputazione · status · ranking",
        "Oracolo": "Bias · norma · autorità",
        "OS": "Default · pre-filtri · system 0"
    }
};

var CELL_EMPTY = {
    "HR": {
        "Visibilità": "individual dynamic → see Worker/VIS",
        "OS": "org. orchestration → see Organization"
    },
    "Organization": {
        "Oracolo": "gatekeeping in HR → see SCO"
    },
    "Society": {
        "Tool": "local augmentation → see Worker/AUG"
    }
};

/* CELL_IMAGES: mappa immagini per flip celle.
   Usa path relativi (assets/img/...). */
var CELL_IMAGES = {
    "Worker": {
        "Tool": "assets/img/worker-tool.png",
        "Estrattiva": "assets/worker_extract.jpg",
        "Mgmt": "assets/img/worker-mgmt.jpg",
        "Visibilità": "assets/img/worker-visibilita.png"
    },
    "HR": {
        "Oracolo": "assets/hr_oracle.jpg",
        "Mgmt": "assets/hr_mgmt.jpg"
    },
    "Organization": {
        "Tool": "assets/org_tool.jpg",
        "Estrattiva": "assets/org_extract.jpg",
        "Mgmt": "assets/org_mgmt.jpg",
        "Visibilità": "assets/org_visibility.jpg",
        "OS": "assets/org_os.jpg"
    },
    "Society": {
        "Estrattiva": "assets/society_extract.jpg",
        "Oracolo": "assets/society_oracle.jpg",
        "Mgmt": "assets/img/society-mgmt.jpg",
        "Visibilità": "assets/img/society-visibilita.png",
        "OS": "assets/society_os.jpg"
    }
};

var OVERLAYS = [
    {c:'K',l:'K-shaped',d:'Polarizzazione: augmentation diseguale + gatekeeping + reputazione.'},
    {c:'T',l:'Trust',d:'Scarsità critica; richiede contestabilità e trasparenza.'},
    {c:'N',l:'Narrazione',d:'Visibilità come capitale; stratifica accessi.'},
    {c:'CT',l:'Coord.tax',d:'Coordinare costa; spinge pods e interfacce.'},
    {c:'EX',l:'Extractive',d:'Segnali→catene invisibili→rendita e lock-in.'},
    {c:'G',l:'Governance',d:'Audit, rettifica, contraddittorio.'},
    {c:'S0',l:'System 0',d:'Default cognitivi pre-orientano decisioni.'}
];

OVERLAYS.forEach(function(o) { o.n = DATA.filter(function(d) { return d.overlays.includes(o.c); }).length; });

var BANDS = [
    {code:'S0', css:'band-s0', title:'Sfondo Cognitivo — AI as System 0', text:'AI come ambiente di pre-selezione e sintesi: i default diventano comportamento. Rischio: deferenza, appiattimento del contraddittorio, cattura dei criteri di realtà.', link:'S0'},
    {code:'EX', css:'band-ex', title:'Sfondo Economico-Politico — General Intellect', text:'Cattura del sapere sociale e trasformazione in rendita infrastrutturale. Rischio: lock-in, appropriazione, lavoro invisibile e polarizzazione.', link:'CAP'}
];
