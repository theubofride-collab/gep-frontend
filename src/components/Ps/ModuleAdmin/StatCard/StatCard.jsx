import './StatCard.css'

export default function StatCard({ label, value, color }) {
  const colors = {
    purple: { bg: 'var(--accent)', icon: '👥' },
    cyan:   { bg: 'var(--cyan)', icon: '🏫' },
    green:  { bg: 'var(--success)', icon: '👤' },
    orange: { bg: 'var(--warning)', icon: '📊' },
  }
  const c = colors[color] || colors.purple

  return (
    <div className="stat-card card">
      <div className="stat-info">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
      <div className="stat-icon" style={{ background: c.bg }}>
        <span>{c.icon}</span>
      </div>
    </div>
  )
}
