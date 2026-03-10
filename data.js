var DATA = [
    {id:"AUG",name:"Augmented self",family:"Augment",layer:"Worker",x:0,overlays:["K","S0"],definition:"L'AI come strumento che fa fare di più con meno attrito. La persona resta al timone, almeno in apparenza: il rischio è lo slittamento da supporto a delega — aumenta la confidenza prima del giudizio.",signals:["Output individuale accelerato","Delega di sintesi e memoria al modello","Confidenza che cresce prima della competenza"],failure:"Comfort trap: si impara a ottenere risposte, non a capire quando fermarsi.",guardrail:"Task redesign + ownership della sintesi: il tool amplifica, non sostituisce il pensiero.",sources:["Choudary","Floridi"]},
    {id:"LIT",name:"HR as Cosmetic Trainer",family:"Augment",layer:"HR",x:0,overlays:["G"],definition:"Dall'uso del tool al redesign del lavoro: HR trasforma l'adozione in pratica verificabile. Il drift è ridurre tutto a training — uso senza riprogettazione e senza verifiche di impatto.",signals:["Formazione come checkbox","Adozione misurata in accessi, non in pratica","Nessun redesign dei processi"],failure:"HR as Adoption Trainer: formazione cosmetica, uso senza riprogettazione.",guardrail:"Fluency come standard: ruoli ridisegnati, escalation chiare, evidenze di impatto.",sources:["Floridi","Choudary"]},
    {id:"PRO",name:"Island Productivity Organization",family:"Augment",layer:"Organization",x:0,overlays:["K"],definition:"Organizzazione che usa l'AI come strumento add-on per aumentare produttività locale su task. Non cambia ruoli né decision rights: tool distribuiti creano accelerazioni locali ma incoerenza di sistema — shadow AI, duplicazioni, governance post-hoc. O si integra, o si frammenta.",signals:["Tool distribuiti senza standard comune","ROI cercato su tempo/costo/qualità media","Output non comparabili tra funzioni"],failure:"Dipendenza soft: produttività ↑, agency non necessariamente ↑; verification debt.",guardrail:"Verification standard + boundary su task/decisioni + pratiche di stop/override.",sources:["Choudary","Roversi"]},
    {id:"SIG",name:"Heteromated worker",family:"Extract",layer:"Worker",x:1,overlays:["EX"],definition:"L'interazione quotidiana diventa dato e micro-lavoro implicito: correzioni, scelte, feedback — la persona alimenta l'AI come filiera invisibile.",signals:["Interazioni convertite in training data","Feedback impliciti usati per ottimizzazione","Valore generato senza consapevolezza"],failure:"Asimmetria strutturale: la persona è necessaria ma invisibile, il valore estratto non è riconosciuto.",guardrail:"Minimizzazione, consenso, tracciabilità della filiera dati, riconoscimento del contributo.",sources:["Pasquinelli","Floridi"]},
    {id:"GWS",name:"Ghost worker",family:"Extract",layer:"Worker",x:1,overlays:["EX","K"],definition:"Lavoro umano invisibile (labeling, moderazione, micro-task) che rende possibile l'IA.",signals:["Piattaforme micro-task","Outsourcing data-labeling","Moderazione contenuti"],failure:"Invisibilità + precarizzazione (responsabilità scaricate a valle).",guardrail:"Trasparenza supply-chain + standard minimi + audit fornitori.",sources:["Gray&Suri","Ekbia","Taylor","Zuboff"]},
    {id:"ABF",name:"HR as Absent Function",family:"Extract",layer:"HR",x:1,overlays:["EX","K"],definition:"La dinamica più strutturalmente invisibile del ghost work: non c'è HR. Nessuno negozia condizioni, nessuno tutela diritti, nessuno rappresenta interessi. L'assenza della funzione people non è un'omissione — è l'architettura del sistema. Dove il lavoro è più precario, HR è più assente.",signals:["Nessuna funzione HR per ghost worker e micro-tasker","Condizioni di lavoro non governate","Assenza di rappresentanza, tutele, sviluppo"],failure:"HR as Absent Function: l'assenza di governance è il meccanismo dell'occlusione — chi è invisibile non ha nessuno che lo renda visibile.",guardrail:"Estensione della responsabilità HR alla supply chain AI · Standard minimi · Riconoscimento istituzionale del lavoro invisibile.",sources:["Gray&Suri","Beck"]},
    {id:"TAX",name:"HR as Labor Taxonomist",family:"Extract",layer:"HR",x:1,overlays:["EX"],definition:"HR classifica il lavoro: dipendente, collaboratore, stagista, fornitore, utente. Ogni categoria determina visibilità, diritti e protezioni. Con l'AI, la classificazione diventa meccanismo di occlusione: chi corregge output è 'utente che dà feedback' o 'persona che addestra il sistema'? La tassonomia HR crea l'invisibilità — ciò che non ha una categoria non esiste.",signals:["Nuove forme di lavoro non classificate (prompt curation, data hygiene, AI correction)","Contributi impliciti non riconosciuti nei job profile","Gap tra ciò che le persone fanno e ciò che il ruolo descrive"],failure:"HR as Labor Taxonomist: le categorie esistenti non catturano il lavoro reale — il non-classificato diventa invisibile.",guardrail:"Revisione continua delle tassonomie · Riconoscimento esplicito del lavoro AI-related · Job architecture che include contributi impliciti.",sources:["Ekbia","Casilli"]},
    {id:"LOO",name:"Layered Outsourcing Organization",family:"Extract",layer:"Organization",x:1,overlays:["EX","K"],definition:"L'organizzazione frammenta la forza lavoro attraverso strati di outsourcing, subappalto e piattaforme. L'impresa lead beneficia del lavoro ma non lo impiega, non lo vede, non lo governa. Ogni strato di intermediazione aggiunge distanza e riduce responsabilità — il lavoro invisibile è a valle, il valore è a monte.",signals:["Catene di subappalto multi-livello","Esternalizzazione sistematica del lavoro AI (labeling, moderazione, annotazione)","Nessuna visibilità sulle condizioni a valle"],failure:"L'organizzazione cattura il valore del lavoro invisibile senza portarne il costo — responsabilità diluita per design.",guardrail:"Trasparenza sulla supply chain del lavoro · Standard minimi per subappaltatori · Responsabilità solidale.",sources:["Weil","Gray&Suri"]},
    {id:"CAP",name:"Cattura sapere",family:"Extract",layer:"Organization",x:1,overlays:["EX"],definition:"La cattura non è solo tecnica: è strategia. Standard, telemetria e interoperabilità determinano dipendenze, lock-in e capacità di governance. Ciò che è misurabile diventa governabile; ciò che non lo è rischia di sparire.",signals:["Data pipeline e telemetria come prerequisito","Piattaforme che impongono formati","Metriche come lingua comune dell'organizzazione"],failure:"Estrattivismo e asimmetria: l'organizzazione 'possiede' ciò che le persone generano.",guardrail:"Tracciabilità filiera + diritti su dati + limiti di riuso.",sources:["Pasquinelli","Zuboff"]},
    {id:"BEC",name:"Risk Society",family:"Extract",layer:"Society",x:1,overlays:["EX","K"],definition:"La modernizzazione produce rischi sistemici strutturalmente invisibili: distribuiti, impossibili da attribuire, scaricati sulla singola persona. Non c'è welfare, non c'è rete — solo irresponsabilità organizzata. La persona che svolge ghost work porta il rischio da sola.",signals:["Rischi distribuiti e non attribuibili","Irresponsabilità organizzata","Assenza di welfare e tutele per chi è invisibile"],failure:"Individualizzazione del rischio: il sistema produce il danno, la persona lo subisce — senza strumenti per contestare.",guardrail:"Responsabilità istituzionale, tutele collettive, visibilità dei rischi sistemici.",sources:["Beck"]},
    {id:"BAU",name:"Liquid Society",family:"Extract",layer:"Society",x:1,overlays:["EX"],definition:"I confini si dissolvono: tra lavoro e non-lavoro, tra uso e produzione, tra consumo e addestramento. Il prosumer è simultaneamente fruitore dell'AI e suo trainer — l'estrazione è così fluida da essere indistinguibile dalla normalità. Nessuna struttura stabile da contestare.",signals:["Confini lavoro/non-lavoro dissolti","Prosumer: utente e trainer insieme","Precarietà strutturale delle relazioni"],failure:"Fluidità come trappola: se tutto è liquido, nulla è contestabile — non ci sono confini da difendere.",guardrail:"Riconoscimento del contributo implicito, diritto alla disconnessione, confini espliciti tra uso e lavoro.",sources:["Bauman"]},
    {id:"ORA",name:"Sé valutato / Deferenza oracolare",family:"Judge",layer:"Worker",x:2,overlays:["S0","G"],definition:"Doppio movimento: la persona delega giudizio al modello, e il modello valuta la persona. Score, ranking e label diventano autorità cognitiva — ci si adatta al punteggio, si smette di contestare.",signals:["Decisioni mediate dal modello","Score e label che orientano accessi","Predizioni trattate come fatti"],failure:"Narcotizzazione tecnica: il plausibile diventa norma, l'identità si irrigidisce, la responsabilità evapora.",guardrail:"Contraddittorio strutturale: ricorso, override, tracciamento decisioni, spiegazioni comprensibili.",sources:["Floridi","Popper"],editorial:"<p>Il deskilling contemporaneo non coincide più soltanto con la perdita di competenze tecniche legata all'automazione, ma investe in modo più sottile la sfera cognitiva, etica e soggettiva. Sul piano cognitivo, la delega all'AI di attività come scrittura, sintesi e memorizzazione produce un <em>disapprendimento silenzioso</em>: non scompare la conoscenza in sé, ma si indebolisce l'esercizio che la mantiene viva. Sul piano etico e relazionale, l'uso dell'AI in contesti decisionali sensibili favorisce una delega di responsabilità che può erodere il pensiero critico e attenuare l'assunzione di conseguenze morali. Sul piano soggettivo, la persona tende progressivamente a modellarsi sull'ideale della macchina efficiente, performante e adattiva, fino ad affievolire la capacità di comprendere, interrogare e prendere posizione.</p><p>In assenza di una cultura organizzativa consapevole, l'AI rischia così di essere adottata in modo meccanico, deresponsabilizzante e conformista. Qui emerge il pericolo dell'<em>\"idiota tecnologico\"</em> descritto da McLuhan, figura capace di usare perfettamente gli strumenti ma incapace di coglierne gli effetti simbolici, cognitivi e sociali:</p><blockquote>\"Ogni nuova tecnologia esercita su di noi una lusinga molto potente, tramite la quale ci ipnotizza in uno stato di narcisistico torpore. Difatti, una totale immersione nelle logiche mediali può condurre, inconsapevolmente, l'uomo ad una condizione di idiota tecnologico, ovvero una sorta di narcosi ed intorpidimento in grado di far perdere di vista la realtà. Se non abbiamo gli anticorpi intellettuali adatti, questo capita appena ne veniamo in contatto, e ci porta ad accettare come assiomi assoluti le assunzioni non neutrali intrinseche in quella tecnologia.\"</blockquote><p>A questa figura si affianca quella dell'<em>\"uomo antiquato\"</em> di Günther Anders: entrambe esprimono la perdita di misura tra l'umano e le proprie estensioni tecniche. L'intelligenza artificiale si configura così come un <em>pharmakon</em> cognitivo: può amplificare il pensiero oppure anestetizzarlo, a seconda della cultura che la orienta. Per questo non basta formare all'uso dei tool; occorre coltivare anticorpi culturali, pensiero critico, capacità di porre domande, empatia situata e assunzione di responsabilità.</p><p>La medesima dinamica investe anche il rapporto con la conoscenza. Nell'epoca della sovrabbondanza informativa, il problema non è più l'accesso ai contenuti, ma la capacità di decifrarli e trasformarli in comprensione significativa. Crescono le fonti disponibili, ma si assottigliano profondità cognitiva, attenzione e facoltà di giudizio. In questo scenario, l'AI può funzionare tanto come anestetico quanto come attivatore cognitivo: può rafforzare la dipendenza da sapere preconfezionato oppure riattivare il potenziale generativo dell'apprendimento.</p><p>Il nodo decisivo non riguarda dunque il semplice apprendimento di nuovi strumenti, ma la possibilità di ripensare il rapporto tra lavoro, umano e tecnologia. Solo una cultura consapevole può fare dell'AI un fattore trasformativo e non un'escalation tecnica priva di orientamento. In questo quadro, il potere di apprendere e reimparare diventa una nuova soglia di inclusione, autonomia e cittadinanza cognitiva.</p>",editorialSources:["McLuhan, Marshall. <em>Understanding Media: The Extensions of Man</em>. McGraw-Hill, 1964.","Anders, Günther. <em>L'uomo è antiquato, I</em>. Bollati Boringhieri, 2003.","Sancassani, Susanna. \"Il potere di imparare\", POK Polimi Open Knowledge, 2025."]},
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
    GWS:'Occluded',ABF:'Occluded',LOO:'Occluded',BEC:'Occluded',
    SIG:'Embedded',TAX:'Embedded',CAP:'Embedded',BAU:'Embedded',
    ORA:'Oracolo',SCO:'Oracolo',BIA:'Oracolo',SDB:'Oracolo',
    KPI:'Mgmt',ROU:'Mgmt',SUR:'Mgmt',QWK:'Mgmt',
    VIS:'Visibilità',ATT:'Visibilità',REP:'Visibilità',HRM:'Visibilità',
    OS:'OS',S0:'OS',AOS:'OS',HOS:'OS'
};

