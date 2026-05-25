import { useState } from 'react'
import Modal from '../../../../components/Ps/ModuleAdmin/Modal/Modal'
import './Classes.css'

const initialClasses = [
  { id: 1, nom: '6ème A', niveau: '6ème', eleves: 28, max: 30, prof: 'M. Dubois' },
  { id: 2, nom: '6ème B', niveau: '6ème', eleves: 30, max: 30, prof: 'Mme Leroy' },
  { id: 3, nom: '5ème A', niveau: '5ème', eleves: 31, max: 32, prof: 'M. Martin' },
  { id: 4, nom: '5ème B', niveau: '5ème', eleves: 29, max: 32, prof: 'Mme Bernard' },
  { id: 5, nom: '4ème A', niveau: '4ème', eleves: 26, max: 28, prof: 'M. Petit' },
  { id: 6, nom: '3ème A', niveau: '3ème', eleves: 30, max: 30, prof: 'Mme Dupont' },
]

function getBarColor(pct) {
  if (pct >= 1) return 'var(--warning)'
  if (pct >= 0.9) return 'var(--success)'
  return 'var(--success)'
}

export default function Classes() {
  const [classes, setClasses] = useState(initialClasses)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ nom: '', niveau: '6ème', max: 30, prof: '' })

  const handleAdd = () => {
    setClasses(prev => [...prev, { id: Date.now(), eleves: 0, ...form, max: Number(form.max) }])
    setForm({ nom: '', niveau: '6ème', max: 30, prof: '' })
    setShowModal(false)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion des classes</h1>
          <p className="page-subtitle">Créer et gérer les classes de l'école</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Nouvelle classe
        </button>
      </div>

      <div className="classes-grid">
        {classes.map(c => {
          const pct = c.eleves / c.max
          return (
            <div key={c.id} className="class-card card">
              <div className="class-card-header">
                <div>
                  <h3 className="class-name">{c.nom}</h3>
                  <p className="class-niveau">{c.niveau}</p>
                </div>
                <button className="action-btn">✏️</button>
              </div>
              <div className="class-eleves">
                <span>👥</span>
                <span>{c.eleves} / {c.max} élèves</span>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${pct * 100}%`, background: getBarColor(pct) }}
                  />
                </div>
              </div>
              <div className="class-prof-row">
                <p className="class-prof-label">Enseignant principal</p>
                <p className="class-prof-name">{c.prof}</p>
              </div>
            </div>
          )
        })}
      </div>

      {showModal && (
        <Modal
          title="Nouvelle classe"
          onClose={() => setShowModal(false)}
          footer={
            <>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="btn-primary" onClick={handleAdd}>Créer</button>
            </>
          }
        >
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nom de la classe</label>
              <input className="form-input" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="6ème C" />
            </div>
            <div className="form-group">
              <label className="form-label">Niveau</label>
              <select className="form-input" value={form.niveau} onChange={e => setForm({ ...form, niveau: e.target.value })}>
                {['6ème','5ème','4ème','3ème'].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Capacité max</label>
              <input className="form-input" type="number" value={form.max} onChange={e => setForm({ ...form, max: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Enseignant principal</label>
              <input className="form-input" value={form.prof} onChange={e => setForm({ ...form, prof: e.target.value })} placeholder="M. Nom" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
