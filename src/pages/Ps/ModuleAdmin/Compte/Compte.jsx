const accountStats = [
  { label: 'Recettes du mois', value: '12,4M FCFA', note: '+14% vs mois dernier' },
  { label: 'Dépenses', value: '6,8M FCFA', note: 'Transport, fournitures, paie' },
  { label: 'Solde courant', value: '5,6M FCFA', note: 'Disponible en trésorerie' },
]

const entries = [
  { label: 'Frais de scolarité', amount: '+3,2M', tone: 'success' },
  { label: 'Paiements en attente', amount: '18 dossiers', tone: 'warning' },
  { label: 'Remboursements', amount: '-240k', tone: 'danger' },
]

const transactions = [
  { ref: '#PAY-1042', label: 'Scolarité CE2', date: 'Aujourd’hui', amount: '45 000', status: 'Validé' },
  { ref: '#PAY-1043', label: 'Transport CM1', date: 'Hier', amount: '12 000', status: 'En attente' },
  { ref: '#PAY-1044', label: 'Cantine CP', date: 'Hier', amount: '15 000', status: 'Validé' },
  { ref: '#PAY-1045', label: 'Inscription', date: 'Il y a 2 jours', amount: '25 000', status: 'Validé' },
]

export default function Compte() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Compte & finances</h1>
          <p className="page-subtitle">Vue synthétique des recettes, dépenses et paiements en cours</p>
        </div>
        <button className="btn-primary" type="button">Exporter le rapport</button>
      </div>

      <div className="stats-grid">
        {accountStats.map(item => (
          <div key={item.label} className="card" style={{ padding: '18px 20px' }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>{item.label}</p>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{item.note}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-highlight-grid">
        <div className="card dashboard-section-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Flux financier</p>
              <h2 className="activities-title">Répartition des mouvements</h2>
            </div>
          </div>
          <div className="dashboard-level-list">
            {entries.map(item => (
              <div key={item.label} className="dashboard-level-row">
                <div className="dashboard-level-labels">
                  <span className="dashboard-level-name">{item.label}</span>
                  <span className="dashboard-level-count">{item.amount}</span>
                </div>
                <div className="dashboard-level-bar">
                  <div className="dashboard-level-fill" style={{ width: item.tone === 'success' ? '88%' : item.tone === 'warning' ? '56%' : '38%', background: item.tone === 'success' ? 'var(--success)' : item.tone === 'warning' ? 'var(--warning)' : 'var(--danger)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card dashboard-section-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Derniers paiements</p>
              <h2 className="activities-title">Transactions récentes</h2>
            </div>
          </div>
          <div className="dashboard-notice-list">
            {transactions.map(item => (
              <div key={item.ref} className="dashboard-notice-item">
                <div className="dashboard-notice-icon">💳</div>
                <div className="dashboard-notice-content">
                  <p className="dashboard-notice-title">{item.label}</p>
                  <p className="dashboard-notice-meta">{item.ref} · {item.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="dashboard-chip">{item.amount} FCFA</span>
                  <p className="dashboard-notice-meta" style={{ marginTop: 4 }}>{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
