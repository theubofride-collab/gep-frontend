import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module34Layout from './Module34Layout'
import { module34Profile } from './module34Data'

const MOTIFS = [
  { label: "Fin d'année scolaire", value: 'fin' },
  { label: 'Départ vers un autre établissement', value: 'depart' },
  { label: 'Dossier incomplet', value: 'incomplet' },
  { label: 'Autre motif', value: 'autre' },
]

export default function Cloturer() {
  const navigate = useNavigate()
  const [motif, setMotif] = useState('fin')
  const [detail, setDetail] = useState('')
  const [confirmValue, setConfirmValue] = useState('')
  const [open, setOpen] = useState(false)

  const ready = confirmValue.trim().toUpperCase() === 'CLOTURER'

  return (
    <>
      <Module34Layout breadcrumb={['Inscriptions', module34Profile.id, 'Clôturer']} backTo="/inscriptions/show">
        <div className="module34-page-header">
          <div>
            <h1 className="module34-page-title">Clôturer une inscription</h1>
            <p className="module34-page-subtitle">Cette action mettra fin à l'inscription active de l'élève pour l'année scolaire en cours.</p>
          </div>
        </div>

        <div className="module34-alert">
          <div className="module34-alert-icon">⚠️</div>
          <div>
            <div className="module34-alert-title">Action irréversible</div>
            <div className="module34-alert-desc">La clôture est définitive pour cette année scolaire. Vérifiez les paiements avant de procéder.</div>
          </div>
        </div>

        <div className="module34-grid-2">
          <div>
            <div className="module34-panel">
              <div className="module34-panel-header"><div className="module34-card-icon ci-a">📋</div><div><div className="module34-panel-title">Motif de clôture</div><div className="module34-panel-subtitle">Sélectionnez la raison de cette clôture</div></div></div>
              <div className="module34-panel-body">
                <div className="module34-motif-grid">
                  {MOTIFS.map(option => (
                    <div key={option.value} className={`module34-motif-option${motif === option.value ? ' selected' : ''}`} onClick={() => setMotif(option.value)}>
                      <div className="module34-motif-dot" />
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
                <div className="module34-form-group" style={{ marginTop: 14 }}>
                  <label className="module34-label">Précision complémentaire</label>
                  <textarea className="module34-textarea" rows="4" value={detail} onChange={event => setDetail(event.target.value)} placeholder="Précisez le contexte si nécessaire..." />
                </div>
              </div>
            </div>

            <div className="module34-footer">
              <button className="module34-button-secondary" type="button" onClick={() => navigate('/inscriptions/show')}>Annuler</button>
              <button className="module34-button-danger" type="button" onClick={() => setOpen(true)} disabled={!ready}>Confirmer la clôture</button>
            </div>
          </div>

          <aside className="module34-summary-card">
            <div className="module34-summary-hero"><div className="module34-summary-avatar">EF</div></div>
            <div className="module34-summary-body">
              <div className="module34-summary-name">{module34Profile.fullName}</div>
              <div className="module34-summary-id">{module34Profile.id}</div>
              <div className="module34-summary-divider" />
              <div className="module34-summary-row"><span className="module34-summary-label">Section</span><span className="module34-summary-value">{module34Profile.section}</span></div>
              <div className="module34-summary-row"><span className="module34-summary-label">Classe</span><span className="module34-summary-value">{module34Profile.className}</span></div>
              <div className="module34-summary-row"><span className="module34-summary-label">Année</span><span className="module34-summary-value">{module34Profile.year}</span></div>
            </div>
          </aside>
        </div>
      </Module34Layout>

      <div className={`module34-overlay${open ? ' show' : ''}`}>
        <div className="module34-overlay-card">
          <div className="module34-overlay-icon">✅</div>
          <div className="module34-overlay-title">Inscription clôturée</div>
          <div className="module34-overlay-description">Le dossier a été archivé. Vous pouvez revenir à la liste pour continuer la gestion du module 3.4.</div>
          <button className="module34-button" type="button" onClick={() => navigate('/inscriptions')}>Retour à la liste</button>
        </div>
      </div>
    </>
  )
}
