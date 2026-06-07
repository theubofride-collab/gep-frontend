import Module35Layout from './Module35Layout'
import { module35Levels, module35Sections } from './module35Data'
import { useState } from 'react'

export default function Create() {
  const [niveau, setNiveau] = useState(module35Levels[0])
  const [section, setSection] = useState('Francophone')
  const [code, setCode] = useState('')

  function updateCode(niv, sec) {
    const key = sec === 'Francophone' ? 'FR' : sec === 'Anglophone' ? 'EN' : 'BI'
    setCode(`${niv}/${key}`)
  }

  return (
    <Module35Layout breadcrumb={["Modules", "Nouvelle classe"]} backTo={'/classes'}>
      <div className="module35-page-header">
        <div>
          <h1>Créer une classe</h1>
          <p className="module35-page-sub">Créez une nouvelle classe et affectez ses paramètres.</p>
        </div>
      </div>

      <div className="module35-form-layout">
        <div>
          <div className="module35-card">
            <div className="module35-card-header">
              <div>
                <div className="module35-card-title">Paramètres de la classe</div>
                <div className="module35-card-sub">Choisissez le niveau et la section.</div>
              </div>
            </div>
            <div className="module35-card-body">
              <div className="module35-form-group">
                <label>Niveau</label>
                <select value={niveau} onChange={e => { setNiveau(e.target.value); updateCode(e.target.value, section); }}>
                  {module35Levels.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div className="module35-form-group">
                <label>Section</label>
                <div className="module35-section-picker">
                  {module35Sections.filter(s => s !== 'Tous').map(s => (
                    <div key={s} className={`module35-sec-opt ${s === section ? `sel-${s === 'Francophone' ? 'fr' : s === 'Anglophone' ? 'en' : 'bi'}` : ''}`} onClick={() => { setSection(s); updateCode(niveau, s); }}>
                      <div className="module35-sec-icon">{s === 'Francophone' ? '🇫🇷' : s === 'Anglophone' ? '🇬🇧' : '🌐'}</div>
                      <div className="module35-sec-name">{s}</div>
+                      <div className="module35-sec-lang">Section</div>
+                      <div className="module35-sec-check">{s === section ? '✓' : ''}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="module35-form-group">
                <label>Code</label>
                <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Ex: CP/FR" />
              </div>

              <div className="module35-form-actions">
                <button className="module35-btn-submit" onClick={() => alert('Classe créée (simulation)')}>Créer la classe</button>
              </div>
            </div>
          </div>
        </div>

        <aside>
          <div className="module35-preview-card">
            <div className="module35-preview-head">
              <div className="module35-preview-head-title">Aperçu</div>
            </div>
            <div className="module35-preview-body">
              <div className="module35-preview-badge">🏫</div>
              <div className="module35-preview-name">{niveau} — {section}</div>
              <div className="module35-preview-code">{code || '—'}</div>
            </div>
          </div>

          <div className="module35-recap-card">
            <div className="module35-recap-body">
              <div className="module35-recap-title">Récapitulatif</div>
              <div className="module35-recap-desc">Les classes créées ici ne sont pas persistées — c'est une simulation pour la maquette.</div>
            </div>
          </div>
        </aside>
      </div>
    </Module35Layout>
  )
}
