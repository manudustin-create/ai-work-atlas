var DATA = [
    {id:"AUG",name:"Augmented self",family:"Augment",layer:"Worker",x:0,overlays:["K","S0"],definition:"L'AI come strumento che fa fare di più con meno attrito. La persona resta al timone, almeno in apparenza: il rischio è lo slittamento da supporto a delega — aumenta la confidenza prima del giudizio.",signals:["Output individuale accelerato","Delega di sintesi e memoria al modello","Confidenza che cresce prima della competenza"],failure:"Comfort trap: si impara a ottenere risposte, non a capire quando fermarsi.",guardrail:"Task redesign + ownership della sintesi: il tool amplifica, non sostituisce il pensiero.",sources:["Choudary","Floridi"]},
    {id:"LIT",name:"HR as Cosmetic Trainer",family:"Augment",layer:"HR",x:0,overlays:["G"],definition:"Dall'uso del tool al redesign del lavoro: HR trasforma l'adozione in pratica verificabile. Il drift è ridurre tutto a training — uso senza riprogettazione e senza verifiche di impatto.",signals:["Formazione come checkbox","Adozione misurata in accessi, non in pratica","Nessun redesign dei processi"],failure:"HR as Adoption Trainer: formazione cosmetica, uso senza riprogettazione.",guardrail:"Fluency come standard: ruoli ridisegnati, escalation chiare, evidenze di impatto.",sources:["Floridi","Choudary"]},
    {id:"PRO",name:"Island Productivity Organization",family:"Augment",layer:"Organization",x:0,overlays:["K"],definition:"Organizzazione che usa l'AI come strumento add-on per aumentare produttività locale su task. Non cambia ruoli né decision rights: tool distribuiti creano accelerazioni locali ma incoerenza di sistema — shadow AI, duplicazioni, governance post-hoc. O si integra, o si frammenta.",signals:["Tool distribuiti senza standard comune","ROI cercato su tempo/costo/qualità media","Output non comparabili tra funzioni"],failure:"Dipendenza soft: produttività ↑, agency non necessariamente ↑; verification debt.",guardrail:"Verification standard + boundary su task/decisioni + pratiche di stop/override.",sources:["Choudary","Roversi"]},
    {id:"SIG",name:"Heteromated worker",family:"Extract",layer:"Worker",x:1,overlays:["EX"],definition:"L'interazione quotidiana diventa dato e micro-lavoro implicito: correzioni, scelte, feedback — la persona alimenta l'AI come filiera invisibile.",signals:["Interazioni convertite in training data","Feedback impliciti usati per ottimizzazione","Valore generato senza consapevolezza"],failure:"Asimmetria strutturale: la persona è necessaria ma invisibile, il valore estratto non è riconosciuto.",guardrail:"Minimizzazione, consenso, tracciabilità della filiera dati, riconoscimento del contributo.",sources:["Pasquinelli","Floridi"]},
    {id:"GWS",name:"Ghost worker",family:"Extract",layer:"Worker",x:1,overlays:["EX","K"],definition:"Lavoro umano invisibile (labeling, moderazione, micro-task) che rende possibile l'IA.",signals:["Piattaforme micro-task","Outsourcing data-labeling","Moderazione contenuti"],failure:"Invisibilità + precarizzazione (responsabilità scaricate a valle).",guardrail:"Trasparenza supply-chain + standard minimi + audit fornitori.",sources:["Gray&Suri","Ekbia","Taylor","Zuboff"]},
    {id:"CAP",name:"Cattura sapere",family:"Extract",layer:"Organization",x:1,overlays:["EX"],definition:"La cattura non è solo tecnica: è strategia. Standard, telemetria e interoperabilità determinano dipendenze, lock-in e capacità di governance. Ciò che è misurabile diventa governabile; ciò che non lo è rischia di sparire.",signals:["Data pipeline e telemetria come prerequisito","Piattaforme che impongono formati","Metriche come lingua comune dell'organizzazione"],failure:"Estrattivismo e asimmetria: l'organizzazione 'possiede' ciò che le persone generano.",guardrail:"Tracciabilità filiera + diritti su dati + limiti di riuso.",sources:["Pasquinelli","Zuboff"]},
    {id:"GHO",name:"Data Colonialism",family:"Extract",layer:"Society",x:1,overlays:["EX","K"],definition:"La vita sociale è appropriata come risorsa: dati estratti, resi proprietari e convertiti in potere/valore, con asimmetrie tra chi 'raccoglie' e chi è raccolto.",signals:["Appropriazione dati come risorsa","Asimmetria raccolta/valore","Conversione vita sociale in rendita"],failure:"Estrattivismo sociale: chi produce dati non ne beneficia.",guardrail:"Sovranità dei dati, trasparenza filiera, riequilibrio del valore.",sources:["Couldry","Mejias"]},
    {id:"ORA",name:"Sé valutato / Deferenza oracolare",family:"Judge",layer:"Worker",x:2,overlays:["S0","G"],definition:"Doppio movimento: la persona delega giudizio al modello, e il modello valuta la persona. Score, ranking e label diventano autorità cognitiva — ci si adatta al punteggio, si smette di contestare.",signals:["Decisioni mediate dal modello","Score e label che orientano accessi","Predizioni trattate come fatti"],failure:"Narcotizzazione tecnica: il plausibile diventa norma, l'identità si irrigidisce, la responsabilità evapora.",guardrail:"Contraddittorio strutturale: ricorso, override, tracciamento decisioni, spiegazioni comprensibili.",sources:["Floridi","Popper"]},
    {id:"SCO",name:"HR as Oracle Amplifier",family:"Judge",layer:"HR",x:2,overlays:["G","K"],definition:"Score e ranking orientano accessi a hiring, mobility e rewards. HR tratta l'output del modello come evidenza — il plausibile diventa criterio decisionale.",signals:["Screening automatizzato","Score di fit/potential come filtro","Ranking interni che orientano opportunità"],failure:"HR as Oracle Amplifier: tratta score come verità, delega decisioni al plausibile.",guardrail:"Audit + canali di ricorso + spiegazione sufficiente + rettifica + stop rule.",sources:["Ajunwa","Sandel"]},
    {id:"BIA",name:"Dataism",family:"Judge",layer:"Society",x:2,overlays:["G","S0"],definition:"I dati come fonte di verità 'oggettiva': l'algoritmo acquisisce autorità epistemica ('evidence-based'), anche quando misura e categorie sono scelte storiche.",signals:["Dati trattati come verità oggettiva","Autorità epistemica dell'algoritmo","Categorie storiche naturalizzate"],failure:"Sostituzione del giudizio con la metrica: ciò che non è misurabile scompare.",guardrail:"Contestabilità delle categorie, pluralità epistemica, trasparenza dei criteri.",sources:["Harari","van Dijck"]},
    {id:"KPI",name:"HR as Behavioral Governor",family:"Govern",layer:"HR",x:3,overlays:["EX","K"],definition:"Dataficazione della performance: HR governa comportamenti via dashboard, incentivi micro e nudges continui. Le metriche diventano il linguaggio del controllo.",signals:["Dashboard individuali","Feedback automatizzati","Incentivi micro che guidano comportamento"],failure:"Metric fixation: le persone ottimizzano il numero, non il lavoro.",guardrail:"Audit + canali di ricorso + spiegazione sufficiente + rettifica + stop rule.",sources:["Ajunwa","Zuboff"]},
    {id:"ROU",name:"Routing algoritmico",family:"Govern",layer:"Organization",x:3,overlays:["CT"],definition:"L'AI diventa 'direzione del lavoro' a livello di flussi: carichi, priorità, assegnazioni, scheduling, throughput. Il potere è logistico — chi decide ritmo e carico.",signals:["Ottimizzazione turni e allocazione dinamica","Monitoraggio continuo","Incentivi micro guidano comportamento senza gerarchia classica"],failure:"Controllo 'a mercato': precarietà, intensificazione, responsabilità diluita, contestabilità bassa.",guardrail:"Trasparenza su logiche di dispatch + diritti collettivi + tutele su rating/monitoring.",sources:["Roversi","Zuboff"]},
    {id:"SUR",name:"Surveillance Capitalism",family:"Govern",layer:"Society",x:3,overlays:["EX","K"],definition:"La sorveglianza si istituzionalizza come modello economico e di governo: tracciamento → predizione → intervento, con rendita e controllo distribuiti asimmetricamente.",signals:["Tracciamento → predizione → intervento","Rendita da sorveglianza","Loop di governo comportamentale"],failure:"Il monitoraggio diventa modello economico: asimmetria strutturale tra chi osserva e chi è osservato.",guardrail:"Limiti alla raccolta, trasparenza predittiva, diritti collettivi di contestazione.",sources:["Zuboff"]},
    {id:"VIS",name:"Regia visibilità",family:"Meaning",layer:"Worker",x:4,overlays:["N"],definition:"Non basta lavorare bene: bisogna essere visibili nel modo giusto. La persona interiorizza logiche di esposizione e storytelling; la reputazione diventa valuta.",signals:["Pressione a mostrarsi e auto-curarsi","Performance misurata come engagement","Storytelling come condizione di accesso"],failure:"Auto-sfruttamento reputazionale: ansia da visibilità, conformismo estetico. Non è vanità — è infrastruttura di accesso.",guardrail:"Criteri di riconoscimento espliciti, separare visibilità da impatto, prevenire 'engagement = valore'.",sources:["Han","Salmon"]},
    {id:"ATT",name:"Narrative-Driven Organization",family:"Meaning",layer:"Organization",x:4,overlays:["N","K"],definition:"La visibilità guida investimenti e reputazioni interne; la narrazione può sostituire l'evidenza se manca sensemaking. Serve un layer organizzativo di interpretazione, altrimenti il rumore diventa strategia.",signals:["Hype su iniziative","Status legato a storytelling","Decisioni guidate da ciò che 'fa scena'"],failure:"Performatività e conformismo: reputazione come capitale, pressione alla visibilità.",guardrail:"Governance di metriche reputazionali + diritto a opacità selettiva + anti-abuso.",sources:["Salmon","Klein"]},
    {id:"REP",name:"Achievement / Performance Society",family:"Meaning",layer:"Society",x:4,overlays:["N","K"],definition:"Visibilità e prestazione diventano dovere: reputazione come capitale, auto-ottimizzazione e pressione a rendersi misurabili e mostrabili.",signals:["Prestazione come dovere sociale","Auto-ottimizzazione continua","Pressione a rendersi misurabili"],failure:"Auto-sfruttamento: la persona si esaurisce inseguendo visibilità e performance.",guardrail:"Separare valore da visibilità, criteri di riconoscimento plurali, diritto alla non-esposizione.",sources:["Han"]},
    {id:"OS",name:"AI-Native Operating Organization",family:"Architect",layer:"Organization",x:5,overlays:["CT","T"],definition:"Organizzazione in cui l'AI diventa strato di coordinamento che ridisegna workflow e sistemi — non accelera task: elimina workflow. Coordination without consensus: crea visibilità condivisa e coordinamento senza accordi pre-standard.",signals:["AI coordina sistemi, non singoli task","Coordination without consensus","Workflow elimination anziché accelerazione"],failure:"Lock-in e choke points: l'OS aziendale decide cosa è possibile/legittimo.",guardrail:"Interoperabilità + fallback + auditabilità + decision rights espliciti.",sources:["Roversi","Floridi"]},
    {id:"S0",name:"Algorithmic Society",family:"Architect",layer:"Society",x:5,overlays:["S0","T"],definition:"Gli algoritmi diventano infrastruttura di coordinamento: default, accessi e criteri pratici di realtà sono mediati da sistemi computazionali contestabili solo in parte.",signals:["Algoritmi come infrastruttura sociale","Default che mediano accessi","Criteri di realtà computazionali"],failure:"Cattura infrastrutturale: le regole del gioco sono incorporate nei sistemi, contestabili solo in parte.",guardrail:"Contestabilità algoritmica, trasparenza dei criteri, pluralità delle fonti decisionali.",sources:["Schuilenburg","Peeters"]},
    {id:"QWK",name:"Quantified self",family:"Govern",layer:"Worker",x:3,overlays:["K"],definition:"La persona viene governata da metriche e scoring: target dinamici, nudging e scheduling comprimono discrezionalità.",signals:["Score/target in tempo reale","Nudging e micro-ranking","Scheduling/allocazione automatica"],failure:"Intensificazione + metric fixation (ansia, gaming, chilling effect).",guardrail:"Contestabilità + diritto di override + limiti a KPI individuali + audit log.",sources:["Zuboff","Foucault","Han","Ajunwa"]},
    {id:"AOS",name:"System-shaped self",family:"Architect",layer:"Worker",x:5,overlays:["CT"],definition:"La persona non usa un sistema: ci vive dentro. L'AI integrata nei workflow definisce cosa è facile, cosa è difficile, cosa è permesso e cosa è impensabile. Il potere è nei default e nei confini del possibile.",signals:["Next-best-action ovunque","Workflow obbligati","Assenza di opt-out reale"],failure:"Agency compressa non per imposizione esplicita, ma per architettura: eterodirezione soft e deskilling.",guardrail:"Trasparenza sui default + percorsi alternativi + modalità manuale + audit.",sources:["McLuhan","Floridi","Anders"]},
    {id:"TEC",name:"The Technological Society",family:"Augment",layer:"Society",x:0,overlays:["S0"],definition:"La 'tecnica' diventa norma generale: l'efficienza dei mezzi finisce per ordinare i fini, rendendo naturale l'ottimizzazione continua.",signals:["Efficienza come valore dominante","Mezzi che ridefiniscono i fini","Ottimizzazione continua naturalizzata"],failure:"La logica tecnica colonizza ogni ambito: ciò che è ottimizzabile diventa obbligatorio.",guardrail:"Subordinare i mezzi ai fini, preservare spazi non-ottimizzabili, pluralità di razionalità.",sources:["Ellul"]},
    {id:"SDB",name:"Score-Driven Bureaucracy",family:"Judge",layer:"Organization",x:2,overlays:["G","S0"],definition:"Organizzazione che istituzionalizza score, ranking e predizioni come base decisionale. L'output diventa 'evidenza pratica' anche quando è solo probabilità — la burocrazia si trasforma: meno eccezioni gestite da judgment, più eccezioni incasellate da score.",signals:["Dati → modello → score → regola decisionale","Probabilità trattate come evidenza","Eccezioni incasellate anziché valutate"],failure:"Deferenza e opacità: il plausibile diventa norma, identità irrigidite da label.",guardrail:"Audit + canali di ricorso + spiegazione 'sufficiente' + rettifica.",sources:["Floridi","Ajunwa"]},
    {id:"HRM",name:"HR as Reputation Manager",family:"Meaning",layer:"HR",x:4,overlays:["N"],definition:"HR scambia visibilità per valore: engagement theatre e conformismo. Chi è visibile viene premiato, chi non lo è scompare. Il drift è scambiare visibilità per valore: engagement theatre, conformismo, premi legati all'esposizione anziché all'impatto.",signals:["Visibilità interna come proxy di performance","Engagement theatre","Premi legati a esposizione, non a impatto"],failure:"HR as Reputation Manager: scambia visibilità per valore, alimenta conformismo.",guardrail:"Criteri espliciti + separare visibilità da impatto + pluralità di forme di riconoscimento.",sources:["Han","Salmon"]},
    {id:"HOS",name:"HR as Operating Model Architect",family:"Architect",layer:"HR",x:5,overlays:["CT","G"],definition:"HR co-disegna l'operating model AI-native: definisce dove sta il confine umano/AI, quali decision rights restano alle persone, come si scala governance e accountability. Il drift è duplice: abdicare il ruolo a IT/vendor, oppure progettare l'OS con lente ristretta — efficienza e controllo senza agency.",signals:["Ruoli e job architecture ridisegnati per l'AI","Decision rights umano/AI espliciti","Governance scalabile con escalation e override"],failure:"Abdication: l'OS viene disegnato senza people lens, o progettato solo per efficienza/controllo.",guardrail:"Decision rights mappati + quality of work come criterio + contestabilità strutturale + fallback manuali.",sources:["Roversi","Floridi"]}
];

