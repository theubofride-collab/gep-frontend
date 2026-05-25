const routes = [
  { name: 'Ligne Nord', bus: 'Bus 1', fill: 84, tone: 'success' },
  { name: 'Ligne Centre', bus: 'Bus 2', fill: 67, tone: 'warning' },
  { name: 'Ligne Sud', bus: 'Bus 3', fill: 91, tone: 'success' },
]

const transportStats = [
  { label: 'Élèves transportés', value: '214', note: '3 bus actifs' },
  { label: 'Retards signalés', value: '9', note: 'Ce matin' },
  { label: 'Paiements transport', value: '78%', note: 'Taux de recouvrement' },
]

const trips = [
  { ref: 'TR-01', zone: 'Nord', status: 'À l’heure', driver: 'M. Kouadio' },
  { ref: 'TR-02', zone: 'Centre', status: 'Retard 10 min', driver: 'M. Bamba' },
  { ref: 'TR-03', zone: 'Sud', status: 'À l’heure', driver: 'M. Traoré' },
]

export default function Transport() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Transport scolaire</h1>
          <p className="page-subtitle">Occupation des bus, parcours et alertes de conduite</p>
        </div>
        <button className="btn-primary" type="button">+ Ajouter une ligne</button>
      </div>

      <div className="stats-grid">
        {transportStats.map(item => (
          <div key={item.label} className="card" style={{ padding: '18px 20px' }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>{item.label}</p>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{item.note}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-content-grid">
        <div className="card dashboard-section-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Occupation des bus</p>
              <h2 className="activities-title">Chargement des lignes</h2>
            </div>
          </div>
          <div className="dashboard-level-list">
            {routes.map(item => (
              <div key={item.name} className="dashboard-level-row">
                <div className="dashboard-level-labels">
                  <span className="dashboard-level-name">{item.name}</span>
                  <span className="dashboard-level-count">{item.bus}</span>
                </div>
                <div className="dashboard-level-bar">
                  <div className="dashboard-level-fill" style={{ width: `${item.fill}%`, background: item.tone === 'success' ? 'var(--success)' : 'var(--warning)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card dashboard-section-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Courses du jour</p>
              <h2 className="activities-title">Suivi des trajets</h2>
            </div>
          </div>
          <div className="dashboard-notice-list">
            {trips.map(item => (
              <div key={item.ref} className="dashboard-notice-item">
                <div className="dashboard-notice-icon">🚌</div>
                <div className="dashboard-notice-content">
                  <p className="dashboard-notice-title">{item.ref} · {item.zone}</p>
                  <p className="dashboard-notice-meta">{item.driver}</p>
                </div>
                <span className="dashboard-chip">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
