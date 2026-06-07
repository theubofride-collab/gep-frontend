import { useState } from 'react'
import Module36Layout from '../../../../../components/Ps/Module_3.6/Module36Layout'
import {
  module36ListStatusStyles,
  module36PrintActions,
  module36StudentProfiles,
  module36Students,
} from '../../../../../components/Ps/Module_3.6/module36Data'

export default function FicheEleve() {
  const [eleve, setEleve] = useState(module36Students[0])
  const profile = module36StudentProfiles[eleve]
  const paiementStatus = profile?.paiement === 'À jour'
    ? module36ListStatusStyles.Payé
    : module36ListStatusStyles['En attente']

  if (!profile) {
    return (
      <Module36Layout>
        <div className="module36-greeting">
          <h1>Fiche élève</h1>
          <p>Aucune fiche disponible pour cet élève.</p>
        </div>
      </Module36Layout>
    )
  }

  return (
    <Module36Layout>
      <div className="module36-page-header">
        <div className="module36-greeting" style={{ marginBottom: 0 }}>
          <h1>Fiche élève</h1>
          <p>Consultez et imprimez la fiche administrative d&apos;un élève.</p>
        </div>
        <div className="module36-page-actions">
          {module36PrintActions.map(action => (
            <button key={action.label} type="button" className={`module36-action-btn ${action.variant}`}>
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <div className="module36-filters-card">
        <div className="module36-filters-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label className="module36-filter-label" htmlFor="fiche-eleve">Élève</label>
            <div className="module36-select-wrap">
              <select
                id="fiche-eleve"
                className="module36-select"
                value={eleve}
                onChange={event => setEleve(event.target.value)}
              >
                {Object.keys(module36StudentProfiles).map(student => (
                  <option key={student} value={student}>{student}</option>
                ))}
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
          <div>
            <label className="module36-filter-label" htmlFor="fiche-format">Format</label>
            <div className="module36-select-wrap">
              <select id="fiche-format" className="module36-select" defaultValue="pdf">
                <option value="pdf">PDF</option>
                <option value="print">Impression</option>
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
        </div>
      </div>

      <div className="module36-export-preview">
        <div className="module36-export-preview-header">
          <div>
            <div className="module36-export-school">École Primaire Les Lauriers</div>
            <div className="module36-export-meta">Fiche administrative · Année 2024–2025</div>
            <div className="module36-export-meta">{eleve} · {profile.classe}</div>
          </div>
          <span className="module36-export-badge">Fiche élève</span>
        </div>

        <div className="module36-profile-grid">
          {[
            { label: 'Matricule', value: profile.matricule },
            { label: 'Classe', value: profile.classe },
            { label: 'Date de naissance', value: profile.naissance },
            { label: 'Genre', value: profile.genre },
            { label: 'Tuteur / Responsable', value: profile.tuteur },
            { label: 'Téléphone', value: profile.telephone },
            { label: 'Adresse', value: profile.adresse },
            { label: 'Date d\'inscription', value: profile.inscription },
            { label: 'Statut scolaire', value: profile.statut },
            { label: 'Situation paiement', value: profile.paiement },
          ].map(field => (
            <div key={field.label} className="module36-profile-field">
              <label>{field.label}</label>
              {field.label === 'Situation paiement' ? (
                <span
                  className="module36-list-status-badge"
                  style={{ background: paiementStatus.bg, color: paiementStatus.color, marginTop: 4 }}
                >
                  ● {field.value}
                </span>
              ) : (
                <span>{field.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Module36Layout>
  )
}
