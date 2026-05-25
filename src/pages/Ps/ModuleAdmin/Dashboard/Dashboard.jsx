import StatCard from '../../../../components/Ps/ModuleAdmin/StatCard/StatCard'
import './Dashboard.css'

const activities = [
  { user: 'Marie Dupont', action: 'a créé un nouvel élève', time: 'Il y a 5 min', color: 'var(--success)' },
  { user: 'Jean Martin', action: 'a modifié la classe 6ème A', time: 'Il y a 12 min', color: 'var(--cyan)' },
  { user: 'Sophie Bernard', action: 'a désactivé un utilisateur', time: 'Il y a 23 min', color: 'var(--danger)' },
  { user: 'Pierre Leroy', action: 'a enregistré un paiement', time: 'Il y a 1h', color: 'var(--success)' },
  { user: 'Alice Petit', action: 'a généré un bulletin', time: 'Il y a 2h', color: 'var(--accent)' },
]

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

export default function Dashboard() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tableau de bord admin</h1>
          <p className="page-subtitle">Pilotage global des élèves, paiements, classes et alertes</p>
        </div>
        <div className="dashboard-header-actions">
          <span className="dashboard-chip dashboard-chip-primary">Année active 2025-2026</span>
          <span className="dashboard-chip">Dernière synchro: il y a 4 min</span>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard label="Effectif total" value="1,247" color="purple" />
        <StatCard label="Classes actives" value="24" color="cyan" />
        <StatCard label="Utilisateurs actifs" value="48" color="green" />
        <StatCard label="Alertes du jour" value="18" color="orange" />
      </div>

      <div className="dashboard-highlight-grid">
        <div className="card dashboard-hero-card">
          <div>
            <p className="dashboard-section-kicker">Vue opérationnelle</p>
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
        </div>

        <div className="card dashboard-summary-card">
          <p className="dashboard-section-kicker">Indicateurs rapides</p>
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
        </div>
      </div>

      <div className="dashboard-chart-grid">
        <div className="card dashboard-section-card dashboard-chart-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Graphique financier</p>
              <h2 className="activities-title">Recettes et dépenses</h2>
            </div>
          </div>
          <div className="dashboard-bar-chart">
            {monthlyFlow.map(item => (
              <div key={item.month} className="dashboard-bar-column">
                <div className="dashboard-bar-stack">
                  <div className="dashboard-bar-income" style={{ height: `${item.income * 1.3}px` }} />
                  <div className="dashboard-bar-expense" style={{ height: `${item.expense * 1.3}px` }} />
                </div>
                <span className="dashboard-bar-label">{item.month}</span>
              </div>
            ))}
          </div>
          <div className="dashboard-chart-legend">
            <span><i className="legend-dot income" /> Recettes</span>
            <span><i className="legend-dot expense" /> Dépenses</span>
          </div>
        </div>

        <div className="card dashboard-section-card dashboard-chart-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Graphique de présence</p>
              <h2 className="activities-title">Répartition du jour</h2>
            </div>
          </div>
          <div className="dashboard-donut-wrap">
            <svg viewBox="0 0 120 120" className="dashboard-donut">
              <circle cx="60" cy="60" r="42" className="dashboard-donut-track" />
              <circle cx="60" cy="60" r="42" className="dashboard-donut-slice present" />
              <circle cx="60" cy="60" r="42" className="dashboard-donut-slice absent" />
              <circle cx="60" cy="60" r="42" className="dashboard-donut-slice late" />
            </svg>
            <div className="dashboard-donut-center">
              <strong>94%</strong>
              <span>Présence</span>
            </div>
          </div>
          <div className="dashboard-donut-legend">
            {attendanceSlices.map(slice => (
              <div key={slice.label} className="dashboard-donut-legend-item">
                <span className="dashboard-donut-marker" style={{ background: slice.color }} />
                <div>
                  <p>{slice.label}</p>
                  <strong>{slice.value}%</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        <div className="dashboard-left-column">
          <div className="card dashboard-section-card">
            <div className="dashboard-section-header">
              <div>
                <p className="dashboard-section-kicker">Répartition des élèves</p>
                <h2 className="activities-title">Capacité des niveaux</h2>
              </div>
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
          </div>

          <div className="card activities-card">
            <h2 className="activities-title">Dernières activités</h2>
            <div className="activities-list">
              {activities.map((a, i) => (
                <div key={i} className="activity-item">
                  <span className="activity-dot" style={{ background: a.color }} />
                  <div className="activity-body">
                    <p className="activity-text">
                      <strong>{a.user}</strong> {a.action}
                    </p>
                    <p className="activity-time">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card dashboard-section-card">
            <div className="dashboard-section-header">
              <div>
                <p className="dashboard-section-kicker">Panneau d’annonces</p>
                <h2 className="activities-title">Messages à diffuser</h2>
              </div>
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
          </div>
        </div>

        <div className="dashboard-right-column">
          <div className="card dashboard-section-card">
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
          </div>

          <div className="card dashboard-section-card">
            <div className="dashboard-section-header">
              <div>
                <p className="dashboard-section-kicker">Échéances à venir</p>
                <h2 className="activities-title">Agenda administratif</h2>
              </div>
            </div>
            <div className="dashboard-deadline-list">
              {deadlines.map(item => (
                <div key={item.label} className="dashboard-deadline-item">
                  <span className="dashboard-deadline-marker" style={{ background: item.color }} />
                  <div>
                    <p className="dashboard-deadline-title">{item.label}</p>
                    <p className="dashboard-deadline-date">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card dashboard-footer-card">
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
      </div>
    </div>
  )
}
