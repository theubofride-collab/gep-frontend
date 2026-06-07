import { useMemo, useState } from 'react'
import Module36Layout from '../Module36Layout'
import {
  computeBulletinAverage,
  module36BulletinGrades,
  module36BulletinStudents,
  module36BulletinTrimesters,
  module36ExportClasses,
  module36PrintActions,
  module36StudentProfiles,
} from '../module36Data'

export default function Bulletin() {
  const [eleve, setEleve] = useState(module36BulletinStudents[0])
  const [trimestre, setTrimestre] = useState(module36BulletinTrimesters[1])
  const [classe, setClasse] = useState('CM2-A')

  const grades = useMemo(() => module36BulletinGrades[eleve] || [], [eleve])
  const moyenne = useMemo(() => computeBulletinAverage(grades), [grades])
  const profile = module36StudentProfiles[eleve]

  return (
    <Module36Layout>
      <div className="module36-page-header">
        <div className="module36-greeting" style={{ marginBottom: 0 }}>
          <h1>Bulletin scolaire</h1>
          <p>Consultez et imprimez les bulletins de notes par élève.</p>
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
        <div className="module36-filters-grid">
          <div>
            <label className="module36-filter-label" htmlFor="bulletin-eleve">Élève</label>
            <div className="module36-select-wrap">
              <select
                id="bulletin-eleve"
                className="module36-select"
                value={eleve}
                onChange={event => {
                  setEleve(event.target.value)
                  const nextProfile = module36StudentProfiles[event.target.value]
                  if (nextProfile) setClasse(nextProfile.classe)
                }}
              >
                {module36BulletinStudents.map(student => (
                  <option key={student} value={student}>{student}</option>
                ))}
              </select>
              <span className="module36-select-arrow">▾</span>
            </div>
          </div>
          <div>
            <label className="module36-filter-label" htmlFor="bulletin-classe">Classe</label>
            <div className="module36-select-wrap">
              <select
                id="bulletin-classe"
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
            <label className="module36-filter-label" htmlFor="bulletin-trimestre">Période</label>
            <div className="module36-select-wrap">
              <select
                id="bulletin-trimestre"
                className="module36-select"
                value={trimestre}
                onChange={event => setTrimestre(event.target.value)}
              >
                {module36BulletinTrimesters.map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
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
            <div className="module36-export-meta">Bulletin · {trimestre} · Année 2024–2025</div>
            <div className="module36-export-meta">
              {eleve} · Classe {profile?.classe || classe} · Matricule {profile?.matricule}
            </div>
          </div>
          <span className="module36-export-badge">Bulletin</span>
        </div>

        <table className="module36-invoice-table">
          <thead>
            <tr>
              <th>Matière</th>
              <th>Coef.</th>
              <th>Note /20</th>
              <th>Appréciation</th>
            </tr>
          </thead>
          <tbody>
            {grades.map(grade => (
              <tr key={grade.matiere}>
                <td>{grade.matiere}</td>
                <td style={{ textAlign: 'right' }}>{grade.coef}</td>
                <td style={{ textAlign: 'right', fontWeight: 700 }}>{grade.note}</td>
                <td>{grade.appreciation}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="module36-bulletin-summary">
          <span>Moyenne générale</span>
          <span>{moyenne} / 20</span>
        </div>
      </div>
    </Module36Layout>
  )
}
