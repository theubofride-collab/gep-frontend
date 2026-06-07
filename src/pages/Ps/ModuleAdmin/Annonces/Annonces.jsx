const notices = [
  { title: 'Réunion générale ce vendredi', date: 'Posté il y a 2h', views: '1,2k' },
  { title: 'Planning de surveillance du trimestre', date: 'Posté hier', views: '860' },
  { title: 'Mise à jour des congés enseignants', date: 'Posté il y a 3 jours', views: '540' },
]

export default function Annonces() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Annonces & communication</h1>
          <p className="page-subtitle">Publier les informations importantes pour les équipes et les familles</p>
        </div>
        <button className="btn-primary" type="button">+ Nouvelle annonce</button>
      </div>

      <div className="dashboard-highlight-grid">
        <div className="card dashboard-section-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Composer</p>
              <h2 className="activities-title">Brouillon rapide</h2>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Titre</label>
            <input className="form-input" placeholder="Réunion de rentrée" />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-input" rows="6" placeholder="Décrivez l'annonce à publier..." />
          </div>
          <button className="btn-primary" type="button">Publier</button>
        </div>

        <div className="card dashboard-section-card">
          <div className="dashboard-section-header">
            <div>
              <p className="dashboard-section-kicker">Publications récentes</p>
              <h2 className="activities-title">Panneau de diffusion</h2>
            </div>
          </div>
          <div className="dashboard-notice-list">
            {notices.map(item => (
              <div key={item.title} className="dashboard-notice-item">
                <div className="dashboard-notice-icon">📢</div>
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
    </div>
  )
}
