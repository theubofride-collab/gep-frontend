import Module35Layout from './Module35Layout'
import { module35Teachers } from './module35Data'

export default function AffecterEnseignant() {
  return (
    <Module35Layout breadcrumb={["Modules", "Affecter un enseignant"]} backTo={'/classes'}>
      <div className="module35-page-header">
        <div>
          <h1>Affecter un enseignant</h1>
          <p className="module35-page-sub">Choisissez un enseignant pour la classe.</p>
        </div>
      </div>

      <div className="module35-ens-grid">
        {module35Teachers.map(t => (
          <div key={t.id} className="module35-ens-card">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="module35-te-av" style={{ background: t.avatarColor }}>{t.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800 }}>{t.fullName}</div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>{t.grade} • {t.tagLabels.join(' • ')}</div>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="module35-btn-prim" onClick={() => alert('Enseignant affecté (simulation)')}>Affecter</button>
            </div>
          </div>
        ))}
      </div>
    </Module35Layout>
  )
}
