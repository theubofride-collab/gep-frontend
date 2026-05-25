const performance = [
  { subject: 'Maths', rate: 86, color: 'var(--accent)' },
  { subject: 'Français', rate: 79, color: 'var(--cyan)' },
  { subject: 'Sciences', rate: 91, color: 'var(--success)' },
  { subject: 'Histoire-Géo', rate: 68, color: 'var(--warning)' },
]

const examRows = [
  { id: '#EX-021', student: 'Jason Black', subject: 'Maths', className: '5e A', status: 'Corrigé', score: '17/20' },
  { id: '#EX-022', student: 'Awa Traoré', subject: 'Français', className: 'CE2', status: 'En attente', score: '—' },
  { id: '#EX-023', student: 'Moussa Koné', subject: 'Sciences', className: 'CM1', status: 'Corrigé', score: '15/20' },
  { id: '#EX-024', student: 'Sarah Koffi', subject: 'Histoire-Géo', className: '6e A', status: 'Corrigé', score: '13/20' },
]

export default function Examens() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Examens & évaluations</h1>
          <p className="page-subtitle">Résultats, corrections en cours et performances par matière</p>
        </div>
        <button className="btn-primary" type="button">+ Nouvelle évaluation</button>
      </div>

      <div className="dashboard-chart-grid">
        <div className="card dashboard-section-card dashboard-chart-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Performance par matière</p>
              <h2 className="activities-title">Taux de réussite</h2>
            </div>
          </div>
          <div className="dashboard-level-list">
            {performance.map(item => (
              <div key={item.subject} className="dashboard-level-row">
                <div className="dashboard-level-labels">
                  <span className="dashboard-level-name">{item.subject}</span>
                  <span className="dashboard-level-count">{item.rate}%</span>
                </div>
                <div className="dashboard-level-bar">
                  <div className="dashboard-level-fill" style={{ width: `${item.rate}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card dashboard-section-card dashboard-chart-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Suivi des copies</p>
              <h2 className="activities-title">Dernières évaluations</h2>
            </div>
          </div>
          <div className="dashboard-notice-list">
            {examRows.map(item => (
              <div key={item.id} className="dashboard-notice-item">
                <div className="dashboard-notice-icon">📝</div>
                <div className="dashboard-notice-content">
                  <p className="dashboard-notice-title">{item.student}</p>
                  <p className="dashboard-notice-meta">{item.subject} · {item.className}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="dashboard-chip">{item.status}</span>
                  <p className="dashboard-notice-meta" style={{ marginTop: 4 }}>{item.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
