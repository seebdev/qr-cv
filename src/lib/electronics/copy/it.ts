import type { ShowcaseCopy } from '../types';
export const it: ShowcaseCopy = {
  featured: 'Progetto in evidenza',
  badge: 'Piattaforma software B2B',
  lead: 'Dal codice componente alla prossima opportunità.',
  summary:
    'Clienti, inventario, approvvigionamento e analisi dei dati in un unico spazio di lavoro per i componenti elettronici.',
  back: 'Torna al portfolio',
  explore: 'Esplora le funzionalità',
  live: 'Visita la piattaforma',
  auth: 'L’accesso operativo può richiedere un account.',
  study:
    'Software sviluppato e presentato come caso di studio. Questa presentazione pubblica non richiede accesso.',
  overview: 'Il prodotto',
  problemLabel: 'La sfida',
  problemTitle: 'Dati dispersi. Decisioni scollegate.',
  problemBody:
    'Un codice componente è in un foglio di calcolo, la disponibilità in un altro e il bisogno del cliente in una conversazione. Ricostruire il contesto richiede ricerche manuali e complica il seguito commerciale.',
  solutionLabel: 'L’approccio',
  solutionTitle: 'Un contesto comune per ogni componente.',
  solutionBody:
    'Electronic Parts Intelligence riunisce organizzazioni, cataloghi, scorte e fabbisogni. Collega ricerca, analisi delle opportunità e collaborazione senza promettere risultati commerciali non misurati.',
  modulesTitle: 'Un prodotto. Operazioni collegate.',
  modulesIntro:
    'Esplora scopo e flusso di ogni modulo. Gli schemi spiegano il prodotto: non sono sessioni connesse o risultati reali.',
  moduleFlow: 'Flusso del modulo',
  modules: [
    [
      'Clienti',
      'Il contesto commerciale parte da qui.',
      'Un elenco di organizzazioni e relative schede offre contesto prima di gestire i fabbisogni. Il modulo appare nella schermata fornita.',
      'Elenco → scheda organizzazione → contesto commerciale',
    ],
    [
      'Opportunità',
      'Collegare domanda e disponibilità.',
      'Il codice esaminato normalizza gli MPN e valuta scorte, domanda e offerte. Una corrispondenza non equivale a una vendita confermata.',
      'File sorgenti → confronto MPN → esame opportunità',
    ],
    [
      'Scorte e fabbisogni',
      'Capire cosa si può coprire.',
      'Il modello distingue scorte, copertura parziale, carenze e dati sconosciuti, mantenendo i riferimenti alle importazioni originali.',
      'Fabbisogno → disponibilità → copertura e carenze',
    ],
    [
      'Ricerca',
      'Trovare il componente nel suo contesto.',
      'Ricerca strutturata di record e codici. Campi e risultati dipendono dai permessi dell’utente, separatamente dall’IA generativa.',
      'Query → campi autorizzati → record',
    ],
    [
      'IA e analisi dei dati',
      'Domande aziendali con una base concreta.',
      'L’assistente combina strumenti di consultazione autorizzati, risposte deterministiche e generazione tramite OpenAI se configurata. Il server applica i limiti di accesso.',
      'Domanda → strumento autorizzato → risposta contestuale',
    ],
    [
      'Messaggistica',
      'Dare continuità alla collaborazione.',
      'Conversazioni tra partecipanti della piattaforma. Il codice verifica l’appartenenza alla conversazione e distingue i permessi di controllo.',
      'Conversazione → partecipanti → seguito',
    ],
    [
      'Caricamenti',
      'Rendere consultabili i cataloghi.',
      'Importazioni Excel e CSV con validazione e processi in background nel codice esaminato. Gli errori di importazione vengono tracciati.',
      'File → validazione ed elaborazione → record',
    ],
    [
      'Utenti e profili',
      'Organizzare le responsabilità.',
      'Il codice definisce dipendente, responsabile, amministratore e amministratore tecnico. Le capacità sono verificate per ruolo; la configurazione di produzione non è stata verificata.',
      'Account → profilo e ruolo → capacità consentite',
    ],
    [
      'Record',
      'Preservare la tracciabilità.',
      'Consultare informazioni importate e normalizzate con riferimenti alla fonte prima di utilizzarle nelle analisi commerciali.',
      'Importazione → record normalizzato → consultazione',
    ],
    [
      'Amministrazione clienti',
      'Strutturare l’elenco delle organizzazioni.',
      'Creazione e modifica delle organizzazioni con capacità di gestione differenziate. La manutenzione amministrativa completa la consultazione commerciale.',
      'Permesso gestionale → creazione o modifica → elenco',
    ],
    [
      'Approvvigionamento',
      'Proseguire quando manca la fornitura.',
      'Il codice include richieste, offerte e decisioni di approvvigionamento. Permette di seguirle senza presentare un’offerta come acquisto concluso.',
      'Richiesta → offerte → esame e seguito',
    ],
  ],
  illustration: 'Vista illustrativa',
  source: 'Esaminato nel codice',
  sourceNote:
    'Fonti: interfaccia fornita e codice locale Electronic Parts Demo. La corrispondenza esatta con la versione pubblicata e la sua configurazione non è verificata. Nessuna affermazione su clienti reali, impatti misurati o garanzie di sicurezza.',
  aiLabel: 'Intelligenza nel contesto',
  aiTitle: 'Domande migliori partono da dati collegati.',
  aiBody:
    'Oltre a generare testo: recuperare informazioni pertinenti, rispettarne l’ambito e chiarire le basi della risposta. Il flusso rappresenta il codice esaminato; questa pagina non esegue query aziendali.',
  aiSteps: [
    'Domanda dell’utente',
    'Applicazione e controllo accessi',
    'Query autorizzata',
    'Elaborazione',
    'Risposta contestuale',
  ],
  structuredTitle: 'Consultazione strutturata',
  structuredBody:
    'Strumenti specifici consultano MPN, scorte, opportunità e record nell’ambito autorizzato. Alcuni risultati sono deterministici.',
  generativeTitle: 'Linguaggio generativo',
  generativeBody:
    'L’integrazione OpenAI elabora contesto filtrato quando configurata. Non sostituisce il database né implica l’uso di un modello generativo per ogni risposta.',
  boundaryTitle: 'Il permesso precede la risposta',
  boundaryBody:
    'Il codice verifica sessione, ruolo e ambito, filtra campi sensibili e limita le richieste. Questi controlli non costituiscono certificazione o verifica di sicurezza della produzione.',
  architectureTitle: 'Progettato attorno al flusso delle informazioni.',
  architectureBody:
    'Architettura osservata nel codice locale. Hosting e fornitori della demo pubblica restano da verificare.',
  layers: [
    ['Esperienza', 'Next.js · React · TypeScript'],
    ['Applicazione', 'Rotte server · validazione · autorizzazione'],
    ['Dati', 'Supabase · PostgreSQL · archiviazione'],
    ['Elaborazione', 'Importazioni in background · OpenAI facoltativo'],
  ],
  workflowTitle: 'Dal catalogo al prossimo passo commerciale.',
  workflowBody:
    'Un possibile percorso tra i moduli esaminati. Ogni passo richiede dati e permessi appropriati, senza implicare un’automazione completa.',
  workflowSteps: [
    'Caricare cataloghi',
    'Organizzare record',
    'Cercare e analizzare',
    'Esaminare opportunità',
    'Gestire approvvigionamenti',
    'Collaborare',
  ],
  videoTitle: 'Guarda il prodotto in azione.',
  videoIntro:
    'Due percorsi, una piattaforma. La lingua del video è indipendente da quella della presentazione.',
  videoEnglish: 'Dimostrazione in inglese',
  videoChinese: 'Dimostrazione in cinese',
  videoEnglishBody: 'Percorso in inglese attraverso lo spazio di lavoro e il flusso commerciale.',
  videoChineseBody: 'Percorso in cinese semplificato tra moduli e casi d’uso.',
  comingSoon: 'Video in arrivo',
  videoError: 'Il video non è attualmente disponibile.',
  useTitle: 'Per i team che lavorano con i componenti.',
  uses: [
    ['Distributori elettronici', 'Riunire cataloghi, disponibilità e contesto commerciale.'],
    ['Vendite B2B', 'Preparare conversazioni sulla base di fabbisogni e opportunità.'],
    ['Approvvigionamento', 'Seguire richieste e valutare le offerte ricevute.'],
    ['Gestione cataloghi', 'Organizzare file, riferimenti e record sorgenti.'],
    ['Acquisti', 'Consultare codici e analizzare esigenze di fornitura.'],
  ],
  galleryTitle: 'Dentro lo spazio di lavoro.',
  galleryBody:
    'Una panoramica dei moduli principali. In assenza di schermate pubblicabili, gli schemi sono chiaramente identificati come illustrazioni.',
  placeholder: 'Schermata in preparazione',
  zoom: 'Ingrandisci vista',
  close: 'Chiudi galleria',
  previous: 'Vista precedente',
  next: 'Vista successiva',
  screenshot: 'Schermata dell’interfaccia',
  demoData: 'Nomi e aziende dimostrativi non implicano rapporti commerciali.',
  engineeringTitle: 'Il lavoro dietro il prodotto.',
  engineering: [
    [
      'Sviluppo completo',
      'Interfaccia, rotte server e modelli dati coordinati attorno alle operazioni B2B.',
    ],
    [
      'Dati prima delle promesse',
      'Normalizzazione, tracciabilità e distinzione tra informazioni mancanti e disponibilità.',
    ],
    [
      'Limiti espliciti per l’IA',
      'Separazione tra recupero dati, autorizzazione e generazione linguistica.',
    ],
  ],
  stackLabel: 'Tecnologie osservate nel codice',
  contactTitle: 'Parliamo della tua prossima piattaforma.',
  contactBody:
    'Vuoi organizzare le operazioni B2B o esplorare una soluzione simile? Contatta lo sviluppatore per parlarne o richiedere una dimostrazione.',
  contact: 'Contatta lo sviluppatore',
  readCase: 'Scopri il progetto',
};