var ROLE = {
    AUG:'Tool',PRO:'Tool',LIT:'Tool',TEC:'Tool',
    SIG:'Estrattiva',GWS:'Estrattiva',GHO:'Estrattiva',CAP:'Estrattiva',
    ORA:'Oracolo',SCO:'Oracolo',BIA:'Oracolo',SDB:'Oracolo',
    KPI:'Mgmt',ROU:'Mgmt',SUR:'Mgmt',QWK:'Mgmt',
    VIS:'Visibilità',ATT:'Visibilità',REP:'Visibilità',HRM:'Visibilità',
    OS:'OS',S0:'OS',AOS:'OS',HOS:'OS'
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
        "Tool": "Training trap · adozione cosmetica · formazione senza redesign",
        "Estrattiva": "— (da definire)",
        "Mgmt": "Behavioral governor · dashboard · nudging · incentivi micro",
        "Visibilità": "Reputation manager · engagement theatre · visibilità come proxy",
        "Oracolo": "Oracle amplifier · score come verità · delega al plausibile",
        "OS": "Operating model architect · decision rights · confine umano/AI"
    },
    "Organization": {
        "Tool": "Produttività a isole · bolt-on · shadow AI · frammentazione",
        "Estrattiva": "Datafication · telemetria · standard · lock-in",
        "Mgmt": "Routing · allocazione · scheduling · potere logistico",
        "Visibilità": "Narrazione · hype · sensemaking · storytelling",
        "Oracolo": "Score · decision support · alibi algoritmico · deferenza",
        "OS": "Coordination · workflow elimination · AI-native · decision rights"
    },
    "Society": {
        "Tool": "Tecnica come norma · efficienza → fini · ottimizzazione",
        "Estrattiva": "Data colonialism · appropriazione · asimmetria",
        "Mgmt": "Surveillance capitalism · tracciamento · predizione · rendita",
        "Visibilità": "Performance society · auto-ottimizzazione · visibilità come dovere",
        "Oracolo": "Dataism · autorità epistemica · verità algoritmica",
        "OS": "Algorithmic society · infrastruttura · default · contestabilità"
    }
};

var CELL_EMPTY = {
    "HR": {
        "Estrattiva": "da definire — dinamiche estrattive HR in esplorazione"
    },
    "Organization": {
    },
    "Society": {
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
