import type { ShowcaseCopy } from '../types';
export const fr: ShowcaseCopy = {
  featured: 'Projet à la une',
  badge: 'Plateforme logicielle B2B',
  lead: 'De la référence à la prochaine opportunité.',
  summary:
    'Clients, stocks, approvisionnement et intelligence des données dans un espace de travail dédié aux composants électroniques.',
  back: 'Retour au portfolio',
  explore: 'Explorer les fonctionnalités',
  live: 'Voir la plateforme',
  auth: 'L’accès opérationnel peut nécessiter un compte.',
  study:
    'Logiciel développé et présenté comme étude de cas. Cette présentation publique ne nécessite aucune connexion.',
  overview: 'Le produit',
  problemLabel: 'Le défi',
  problemTitle: 'Données dispersées. Décisions déconnectées.',
  problemBody:
    'Une référence figure dans un tableur, sa disponibilité dans un autre et le besoin de l’acheteur dans une conversation. Reconstituer ce contexte exige des recherches manuelles et complique le suivi commercial.',
  solutionLabel: 'La démarche',
  solutionTitle: 'Un contexte commun pour chaque composant.',
  solutionBody:
    'Electronic Parts Intelligence rassemble organisations, catalogues, stocks et besoins. La recherche d’informations rejoint l’analyse des opportunités et le travail en équipe, sans promettre de résultats commerciaux non mesurés.',
  modulesTitle: 'Un produit. Des opérations connectées.',
  modulesIntro:
    'Explorez le rôle et le parcours de chaque module. Les schémas expliquent le produit ; ils ne sont ni des sessions connectées ni des résultats réels.',
  moduleFlow: 'Parcours du module',
  modules: [
    [
      'Clients',
      'Le contexte commercial commence ici.',
      'Un annuaire et des fiches d’organisations donnent le contexte nécessaire pour traiter les besoins. Ce module apparaît dans la capture fournie.',
      'Annuaire → fiche organisation → contexte commercial',
    ],
    [
      'Opportunités',
      'Relier la demande à la disponibilité.',
      'Le code examiné normalise les MPN et évalue stocks, demandes et offres. Une référence correspondante ne constitue pas une vente confirmée.',
      'Fichiers sources → comparaison MPN → examen des opportunités',
    ],
    [
      'Stocks et besoins',
      'Comprendre la couverture disponible.',
      'Le modèle distingue stocks, couverture partielle, manquants et données inconnues. Il conserve les références aux imports sources.',
      'Besoin → disponibilité → couverture et manquants',
    ],
    [
      'Recherche',
      'Trouver une référence dans son contexte.',
      'Recherche structurée de références et de données. Les champs et résultats dépendent des droits de l’utilisateur, indépendamment de l’IA générative.',
      'Requête → champs autorisés → données',
    ],
    [
      'IA et intelligence des données',
      'Des questions métier étayées.',
      'L’assistant associe outils de consultation autorisés, réponses déterministes et génération de langage via OpenAI lorsque configurée. Le serveur applique le périmètre d’accès.',
      'Question → outil autorisé → réponse contextualisée',
    ],
    [
      'Messagerie',
      'Assurer la continuité de la collaboration.',
      'Conversations entre participants. Le code vérifie l’appartenance aux conversations et distingue les droits d’audit.',
      'Conversation → participants → suivi',
    ],
    [
      'Imports',
      'Rendre les catalogues consultables.',
      'Imports Excel et CSV avec validation et traitements en arrière-plan dans le code examiné. Les erreurs sont suivies.',
      'Fichier → validation et traitement → données',
    ],
    [
      'Utilisateurs et profils',
      'Définir les responsabilités.',
      'Le code définit des rôles d’employé, responsable, administrateur et administrateur technique. Les capacités sont contrôlées par rôle ; la configuration de production n’est pas auditée.',
      'Compte → profil et rôle → capacités autorisées',
    ],
    [
      'Enregistrements',
      'Préserver la traçabilité.',
      'Consulter les données importées et normalisées ainsi que leurs sources avant de les utiliser dans une analyse commerciale.',
      'Import → enregistrement normalisé → consultation',
    ],
    [
      'Administration des clients',
      'Structurer l’annuaire.',
      'Création et modification d’organisations selon des droits de gestion distincts. L’administration complète la consultation commerciale.',
      'Droit de gestion → création ou modification → annuaire',
    ],
    [
      'Approvisionnement',
      'Poursuivre lorsque le stock manque.',
      'Le code comprend demandes, offres et décisions d’approvisionnement. Le suivi ne présente pas une offre comme un achat conclu.',
      'Demande → offres → examen et suivi',
    ],
  ],
  illustration: 'Vue illustrative',
  source: 'Examiné dans le code',
  sourceNote:
    'Sources : interface fournie et code local Electronic Parts Demo. La correspondance exacte avec la version déployée et sa configuration reste à vérifier. Aucun client réel, impact chiffré ou garantie de sécurité n’est affirmé.',
  aiLabel: 'Intelligence contextualisée',
  aiTitle: 'De meilleures questions commencent par des données reliées.',
  aiBody:
    'Au-delà du texte généré : retrouver l’information pertinente, respecter son périmètre et préciser les éléments de réponse. Ce parcours représente le code examiné ; cette page ne consulte pas les données métier.',
  aiSteps: [
    'Question utilisateur',
    'Application et contrôle d’accès',
    'Consultation autorisée',
    'Traitement',
    'Réponse contextualisée',
  ],
  structuredTitle: 'Recherche structurée',
  structuredBody:
    'Des outils dédiés consultent MPN, stocks, opportunités et enregistrements dans le périmètre autorisé. Certains résultats sont déterministes.',
  generativeTitle: 'Langage génératif',
  generativeBody:
    'OpenAI traite un contexte filtré lorsque l’intégration est configurée. Il ne remplace pas la base et n’intervient pas nécessairement dans chaque réponse.',
  boundaryTitle: 'L’autorisation précède la réponse',
  boundaryBody:
    'Le code contrôle session, rôle et périmètre, filtre les champs sensibles et limite les requêtes. Ces contrôles ne constituent ni une certification ni un audit de production.',
  architectureTitle: 'Une architecture guidée par l’information.',
  architectureBody:
    'Architecture observée dans le code local. L’hébergement et les fournisseurs de la démonstration publique restent à vérifier.',
  layers: [
    ['Expérience', 'Next.js · React · TypeScript'],
    ['Application', 'Routes serveur · validation · autorisation'],
    ['Données', 'Supabase · PostgreSQL · stockage'],
    ['Traitement', 'Imports en arrière-plan · OpenAI facultatif'],
  ],
  workflowTitle: 'Du catalogue à la prochaine étape commerciale.',
  workflowBody:
    'Parcours possible entre les modules examinés. Chaque étape exige des données et des droits adaptés ; il ne s’agit pas d’une automatisation intégrale.',
  workflowSteps: [
    'Importer les catalogues',
    'Organiser les données',
    'Rechercher et analyser',
    'Examiner les opportunités',
    'Gérer l’approvisionnement',
    'Collaborer',
  ],
  videoTitle: 'Découvrez le produit en action.',
  videoIntro:
    'Deux visites, une plateforme. La langue de la vidéo est indépendante de celle de cette présentation.',
  videoEnglish: 'Démonstration en anglais',
  videoChinese: 'Démonstration en chinois',
  videoEnglishBody: 'Visite en anglais de l’espace de travail et du parcours commercial.',
  videoChineseBody: 'Visite en chinois simplifié des modules et de leurs usages.',
  comingSoon: 'Vidéo à venir',
  videoError: 'La vidéo est indisponible pour le moment.',
  useTitle: 'Pour les équipes des composants électroniques.',
  uses: [
    ['Distributeurs électroniques', 'Réunir catalogues, disponibilité et contexte commercial.'],
    ['Ventes B2B', 'Préparer les échanges à partir des besoins et opportunités.'],
    ['Approvisionnement', 'Suivre les demandes et évaluer les offres reçues.'],
    ['Gestion des catalogues', 'Organiser fichiers, références et données sources.'],
    ['Achats', 'Rechercher des références et analyser les besoins.'],
  ],
  galleryTitle: 'Dans l’espace de travail.',
  galleryBody:
    'Les principaux modules en aperçu. En l’absence de capture publiable, un schéma est clairement identifié comme illustration.',
  placeholder: 'Capture à venir',
  zoom: 'Agrandir la vue',
  close: 'Fermer la galerie',
  previous: 'Vue précédente',
  next: 'Vue suivante',
  screenshot: 'Capture de l’interface',
  demoData: 'Les noms et entreprises de démonstration n’impliquent aucune relation commerciale.',
  engineeringTitle: 'Le travail derrière le produit.',
  engineering: [
    [
      'Développement complet',
      'Interface, routes serveur et modèles de données articulés autour des opérations B2B.',
    ],
    [
      'Des données avant les promesses',
      'Normalisation, traçabilité et distinction entre données manquantes et disponibilité.',
    ],
    [
      'Des limites explicites pour l’IA',
      'Séparation de la recherche de données, de l’autorisation et de la génération de langage.',
    ],
  ],
  stackLabel: 'Technologies observées dans le code',
  contactTitle: 'Parlons de votre prochaine plateforme.',
  contactBody:
    'Vous souhaitez organiser vos opérations B2B ou explorer une solution similaire ? Contactez le développeur pour échanger ou demander une démonstration.',
  contact: 'Contacter le développeur',
  readCase: 'Découvrir le projet',
};
