import Module35Layout from '../../../../components/Ps/Module_3.5/Module35Layout'
import { getClassById } from '../../../../components/Ps/Module_3.5/module35Data'
import { useMemo, useState } from 'react'

export default function Edit() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id') || 'CLS127'
  const cls = useMemo(() => getClassById(id), [id])
  const [name, setName] = useState(cls.name)
  const [room, setRoom] = useState(cls.room)

  return (
    <Module35Layout breadcrumb={["Modules", 'Modifier la classe']} backTo={'/classes'}>
      <div className="module35-page-header">
        <div>
          <h1>Modifier la classe</h1>
          <p className="module35-page-sub">Apportez des modifications à la classe sélectionnée.</p>
        </div>
      </div>

      <div className="module35-form-layout">
        <div>
          <div className="module35-card">
            <div className="module35-card-header">
              <div>
                <div className="module35-card-title">Éditer</div>
                <div className="module35-card-sub">Mettez à jour les informations de la classe.</div>
              </div>
            </div>
            <div className="module35-card-body">
              <div className="module35-form-group">
                <label>Nom</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div className="module35-form-group">
                <label>Salle</label>
                <input type="text" value={room} onChange={e => setRoom(e.target.value)} />
              </div>

              <div className="module35-form-actions">
                <button className="module35-btn-submit" onClick={() => alert('Enregistré (simulation)')}>Enregistrer</button>
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
              <div className="module35-preview-name">{name}</div>
              <div className="module35-preview-code">{cls.code}</div>
            </div>
          </div>

          <div className="module35-recap-card">
            <div className="module35-recap-body">
              <div className="module35-recap-title">Observations</div>
              <div className="module35-recap-desc">Toutes les modifications sont simulées en mémoire.</div>
            </div>
          </div>
        </aside>
      </div>
    </Module35Layout>
  )
}
