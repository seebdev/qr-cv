import type { ShowcaseCopy } from '../types';
export const de: ShowcaseCopy = {
  featured: 'Hervorgehobenes Projekt',
  badge: 'B2B-Softwareplattform',
  lead: 'Von der Teilenummer zur nächsten Geschäftschance.',
  summary:
    'Kunden, Bestände, Beschaffung und Datenanalyse in einer Arbeitsumgebung für elektronische Bauteile.',
  back: 'Zurück zum Portfolio',
  explore: 'Funktionen entdecken',
  live: 'Plattform öffnen',
  auth: 'Für den operativen Zugang kann ein Konto erforderlich sein.',
  study:
    'Entwickelte Software, vorgestellt als Fallstudie. Diese öffentliche Präsentation benötigt keine Anmeldung.',
  overview: 'Das Produkt',
  problemLabel: 'Die Herausforderung',
  problemTitle: 'Verteilte Daten. Getrennte Entscheidungen.',
  problemBody:
    'Eine Teilenummer steht in einer Tabelle, die Verfügbarkeit in einer anderen und der Kundenbedarf in einem Gespräch. Diesen Zusammenhang herzustellen erfordert manuelle Suche und erschwert die Nachverfolgung.',
  solutionLabel: 'Der Ansatz',
  solutionTitle: 'Ein gemeinsamer Kontext für jedes Bauteil.',
  solutionBody:
    'Electronic Parts Intelligence verbindet Unternehmen, Katalogdaten, Bestand und Bedarf. Informationssuche, Chancenanalyse und Zusammenarbeit greifen ineinander, ohne ungemessene Geschäftsergebnisse zu versprechen.',
  modulesTitle: 'Ein Produkt. Verbundene Abläufe.',
  modulesIntro:
    'Entdecken Sie Zweck und Ablauf jedes Moduls. Die schematischen Ansichten erklären das Produkt; sie zeigen keine verbundenen Sitzungen oder echten Ergebnisse.',
  moduleFlow: 'Modulablauf',
  modules: [
    [
      'Kunden',
      'Hier beginnt der Geschäftskontext.',
      'Unternehmensverzeichnis und Kundenprofile liefern Kontext für die Bearbeitung des Bedarfs. Dieses Modul ist im bereitgestellten Bildschirmbild sichtbar.',
      'Verzeichnis → Unternehmensprofil → Geschäftskontext',
    ],
    [
      'Geschäftschancen',
      'Nachfrage und Verfügbarkeit verbinden.',
      'Der geprüfte Code normalisiert MPN und bewertet Bestände, Bedarf und Angebote. Eine passende Referenz ist noch kein bestätigter Verkauf.',
      'Quelldateien → MPN-Vergleich → Chancenprüfung',
    ],
    [
      'Bestand und Bedarf',
      'Die mögliche Abdeckung verstehen.',
      'Das Modell unterscheidet Bestand, Teilabdeckung, Fehlmengen und unbekannte Daten. Verweise auf ursprüngliche Importe erhalten den Kontext.',
      'Bedarf → Verfügbarkeit → Abdeckung und Fehlmengen',
    ],
    [
      'Suche',
      'Referenzen im Zusammenhang finden.',
      'Strukturierte Suche nach Datensätzen und Teilenummern. Felder und Ergebnisse richten sich nach Zugriffsrechten, unabhängig von generativer KI.',
      'Anfrage → erlaubte Felder → Datensätze',
    ],
    [
      'KI und Datenintelligenz',
      'Geschäftsfragen mit Datengrundlage.',
      'Der Assistent verbindet autorisierte Abfragen mit deterministischen Antworten und optionaler Sprachgenerierung durch OpenAI. Der Server begrenzt den Zugriff.',
      'Frage → autorisiertes Werkzeug → kontextbezogene Antwort',
    ],
    [
      'Nachrichten',
      'Zusammenarbeit fortführen.',
      'Gespräche zwischen Plattformteilnehmern. Der Code prüft die Mitgliedschaft in Gesprächen und getrennte Rechte für deren Prüfung.',
      'Gespräch → Teilnehmer → Nachverfolgung',
    ],
    [
      'Importe',
      'Kataloge durchsuchbar machen.',
      'Excel- und CSV-Importe mit Validierung und Hintergrundverarbeitung im geprüften Code. Importfehler werden nachverfolgt.',
      'Datei → Validierung und Verarbeitung → Datensätze',
    ],
    [
      'Benutzer und Profile',
      'Zuständigkeiten festlegen.',
      'Der Code definiert Mitarbeiter, Führungskraft, Administrator und technischen Administrator. Rechte werden rollenbasiert geprüft; die Produktionskonfiguration wurde nicht auditiert.',
      'Konto → Profil und Rolle → erlaubte Funktionen',
    ],
    [
      'Datensätze',
      'Daten nachvollziehbar halten.',
      'Importierte und normalisierte Informationen mit Quellenverweisen vor ihrer Verwendung in Geschäftsanalysen prüfen.',
      'Import → normalisierter Datensatz → Abfrage',
    ],
    [
      'Kundenverwaltung',
      'Das Verzeichnis strukturieren.',
      'Unternehmen anlegen und bearbeiten mit gesonderten Verwaltungsrechten. Die Pflege ergänzt die geschäftliche Recherche.',
      'Verwaltungsrecht → anlegen oder bearbeiten → Verzeichnis',
    ],
    [
      'Beschaffung',
      'Bei fehlendem Bestand weiterarbeiten.',
      'Der Code umfasst Beschaffungsanfragen, Angebote und Entscheidungen. Ein Angebot wird dabei nicht als abgeschlossener Kauf dargestellt.',
      'Anfrage → Angebote → Prüfung und Nachverfolgung',
    ],
  ],
  illustration: 'Schematische Ansicht',
  source: 'Im Code geprüft',
  sourceNote:
    'Grundlage: bereitgestellte Oberfläche und lokaler Electronic Parts Demo-Code. Die genaue Übereinstimmung mit der veröffentlichten Version und ihrer Konfiguration ist nicht bestätigt. Keine Aussagen über echte Kunden, gemessene Wirkung oder Sicherheitsgarantien.',
  aiLabel: 'Intelligenz im Kontext',
  aiTitle: 'Bessere Fragen beginnen mit verbundenen Daten.',
  aiBody:
    'Mehr als Texterzeugung: relevante Informationen abrufen, Zugriffsgrenzen beachten und die Antwortgrundlage erklären. Der Ablauf zeigt den geprüften Code; diese Seite führt keine Geschäftsabfragen aus.',
  aiSteps: [
    'Benutzerfrage',
    'Anwendung und Zugriffskontrolle',
    'Autorisierte Datenabfrage',
    'Verarbeitung',
    'Kontextbezogene Antwort',
  ],
  structuredTitle: 'Strukturierte Abfragen',
  structuredBody:
    'Spezialisierte Werkzeuge lesen MPN, Bestand, Chancen und Datensätze im erlaubten Bereich. Einige Ergebnisse entstehen deterministisch.',
  generativeTitle: 'Generative Sprache',
  generativeBody:
    'Die konfigurierte OpenAI-Integration verarbeitet gefilterten Kontext. Sie ersetzt keine Datenbank und wird nicht zwingend für jede Antwort eingesetzt.',
  boundaryTitle: 'Berechtigung vor Antwort',
  boundaryBody:
    'Der Code prüft Sitzung, Rolle und Abfragebereich, filtert sensible Felder und begrenzt Anfragen. Dies ist keine Zertifizierung oder Sicherheitsprüfung der Produktion.',
  architectureTitle: 'Am Informationsfluss ausgerichtet.',
  architectureBody:
    'Im lokalen Code beobachtete Architektur. Hosting und Anbieter der öffentlichen Demo sind noch nicht bestätigt.',
  layers: [
    ['Oberfläche', 'Next.js · React · TypeScript'],
    ['Anwendung', 'Serverrouten · Validierung · Autorisierung'],
    ['Daten', 'Supabase · PostgreSQL · Speicherung'],
    ['Verarbeitung', 'Hintergrundimporte · optionales OpenAI'],
  ],
  workflowTitle: 'Vom Katalog zum nächsten Geschäftsschritt.',
  workflowBody:
    'Ein möglicher Weg durch die geprüften Module. Jeder Schritt benötigt passende Daten und Rechte; keine vollständig unbeaufsichtigte Automatisierung.',
  workflowSteps: [
    'Kataloge importieren',
    'Daten organisieren',
    'Suchen und analysieren',
    'Chancen prüfen',
    'Beschaffung steuern',
    'Zusammenarbeiten',
  ],
  videoTitle: 'Das Produkt in Aktion.',
  videoIntro:
    'Zwei Rundgänge, eine Plattform. Die Videosprache ist unabhängig von der Sprache dieser Präsentation.',
  videoEnglish: 'Englischer Rundgang',
  videoChinese: 'Chinesischer Rundgang',
  videoEnglishBody: 'Englischer Rundgang durch Arbeitsumgebung und Geschäftsabläufe.',
  videoChineseBody: 'Rundgang in vereinfachtem Chinesisch durch Module und Anwendungsfälle.',
  comingSoon: 'Video folgt',
  videoError: 'Das Video ist derzeit nicht verfügbar.',
  useTitle: 'Für Teams im Bauteilgeschäft.',
  uses: [
    ['Elektronikdistributoren', 'Kataloge, Verfügbarkeit und Geschäftskontext zusammenführen.'],
    ['B2B-Vertrieb', 'Gespräche anhand von Bedarf und Chancen vorbereiten.'],
    ['Beschaffungsteams', 'Anfragen verfolgen und eingehende Angebote bewerten.'],
    ['Katalogverwaltung', 'Dateien, Referenzen und Quelldaten ordnen.'],
    ['Einkauf', 'Referenzen suchen und Beschaffungsbedarf analysieren.'],
  ],
  galleryTitle: 'Einblick in die Arbeitsumgebung.',
  galleryBody:
    'Die wichtigsten Module im Überblick. Fehlt ein veröffentlichbares Bildschirmbild, wird ein klar gekennzeichnetes Schema angezeigt.',
  placeholder: 'Bildschirmbild folgt',
  zoom: 'Ansicht vergrößern',
  close: 'Galerie schließen',
  previous: 'Vorherige Ansicht',
  next: 'Nächste Ansicht',
  screenshot: 'Bildschirmaufnahme',
  demoData: 'Demonstrationsnamen und Firmen stellen keine Geschäftsbeziehungen dar.',
  engineeringTitle: 'Die Arbeit hinter dem Produkt.',
  engineering: [
    ['Durchgängige Entwicklung', 'Oberfläche, Serverrouten und Datenmodelle für B2B-Abläufe.'],
    [
      'Daten vor Versprechen',
      'Normalisierung, Herkunftsnachweise und Trennung von fehlenden Daten und Verfügbarkeit.',
    ],
    ['Klare Grenzen für KI', 'Trennung von Datenabfrage, Autorisierung und Sprachgenerierung.'],
  ],
  stackLabel: 'Im Code beobachtete Technologien',
  contactTitle: 'Sprechen wir über Ihre nächste Plattform.',
  contactBody:
    'Sie möchten B2B-Abläufe organisieren oder eine ähnliche Lösung erkunden? Kontaktieren Sie den Entwickler für ein Gespräch oder eine Vorführung.',
  contact: 'Entwickler kontaktieren',
  readCase: 'Projekt entdecken',
};
