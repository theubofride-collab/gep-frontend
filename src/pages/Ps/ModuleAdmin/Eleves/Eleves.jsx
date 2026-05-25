const enrollmentStats = [
  { label: 'Inscriptions validées', value: '1,084', note: '+26 cette semaine' },
  { label: 'Dossiers en attente', value: '18', note: 'À compléter avant vendredi' },
  { label: 'Élèves boursiers', value: '74', note: 'Suivi social actif' },
]

const classLoad = [
  { level: 'CI / CP', students: 82, capacity: 90, color: 'var(--cyan)' },
  { level: 'CE1 / CE2', students: 105, capacity: 110, color: 'var(--accent)' },
  { level: 'CM1 / CM2', students: 118, capacity: 120, color: 'var(--success)' },
  { level: '6e / 5e', students: 156, capacity: 160, color: 'var(--warning)' },
]

const admissions = [
  { name: 'Awa Traoré', className: 'CE2', date: 'Aujourd’hui', status: 'Validé' },
  { name: 'Moussa Koné', className: 'CM1', date: 'Hier', status: 'En attente' },
  { name: 'Sarah Koffi', className: '6e A', date: 'Hier', status: 'Validé' },
  { name: 'Yao N’Guessan', className: 'CP', date: 'Il y a 2 jours', status: 'Validé' },
]

export default function Eleves() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion des élèves</h1>
          <p className="page-subtitle">Suivi des inscriptions, dossiers et répartition par niveau</p>
        </div>
        <button className="btn-primary" type="button">+ Nouvel élève</button>
      </div>

      <div className="stats-grid">
        {enrollmentStats.map(item => (
          <div key={item.label} className="card" style={{ padding: '18px 20px' }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>{item.label}</p>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{item.note}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-chart-grid">
        <div className="card dashboard-section-card dashboard-chart-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Capacité par niveau</p>
              <h2 className="activities-title">Charge des classes</h2>
            </div>
          </div>
          <div className="dashboard-level-list">
            {classLoad.map(item => (
              <div key={item.level} className="dashboard-level-row">
                <div className="dashboard-level-labels">
                  <span className="dashboard-level-name">{item.level}</span>
                  <span className="dashboard-level-count">{item.students}/{item.capacity}</span>
                </div>
                <div className="dashboard-level-bar">
                  <div className="dashboard-level-fill" style={{ width: `${(item.students / item.capacity) * 100}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card dashboard-section-card dashboard-chart-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Admissions récentes</p>
              <h2 className="activities-title">Derniers dossiers</h2>
            </div>
          </div>
          <div className="dashboard-notice-list">
            {admissions.map(item => (
              <div key={item.name} className="dashboard-notice-item">
                <div className="dashboard-notice-icon">👤</div>
                <div className="dashboard-notice-content">
                  <p className="dashboard-notice-title">{item.name}</p>
                  <p className="dashboard-notice-meta">{item.className} · {item.date}</p>
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
