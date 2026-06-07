import { useEffect, useMemo, useState } from 'react'
import './Examens.css'

const LEVELS = ['CP', 'CE1', 'CE2', 'CM1', 'CM2', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'CP Bilingue', 'CE1 Bilingue', 'CE2 Bilingue', 'Class 1 Bilingue', 'Class 2 Bilingue']
const SUBJECTS = ['Mathématiques', 'Français', 'Anglais', 'Sciences', 'Lecture', 'Écriture', 'Maths / Numeracy', 'Basic Science', 'Social Studies', 'Arts', 'EPS']
const TYPES = ['Examen final', 'Contrôle continu', 'Devoir maison']
const STATUSES = ['Planifié', 'Planifié', 'Planifié', 'En cours', 'Terminé', 'Terminé', 'Terminé', 'Reporté']
const TEACHERS = ['M. Bernard', 'Mme Lefèvre', 'M. Martin', 'Mme Dupont', 'M. Koffi', 'Mme Abena', 'M. Tamba']
const ROOMS = ['Salle 101', 'Salle 204', 'Salle 305', 'Grand amphi', 'Salle info', 'Salle 112', 'Salle 208']
const EXAMS_TOTAL = 12

const SUBJECT_META = {
	'Mathématiques': { emoji: '➕', color: 'linear-gradient(135deg,#4C1D95,#6D28D9)' },
	'Français': { emoji: '📖', color: 'linear-gradient(135deg,#06B6D4,#0891B2)' },
	'Anglais': { emoji: '🌍', color: 'linear-gradient(135deg,#D97706,#F59E0B)' },
	'Sciences': { emoji: '🔬', color: 'linear-gradient(135deg,#059669,#10B981)' },
	'Lecture': { emoji: '📚', color: 'linear-gradient(135deg,#DB2777,#EC4899)' },
	'Écriture': { emoji: '✍️', color: 'linear-gradient(135deg,#7C3AED,#A78BFA)' },
	'Maths / Numeracy': { emoji: '🧮', color: 'linear-gradient(135deg,#065F46,#059669)' },
	'Basic Science': { emoji: '🧪', color: 'linear-gradient(135deg,#1E40AF,#3B82F6)' },
	'Social Studies': { emoji: '🗺️', color: 'linear-gradient(135deg,#B45309,#F59E0B)' },
	'Arts': { emoji: '🎨', color: 'linear-gradient(135deg,#9D174D,#EC4899)' },
	'EPS': { emoji: '🏃', color: 'linear-gradient(135deg,#0F766E,#14B8A6)' },
}

const FILTERS = {
	Tous: 'Tous',
	Planifié: 'Planifié',
	'En cours': 'En cours',
	Terminé: 'Terminé',
	Reporté: 'Reporté',
}

