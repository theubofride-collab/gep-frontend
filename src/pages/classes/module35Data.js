const FIRST_NAMES = ['Élodie', 'Marcel', 'Inès', 'Roméo', 'Clarisse', 'Thierry', 'Awa', 'Boris', 'Nina', 'Justin', 'Laure', 'Christophe', 'Sonia', 'Patrick', 'Mélissa', 'Franck', 'Kévin', 'Audrey', 'Samuel', 'Rebecca', 'Antoine', 'Vanessa', 'Théo', 'Astrid', 'Gaël', 'Ornella', 'Dany', 'Sylvie', 'Nathan', 'Amina', 'Eliane', 'Cédric', 'Flore', 'Yannick', 'Magda', 'Serge', 'Oné', 'Esther']
const LAST_NAMES = ['Mvogo', 'Nkongo', 'Ateba', 'Samba', 'Fouda', 'Etame', 'Kamga', 'Ndongo', 'Bikié', 'Tagne', 'Bekolo', 'Manga', 'Fongang', 'Nyambi', 'Biyong', 'Epanda', 'Djontu', 'Messe', 'Njoya', 'Bilong', 'Sop', 'Abanda', 'Nlend', 'Mbarga', 'Fomekong', 'Bello', 'Kotto', 'Engonga', 'Mba', 'Djike', 'Ekinde', 'Bassong', 'Ondua', 'Foumbi', 'Azombo', 'Bessa', 'Mengue', 'Nguini']

export const module35Levels = ['CP', 'CE1', 'CE2', 'CM1', 'CM2']
export const module35Sections = ['Tous', 'Francophone', 'Anglophone', 'Bilingue']
export const module35SchoolYears = ['2025–2026', '2024–2025']

