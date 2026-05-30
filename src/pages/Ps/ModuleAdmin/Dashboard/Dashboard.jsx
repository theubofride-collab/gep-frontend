import StatCard from '../../../../components/Ps/ModuleAdmin/StatCard/StatCard'
import LineChart from '../../../../components/Ps/ModuleAdmin/Charts/LineChart'
import BarChart from '../../../../components/Ps/ModuleAdmin/Charts/BarChart'
import DoughnutChart from '../../../../components/Ps/ModuleAdmin/Charts/DoughnutChart'
import './Dashboard.css'

const reminders = [
  { title: '18 paiements à relancer', detail: '3 familles attendent un appel aujourd’hui', tone: 'warning' },
  { title: '2 classes à compléter', detail: 'Les listes 4e A et 3e B doivent être validées', tone: 'danger' },
  { title: 'Bulletins prêts à imprimer', detail: 'Cycle du trimestre confirmé pour vendredi', tone: 'success' },
]

const levelDistribution = [
  { level: 'CI / CP', value: 82, color: 'var(--cyan)' },
  { level: 'CE1 / CE2', value: 105, color: 'var(--accent)' },
  { level: 'CM1 / CM2', value: 118, color: 'var(--success)' },
  { level: '6e / 5e', value: 156, color: 'var(--warning)' },
  { level: '4e / 3e', value: 126, color: 'var(--danger)' },
]

const deadlines = [
  { label: 'Conseil de classe', date: 'Demain, 15h00', color: 'var(--accent)' },
  { label: 'Clôture des paiements', date: 'Jeudi, 18h00', color: 'var(--warning)' },
  { label: 'Impression des bulletins', date: 'Vendredi, 09h00', color: 'var(--cyan)' },
]

const metrics = [
  { label: 'Présence moyenne', value: '94%', note: '+3% cette semaine' },
  { label: 'Taux de paiement', value: '87%', note: '18 dossiers ouverts' },
  { label: 'Nouveaux inscrits', value: '26', note: 'Depuis lundi' },
]

const topCards = [
  { label: 'Élèves', value: '15.0K', color: 'purple', icon: '🎓' },
  { label: 'Enseignants', value: '200', color: 'cyan', icon: '🧑‍🏫' },
  { label: 'Frais en attente de paiement', value: '5.6K', color: 'green', icon: '💸' },
  { label: 'Dépenses mensuelles', value: '18', color: 'orange', icon: '🧾' },
]

const bottomCards = [
  { label: 'Collections mensuelles de frais', value: '12.4K', color: 'purple', icon: '💰' },
  { label: 'Personnel présent aujourd’hui', value: '48', color: 'cyan', icon: '👥' },
  { label: 'Leads convertis', value: '126', color: 'green', icon: '🤝' },
  { label: 'Total des cours', value: '64', color: 'orange', icon: '📚' },
]

const quickActions = [
  { label: 'Nouvelle inscription', icon: '➕' },
  { label: 'Créer un paiement', icon: '💳' },
  { label: 'Publier un message', icon: '📢' },
]

const monthlyFlow = [
  { month: 'Jan', income: 35, expense: 20 },
  { month: 'Fév', income: 48, expense: 30 },
  { month: 'Mar', income: 30, expense: 22 },
  { month: 'Avr', income: 55, expense: 38 },
  { month: 'Mai', income: 42, expense: 28 },
  { month: 'Juin', income: 60, expense: 45 },
  { month: 'Juil', income: 38, expense: 25 },
  { month: 'Août', income: 52, expense: 35 },
]

const attendanceSlices = [
  { label: 'Présents', value: 72, color: 'var(--success)' },
  { label: 'Absents', value: 18, color: 'var(--danger)' },
  { label: 'Retards', value: 10, color: 'var(--warning)' },
]

const noticeBoard = [
  { title: 'Réunion de rentrée pour les familles', date: 'Mardi 8h30', views: '1,4k' },
  { title: 'Dépôt des bulletins du trimestre', date: 'Jeudi 12h00', views: '860' },
  { title: 'Sortie pédagogique au musée', date: 'Vendredi 15h00', views: '620' },
]

