import { useEffect, useMemo, useState } from 'react'
import './Eleves.css'

const FIRST_NAMES = ['Evelyn', 'Diana', 'John', 'Amara', 'Lucas', 'Sophie', 'Karim', 'Ines', 'Paul', 'Marie', 'Théo', 'Fatou', 'Alexis', 'Mireille', 'Samuel', 'Chloe', 'David', 'Aicha', 'Pierre', 'Nadia', 'Kevin', 'Béatrice', 'Amos', 'Rachel', 'Brice', 'Léa', 'Serge', 'Vanessa', 'Herve', 'Claudine', 'Boris', 'Linda', 'Patrick', 'Flore', 'Nathan', 'Astrid', 'Joel', 'Esther', 'Remy', 'Nadège', 'Armel', 'Victoire', 'Franck', 'Laure', 'Cyrille', 'Ornella', 'Alain', 'Pascale', 'Simon', 'Brigitte']
const LAST_NAMES = ['Harper', 'Plenty', 'Millar', 'Konan', 'Mbarga', 'Bello', 'Tamba', 'Fotso', 'Ateba', 'Essama', 'Nkomo', 'Bilong', 'Ewane', 'Mba', 'Fouda', 'Bella', 'Nganou', 'Soppo', 'Mongo', 'Kotto', 'Djike', 'Feudjio', 'Epanda', 'Bekolo', 'Tonye', 'Abena', 'Ondoa', 'Mvogo', 'Ngolle', 'Kameni', 'Tagne', 'Djoumessi', 'Bengono', 'Biyong', 'Fomekong', 'Nyambi', 'Nguini', 'Owona', 'Etoundi', 'Tchoffo', 'Minkeng', 'Wambo', 'Kuate', 'Ndongo', 'Mbouda', 'Sop', 'Ngah', 'Mekongo', 'Batchieh', 'Fobang']
const CLASS_GROUPS = [
  { label: 'CP', section: 'Francophone', minAge: 5, maxAge: 6 },
  { label: 'CE1', section: 'Francophone', minAge: 6, maxAge: 7 },
  { label: 'CE2', section: 'Francophone', minAge: 7, maxAge: 8 },
  { label: 'CM1', section: 'Francophone', minAge: 8, maxAge: 9 },
  { label: 'CM2', section: 'Francophone', minAge: 9, maxAge: 10 },
  { label: 'Class 1', section: 'Anglophone', minAge: 5, maxAge: 6 },
  { label: 'Class 2', section: 'Anglophone', minAge: 6, maxAge: 7 },
  { label: 'Class 3', section: 'Anglophone', minAge: 7, maxAge: 8 },
  { label: 'Class 4', section: 'Anglophone', minAge: 8, maxAge: 9 },
  { label: 'Class 5', section: 'Anglophone', minAge: 9, maxAge: 10 },
  { label: 'CP Bilingue', section: 'Bilingue', minAge: 5, maxAge: 6 },
  { label: 'CE1 Bilingue', section: 'Bilingue', minAge: 6, maxAge: 7 },
  { label: 'CE2 Bilingue', section: 'Bilingue', minAge: 7, maxAge: 8 },
  { label: 'Class 1 Bilingue', section: 'Bilingue', minAge: 5, maxAge: 6 },
  { label: 'Class 2 Bilingue', section: 'Bilingue', minAge: 6, maxAge: 7 },
]
const CLASSES = CLASS_GROUPS.map(item => item.label)
const VILLES = ['Yaoundé', 'Douala', 'Bafoussam', 'Garoua', 'Ngaoundéré', 'Ebolowa', 'Buea', 'Bertoua', 'Maroua', 'Bamenda']
const MATIERES = ['Mathématiques', 'Littérature', 'Sciences', 'Anglais', 'Histoire', 'Physique', 'Géographie', 'Économie', 'Chimie', 'Informatique']
const AV_CLASSES = ['av1', 'av2', 'av3', 'av4', 'av5', 'av6', 'av7', 'av8']
const BG_GRADIENTS = [
  'linear-gradient(135deg,#4C1D95,#6D28D9)',
  'linear-gradient(135deg,#06B6D4,#6D28D9)',
  'linear-gradient(135deg,#7C3AED,#06B6D4)',
  'linear-gradient(135deg,#1E0B3B,#4C1D95)',
  'linear-gradient(135deg,#DB2777,#4C1D95)',
  'linear-gradient(135deg,#059669,#06B6D4)',
  'linear-gradient(135deg,#F59E0B,#D97706)',
  'linear-gradient(135deg,#0EA5E9,#06B6D4)',
]
const SUBJECT_POOL = ['Maths', 'Physique', 'Chimie', 'Anglais', 'Français', 'Histoire', 'Géo', 'SVT', 'Philo', 'Info', 'Éco']
const GRADE_MAP = { A: 'fg ga', B: 'fv gb', C: 'fa gc', D: 'fd gd' }
const FILTERS = ['Tous', ...CLASSES]
const SECTION_FILTERS = ['Tous', 'Francophone', 'Anglophone', 'Bilingue']

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick(items) {
  return items[rnd(0, items.length - 1)]
}

