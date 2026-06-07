import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module36Layout from './Module36Layout'
import {
  module36PaymentModes,
  module36PaymentTypes,
  module36Students,
} from './module36Data'

const INITIAL_FORM = {
  eleve: '',
  type: '',
  montant: '75 000',
  date: '2026-01-05',
  reference: '',
  mode: 'mobile',
}

export default function Create() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)

  const modeLabel = module36PaymentModes.find(item => item.id === form.mode)?.label || '—'
  const total = form.montant && form.eleve ? `${form.montant} FCFA` : '0 FCFA'

  function updateField(field, value) {
    setForm(previous => ({ ...previous, [field]: value }))
  }

  return (
    <Module36Layout>
      <div className="module36-greeting">
        <h1>Enregistrer un paiement</h1>
        <p>Renseignez les informations du paiement à enregistrer.</p>
      </div>

      <div className="module36-form-grid">
        <div className="module36-form-card">
          <h2 className="module36-form-title">Informations du paiement</h2>

          <div className="module36-form-group">
            <label className="module36-label" htmlFor="eleve">Élève</label>
            <div className="module36-select-wrap">
              <select
                id="eleve"
                className="module36-select"
                value={form.eleve}
                onChange={event => updateField('eleve', event.target.value)}
              >
                <option value="">Rechercher un élève...</option>
                {module36Students.map(student => (
                  <option key={student} value={student}>{student}</option>
                ))}
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>

          <div className="module36-form-row">
            <div>
              <label className="module36-label" htmlFor="type">Type de paiement</label>
              <div className="module36-select-wrap">
                <select
                  id="type"
                  className="module36-select"
                  value={form.type}
                  onChange={event => updateField('type', event.target.value)}
                >
                  <option value="">Sélectionner...</option>
                  {module36PaymentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <span className="module36-select-arrow">▾</span>
              </div>
            </div>
            <div>
              <label className="module36-label" htmlFor="montant">Montant (FCFA)</label>
              <input
                id="montant"
                type="text"
                className="module36-input"
                value={form.montant}
                onChange={event => updateField('montant', event.target.value)}
              />
            </div>
          </div>

          <div className="module36-form-row tight">
            <div>
              <label className="module36-label" htmlFor="date">Date de paiement</label>
              <input
                id="date"
                type="date"
                className="module36-input"
                value={form.date}
                onChange={event => updateField('date', event.target.value)}
              />
            </div>
            <div>
              <label className="module36-label" htmlFor="reference">Référence (optionnel)</label>
              <input
                id="reference"
                type="text"
                className="module36-input"
                value={form.reference}
                onChange={event => updateField('reference', event.target.value)}
                placeholder="REF-XXXX"
              />
            </div>
          </div>

          <div>
            <span className="module36-label">Mode de paiement</span>
            <div className="module36-mode-grid">
              {module36PaymentModes.map(mode => (
                <button
                  key={mode.id}
                  type="button"
                  className={`module36-mode-btn${form.mode === mode.id ? ' active' : ''}`}
                  onClick={() => updateField('mode', mode.id)}
                >
                  <span className="module36-mode-icon">{mode.icon}</span>
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="module36-summary-card">
          <h2 className="module36-form-title">Récapitulatif</h2>

          <div className="module36-summary-rows">
            {[
              { label: 'Élève', value: form.eleve || '—' },
              { label: 'Type', value: form.type || '—' },
              { label: 'Mode', value: modeLabel },
            ].map(row => (
              <div key={row.label} className="module36-summary-row">
                <span className="module36-summary-label">{row.label}</span>
                <span className="module36-summary-value">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="module36-summary-total">
            <span className="module36-summary-total-label">Total</span>
            <span className="module36-summary-total-value">{total}</span>
          </div>

          <button type="button" className="module36-btn-primary">Valider le paiement</button>
          <button type="button" className="module36-btn-secondary" onClick={() => navigate('/paiements')}>
            Annuler
          </button>
        </div>
      </div>
    </Module36Layout>
  )
}