const scheduleCards = [
  { month: 'Octobre 2025', progress: 65, title: 'Emploi du temps prêt', description: 'Affectations validées pour les niveaux du primaire et du collège.', icon: '📆' },
  { month: 'Novembre 2025', progress: 40, title: 'Sessions à ajuster', description: 'Mise à jour des salles et des enseignants en cours.', icon: '🗓️' },
]

const starStudents = [
  { name: 'Evelyn Harper', id: 'PRE43178', notes: '1185', percent: '98%', badge: 'pct-high', initials: 'EH', accent: 'linear-gradient(135deg, var(--accent), var(--cyan))' },
  { name: 'Diana Plenty', id: 'PRE43174', notes: '1165', percent: '91%', badge: 'pct-mid', initials: 'DP', accent: 'linear-gradient(135deg, var(--cyan), var(--accent))' },
  { name: 'John Millar', id: 'PRE43187', notes: '1175', percent: '92%', badge: 'pct-high', initials: 'JM', accent: 'linear-gradient(135deg, #7C3AED, var(--cyan))' },
]

const notifications = [
  { icon: '🚨', className: 'notif-danger', title: "Fermeture d'urgence de l'école", time: '16:00', date: '15 Août' },
  { icon: '🎭', className: 'notif-info', title: 'Nouveaux clubs parascolaires', time: '16:00', date: '15 Août' },
]

const performanceRows = [
  { level: 'Classe 06', percent: 60, label: 'Maths', className: 'bar-violet' },
  { level: 'Classe 04', percent: 70, label: 'GK', className: 'bar-cyan' },
  { level: 'Classe 03', percent: 72, label: 'Sciences', className: 'bar-mixed' },
  { level: 'Classe 08', percent: 47, label: 'Anglais', className: 'bar-light' },
]

const enrollmentTrend = monthlyFlow.map(item => ({
  month: item.month,
  value: item.income + item.expense,
}))

const financeCategories = monthlyFlow.map(item => item.month)

const incomeCircle = [72, 28]
const expenseCircle = [38, 62]

const feesOverview = [
  { label: 'Impayés', value: 24, color: 'var(--danger)' },
  { label: 'Payés', value: 68, color: 'var(--success)' },
  { label: 'En attente', value: 42, color: 'var(--warning)' },
]