function pickClassGroup() {
  return CLASS_GROUPS[rnd(0, CLASS_GROUPS.length - 1)]
}

function genStudents(count) {
  return Array.from({ length: count }, (_, index) => {
    const firstName = pick(FIRST_NAMES)
    const lastName = pick(LAST_NAMES)
    const pct = rnd(42, 99)
    const avatarIndex = index % AV_CLASSES.length
    const classGroup = pickClassGroup()
    const age = rnd(classGroup.minAge, classGroup.maxAge)
    const subjects = SUBJECT_POOL.slice(0, 4).map(subject => ({
      n: subject,
      p: rnd(45, 99),
      g: pct >= 85 ? 'A' : pct >= 70 ? 'B' : pct >= 55 ? 'C' : 'D',
    }))

    return {
      id: `PRE${String(40000 + index).padStart(5, '0')}`,
      name: `${firstName} ${lastName}`,
      initials: `${firstName[0]}${lastName[0]}`,
      classe: classGroup.label,
      section: classGroup.section,
      age,
      ville: pick(VILLES),
      matiere: pick(MATIERES),
      notes: rnd(820, 1220),
      pct,
      status: pct >= 85 ? 'active' : pct >= 65 ? 'warning' : 'absent',
      avCls: AV_CLASSES[avatarIndex],
      bg: BG_GRADIENTS[avatarIndex],
      gender: Math.random() > 0.5 ? 'M' : 'F',
      subjects,
    }
  })
}

