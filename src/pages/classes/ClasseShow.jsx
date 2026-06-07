import Module35Layout from './Module35Layout'
import { getClassById, module35ProfileStudents } from './module35Data'
import { useMemo } from 'react'

export default function Show() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id') || 'CLS127'
  const cls = useMemo(() => getClassById(id), [id])

  return (
    <Module35Layout breadcrumb={["Modules", cls.name]} backTo={'/classes'}>
      <div className="module35-hero">
        <div className="module35-hero-top">
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <div className="module35-hero-av" style={{ background: cls.accent }}>{cls.sectionIcon}</div>
            <div className="module35-hero-info">
              <div className="module35-hero-name">{cls.name}</div>
              <div className="module35-hero-sub">{cls.room} • {cls.teacher} • {cls.year}</div>
              <div className="module35-hero-tags">
                <div className="module35-section-badge">{cls.section}</div>
                <div className="module35-htag module35-htag-c">Effectif: {cls.effectif}</div>
                <div className="module35-htag module35-htag-v">Moyenne: {cls.average}</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18 }} className="module35-hero-stats">
            <div className="module35-hstat">
              <div className="module35-hstat-val">{cls.average}</div>
              <div className="module35-hstat-lbl">Moyenne générale</div>
            </div>
            <div className="module35-hstat">
              <div className="module35-hstat-val">{cls.incidents}</div>
              <div className="module35-hstat-lbl">Incidents</div>
            </div>
            <div className="module35-hstat">
              <div className="module35-hstat-val">{cls.boys}/{cls.girls}</div>
              <div className="module35-hstat-lbl">Garçons/Filles</div>
            </div>
            <div className="module35-hstat">
              <div className="module35-hstat-val">{cls.year}</div>
              <div className="module35-hstat-lbl">Année</div>
            </div>
          </div>
        </div>
      </div>

      <div className="module35-tabs-bar">
        <button className="module35-tab-item active">Infos</button>
        <button className="module35-tab-item">Élèves</button>
        <button className="module35-tab-item">Notes</button>
        <button className="module35-tab-item">Discipline</button>
      </div>

      <div className="module35-panels">
        <div className="module35-panel active">
          <div className="module35-main-layout">
            <div>
              <div className="module35-card">
                <div className="module35-card-header">
                  <div>
                    <div className="module35-card-title">Informations</div>
                    <div className="module35-card-sub">Détails de la classe et observations.</div>
                  </div>
                  <div>
                    <a href={`/classes/edit?id=${cls.id}`} className="module35-ca-btn">Modifier</a>
                  </div>
                </div>
                <div className="module35-card-body">
                  <div className="module35-info-grid">
                    <div className="module35-info-item">
                      <div className="module35-info-lbl">Identifiant</div>
                      <div className="module35-info-val mono">{cls.identifier}</div>
                    </div>
                    <div className="module35-info-item">
                      <div className="module35-info-lbl">Salle</div>
                      <div className="module35-info-val">{cls.room}</div>
                    </div>
                    <div className="module35-info-item">
                      <div className="module35-info-lbl">Responsable</div>
                      <div className="module35-info-val">{cls.teacher}</div>
                    </div>
                    <div className="module35-info-item">
                      <div className="module35-info-lbl">Observations</div>
                      <div className="module35-info-val">{cls.observations}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="module35-card">
                <div className="module35-card-header">
                  <div>
                    <div className="module35-card-title">Matières</div>
                    <div className="module35-card-sub">Moyennes par matière</div>
                  </div>
                </div>
                <div className="module35-card-body">
                  {cls.subjects.map(s => (
                    <div key={s.name} className="module35-matiere-row">
                      <div>
                        <div className="module35-mat-name">{s.name}</div>
                        <div className="module35-mat-ens">{s.teacher}</div>
                      </div>
                      <div className="module35-note-val {`module35-nv-${s.tone}`}" style={{ textAlign: 'right' }}>{s.average}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside>
              <div className="module35-preview-card">
                <div className="module35-preview-head">
                  <div className="module35-preview-head-title">Récapitulatif</div>
                </div>
                <div className="module35-preview-body">
                  <div className="module35-preview-badge">{cls.sectionIcon}</div>
                  <div className="module35-preview-name">{cls.name}</div>
                  <div className="module35-preview-code">{cls.code}</div>
                  <div className="module35-preview-divider" />
                  <div style={{ textAlign: 'center' }}>
                    <div className="module35-preview-section-badge">{cls.section}</div>
                    <div className="module35-preview-divider" />
                    <div className="module35-preview-name">{cls.teacher}</div>
                  </div>
                </div>
              </div>

              <div className="module35-recap-card">
                <div className="module35-recap-body">
                  <div className="module35-recap-title">Top élèves</div>
                  <div>
                    {module35ProfileStudents.slice(0,5).map(s => (
                      <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <div className="module35-prev-av" style={{ background: 'linear-gradient(135deg,#7C3AED,#A78BFA)' }}>{s.initials}</div>
                          <div>
                            <div style={{ fontWeight: 700 }}>{s.fullName}</div>
                            <div style={{ fontSize: 12, color: '#6B7280' }}>Note: {s.note}</div>
                          </div>
                        </div>
                        <div style={{ fontWeight: 800 }}>{s.rank}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Module35Layout>
  )
}
