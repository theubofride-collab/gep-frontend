import { useEffect, useMemo, useState } from 'react'
import './Enseignants.css'

const FIRST_NAMES = ['Marie', 'Jean', 'Sophie', 'Paul', 'Claire', 'André', 'Nathalie', 'Bruno', 'Isabelle', 'Luc', 'Fatou', 'Samuel', 'Cécile', 'Hervé', 'Aimée', 'Patrice', 'Monique', 'Serge', 'Laure', 'Alain', 'Béatrice', 'Didier', 'Véronique', 'Thierry', 'Nadège', 'Olivier', 'Pascale', 'Arnaud', 'Linda', 'Rodolphe', 'Esther', 'Clément', 'Viviane', 'François', 'Ornella', 'Alexis', 'Sylvie', 'Boris', 'Élise', 'Médard']
const LAST_NAMES = ['Mbarga', 'Fotso', 'Nkomo', 'Essama', 'Bilong', 'Kameni', 'Tagne', 'Mongo', 'Abena', 'Ondoa', 'Sop', 'Fomekong', 'Epanda', 'Minkeng', 'Wambo', 'Kuate', 'Nganou', 'Bekolo', 'Tonye', 'Mvogo', 'Ngolle', 'Mbouda', 'Kotto', 'Djike', 'Feudjio', 'Djoumessi', 'Bengono', 'Biyong', 'Fobang', 'Nyambi', 'Nguini', 'Owona', 'Tchoffo', 'Etoundi', 'Batchieh', 'Mba', 'Fouda', 'Soppo', 'Bella', 'Mekongo']
const DEPTS = ['Maths', 'Langues', 'Sciences', 'Arts', 'Éducation physique']
const DEPT_COLORS = { Maths: 'chip-v', Langues: 'chip-c', Sciences: 'chip-g', Arts: 'chip-a', 'Éducation physique': 'chip-c' }
const SECTION_CATALOG = {
  Francophone: {
    classes: ['CP', 'CE1', 'CE2', 'CM1', 'CM2'],
    subjects: ['Mathématiques', 'Français', 'Sciences', 'Histoire-Géographie', 'Anglais', 'EPS', 'Arts plastiques'],
  },
  Anglophone: {
    classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    subjects: ['Mathematics', 'English', 'Basic Science', 'Social Studies', 'Phonics', 'Civic Education', 'Creative Arts', 'PE'],
  },
  Bilingue: {
    classes: ['CP Bilingue', 'CE1 Bilingue', 'CE2 Bilingue', 'Class 1 Bilingue', 'Class 2 Bilingue'],
    subjects: ['Mathématiques / Mathematics', 'Français / French', 'Anglais / English', 'Sciences / Basic Science', 'Lecture', 'EPS / PE', 'Arts'],
  },
}
const SECTION_ORDER = ['Francophone', 'Anglophone', 'Bilingue']
const CLASSES = SECTION_ORDER.flatMap(section => SECTION_CATALOG[section].classes)
const VILLES = ['Yaoundé', 'Douala', 'Bafoussam', 'Garoua', 'Ngaoundéré', 'Ebolowa', 'Buea']
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
const SCHEDULE_DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven']
const SCHEDULE_COLORS = ['', 'cyan', 'green', '', 'cyan']
const FILTERS = ['Tous', ...SECTION_ORDER]

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick(items) {
  return items[rnd(0, items.length - 1)]
}

function picks(items, count) {
  const source = [...items]
  const result = []
  for (let index = 0; index < count && source.length > 0; index += 1) {
    const choiceIndex = rnd(0, source.length - 1)
    result.push(source.splice(choiceIndex, 1)[0])
  }
  return result
}