DATA.forEach(function(d) { d.role = ROLE[d.id] || null; });

var COLS = [
            {k:'Occluded',t:'Occluded',s:'structural invisibility',group:'Extractive',desc:"Invisibilità strutturale: il lavoro esiste ma è deliberatamente nascosto, negato, frammentato. Chi lo svolge è necessario ma fuori scena — labeling, moderazione, micro-task che rendono possibile l'AI. Il rischio ricade sulla singola persona senza rete né riconoscimento. La domanda chiave: chi è invisibile, e a chi conviene che lo resti?"},
            {k:'Embedded',t:'Embedded',s:'processual invisibility',group:'Extractive',desc:"Invisibilità processuale: l'estrazione avviene così fluidamente da essere indistinguibile dall'uso. La persona è simultaneamente utente e trainer, consumatore e produttore — il confine tra lavoro e non-lavoro si dissolve. La domanda chiave: se non sai di lavorare, puoi contestare le condizioni?"},
            {k:'Tool',t:'Tool',s:'assistive',desc:"L'AI come strumento: potenzia l'output individuale, accelera task, abbassa l'attrito. La persona resta apparentemente al timone. Ma lo strumento non è neutro: ridefinisce cosa è facile e cosa è difficile, cosa si delega e cosa si smette di fare. La domanda chiave: augmentation o sostituzione silenziosa del giudizio?"},
            {k:'Oracolo',t:'Oracle',s:'inferential',desc:"L'AI come autorità inferenziale: score, ranking, predizioni e label diventano base decisionale. Il modello produce output 'plausibili' che vengono trattati come verità. La domanda chiave: quando il plausibile diventa norma, chi può ancora contestare?"},
            {k:'Mgmt',t:'Algorithmic Mgmt',s:'actuating',desc:"L'AI come sistema di governo: metriche, nudging, scheduling, routing e incentivi micro guidano il comportamento senza bisogno di gerarchia classica. Il controllo è nel design, non nel comando. La domanda chiave: chi decide ritmo, carico e criteri — e chi può opporsi?"},
            {k:'Visibilità',t:'Visibility Director',s:'reputational',desc:"L'AI come regista della visibilità: algoritmi di esposizione, ranking reputazionali e metriche di engagement determinano chi è visto, chi è premiato e chi scompare. La visibilità diventa capitale e condizione di accesso. La domanda chiave: visibilità è valore, o ne è solo il surrogato?"},
            {k:'OS',t:'Operating System',s:'infrastructural',desc:"L'AI come infrastruttura: non uno strumento che si usa, ma un ambiente in cui si opera. Default, workflow e regole del gioco sono incorporati nei sistemi — spesso poco visibili e poco contestabili. La domanda chiave: chi disegna i default, e chi può cambiarli?"}
        ];

