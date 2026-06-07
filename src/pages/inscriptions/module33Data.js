const FIRST_NAMES = ['Evelyn', 'Diana', 'John', 'Amara', 'Lucas', 'Sophie', 'Karim', 'Ines', 'Paul', 'Marie', 'Théo', 'Fatou', 'Alexis', 'Mireille', 'Samuel', 'Chloe', 'David', 'Aicha', 'Pierre', 'Nadia', 'Kevin', 'Béatrice', 'Amos', 'Rachel', 'Brice', 'Léa', 'Serge', 'Vanessa', 'Herve', 'Claudine']
const LAST_NAMES = ['Harper', 'Plenty', 'Millar', 'Konan', 'Mbarga', 'Bello', 'Tamba', 'Fotso', 'Ateba', 'Essama', 'Nkomo', 'Bilong', 'Ewane', 'Mba', 'Fouda', 'Bella', 'Nganou', 'Soppo', 'Mongo', 'Kotto', 'Djike', 'Feudjio', 'Epanda', 'Bekolo', 'Tonye', 'Abena', 'Ondoa', 'Mvogo', 'Ngolle', 'Kameni']

export const module33Sections = ['Tous', 'Francophone', 'Anglophone', 'Bilingue']
export const module33SectionClasses = {
  Francophone: ['SIL', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'],
  Anglophone: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
  Bilingue: ['SIL Bilingue', 'Class 1 Bilingue', 'Class 2 Bilingue', 'Class 3 Bilingue', 'Class 4 Bilingue'],
}
export const module33ClassFilters = ['Tous', ...Object.values(module33SectionClasses).flat()]
export const module33SchoolYears = ['2025–2026', '2024–2025']
export const module33SearchTypes = ['Nom', 'Matricule', 'Classe', 'Tuteur']
export const module33RecentSearches = ['Mbarga', 'CM2 Francophone', 'ELV10247', 'Tuteur absent', 'Section Bilingue']
export const module33QuickTags = ['Actifs', 'Nouveaux', 'Bilingue', 'Suivi']

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick(items) {
  return items[rnd(0, items.length - 1)]
}

function pickSection(index) {
  return module33Sections[1 + (index % (module33Sections.length - 1))]
}

function pickClassName(section) {
  const classPool = module33SectionClasses[section] || module33SectionClasses.Francophone
  return pick(classPool)
}

function formatDateValue(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatLongDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function buildMatricule(index) {
  return `ELV${String(10240 + index).padStart(5, '0')}`
}

export function getStudentName(student) {
  return `${student.firstName} ${student.lastName}`
}

function makeStudent(index) {
  const firstName = FIRST_NAMES[index % FIRST_NAMES.length]
  const lastName = LAST_NAMES[index % LAST_NAMES.length]
  const section = pickSection(index)
  const className = pickClassName(section)
  const status = index % 11 === 0 ? 'warning' : index % 8 === 0 ? 'inactive' : 'active'
  const gender = index % 2 === 0 ? 'M' : 'F'
  const birthDate = new Date(2013 + (index % 5), (index * 3) % 12, 5 + (index % 20))
  const result = 62 + (index % 35)

  return {
    id: buildMatricule(index),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
    className,
    section,
    gender,
    birthDate,
    birthDateLabel: formatDateValue(birthDate),
    tutor: `M. ${LAST_NAMES[(index + 7) % LAST_NAMES.length]} ${FIRST_NAMES[(index + 2) % FIRST_NAMES.length]}`,
    status,
    result,
    city: ['Yaoundé', 'Douala', 'Bafoussam', 'Garoua', 'Buea'][index % 5],
    year: '2025–2026',
    color: ['#4C1D95', '#06B6D4', '#059669', '#D97706', '#DB2777'][index % 5],
  }
}

export const module33Students = Array.from({ length: 36 }, (_, index) => makeStudent(index + 1))

export const module33Profile = {
  id: 'ELV10247',
  firstName: 'Emile',
  lastName: 'Mbarga',
  fullName: 'Emile Jean Mbarga',
  initials: 'EM',
  className: 'CM2',
  section: 'Francophone',
  gender: 'M',
  year: '2025–2026',
  status: 'active',
  birthDate: new Date(2015, 2, 12),
  birthDateLabel: '12 mars 2015',
  birthPlace: 'Yaoundé',
  nationality: 'Camerounaise',
  tutor: 'M. Mbarga Jean',
  tutorRole: 'Père',
  phone: '699 000 000',
  secondaryPhone: '677 000 000',
  address: 'Quartier Melen, Yaoundé',
  profession: 'Fonctionnaire',
  originSchool: 'École publique du centre',
  bloodGroup: 'O+',
  observations: 'Aucune allergie connue. Suivi régulier avec présence stable.',
  tags: ['CM2 - Francophone', 'Actif', 'Garçon', '2025–2026'],
  metrics: [
    { label: 'Moyenne générale', value: '17,8/20', accent: 'success' },
    { label: 'Présence', value: '96 %', accent: 'info' },
    { label: 'Retards', value: '2', accent: 'warning' },
    { label: 'Rang classe', value: '3e', accent: 'primary' },
  ],
  notes: [
    { subject: 'Mathématiques', teacher: 'Mme Bilong', average: 18.8, grade: 'fg' },
    { subject: 'Français', teacher: 'M. Nkomo', average: 17.2, grade: 'fv' },
    { subject: 'Sciences', teacher: 'Mme Tagne', average: 16.9, grade: 'fv' },
    { subject: 'EPS', teacher: 'M. Kameni', average: 19.0, grade: 'fg' },
  ],
  payments: [
    { type: 'Scolarité', date: '12 janv. 2026', amount: '45 000 FCFA', status: 'payé' },
    { type: 'Transport', date: '04 fév. 2026', amount: '10 000 FCFA', status: 'payé' },
    { type: 'Cantine', date: '18 fév. 2026', amount: '8 000 FCFA', status: 'en attente' },
  ],
  incidents: [
    { type: 'Retard', date: '08 fév. 2026', detail: 'Arrivée tardive au premier cours', sanction: 'Avertissement' },
    { type: 'Matériel oublié', date: '14 fév. 2026', detail: 'Cahier de maths non apporté', sanction: 'Observation' },
    { type: 'Participation', date: '21 fév. 2026', detail: 'Travail de groupe salué par l’enseignant', sanction: 'Positif' },
  ],
  transport: {
    status: 'Abonnement actif',
    route: 'Melen - Centre-ville',
    driver: 'M. Njoumessi',
    vehicle: 'Bus T-03',
    departure: '06h30',
  },
  timeline: [
    { label: 'Inscription validée', detail: 'CM2 - Francophone', time: '03 sept. 2025', tone: 'success' },
    { label: 'Dernière mise à jour', detail: 'Contact tuteur confirmé', time: '14 fév. 2026', tone: 'info' },
    { label: 'Bulletin intermédiaire', detail: 'Moyenne générale 17,8/20', time: '28 fév. 2026', tone: 'primary' },
  ],
}

export const module33SearchModes = [
  { label: 'Carte', value: 'cards' },
  { label: 'Table', value: 'table' },
]

export const module33SearchDefaultFilters = {
  className: 'Tous',
  section: 'Tous',
  year: '2025–2026',
  onlyActive: true,
}

export function getStudentStatusLabel(status) {
  if (status === 'inactive') return 'Désactivé'
  if (status === 'warning') return 'À surveiller'
  return 'Actif'
}

export function getStudentStatusClass(status) {
  if (status === 'inactive') return 'danger'
  if (status === 'warning') return 'warning'
  return 'success'
}

export function formatSearchDate(date) {
  return formatDateValue(date)
}

export function getStudentById(studentId) {
  return module33Students.find(student => student.id === studentId) ?? module33Profile
}