function rnd(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick(items) {
	return items[rnd(0, items.length - 1)]
}

function buildTitle(subject) {
	const titles = {
		'Mathématiques': ['Numération', 'Opérations et calcul', 'Géométrie', 'Mesures', 'Problèmes'],
		Français: ['Lecture & compréhension', 'Vocabulaire', 'Grammaire simple', 'Dictée', 'Expression écrite'],
		Anglais: ['Vocabulary basics', 'Reading comprehension', 'Oral practice', 'Listening test', 'Spelling'],
		Sciences: ['Découverte du monde', 'Le corps humain', 'Les plantes', 'L’eau et l’air', 'Le vivant'],
		Lecture: ['Lecture de texte', 'Compréhension', 'Lecture à voix haute', 'Repérage des mots', 'Texte court'],
		'Écriture': ['Copie', 'Dictée', 'Phrase simple', 'Production écrite', 'Calligraphie'],
		'Maths / Numeracy': ['Counting', 'Addition', 'Subtraction', 'Shapes', 'Word problems'],
		'Basic Science': ['Living things', 'Materials', 'Weather', 'Body parts', 'Nature'],
		'Social Studies': ['Family and school', 'Community', 'Maps', 'People and places', 'Civic life'],
		'Arts': ['Drawing', 'Colour work', 'Craft', 'Music and rhythm', 'Creative activity'],
		'EPS': ['Jeux collectifs', 'Motricité', 'Course', 'Coordination', 'Endurance'],
	}

	return pick(titles[subject] || ['Évaluation'])
}

function generateExams() {
	return Array.from({ length: EXAMS_TOTAL }, (_, index) => {
		const subject = SUBJECTS[index % SUBJECTS.length]
		const level = LEVELS[index % LEVELS.length]
		const section = ['A', 'B', 'C', 'D'][index % 4]
		const status = STATUSES[index % STATUSES.length]
		const month = rnd(0, 5)
		const day = rnd(1, 28)
		const date = new Date(2025, month, day)
		const score = status === 'Terminé' ? rnd(55, 98) : null

		return {
			id: index,
			title: buildTitle(subject),
			subject,
			level,
			section,
			type: TYPES[index % TYPES.length],
			status,
			date,
			time: `${7 + rnd(0, 3)}h${['00', '30'][index % 2]}`,
			duration: rnd(45, 180),
			total: 20,
			room: ROOMS[index % ROOMS.length],
			teacher: TEACHERS[index % TEACHERS.length],
			effectif: rnd(28, 42),
			score,
		}
	})
}

function statusClass(status) {
	if (status === 'Planifié') return 's-planifie'
	if (status === 'En cours') return 's-encours'
	if (status === 'Terminé') return 's-termine'
	return 's-reporte'
}

function statusIcon(status) {
	if (status === 'Planifié') return '📅'
	if (status === 'En cours') return '⏳'
	if (status === 'Terminé') return '✅'
	return '🔄'
}

function resultGradient(score) {
	if (score >= 75) return 'linear-gradient(90deg,var(--succes),#34D399)'
	if (score >= 55) return 'linear-gradient(90deg,var(--avertissement),#FBBF24)'
	return 'linear-gradient(90deg,var(--danger),#FB7185)'
}

function resultFillClass(score) {
	if (score >= 75) return ''
	if (score >= 55) return 'warn'
	return 'danger'
}

function formatDate(date, options) {
	return date.toLocaleDateString('fr-FR', options)
}

export default function Examens() {
	const [tab, setTab] = useState('Tous')
	const [subjectFilter, setSubjectFilter] = useState('Tous')
	const [levelFilter, setLevelFilter] = useState('Tous niveaux')
	const [typeFilter, setTypeFilter] = useState('Tous types')
	const [sortMode, setSortMode] = useState('date-asc')
	const [viewMode, setViewMode] = useState('grid')
	const [search, setSearch] = useState('')
	const [selectedExamId, setSelectedExamId] = useState(null)
	const [createOpen, setCreateOpen] = useState(false)
	const [calendarMonth, setCalendarMonth] = useState(5)
	const [calendarYear, setCalendarYear] = useState(2025)
	const [createForm, setCreateForm] = useState({
		title: '',
		subject: 'Mathématiques',
		type: 'Examen final',
		level: 'CP A',
		teacher: 'M. Bernard',
		date: '',
		time: '08:00',
		duration: 90,
		room: 'Salle 204',
		total: 20,
		passMark: 10,
		description: '',
	})

	useEffect(() => {
		document.title = 'Gep Nebula — Examens'
	}, [])

	const exams = useMemo(() => generateExams(), [])

	const stats = useMemo(() => {
		const total = exams.length
		const upcoming = exams.filter(item => item.status === 'Planifié' || item.status === 'En cours').length
		const success = Math.round(exams.filter(item => item.score !== null).reduce((sum, item) => sum + item.score, 0) / Math.max(1, exams.filter(item => item.score !== null).length))
		const reports = exams.filter(item => item.status === 'Reporté').length

		return { total, upcoming, success, reports }
	}, [exams])

	const subjectCounts = useMemo(() => {
		const counts = { Tous: exams.length }
		exams.forEach(item => {
			counts[item.subject] = (counts[item.subject] || 0) + 1
		})
		return counts
	}, [exams])

	const levelCounts = useMemo(() => {
		const counts = { 'Tous niveaux': exams.length }
		exams.forEach(item => {
			counts[item.level] = (counts[item.level] || 0) + 1
		})
		return counts
	}, [exams])

	const typeCounts = useMemo(() => {
		const counts = { 'Tous types': exams.length }
		exams.forEach(item => {
			counts[item.type] = (counts[item.type] || 0) + 1
		})
		return counts
	}, [exams])

	const filteredExams = useMemo(() => {
		const query = search.trim().toLowerCase()
		const list = exams.filter(item => {
			if (tab !== 'Tous' && item.status !== tab) return false
			if (subjectFilter !== 'Tous' && item.subject !== subjectFilter) return false
			if (levelFilter !== 'Tous niveaux' && item.level !== levelFilter) return false
			if (typeFilter !== 'Tous types' && item.type !== typeFilter) return false
			if (!query) return true
			return [item.title, item.subject, item.level, item.teacher, item.room, item.type, item.status].join(' ').toLowerCase().includes(query)
		})

		return [...list].sort((left, right) => {
			if (sortMode === 'date-asc') return left.date - right.date
			if (sortMode === 'date-desc') return right.date - left.date
			if (sortMode === 'matiere') return left.subject.localeCompare(right.subject)
			if (sortMode === 'niveau') return left.level.localeCompare(right.level)
			return 0
		})
	}, [exams, levelFilter, search, sortMode, subjectFilter, tab, typeFilter])

	const selectedExam = useMemo(() => filteredExams.find(item => item.id === selectedExamId) ?? exams.find(item => item.id === selectedExamId) ?? null, [exams, filteredExams, selectedExamId])

	const examDays = useMemo(() => new Set(exams.map(item => `${item.date.getFullYear()}-${item.date.getMonth()}-${item.date.getDate()}`)), [exams])
	const urgentDays = useMemo(() => new Set(exams.filter(item => item.status === 'En cours').map(item => `${item.date.getFullYear()}-${item.date.getMonth()}-${item.date.getDate()}`)), [exams])

	const upcoming = useMemo(() => exams.filter(item => item.status === 'Planifié' || item.status === 'En cours').sort((left, right) => left.date - right.date).slice(0, 4), [exams])

	function renderOptions(selected, setter, options, counts, activeClass = 'active') {
		return options.map(option => (
			<div key={option} className={`fp-opt ${selected === option ? activeClass : ''}`} onClick={() => setter(option)}>
				<div className="fp-dot" style={{ background: option === 'Tous' || option === 'Tous niveaux' || option === 'Tous types' ? '#A78BFA' : 'var(--violet-profond)' }} />
				{option}
				<span className="fp-count">{counts[option] ?? 0}</span>
			</div>
		))
	}

	function toggleTab(nextTab) {
		setTab(nextTab)
		setSelectedExamId(null)
	}

	function setActiveView(mode) {
		setViewMode(mode)
	}

	function changeMonth(delta) {
		setCalendarMonth(current => {
			const next = current + delta
			if (next < 0) {
				setCalendarYear(year => year - 1)
				return 11
			}
			if (next > 11) {
				setCalendarYear(year => year + 1)
				return 0
			}
			return next
		})
	}

	function getCalendarCells() {
		const firstDay = new Date(calendarYear, calendarMonth, 1).getDay()
		const offset = firstDay === 0 ? 6 : firstDay - 1
		const totalDays = new Date(calendarYear, calendarMonth + 1, 0).getDate()
		const today = new Date()
		const cells = []

		for (let index = 0; index < offset; index += 1) {
			const previousMonthDays = new Date(calendarYear, calendarMonth, 0).getDate()
			cells.push({ label: previousMonthDays - offset + index + 1, other: true })
		}

		for (let day = 1; day <= totalDays; day += 1) {
			const key = `${calendarYear}-${calendarMonth}-${day}`
			cells.push({
				label: day,
				today: today.getFullYear() === calendarYear && today.getMonth() === calendarMonth && today.getDate() === day,
				hasExam: examDays.has(key),
				urgent: urgentDays.has(key),
			})
		}

		return cells
	}

	function createExam() {
		setCreateOpen(false)
	}

	function renderExamCard(item, index) {
		const meta = SUBJECT_META[item.subject]
		const score = item.score ?? (item.status === 'Planifié' ? 0 : rnd(40, 90))

		return (
			<div key={item.id} className="exam-card" onClick={() => setSelectedExamId(item.id)} style={{ animationDelay: `${index * 0.03}s` }}>
				<div className="ec-top" style={{ background: meta.color }}>
					<div className="ec-top-pat" />
					<div className="ec-icon">{meta.emoji}</div>
					<div className={`ec-status ${statusClass(item.status)}`}>{statusIcon(item.status)} {item.status}</div>
				</div>
				<div className="ec-body">
					<div className="ec-matiere">{item.subject} · {item.type}</div>
					<div className="ec-title">{item.title}</div>
					<div className="ec-meta">
						<span className="ec-tag">🏫 {item.level} {item.section}</span>
						<span className="ec-tag">📅 {formatDate(item.date, { day: '2-digit', month: 'short' })}</span>
						<span className="ec-tag">⏱ {item.duration}min</span>
						<span className="ec-tag">📍 {item.room}</span>
					</div>
					{item.score !== null && (
						<div className="ec-progress">
							<div className="ec-prog-head"><span className="ec-prog-lbl">Taux de réussite</span><span className="ec-prog-val">{item.score}%</span></div>
							<div className="pbar"><div className={`pbar-fill ${resultFillClass(score)}`} style={{ width: `${item.score}%`, background: resultGradient(score) }} /></div>
						</div>
					)}
				</div>
				<div className="ec-footer">
					<button type="button" className="ec-btn ec-btn-out" onClick={event => event.stopPropagation()}>📄 Détails</button>
					<button type="button" className="ec-btn ec-btn-sol" onClick={event => { event.stopPropagation(); setSelectedExamId(item.id) }}>✏️ Modifier</button>
				</div>
			</div>
		)
	}

	function renderExamList(item, index) {
		const meta = SUBJECT_META[item.subject]

		return (
			<div key={item.id} className="el-item" onClick={() => setSelectedExamId(item.id)} style={{ animationDelay: `${index * 0.02}s` }}>
				<div className="el-icon" style={{ background: meta.color }}>{meta.emoji}</div>
				<div className="el-info">
					<div className="el-title">{item.title}</div>
					<div className="el-sub">{item.subject} · {item.level} {item.section} · {item.teacher}</div>
					<div className="el-badges">
						<span className={`el-badge ${statusClass(item.status)}`}>{statusIcon(item.status)} {item.status}</span>
						<span className="el-badge" style={{ background: 'rgba(76,29,149,.08)', color: 'var(--violet-profond)' }}>📅 {formatDate(item.date, { day: '2-digit', month: 'short', year: 'numeric' })}</span>
						<span className="el-badge" style={{ background: 'rgba(6,182,212,.08)', color: '#0891B2' }}>⏱ {item.duration} min</span>
					</div>
				</div>
				<div className="el-stat">
					<div className="el-pct">{item.score !== null ? `${item.score}%` : item.time}</div>
					<div className="el-lbl">{item.score !== null ? 'Réussite' : 'Heure'}</div>
				</div>
				<div className="el-actions">
					<button type="button" className="el-btn" onClick={event => event.stopPropagation()}>📄</button>
					<button type="button" className="el-btn" onClick={event => { event.stopPropagation(); setSelectedExamId(item.id) }}>✏️</button>
				</div>
			</div>
		)
	}

	return (
		<div className="exams-page">
			<div className="page-header">
				<div>
					<h1 className="page-title">📝 Examens</h1>
					<p className="page-subtitle">Planifiez, gérez et analysez tous les examens de l'établissement.</p>
				</div>
				<div className="header-actions">
					<button className="btn-sec" type="button">📊 Rapport</button>
					<button className="btn-sec" type="button">⬇ Exporter</button>
					<button className="btn-prim" type="button" onClick={() => setCreateOpen(true)}>＋ Nouvel examen</button>
				</div>
			</div>

			<div className="stat-strip">
				<div className="scard"><div className="sc-icon ic-v">📝</div><div><div className="sc-val">{stats.total}</div><div className="sc-lbl">Examens totaux</div><div className="sc-chg cup">▲ +18 ce mois</div></div></div>
				<div className="scard"><div className="sc-icon ic-c">⏳</div><div><div className="sc-val">{stats.upcoming}</div><div className="sc-lbl">À venir (7 jours)</div><div className="sc-chg" style={{ color: 'var(--avertissement)' }}>● 4 cette semaine</div></div></div>
				<div className="scard"><div className="sc-icon ic-g">✅</div><div><div className="sc-val">{stats.success}%</div><div className="sc-lbl">Taux de réussite</div><div className="sc-chg cup">▲ +2.1% vs trim. préc.</div></div></div>
				<div className="scard"><div className="sc-icon ic-a">⚠️</div><div><div className="sc-val">{stats.reports}</div><div className="sc-lbl">Reportés</div><div className="sc-chg" style={{ color: 'var(--danger)' }}>▼ à reprogrammer</div></div></div>
			</div>

			<div className="tabs-row">
				{Object.keys(FILTERS).map(name => (
					<button key={name} type="button" className={`tab ${tab === FILTERS[name] ? 'active' : ''}`} onClick={() => toggleTab(FILTERS[name])}>{name}</button>
				))}
			</div>

			<div className="main-layout">
				<div className="side-column">
					<div className="filter-panel">
						<div className="fp-header">
							<div className="fp-title">Filtres</div>
							<div className="fp-sub">Affiner la recherche</div>
						</div>
						<div className="fp-section">
							<div className="fp-label">Matière</div>
							<div className="fp-options">
								{renderOptions(subjectFilter, setSubjectFilter, ['Tous', ...SUBJECTS], subjectCounts)}
							</div>
						</div>
						<div className="fp-section">
							<div className="fp-label">Niveau</div>
							<div className="fp-options">
								{renderOptions(levelFilter, setLevelFilter, ['Tous niveaux', ...LEVELS], levelCounts)}
							</div>
						</div>
						<div className="fp-section">
							<div className="fp-label">Type</div>
							<div className="fp-options">
								{renderOptions(typeFilter, setTypeFilter, ['Tous types', ...TYPES], typeCounts)}
							</div>
						</div>
					</div>

					<div className="calendar-card">
						<div className="cal-header">
							<div className="cal-title">{formatDate(new Date(calendarYear, calendarMonth, 1), { month: 'long', year: 'numeric' })}</div>
							<div className="cal-nav">
								<button type="button" className="cal-nav-btn" onClick={() => changeMonth(-1)}>‹</button>
								<button type="button" className="cal-nav-btn" onClick={() => changeMonth(1)}>›</button>
							</div>
						</div>
						<div className="cal-grid">
							<div className="cal-days-header">
								{['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => <div key={day} className="cal-day-hdr">{day}</div>)}
							</div>
							<div className="cal-days">
								{getCalendarCells().map((cell, index) => (
									<div
										key={`${cell.label}-${index}`}
										className={`cal-day${cell.today ? ' today' : ''}${cell.hasExam && !cell.today ? ' has-exam' : ''}${cell.urgent && !cell.today ? ' has-exam-warn' : ''}${cell.other ? ' other-month' : ''}`}
									>
										{cell.label}
									</div>
								))}
							</div>
						</div>
						<div className="upcoming-shell">
							<div className="upcoming-shell-title">Prochains examens</div>
							<div className="upcoming-list">
								{upcoming.map(item => (
									<div key={item.id} className="up-item" onClick={() => setSelectedExamId(item.id)}>
										<div className="up-date">
											<div className="up-day">{item.date.getDate()}</div>
											<div className="up-month">{formatDate(item.date, { month: 'short' })}</div>
										</div>
										<div className="up-info">
											<div className="up-name">{item.title}</div>
											<div className="up-meta">{item.level} {item.section} · {item.time}</div>
										</div>
										<span className={`up-badge ${statusClass(item.status)}`}>{statusIcon(item.status)}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="exams-area">
					<div className="area-toolbar">
						<span className="area-title">{tab === 'Tous' ? 'Tous les examens' : `Examens — ${tab}`}</span>
						<span className="area-count">{filteredExams.length} examen{filteredExams.length > 1 ? 's' : ''}</span>
						<input className="search-input" type="text" placeholder="Rechercher un examen..." value={search} onChange={event => setSearch(event.target.value)} />
						<select className="sel" value={sortMode} onChange={event => setSortMode(event.target.value)}>
							<option value="date-asc">Date ↑</option>
							<option value="date-desc">Date ↓</option>
							<option value="matiere">Matière</option>
							<option value="niveau">Niveau</option>
						</select>
						<div className="view-toggle">
							<button type="button" className={`vbtn ${viewMode === 'grid' ? 'on' : ''}`} onClick={() => setActiveView('grid')}>⊞</button>
							<button type="button" className={`vbtn ${viewMode === 'list' ? 'on' : ''}`} onClick={() => setActiveView('list')}>☰</button>
						</div>
					</div>

					<div className="exams-grid" style={{ display: viewMode === 'grid' ? 'grid' : 'none' }}>
						{filteredExams.map(renderExamCard)}
					</div>

					<div className="exams-list" style={{ display: viewMode === 'list' ? 'flex' : 'none' }}>
						{filteredExams.map(renderExamList)}
					</div>
				</div>
			</div>

			{createOpen && (
				<div className="modal-overlay open" onClick={event => { if (event.target === event.currentTarget) setCreateOpen(false) }}>
					<div className="modal">
						<div className="modal-head">
							<div>
								<div className="modal-title">➕ Nouvel examen</div>
								<div className="modal-sub">Planifier un examen pour une classe</div>
							</div>
							<button type="button" className="modal-close" onClick={() => setCreateOpen(false)}>✕</button>
						</div>
						<div className="modal-body">
							<div className="form-row">
								<div className="form-group full"><div className="form-label">Intitulé de l'examen</div><input className="form-input" value={createForm.title} onChange={event => setCreateForm(current => ({ ...current, title: event.target.value }))} placeholder="ex: Évaluation trimestrielle — Algèbre" /></div>
							</div>
							<div className="form-row">
								<div className="form-group">
									<div className="form-label">Matière</div>
									<select className="form-select" value={createForm.subject} onChange={event => setCreateForm(current => ({ ...current, subject: event.target.value }))}>
										{SUBJECTS.map(subject => <option key={subject} value={subject}>{subject}</option>)}
									</select>
								</div>
								<div className="form-group">
									<div className="form-label">Type</div>
									<select className="form-select" value={createForm.type} onChange={event => setCreateForm(current => ({ ...current, type: event.target.value }))}>
										{TYPES.map(type => <option key={type} value={type}>{type}</option>)}
									</select>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group">
									<div className="form-label">Classe / Niveau</div>
									<select className="form-select" value={createForm.level} onChange={event => setCreateForm(current => ({ ...current, level: event.target.value }))}>
										{LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
									</select>
								</div>
								<div className="form-group">
									<div className="form-label">Enseignant</div>
									<select className="form-select" value={createForm.teacher} onChange={event => setCreateForm(current => ({ ...current, teacher: event.target.value }))}>
										{TEACHERS.map(teacher => <option key={teacher} value={teacher}>{teacher}</option>)}
									</select>
								</div>
							</div>
							<div className="form-row">
								<div className="form-group"><div className="form-label">Date de l'examen</div><input type="date" className="form-input" value={createForm.date} onChange={event => setCreateForm(current => ({ ...current, date: event.target.value }))} /></div>
								<div className="form-group"><div className="form-label">Heure</div><input type="time" className="form-input" value={createForm.time} onChange={event => setCreateForm(current => ({ ...current, time: event.target.value }))} /></div>
							</div>
							<div className="form-row">
								<div className="form-group"><div className="form-label">Durée (minutes)</div><input type="number" className="form-input" value={createForm.duration} onChange={event => setCreateForm(current => ({ ...current, duration: event.target.value }))} /></div>
								<div className="form-group"><div className="form-label">Salle</div><input className="form-input" value={createForm.room} onChange={event => setCreateForm(current => ({ ...current, room: event.target.value }))} /></div>
							</div>
							<div className="form-row">
								<div className="form-group"><div className="form-label">Barème total</div><input type="number" className="form-input" value={createForm.total} onChange={event => setCreateForm(current => ({ ...current, total: event.target.value }))} /></div>
								<div className="form-group"><div className="form-label">Note de passage</div><input type="number" className="form-input" value={createForm.passMark} onChange={event => setCreateForm(current => ({ ...current, passMark: event.target.value }))} /></div>
							</div>
							<div className="form-row">
								<div className="form-group full"><div className="form-label">Description / Instructions</div><textarea className="form-textarea" value={createForm.description} onChange={event => setCreateForm(current => ({ ...current, description: event.target.value }))} placeholder="Chapitres concernés, documents autorisés…" /></div>
							</div>
						</div>
						<div className="modal-foot">
							<button type="button" className="mf-out" onClick={() => setCreateOpen(false)}>Annuler</button>
							<button type="button" className="mf-sol" onClick={createExam}>📝 Créer l'examen</button>
						</div>
					</div>
				</div>
			)}

			{selectedExam && (
				<div className="modal-overlay open" onClick={event => { if (event.target === event.currentTarget) setSelectedExamId(null) }}>
					<div className="modal">
						<div className="modal-head">
							<div>
								<div className="modal-title">Détails de l'examen</div>
								<div className="modal-sub">{selectedExam.subject} · {selectedExam.level} {selectedExam.section} · {selectedExam.type}</div>
							</div>
							<button type="button" className="modal-close" onClick={() => setSelectedExamId(null)}>✕</button>
						</div>
						<div className="modal-body">
							<div className="dm-hero" style={{ background: SUBJECT_META[selectedExam.subject].color }}>
								<div className="dm-hero-emoji">{SUBJECT_META[selectedExam.subject].emoji}</div>
								<div className="dm-hero-title">{selectedExam.title}</div>
								<div className="dm-hero-sub">{selectedExam.subject} · {selectedExam.teacher}</div>
								<div className="dm-hero-badges">
									<span className="dm-hero-badge">🏫 {selectedExam.level} {selectedExam.section}</span>
									<span className="dm-hero-badge">📅 {formatDate(selectedExam.date, { day: '2-digit', month: 'long', year: 'numeric' })}</span>
									<span className="dm-hero-badge">⏱ {selectedExam.duration} min</span>
									<span className="dm-hero-badge">📍 {selectedExam.room}</span>
									<span className={`dm-hero-badge ${statusClass(selectedExam.status)}`} style={{ background: 'rgba(255,255,255,.2)', color: '#fff' }}>{statusIcon(selectedExam.status)} {selectedExam.status}</span>
								</div>
							</div>

							<div className="dm-section">
								<div className="dm-section-title">Statistiques</div>
								<div className="dm-grid">
									<div className="dm-stat"><div className="dm-stat-val">{selectedExam.effectif}</div><div className="dm-stat-lbl">Inscrits</div></div>
									<div className="dm-stat"><div className="dm-stat-val">{selectedExam.score !== null ? `${selectedExam.score}%` : '—'}</div><div className="dm-stat-lbl">Réussite</div></div>
									<div className="dm-stat"><div className="dm-stat-val">/{selectedExam.total}</div><div className="dm-stat-lbl">Barème</div></div>
								</div>
							</div>

							{selectedExam.score !== null && (
								<div className="dm-section">
									<div className="dm-section-title">Résultats (aperçu)</div>
									<div className="dm-results">
										{Array.from({ length: 8 }, (_, index) => {
											const mark = rnd(8, 20)
											const studentName = ['Dupont A.', 'Kamga B.', 'Nkomo C.', 'Biya D.', 'Fouda E.', 'Mfou F.', 'Ateba G.', 'Essoh H.'][index]
											return (
												<div key={studentName} className="dm-result-row">
													<div className="dm-result-name">👤 {studentName}</div>
													<div className="dm-pbar"><div className="dm-pbar-fill" style={{ width: `${(mark / 20) * 100}%`, background: mark >= 10 ? 'linear-gradient(90deg,var(--succes),#34D399)' : 'linear-gradient(90deg,var(--danger),#FB7185)' }} /></div>
													<div className="dm-result-pct">{mark}/20</div>
												</div>
											)
										})}
									</div>
								</div>
							)}
						</div>
						<div className="modal-foot">
							<button type="button" className="mf-out" onClick={() => setSelectedExamId(null)}>Fermer</button>
							<button type="button" className="mf-out warn-outline">🔄 Reporter</button>
							<button type="button" className="mf-sol">✏️ Modifier</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}