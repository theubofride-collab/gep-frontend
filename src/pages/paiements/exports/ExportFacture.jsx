import { useState } from 'react'
import Module36Layout from '../Module36Layout'
import {
  formatFcfa,
  module36Invoice,
  module36PaymentsList,
  module36PrintActions,
} from '../module36Data'

export default function ExportFacture() {
  const [selectedFacture, setSelectedFacture] = useState(module36PaymentsList[0].facture)

  const payment = module36PaymentsList.find(item => item.facture === selectedFacture) || module36PaymentsList[0]

  return (
    <Module36Layout>
      <div className="module36-page-header">
        <div className="module36-greeting" style={{ marginBottom: 0 }}>
          <h1>Impression facture</h1>
          <p>Sélectionnez une facture et générez le document à imprimer.</p>
        </div>
        <div className="module36-page-actions">
          {module36PrintActions.map(action => (
            <button key={action.label} type="button" className={`module36-action-btn ${action.variant}`}>
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <div className="module36-filters-card">
        <div className="module36-filters-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <label className="module36-filter-label" htmlFor="facture-select">N° Facture</label>
            <div className="module36-select-wrap">
              <select
                id="facture-select"
                className="module36-select"
                value={selectedFacture}
                onChange={event => setSelectedFacture(event.target.value)}
              >
                {module36PaymentsList.map(item => (
                  <option key={item.facture} value={item.facture}>
                    {item.facture} — {item.eleve}
                  </option>
                ))}
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
          <div>
            <label className="module36-filter-label" htmlFor="format-facture">Format</label>
            <div className="module36-select-wrap">
              <select id="format-facture" className="module36-select" defaultValue="pdf">
                <option value="pdf">PDF</option>
                <option value="print">Impression directe</option>
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
        </div>
      </div>

      <div className="module36-invoice-wrap">
        <div className="module36-invoice-card">
          <div className="module36-invoice-body">
            <div className="module36-invoice-top">
              <div className="module36-invoice-school">
                <div className="module36-invoice-school-icon">🏫</div>
                <div>
                  <div className="module36-invoice-school-name">{module36Invoice.school.name}</div>
                  <div className="module36-invoice-school-meta">{module36Invoice.school.address}</div>
                </div>
              </div>
              <div className="module36-invoice-ref">
                <div className="module36-invoice-badge">Facture</div>
                <div className="module36-invoice-number">{payment.facture}</div>
                <div className="module36-invoice-date">Émise le {payment.date}</div>
              </div>
            </div>

            <div className="module36-invoice-meta-grid">
              <div>
                <div className="module36-invoice-section-label">Facturé à</div>
                <div className="module36-invoice-client-name">{payment.eleve}</div>
                <div className="module36-invoice-client-info">Classe : {payment.classe}</div>
              </div>
              <div>
                <div className="module36-invoice-section-label">Détails</div>
                <div className="module36-invoice-details">
                  <span className="module36-invoice-detail-label">Type :</span>{' '}
                  <strong className="module36-invoice-detail-value">{payment.type}</strong>
                  <br />
                  <span className="module36-invoice-detail-label">Statut :</span>{' '}
                  <strong className="module36-invoice-detail-value">{payment.statut}</strong>
                </div>
              </div>
            </div>

            <table className="module36-invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qté</th>
                  <th>Prix unitaire</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {module36Invoice.lines.map(line => (
                  <tr key={line.description}>
                    <td>{line.description}</td>
                    <td>{line.qte}</td>
                    <td>{formatFcfa(line.prix)}</td>
                    <td>{formatFcfa(line.qte * line.prix)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="module36-invoice-totals">
              <div className="module36-invoice-totals-box">
                <div className="module36-invoice-grand-total">
                  <span>Total</span>
                  <span>{formatFcfa(payment.montant)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Module36Layout>
  )
}
