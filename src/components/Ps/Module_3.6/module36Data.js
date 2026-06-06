export const module36NavGroups = [
  {
    label: 'Paiements',
    items: [
      { label: 'Tableau de bord', icon: '⊞', to: '/paiements', end: true },
      { label: 'Liste des paiements', icon: '≡', to: '/paiements/liste' },
      { label: 'Enregistrer paiement', icon: '⊕', to: '/paiements/create' },
      { label: 'Impayés', icon: '⊘', to: '/paiements/impayes' },
      { label: 'Historique', icon: '⏱', to: '/paiements/historique' },
      { label: 'Factures', icon: '📄', to: '/paiements/factures' },
    ],
  },
  {
    label: 'Impressions / Exports',
    items: [
      { label: 'Liste de classe', icon: '👥', to: '/paiements/exports/liste-classe' },
      { label: 'Bulletin', icon: '📋', to: '/paiements/exports/bulletin' },
      { label: 'Facture', icon: '🖨', to: '/paiements/exports/facture' },
      { label: 'Fiche élève', icon: '📁', to: '/paiements/exports/fiche-eleve' },
      { label: 'Export Excel', icon: '📊', to: '/paiements/exports/excel' },
    ],
  },
]

export const module36DashboardStats = [
  { label: 'RECETTES DU MOIS', value: '1 245 000 FCFA', trend: '+12.4% vs mois dernier', trendColor: '#10B981', icon: '📈', iconBg: '#7C3AED', largeValue: true },
  { label: 'PAIEMENTS CE MOIS', value: '84', trend: '+8 vs mois dernier', trendColor: '#10B981', icon: '💳', iconBg: '#10B981' },
  { label: 'IMPAYÉS', value: '12', trend: '-3 vs mois dernier', trendColor: '#10B981', icon: '⏰', iconBg: '#EF4444' },
  { label: 'ÉLÈVES INSCRITS', value: '342', trend: '+5 vs mois dernier', trendColor: '#10B981', icon: '👥', iconBg: '#F59E0B' },
]

export const module36RecentPayments = [
  { initials: 'MB', color: '#8B5CF6', name: 'Mariama Bah', detail: 'Scolarité T2 · CM2-A', amount: '75 000 FCFA', status: 'Payé', statusColor: '#10B981', statusBg: '#D1FAE5' },
  { initials: 'OD', color: '#F59E0B', name: 'Ousmane Diop', detail: 'Cantine Avril · CE1-B', amount: '18 000 FCFA', status: 'Payé', statusColor: '#10B981', statusBg: '#D1FAE5' },
  { initials: 'FS', color: '#10B981', name: 'Fatou Sow', detail: 'Scolarité T2 · CM1-A', amount: '75 000 FCFA', status: 'En attente', statusColor: '#F59E0B', statusBg: '#FEF3C7' },
  { initials: 'IN', color: '#3B82F6', name: 'Ibrahima Ndiaye', detail: 'Inscription · CP-A', amount: '50 000 FCFA', status: 'Payé', statusColor: '#10B981', statusBg: '#D1FAE5' },
  { initials: 'AC', color: '#EF4444', name: 'Awa Cissé', detail: 'Scolarité T2 · CM2-B', amount: '75 000 FCFA', status: 'En retard', statusColor: '#EF4444', statusBg: '#FEE2E2' },
]

export const module36UrgentUnpaid = [
  { name: 'Awa Cissé', class: 'CM2-B', days: 30, amount: '75 000 FCFA' },
  { name: 'Fatou Sow', class: 'CM1-A', days: 16, amount: '75 000 FCFA' },
  { name: 'Khady Diallo', class: 'CP-B', days: 16, amount: '75 000 FCFA' },
  { name: 'Cheikh Ba', class: 'CE2-B', days: 11, amount: '95 000 FCFA' },
]

export const module36Students = [
  'Mariama Bah',
  'Ousmane Diop',
  'Fatou Sow',
  'Ibrahima Ndiaye',
  'Awa Cissé',
  'Modou Faye',
]