export default function Dashboard() {
  return (
    <div>
      <div className="dashboard-shell">
        <header className="dashboard-topbar">
          <div className="dashboard-search-wrap">
            <span className="dashboard-search-icon">🔍</span>
            <input type="text" placeholder="Rechercher ici..." aria-label="Rechercher dans le dashboard" />
          </div>
          <div className="dashboard-topbar-right">
            <button className="dashboard-icon-btn" type="button" aria-label="Notifications">
              🔔
              <span className="dashboard-notif-dot" />
            </button>
            <button className="dashboard-icon-btn" type="button" aria-label="Messages">💬</button>
            <div className="dashboard-user-pill">
              <div className="dashboard-avatar">LR</div>
              <div className="dashboard-user-info">
                <div className="dashboard-user-name">Luke J R</div>
                <div className="dashboard-user-role">Admin</div>
              </div>
              <span className="dashboard-user-caret">∨</span>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="dashboard-page-header">
            <div>
              <h1>Bienvenue. 👋</h1>
              <p>Naviguez vers l'avenir de l'éducation avec Gep Nebula.</p>
            </div>
            <div className="dashboard-header-actions">
              <span className="dashboard-chip dashboard-chip-primary">Année active 2025-2026</span>
              <span className="dashboard-chip">Dernière synchro : il y a 4 min</span>
            </div>
          </section>

          <div className="stats-grid dashboard-stat-row">
            {topCards.map(card => (
              <StatCard key={card.label} label={card.label} value={card.value} color={card.color} icon={card.icon} />
            ))}
          </div>

          <div className="stats-grid dashboard-stat-row dashboard-stat-row-secondary">
            {bottomCards.map(card => (
              <StatCard key={card.label} label={card.label} value={card.value} color={card.color} icon={card.icon} />
            ))}
          </div>

          <div className="dashboard-grid dashboard-grid-2 dashboard-finance-grid">
            <section className="card dashboard-section-card dashboard-chart-card dashboard-chart-card-wide dashboard-finance-card">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Encaissements et dépenses de frais</span>
                <span className="dashboard-mini-chip">Bar chart</span>
              </div>
              <div className="dashboard-chart-frame">
                <BarChart
                  labels={financeCategories}
                  datasets={[
                    {
                      label: 'Encaissements de frais',
                      data: monthlyFlow.map(item => item.income),
                      backgroundColor: 'rgba(6,182,212,0.70)',
                      borderColor: 'var(--cyan)',
                      borderWidth: 0,
                      borderRadius: 10,
                    },
                    {
                      label: 'Dépenses de frais',
                      data: monthlyFlow.map(item => item.expense),
                      backgroundColor: 'rgba(124,92,255,0.70)',
                      borderColor: 'var(--accent)',
                      borderWidth: 0,
                      borderRadius: 10,
                    },
                  ]}
                  options={{
                    plugins: { legend: { position: 'top' } },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(148,163,184,0.18)' },
                      },
                      x: {
                        grid: { display: false },
                      },
                    },
                  }}
                />
              </div>
            </section>

            <section className="card dashboard-section-card dashboard-chart-card dashboard-finance-card">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Évolution des encaissements de frais</span>
                <span className="dashboard-mini-chip">Courbes</span>
              </div>
              <div className="dashboard-chart-frame">
                <LineChart
                  labels={financeCategories}
                  datasets={[
                    {
                      label: 'Encaissements mensuels',
                      data: monthlyFlow.map(item => item.income),
                      backgroundColor: 'rgba(6,182,212,0.10)',
                      borderColor: 'var(--cyan)',
                      tension: 0.42,
                      fill: true,
                    },
                    {
                      label: 'Dépenses mensuelles',
                      data: monthlyFlow.map(item => item.expense),
                      backgroundColor: 'rgba(124,92,255,0.10)',
                      borderColor: 'var(--accent)',
                      tension: 0.42,
                      fill: true,
                    },
                  ]}
                  options={{
                    plugins: { legend: { position: 'top' } },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(148,163,184,0.18)' },
                      },
                      x: {
                        grid: { display: false },
                      },
                    },
                  }}
                />
              </div>
            </section>
          </div>

          <div className="dashboard-grid dashboard-grid-3 dashboard-fees-grid">
            <section className="card dashboard-section-card dashboard-chart-card dashboard-circle-card">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Recettes de frais</span>
                <span className="dashboard-mini-chip">Income</span>
              </div>
              <div className="dashboard-circle-chart">
                <DoughnutChart
                  labels={['Encaissements', 'Reste à encaisser']}
                  dataPoints={incomeCircle}
                  colors={['var(--accent)', 'rgba(124,92,255,0.12)']}
                  options={{
                    plugins: { legend: { position: 'bottom' } },
                    cutout: '72%',
                  }}
                />
              </div>
              <div className="dashboard-chart-legend">
                <div className="dashboard-donut-legend-item">
                  <span className="dashboard-donut-marker" style={{ background: 'var(--accent)' }} />
                  <div>
                    <strong>Encaissements</strong>
                    <p>Part collectée ce mois</p>
                  </div>
                </div>
                <div className="dashboard-donut-legend-item">
                  <span className="dashboard-donut-marker" style={{ background: 'rgba(124,92,255,0.35)' }} />
                  <div>
                    <strong>Reste à encaisser</strong>
                    <p>Solde encore dû</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="card dashboard-section-card dashboard-chart-card dashboard-circle-card">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Dépenses de frais</span>
                <span className="dashboard-mini-chip">Expenses</span>
              </div>
              <div className="dashboard-circle-chart">
                <DoughnutChart
                  labels={['Dépensé', 'Budget restant']}
                  dataPoints={expenseCircle}
                  colors={['var(--cyan)', 'rgba(6,182,212,0.14)']}
                  options={{
                    plugins: { legend: { position: 'bottom' } },
                    cutout: '72%',
                  }}
                />
              </div>
              <div className="dashboard-chart-legend">
                <div className="dashboard-donut-legend-item">
                  <span className="dashboard-donut-marker" style={{ background: 'var(--cyan)' }} />
                  <div>
                    <strong>Dépensé</strong>
                    <p>Charges engagées</p>
                  </div>
                </div>
                <div className="dashboard-donut-legend-item">
                  <span className="dashboard-donut-marker" style={{ background: 'rgba(6,182,212,0.35)' }} />
                  <div>
                    <strong>Budget restant</strong>
                    <p>Marge disponible</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="card dashboard-section-card dashboard-fees-card">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Aperçu des frais</span>
                <span className="dashboard-mini-chip">Fees overview</span>
              </div>
              <div className="dashboard-fees-list">
                {feesOverview.map(item => (
                  <div key={item.label} className="dashboard-fees-item">
                    <div className="dashboard-fees-meta">
                      <span className="dashboard-fees-label">{item.label}</span>
                      <span className="dashboard-fees-value">{item.value}%</span>
                    </div>
                    <div className="dashboard-deliverable-bar dashboard-fees-bar">
                      <div
                        className="dashboard-deliverable-fill"
                        style={{ width: `${item.value}%`, background: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="dashboard-grid dashboard-grid-2 dashboard-top-secondary">
            <section className="card dashboard-summary-card dashboard-surface-card dashboard-summary-boost dashboard-indicators-card">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Indicateurs rapides</span>
                <span className="dashboard-mini-chip">Synthèse</span>
              </div>
              <div className="dashboard-metrics-list">
                {metrics.map(metric => (
                  <div key={metric.label} className="dashboard-metric-item">
                    <div>
                      <p className="dashboard-metric-label">{metric.label}</p>
                      <p className="dashboard-metric-note">{metric.note}</p>
                    </div>
                    <strong className="dashboard-metric-value">{metric.value}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="card dashboard-summary-card dashboard-surface-card dashboard-summary-boost dashboard-schedule-card">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Emploi du temps</span>
                <a className="view-all" href="#">Voir tout</a>
              </div>
              <div className="routine-filters dashboard-filter-row">
                <button type="button" className="select-pill">Choisir jour ∨</button>
                <button type="button" className="select-pill">Choisir classe ∨</button>
                <button type="button" className="select-pill">Section ∨</button>
              </div>
              <div className="dashboard-schedule-grid">
                {scheduleCards.map(card => (
                  <article key={card.month} className="dashboard-month-card">
                    <div className="month-card-head">
                      <div className="month-icon">{card.icon}</div>
                      <span className="dashboard-dots">⋯</span>
                    </div>
                    <div className="month-name">{card.month}</div>
                    <div className="month-desc">{card.title}</div>
                    <p className="dashboard-month-text">{card.description}</p>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${card.progress}%` }} /></div>
                    <button className="btn-download" type="button">⬇ Télécharger (pdf)</button>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="dashboard-grid dashboard-grid-2 dashboard-grid-top-gap">
            <section className="card dashboard-section-card dashboard-table-card">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Meilleurs élèves</span>
                <span className="view-all">⋮</span>
              </div>
              <div className="table-wrap dashboard-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: 28 }} />
                      <th>Nom</th>
                      <th>ID</th>
                      <th>Notes</th>
                      <th>Percent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {starStudents.map((student, index) => (
                      <tr key={student.id}>
                        <td><div className={`checkbox ${index === 1 ? 'checked' : ''}`}>{index === 1 ? '✓' : ''}</div></td>
                        <td>
                          <div className="student-cell">
                            <div className="stu-avatar" style={{ background: student.accent }}>{student.initials}</div>
                            {student.name}
                          </div>
                        </td>
                        <td><span className="id-badge">{student.id}</span></td>
                        <td>{student.notes}</td>
                        <td><span className={`percent-badge ${student.badge}`}>{student.percent}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="card dashboard-section-card dashboard-announcements-card">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Panneau d’annonces</span>
                <a className="view-all" href="#">Voir tout</a>
              </div>
              <div className="dashboard-notice-list">
                {noticeBoard.map(item => (
                  <div key={item.title} className="dashboard-notice-item">
                    <div className="dashboard-notice-icon">📌</div>
                    <div className="dashboard-notice-content">
                      <p className="dashboard-notice-title">{item.title}</p>
                      <p className="dashboard-notice-meta">{item.date}</p>
                    </div>
                    <span className="dashboard-notice-views">{item.views} vues</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="dashboard-grid dashboard-grid-2 dashboard-grid-bottom-gap">
            <section className="card dashboard-section-card">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Répartition des élèves</span>
                <span className="dashboard-mini-chip">Structure</span>
              </div>
              <div className="dashboard-level-list">
                {levelDistribution.map(item => (
                  <div key={item.level} className="dashboard-level-row">
                    <div className="dashboard-level-labels">
                      <span className="dashboard-level-name">{item.level}</span>
                      <span className="dashboard-level-count">{item.value} élèves</span>
                    </div>
                    <div className="dashboard-level-bar">
                      <div className="dashboard-level-fill" style={{ width: `${Math.min(item.value, 160) / 160 * 100}%`, background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="card dashboard-section-card dashboard-classes-card">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Meilleurs résultats</span>
                <select className="period-select" defaultValue="Hebdo" aria-label="Période">
                  <option>Hebdo</option>
                  <option>Mensuel</option>
                </select>
              </div>
              <div className="dashboard-performance-list">
                {performanceRows.map(row => (
                  <div key={row.level} className="perf-row">
                    <div className="perf-meta">
                      <span className="perf-class">{row.level}</span>
                      <span className="perf-pct">{row.percent}%</span>
                    </div>
                    <div className="perf-bar-wrap">
                      <div className={`perf-bar ${row.className}`} style={{ width: `${row.percent}%` }}>{row.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dashboard-week-row">
                <span>Dim</span><span>Lun</span><span>Mar</span><span>Mer</span>
              </div>
            </section>
          </div>

          <section className="card dashboard-section-card dashboard-reminders-card">
            <div className="dashboard-section-header">
              <div>
                <p className="dashboard-section-kicker">Rappels prioritaires</p>
                <h2 className="activities-title">À traiter maintenant</h2>
              </div>
            </div>
            <div className="dashboard-reminder-list">
              {reminders.map(reminder => (
                <div key={reminder.title} className="dashboard-reminder-item">
                  <span className={`dashboard-reminder-dot ${reminder.tone}`} />
                  <div>
                    <p className="dashboard-reminder-title">{reminder.title}</p>
                    <p className="dashboard-reminder-text">{reminder.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card dashboard-section-card dashboard-footer-card">
            <div className="dashboard-section-header">
              <div>
                <p className="dashboard-section-kicker">Suivi de production</p>
                <h2 className="activities-title">Statut des livrables</h2>
              </div>
            </div>
            <div className="dashboard-deliverables-grid">
              {[
                { label: 'Bulletins prêts', value: '87%', color: 'var(--success)' },
                { label: 'Retards traités', value: '64%', color: 'var(--warning)' },
                { label: 'Exports validés', value: '92%', color: 'var(--cyan)' },
              ].map(item => (
                <div key={item.label} className="dashboard-deliverable-item">
                  <div className="dashboard-deliverable-top">
                    <span className="dashboard-deliverable-label">{item.label}</span>
                    <strong className="dashboard-deliverable-value">{item.value}</strong>
                  </div>
                  <div className="dashboard-deliverable-bar">
                    <div className="dashboard-deliverable-fill" style={{ width: item.value, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