// Anthropological conception labels for Worker row (mapped by column key)
var ANTHRO_LABELS = {
    'Occluded': 'Ghost',
    'Embedded': 'Heteromated',
    'Tool': 'Augmented',
    'Oracolo': 'Antiquato / Idiota',
    'Mgmt': 'Quantified',
    'Visibilità': 'Branded',
    'OS': 'System-shaped'
};

var INFORG_TRIADS = {
    'Occluded':   { id:'invisible',  ag:'occluded',       ct:'denied' },
    'Embedded':   { id:'captured',   ag:'heteromated',    ct:'opaque' },
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

var ROW_DESC = {
    "Worker":"La persona al lavoro, nel rapporto quotidiano con l'AI. Qui si giocano le dinamiche individuali: come l'AI potenzia, estrae, valuta, governa, espone e pre-configura l'esperienza della singola persona. È il livello dove l'impatto si sente per primo — spesso prima di essere compreso.",
    "HR":"La funzione che media tra persona e organizzazione. HR progetta i sistemi che governano le persone: formazione, selezione, performance, riconoscimento, accountability. Con l'AI, ogni funzione HR rischia un drift specifico — da trainer cosmetico a amplificatore acritico degli score. La domanda chiave: HR subisce i sistemi o li disegna?",
    "Organization":"L'organizzazione come sistema: come cattura valore, adotta strumenti, istituzionalizza decisioni, coordina lavoro, governa la narrazione e disegna i propri processi. Ogni colonna descrive un archetipo organizzativo — un modo diverso in cui l'AI ridefinisce la forma dell'impresa.",
    "Society":"Le dinamiche che trascendono la singola organizzazione: quando l'estrazione diventa colonialismo dei dati, la tecnica diventa norma sociale, i dati diventano verità, la sorveglianza diventa modello economico, la performance diventa dovere e gli algoritmi diventano infrastruttura. Ogni cella porta il nome di un archetipo societario e del suo autore di riferimento."
};

var INTRO_TEXT = "AI & Work Atlas è una cartografia critica di come l'intelligenza artificiale sta trasformando il lavoro. La mappa incrocia 4 livelli di osservazione (Worker, HR, Organization, Society) con 7 ruoli che l'AI assume — di cui due forme di invisibilità estrattiva (Occluded, Embedded), più Tool, Oracle, Algorithmic Management, Visibility Director e Operating System. Ogni cella descrive una dinamica specifica — con segnali, rischi e possibili presidi.\n\nIspirato al lavoro di Kate Crawford e Vladan Joler (Calculating Empires), questo atlante propone percorsi di lettura attraverso le tensioni tra persone, organizzazioni e sistemi algoritmici.\n\nClicca su una cella per approfondire. Clicca su un'intestazione di colonna o riga per capire cosa rappresenta.";

var TOURS = [
    {
        id: 'extraction',
        title: 'La catena dell\'estrazione',
        subtitle: 'Dalla persona alla società: come il valore viene catturato',
        steps: [
            {tile:'SIG', text:'Questo percorso segue il filo dell\'estrazione dal basso verso l\'alto: dalla persona che alimenta l\'AI senza saperlo, fino alla società in cui i dati diventano risorsa coloniale. A ogni livello, qualcuno produce valore — e qualcun altro lo cattura.'},
            {tile:'GWS', text:'Se ogni interazione è una traccia, chi la raccoglie? Dietro i modelli che usiamo c\'è un lavoro umano invisibile — labeling, moderazione, micro-task — che rende possibile l\'intelligenza artificiale ma che resta fuori scena.'},
            {tile:'CAP', text:'L\'invisibilità non è solo individuale: diventa strategia organizzativa. L\'organizzazione cattura sapere attraverso standard, telemetria e piattaforme — trasformando ciò che le persone producono in asset proprietari.'},
            {tile:'GHO', text:'Quando la cattura si estende oltre l\'organizzazione, la logica estrattiva diventa sistemica: dati appropriati, resi proprietari, convertiti in potere. Non è più un effetto collaterale — è un modello.'}
        ],
        closing: 'La catena dell\'estrazione mostra come il valore si sposta dal basso verso l\'alto, dalla persona alla società, diventando sempre più invisibile a chi lo genera. La domanda non è se si estrae, ma chi ne beneficia — e chi può contestarlo.'
    },
    {
        id: 'defaults',
        title: 'Il potere invisibile dei default',
        subtitle: 'L\'infrastruttura AI pre-configura comportamenti a ogni scala',
        steps: [
            {tile:'AOS', text:'Questo percorso esplora la dimensione infrastrutturale dell\'AI: non uno strumento che si usa, ma un ambiente in cui si opera. A ogni livello — persona, HR, organizzazione, società — i default definiscono ciò che è possibile, facile o impensabile.'},
            {tile:'HOS', text:'Se la persona vive dentro un sistema pre-configurato, chi ne disegna i confini? HR ha un ruolo chiave: può subire l\'architettura o co-progettarla, definendo dove passa il confine tra decisione umana e automazione.'},
            {tile:'OS', text:'Dalle scelte di HR alla forma dell\'organizzazione: quando l\'AI diventa strato di coordinamento, non accelera task — elimina workflow. Il potere non è nel comando, ma nel design dei processi.'},
            {tile:'S0', text:'Ciò che vale per l\'organizzazione si estende alla società: gli algoritmi diventano infrastruttura di coordinamento sociale. I default non sono più scelte aziendali — sono criteri pratici di realtà, contestabili solo in parte.'}
        ],
        closing: 'Il potere invisibile dei default mostra come l\'infrastruttura AI pre-configura comportamenti a ogni scala. La domanda chiave non è cosa fa l\'AI, ma cosa rende facile — e cosa rende impensabile.'
    },
    {
        id: 'worker-experience',
        title: 'L\'esperienza della persona al lavoro',
        subtitle: 'Le sei facce dell\'esperienza individuale con l\'AI',
        steps: [
            {tile:'AUG', text:'Questo percorso attraversa tutte le facce dell\'esperienza individuale con l\'AI al lavoro. La stessa persona, nella stessa giornata, è potenziata, estratta, valutata, governata, esposta e pre-configurata. Sei ruoli diversi dell\'AI, un\'unica esperienza.'},
            {tile:'SIG', text:'Dall\'augmentation all\'estrazione: lo stesso tool che potenzia l\'output raccoglie tracce. La persona che usa l\'AI è anche la persona che alimenta l\'AI — spesso senza saperlo.'},
            {tile:'ORA', text:'Dalle tracce al giudizio: i dati estratti alimentano modelli che valutano, classificano e predicono. La persona non solo produce dati — è valutata da essi. Score e label diventano autorità cognitiva.'},
            {tile:'QWK', text:'Dal giudizio al governo: quando lo score diventa target, le metriche guidano il comportamento. Nudging, scheduling e ranking comprimono la discrezionalità senza bisogno di ordini espliciti.'},
            {tile:'VIS', text:'Dal governo alla visibilità: non basta essere misurati — bisogna essere visibili nel modo giusto. La persona interiorizza logiche di esposizione: la reputazione diventa condizione di accesso.'},
            {tile:'AOS', text:'Dalla visibilità all\'infrastruttura: tutti questi ruoli convergono in un ambiente pre-configurato. La persona non usa singoli strumenti — vive dentro un sistema che definisce cosa è facile, difficile o impensabile.'}
        ],
        closing: 'L\'esperienza della persona al lavoro non è lineare: è simultanea. Potenziamento, estrazione, giudizio, governo, visibilità e infrastruttura si sovrappongono. La domanda non è quale ruolo prevalga, ma se la persona ha gli strumenti per riconoscerli — e per contestarli.'
    },
    {
        id: 'org-to-society',
        title: 'Dall\'organizzazione alla società',
        subtitle: 'Come le dinamiche organizzative diventano regole sociali',
        steps: [
            {tile:'CAP', text:'Questo percorso attraversa la riga Organization in diagonale, mostrando come ogni dinamica organizzativa ha un riflesso societario. Dalla cattura del sapere alla sorveglianza istituzionalizzata, le scelte delle organizzazioni costruiscono le regole della società.'},
            {tile:'SDB', text:'Catturare sapere non basta: serve trasformarlo in decisioni. L\'organizzazione istituzionalizza score e ranking come base decisionale — il plausibile diventa evidenza pratica.'},
            {tile:'ROU', text:'Dai punteggi al governo dei flussi: quando l\'AI orienta carichi, priorità e assegnazioni, il potere diventa logistico. Non serve più un ordine — basta un algoritmo di dispatch.'},
            {tile:'ATT', text:'Dal routing alla narrazione: ciò che l\'organizzazione misura e rende visibile guida investimenti e reputazioni. La visibilità può sostituire l\'evidenza se manca un layer di sensemaking.'},
            {tile:'OS', text:'Dalla narrazione all\'infrastruttura: quando l\'AI diventa strato di coordinamento, non è più un racconto — è l\'architettura stessa dei processi. Workflow elimination, non accelerazione.'},
            {tile:'SUR', text:'Dall\'organizzazione alla società: il coordinamento algoritmico non resta confinato all\'impresa. Tracciamento, predizione, intervento diventano modello economico e di governo — con asimmetrie strutturali tra chi osserva e chi è osservato.'}
        ],
        closing: 'Dall\'organizzazione alla società mostra che le scelte aziendali — come catturare, classificare, governare, narrare e coordinare — non restano dentro le mura dell\'impresa. Diventano regole del gioco. La domanda è: chi le scrive, e chi può cambiarle?'
    },
    {
        id: 'epilogue',
        title: 'Epilogo — Le domande aperte',
        subtitle: 'Cinque nodi irrisolti che attraversano l\'intero atlante',
        steps: [
            {tile:'GWS', text:'Questo percorso finale attraversa l\'atlante in diagonale, toccando cinque nodi che restano aperti. Non sono risposte — sono domande che ogni percorso lascia dietro di sé. La prima: chi è invisibile? Dietro ogni sistema AI c\'è lavoro umano che non appare. Labeling, moderazione, micro-task: necessari ma fuori scena.'},
            {tile:'ORA', text:'Dall\'invisibilità al giudizio. Se il ghost work alimenta i modelli, quei modelli poi valutano le persone. Score, ranking e predizioni acquistano autorità — ma chi li ha prodotti, e su quali dati? La domanda aperta: quando il plausibile diventa norma, chi può ancora dire "non è così"?'},
            {tile:'ROU', text:'Dal giudizio al governo. I punteggi non restano nei report: diventano regole operative. L\'algoritmo assegna carichi, priorità, turni. Il potere è logistico — non serve un ordine, basta un dispatch. La domanda aperta: chi decide ritmo e carico, e chi ha voce per opporsi?'},
            {tile:'ATT', text:'Dal governo alla narrazione. Ciò che viene misurato e reso visibile orienta investimenti e reputazioni. Ma visibilità non è valore — può sostituirlo, se manca un layer di interpretazione. La domanda aperta: stiamo governando con evidenze o con storie?'},
            {tile:'S0', text:'Dalla narrazione all\'infrastruttura. Alla fine, tutte queste dinamiche convergono nei default: ciò che il sistema rende facile, difficile o impensabile. Gli algoritmi diventano infrastruttura sociale — criteri pratici di realtà. La domanda aperta: chi disegna i default, e chi può cambiarli?'}
        ],
        closing: 'L\'atlante non offre soluzioni — offre coordinate. Estrazione, giudizio, governo, narrazione e infrastruttura non sono forze separate: si intrecciano, si rinforzano, si nascondono l\'una dentro l\'altra. Riconoscerle è il primo passo. Contestarle richiede strumenti, linguaggio e spazi che in gran parte sono ancora da costruire.'
    }
];

var CELL_KWS = {
    "Worker": {
        "Occluded": "Lavoro invisibile · labeling · moderazione · micro-task",
        "Embedded": "Segnali · tracce · training data · estrazione implicita",
        "Tool": "Output↑ locale · delega sintesi/memoria · agency?",
        "Mgmt": "score · target · nudging · scheduling · telemetry",
        "Visibilità": "Visibilità · attenzione · auto-brand",
        "Oracolo": "Autorità cognitiva · delega giudizio · narcotizzazione · deresponsabilizzazione",
        "OS": "Ambiente pre-configurato · default · opzioni vincolate · eterodirezione soft"
    },
    "HR": {
        "Occluded": "Assenza HR · nessuna tutela · nessuna rappresentanza",
        "Embedded": "Tassonomia · classificazione · confini lavoro/non-lavoro",
        "Tool": "Training trap · adozione cosmetica · formazione senza redesign",
        "Mgmt": "Behavioral governor · dashboard · nudging · incentivi micro",
        "Visibilità": "Reputation manager · engagement theatre · visibilità come proxy",
        "Oracolo": "Oracle amplifier · score come verità · delega al plausibile",
        "OS": "Operating model architect · decision rights · confine umano/AI"
    },
    "Organization": {
        "Occluded": "Outsourcing a strati · subappalto · lavoro invisibile a valle",
        "Embedded": "Datafication · telemetria · standard · lock-in",
        "Tool": "Produttività a isole · bolt-on · shadow AI · frammentazione",
        "Mgmt": "Routing · allocazione · scheduling · potere logistico",
        "Visibilità": "Narrazione · hype · sensemaking · storytelling",
        "Oracolo": "Score · decision support · alibi algoritmico · deferenza",
        "OS": "Coordination · workflow elimination · AI-native · decision rights"
    },
    "Society": {
        "Occluded": "Risk society · rischio individualizzato · irresponsabilità organizzata",
        "Embedded": "Liquid society · confini dissolti · prosumer · precarietà",
        "Tool": "Tecnica come norma · efficienza → fini · ottimizzazione",
        "Mgmt": "Surveillance capitalism · tracciamento · predizione · rendita",
        "Visibilità": "Performance society · auto-ottimizzazione · visibilità come dovere",
        "Oracolo": "Dataism · autorità epistemica · verità algoritmica",
        "OS": "Algorithmic society · infrastruttura · default · contestabilità"
    }
};

var CELL_EMPTY = {
    "HR": {
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
        "Occluded": "assets/img/worker-occluded.png",
        "Embedded": "assets/img/worker-embedded.png",
        "Oracolo": "assets/img/worker-oracolo.jpg",
        "Tool": "assets/img/worker-tool.png",
        "Mgmt": "assets/img/worker-mgmt.jpg",
        "Visibilità": "assets/img/worker-visibilita.png"
    },
    "HR": {},
    "Organization": {},
    "Society": {
        "Occluded": "assets/img/society-occluded.jpg",
        "Mgmt": "assets/img/society-mgmt.jpg",
        "Visibilità": "assets/img/society-visibilita.png"
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
