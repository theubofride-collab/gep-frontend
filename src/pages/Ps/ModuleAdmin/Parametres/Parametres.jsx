import { useState } from 'react'
import './Parametres.css'

export default function Parametres() {
  const [ecole, setEcole] = useState({
    nom: 'Collège Nebula',
    adresse: "123 Avenue de l'Éducation",
    telephone: '+225 01 02 03 04 05',
    email: 'contact@nebula-college.fr',
  })
  const [systeme, setSysteme] = useState({ devise: 'FCFA', langue: 'Français', fuseau: 'UTC+0 (GMT)', dateFormat: 'DD/MM/YYYY' })
  const [notifs, setNotifs] = useState({ paiement: true, discipline: true, absences: true })
  const [securite, setSecurite] = useState({ timeout: 30, twoFactor: false })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Paramètres généraux</h1>
          <p className="page-subtitle">Configuration de l'application</p>
        </div>
      </div>

      <div className="params-grid">
        {/* Infos école */}
        <div className="card param-card">
          <div className="param-card-header">
            <div className="param-icon purple">⚙️</div>
            <h2 className="param-card-title">Informations de l'école</h2>
          </div>
          {[
            { label: "Nom de l'école", key: 'nom', placeholder: 'Collège...' },
            { label: 'Adresse', key: 'adresse', placeholder: 'Adresse...' },
            { label: 'Téléphone', key: 'telephone', placeholder: '+...' },
            { label: 'Email', key: 'email', placeholder: 'contact@...' },
          ].map(f => (
            <div key={f.key} className="form-group">
              <label className="form-label">{f.label}</label>
              <input
                className="form-input"
                value={ecole[f.key]}
                onChange={e => setEcole({ ...ecole, [f.key]: e.target.value })}
                placeholder={f.placeholder}
              />
            </div>
          ))}
        </div>

        {/* Paramètres système */}
        <div className="card param-card">
          <div className="param-card-header">
            <div className="param-icon cyan">⚙️</div>
            <h2 className="param-card-title">Paramètres système</h2>
          </div>
          {[
            { label: 'Devise', key: 'devise', opts: ['FCFA','EUR','USD'] },
            { label: 'Langue', key: 'langue', opts: ['Français','English'] },
            { label: 'Fuseau horaire', key: 'fuseau', opts: ['UTC+0 (GMT)','UTC+1','UTC+2','UTC+3'] },
            { label: 'Format de date', key: 'dateFormat', opts: ['DD/MM/YYYY','MM/DD/YYYY','YYYY-MM-DD'] },
          ].map(f => (
            <div key={f.key} className="form-group">
              <label className="form-label">{f.label}</label>
              <select className="form-input" value={systeme[f.key]} onChange={e => setSysteme({ ...systeme, [f.key]: e.target.value })}>
                {f.opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div className="card param-card">
          <div className="param-card-header">
            <div className="param-icon green">⚙️</div>
            <h2 className="param-card-title">Notifications</h2>
          </div>
          {[
            { label: 'Alertes de paiement', key: 'paiement' },
            { label: 'Notifications discipline', key: 'discipline' },
            { label: "Alertes d'absences", key: 'absences' },
          ].map(f => (
            <div key={f.key} className="notif-row">
              <span className="notif-label">{f.label}</span>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={notifs[f.key]}
                  onChange={e => setNotifs({ ...notifs, [f.key]: e.target.checked })}
                />
                <span className="toggle-track" />
              </label>
            </div>
          ))}
        </div>

        {/* Sécurité */}
        <div className="card param-card">
          <div className="param-card-header">
            <div className="param-icon orange">⚙️</div>
            <h2 className="param-card-title">Sécurité</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Session timeout (minutes)</label>
            <input
              className="form-input"
              type="number"
              value={securite.timeout}
              onChange={e => setSecurite({ ...securite, timeout: e.target.value })}
            />
          </div>
          <div className="notif-row">
            <span className="notif-label">Authentification à 2 facteurs</span>
            <label className="toggle">
              <input
                type="checkbox"
                checked={securite.twoFactor}
                onChange={e => setSecurite({ ...securite, twoFactor: e.target.checked })}
              />
              <span className="toggle-track" />
            </label>
          </div>
        </div>
      </div>

      <div className="save-row">
        <button className="btn-primary" onClick={handleSave}>
          {saved ? '✅ Enregistré !' : '💾 Enregistrer les modifications'}
        </button>
      </div>
    </div>
  )
}
