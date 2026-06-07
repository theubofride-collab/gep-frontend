import { useMemo, useState } from 'react'
import Module36Layout from '../Module36Layout'
import {
  module36ClassStudents,
  module36ExportClasses,
  module36ListStatusStyles,
  module36PrintActions,
} from '../module36Data'

const DEFAULT_CLASS = 'CM2-A'

export default function ListeClasse() {
  const [classe, setClasse] = useState(DEFAULT_CLASS)

  const students = useMemo(
    () => module36ClassStudents[classe] || [],
    [classe],
  )

  return (
    <Module36Layout>
      <div className="module36-page-header">
        <div className="module36-greeting" style={{ marginBottom: 0 }}>
          <h1>Liste de classe</h1>
          <p>Générez et imprimez la liste officielle des élèves par classe.</p>
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
        <div className="module36-filters-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div>
            <label className="module36-filter-label" htmlFor="classe-select">Classe</label>
            <div className="module36-select-wrap">
              <select
                id="classe-select"
                className="module36-select"
                value={classe}
                onChange={event => setClasse(event.target.value)}
              >
                {module36ExportClasses.map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
          <div>
            <label className="module36-filter-label" htmlFor="annee-select">Année scolaire</label>
            <div className="module36-select-wrap">
              <select id="annee-select" className="module36-select" defaultValue="2024-2025">
                <option value="2024-2025">2024–2025</option>
                <option value="2025-2026">2025–2026</option>
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
          <div>
            <label className="module36-filter-label" htmlFor="format-select">Format</label>
            <div className="module36-select-wrap">
              <select id="format-select" className="module36-select" defaultValue="pdf">
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
        </div>
      </div>

      <div className="module36-export-preview">
        <div className="module36-export-preview-header">
          <div>
            <div className="module36-export-school">École Primaire Les Lauriers</div>
            <div className="module36-export-meta">Liste de classe · {classe} · Année 2024–2025</div>
            <div className="module36-export-meta">{students.length} élèves inscrits</div>
          </div>
          <span className="module36-export-badge">Liste officielle</span>
        </div>

        <div className="module36-table-card" style={{ boxShadow: 'none' }}>
          <table className="module36-table">
            <thead>
              <tr>
                {['N°', 'Matricule', 'Nom complet', 'Genre', 'Date de naissance', 'Statut paiement'].map(col => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.length === 0 && (
                <tr>
                  <td colSpan={6} className="module36-timeline-empty">Aucun élève pour cette classe.</td>
                </tr>
              )}
              {students.map((student, index) => {
                const status = module36ListStatusStyles[student.statut]
                return (
                  <tr key={student.matricule} className="list-row">
                    <td className="module36-table-date">{index + 1}</td>
                    <td className="module36-table-invoice">{student.matricule}</td>
                    <td className="module36-table-name">{student.nom}</td>
                    <td className="module36-table-type">{student.genre}</td>
                    <td className="module36-table-date">{student.naissance}</td>
                    <td>
                      <span
                        className="module36-list-status-badge"
                        style={{ background: status.bg, color: status.color }}
                      >
                        ● {student.statut}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Module36Layout>
  )
}
