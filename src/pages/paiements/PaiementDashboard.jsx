import Module36Layout from './Module36Layout'
import {
  module36DashboardStats,
  module36RecentPayments,
  module36UrgentUnpaid,
} from './module36Data'

export default function Dashboard() {
  return (
    <Module36Layout>
      <div className="module36-greeting">
        <h1>Bonjour, Aïcha 👋</h1>
        <p>Voici un aperçu de l&apos;activité de l&apos;école aujourd&apos;hui.</p>
      </div>

      <div className="module36-stats-grid">
        {module36DashboardStats.map(stat => (
          <div key={stat.label} className="module36-stat-card">
            <div>
              <div className="module36-stat-label">{stat.label}</div>
              <div className={`module36-stat-value${stat.largeValue ? ' large' : ''}`}>{stat.value}</div>
              <div className="module36-stat-trend" style={{ color: stat.trendColor }}>
                <span>↑</span>
                {stat.trend}
              </div>
            </div>
            <div className="module36-stat-icon" style={{ background: stat.iconBg }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="module36-bottom-grid">
        <div className="module36-panel">
          <div className="module36-panel-header">
            <span className="module36-panel-title">Paiements récents</span>
            <button type="button" className="module36-link-btn">Voir tout →</button>
          </div>
          <div className="module36-payment-list">
            {module36RecentPayments.map((payment, index) => (
              <div key={payment.name} className="module36-payment-row">
                <div className="module36-payment-avatar" style={{ background: payment.color }}>
                  {payment.initials}
                </div>
                <div className="module36-payment-info">
                  <div className="module36-payment-name">{payment.name}</div>
                  <div className="module36-payment-detail">{payment.detail}</div>
                </div>
                <div className="module36-payment-amount">{payment.amount}</div>
                <span
                  className="module36-status-badge"
                  style={{ color: payment.statusColor, background: payment.statusBg }}
                >
                  ● {payment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="module36-panel">
          <div className="module36-panel-header">
            <span className="module36-panel-title">Impayés urgents</span>
            <button type="button" className="module36-link-btn" style={{ color: '#9CA3AF', fontSize: 16 }}>→</button>
          </div>
          <div className="module36-unpaid-list">
            {module36UrgentUnpaid.map(item => (
              <div key={item.name} className="module36-unpaid-card">
                <div>
                  <div className="module36-unpaid-name">{item.name}</div>
                  <div className="module36-unpaid-class">{item.class}</div>
                </div>
                <div className="module36-unpaid-right">
                  <div className="module36-unpaid-days">{item.days}j</div>
                  <div className="module36-unpaid-amount">{item.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Module36Layout>
  )
}
