import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module33Layout from '../../../../components/Ps/Module_3.3/Module33Layout'
import { module33Profile } from '../../../../components/Ps/Module_3.3/module33Data'

const MOTIFS = [
  { label: 'Transfert vers un autre établissement', value: 'transfert' },
  { label: 'Arrêt temporaire de scolarité', value: 'pause' },
  { label: 'Dossier incomplet / à régulariser', value: 'incomplet' },
  { label: 'Autre motif', value: 'autre' },
]

export default function Delete() {
  const navigate = useNavigate()
  const [motif, setMotif] = useState('transfert')
  const [detail, setDetail] = useState('')
  const [confirmValue, setConfirmValue] = useState('')
  const [showOverlay, setShowOverlay] = useState(false)

  const ready = confirmValue.trim().toUpperCase() === 'SUPPRIMER'

  function handleConfirm() {
    if (!ready) return
    setShowOverlay(true)
  }

  return (
    <>
      <Module33Layout breadcrumb={['Élèves', module33Profile.fullName, 'Désactiver']} backTo="/eleves/show">
        <div className="module33-danger-hero">
          <div className="module33-danger-icon">🗑</div>
          <div className="module33-danger-title">Désactiver un élève</div>
          <div className="module33-danger-subtitle">L’élève sera retiré des listes actives. Le dossier restera consultable dans l’archive du module 3.3.</div>
        </div>

        <div className="module33-layout-card" style={{ marginBottom: 20 }}>
          <div className="module33-card-body" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="module33-hero-avatar" style={{ width: 56, height: 56, fontSize: 18 }}>{module33Profile.initials}</div>
            <div>
              <div className="module33-page-title" style={{ fontSize: 16 }}>{module33Profile.fullName}</div>
              <div className="module33-row-subtitle">{module33Profile.id}</div>
              <div className="module33-hero-tags" style={{ marginTop: 8 }}>
                <span className="module33-hero-tag primary">{module33Profile.className} — Section {module33Profile.section}</span>
                <span className="module33-hero-tag cyan">{module33Profile.gender === 'M' ? '♂ Garçon' : '♀ Fille'}</span>
                <span className="module33-hero-tag green">{module33Profile.year}</span>
              </div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <span className="module33-row-tag success"><span className="bdot" />Actif</span>
            </div>
          </div>
        </div>

        <div className="module33-impact-grid" style={{ marginBottom: 20 }}>
          <div className="module33-impact-card warn">
            <div className="module33-impact-icon">📋</div>
            <div>
              <div className="module33-impact-title">Inscription retirée</div>
              <div className="module33-impact-description">L’élève ne figurera plus dans les listes actives de sa classe.</div>
            </div>
          </div>
          <div className="module33-impact-card info">
            <div className="module33-impact-icon">📝</div>
            <div>
              <div className="module33-impact-title">Notes conservées</div>
              <div className="module33-impact-description">Le bulletin et l’historique restent consultables dans l’archive.</div>
            </div>
          </div>
          <div className="module33-impact-card success">
            <div className="module33-impact-icon">🚌</div>
            <div>
              <div className="module33-impact-title">Transport suspendu</div>
              <div className="module33-impact-description">Le dossier transport sera mis en pause à la désactivation.</div>
            </div>
          </div>
          <div className="module33-impact-card danger">
            <div className="module33-impact-icon">⚠️</div>
            <div>
              <div className="module33-impact-title">Action réversible à vérifier</div>
              <div className="module33-impact-description">Mieux vaut valider le motif avant l’archivage définitif.</div>
            </div>
          </div>
        </div>

        <div className="module33-diff-box">
          <div className="module33-diff-title">Ce que fait la désactivation</div>
          <div className="module33-diff-grid">
            <div className="module33-diff-col success">
              <div className="module33-diff-label" style={{ color: 'var(--succes)' }}>Conservé</div>
              <div className="module33-impact-description">Notes, paiements et historique du dossier restent accessibles.</div>
            </div>
            <div className="module33-diff-col danger">
              <div className="module33-diff-label" style={{ color: 'var(--danger)' }}>Retiré</div>
              <div className="module33-impact-description">Affichage dans les listes actives, la classe et les sélections en cours.</div>
            </div>
          </div>
        </div>

        <div className="module33-card" style={{ marginBottom: 16 }}>
          <div className="module33-card-header">
            <div className="module33-card-icon amber">🧭</div>
            <div>
              <div className="module33-card-title">Motif de désactivation</div>
              <div className="module33-card-subtitle">Choisissez une raison avant de confirmer</div>
            </div>
          </div>
          <div className="module33-card-body">
            <div style={{ display: 'grid', gap: 8 }}>
              {MOTIFS.map(option => (
                <div
                  key={option.value}
                  className={`module33-radio-option${motif === option.value ? ' selected' : ''}`}
                  onClick={() => setMotif(option.value)}
                >
                  <div className="module33-radio-dot" />
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
            <div className="module33-form-group" style={{ marginTop: 14 }}>
              <label className="module33-label">Précision complémentaire</label>
              <textarea className="module33-textarea" rows="4" value={detail} onChange={event => setDetail(event.target.value)} placeholder="Précisez le contexte si nécessaire..." />
            </div>
          </div>
        </div>

        <div className="module33-confirm-box">
          <div className="module33-confirm-label">
            Tapez <strong>SUPPRIMER</strong> pour confirmer la désactivation de <strong>{module33Profile.fullName}</strong>.
          </div>
          <input
            className={`module33-confirm-input${ready ? ' valid' : ''}`}
            type="text"
            value={confirmValue}
            onChange={event => setConfirmValue(event.target.value)}
            placeholder="SUPPRIMER"
          />
          <div className="module33-hint" style={{ marginTop: 6 }}>Cette confirmation reprend la logique du prototype HTML, avec une validation explicite.</div>
        </div>

        <div className="module33-layout-card">
          <div className="module33-layout-card-footer module33-action-row">
            <button className="module33-button-secondary" type="button" onClick={() => navigate('/eleves/show')}>Annuler</button>
            <button className={`module33-button-danger${ready ? ' ready' : ''}`} type="button" onClick={handleConfirm}>Confirmer la désactivation</button>
          </div>
        </div>
      </Module33Layout>

      <div className={`module33-overlay${showOverlay ? ' show' : ''}`}>
        <div className="module33-overlay-card">
          <div className="module33-overlay-icon">✅</div>
          <div className="module33-overlay-title">Élève désactivé</div>
          <div className="module33-overlay-description">Le dossier a été archivé. Vous pouvez revenir à la liste pour continuer la gestion du module 3.3.</div>
          <button className="module33-button" type="button" onClick={() => navigate('/eleves')}>Retour à la liste</button>
        </div>
      </div>
    </>
  )
}