export const module36PaymentTypes = [
  'Scolarité T1',
  'Scolarité T2',
  'Scolarité T3',
  'Cantine',
  'Transport',
  'Inscription',
  'Fournitures',
]

export const module36PaymentModes = [
  { id: 'especes', label: 'Espèces', icon: '💵' },
  { id: 'mobile', label: 'Mobile Money', icon: '📱' },
  { id: 'carte', label: 'Carte bancaire', icon: '💳' },
  { id: 'virement', label: 'Virement', icon: '🏦' },
]

export function formatFcfa(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

export const module36InvoiceActions = [
  { icon: '✉', label: 'Envoyer', variant: 'outline' },
  { icon: '🖨', label: 'Imprimer', variant: 'outline' },
  { icon: '⬇', label: 'Télécharger PDF', variant: 'filled' },
]

export const module36Invoice = {
  number: 'FAC-2025-0142',
  issuedAt: '12/04/2025',
  school: {
    name: 'École Primaire Les Lauriers',
    address: 'Avenue Cheikh Anta Diop, Dakar',
    contact: '+221 33 824 00 00 · contact@leslauriers.sn',
  },
  billedTo: {
    name: 'Mariama Bah',
    class: 'CM2-A',
    guardian: 'M. Ibrahima Bah',
    phone: '+221 77 123 45 67',
  },
  details: {
    schoolYear: '2024–2025',
    dueDate: '30/04/2025',
    paymentMode: 'Mobile Money',
  },
  lines: [
    { description: 'Scolarité — Trimestre 2', qte: 1, prix: 75000 },
    { description: 'Cantine — Avril 2025', qte: 1, prix: 18000 },
    { description: 'Transport scolaire', qte: 1, prix: 22000 },
  ],
  footer: 'Merci pour votre confiance. Pour toute question, contactez le secrétariat.',
}

export const module36HistoryPeriods = [
  'Année scolaire',
  'Ce mois',
  'Mois dernier',
  'Ce trimestre',
]

export const module36HistoryTypeFilters = [
  'Tous types',
  'Scolarité',
  'Cantine',
  'Transport',
  'Inscription',
  'Fournitures',
]

export const module36PaymentStatusColors = {
  Payé: '#10B981',
  'En attente': '#F59E0B',
  'En retard': '#EF4444',
}

export const module36PaymentStatusRings = {
  Payé: '#D1FAE5',
  'En attente': '#FEF3C7',
  'En retard': '#FEE2E2',
}

export const module36StudentPaymentHistory = {
  'Mariama Bah': [
    { type: 'Scolarité T2', date: '2025-04-12', mode: 'Mobile Money', facture: 'FAC-2025-0142', montant: 75000, statut: 'Payé' },
    { type: 'Cantine Avril', date: '2025-04-11', mode: 'Espèces', facture: 'FAC-2025-0141', montant: 18000, statut: 'Payé' },
    { type: 'Scolarité T2', date: '2025-04-10', mode: 'Espèces', facture: 'FAC-2025-0140', montant: 75000, statut: 'Payé' },
    { type: 'Inscription', date: '2025-04-08', mode: 'Virement', facture: 'FAC-2025-0139', montant: 50000, statut: 'Payé' },
    { type: 'Transport', date: '2025-03-15', mode: 'Mobile Money', facture: 'FAC-2025-0118', montant: 27000, statut: 'Payé' },
  ],
  'Ousmane Diop': [
    { type: 'Cantine Avril', date: '2025-04-11', mode: 'Espèces', facture: 'FAC-2025-0141', montant: 18000, statut: 'Payé' },
    { type: 'Scolarité T1', date: '2025-01-10', mode: 'Virement', facture: 'FAC-2025-0087', montant: 75000, statut: 'Payé' },
  ],
  'Fatou Sow': [
    { type: 'Scolarité T2', date: '2025-04-10', mode: 'Mobile Money', facture: 'FAC-2025-0140', montant: 75000, statut: 'En attente' },
    { type: 'Inscription', date: '2025-01-05', mode: 'Espèces', facture: 'FAC-2025-0065', montant: 50000, statut: 'Payé' },
  ],
  'Ibrahima Ndiaye': [
    { type: 'Inscription', date: '2025-04-08', mode: 'Virement', facture: 'FAC-2025-0139', montant: 50000, statut: 'Payé' },
    { type: 'Transport', date: '2025-03-20', mode: 'Espèces', facture: 'FAC-2025-0120', montant: 22000, statut: 'Payé' },
  ],
}

export function filterPaymentHistory(payments, typeFilter) {
  if (typeFilter === 'Tous types') return payments
  return payments.filter(payment => payment.type.toLowerCase().includes(typeFilter.toLowerCase()))
}

export const module36UnpaidList = [
  { initials: 'AC', color: '#EF4444', name: 'Awa Cissé', classe: 'CM2-B', classeColor: '#7C3AED', montant: 75000, echeance: '2025-04-01', retard: 30 },
  { initials: 'FS', color: '#10B981', name: 'Fatou Sow', classe: 'CM1-A', classeColor: '#8B5CF6', montant: 75000, echeance: '2025-04-15', retard: 16 },
  { initials: 'KD', color: '#3B82F6', name: 'Khady Diallo', classe: 'CP-B', classeColor: '#10B981', montant: 75000, echeance: '2025-04-15', retard: 16 },
  { initials: 'CB', color: '#F59E0B', name: 'Cheikh Ba', classe: 'CE2-B', classeColor: '#7C3AED', montant: 95000, echeance: '2025-04-20', retard: 11 },
  { initials: 'AG', color: '#8B5CF6', name: 'Aminata Gueye', classe: 'CM2-A', classeColor: '#7C3AED', montant: 22000, echeance: '2025-04-25', retard: 6 },
]

export function getRetardBadge(days) {
  if (days >= 30) return { bg: '#FEE2E2', color: '#DC2626' }
  if (days >= 11) return { bg: '#FEF9C3', color: '#B45309' }
  return { bg: '#FEF3C7', color: '#D97706' }
}

export function getUnpaidSummary(unpaidList) {
  const totalMontant = unpaidList.reduce((sum, item) => sum + item.montant, 0)
  const retardMoyen = Math.round(unpaidList.reduce((sum, item) => sum + item.retard, 0) / unpaidList.length)

  return {
    totalMontant,
    totalEleves: unpaidList.length,
    retardMoyen,
  }
}

export const module36PaymentsList = [
  { facture: 'FAC-2025-0142', eleve: 'Mariama Bah', classe: 'CM2-A', classeColor: '#7C3AED', type: 'Scolarité T2', montant: 75000, date: '2025-04-12', statut: 'Payé' },
  { facture: 'FAC-2025-0141', eleve: 'Ousmane Diop', classe: 'CE1-B', classeColor: '#3B82F6', type: 'Cantine Avril', montant: 18000, date: '2025-04-11', statut: 'Payé' },
  { facture: 'FAC-2025-0140', eleve: 'Fatou Sow', classe: 'CM1-A', classeColor: '#8B5CF6', type: 'Scolarité T2', montant: 75000, date: '2025-04-10', statut: 'En attente' },
  { facture: 'FAC-2025-0139', eleve: 'Ibrahima Ndiaye', classe: 'CP-A', classeColor: '#10B981', type: 'Inscription', montant: 50000, date: '2025-04-08', statut: 'Payé' },
  { facture: 'FAC-2025-0138', eleve: 'Awa Cissé', classe: 'CM2-B', classeColor: '#7C3AED', type: 'Scolarité T2', montant: 75000, date: '2025-04-05', statut: 'En retard' },
  { facture: 'FAC-2025-0137', eleve: 'Modou Faye', classe: 'CE2-A', classeColor: '#F59E0B', type: 'Transport', montant: 22000, date: '2025-04-03', statut: 'Payé' },
  { facture: 'FAC-2025-0136', eleve: 'Khady Diallo', classe: 'CP-B', classeColor: '#10B981', type: 'Scolarité T2', montant: 75000, date: '2025-04-01', statut: 'En attente' },
  { facture: 'FAC-2025-0135', eleve: 'Lamine Sarr', classe: 'CM1-B', classeColor: '#EF4444', type: 'Fournitures', montant: 12000, date: '2025-03-28', statut: 'Payé' },
]

export const module36PaymentsTotalCount = 84

export const module36ListFilterLabels = ['Élève / Classe', 'Période', 'Statut']

export const module36ListStatusStyles = {
  Payé: { color: '#059669', bg: '#D1FAE5' },
  'En attente': { color: '#D97706', bg: '#FEF3C7' },
  'En retard': { color: '#DC2626', bg: '#FEE2E2' },
}

export function filterPaymentsList(payments, search) {
  const query = search.toLowerCase()
  return payments.filter(
    payment =>
      payment.eleve.toLowerCase().includes(query) ||
      payment.facture.toLowerCase().includes(query),
  )
}

export const module36ExportClasses = ['CM2-A', 'CM2-B', 'CM1-A', 'CM1-B', 'CE2-A', 'CE1-B', 'CP-A', 'CP-B']

export const module36ClassStudents = {
  'CM2-A': [
    { matricule: 'ELV-1042', nom: 'Mariama Bah', genre: 'F', naissance: '12/03/2014', statut: 'Payé' },
    { matricule: 'ELV-1048', nom: 'Aminata Gueye', genre: 'F', naissance: '05/07/2014', statut: 'Payé' },
    { matricule: 'ELV-1051', nom: 'Cheikh Ndiaye', genre: 'M', naissance: '18/09/2014', statut: 'En attente' },
    { matricule: 'ELV-1056', nom: 'Rokhaya Fall', genre: 'F', naissance: '22/01/2015', statut: 'Payé' },
  ],
  'CM2-B': [
    { matricule: 'ELV-1038', nom: 'Awa Cissé', genre: 'F', naissance: '08/11/2014', statut: 'En retard' },
    { matricule: 'ELV-1044', nom: 'Moussa Diallo', genre: 'M', naissance: '14/04/2014', statut: 'Payé' },
    { matricule: 'ELV-1053', nom: 'Aïssatou Ba', genre: 'F', naissance: '30/06/2014', statut: 'Payé' },
  ],
  'CM1-A': [
    { matricule: 'ELV-1021', nom: 'Fatou Sow', genre: 'F', naissance: '03/02/2015', statut: 'En attente' },
    { matricule: 'ELV-1027', nom: 'Lamine Sarr', genre: 'M', naissance: '19/08/2015', statut: 'Payé' },
    { matricule: 'ELV-1031', nom: 'Ndèye Mbaye', genre: 'F', naissance: '25/10/2015', statut: 'Payé' },
  ],
}

export const module36BulletinStudents = ['Mariama Bah', 'Ousmane Diop', 'Fatou Sow', 'Ibrahima Ndiaye']
export const module36BulletinTrimesters = ['Trimestre 1', 'Trimestre 2', 'Trimestre 3']

export const module36BulletinGrades = {
  'Mariama Bah': [
    { matiere: 'Français', coef: 3, note: 14.5, appreciation: 'Bon travail' },
    { matiere: 'Mathématiques', coef: 3, note: 16, appreciation: 'Très bien' },
    { matiere: 'Sciences', coef: 2, note: 13, appreciation: 'Assez bien' },
    { matiere: 'Histoire-Géo', coef: 2, note: 15, appreciation: 'Bien' },
    { matiere: 'Anglais', coef: 2, note: 12.5, appreciation: 'Peut mieux faire' },
  ],
  'Ousmane Diop': [
    { matiere: 'Français', coef: 3, note: 11, appreciation: 'Efforts à fournir' },
    { matiere: 'Mathématiques', coef: 3, note: 13.5, appreciation: 'Assez bien' },
    { matiere: 'Sciences', coef: 2, note: 12, appreciation: 'Passable' },
    { matiere: 'Histoire-Géo', coef: 2, note: 14, appreciation: 'Bien' },
    { matiere: 'Anglais', coef: 2, note: 10.5, appreciation: 'Insuffisant' },
  ],
  'Fatou Sow': [
    { matiere: 'Français', coef: 3, note: 15.5, appreciation: 'Excellent' },
    { matiere: 'Mathématiques', coef: 3, note: 14, appreciation: 'Bien' },
    { matiere: 'Sciences', coef: 2, note: 16, appreciation: 'Très bien' },
    { matiere: 'Histoire-Géo', coef: 2, note: 13.5, appreciation: 'Assez bien' },
    { matiere: 'Anglais', coef: 2, note: 14.5, appreciation: 'Bien' },
  ],
  'Ibrahima Ndiaye': [
    { matiere: 'Français', coef: 3, note: 12, appreciation: 'Passable' },
    { matiere: 'Mathématiques', coef: 3, note: 15, appreciation: 'Bien' },
    { matiere: 'Sciences', coef: 2, note: 14.5, appreciation: 'Bien' },
    { matiere: 'Histoire-Géo', coef: 2, note: 13, appreciation: 'Assez bien' },
    { matiere: 'Anglais', coef: 2, note: 11.5, appreciation: 'Passable' },
  ],
}

export const module36StudentProfiles = {
  'Mariama Bah': {
    matricule: 'ELV-1042',
    classe: 'CM2-A',
    naissance: '12/03/2014',
    genre: 'Féminin',
    tuteur: 'M. Ibrahima Bah',
    telephone: '+221 77 123 45 67',
    adresse: 'Parcelles Assainies, Dakar',
    inscription: '01/09/2024',
    statut: 'Actif',
    paiement: 'À jour',
  },
  'Ousmane Diop': {
    matricule: 'ELV-1035',
    classe: 'CE1-B',
    naissance: '20/05/2016',
    genre: 'Masculin',
    tuteur: 'Mme Awa Diop',
    telephone: '+221 76 987 65 43',
    adresse: 'Médina, Dakar',
    inscription: '01/09/2024',
    statut: 'Actif',
    paiement: 'À jour',
  },
  'Fatou Sow': {
    matricule: 'ELV-1021',
    classe: 'CM1-A',
    naissance: '03/02/2015',
    genre: 'Féminin',
    tuteur: 'M. Mamadou Sow',
    telephone: '+221 78 456 12 34',
    adresse: 'Grand Yoff, Dakar',
    inscription: '01/09/2024',
    statut: 'Actif',
    paiement: 'En attente',
  },
  'Ibrahima Ndiaye': {
    matricule: 'ELV-1018',
    classe: 'CP-A',
    naissance: '15/11/2017',
    genre: 'Masculin',
    tuteur: 'M. Cheikh Ndiaye',
    telephone: '+221 77 321 98 76',
    adresse: 'Ouakam, Dakar',
    inscription: '01/09/2024',
    statut: 'Actif',
    paiement: 'À jour',
  },
}

export const module36ExcelExports = [
  { id: 'paiements', title: 'Paiements', description: 'Export de tous les paiements par période', icon: '💳', rows: 84, format: 'xlsx' },
  { id: 'impayes', title: 'Impayés', description: 'Liste des élèves avec paiements en retard', icon: '⏰', rows: 12, format: 'xlsx' },
  { id: 'eleves', title: 'Élèves', description: 'Répertoire complet des élèves inscrits', icon: '👥', rows: 342, format: 'xlsx' },
  { id: 'classes', title: 'Classes', description: 'Effectifs et répartition par classe', icon: '🏫', rows: 18, format: 'xlsx' },
  { id: 'recettes', title: 'Recettes mensuelles', description: 'Synthèse des recettes par mois', icon: '📈', rows: 12, format: 'xlsx' },
  { id: 'factures', title: 'Factures', description: 'Historique des factures émises', icon: '📄', rows: 156, format: 'xlsx' },
]

export const module36PrintActions = [
  { icon: '🖨', label: 'Imprimer', variant: 'outline' },
  { icon: '⬇', label: 'Télécharger PDF', variant: 'filled' },
]

export function computeBulletinAverage(grades) {
  const totalCoef = grades.reduce((sum, item) => sum + item.coef, 0)
  const weighted = grades.reduce((sum, item) => sum + item.note * item.coef, 0)
  return (weighted / totalCoef).toFixed(2)
}
