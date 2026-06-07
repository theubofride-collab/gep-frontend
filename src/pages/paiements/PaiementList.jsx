import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module36Layout from '../../../../components/Ps/Module_3.6/Module36Layout'
import {
  filterPaymentsList,
  formatFcfa,
  module36ListFilterLabels,
  module36ListStatusStyles,
  module36PaymentsList,
  module36PaymentsTotalCount,
} from '../../../../components/Ps/Module_3.6/module36Data'

const PAGE_COUNT = 4

export default function Liste() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(
    () => filterPaymentsList(module36PaymentsList, search),
    [search],
  )

  function handleSearchChange(value) {
    setSearch(value)
    setCurrentPage(1)
  }

  return (
    <Module36Layout>
      <div className="module36-page-header">
        <div className="module36-greeting" style={{ marginBottom: 0 }}>
          <h1>Paiements</h1>
          <p>Gérez et suivez tous les paiements de l&apos;école.</p>
        </div>
        <button type="button" className="module36-add-btn" onClick={() => navigate('/paiements/create')}>
          <span className="module36-add-btn-icon">+</span>
          Ajouter un paiement
        </button>
      </div>

      <div className="module36-list-filters">
        <div className="module36-list-filters-search">
          <span className="module36-search-icon">🔍</span>
          <input
            className="module36-search-input"
            value={search}
            onChange={event => handleSearchChange(event.target.value)}
            placeholder="Rechercher par élève, facture..."
          />
        </div>
        {module36ListFilterLabels.map(label => (
          <select key={label} className="module36-filter-select" defaultValue={label}>
            <option>{label}</option>
          </select>
        ))}
        <button type="button" className="module36-filter-btn">⚙ Filtrer</button>
      </div>

      <div className="module36-table-card module36-list-table-wrap">
        <table className="module36-table">
          <thead>
            <tr>
              {['N° Facture', 'Élève', 'Classe', 'Type', 'Montant', 'Date', 'Statut', 'Actions'].map(column => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => {
              const status = module36ListStatusStyles[row.statut]

              return (
                <tr key={row.facture} className="list-row">
                  <td className="module36-table-invoice">{row.facture}</td>
                  <td className="module36-table-name">{row.eleve}</td>
                  <td>
                    <span
                      className="module36-class-badge"
                      style={{ background: `${row.classeColor}18`, color: row.classeColor }}
                    >
                      {row.classe}
                    </span>
                  </td>
                  <td className="module36-table-type">{row.type}</td>
                  <td className="module36-table-montant">{formatFcfa(row.montant)}</td>
                  <td className="module36-table-date">{row.date}</td>
                  <td>
                    <span
                      className="module36-list-status-badge"
                      style={{ background: status.bg, color: status.color }}
                    >
                      ● {row.statut}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="module36-invoice-link-btn"
                      onClick={() => navigate('/paiements/factures')}
                    >
                      📄 Facture
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="module36-pagination">
          <span className="module36-pagination-info">
            Affichage de 1 à {filtered.length} sur {module36PaymentsTotalCount} paiements
          </span>
          <div className="module36-pagination-controls">
            <button type="button" className="module36-page-btn nav">‹</button>
            {Array.from({ length: PAGE_COUNT }, (_, index) => index + 1).map(page => (
              <button
                key={page}
                type="button"
                className={`module36-page-btn${currentPage === page ? ' active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button type="button" className="module36-page-btn nav">›</button>
          </div>
        </div>
      </div>
    </Module36Layout>
  )
}