function genTeachers(count) {
  return Array.from({ length: count }, (_, index) => {
    const firstName = pick(FIRST_NAMES)
    const lastName = pick(LAST_NAMES)
    const section = pick(SECTION_ORDER)
    const dept = pick(DEPTS)
    const curriculum = SECTION_CATALOG[section]
    const subjects = picks(curriculum.subjects, rnd(2, 4))
    const classes = picks(curriculum.classes, rnd(2, 4))
    const experience = rnd(1, 30)
    const rating = +(3 + Math.random() * 2).toFixed(1)
    const status = ['active', 'active', 'active', 'away', 'off'][rnd(0, 4)]
    const avatarIndex = index % AV_CLASSES.length
    const schedule = SCHEDULE_DAYS.map((day, dayIndex) => {
      const slots = []
      if (Math.random() > 0.3) slots.push(`${subjects[0]}${Math.random() > 0.5 ? ` ${classes[rnd(0, classes.length - 1)]}` : ''}`)
      if (Math.random() > 0.5 && subjects[1]) slots.push(subjects[1])
      return { day, slots, color: SCHEDULE_COLORS[dayIndex] }
    })
    const ratings = [
      { label: 'Pédagogie', value: rnd(60, 100) },
      { label: 'Ponctualité', value: rnd(55, 100) },
      { label: 'Évaluation', value: rnd(60, 100) },
      { label: 'Disponibilité', value: rnd(50, 100) },
    ]

    return {
      id: `ENS${String(1000 + index).padStart(4, '0')}`,
      name: `${firstName} ${lastName}`,
      initials: `${firstName[0]}${lastName[0]}`,
      dept,
      section,
      subs: subjects,
      classes,
      exp: experience,
      rating,
      status,
      dotCls: { active: 'dot-online', away: 'dot-away', off: 'dot-off' }[status],
      avCls: AV_CLASSES[avatarIndex],
      bg: BG_GRADIENTS[avatarIndex],
      ville: pick(VILLES),
      phone: `+237 6${rnd(10, 99)} ${rnd(100, 999)} ${rnd(100, 999)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@nebula.school`.replace(' ', ''),
      schedule,
      ratings,
      gender: Math.random() > 0.45 ? 'M' : 'F',
      contrat: ['CDI', 'CDD', 'Vacataire'][rnd(0, 2)],
    }
  })
}

