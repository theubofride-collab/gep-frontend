import { useState } from 'react'
import Module36Layout from '../../../../../components/Ps/Module_3.6/Module36Layout'
import {
  module36ExcelExports,
  module36HistoryPeriods,
} from '../../../../../components/Ps/Module_3.6/module36Data'

export default function ExportExcel() {
  const [periode, setPeriode] = useState(module36HistoryPeriods[0])
  const [downloaded, setDownloaded] = useState(null)

  function handleDownload(exportId) {
    setDownloaded(exportId)
    setTimeout(() => setDownloaded(null), 2000)
  }

  return (
    <Module36Layout>
      <div className="module36-page-header">
        <div className="module36-greeting" style={{ marginBottom: 0 }}>
          <h1>Export Excel</h1>
          <p>Téléchargez les données de l&apos;école au format tableur.</p>
        </div>
        <button type="button" className="module36-action-btn filled">
          ⬇ Tout exporter
        </button>
      </div>

      <div className="module36-filters-card">
        <div className="module36-filters-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div>
            <label className="module36-filter-label" htmlFor="excel-periode">Période</label>
            <div className="module36-select-wrap">
              <select
                id="excel-periode"
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
            <label className="module36-filter-label" htmlFor="excel-format">Format</label>
            <div className="module36-select-wrap">
              <select id="excel-format" className="module36-select" defaultValue="xlsx">
                <option value="xlsx">Excel (.xlsx)</option>
                <option value="csv">CSV (.csv)</option>
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
          <div>
            <label className="module36-filter-label" htmlFor="excel-lang">Langue</label>
            <div className="module36-select-wrap">
              <select id="excel-lang" className="module36-select" defaultValue="fr">
                <option value="fr">Français</option>
                <option value="en">Anglais</option>
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
        </div>
      </div>

      <div className="module36-export-cards">
        {module36ExcelExports.map(item => (
          <div key={item.id} className="module36-export-card">
            <div className="module36-export-card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="module36-export-card-meta">{item.rows} lignes · {periode}</span>
            <button
              type="button"
              className="module36-btn-primary"
              style={{ marginBottom: 0 }}
              onClick={() => handleDownload(item.id)}
            >
              {downloaded === item.id ? '✓ Téléchargé' : `⬇ Exporter .${item.format}`}
            </button>
          </div>
        ))}
      </div>
    </Module36Layout>
  )
}
