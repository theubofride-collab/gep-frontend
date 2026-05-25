const teacherStats = [
  { label: 'Enseignants actifs', value: '48', note: '4 nouveaux profils' },
  { label: 'Heures couvertes', value: '312h', note: 'Semaines en cours' },
  { label: 'Absences signalées', value: '3', note: 'À justifier' },
]

const workload = [
  { subject: 'Mathématiques', load: 92, color: 'var(--accent)' },
  { subject: 'Français', load: 88, color: 'var(--cyan)' },
  { subject: 'Sciences', load: 76, color: 'var(--success)' },
  { subject: 'Histoire-Géo', load: 64, color: 'var(--warning)' },
]

const teachers = [
  { name: 'Mme Bamba', subject: 'CM2', classes: 3, status: 'Présente' },
  { name: 'M. Kouassi', subject: 'Maths', classes: 4, status: 'En cours' },
  { name: 'Mme Achi', subject: 'Français', classes: 2, status: 'Disponible' },
  { name: 'M. Traoré', subject: 'EPS', classes: 5, status: 'Présent' },
]

export default function Enseignants() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion des enseignants</h1>
          <p className="page-subtitle">Répartition des charges, présence et classes confiées</p>
        </div>
        <button className="btn-primary" type="button">+ Nouvel enseignant</button>
      </div>

      <div className="stats-grid">
        {teacherStats.map(item => (
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
              <p className="dashboard-section-kicker">Charge pédagogique</p>
              <h2 className="activities-title">Répartition par matière</h2>
            </div>
          </div>
          <div className="dashboard-level-list">
            {workload.map(item => (
              <div key={item.subject} className="dashboard-level-row">
                <div className="dashboard-level-labels">
                  <span className="dashboard-level-name">{item.subject}</span>
                  <span className="dashboard-level-count">{item.load}%</span>
                </div>
                <div className="dashboard-level-bar">
                  <div className="dashboard-level-fill" style={{ width: `${item.load}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card dashboard-section-card dashboard-chart-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Annuaire</p>
              <h2 className="activities-title">Enseignants clés</h2>
            </div>
          </div>
          <div className="dashboard-notice-list">
            {teachers.map(item => (
              <div key={item.name} className="dashboard-notice-item">
                <div className="dashboard-notice-icon">🎓</div>
                <div className="dashboard-notice-content">
                  <p className="dashboard-notice-title">{item.name}</p>
                  <p className="dashboard-notice-meta">{item.subject} · {item.classes} classes</p>
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
