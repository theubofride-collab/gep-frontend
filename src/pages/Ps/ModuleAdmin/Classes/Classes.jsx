import { useEffect, useMemo, useState } from 'react'
import './Classes.css'

const LEVEL_CONFIG = {
	'6e': { label: 'Sixième (6e)', color: '#4C1D95', emoji: ['📐', '📏', '🔬', '📚', '🎨', '🌍', '💡', '🎵'] },
	'5e': { label: 'Cinquième (5e)', color: '#6D28D9', emoji: ['🔭', '📝', '🧪', '📖', '🎯', '🌱', '⚗️', '🎶'] },
	'4e': { label: 'Quatrième (4e)', color: '#06B6D4', emoji: ['🧮', '📊', '🌐', '📑', '🔍', '🏛️', '🎲', '🖥️'] },
	'3e': { label: 'Troisième (3e)', color: '#059669', emoji: ['🏆', '📜', '🔬', '📐', '🎭', '🌿', '💻', '🎸'] },
	'2nde': { label: 'Seconde', color: '#D97706', emoji: ['⚡', '🧲', '📈', '🗺️', '✏️', '🔑', '🎓', '🌟'] },
	'1ere': { label: 'Première', color: '#DB2777', emoji: ['🧬', '📡', '🎯', '📋', '🔐', '🌌', '🖊️', '🏅'] },
	Tle: { label: 'Terminale', color: '#E11D48', emoji: ['🎓', '🏆', '🔮', '📚', '⭐', '🚀', '💎', '🦋'] },
}

const LEVEL_ORDER = ['6e', '5e', '4e', '3e', '2nde', '1ere', 'Tle']
const SECTION_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const TEACHERS = ['M. Mbarga', 'Mme Fotso', 'M. Nkomo', 'Mme Bilong', 'M. Kameni', 'Mme Tagne', 'M. Mongo', 'Mme Abena']
const SUBJECTS = [
	['Mathématiques', 'Physique', 'Chimie', 'SVT'],
	['Français', 'Anglais', 'Histoire', 'Géo'],
	['Maths', 'Sciences', 'Français', 'EPS'],
	['Info', 'Maths', 'Physique', 'Philo'],
]
const AVATAR_BACKGROUNDS = [
	'linear-gradient(135deg,#4C1D95,#6D28D9)',
	'linear-gradient(135deg,#06B6D4,#22D3EE)',
	'linear-gradient(135deg,#059669,#34D399)',
	'linear-gradient(135deg,#DB2777,#F472B6)',
	'linear-gradient(135deg,#D97706,#FBBF24)',
	'linear-gradient(135deg,#7C3AED,#A78BFA)',
]
const HERO_BACKGROUNDS = [
	'linear-gradient(135deg,#4C1D95,#6D28D9)',
	'linear-gradient(135deg,#06B6D4,#6D28D9)',
	'linear-gradient(135deg,#7C3AED,#06B6D4)',
	'linear-gradient(135deg,#059669,#06B6D4)',
	'linear-gradient(135deg,#DB2777,#4C1D95)',
	'linear-gradient(135deg,#D97706,#F59E0B)',
	'linear-gradient(135deg,#0EA5E9,#06B6D4)',
	'linear-gradient(135deg,#1E0B3B,#4C1D95)',
]
const MINI_ICONS = ['📐', '🌍', '🔬', '🖥️', '🎨', '📖', '⚡', '🎵']

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

function buildStudentName(levelIndex, sectionIndex, studentIndex) {
	const firstNames = ['Evelyn', 'Diana', 'John', 'Amara', 'Sophie', 'Karim', 'Ines', 'Paul']
	const lastNames = ['Harper', 'Plenty', 'Millar', 'Konan', 'Bello', 'Tamba', 'Fotso', 'Ateba']
	const first = firstNames[(studentIndex + sectionIndex) % firstNames.length]
	const last = lastNames[(studentIndex + levelIndex) % lastNames.length]
	return `${first} ${last}`
}

