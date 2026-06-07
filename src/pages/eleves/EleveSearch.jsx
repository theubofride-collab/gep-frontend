import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module33Layout from '../inscriptions/Module33Layout'
import {
  formatSearchDate,
  getStudentStatusClass,
  getStudentStatusLabel,
  module33QuickTags,
  module33RecentSearches,
  module33SearchModes,
  module33Sections,
  module33Students,
} from '../inscriptions/module33Data'

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState('cards')
  const [className, setClassName] = useState('Tous')
  const [section, setSection] = useState('Tous')
  const [year, setYear] = useState('2025–2026')
  const [onlyActive, setOnlyActive] = useState(true)
  const [searchType, setSearchType] = useState('Nom')

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return module33Students.filter(student => {
      const classOk = className === 'Tous' || student.className === className
      const sectionOk = section === 'Tous' || student.section === section
      const yearOk = student.year === year
      const activeOk = !onlyActive || student.status !== 'inactive'
      const searchOk =
        !normalized ||
        student.fullName.toLowerCase().includes(normalized) ||
        student.id.toLowerCase().includes(normalized) ||
        student.tutor.toLowerCase().includes(normalized) ||
        student.className.toLowerCase().includes(normalized)

      return classOk && sectionOk && yearOk && activeOk && searchOk
    })
  }, [className, onlyActive, query, section, year])

  return (
    <Module33Layout breadcrumb={['Élèves', 'Recherche avancée']} backTo="/eleves">
      <div className="module33-page-header">
        <div>
          <h1 className="module33-page-title">Recherche avancée</h1>
          <p className="module33-page-subtitle">Un écran autonome pour retrouver un élève par nom, matricule, classe ou tuteur.</p>
        </div>
      </div>

      <div className="module33-search-layout">
        <aside className="module33-filters-panel">
          <div className="module33-filters-header">
            <div className="module33-filters-title">Filtres</div>
            <div className="module33-filters-subtitle">Affinez la recherche avant d’afficher les résultats.</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              <button className="module33-button" type="button" onClick={() => navigate('/eleves/create')}>＋ Nouvel élève</button>
              <button className="module33-button-secondary" type="button" onClick={() => setQuery('')}>Réinitialiser</button>
            </div>
          </div>

          <div className="module33-filters-body">
            <div className="module33-filter-section">
              <div className="module33-filter-label">
                <span>Type de recherche</span>
              </div>
              <div className="module33-chip-tabs">
                {['Nom', 'Matricule', 'Classe', 'Tuteur'].map(type => (
                  <button key={type} type="button" className={`module33-chip${searchType === type ? ' active' : ''}`} onClick={() => setSearchType(type)}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="module33-filter-section">
              <div className="module33-filter-label">
                <span>Recherche principale</span>
              </div>
              <div className="module33-search" style={{ minWidth: 'auto' }}>
                <span className="module33-search-icon">🔍</span>
                <input className="module33-input" value={query} onChange={event => setQuery(event.target.value)} placeholder={`Rechercher par ${searchType.toLowerCase()}...`} />
              </div>
            </div>

            <div className="module33-filter-section">
              <div className="module33-filter-label">
                <span>Classe</span>
              </div>
              <select className="module33-select" value={className} onChange={event => setClassName(event.target.value)}>
                <option value="Tous">Toutes les classes</option>
                <option value="CP">CP</option>
                <option value="CE1">CE1</option>
                <option value="CE2">CE2</option>
                <option value="CM1">CM1</option>
                <option value="CM2">CM2</option>
              </select>
            </div>

            <div className="module33-filter-section">
              <div className="module33-filter-label">
                <span>Section</span>
              </div>
              <select className="module33-select" value={section} onChange={event => setSection(event.target.value)}>
                {module33Sections.map(item => (
                  <option key={item} value={item}>{item === 'Tous' ? 'Toutes sections' : item}</option>
                ))}
              </select>
            </div>

            <div className="module33-filter-section">
              <div className="module33-filter-label">
                <span>Année scolaire</span>
              </div>
              <select className="module33-select" value={year} onChange={event => setYear(event.target.value)}>
                <option value="2025–2026">2025–2026</option>
                <option value="2024–2025">2024–2025</option>
              </select>
            </div>

            <div className="module33-filter-section">
              <div className="module33-filter-label">
                <span>Visibilité</span>
              </div>
              <div className="module33-toggle-row">
                <div className="module33-toggle-label">Seulement les actifs</div>
                <div className={`module33-toggle${onlyActive ? ' on' : ''}`} onClick={() => setOnlyActive(current => !current)}>
                  <div className="module33-toggle-knob" />
                </div>
              </div>
            </div>

            <div className="module33-filter-section">
              <div className="module33-filter-label">
                <span>Recherches récentes</span>
              </div>
              <div className="module33-chip-tabs">
                {module33RecentSearches.map(item => (
                  <button key={item} className="module33-chip" type="button" onClick={() => setQuery(item)}>{item}</button>
                ))}
              </div>
            </div>

            <div className="module33-filter-section">
              <div className="module33-filter-label">
                <span>Raccourcis</span>
              </div>
              <div className="module33-chip-tabs">
                {module33QuickTags.map(tag => (
                  <span key={tag} className="module33-chip">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="module33-results-panel">
          <div className="module33-results-header">
            <div>
              <div className="module33-results-count">{results.length.toLocaleString('fr-FR')}</div>
              <div className="module33-results-subtitle">Résultat(s) pour {searchType.toLowerCase()}</div>
            </div>
            <div className="module33-results-right">
              <div className="module33-view-toggle">
                {module33SearchModes.map(item => (
                  <button key={item.value} type="button" className={mode === item.value ? 'active' : ''} onClick={() => setMode(item.value)}>
                    {item.label}
                  </button>
                ))}
              </div>
              <button className="module33-button-secondary" type="button">⬇ Export</button>
            </div>
          </div>

          <div className="module33-results-body">
            {results.length === 0 ? (
              <div className="module33-empty-state">
                <div className="module33-empty-icon">🔎</div>
                <div className="module33-empty-title">Aucun élève trouvé</div>
                <div className="module33-empty-subtitle">Ajustez les filtres ou lancez une recherche plus large pour afficher les dossiers correspondants.</div>
                <button className="module33-button" type="button" onClick={() => setQuery('')}>Effacer la recherche</button>
              </div>
            ) : mode === 'cards' ? (
              <div className="module33-result-grid">
                {results.map(student => (
                  <div key={student.id} className="module33-result-card" onClick={() => navigate('/eleves/show')}>
                    <div className="module33-result-top">
                      <div className="module33-result-avatar" style={{ background: `linear-gradient(135deg, ${student.color}, #6d28d9)` }}>{student.initials}</div>
                      <div>
                        <div className="module33-result-name">{student.fullName}</div>
                        <div className="module33-result-matricule">{student.id}</div>
                      </div>
                    </div>
                    <div className="module33-result-meta">
                      <div className="module33-result-row">
                        <span className="module33-result-label">Classe</span>
                        <span className="module33-result-value">{student.className}</span>
                      </div>
                      <div className="module33-result-row">
                        <span className="module33-result-label">Section</span>
                        <span className="module33-result-value">{student.section}</span>
                      </div>
                      <div className="module33-result-row">
                        <span className="module33-result-label">Tuteur</span>
                        <span className="module33-result-value">{student.tutor}</span>
                      </div>
                      <div className="module33-result-row">
                        <span className="module33-result-label">Naissance</span>
                        <span className="module33-result-value">{formatSearchDate(student.birthDate)}</span>
                      </div>
                    </div>
                    <div className="module33-result-footer">
                      <span className={`module33-row-tag ${getStudentStatusClass(student.status)}`}>
                        <span className="bdot" />
                        {getStudentStatusLabel(student.status)}
                      </span>
                      <div className="module33-row-actions">
                        <button className="module33-icon-button" type="button" onClick={event => { event.stopPropagation(); navigate('/eleves/show') }}>👁</button>
                        <button className="module33-icon-button" type="button" onClick={event => { event.stopPropagation(); navigate('/eleves/edit') }}>✏️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="module33-table-wrap" style={{ border: '1.5px solid rgba(109, 40, 217, 0.12)', borderRadius: 14 }}>
                <table className="module33-table">
                  <thead>
                    <tr>
                      <th>Élève</th>
                      <th>Classe</th>
                      <th>Section</th>
                      <th>Tuteur</th>
                      <th>Naissance</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map(student => (
                      <tr key={student.id} onClick={() => navigate('/eleves/show')}>
                        <td>
                          <div className="module33-row-cell">
                            <div className="module33-row-avatar" style={{ background: `linear-gradient(135deg, ${student.color}, #6d28d9)` }}>{student.initials}</div>
                            <div>
                              <div className="module33-row-title">{student.fullName}</div>
                              <div className="module33-row-subtitle">{student.id}</div>
                            </div>
                          </div>
                        </td>
                        <td>{student.className}</td>
                        <td>{student.section}</td>
                        <td>{student.tutor}</td>
                        <td>{formatSearchDate(student.birthDate)}</td>
                        <td><span className={`module33-row-tag ${getStudentStatusClass(student.status)}`}><span className="bdot" />{getStudentStatusLabel(student.status)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </Module33Layout>
  )
}
