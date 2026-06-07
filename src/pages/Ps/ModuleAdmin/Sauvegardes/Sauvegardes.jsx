import { useState } from 'react'
import './Sauvegardes.css'

const initialHistory = [
  { id: 1, nom: 'backup_2026_05_01_03_00', taille: '245 MB', date: '01/05/2026 à 03:00', status: 'ok' },
  { id: 2, nom: 'backup_2026_04_30_03_00', taille: '243 MB', date: '30/04/2026 à 03:00', status: 'ok' },
  { id: 3, nom: 'backup_2026_04_29_03_00', taille: '241 MB', date: '29/04/2026 à 03:00', status: 'ok' },
  { id: 4, nom: 'backup_2026_04_28_03_00', taille: '240 MB', date: '28/04/2026 à 03:00', status: 'ok' },
]

export default function Sauvegardes() {
  const [config, setConfig] = useState({ frequence: 'Quotidienne', heure: '03:00', retention: 30, nb: 10 })
  const [history] = useState(initialHistory)
  const [saved, setSaved] = useState(false)
  const [creating, setCreating] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleNewBackup = () => {
    setCreating(true)
    setTimeout(() => setCreating(false), 2000)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion des sauvegardes</h1>
          <p className="page-subtitle">Gérer les sauvegardes de la base de données</p>
        </div>
        <button className="btn-primary" onClick={handleNewBackup}>
          {creating ? '⏳ En cours...' : '+ Nouvelle sauvegarde'}
        </button>
      </div>

      {/* Stat cards */}
      <div className="backup-stats">
        <div className="card backup-stat-card">
          <div className="backup-stat-icon green">✅</div>
          <div>
            <p className="backup-stat-label">Dernière sauvegarde</p>
            <p className="backup-stat-value">01/05/2026 à 03:00</p>
            <p className="backup-stat-sub success">Réussie (245 MB)</p>
          </div>
        </div>
        <div className="card backup-stat-card">
          <div className="backup-stat-icon cyan">🕐</div>
          <div>
            <p className="backup-stat-label">Prochaine sauvegarde</p>
            <p className="backup-stat-value">02/05/2026 à 03:00</p>
            <p className="backup-stat-sub info">Automatique (planifiée)</p>
          </div>
        </div>
        <div className="card backup-stat-card">
          <div className="backup-stat-icon purple">🗄️</div>
          <div>
            <p className="backup-stat-label">Espace utilisé</p>
            <p className="backup-stat-value">1.2 GB / 10 GB</p>
            <div className="backup-progress-bg">
              <div className="backup-progress-fill" style={{ width: '12%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Auto config */}
      <div className="card config-card">
        <h2 className="config-title">Configuration automatique</h2>
        <p className="config-subtitle">Planifier les sauvegardes automatiques</p>
        <div className="config-grid">
          <div className="form-group">
            <label className="form-label">Fréquence</label>
            <select className="form-input" value={config.frequence} onChange={e => setConfig({ ...config, frequence: e.target.value })}>
              {['Quotidienne','Hebdomadaire','Mensuelle'].map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Heure d'exécution</label>
            <input className="form-input" type="time" value={config.heure} onChange={e => setConfig({ ...config, heure: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Rétention (jours)</label>
            <input className="form-input" type="number" value={config.retention} onChange={e => setConfig({ ...config, retention: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Sauvegardes à conserver</label>
            <input className="form-input" type="number" value={config.nb} onChange={e => setConfig({ ...config, nb: e.target.value })} />
          </div>
        </div>
        <button className="btn-primary" style={{ marginTop: 8 }} onClick={handleSave}>
          {saved ? '✅ Configuration enregistrée' : 'Enregistrer la configuration'}
        </button>
      </div>

      {/* History */}
      <div className="card">
        <div style={{ padding: '20px 20px 0' }}>
          <h2 className="config-title">Historique des sauvegardes</h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Date</th>
                <th>Taille</th>
                <th>Statut</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map(b => (
                <tr key={b.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 13 }}>{b.nom}</td>
                  <td>{b.date}</td>
                  <td>{b.taille}</td>
                  <td><span className="badge badge-green">✓ Réussie</span></td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="action-btn" title="Télécharger">⬇️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
