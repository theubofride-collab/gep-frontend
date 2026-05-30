import { useEffect, useMemo, useState } from 'react'
import './Transport.css'

const VEHICLE_TYPES = ['Bus', 'Minibus', 'Voiture']
const DRIVERS = ['M. Kouame', 'Mme Traoré', "M. N'Dour", 'Mme Aissatou', 'M. Essama', 'M. Mvondo']
const STATUSES = ['En route', "À l'arrêt", 'Maintenance', 'Hors service']

const BUS_COLORS = [
  'linear-gradient(135deg,#4C1D95,#6D28D9)',
  'linear-gradient(135deg,#06B6D4,#0891B2)',
  'linear-gradient(135deg,#059669,#10B981)',
  'linear-gradient(135deg,#D97706,#F59E0B)',
  'linear-gradient(135deg,#DB2777,#EC4899)',
  'linear-gradient(135deg,#7C3AED,#A78BFA)',
]
const AV_BGS = [
  'linear-gradient(135deg,#4C1D95,#06B6D4)',
  'linear-gradient(135deg,#06B6D4,#059669)',
  'linear-gradient(135deg,#D97706,#E11D48)',
  'linear-gradient(135deg,#7C3AED,#DB2777)',
  'linear-gradient(135deg,#059669,#4C1D95)',
  'linear-gradient(135deg,#0891B2,#7C3AED)',
]
const MODELES = ['Toyota Coaster','Isuzu NQR','Mercedes Sprinter','Mitsubishi Rosa','Renault Master','Ford Transit']
const ROUTES = [
  'Bastos → École','Mvan → École','Omnisport → École','Biyem-Assi → École','Essos → École','Nkol-Foulou → École','Mendong → École','Ekounou → École'
]
const STUDENT_CLASSES = [
  'CP',
  'CE1',
  'CE2',
  'CM1',
  'CM2',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'CP Bilingue',
  'CE1 Bilingue',
  'CE2 Bilingue',
  'Class 1 Bilingue',
  'Class 2 Bilingue',
]
const ARRETS = [
  ['Départ quartier','Arrêt marché','Arrêt hôpital','Arrêt carrefour','École — Arrivée'],
  ['Départ terminus','Arrêt église','Arrêt stade','Arrêt commissariat','École — Arrivée'],
  ['Départ gare','Arrêt supermarché','Arrêt école primaire','Arrêt mairie','École — Arrivée'],
]

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick(list) {
  return list[rnd(0, list.length - 1)]
}

function generateTransports(total = 8) {
  return Array.from({ length: total }, (_, i) => {
    const type = VEHICLE_TYPES[i % VEHICLE_TYPES.length]
    const num = String(i + 1).padStart(2, '0')
    const modele = MODELES[i % MODELES.length]
    const route = ROUTES[i % ROUTES.length]
    const status = STATUSES[i % STATUSES.length]
    const capacity = rnd(35, 54)
    const inscrits = rnd(25, Math.max(30, capacity))
    const nextPickup = new Date(2025, rnd(0, 11), rnd(1, 28), 6 + (i % 3), [0,15,30,45][i % 4])
    const bg = BUS_COLORS[i % BUS_COLORS.length]
    const avbg = AV_BGS[i % AV_BGS.length]
    const immat = `LT-${4500 + i * 7}-CE`
    const heureDep = `0${6 + (i % 2)}h${['00','15','30','45'][i % 4]}`
    const heureRet = `15h${['00','15','30','45'][i % 4]}`
    const annee = 2015 + rnd(0, 8)
    const km = `${rnd(20,120)} ${rnd(100,999)} km`
    const arrets = ARRETS[i % ARRETS.length]

    return {
      id: `t-${i}`,
      num,
      name: `Bus ${num}`,
      immat,
      modele,
      type,
      route,
      driver: pick(DRIVERS),
      capacity,
      inscrits,
      occupied: inscrits,
      status,
      nextPickup,
      bg,
      avbg,
      heureDep,
      heureRet,
      annee,
      km,
      arrets,
    }
  })
}

function statusClass(status) {
  if (status === 'En service') return 's-ok'
  if (status === 'En route') return 's-warning'
  if (status === 'Maintenance') return 's-maint'
  return 's-off'
}

function statusIcon(status) {
  if (status === 'En service') return '🟢'
  if (status === 'En route') return '🚍'
  if (status === 'Maintenance') return '🛠️'
  return '⚪'
}