function buildClasses(level, count) {
	const config = LEVEL_CONFIG[level]
	return Array.from({ length: count }, (_, index) => {
		const section = SECTION_ORDER[index % SECTION_ORDER.length]
		const effectif = rnd(28, 42)
		const perf = rnd(58, 97)
		const subs = pick(SUBJECTS)
		const teacherIndex = index % TEACHERS.length
		const heroIndex = index % HERO_BACKGROUNDS.length
		const avatarIndex = index % AVATAR_BACKGROUNDS.length
		const students = Array.from({ length: 6 }, (_, studentIndex) => ({
			name: buildStudentName(index, index, studentIndex),
			pct: rnd(62, 99),
			bg: AVATAR_BACKGROUNDS[(studentIndex + index) % AVATAR_BACKGROUNDS.length],
		}))

		return {
			id: `${level}${section}`,
			name: `${level} ${section}`,
			level,
			section,
			effectif,
			capacity: level === 'Tle' ? 35 : level === '1ere' ? 36 : 42,
			perf,
			subs,
			teacher: TEACHERS[teacherIndex],
			bg: HERO_BACKGROUNDS[heroIndex],
			emoji: config.emoji[heroIndex % config.emoji.length],
			color: config.color,
			students,
			salle: `Salle ${100 + rnd(1, 30)}`,
			horaire: `${7 + rnd(0, 1)}h00 – ${16 + rnd(0, 2)}h00`,
			avatarBg: AVATAR_BACKGROUNDS[avatarIndex],
		}
	})
}

function buildInitialData() {
	return {
		'6e': buildClasses('6e', 8),
		'5e': buildClasses('5e', 8),
		'4e': buildClasses('4e', 7),
		'3e': buildClasses('3e', 7),
		'2nde': buildClasses('2nde', 7),
		'1ere': buildClasses('1ere', 6),
		Tle: buildClasses('Tle', 5),
	}
}

function getProgressColor(perf) {
	if (perf >= 85) return 'linear-gradient(90deg,var(--violet-profond),var(--cyan))'
	if (perf >= 70) return 'linear-gradient(90deg,var(--avertissement),#FBBF24)'
	return 'linear-gradient(90deg,var(--danger),#FB7185)'
}

function getProgressTextColor(perf) {
	if (perf >= 85) return 'var(--violet-profond)'
	if (perf >= 70) return 'var(--avertissement)'
	return 'var(--danger)'
}

