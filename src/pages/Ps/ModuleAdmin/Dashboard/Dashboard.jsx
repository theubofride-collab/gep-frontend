import StatCard from '../../../../components/Ps/ModuleAdmin/StatCard/StatCard'
import LineChart from '../../../../components/Ps/ModuleAdmin/Charts/LineChart'
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
              <p>Naviguez vers l'avenir de l'éducation avec Schooli.</p>
            </div>
            <div className="dashboard-header-actions">
              <span className="dashboard-chip dashboard-chip-primary">Année active 2025-2026</span>
              <span className="dashboard-chip">Dernière synchro : il y a 4 min</span>
            </div>
          </section>

          <div className="stats-grid dashboard-stat-row">
            <StatCard label="Élèves" value="15.0K" color="purple" />
            <StatCard label="Enseignants" value="200" color="cyan" />
            <StatCard label="Prix" value="5.6K" color="green" />
            <StatCard label="Alertes" value="18" color="orange" />
          </div>

          <div className="dashboard-grid dashboard-grid-top">
            <section className="card dashboard-hero-card dashboard-surface-card">
              <div className="dashboard-hero-header">
                <div className="dashboard-hero-heading">
                  <span className="dashboard-section-kicker dashboard-hero-kicker">Pilotage du jour</span>
                  <span className="dashboard-hero-title">Vue opérationnelle</span>
                </div>
                <a className="view-all" href="#">Voir tout</a>
              </div>
              <div className="dashboard-hero-body">
                <h2 className="dashboard-hero-title">Tout ce qui demande une action aujourd’hui, au même endroit.</h2>
                <p className="dashboard-hero-text">
                  Suivi des inscriptions, relances de paiement, documents à imprimer et échéances de direction.
                  L’objectif est d’ouvrir le tableau de bord et de savoir quoi traiter en priorité.
                </p>
              </div>
              <div className="dashboard-quick-actions">
                {quickActions.map(action => (
                  <button key={action.label} className="dashboard-quick-action" type="button">
                    <span>{action.icon}</span>
                    {action.label}
                  </button>
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

          <div className="dashboard-grid dashboard-grid-3 dashboard-grid-spacious">
            <section className="card dashboard-section-card dashboard-chart-card dashboard-chart-card-wide">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Évolution des inscriptions</span>
                <a className="view-all" href="#">Voir tout</a>
              </div>
              <div style={{ height: 260 }}>
                <LineChart
                  labels={enrollmentTrend.map(item => item.month)}
                  datasets={[
                    {
                      label: 'Inscriptions cumulées',
                      data: enrollmentTrend.map(item => item.value),
                      backgroundColor: 'rgba(124,92,255,0.10)',
                      borderColor: 'var(--accent)',
                      tension: 0.35,
                      fill: true,
                    },
                    {
                      label: 'Flux financier',
                      data: monthlyFlow.map(item => item.income),
                      backgroundColor: 'rgba(6,182,212,0.08)',
                      borderColor: 'var(--cyan)',
                      tension: 0.35,
                      fill: true,
                    },
                  ]}
                />
              </div>
            </section>

            <section className="card dashboard-section-card dashboard-chart-card">
              <div className="card-header dashboard-card-header">
                <span className="card-title">Statistiques</span>
                <span className="dashboard-mini-chip">Graphiques</span>
              </div>
              <div style={{ height: 260 }}>
                <DoughnutChart
                  labels={['Maths', 'Anglais', 'Chimie']}
                  dataPoints={[40, 35, 25]}
                  colors={['var(--accent)', 'var(--cyan)', '#A78BFA']}
                />
              </div>
              <div className="dashboard-donut-legend">
                <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--accent)' }} /> Maths</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--cyan)' }} /> Anglais</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: '#A78BFA' }} /> Chimie</div>
              </div>
            </section>

            <section className="card dashboard-section-card dashboard-chart-card dashboard-classes-card">
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

            <section className="card dashboard-section-card dashboard-indicators-card dashboard-summary-boost">
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