export default function Eleves() {
  const students = useMemo(() => genStudents(1000), [])
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [activeSection, setActiveSection] = useState('Tous')
  const [searchQ, setSearchQ] = useState('')
  const [sortCol, setSortCol] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [perPage, setPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSelected] = useState(() => new Set())
  const [modalStudentId, setModalStudentId] = useState(null)

  useEffect(() => {
    document.title = 'Gep Nebula — Élèves'
  }, [])

  const filteredStudents = useMemo(() => {
    const query = searchQ.trim().toLowerCase()
    const rows = students.filter(student => {
      const classOk = activeFilter === 'Tous' || student.classe === activeFilter
      const sectionOk = activeSection === 'Tous' || student.section === activeSection
      const searchOk =
        !query ||
        student.name.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query) ||
        student.ville.toLowerCase().includes(query) ||
        student.classe.toLowerCase().includes(query) ||
        student.section.toLowerCase().includes(query)

      return classOk && sectionOk && searchOk
    })

    return [...rows].sort((left, right) => {
      let leftValue = left[sortCol]
      let rightValue = right[sortCol]

      if (typeof leftValue === 'string') {
        leftValue = leftValue.toLowerCase()
        rightValue = rightValue.toLowerCase()
      }

      if (leftValue < rightValue) return sortDir === 'asc' ? -1 : 1
      if (leftValue > rightValue) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [students, activeFilter, searchQ, sortCol, sortDir])

  const total = filteredStudents.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * perPage
  const pageStudents = filteredStudents.slice(start, start + perPage)
  const modalStudent = students.find(student => student.id === modalStudentId) ?? null
  const statusLabel = { active: 'Actif', absent: 'Absent', warning: 'À surveiller' }
  const statusCls = { active: 'b-active', absent: 'b-absent', warning: 'b-warning' }

  const totalStudents = students.length
  const activeStudents = students.filter(student => student.status === 'active').length
  const excellentStudents = students.filter(student => student.pct >= 90).length
  const warningStudents = students.filter(student => student.status !== 'active').length

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  function handleSortColumn(column) {
    if (sortCol === column) setSortDir(current => (current === 'asc' ? 'desc' : 'asc'))
    else {
      setSortCol(column)
      setSortDir('asc')
    }
  }

  function toggleRow(id) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    setSelected(prev => {
      const next = new Set(prev)
      const allSelected = pageStudents.length > 0 && pageStudents.every(student => next.has(student.id))

      if (allSelected) pageStudents.forEach(student => next.delete(student.id))
      else pageStudents.forEach(student => next.add(student.id))

      return next
    })
  }

  function goToPage(page) {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  const selectedCurrentPage = pageStudents.length > 0 && pageStudents.every(student => selected.has(student.id))

  const paginationItems = []
  paginationItems.push({ type: 'prev', label: '‹', page: safePage - 1, disabled: safePage === 1 })
  for (let page = 1; page <= totalPages; page += 1) {
    if (page === 1 || page === totalPages || Math.abs(page - safePage) <= 2) {
      paginationItems.push({ type: 'page', label: page, page, active: page === safePage })
    } else if (Math.abs(page - safePage) === 3) {
      paginationItems.push({ type: 'ellipsis', label: '…' })
    }
  }
  paginationItems.push({ type: 'next', label: '›', page: safePage + 1, disabled: safePage === totalPages })

  return (
    <div className="eleves-page">
      <div className="page-header eleves-page-header">
        <div>
          <h1 className="page-title">Élèves</h1>
          <p className="page-subtitle">Gérez et suivez tous les profils de votre établissement.</p>
        </div>
        <div className="eleves-header-actions">
          <button className="eleves-btn-secondary" type="button">⬇ Exporter CSV</button>
          <button className="eleves-btn-secondary" type="button">📤 Importer</button>
          <button className="eleves-btn-primary" type="button">＋ Nouvel élève</button>
        </div>
      </div>

      <div className="eleves-stat-strip">
        <div className="eleves-scard"><div className="eleves-sc-icon ic-v">👥</div><div><div className="eleves-sc-val" id="statTotal">{totalStudents.toLocaleString('fr')}</div><div className="eleves-sc-lbl">Total élèves</div><div className="eleves-sc-chg cup">▲ +3.2% ce mois</div></div></div>
        <div className="eleves-scard"><div className="eleves-sc-icon ic-c">✅</div><div><div className="eleves-sc-val" id="statActive">{activeStudents.toLocaleString('fr')}</div><div className="eleves-sc-lbl">Actifs</div><div className="eleves-sc-chg cup">▲ bonne présence</div></div></div>
        <div className="eleves-scard"><div className="eleves-sc-icon ic-g">🏆</div><div><div className="eleves-sc-val" id="statExcel">{excellentStudents.toLocaleString('fr')}</div><div className="eleves-sc-lbl">≥ 90% résultat</div><div className="eleves-sc-chg cup">▲ en progression</div></div></div>
        <div className="eleves-scard"><div className="eleves-sc-icon ic-a">⚠️</div><div><div className="eleves-sc-val" id="statWarn">{warningStudents.toLocaleString('fr')}</div><div className="eleves-sc-lbl">À surveiller</div><div className="eleves-sc-chg cdn">▼ nécessite suivi</div></div></div>
      </div>

      <div className="eleves-toolbar">
        <div className="eleves-filter-tabs" id="filterTabs">
          {FILTERS.map(filter => (
            <button key={filter} type="button" className={`eleves-tab ${activeFilter === filter ? 'active' : ''}`} onClick={() => setActiveFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>
        <div className="eleves-toolbar-right">
          <select className="eleves-sel" value={activeSection} onChange={event => setActiveSection(event.target.value)} aria-label="Filtrer par section">
            {SECTION_FILTERS.map(section => (
              <option key={section} value={section}>{section === 'Tous' ? 'Toutes les sections' : section}</option>
            ))}
          </select>
          <select className="eleves-sel" value={`${sortCol}-${sortDir}`} onChange={event => {
            const [column, direction] = event.target.value.split('-')
            setSortCol(column)
            setSortDir(direction)
          }}>
            <option value="name-asc">Nom A → Z</option>
            <option value="name-desc">Nom Z → A</option>
            <option value="pct-desc">Meilleur résultat</option>
            <option value="pct-asc">Moins bon résultat</option>
            <option value="notes-desc">Notes ↓</option>
          </select>
          <select className="eleves-sel" value={perPage} onChange={event => setPerPage(Number(event.target.value))}>
            <option value="10">10 / page</option>
            <option value="20">20 / page</option>
            <option value="50">50 / page</option>
            <option value="100">100 / page</option>
          </select>
        </div>
      </div>

      <div className="eleves-table-card card">
        <div className="eleves-table-search-row">
          <div className="eleves-tsearch">
            <span className="eleves-tsi">🔍</span>
            <input type="text" value={searchQ} onChange={event => setSearchQ(event.target.value)} placeholder="Rechercher nom, ID, ville..." />
          </div>
          <div className="eleves-table-info" id="tableInfo"><strong>{total.toLocaleString('fr')}</strong> élèves trouvés</div>
          <div className="eleves-bulk-actions">
            <button className="eleves-bulk-btn" type="button">✉️ Message groupé</button>
            <button className="eleves-bulk-btn" type="button">📥 Exporter sélection</button>
            <button className="eleves-bulk-btn danger" type="button">🗑 Supprimer</button>
          </div>
        </div>

        <div className="eleves-table-scroll">
          <table className="eleves-table">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <button type="button" className={`eleves-cb ${selectedCurrentPage ? 'chk' : ''}`} onClick={toggleAll} aria-label="Tout sélectionner">{selectedCurrentPage ? '✓' : ''}</button>
                </th>
                {[
                  ['name', 'Élève'],
                  ['classe', 'Classe'],
                  ['age', 'Âge'],
                  ['ville', 'Ville'],
                  ['notes', 'Notes'],
                  ['pct', 'Résultat'],
                  ['status', 'Statut'],
                ].map(([column, label]) => (
                  <th key={column} onClick={() => handleSortColumn(column)} className={sortCol === column ? 'sorted' : ''}>
                    {label} <span className="sort-ico">{sortCol === column ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}</span>
                  </th>
                ))}
                <th style={{ width: 90 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageStudents.map(student => {
                const fillCls = student.pct >= 85 ? '' : student.pct >= 65 ? ' warn' : ' low'
                const isSelected = selected.has(student.id)

                return (
                  <tr key={student.id} className={isSelected ? 'selected' : ''} onClick={() => setModalStudentId(student.id)}>
                    <td onClick={event => event.stopPropagation()}>
                      <button type="button" className={`eleves-cb ${isSelected ? 'chk' : ''}`} onClick={() => toggleRow(student.id)}>{isSelected ? '✓' : ''}</button>
                    </td>
                    <td>
                      <div className="eleves-stu-cell">
                        <div className={`eleves-stu-av ${student.avCls}`}>{student.initials}</div>
                        <div><div className="eleves-sname">{student.name}</div><div className="eleves-sid">{student.id}</div></div>
                      </div>
                    </td>
                    <td><span className="eleves-class-tag">{student.classe}</span></td>
                    <td>{student.age} ans</td>
                    <td>{student.ville}</td>
                    <td><strong>{student.notes}</strong></td>
                    <td><div className="eleves-pct-cell"><div className="eleves-pbar"><div className={`eleves-pbar-fill${fillCls}`} style={{ width: `${student.pct}%` }} /></div><span className="eleves-pct-val">{student.pct}%</span></div></td>
                    <td><span className={`eleves-badge ${statusCls[student.status]}`}><span className="eleves-bdot" />{statusLabel[student.status]}</span></td>
                    <td onClick={event => event.stopPropagation()}>
                      <div className="eleves-action-cell">
                        <button type="button" className="eleves-act-btn" title="Voir" onClick={() => setModalStudentId(student.id)}>👁</button>
                        <button type="button" className="eleves-act-btn" title="Modifier">✏️</button>
                        <button type="button" className="eleves-act-btn del" title="Supprimer">🗑</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="eleves-pag-row">
          <div className="eleves-pag-info" id="pagInfo">
            Page <strong>{safePage}</strong> / <strong>{totalPages}</strong> · <strong>{start + 1}–{Math.min(start + perPage, total)}</strong> sur <strong>{total.toLocaleString('fr')}</strong>
          </div>
          <div className="eleves-pag-controls" id="pagControls">
            {paginationItems.map((item, index) => {
              if (item.type === 'ellipsis') return <div key={`ellipsis-${index}`} className="eleves-pag-btn" style={{ pointerEvents: 'none' }}>…</div>
              return (
                <button key={`${item.type}-${item.label}`} type="button" className={`eleves-pag-btn${item.active ? ' active' : ''}`} disabled={item.disabled} onClick={() => goToPage(item.page)}>
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {modalStudent && (
        <div className="eleves-overlay open" id="overlay" onClick={event => {
          if (event.target === event.currentTarget) setModalStudentId(null)
        }}>
          <div className="eleves-modal">
            <div className="eleves-modal-hero">
              <div className="eleves-mh-bg" style={{ background: modalStudent.bg }} />
              <div className="eleves-mh-pat" />
              <div className="eleves-m-av" style={{ background: modalStudent.bg }}>{modalStudent.initials}</div>
              <button className="eleves-m-close" type="button" onClick={() => setModalStudentId(null)}>✕</button>
            </div>
            <div className="eleves-modal-body">
              <div className="eleves-m-name">{modalStudent.name}</div>
              <div className="eleves-m-sub">{modalStudent.id} · {modalStudent.classe} · {modalStudent.section} · {modalStudent.matiere}</div>
              <div className="eleves-m-tags">
                <span className="eleves-tag tv">{modalStudent.classe}</span>
                <span className="eleves-tag tc">{modalStudent.section}</span>
                <span className="eleves-tag tc">{modalStudent.matiere}</span>
                <span className={`eleves-tag ${modalStudent.status === 'active' ? 'tg' : 'ta'}`}>{statusLabel[modalStudent.status]}</span>
              </div>
              <div className="eleves-m-sec">
                <div className="eleves-m-sec-title">Informations personnelles</div>
                <div className="eleves-info-grid">
                  <div className="eleves-info-item"><div className="eleves-info-lbl">ÂGE</div><div className="eleves-info-val">{modalStudent.age} ans</div></div>
                  <div className="eleves-info-item"><div className="eleves-info-lbl">GENRE</div><div className="eleves-info-val">{modalStudent.gender === 'F' ? 'Féminin' : 'Masculin'}</div></div>
                  <div className="eleves-info-item"><div className="eleves-info-lbl">VILLE</div><div className="eleves-info-val">{modalStudent.ville}</div></div>
                  <div className="eleves-info-item"><div className="eleves-info-lbl">RÉSULTAT GLOBAL</div><div className="eleves-info-val">{modalStudent.pct}%</div></div>
                  <div className="eleves-info-item"><div className="eleves-info-lbl">NOTES TOTALES</div><div className="eleves-info-val">{modalStudent.notes}</div></div>
                  <div className="eleves-info-item"><div className="eleves-info-lbl">IDENTIFIANT</div><div className="eleves-info-val monospace">{modalStudent.id}</div></div>
                </div>
              </div>
              <div className="eleves-m-sec">
                <div className="eleves-m-sec-title">Performance académique</div>
                {modalStudent.subjects.map(subject => {
                  const [fillCls, gradeCls] = (GRADE_MAP[subject.g] || 'fv gb').split(' ')
                  return (
                    <div key={subject.n} className="eleves-perf-row">
                      <div className="eleves-perf-head"><span className="eleves-psubj">{subject.n}</span><span className={`eleves-pgrade ${gradeCls}`}>{subject.g} · {subject.p}%</span></div>
                      <div className="eleves-pbar2"><div className={`eleves-pbar2-fill ${fillCls}`} style={{ width: `${subject.p}%` }} /></div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="eleves-modal-footer">
              <button className="eleves-mf-out" type="button" onClick={() => setModalStudentId(null)}>✏️ Modifier</button>
              <button className="eleves-mf-sol" type="button">📋 Dossier complet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