export default function Classes() {
	const [classData, setClassData] = useState(() => buildInitialData())
	const [selectedLevel, setSelectedLevel] = useState('6e')
	const [levelSearch, setLevelSearch] = useState('')
	const [classSearch, setClassSearch] = useState('')
	const [sortMode, setSortMode] = useState('name')
	const [viewMode, setViewMode] = useState('grid')
	const [modalClassId, setModalClassId] = useState(null)
	const [createOpen, setCreateOpen] = useState(false)
	const [createForm, setCreateForm] = useState({ name: '', level: '6e', section: 'A', capacity: 35, teacher: '' })

	useEffect(() => {
		document.title = 'Gep Nebula — Classes'
	}, [])

	const allClasses = useMemo(() => Object.values(classData).flat(), [classData])
	const totalClasses = allClasses.length
	const totalStudents = allClasses.reduce((sum, item) => sum + item.effectif, 0)
	const averagePerf = Math.round(allClasses.reduce((sum, item) => sum + item.perf, 0) / allClasses.length)
	const difficultClasses = allClasses.filter(item => item.perf < 70).length

	const visibleLevels = useMemo(() => {
		const query = levelSearch.trim().toLowerCase()
		return LEVEL_ORDER.filter(level => {
			const label = LEVEL_CONFIG[level].label.toLowerCase()
			return !query || label.includes(query) || level.toLowerCase().includes(query)
		})
	}, [levelSearch])

	const filteredClasses = useMemo(() => {
		const current = selectedLevel === 'Tous' ? allClasses : classData[selectedLevel] || []
		const query = classSearch.trim().toLowerCase()
		const filtered = current.filter(item => {
			const searchOk =
				!query ||
				item.name.toLowerCase().includes(query) ||
				item.teacher.toLowerCase().includes(query) ||
				item.subs.join(' ').toLowerCase().includes(query) ||
				item.salle.toLowerCase().includes(query)
			return searchOk
		})

		return [...filtered].sort((left, right) => {
			if (sortMode === 'effectif-desc') return right.effectif - left.effectif
			if (sortMode === 'perf-desc') return right.perf - left.perf
			return left.name.localeCompare(right.name)
		})
	}, [allClasses, classData, classSearch, selectedLevel, sortMode])

	const modalClass = useMemo(() => filteredClasses.find(item => item.id === modalClassId) ?? allClasses.find(item => item.id === modalClassId) ?? null, [allClasses, filteredClasses, modalClassId])

	function filterLevel(level) {
		setSelectedLevel(level)
		setModalClassId(null)
	}

	function addClass() {
		if (!createForm.name.trim()) return
		const newClass = {
			id: `${createForm.level}${createForm.section}`,
			name: createForm.name.trim(),
			level: createForm.level,
			section: createForm.section,
			effectif: 0,
			capacity: Number(createForm.capacity) || 35,
			perf: 0,
			subs: ['Mathématiques', 'Français'],
			teacher: createForm.teacher.trim() || 'Enseignant à assigner',
			bg: 'linear-gradient(135deg,#4C1D95,#06B6D4)',
			emoji: '📚',
			color: LEVEL_CONFIG[createForm.level]?.color || '#4C1D95',
			students: [],
			salle: `Salle ${100 + rnd(1, 30)}`,
			horaire: '08h00 – 16h00',
			avatarBg: 'linear-gradient(135deg,#4C1D95,#6D28D9)',
		}

		setClassData(prev => ({
			...prev,
			[createForm.level]: [...(prev[createForm.level] || []), newClass],
		}))
		setCreateForm({ name: '', level: '6e', section: 'A', capacity: 35, teacher: '' })
		setCreateOpen(false)
	}

	function getLevelCount(level) {
		if (level === 'Tous') return totalClasses
		return (classData[level] || []).length
	}

	function handleSortChange(value) {
		setSortMode(value)
	}

	function renderClassCard(item, index) {
		const pct = Math.round((item.effectif / item.capacity) * 100)
		const chipColors = [
			{ bg: 'rgba(76,29,149,.08)', color: '#4C1D95' },
			{ bg: 'rgba(6,182,212,.08)', color: '#0891B2' },
		]

		return (
			<div key={item.id} className="class-card card" onClick={() => setModalClassId(item.id)}>
				<div className="cc-top" style={{ background: item.bg }}>
					<div className="cc-top-pat" />
					<div className="cc-emoji">{item.emoji}</div>
					<div className="cc-menu" onClick={event => event.stopPropagation()}>⋮</div>
				</div>
				<div className="cc-body">
					<div className="cc-name">{item.name}</div>
					<div className="cc-teacher">
						<div className="cc-teacher-av" style={{ background: item.avatarBg }}>{item.teacher[0]}</div>
						{item.teacher}
					</div>
					<div className="cc-subjects">
						{item.subs.slice(0, 2).map((subject, subjectIndex) => (
							<span
								key={subject}
								className="cc-chip"
								style={{ background: chipColors[subjectIndex % chipColors.length].bg, color: chipColors[subjectIndex % chipColors.length].color }}
							>
								{subject}
							</span>
						))}
						{item.subs.length > 2 && <span className="cc-chip cc-chip-more">+{item.subs.length - 2}</span>}
					</div>
					<div className="cc-stats">
						<div className="cc-stat"><div className="cc-sv">{item.effectif}</div><div className="cc-sl">Élèves</div></div>
						<div className="cc-stat"><div className="cc-sv">{item.subs.length}</div><div className="cc-sl">Matières</div></div>
						<div className="cc-stat"><div className="cc-sv" style={{ color: getProgressTextColor(item.perf) }}>{item.perf}%</div><div className="cc-sl">Réussite</div></div>
					</div>
					<div className="cc-progress">
						<div className="cc-prog-head">
							<span className="cc-prog-label">Taux de réussite</span>
							<span className="cc-prog-val" style={{ color: getProgressTextColor(item.perf) }}>{item.perf}%</span>
						</div>
						<div className="pbar"><div className="pbar-fill" style={{ width: `${item.perf}%`, background: getProgressColor(item.perf) }} /></div>
					</div>
				</div>
				<div className="cc-footer">
					<button className="cc-btn cc-btn-out" type="button" onClick={event => event.stopPropagation()}>📋 Appel</button>
					<button className="cc-btn cc-btn-sol" type="button" onClick={event => { event.stopPropagation(); setModalClassId(item.id) }}>Détails →</button>
				</div>
			</div>
		)
	}

	function renderClassListItem(item, index) {
		const perfColor = getProgressTextColor(item.perf)
		return (
			<div key={item.id} className="cl-item" onClick={() => setModalClassId(item.id)}>
				<div className="cl-color-bar" style={{ background: item.bg }} />
				<div className="cl-icon" style={{ background: `${item.bg}20`, fontSize: 22 }}>{item.emoji}</div>
				<div>
					<div className="cl-name">{item.name}</div>
					<div className="cl-sub">{item.teacher} · {item.subs.slice(0, 2).join(', ')}</div>
				</div>
				<div className="cl-stats">
					<div className="cl-stat"><div className="cl-stat-v">{item.effectif}</div><div className="cl-stat-l">Élèves</div></div>
					<div className="cl-stat"><div className="cl-stat-v">{item.subs.length}</div><div className="cl-stat-l">Matières</div></div>
					<div className="cl-pct">
						<div className="cl-pbar"><div className="cl-pbar-fill" style={{ width: `${item.perf}%`, background: getProgressColor(item.perf) }} /></div>
						<span style={{ fontSize: 12, fontWeight: 700, color: perfColor, whiteSpace: 'nowrap' }}>{item.perf}%</span>
					</div>
				</div>
				<div className="cl-actions" onClick={event => event.stopPropagation()}>
					<button className="act-btn" type="button">📋</button>
					<button className="act-btn" type="button" onClick={() => setModalClassId(item.id)}>👁</button>
					<button className="act-btn" type="button">✏️</button>
				</div>
			</div>
		)
	}

	return (
		<div className="classes-page">
			<div className="page-header">
				<div>
					<h1 className="page-title">🏫 Classes</h1>
					<p className="page-subtitle">Gérez les classes, leurs effectifs, enseignants et performances.</p>
				</div>
				<div className="header-actions">
					<button className="btn-sec" type="button">📊 Rapport global</button>
					<button className="btn-sec" type="button">⬇ Exporter</button>
					<button className="btn-prim" type="button" onClick={() => setCreateOpen(true)}>＋ Nouvelle classe</button>
				</div>
			</div>

			<div className="stat-strip">
				<div className="scard"><div className="sc-icon ic-v">🏫</div><div><div className="sc-val">{totalClasses}</div><div className="sc-lbl">Classes totales</div><div className="sc-chg cup">▲ +4 cette année</div></div></div>
				<div className="scard"><div className="sc-icon ic-c">👥</div><div><div className="sc-val">{totalStudents.toLocaleString('fr')}</div><div className="sc-lbl">Élèves inscrits</div><div className="sc-chg cup">▲ taux plein</div></div></div>
				<div className="scard"><div className="sc-icon ic-g">⭐</div><div><div className="sc-val">{averagePerf}%</div><div className="sc-lbl">Réussite moyenne</div><div className="sc-chg cup">▲ +2.3% vs trim. préc.</div></div></div>
				<div className="scard"><div className="sc-icon ic-a">⚠️</div><div><div className="sc-val">{difficultClasses}</div><div className="sc-lbl">Classes en difficulté</div><div className="sc-chg" style={{ color: 'var(--avertissement)' }}>● Nécessite attention</div></div></div>
			</div>

			<div className="main-layout">
				<aside className="niveau-panel">
					<div className="niveau-header">
						<div className="niveau-title">Niveaux</div>
						<div className="niveau-sub">Filtrer par niveau scolaire</div>
					</div>
					<div className="niveau-search">
						<input type="text" value={levelSearch} onChange={event => setLevelSearch(event.target.value)} placeholder="Chercher..." />
					</div>
					<div className="niveau-list">
						<div className="niveau-group">
							<div className="niveau-group-title">Collège</div>
							{visibleLevels.filter(level => ['6e', '5e', '4e', '3e'].includes(level)).map(level => (
								<div key={level} className={`niveau-item ${selectedLevel === level ? 'active' : ''}`} onClick={() => filterLevel(level)}>
									<div className="ni-color" style={{ background: LEVEL_CONFIG[level].color }} />
									<span className="ni-name">{LEVEL_CONFIG[level].label}</span>
									<span className="ni-count">{getLevelCount(level)}</span>
								</div>
							))}
						</div>
						<div className="niveau-group">
							<div className="niveau-group-title">Lycée</div>
							{visibleLevels.filter(level => ['2nde', '1ere', 'Tle'].includes(level)).map(level => (
								<div key={level} className={`niveau-item ${selectedLevel === level ? 'active' : ''}`} onClick={() => filterLevel(level)}>
									<div className="ni-color" style={{ background: LEVEL_CONFIG[level].color }} />
									<span className="ni-name">{LEVEL_CONFIG[level].label}</span>
									<span className="ni-count">{getLevelCount(level)}</span>
								</div>
							))}
						</div>
						<div className="niveau-group">
							<div className="niveau-group-title">Vue globale</div>
							<div className={`niveau-item ${selectedLevel === 'Tous' ? 'active' : ''}`} onClick={() => filterLevel('Tous')}>
								<div className="ni-color" style={{ background: 'linear-gradient(135deg,#4C1D95,#06B6D4)' }} />
								<span className="ni-name">Toutes les classes</span>
								<span className="ni-count">{totalClasses}</span>
							</div>
						</div>
					</div>
				</aside>

				<section className="classes-area">
					<div className="area-toolbar">
						<span className="area-title">{selectedLevel === 'Tous' ? 'Toutes les classes' : LEVEL_CONFIG[selectedLevel].label}</span>
						<span className="area-count">{filteredClasses.length} classe{filteredClasses.length > 1 ? 's' : ''}</span>
						<div className="area-toolbar-right">
							<select className="sel" value={sortMode} onChange={event => handleSortChange(event.target.value)}>
								<option value="name">Nom A → Z</option>
								<option value="effectif-desc">Plus grand effectif</option>
								<option value="perf-desc">Meilleure réussite</option>
							</select>
							<div className="view-toggle">
								<button id="vGrid" type="button" className={`vbtn ${viewMode === 'grid' ? 'on' : ''}`} onClick={() => setViewMode('grid')}>⊞</button>
								<button id="vList" type="button" className={`vbtn ${viewMode === 'list' ? 'on' : ''}`} onClick={() => setViewMode('list')}>☰</button>
							</div>
						</div>
					</div>

					<div className="classes-search-row">
						<div className="classes-search-wrap">
							<span className="classes-search-icon">🔍</span>
							<input type="text" value={classSearch} onChange={event => setClassSearch(event.target.value)} placeholder="Rechercher une classe, un enseignant, une matière..." />
						</div>
						<div className="classes-search-meta">{filteredClasses.length} résultats</div>
					</div>

					<div className="classes-grid" style={{ display: viewMode === 'grid' ? 'grid' : 'none' }}>
						{filteredClasses.map(renderClassCard)}
					</div>

					<div className="classes-list" style={{ display: viewMode === 'list' ? 'flex' : 'none' }}>
						{filteredClasses.map(renderClassListItem)}
					</div>
				</section>
			</div>

			{modalClass && (
				<div className="overlay open" id="overlay" onClick={event => {
					if (event.target === event.currentTarget) setModalClassId(null)
				}}>
					<div className="modal">
						<div className="modal-hero" style={{ background: modalClass.bg }}>
							<div className="mh-pat" />
							<div className="mh-emoji">{modalClass.emoji}</div>
							<button className="m-close" type="button" onClick={() => setModalClassId(null)}>✕</button>
						</div>
						<div className="modal-body">
							<div className="m-name">Classe {modalClass.name}</div>
							<div className="m-sub">{LEVEL_CONFIG[modalClass.level].label} · {modalClass.teacher} · {modalClass.salle}</div>
							<div className="m-sec">
								<div className="m-sec-title">Informations générales</div>
								<div className="info-grid">
									<div className="info-item"><div className="info-lbl">EFFECTIF</div><div className="info-val">{modalClass.effectif} élèves</div></div>
									<div className="info-item"><div className="info-lbl">RÉUSSITE</div><div className="info-val" style={{ color: getProgressTextColor(modalClass.perf) }}>{modalClass.perf}%</div></div>
									<div className="info-item"><div className="info-lbl">SALLE</div><div className="info-val">{modalClass.salle}</div></div>
									<div className="info-item"><div className="info-lbl">HORAIRE</div><div className="info-val">{modalClass.horaire}</div></div>
									<div className="info-item"><div className="info-lbl">MATIÈRES</div><div className="info-val">{modalClass.subs.length}</div></div>
									<div className="info-item"><div className="info-lbl">NIVEAU</div><div className="info-val">{LEVEL_CONFIG[modalClass.level].label}</div></div>
								</div>
							</div>

							<div className="m-sec">
								<div className="m-sec-title">Top 6 élèves</div>
								<div className="student-mini-list">
									{modalClass.students.map(student => (
										<div key={student.name} className="student-mini">
											<div className="sm-av" style={{ background: student.bg }}>{student.name.split(' ').map(word => word[0]).join('')}</div>
											<div>
												<div className="sm-name">{student.name}</div>
												<div className="sm-pct">{student.pct}%</div>
											</div>
											<span className="sm-badge" style={{ background: student.pct >= 85 ? 'rgba(5,150,105,.1)' : 'rgba(76,29,149,.1)', color: student.pct >= 85 ? 'var(--succes)' : 'var(--violet-profond)' }}>{student.pct >= 85 ? '⭐ Top' : '📈'}</span>
										</div>
									))}
								</div>
							</div>

							<div className="m-sec">
								<div className="m-sec-title">Matières enseignées</div>
								<div className="subject-grid">
									{modalClass.subs.map((subject, index) => (
										<div key={subject} className="subj-item">
											<div className="subj-icon" style={{ background: [
												'rgba(76,29,149,.07)',
												'rgba(6,182,212,.07)',
												'rgba(5,150,105,.07)',
												'rgba(217,119,6,.07)',
											][index % 4] }}>
												{MINI_ICONS[index % MINI_ICONS.length]}
											</div>
											<div>
												<div className="subj-name">{subject}</div>
												<div className="subj-teacher">{TEACHERS[index % TEACHERS.length]}</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button className="mf-out" type="button" onClick={() => setModalClassId(null)}>✏️ Modifier</button>
							<button className="mf-sol" type="button">📋 Voir tous les élèves</button>
						</div>
					</div>
				</div>
			)}

			{createOpen && (
				<div className="overlay open" id="overlay-create" onClick={event => {
					if (event.target === event.currentTarget) setCreateOpen(false)
				}}>
					<div className="modal">
						<div className="modal-hero" style={{ background: 'linear-gradient(135deg,#4C1D95,#06B6D4)' }}>
							<div className="mh-pat" />
							<div className="mh-emoji">➕</div>
							<button className="m-close" type="button" onClick={() => setCreateOpen(false)}>✕</button>
						</div>
						<div className="modal-body">
							<div className="m-name">Nouvelle classe</div>
							<div className="m-sub">Remplissez les informations ci-dessous</div>
							<div className="m-sec">
								<div className="info-grid create-grid">
									<div className="info-item create-item create-wide">
										<div className="info-lbl">NOM DE LA CLASSE</div>
										<input className="create-input" value={createForm.name} onChange={event => setCreateForm(prev => ({ ...prev, name: event.target.value }))} placeholder="Ex: 6e A" />
									</div>
									<div className="info-item create-item">
										<div className="info-lbl">NIVEAU</div>
										<select className="create-input" value={createForm.level} onChange={event => setCreateForm(prev => ({ ...prev, level: event.target.value }))}>
											{LEVEL_ORDER.map(level => <option key={level} value={level}>{LEVEL_CONFIG[level].label}</option>)}
										</select>
									</div>
									<div className="info-item create-item">
										<div className="info-lbl">SECTION</div>
										<select className="create-input" value={createForm.section} onChange={event => setCreateForm(prev => ({ ...prev, section: event.target.value }))}>
											{SECTION_ORDER.map(section => <option key={section} value={section}>{section}</option>)}
										</select>
									</div>
									<div className="info-item create-item">
										<div className="info-lbl">CAPACITÉ</div>
										<input className="create-input" type="number" value={createForm.capacity} onChange={event => setCreateForm(prev => ({ ...prev, capacity: event.target.value }))} placeholder="35" />
									</div>
									<div className="info-item create-item create-wide">
										<div className="info-lbl">ENSEIGNANT PRINCIPAL</div>
										<input className="create-input" value={createForm.teacher} onChange={event => setCreateForm(prev => ({ ...prev, teacher: event.target.value }))} placeholder="M. Nom" />
									</div>
								</div>
							</div>
							<div className="m-sec">
								<div className="m-sec-title">Note</div>
								<p className="create-note">Les élèves seront ajoutés après création de la classe.</p>
							</div>
						</div>
						<div className="modal-footer">
							<button className="mf-out" type="button" onClick={() => setCreateOpen(false)}>Annuler</button>
							<button className="mf-sol" type="button" onClick={addClass}>Créer</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}