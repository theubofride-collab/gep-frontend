import { useState } from 'react'
import Modal from '../../../../components/Ps/ModuleAdmin/Modal/Modal'
import './TypesPaiement.css'

const periodColors = { 'Trimestriel': 'badge-purple', 'Annuel': 'badge-blue', 'Mensuel': 'badge-cyan', 'Unique': 'badge-amber' }
const iconColors = ['var(--accent)','var(--success)','var(--cyan)','var(--info)','var(--warning)']

const initialTypes = [
  { id: 1, nom: 'Scolarité', periode: 'Trimestriel', desc: 'Frais de scolarité trimestriel', montant: 50000 },
  { id: 2, nom: 'Inscription', periode: 'Annuel', desc: "Frais d'inscription annuelle", montant: 25000 },
  { id: 3, nom: 'Cantine', periode: 'Mensuel', desc: 'Frais de cantine mensuel', montant: 15000 },
  { id: 4, nom: 'Transport', periode: 'Mensuel', desc: 'Frais de transport scolaire', montant: 10000 },
  { id: 5, nom: 'Activités', periode: 'Unique', desc: 'Frais d\'activités extrascolaires', montant: 5000 },
]

export default function TypesPaiement() {
  const [types, setTypes] = useState(initialTypes)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ nom: '', periode: 'Mensuel', desc: '', montant: '' })

  const handleAdd = () => {
    setTypes(prev => [...prev, { id: Date.now(), ...form, montant: Number(form.montant) }])
    setForm({ nom: '', periode: 'Mensuel', desc: '', montant: '' })
    setShowModal(false)
  }

  const handleDelete = id => {
    if (confirm('Supprimer ce type ?')) setTypes(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Types de paiement</h1>
          <p className="page-subtitle">Gérer les types de paiement de l'école</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Nouveau type
        </button>
      </div>

      <div className="card">
        {types.map((t, i) => (
          <div key={t.id} className="paiement-row">
            <div className="paiement-icon" style={{ background: iconColors[i % iconColors.length] }}>
              💳
            </div>
            <div className="paiement-info">
              <div className="paiement-nom-row">
                <span className="paiement-nom">{t.nom}</span>
                <span className={`badge ${periodColors[t.periode] || 'badge-gray'}`}>{t.periode}</span>
              </div>
              <p className="paiement-desc">{t.desc}</p>
            </div>
            <div className="paiement-montant">
              {t.montant.toLocaleString('fr-FR')} FCFA
            </div>
            <div className="paiement-actions">
              <button className="action-btn">✏️</button>
              <button className="action-btn danger" onClick={() => handleDelete(t.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal
          title="Nouveau type de paiement"
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
              <label className="form-label">Nom</label>
              <input className="form-input" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Scolarité" />
            </div>
            <div className="form-group">
              <label className="form-label">Période</label>
              <select className="form-input" value={form.periode} onChange={e => setForm({ ...form, periode: e.target.value })}>
                {['Mensuel','Trimestriel','Annuel','Unique'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input className="form-input" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Description..." />
          </div>
          <div className="form-group">
            <label className="form-label">Montant (FCFA)</label>
            <input className="form-input" type="number" value={form.montant} onChange={e => setForm({ ...form, montant: e.target.value })} placeholder="50000" />
          </div>
        </Modal>
      )}
    </div>
  )
}
