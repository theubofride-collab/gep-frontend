import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module36Layout from './Module36Layout'
import {
  formatFcfa,
  getRetardBadge,
  getUnpaidSummary,
  module36UnpaidList,
} from './module36Data'

export default function Impayes() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const summary = useMemo(() => getUnpaidSummary(module36UnpaidList), [])

  const filtered = useMemo(
    () => module36UnpaidList.filter(item => item.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  return (
    <Module36Layout>
      <div className="module36-page-header">
        <div className="module36-greeting" style={{ marginBottom: 0 }}>
          <h1>Impayés</h1>
          <p>Suivi des paiements en retard et relances à effectuer.</p>
        </div>
        <button type="button" className="module36-action-btn outline">
          ✉ Envoyer relances
        </button>
      </div>

      <div className="module36-unpaid-stats">
        <div className="module36-unpaid-stat-highlight">
          <div className="module36-unpaid-stat-icon">⏰</div>
          <div>
            <div className="module36-unpaid-stat-label">Total impayés</div>
            <div className="module36-unpaid-stat-value">{formatFcfa(summary.totalMontant)}</div>
          </div>
        </div>
        <div className="module36-unpaid-stat-card">
          <div className="module36-unpaid-stat-label">Élèves concernés</div>
          <div className="module36-unpaid-stat-value">{summary.totalEleves}</div>
        </div>
        <div className="module36-unpaid-stat-card">
          <div className="module36-unpaid-stat-label">Retard moyen</div>
          <div className="module36-unpaid-stat-value">{summary.retardMoyen} jours</div>
        </div>
      </div>

      <div className="module36-table-card">
        <div className="module36-table-search">
          <div className="module36-table-search-wrap">
            <span className="module36-search-icon">🔍</span>
            <input
              className="module36-search-input"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Rechercher un élève..."
            />
          </div>
        </div>

        <table className="module36-table">
          <thead>
            <tr>
              {['Élève', 'Classe', 'Montant dû', 'Échéance', 'Retard', 'Action'].map(column => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => {
              const badge = getRetardBadge(row.retard)

              return (
                <tr key={row.name}>
                  <td>
                    <div className="module36-table-student">
                      <div className="module36-table-avatar" style={{ background: row.color }}>
                        {row.initials}
                      </div>
                      <span className="module36-table-name">{row.name}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="module36-class-badge"
                      style={{ background: `${row.classeColor}18`, color: row.classeColor }}
                    >
                      {row.classe}
                    </span>
                  </td>
                  <td className="module36-table-amount">{formatFcfa(row.montant)}</td>
                  <td className="module36-table-date">{row.echeance}</td>
                  <td>
                    <span
                      className="module36-retard-badge"
                      style={{ background: badge.bg, color: badge.color }}
                    >
                      {row.retard} jours
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="module36-pay-btn"
                      onClick={() => navigate('/paiements/create')}
                    >
                      💳 Payer maintenant
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Module36Layout>
  )
}