function formatDate(date) {
  return date.toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export default function Transport() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('Tous')
  const [filterStatus, setFilterStatus] = useState('Tous')
  const [sortMode, setSortMode] = useState('default')
  const [viewMode, setViewMode] = useState('grid')
  const [createOpen, setCreateOpen] = useState(false)

  useEffect(() => {
    document.title = 'Gep Nebula — Transport'
  }, [])

  const transports = useMemo(() => generateTransports(8), [])

  const stats = useMemo(() => {
    const total = transports.length
    const active = transports.filter(t => t.status === 'En service' || t.status === 'En route').length
    const maintenance = transports.filter(t => t.status === 'Maintenance').length
    const capacity = transports.reduce((sum, t) => sum + t.capacity, 0)
    return { total, active, maintenance, capacity }
  }, [transports])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return transports.filter(t => {
      if (filterType !== 'Tous' && t.type !== filterType) return false
      if (filterStatus !== 'Tous' && t.status !== filterStatus) return false
      if (!q) return true
      return [t.name, t.route, t.driver, t.type, t.status].join(' ').toLowerCase().includes(q)
    })
  }, [transports, filterType, filterStatus, search])

  const filteredSorted = useMemo(() => {
    const list = [...filtered]
    if (sortMode === 'occupied-desc') {
      list.sort((a, b) => (b.occupied / b.capacity) - (a.occupied / a.capacity))
    } else if (sortMode === 'occupied-asc') {
      list.sort((a, b) => (a.occupied / a.capacity) - (b.occupied / b.capacity))
    } else if (sortMode === 'nextPickup') {
      list.sort((a, b) => a.nextPickup - b.nextPickup)
    }
    return list
  }, [filtered, sortMode])

  function renderCard(item, index) {
    const pct = Math.round((item.inscrits / item.capacity) * 100)
    const pbarColor = pct > 90 ? 'linear-gradient(90deg,var(--danger),#FB7185)' : pct > 70 ? 'linear-gradient(90deg,var(--avertissement),#FBBF24)' : 'linear-gradient(90deg,var(--succes),#34D399)'

    return (
      <div key={item.id} className="bus-card" style={{ animationDelay: `${index * 0.03}s` }} onClick={() => {}}>
        <div className="bc-top" style={{ background: item.bg }}>
          <div className="bc-pat" />
          <div className="bc-bus-icon">🚌</div>
          <div className="bc-top-right">
            <div className="bc-num">{item.name}</div>
            <div className="bc-status">{statusIcon(item.status)} {item.status}</div>
          </div>
        </div>
        <div className="bc-body">
          <div className="bc-route">{item.route}</div>
          <div className="bc-driver"><div className="bc-driver-av" style={{ background: item.avbg }}>{item.driver[0]}</div>{item.driver}</div>
          <div className="bc-meta">
            <span className="bc-tag">🕐 Dép. {item.heureDep}</span>
            <span className="bc-tag">🔄 Ret. {item.heureRet}</span>
            <span className="bc-tag">🚘 {item.modele}</span>
          </div>
          <div className="bc-capacity">
            <div className="bc-cap-head"><span className="bc-cap-lbl">Occupation</span><span className="bc-cap-val" style={{ color: pct > 90 ? 'var(--danger)' : pct > 70 ? 'var(--avertissement)' : 'var(--succes)' }}>{item.inscrits}/{item.capacity} ({pct}%)</span></div>
            <div className="pbar"><div className="pbar-fill" style={{ width: `${pct}%`, background: pbarColor }} /></div>
          </div>
          <div className="bc-stops">
            <div className="bc-stop"><div className="bc-stop-dot" style={{ background: 'var(--succes)' }}></div><span>Départ : {item.arrets[0]}</span></div>
            <div className="bc-stop-line" style={{ height: '6px', width: '2px', background: 'var(--bord)' }} />
            <div className="bc-stop"><div className="bc-stop-dot" style={{ background: 'var(--violet-profond)' }}></div><span>Arrivée : École</span></div>
          </div>
        </div>
        <div className="bc-footer">
          <button className="bc-btn bc-btn-out" onClick={e => e.stopPropagation()}>📋 Élèves</button>
          <button className="bc-btn bc-btn-sol" onClick={e => e.stopPropagation()}>📍 Suivre</button>
        </div>
      </div>
    )
  }

  return (
    <div className="transport-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">🚌 Transport</h1>
          <p className="page-subtitle">Gérez les véhicules, trajets et horaires de transport scolaire.</p>
        </div>
        <div className="header-actions">
          <button className="btn-sec" type="button">📊 Rapport</button>
          <button className="btn-prim" type="button" onClick={() => setCreateOpen(true)}>＋ Nouveau véhicule</button>
        </div>
      </div>

      <div className="stat-strip">
        <div className="scard"><div className="sc-icon ic-v">🚍</div><div><div className="sc-val">{stats.total}</div><div className="sc-lbl">Véhicules</div></div></div>
        <div className="scard"><div className="sc-icon ic-c">🟢</div><div><div className="sc-val">{stats.active}</div><div className="sc-lbl">En service</div></div></div>
        <div className="scard"><div className="sc-icon ic-g">🛠️</div><div><div className="sc-val">{stats.maintenance}</div><div className="sc-lbl">Maintenance</div></div></div>
        <div className="scard"><div className="sc-icon ic-a">👥</div><div><div className="sc-val">{stats.capacity}</div><div className="sc-lbl">Places totales</div></div></div>
      </div>

      <div className="main-layout">
        <div className="side-column">
          <div className="filter-panel">
            <div className="fp-header"><div className="fp-title">Filtres</div><div className="fp-sub">Affinez la liste</div></div>
            <div className="fp-section">
              <div className="fp-label">Type</div>
              <div className="fp-options">
                <div className={`fp-opt ${filterType === 'Tous' ? 'active' : ''}`} onClick={() => setFilterType('Tous')}>Tous</div>
                {VEHICLE_TYPES.map(t => <div key={t} className={`fp-opt ${filterType === t ? 'active' : ''}`} onClick={() => setFilterType(t)}>{t}</div>)}
              </div>
            </div>
            <div className="fp-section">
              <div className="fp-label">Statut</div>
              <div className="fp-options">
                <div className={`fp-opt ${filterStatus === 'Tous' ? 'active' : ''}`} onClick={() => setFilterStatus('Tous')}>Tous</div>
                {STATUSES.map(s => <div key={s} className={`fp-opt ${filterStatus === s ? 'active' : ''}`} onClick={() => setFilterStatus(s)}>{s}</div>)}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="transport-area">
          <div className="area-toolbar">
            <span className="area-title">Véhicules</span>
            <span className="area-count">{filtered.length} véhicule{filtered.length > 1 ? 's' : ''}</span>
            <select className="sel" value={sortMode} onChange={e => setSortMode(e.target.value)}>
              <option value="default">Tri: par défaut</option>
              <option value="occupied-desc">Tri: remplissage ↓</option>
              <option value="occupied-asc">Tri: remplissage ↑</option>
              <option value="nextPickup">Tri: prochain ramassage</option>
            </select>
            <input className="search-input" type="text" placeholder="Rechercher véhicule, conducteur..." value={search} onChange={e => setSearch(e.target.value)} />
            <div className="view-toggle">
              <button type="button" className={`vbtn ${viewMode === 'grid' ? 'on' : ''}`} onClick={() => setViewMode('grid')}>⊞</button>
              <button type="button" className={`vbtn ${viewMode === 'list' ? 'on' : ''}`} onClick={() => setViewMode('list')}>☰</button>
            </div>
          </div>

          <div className="cards-grid" style={{ display: viewMode === 'grid' ? 'grid' : 'none' }}>
            {filteredSorted.map(renderCard)}
          </div>

          <div className="cards-list" style={{ display: viewMode === 'list' ? 'flex' : 'none' }}>
            {filteredSorted.map((item, idx) => (
              <div key={item.id} className="tr-row">
                <div className="tr-row-left">{item.name} · {item.route}</div>
                <div className="tr-row-right"><span className={`pill ${statusClass(item.status)}`}>{item.status}</span><button className="btn-sm">✏</button></div>
              </div>
            ))}
          </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="map-card">
            <div className="map-header">
              <div className="map-title">📍 Suivi en temps réel</div>
              <div className="map-live"><div className="map-live-dot"></div>EN DIRECT</div>
            </div>
            <div className="map-body">
              <div className="map-grid" />
              <div className="map-road-h" style={{ top: '45%', left: 0, right: 0 }} />
              <div className="map-road-h" style={{ top: '70%', left: '5%', right: '5%' }} />
              <div className="map-road-h" style={{ top: '25%', left: '10%', right: '10%' }} />
              <div className="map-road-v" style={{ left: '30%', top: 0, bottom: 0 }} />
              <div className="map-road-v" style={{ left: '65%', top: 0, bottom: 0 }} />
              <div className="map-school">🏫</div>
            </div>
            <div style={{ padding: '8px 14px', borderTop: '1px solid var(--bord)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600, color: 'var(--succes)' }}><span style={{ width: 8, height: 8, borderRadius: 50, background: 'var(--succes)', display: 'inline-block' }} />En route ({stats.active})</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600, color: 'var(--violet-profond)' }}><span style={{ width: 8, height: 8, borderRadius: 50, background: 'var(--violet-profond)', display: 'inline-block' }} />À l'arrêt (4)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600, color: 'var(--avertissement)' }}><span style={{ width: 8, height: 8, borderRadius: 50, background: 'var(--avertissement)', display: 'inline-block' }} />Maintenance (2)</span>
            </div>
          </div>

          <div className="alerts-card">
            <div className="alerts-header">
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 800 }}>🔔 Alertes transport</div>
              <span style={{ fontSize: 11, color: 'var(--violet-profond)', cursor: 'pointer', fontWeight: 600 }}>Voir tout</span>
            </div>
            <div className="alert-item">
              <div className="alert-icon ai-danger">🚨</div>
              <div>
                <div className="alert-text">Bus 07 — retard 15 min (embouteillage)</div>
                <div className="alert-meta">Il y a 8 min · Itinéraire Nord-Est</div>
              </div>
            </div>
            <div className="alert-item">
              <div className="alert-icon ai-warn">⚠️</div>
              <div>
                <div className="alert-text">Bus 12 — pneu à vérifier avant départ</div>
                <div className="alert-meta">Il y a 22 min · Maintenance signalée</div>
              </div>
            </div>
            <div className="alert-item">
              <div className="alert-icon ai-info">ℹ️</div>
              <div>
                <div className="alert-text">Itinéraire Sud modifié — travaux rue Acacias</div>
                <div className="alert-meta">Ce matin · Jusqu'au 20 juin</div>
              </div>
            </div>
          </div>

          <div className="students-card">
            <div className="sc-header">
              <div className="sc-h-title">👶 Élèves — Bus 01</div>
              <select className="btn-sec" style={{ border: 'none', padding: 0, fontSize: 11, color: 'var(--violet-profond)', fontWeight: 700, background: 'transparent', cursor: 'pointer' }}>
                <option>Bus 01</option>
                <option>Bus 03</option>
                <option>Bus 05</option>
              </select>
            </div>
            <div className="sc-list">
              {[
                { name: 'Dupont A.', classe: 'CP' },
                { name: 'Kamga B.', classe: 'CE1' },
                { name: 'Nkomo C.', classe: 'CE2' },
                { name: 'Biya D.', classe: 'Class 1' },
                { name: 'Fouda E.', classe: 'Class 2' },
                { name: 'Mfou F.', classe: 'CE1 Bilingue' },
                { name: 'Ateba G.', classe: 'Class 1 Bilingue' },
                { name: 'Essoh H.', classe: 'CM1' },
              ].map((student, i) => (
                <div key={student.name} className="sc-row">
                  <div className="sc-av" style={{ background: AV_BGS[i % AV_BGS.length] }}>{student.name[0]}</div>
                  <div className="sc-name">{student.name}</div>
                  <div className="sc-classe">{student.classe}</div>
                  <span className={`sc-badge ${i<6?'st-en-route':'st-arret'}`}>{i<6?'✅ À bord':'⏳ Attente'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {createOpen && (
        <div className="modal-overlay open" onClick={e => { if (e.target === e.currentTarget) setCreateOpen(false) }}>
          <div className="modal">
            <div className="modal-head"><div><div className="modal-title">＋ Nouveau véhicule</div><div className="modal-sub">Ajouter un véhicule ou modifier</div></div><button className="modal-close" onClick={() => setCreateOpen(false)}>✕</button></div>
            <div className="modal-body">Fonction d'ajout simulée (UI de démonstration).</div>
            <div className="modal-foot"><button className="mf-out" onClick={() => setCreateOpen(false)}>Annuler</button><button className="mf-sol" onClick={() => setCreateOpen(false)}>Enregistrer</button></div>
          </div>
        </div>
      )}
    </div>
  )
}
