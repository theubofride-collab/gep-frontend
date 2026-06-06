import Module36Layout from '../../../../components/Ps/Module_3.6/Module36Layout'
import {
  formatFcfa,
  module36Invoice,
  module36InvoiceActions,
} from '../../../../components/Ps/Module_3.6/module36Data'

export default function Factures() {
  const sousTotal = module36Invoice.lines.reduce((sum, line) => sum + line.qte * line.prix, 0)

  return (
    <Module36Layout>
      <div className="module36-page-header">
        <div className="module36-greeting" style={{ marginBottom: 0 }}>
          <h1>Facture</h1>
          <p>Aperçu de la facture avant impression ou envoi.</p>
        </div>
        <div className="module36-page-actions">
          {module36InvoiceActions.map(action => (
            <button
              key={action.label}
              type="button"
              className={`module36-action-btn ${action.variant}`}
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
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
                  <div className="module36-invoice-school-meta">{module36Invoice.school.contact}</div>
                </div>
              </div>
              <div className="module36-invoice-ref">
                <div className="module36-invoice-badge">Facture</div>
                <div className="module36-invoice-number">{module36Invoice.number}</div>
                <div className="module36-invoice-date">Émise le {module36Invoice.issuedAt}</div>
              </div>
            </div>

            <div className="module36-invoice-meta-grid">
              <div>
                <div className="module36-invoice-section-label">Facturé à</div>
                <div className="module36-invoice-client-name">{module36Invoice.billedTo.name}</div>
                <div className="module36-invoice-client-info">
                  Classe : {module36Invoice.billedTo.class}
                  <br />
                  Tuteur : {module36Invoice.billedTo.guardian}
                  <br />
                  {module36Invoice.billedTo.phone}
                </div>
              </div>
              <div>
                <div className="module36-invoice-section-label">Détails</div>
                <div className="module36-invoice-details">
                  <span className="module36-invoice-detail-label">Année scolaire :</span>{' '}
                  <strong className="module36-invoice-detail-value">{module36Invoice.details.schoolYear}</strong>
                  <br />
                  <span className="module36-invoice-detail-label">Échéance :</span>{' '}
                  <strong className="module36-invoice-detail-value">{module36Invoice.details.dueDate}</strong>
                  <br />
                  <span className="module36-invoice-detail-label">Mode de paiement :</span>{' '}
                  <strong className="module36-invoice-detail-value">{module36Invoice.details.paymentMode}</strong>
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
                <div className="module36-invoice-total-row">
                  <span>Sous-total</span>
                  <span>{formatFcfa(sousTotal)}</span>
                </div>
                <div className="module36-invoice-total-row muted">
                  <span>Réduction</span>
                  <span>—</span>
                </div>
                <div className="module36-invoice-grand-total">
                  <span>Total à payer</span>
                  <span>{formatFcfa(sousTotal)}</span>
                </div>
              </div>
            </div>

            <div className="module36-invoice-footer">{module36Invoice.footer}</div>
          </div>
        </div>
      </div>
    </Module36Layout>
  )
}
