import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module34Layout from '../../../../components/Ps/Module_3.4/Module34Layout'
import { formatDate, getInscriptionStatusClass, getInscriptionStatusLabel, module34Inscriptions, module34SchoolYears, module34Sections } from '../../../../components/Ps/Module_3.4/module34Data'

function getStats(rows) {
  return {
    total: rows.length,
    active: rows.filter(row => row.status === 'active').length,
    cloturee: rows.filter(row => row.status === 'cloturee').length,
    transfert: rows.filter(row => row.status === 'transfert').length,
  }
}

export default function Inscriptions() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [section, setSection] = useState('Tous')
  const [year, setYear] = useState('2025–2026')
  const [sortMode, setSortMode] = useState('recent-desc')

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return [...module34Inscriptions]
      .filter(row => {
        const sectionOk = section === 'Tous' || row.section === section
        const yearOk = row.year === year
        const searchOk =
          !normalized ||
          row.fullName.toLowerCase().includes(normalized) ||
          row.id.toLowerCase().includes(normalized) ||
          row.studentId.toLowerCase().includes(normalized)

        return sectionOk && yearOk && searchOk
      })
      .sort((left, right) => {
        if (sortMode === 'name-asc') return left.fullName.localeCompare(right.fullName)
        if (sortMode === 'name-desc') return right.fullName.localeCompare(left.fullName)
        if (sortMode === 'date-asc') return left.date.getTime() - right.date.getTime()
        return right.date.getTime() - left.date.getTime()
      })
  }, [query, section, year, sortMode])

  const stats = getStats(filteredRows)

  return (
    <Module34Layout breadcrumb={['Inscriptions']}>
      <div className="module34-page-header">
        <div>
          <h1 className="module34-page-title">Gestion des inscriptions</h1>
          <p className="module34-page-subtitle">Suivi des inscriptions par année scolaire, section et classe, inspiré des exports HTML du module 3.4.</p>
        </div>
        <div className="module34-top-actions">
          <button className="module34-button-secondary" type="button">🖨️ Exporter</button>
          <button className="module34-button" type="button" onClick={() => navigate('/inscriptions/create')}>＋ Nouvelle inscription</button>
        </div>
      </div>

      <div className="module34-table-card">
        <div className="module34-card-body" style={{ paddingBottom: 0 }}>
          <div className="module34-grid-2" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, marginBottom: 18 }}>
            <div className="module34-card" style={{ marginBottom: 0 }}>
              <div className="module34-card-body">
                <div className="module34-page-title" style={{ fontSize: 20 }}>{stats.total}</div>
                <div className="module34-page-subtitle">Total inscriptions</div>
              </div>
            </div>
            <div className="module34-card" style={{ marginBottom: 0 }}>
              <div className="module34-card-body">
                <div className="module34-page-title" style={{ fontSize: 20, color: '#059669' }}>{stats.active}</div>
                <div className="module34-page-subtitle">Actives</div>
              </div>
            </div>
            <div className="module34-card" style={{ marginBottom: 0 }}>
              <div className="module34-card-body">
                <div className="module34-page-title" style={{ fontSize: 20, color: '#d97706' }}>{stats.cloturee}</div>
                <div className="module34-page-subtitle">Clôturées</div>
              </div>
            </div>
            <div className="module34-card" style={{ marginBottom: 0 }}>
              <div className="module34-card-body">
                <div className="module34-page-title" style={{ fontSize: 20, color: '#4c1d95' }}>{stats.transfert}</div>
                <div className="module34-page-subtitle">Transferts</div>
              </div>
            </div>
          </div>
        </div>

        <div className="module34-card-header">
          <div className="module34-search">
            <span className="module34-search-icon">🔍</span>
            <input className="module34-input" value={query} onChange={event => setQuery(event.target.value)} placeholder="Rechercher un élève, matricule ou inscription…" />
          </div>
          <div className="module34-toolbar-right">
            <select className="module34-select" value={section} onChange={event => setSection(event.target.value)}>
              {module34Sections.map(item => <option key={item} value={item}>{item === 'Tous' ? 'Toutes sections' : item}</option>)}
            </select>
            <select className="module34-select" value={year} onChange={event => setYear(event.target.value)}>
              {module34SchoolYears.map(schoolYear => <option key={schoolYear} value={schoolYear}>{schoolYear}</option>)}
            </select>
            <select className="module34-select" value={sortMode} onChange={event => setSortMode(event.target.value)}>
              <option value="recent-desc">Plus récentes</option>
              <option value="date-asc">Plus anciennes</option>
              <option value="name-asc">Nom A → Z</option>
              <option value="name-desc">Nom Z → A</option>
            </select>
          </div>
        </div>

        <div className="module34-table-wrap">
          <table className="module34-table">
            <thead>
              <tr>
                <th>Élève</th>
                <th>Inscription</th>
                <th>Section</th>
                <th>Classe</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(row => (
                <tr key={row.id} onClick={() => navigate('/inscriptions/show')}>
                  <td>
                    <div className="module34-row-cell">
                      <div className="module34-row-avatar">{row.initials}</div>
                      <div>
                        <div className="module34-row-title">{row.fullName}</div>
                        <div className="module34-row-subtitle">{row.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="module34-row-tag primary">{row.id}</span></td>
                  <td><span className="module34-section-tag sec-fr">{row.section}</span></td>
                  <td>{row.className}</td>
                  <td>{formatDate(row.date)}</td>
                  <td><span className={`module34-badge ${getInscriptionStatusClass(row.status)}`}><span className="bdot" />{getInscriptionStatusLabel(row.status)}</span></td>
                  <td onClick={event => event.stopPropagation()}>
                    <div className="module34-action-row">
                      <button className="module34-icon-button" type="button" onClick={() => navigate('/inscriptions/show')}>👁</button>
                      <button className="module34-icon-button" type="button" onClick={() => navigate('/inscriptions/cloturer')}>🏁</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Module34Layout>
  )
}
