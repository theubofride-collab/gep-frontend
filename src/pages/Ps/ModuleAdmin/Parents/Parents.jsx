const parentStats = [
  { label: 'Familles suivies', value: '603', note: '91% joignables' },
  { label: 'Messages envoyés', value: '184', note: 'Cette semaine' },
  { label: 'Relances en attente', value: '22', note: 'Paiements et absences' },
]

const families = [
  { name: 'Famille Touré', children: 2, contact: '05 45 22 11 09', status: 'Réactif' },
  { name: 'Famille Kone', children: 1, contact: '07 33 01 41 77', status: 'À relancer' },
  { name: 'Famille Kouadio', children: 3, contact: '01 88 19 04 35', status: 'Réactif' },
  { name: 'Famille N’Dri', children: 2, contact: '05 12 30 92 11', status: 'Suivi' },
]

const reminders = [
  { title: 'Paiements non confirmés', detail: '18 familles à relancer avant jeudi' },
  { title: 'Réunions de classe', detail: 'CE2, CM1 et 6e à planifier cette semaine' },
  { title: 'Absences longues', detail: '3 cas à déclarer aux responsables' },
]

export default function Parents() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion des parents</h1>
          <p className="page-subtitle">Communication familles, relances et suivi des contacts</p>
        </div>
        <button className="btn-primary" type="button">+ Nouveau message</button>
      </div>

      <div className="stats-grid">
        {parentStats.map(item => (
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
              <p className="dashboard-section-kicker">Répertoire familles</p>
              <h2 className="activities-title">Contacts prioritaires</h2>
            </div>
          </div>
          <div className="dashboard-notice-list">
            {families.map(item => (
              <div key={item.name} className="dashboard-notice-item">
                <div className="dashboard-notice-icon">👨‍👩‍👧</div>
                <div className="dashboard-notice-content">
                  <p className="dashboard-notice-title">{item.name}</p>
                  <p className="dashboard-notice-meta">{item.children} enfants · {item.contact}</p>
                </div>
                <span className="dashboard-chip">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card dashboard-section-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Actions récentes</p>
              <h2 className="activities-title">À rappeler</h2>
            </div>
          </div>
          <div className="dashboard-reminder-list">
            {reminders.map(reminder => (
              <div key={reminder.title} className="dashboard-reminder-item">
                <span className="dashboard-reminder-dot warning" />
                <div>
                  <p className="dashboard-reminder-title">{reminder.title}</p>
                  <p className="dashboard-reminder-text">{reminder.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