export const module35SectionMeta = {
  Francophone: {
    key: 'fr',
    label: 'Francophone',
    icon: '🇫🇷',
    badgeClass: 'b-fr',
    selectedClass: 'sel-fr',
    cardClass: 'card-fr',
    accent: 'linear-gradient(90deg,#7C3AED,#A78BFA)',
    fill: 'linear-gradient(90deg,#7C3AED,#A78BFA)',
    classes: ['SIL', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'],
  },
  Anglophone: {
    key: 'en',
    label: 'Anglophone',
    icon: '🇬🇧',
    badgeClass: 'b-en',
    selectedClass: 'sel-en',
    cardClass: 'card-en',
    accent: 'linear-gradient(90deg,#0284C7,#38BDF8)',
    fill: 'linear-gradient(90deg,#0284C7,#38BDF8)',
    classes: ['Nursery 1', 'Nursery 2', 'Class 1', 'Class 2', 'Class 3'],
  },
  Bilingue: {
    key: 'bi',
    label: 'Bilingue',
    icon: '🌐',
    badgeClass: 'b-bi',
    selectedClass: 'sel-bi',
    cardClass: 'card-bi',
    accent: 'linear-gradient(90deg,#059669,#34D399)',
    fill: 'linear-gradient(90deg,#059669,#34D399)',
    classes: ['SIL Bilingue', 'Class 1 Bilingue', 'Class 2 Bilingue', 'Class 3 Bilingue'],
  },
}

function pick(items, index) {
  return items[index % items.length]
}

function makeInitials(value) {
  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()
}

function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function makeTeacher(fullName, grade, sections, specialties, dispo, currentClass, note, avatarColor, nbClasses, nbStudents) {
  return {
    id: `ENS-${makeInitials(fullName)}-${sections.join('').toUpperCase()}`,
    fullName,
    initials: makeInitials(fullName),
    grade,
    years: 2 + (fullName.length % 11),
    sections,
    specialties,
    tags: sections.map(sectionKey => {
      if (sectionKey === 'fr') return 'tag-fr'
      if (sectionKey === 'en') return 'tag-en'
      return 'tag-bi'
    }),
    tagLabels: sections.map(sectionKey => {
      if (sectionKey === 'fr') return '🇫🇷 Francophone'
      if (sectionKey === 'en') return '🇬🇧 Anglophone'
      return '🌐 Bilingue'
    }),
    dispo,
    currentClass,
    nbClasses,
    nbEleves: nbStudents,
    note,
    avatarColor,
  }
}

export const module35Teachers = [
  makeTeacher('Mme Ekotto Sylvie', 'Professeure certifiée', ['bi'], ['Français', 'Anglais', 'Histoire-Géo'], 'current', 'CM2/BI', 4.8, 'linear-gradient(135deg,#059669,#34D399)', 1, 38),
  makeTeacher('M. Mbarga Jean', 'Professeur certifié', ['fr'], ['Mathématiques', 'Sciences'], 'occupe', 'CM1/FR', 4.6, 'linear-gradient(135deg,#7C3AED,#A78BFA)', 1, 41),
  makeTeacher('Mme Fotso Claire', 'Institutrice', ['fr', 'bi'], ['Français', 'Éducation civique'], 'libre', null, 4.5, 'linear-gradient(135deg,#D97706,#FBBF24)', 0, 0),
  makeTeacher('M. Ateba Pierre', 'Professeur certifié', ['en', 'bi'], ['Mathématiques', 'Sciences', 'Anglais'], 'occupe', 'CE2/EN', 4.9, 'linear-gradient(135deg,#0284C7,#38BDF8)', 1, 35),
  makeTeacher('Mme Bella Rose', 'Institutrice', ['fr'], ['Français', 'Histoire-Géo'], 'libre', null, 4.2, 'linear-gradient(135deg,#E11D48,#FB7185)', 0, 0),
  makeTeacher('M. Kotto André', 'Professeur certifié', ['bi', 'en'], ['Mathématiques', 'Anglais', 'Sciences'], 'libre', null, 4.7, 'linear-gradient(135deg,#4C1D95,#6D28D9)', 0, 0),
  makeTeacher('Mme Mongo Hélène', 'Institutrice', ['fr', 'bi'], ['Français', 'Anglais', 'Éducation civique'], 'occupe', 'CP/BI', 4.4, 'linear-gradient(135deg,#059669,#0284C7)', 1, 30),
  makeTeacher('M. Soppo Luc', 'Professeur certifié', ['en'], ['Mathématiques', 'Sciences', 'Sport'], 'occupe', 'CM2/EN', 4.8, 'linear-gradient(135deg,#06B6D4,#22D3EE)', 1, 39),
  makeTeacher('Mme Nganou Anne', 'Institutrice', ['fr'], ['Français', 'Histoire-Géo', 'Éducation civique'], 'libre', null, 4.1, 'linear-gradient(135deg,#374151,#9CA3AF)', 0, 0),
  makeTeacher('M. Tagne Paul', 'Professeur certifié', ['bi', 'fr', 'en'], ['Mathématiques', 'Sciences', 'Anglais'], 'libre', null, 4.9, 'linear-gradient(135deg,#7C3AED,#06B6D4)', 0, 0),
  makeTeacher('M. Feudjio Marc', 'Professeur certifié', ['bi', 'en'], ['Mathématiques', 'Sciences', 'Anglais'], 'occupe', 'CM1/BI', 4.7, 'linear-gradient(135deg,#059669,#0284C7)', 1, 33),
  makeTeacher('Mme Ndoumbe Sara', 'Institutrice', ['fr', 'bi'], ['Français', 'Anglais'], 'libre', null, 3.9, 'linear-gradient(135deg,#D97706,#E11D48)', 0, 0),
]

function makeClass(level, sectionLabel, sectionIndex) {
  const meta = module35SectionMeta[sectionLabel]
  const className = `${level} — ${sectionLabel}`
  const code = `${level}/${meta.key.toUpperCase()}`
  const teacherPoolIndex = (sectionIndex * 3 + level.length) % module35Teachers.length
  const teacher = module35Teachers[teacherPoolIndex]
  const capacity = 45

  if (level === 'CM2' && sectionLabel === 'Bilingue') {
    return {
      id: 'CLS127',
      level,
      section: sectionLabel,
      sectionKey: meta.key,
      sectionLabel,
      sectionIcon: meta.icon,
      name: className,
      code,
      identifier: 'CLS127',
      effectif: 38,
      capacity,
      teacher: module35Teachers[0].fullName,
      teacherId: module35Teachers[0].id,
      room: 'Salle C4 — Bloc C',
      year: '2025–2026',
      status: 'active',
      createdAt: '01/09/2025',
      updatedAt: '15/01/2026',
      average: 13.2,
      incidents: 4,
      boys: 18,
      girls: 20,
      observations: 'Classe bilingue de CM2. Les cours de sciences et mathématiques sont dispensés en anglais, les autres disciplines restent équilibrées entre le français et l’anglais.',
      accent: meta.accent,
      fill: meta.fill,
      subjects: [
        { name: 'Français', teacher: 'Mme Ekotto Sylvie', average: 14.5, tone: 'good' },
        { name: 'Mathématiques', teacher: 'Mme Ekotto Sylvie', average: 13.8, tone: 'mid' },
        { name: 'Sciences', teacher: 'Mme Ekotto Sylvie', average: 12.9, tone: 'warn' },
        { name: 'Anglais', teacher: 'Mme Ekotto Sylvie', average: 14.1, tone: 'good' },
        { name: 'Histoire-Géo', teacher: 'Mme Ekotto Sylvie', average: 12.7, tone: 'mid' },
      ],
      topStudents: [],
      incidentsList: [
        { type: 'Retard répétitif', student: 'Mélissa Fongang', description: '3 retards notés sur la période', date: '12 fév. 2026', sanction: 'Avertissement oral', tone: 'moyen' },
        { type: 'Absence non justifiée', student: 'Nathan Bessa', description: 'Absence de 2 jours consécutifs', date: '02 fév. 2026', sanction: 'Convocation du tuteur', tone: 'grave' },
        { type: 'Matériel oublié', student: 'Inès Ndongo', description: 'Cahier de sciences non apporté', date: '22 janv. 2026', sanction: 'Rappel à l’ordre', tone: 'leger' },
        { type: 'Bavardage en classe', student: 'Marcel Nkongo', description: 'Perturbation du cours de français', date: '08 janv. 2026', sanction: 'Travail supplémentaire', tone: 'moyen' },
      ],
    }
  }

  const effectif = 22 + ((sectionIndex * 5 + level.length * 2) % 18)
  const roomChoices = ['Salle A1', 'Salle B2', 'Salle C3', 'Salle D4', 'Salle E1', 'Salle F2']
  const createdAt = new Date(2025, (sectionIndex * 2 + level.length) % 12, 1 + ((sectionIndex + level.length) % 24))

  return {
    id: `CLS${100 + sectionIndex * 5 + module35Levels.indexOf(level)}`,
    level,
    section: sectionLabel,
    sectionKey: meta.key,
    sectionLabel,
    sectionIcon: meta.icon,
    name: className,
    code,
    identifier: `CLS${100 + sectionIndex * 5 + module35Levels.indexOf(level)}`,
    effectif,
    capacity,
    teacher: teacher?.fullName ?? 'Non affecté',
    teacherId: teacher?.id ?? null,
    room: pick(roomChoices, sectionIndex + level.length),
    year: '2025–2026',
    status: 'active',
    createdAt: formatDate(createdAt),
    updatedAt: formatDate(new Date(createdAt.getFullYear(), createdAt.getMonth() + 1, createdAt.getDate() + 5)),
    average: 11.5 + ((sectionIndex + level.length) % 4),
    incidents: (sectionIndex + level.length) % 5,
    boys: Math.round(effectif * 0.52),
    girls: effectif - Math.round(effectif * 0.52),
    observations: `${className} suit le programme officiel avec un suivi hebdomadaire des acquis et une mise en valeur des activités pratiques.`,
    accent: meta.accent,
    fill: meta.fill,
    subjects: [
      { name: 'Français', teacher: teacher?.fullName ?? 'Non affecté', average: 11.2 + (sectionIndex % 4), tone: 'mid' },
      { name: 'Mathématiques', teacher: teacher?.fullName ?? 'Non affecté', average: 10.8 + ((sectionIndex + 1) % 5), tone: 'warn' },
      { name: 'Sciences', teacher: teacher?.fullName ?? 'Non affecté', average: 11.9 + ((sectionIndex + 2) % 4), tone: 'good' },
    ],
    topStudents: [],
    incidentsList: [],
  }
}

export const module35Classes = module35Levels.flatMap((level, levelIndex) =>
  Object.keys(module35SectionMeta).map((sectionLabel, sectionIndex) => makeClass(level, sectionLabel, levelIndex + sectionIndex))
)

export const module35Profile = module35Classes.find(item => item.id === 'CLS127')

function makeProfileStudent(index) {
  const firstName = pick(FIRST_NAMES, index)
  const lastName = pick(LAST_NAMES, index * 2)
  const birth = new Date(2014 + (index % 3), (index * 2) % 12, 2 + (index % 22))
  return {
    id: `ELV${String(30000 + index).padStart(5, '0')}`,
    fullName: `${firstName} ${lastName}`,
    initials: makeInitials(`${firstName} ${lastName}`),
    sexe: index < 18 ? 'M' : 'F',
    birthDate: formatDate(birth),
    tuteur: `M. ${lastName} ${pick(LAST_NAMES, index + 1)}`,
    note: 11 + ((index * 7) % 8) / 2,
    rank: index + 1,
    incidents: index % 5 === 0 ? 1 : 0,
  }
}

export const module35ProfileStudents = Array.from({ length: 38 }, (_, index) => makeProfileStudent(index + 1))

function makeCandidate(index) {
  const firstName = pick(FIRST_NAMES, index + 5)
  const lastName = pick(LAST_NAMES, index * 3)
  const colors = ['#7C3AED', '#0284C7', '#059669', '#D97706', '#E11D48', '#4C1D95', '#06B6D4', '#374151']
  const status = index % 6 === 0 ? 'deja' : index % 4 === 0 ? 'autre' : 'sans'
  const classes = ['CP/FR', 'CE1/FR', 'CE2/EN', 'CM1/BI', 'CM1/FR', 'CP/EN', 'CE2/FR', 'CM1/EN']

  return {
    id: `ELV${String(20300 + index).padStart(5, '0')}`,
    fullName: `${firstName} ${lastName}`,
    initials: makeInitials(`${firstName} ${lastName}`),
    col: colors[index % colors.length],
    statut: status,
    classeActuelle: status === 'deja' ? 'CM2/BI' : status === 'autre' ? pick(classes, index) : null,
    sexe: index < 18 ? 'M' : 'F',
  }
}

export const module35CandidateStudents = Array.from({ length: 38 }, (_, index) => makeCandidate(index + 1))

export const module35ProfileTopStudents = [
  { id: 1, name: 'Inès Ndongo', average: 16.4 },
  { id: 2, name: 'Samuel Bikié', average: 16.0 },
  { id: 3, name: 'Laure Tagne', average: 15.7 },
  { id: 4, name: 'Marcel Nkongo', average: 15.3 },
  { id: 5, name: 'Awa Etame', average: 15.1 },
]

export const module35ProfileDistribution = [
  { label: '16–20', count: 7, tone: 'good' },
  { label: '14–15.9', count: 14, tone: 'mid' },
  { label: '12–13.9', count: 11, tone: 'warn' },
  { label: '< 12', count: 6, tone: 'bad' },
]

export const module35TeacherAssignments = module35Teachers
  .filter(teacher => teacher.currentClass)
  .map(teacher => ({
    teacher,
    className: teacher.currentClass,
    section: teacher.sections.includes('bi') ? 'Bilingue' : teacher.sections.includes('en') ? 'Anglophone' : 'Francophone',
    students: teacher.nbEleves,
  }))

export function getClassById(classId) {
  return module35Classes.find(item => item.id === classId) ?? module35Profile
}

export function getTeacherById(teacherId) {
  return module35Teachers.find(item => item.id === teacherId) ?? module35Teachers[0]
}

export function getClassStatusLabel(status) {
  if (status === 'inactive') return 'Inactive'
  return 'Active'
}

export function getClassStatusClass(status) {
  if (status === 'inactive') return 'b-inactif'
  return 'b-active'
}

export function getCandidateStatusLabel(status) {
  if (status === 'deja') return 'Déjà inscrit'
  if (status === 'autre') return 'Autre classe'
  return 'Sans classe'
}

export function getCandidateStatusClass(status) {
  if (status === 'deja') return 'tag-deja'
  if (status === 'autre') return 'tag-classe'
  return 'tag-sans'
}

export function getTeacherWorkloadLabel(dispo) {
  if (dispo === 'current') return 'En poste'
  if (dispo === 'occupe') return 'Déjà affecté'
  return 'Disponible'
}
