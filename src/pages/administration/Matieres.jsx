import { useState } from 'react'
import Modal from '../../components/ui/Modal'
import './Matieres.css'

const bgColors = ['var(--accent)','var(--success)','var(--info)','var(--warning)','var(--danger)','var(--cyan)','var(--accent-hover)','var(--warning)']

const initialMatieres = [
  { id: 1, nom: 'Mathématiques', code: 'MATH', coef: 4, color: 'var(--accent)' },
  { id: 2, nom: 'Français', code: 'FR', coef: 4, color: 'var(--info)' },
  { id: 3, nom: 'Anglais', code: 'ANG', coef: 3, color: 'var(--success)' },
  { id: 4, nom: 'Histoire-Géographie', code: 'HG', coef: 3, color: 'var(--warning)' },
  { id: 5, nom: 'Sciences Physiques', code: 'PC', coef: 3, color: 'var(--danger)' },
  { id: 6, nom: 'SVT', code: 'SVT', coef: 2, color: 'var(--accent)' },
  { id: 7, nom: 'EPS', code: 'EPS', coef: 2, color: 'var(--cyan)' },
  { id: 8, nom: 'Arts Plastiques', code: 'ART', coef: 1, color: 'var(--accent-hover)' },
]

export default function Matieres() {
  const [matieres, setMatieres] = useState(initialMatieres)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ nom: '', code: '', coef: 1 })

  const handleAdd = () => {
    const color = bgColors[matieres.length % bgColors.length]
    setMatieres(prev => [...prev, { id: Date.now(), ...form, coef: Number(form.coef), color }])
    setForm({ nom: '', code: '', coef: 1 })
    setShowModal(false)
  }

  const handleDelete = id => {
    if (confirm('Supprimer cette matière ?')) setMatieres(prev => prev.filter(m => m.id !== id))
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion des matières</h1>
          <p className="page-subtitle">Gérer les matières enseignées dans l'école</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Nouvelle matière
        </button>
      </div>

      <div className="card">
        <div className="matieres-grid">
          {matieres.map(m => (
            <div key={m.id} className="matiere-row">
              <div className="matiere-icon" style={{ background: m.color }}>
                📖
              </div>
              <div className="matiere-info">
                <p className="matiere-nom">{m.nom}</p>
                <p className="matiere-meta">Code: {m.code} &nbsp;&nbsp; Coef: {m.coef}</p>
              </div>
              <div className="matiere-actions">
                <button className="action-btn">✏️</button>
                <button className="action-btn danger" onClick={() => handleDelete(m.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <Modal
          title="Nouvelle matière"
          onClose={() => setShowModal(false)}
          footer={
            <>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="btn-primary" onClick={handleAdd}>Créer</button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label">Nom de la matière</label>
            <input className="form-input" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Mathématiques" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Code</label>
              <input className="form-input" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="MATH" />
            </div>
            <div className="form-group">
              <label className="form-label">Coefficient</label>
              <input className="form-input" type="number" min="1" max="10" value={form.coef} onChange={e => setForm({ ...form, coef: e.target.value })} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
