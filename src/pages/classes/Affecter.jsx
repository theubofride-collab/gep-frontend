import Module35Layout from './Module35Layout'
import { module35CandidateStudents } from './module35Data'
import { useState } from 'react'

export default function Affecter() {
  const [selected, setSelected] = useState([])

  function toggle(id) {
    setSelected(prev => (prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]))
  }

  return (
    <Module35Layout breadcrumb={["Modules", "Affectation"]} backTo={'/classes'}>
      <div className="module35-page-header">
        <div>
          <h1>Affecter des élèves</h1>
          <p className="module35-page-sub">Sélectionnez des candidats et affectez-les à une classe.</p>
        </div>
        <div className="module35-header-actions">
          <a href="/classes/affecter-enseignant" className="module35-btn-prim">Affecter un enseignant</a>
        </div>
      </div>

      <div className="module35-main-layout">
        <div>
          <div className="module35-card">
            <div className="module35-card-header">
              <div>
                <div className="module35-card-title">Candidats</div>
                <div className="module35-card-sub">Liste des candidats disponibles</div>
              </div>
            </div>
            <div className="module35-card-body">
              <div className="module35-eleve-list">
                {module35CandidateStudents.map(c => (
                  <div key={c.id} className={`module35-eleve-row ${selected.includes(c.id) ? 'selected' : ''} ${c.statut === 'deja' ? 'already-in' : ''}`} onClick={() => c.statut !== 'deja' && toggle(c.id)}>
                    <div className="module35-elv-av" style={{ background: c.col }}>{c.initials}</div>
                    <div className="module35-ev-info">
                      <div className="module35-ev-name">{c.fullName}</div>
                      <div className="module35-ev-meta"><div className="module35-ev-id">{c.id}</div><div className={`module35-preview-section-badge ${c.statut === 'deja' ? 'module35-b-inactif' : c.statut === 'autre' ? 'module35-b-transfert' : 'module35-b-active'}`}>{c.statut}</div></div>
                    </div>
                    <div className="module35-ev-right">
                      <div className="module35-ev-select-btn">{selected.includes(c.id) ? '✓' : '+'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside>
          <div className="module35-recap-card">
            <div className="module35-recap-body">
              <div className="module35-recap-title">Sélection</div>
              <div className="module35-recap-desc">{selected.length} candidats sélectionnés</div>
              <div style={{ marginTop: 12 }}>
                {selected.map(id => <div key={id} className="module35-sel-item"><div className="module35-si-name">{id}</div><div className="module35-si-remove">✕</div></div>)}
              </div>

              <div style={{ marginTop: 14 }}>
                <button className="module35-btn-prim" onClick={() => alert('Affectation simulée')}>Confirmer l'affectation</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Module35Layout>
  )
}
