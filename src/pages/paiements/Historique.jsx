import { useMemo, useState } from 'react'
import Module36Layout from './Module36Layout'
import {
  filterPaymentHistory,
  formatFcfa,
  module36HistoryPeriods,
  module36HistoryTypeFilters,
  module36PaymentStatusColors,
  module36PaymentStatusRings,
  module36StudentPaymentHistory,
} from './module36Data'

const DEFAULT_STUDENT = 'Mariama Bah'

export default function Historique() {
  const [eleve, setEleve] = useState(DEFAULT_STUDENT)
  const [periode, setPeriode] = useState(module36HistoryPeriods[0])
  const [typeFiltre, setTypeFiltre] = useState(module36HistoryTypeFilters[0])

  const filtered = useMemo(() => {
    const payments = module36StudentPaymentHistory[eleve] || []
    return filterPaymentHistory(payments, typeFiltre)
  }, [eleve, typeFiltre])

  const total = useMemo(
    () => filtered.filter(payment => payment.statut === 'Payé').reduce((sum, payment) => sum + payment.montant, 0),
    [filtered],
  )

  return (
    <Module36Layout>
      <div className="module36-greeting">
        <h1>Historique des paiements</h1>
        <p>Consultez l&apos;historique complet des paiements par élève.</p>
      </div>

      <div className="module36-filters-card">
        <div className="module36-filters-grid">
          <div>
            <label className="module36-filter-label" htmlFor="historique-eleve">Élève</label>
            <div className="module36-select-wrap">
              <select
                id="historique-eleve"
                className="module36-select"
                value={eleve}
                onChange={event => setEleve(event.target.value)}
              >
                {Object.keys(module36StudentPaymentHistory).map(student => (
                  <option key={student} value={student}>{student}</option>
                ))}
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
          <div>
            <label className="module36-filter-label" htmlFor="historique-periode">Période</label>
            <div className="module36-select-wrap">
              <select
                id="historique-periode"
                className="module36-select"
                value={periode}
                onChange={event => setPeriode(event.target.value)}
              >
                {module36HistoryPeriods.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
          <div>
            <label className="module36-filter-label" htmlFor="historique-type">Type</label>
            <div className="module36-select-wrap">
              <select
                id="historique-type"
                className="module36-select"
                value={typeFiltre}
                onChange={event => setTypeFiltre(event.target.value)}
              >
                {module36HistoryTypeFilters.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
        </div>
      </div>

      <div className="module36-timeline-card">
        <div className="module36-timeline-header">
          <span className="module36-timeline-title">{eleve} — Historique</span>
          <div>
            <div className="module36-timeline-total-label">Total payé</div>
            <div className="module36-timeline-total-value">{formatFcfa(total)}</div>
          </div>
        </div>

        <div className="module36-timeline">
          <div className="module36-timeline-line" />
          <div className="module36-timeline-list">
            {filtered.map(payment => (
              <div key={`${payment.facture}-${payment.date}`} className="module36-timeline-entry">
                <div
                  className="module36-timeline-dot"
                  style={{
                    background: module36PaymentStatusColors[payment.statut],
                    boxShadow: `0 0 0 3px #fff, 0 0 0 5px ${module36PaymentStatusRings[payment.statut]}`,
                  }}
                >
                  ✓
                </div>
                <div className="module36-timeline-item">
                  <div>
                    <div className="module36-timeline-type">{payment.type}</div>
                    <div className="module36-timeline-meta">
                      <span>📅</span>
                      {payment.date} · {payment.mode}
                    </div>
                    <div className="module36-timeline-invoice">{payment.facture}</div>
                  </div>
                  <div className="module36-timeline-right">
                    <div className="module36-timeline-amount">{formatFcfa(payment.montant)}</div>
                    <div
                      className="module36-timeline-status"
                      style={{ color: module36PaymentStatusColors[payment.statut] }}
                    >
                      {payment.statut}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="module36-timeline-empty">Aucun paiement trouvé pour ce filtre.</div>
            )}
          </div>
        </div>
      </div>
    </Module36Layout>
  )
}
