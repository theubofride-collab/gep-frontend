const FIRST_NAMES = ['Emile', 'Aline', 'Marc', 'Sophie', 'Karim', 'Mireille', 'Paul', 'Nadia', 'Ines', 'Samuel', 'Léa', 'Brice']
const LAST_NAMES = ['Mbarga', 'Fouda', 'Nganou', 'Bello', 'Tamba', 'Essama', 'Nkomo', 'Mba', 'Fotso', 'Kameni', 'Djeumeni', 'Nguefack']

export const module34Sections = ['Tous', 'Francophone', 'Anglophone', 'Bilingue']
export const module34SectionClasses = {
  Francophone: ['SIL', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'],
  Anglophone: ['Nursery 1', 'Nursery 2', 'Class 1', 'Class 2', 'Class 3'],
  Bilingue: ['SIL Bilingue', 'Class 1 Bilingue', 'Class 2 Bilingue', 'Class 3 Bilingue'],
}
export const module34SchoolYears = ['2025–2026', '2024–2025']

function pick(items, index) {
  return items[index % items.length]
}

export function buildInscriptionNumber(index) {
  return `INS-${String(2025).slice(-4)}-${String(40 + index).padStart(4, '0')}`
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function makeInscription(index) {
  const firstName = pick(FIRST_NAMES, index)
  const lastName = pick(LAST_NAMES, index * 2)
  const section = pick(module34Sections.slice(1), index)
  const classPool = module34SectionClasses[section]
  const className = pick(classPool, index)
  const status = index % 6 === 0 ? 'cloturee' : index % 4 === 0 ? 'transfert' : 'active'
  const date = new Date(2025, (index * 2) % 12, 2 + (index % 23))

  return {
    id: buildInscriptionNumber(index),
    studentId: `ELV${String(10040 + index).padStart(5, '0')}`,
    fullName: `${firstName} ${lastName}`,
    initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
    section,
    className,
    year: '2025–2026',
    status,
    date,
    dateLabel: formatDate(date),
    by: 'Sophie Mendo',
    balance: index % 3 === 0 ? '0 FCFA' : '25 000 FCFA',
    percent: index % 3 === 0 ? 100 : 75,
    observations: index % 2 === 0 ? 'Dossier complet et conforme.' : 'Paiement partiel à vérifier.',
  }
}

export const module34Inscriptions = Array.from({ length: 18 }, (_, index) => makeInscription(index + 1))

export const module34Profile = {
  id: 'INS-2025-0047',
  studentId: 'ELV10047',
  fullName: 'Emile Fouda',
  initials: 'EF',
  section: 'Francophone',
  className: 'CM1',
  year: '2025–2026',
  status: 'active',
  dateLabel: '08/09/2025',
  by: 'Sophie Mendo',
  balance: '25 000 FCFA',
  percent: 75,
  observations: 'Élève redoublant de CM1. Dossier médical complet.',
  details: {
    father: 'M. Fouda Jean',
    phone: '699 000 000',
    classTeacher: 'M. Nkomo Alain',
    room: 'Bâtiment B — S04',
  },
  timeline: [
    { label: 'Inscription validée', detail: 'CM1 - Francophone', time: '03 sept. 2025', tone: 'success' },
    { label: 'Paiement partiel', detail: '75% du montant réglé', time: '18 oct. 2025', tone: 'warning' },
    { label: 'Dernière mise à jour', detail: 'Contact tuteur confirmé', time: '14 fév. 2026', tone: 'info' },
  ],
}

export function getInscriptionById(inscriptionId) {
  return module34Inscriptions.find(item => item.id === inscriptionId) ?? module34Profile
}

export function getInscriptionStatusLabel(status) {
  if (status === 'cloturee') return 'Clôturée'
  if (status === 'transfert') return 'Transfert'
  return 'Active'
}

export function getInscriptionStatusClass(status) {
  if (status === 'cloturee') return 'b-cloture'
  if (status === 'transfert') return 'b-transfert'
  return 'b-active'
}
