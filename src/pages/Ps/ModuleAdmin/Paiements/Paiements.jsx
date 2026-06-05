import { useState, useEffect } from 'react'
import { getPaiements } from '../../../../api/paiement.api'
import './Paiements.css'

export default function Paiements() {
  const [paiements, setPaiements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    etat: 'tous',
    periode: 'tous'
  })

  useEffect(() => {
    loadPaiements()
  }, [])

  const loadPaiements = async () => {
    try {
      setLoading(true)
      const data = await getPaiements()
      setPaiements(data)
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement des paiements')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getEtatBadge = (etat) => {
    const styles = {
      'payé': { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', label: '✓ Payé' },
      'en attente': { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', label: '⏳ En attente' },
      'partiel': { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', label: '◐ Partiel' },
      'impayé': { bg: 'rgba(124,45,18,0.1)', color: '#dc2626', label: '✕ Impayé' },
    }
    return styles[etat] || styles['en attente']
  }

  const formatMontant = (montant) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(montant)
  }

  if (loading) {
    return (
      <div className="paiements-container">
        <header className="paiements-header">
          <h1>Paiements</h1>
        </header>
        <div className="loading-message">Chargement des paiements...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="paiements-container">
        <header className="paiements-header">
          <h1>Paiements</h1>
        </header>
        <div className="error-message">{error}</div>
      </div>
    )
  }

  return (
    <div className="paiements-container">
      <header className="paiements-header">
        <h1>Paiements</h1>
        <button className="btn-nouveau-paiement">+ Nouveau paiement</button>
      </header>

      <div className="paiements-filters">
        <select 
          value={filters.etat} 
          onChange={(e) => setFilters({...filters, etat: e.target.value})}
          className="filter-select"
        >
          <option value="tous">Tous les états</option>
          <option value="payé">Payé</option>
          <option value="en attente">En attente</option>
          <option value="partiel">Partiel</option>
          <option value="impayé">Impayé</option>
        </select>

        <select 
          value={filters.periode} 
          onChange={(e) => setFilters({...filters, periode: e.target.value})}
          className="filter-select"
        >
          <option value="tous">Toutes les périodes</option>
          <option value="30j">Derniers 30 jours</option>
          <option value="90j">Derniers 90 jours</option>
          <option value="annee">Cette année</option>
        </select>
      </div>

      <div className="paiements-stats">
        <div className="stat-card">
          <span className="stat-label">Total à percevoir</span>
          <span className="stat-value">{formatMontant(paiements.reduce((acc, p) => acc + (p.montant || 0), 0))}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Payés</span>
          <span className="stat-value">{paiements.filter(p => p.etat === 'payé').length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">En attente</span>
          <span className="stat-value">{paiements.filter(p => p.etat === 'en attente').length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Impayés</span>
          <span className="stat-value">{paiements.filter(p => p.etat === 'impayé').length}</span>
        </div>
      </div>

      <div className="paiements-table">
        <table>
          <thead>
            <tr>
              <th>Référence</th>
              <th>Élève</th>
              <th>Montant</th>
              <th>État</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paiements.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">Aucun paiement trouvé</td>
              </tr>
            ) : (
              paiements.map(paiement => {
                const badge = getEtatBadge(paiement.etat)
                return (
                  <tr key={paiement.id}>
                    <td className="ref">{paiement.reference || 'N/A'}</td>
                    <td>{paiement.eleve || 'N/A'}</td>
                    <td className="montant">{formatMontant(paiement.montant || 0)}</td>
                    <td>
                      <span 
                        className="badge" 
                        style={{ background: badge.bg, color: badge.color }}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="date">{paiement.date || 'N/A'}</td>
                    <td className="actions">
                      <button className="action-btn" title="Voir détails">👁️</button>
                      <button className="action-btn" title="Éditer">✏️</button>
                      <button className="action-btn" title="Imprimer">🖨️</button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