export default function Enseignants() {
  const teachers = useMemo(() => genTeachers(200), [])
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [activeSection, setActiveSection] = useState('Tous')
  const [searchQ, setSearchQ] = useState('')
  const [sortCol, setSortCol] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [perPage, setPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [selected, setSelected] = useState(() => new Set())
  const [modalTeacherId, setModalTeacherId] = useState(null)

  useEffect(() => {
    document.title = 'Gep Nebula — Enseignants'
  }, [])

  const filteredTeachers = useMemo(() => {
    const query = searchQ.trim().toLowerCase()
    const rows = teachers.filter(teacher => {
      const deptOk = activeFilter === 'Tous' || teacher.section === activeFilter
      const sectionOk = activeSection === 'Tous' || teacher.section === activeSection
      const searchOk =
        !query ||
        teacher.name.toLowerCase().includes(query) ||
        teacher.subs.join(' ').toLowerCase().includes(query) ||
        teacher.ville.toLowerCase().includes(query) ||
        teacher.id.toLowerCase().includes(query) ||
        teacher.classes.join(' ').toLowerCase().includes(query) ||
        teacher.section.toLowerCase().includes(query)

      return deptOk && sectionOk && searchOk
    })

    return [...rows].sort((left, right) => {
      let leftValue
      let rightValue

      if (sortCol === 'rating') {
        leftValue = left.rating
        rightValue = right.rating
      } else if (sortCol === 'exp') {
        leftValue = left.exp
        rightValue = right.exp
      } else if (sortCol === 'classes') {
        leftValue = left.classes.length
        rightValue = right.classes.length
      } else if (sortCol === 'subjects') {
        leftValue = left.subs.join()
        rightValue = right.subs.join()
      } else if (sortCol === 'dept') {
        leftValue = left.dept
        rightValue = right.dept
      } else if (sortCol === 'status') {
        leftValue = left.status
        rightValue = right.status
      } else {
        leftValue = left.name.toLowerCase()
        rightValue = right.name.toLowerCase()
      }

      if (leftValue < rightValue) return sortDir === 'asc' ? -1 : 1
      if (leftValue > rightValue) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [teachers, activeFilter, searchQ, sortCol, sortDir])

  const total = filteredTeachers.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * perPage
  const pageTeachers = filteredTeachers.slice(start, start + perPage)
  const modalTeacher = teachers.find(teacher => teacher.id === modalTeacherId) ?? null

  const statusLabel = { active: 'En ligne', away: 'Absent', off: 'Hors ligne' }
  const statusCls = { active: 'b-active', away: 'b-away', off: 'b-off' }

  const totalTeachers = teachers.length
  const activeTeachers = teachers.filter(teacher => teacher.status === 'active').length
  const averageRating = (teachers.reduce((sum, teacher) => sum + teacher.rating, 0) / teachers.length).toFixed(1)
  const subjectsCount = [...new Set(teachers.flatMap(teacher => teacher.subs))].length

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
      const allSelected = pageTeachers.length > 0 && pageTeachers.every(teacher => next.has(teacher.id))

      if (allSelected) pageTeachers.forEach(teacher => next.delete(teacher.id))
      else pageTeachers.forEach(teacher => next.add(teacher.id))

      return next
    })
  }

  function goToPage(page) {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  const selectedCurrentPage = pageTeachers.length > 0 && pageTeachers.every(teacher => selected.has(teacher.id))

  const paginationItems = []
  paginationItems.push({ type: 'prev', label: '‹', page: safePage - 1, disabled: safePage === 1 })
  for (let page = 1; page <= totalPages; page += 1) {
    if (page === 1 || page === totalPages || Math.abs(page - safePage) <= 2) paginationItems.push({ type: 'page', label: page, page, active: page === safePage })
    else if (Math.abs(page - safePage) === 3) paginationItems.push({ type: 'ellipsis', label: '…' })
  }
  paginationItems.push({ type: 'next', label: '›', page: safePage + 1, disabled: safePage === totalPages })

  return (
    <div className="enseignants-page">
      <div className="page-header enseignants-page-header">
        <div>
          <h1 className="page-title">🎓 Enseignants</h1>
          <p className="page-subtitle">Gérez le corps enseignant, leurs matières, classes et évaluations.</p>
        </div>
        <div className="enseignants-header-actions">
          <button className="enseignants-btn-secondary" type="button">⬇ Exporter CSV</button>
          <button className="enseignants-btn-secondary" type="button">📅 Voir emplois du temps</button>
          <button className="enseignants-btn-primary" type="button">＋ Nouvel enseignant</button>
        </div>
      </div>

      <div className="enseignants-stat-strip">
        <div className="enseignants-scard"><div className="enseignants-sc-icon ic-v">🎓</div><div><div className="enseignants-sc-val" id="sTotal">{totalTeachers}</div><div className="enseignants-sc-lbl">Total enseignants</div><div className="enseignants-sc-chg cup">▲ +2 ce trimestre</div></div></div>
        <div className="enseignants-scard"><div className="enseignants-sc-icon ic-c">🟢</div><div><div className="enseignants-sc-val" id="sActive">{activeTeachers}</div><div className="enseignants-sc-lbl">En ligne aujourd'hui</div><div className="enseignants-sc-chg cup">▲ bonne présence</div></div></div>
        <div className="enseignants-scard"><div className="enseignants-sc-icon ic-g">⭐</div><div><div className="enseignants-sc-val" id="sTop">{averageRating}/5</div><div className="enseignants-sc-lbl">Note moy. satisfaction</div><div className="enseignants-sc-chg cup">▲ +0.3 pts</div></div></div>
        <div className="enseignants-scard"><div className="enseignants-sc-icon ic-a">📚</div><div><div className="enseignants-sc-val" id="sMatieres">{subjectsCount}</div><div className="enseignants-sc-lbl">Matières enseignées</div><div className="enseignants-sc-chg cup">▲ couverture complète</div></div></div>
      </div>

      <div className="enseignants-toolbar">
        <div className="enseignants-filter-tabs" id="filterTabs">
          {FILTERS.map(filter => (
            <button key={filter} type="button" className={`enseignants-tab ${activeFilter === filter ? 'active' : ''}`} onClick={() => setActiveFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>
        <div className="enseignants-toolbar-right">
          <select className="enseignants-sel" value={activeSection} onChange={event => setActiveSection(event.target.value)} aria-label="Filtrer par section">
            {['Tous', ...SECTION_ORDER].map(section => (
              <option key={section} value={section}>{section === 'Tous' ? 'Toutes les sections' : section}</option>
            ))}
          </select>
          <select className="enseignants-sel" value={`${sortCol}-${sortDir}`} onChange={event => {
            const [column, direction] = event.target.value.split('-')
            setSortCol(column)
            setSortDir(direction)
          }}>
            <option value="name-asc">Nom A → Z</option>
            <option value="name-desc">Nom Z → A</option>
            <option value="rating-desc">Meilleure note</option>
            <option value="exp-desc">Plus expérimenté</option>
            <option value="classes-desc">Plus de classes</option>
          </select>
          <select className="enseignants-sel" value={perPage} onChange={event => setPerPage(Number(event.target.value))}>
            <option value="10">10 / page</option>
            <option value="20">20 / page</option>
            <option value="50">50 / page</option>
          </select>
        </div>
      </div>

      <div className="enseignants-table-card card">
        <div className="enseignants-table-search-row">
          <div className="enseignants-tsearch">
            <span className="enseignants-tsi">🔍</span>
            <input type="text" value={searchQ} onChange={event => setSearchQ(event.target.value)} placeholder="Rechercher nom, matière, ville..." />
          </div>
          <div className="enseignants-table-info" id="tableInfo"><strong>{total.toLocaleString('fr')}</strong> enseignants trouvés</div>
          <div className="enseignants-bulk-actions">
            <button className="enseignants-bulk-btn" type="button">✉️ Message groupé</button>
            <button className="enseignants-bulk-btn" type="button">📋 Rapport</button>
            <button className="enseignants-bulk-btn danger" type="button">🗑 Supprimer</button>
          </div>
        </div>

        <div className="enseignants-table-scroll">
          <table className="enseignants-table">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <button type="button" className={`enseignants-cb ${selectedCurrentPage ? 'chk' : ''}`} onClick={toggleAll} aria-label="Tout sélectionner">{selectedCurrentPage ? '✓' : ''}</button>
                </th>
                {[
                  ['name', 'Enseignant'],
                  ['dept', 'Section'],
                  ['subjects', 'Matières'],
                  ['classes', 'Classes'],
                  ['exp', 'Expérience'],
                  ['rating', 'Évaluation'],
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
              {pageTeachers.map(teacher => {
                const starCount = Math.round(teacher.rating)
                const expCount = Math.max(1, Math.round(teacher.exp / 6))
                const chipCls = DEPT_COLORS[teacher.dept] || 'chip-v'
                const isSelected = selected.has(teacher.id)

                return (
                  <tr key={teacher.id} className={isSelected ? 'selected' : ''} onClick={() => setModalTeacherId(teacher.id)}>
                    <td onClick={event => event.stopPropagation()}>
                      <button type="button" className={`enseignants-cb ${isSelected ? 'chk' : ''}`} onClick={() => toggleRow(teacher.id)}>{isSelected ? '✓' : ''}</button>
                    </td>
                    <td>
                      <div className="teach-cell">
                        <div className={`teach-av ${teacher.avCls}`}>
                          {teacher.initials}
                          <div className={`online-dot ${teacher.dotCls}`} />
                        </div>
                        <div>
                          <div className="tname">{teacher.name}</div>
                                <div className="tid">{teacher.id} · {teacher.ville} · {teacher.section}</div>
                        </div>
                      </div>
                    </td>
                          <td><span className={`chip ${chipCls}`}>{teacher.section}</span></td>
                    <td>
                      <div className="chips">
                        {teacher.subs.slice(0, 2).map(subject => (
                          <span key={subject} className={`chip ${chipCls}`}>{subject}</span>
                        ))}
                        {teacher.subs.length > 2 && <span className="chip chip-v">+{teacher.subs.length - 2}</span>}
                      </div>
                    </td>
                    <td>
                      <div className="classes-cell">{teacher.classes.slice(0, 2).join(', ')}{teacher.classes.length > 2 ? ` +${teacher.classes.length - 2}` : ''}</div>
                      <div className="classes-sub">{teacher.classes.length} classe{teacher.classes.length > 1 ? 's' : ''}</div>
                    </td>
                    <td>
                      <div className="exp-cell">
                        <div className="exp-dots">
                          {[1, 2, 3, 4, 5].map(dot => (
                            <div key={dot} className={`exp-dot ${dot <= expCount ? 'filled' : 'empty'}`} />
                          ))}
                        </div>
                        <span className="exp-label">{teacher.exp} an{teacher.exp > 1 ? 's' : ''}</span>
                      </div>
                    </td>
                    <td>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span key={star} className={`star ${star <= starCount ? 'on' : 'off'}`}>★</span>
                        ))}
                        <span className="rating-val">{teacher.rating}</span>
                      </div>
                    </td>
                    <td><span className={`badge ${statusCls[teacher.status]}`}><span className="bdot" />{statusLabel[teacher.status]}</span></td>
                    <td onClick={event => event.stopPropagation()}>
                      <div className="action-cell">
                        <button type="button" className="act-btn" title="Voir" onClick={() => setModalTeacherId(teacher.id)}>👁</button>
                        <button type="button" className="act-btn" title="Message">💬</button>
                        <button type="button" className="act-btn del" title="Supprimer">🗑</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="enseignants-pag-row">
          <div className="enseignants-pag-info" id="pagInfo">Page <strong>{safePage}</strong>/<strong>{totalPages}</strong> · <strong>{start + 1}–{Math.min(start + perPage, total)}</strong> sur <strong>{total.toLocaleString('fr')}</strong></div>
          <div className="enseignants-pag-controls" id="pagControls">
            {paginationItems.map((item, index) => {
              if (item.type === 'ellipsis') return <div key={`ellipsis-${index}`} className="pag-btn" style={{ pointerEvents: 'none' }}>…</div>
              return (
                <button key={`${item.type}-${item.label}`} type="button" className={`pag-btn${item.active ? ' active' : ''}`} disabled={item.disabled} onClick={() => goToPage(item.page)}>
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {modalTeacher && (
        <div className="overlay open" id="overlay" onClick={event => {
          if (event.target === event.currentTarget) setModalTeacherId(null)
        }}>
          <div className="modal">
            <div className="modal-hero">
              <div className="mh-bg" style={{ background: modalTeacher.bg }} />
              <div className="mh-pat" />
              <div className="m-av" style={{ background: modalTeacher.bg }}>{modalTeacher.initials}</div>
              <button className="m-close" type="button" onClick={() => setModalTeacherId(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="m-name">{modalTeacher.name}</div>
              <div className="m-sub">{modalTeacher.id} · {modalTeacher.section} · {modalTeacher.ville}</div>
              <div className="m-tags">
                <span className="tag tv">{modalTeacher.section}</span>
                {modalTeacher.subs.map(subject => <span key={subject} className="tag tv">{subject}</span>)}
                <span className="tag tg">{statusLabel[modalTeacher.status]}</span>
              </div>

              <div className="m-sec">
                <div className="m-sec-title">Informations personnelles</div>
                <div className="info-grid">
                  <div className="info-item"><div className="info-lbl">GENRE</div><div className="info-val">{modalTeacher.gender === 'M' ? 'Masculin' : 'Féminin'}</div></div>
                  <div className="info-item"><div className="info-lbl">EXPÉRIENCE</div><div className="info-val">{modalTeacher.exp} ans</div></div>
                  <div className="info-item"><div className="info-lbl">CONTRAT</div><div className="info-val">{modalTeacher.contrat}</div></div>
                  <div className="info-item"><div className="info-lbl">VILLE</div><div className="info-val">{modalTeacher.ville}</div></div>
                  <div className="info-item"><div className="info-lbl">EMAIL</div><div className="info-val" style={{ fontSize: 11 }}>{modalTeacher.email}</div></div>
                  <div className="info-item"><div className="info-lbl">CLASSES</div><div className="info-val">{modalTeacher.classes.join(', ')}</div></div>
                </div>
              </div>

              <div className="m-sec">
                <div className="m-sec-title">Emploi du temps hebdomadaire</div>
                <div className="schedule-grid">
                  {modalTeacher.schedule.map(day => (
                    <div key={day.day} className="sched-day">
                      <div className="sched-day-name">{day.day}</div>
                      {day.slots.length ? day.slots.map((slot, index) => (
                        <div key={`${day.day}-${index}`} className={`sched-slot ${index % 2 === 1 ? 'cyan' : ''}`}>{slot.substring(0, 18)}</div>
                      )) : <div className="sched-empty">—</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="m-sec">
                <div className="m-sec-title">Évaluation pédagogique</div>
                <div className="rating-bars">
                  {modalTeacher.ratings.map(rating => (
                    <div key={rating.label} className="rbar-row">
                      <span className="rbar-label">{rating.label}</span>
                      <div className="rbar-track"><div className="rbar-fill" style={{ width: `${rating.value}%` }} /></div>
                      <span className="rbar-val">{rating.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="mf-out" type="button" onClick={() => setModalTeacherId(null)}>✏️ Modifier</button>
              <button className="mf-msg" type="button">💬 Message</button>
              <button className="mf-sol" type="button">📋 Dossier complet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
