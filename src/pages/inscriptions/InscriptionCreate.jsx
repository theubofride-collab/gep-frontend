import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module34Layout from './Module34Layout'
import { buildInscriptionNumber, module34SectionClasses, module34SchoolYears, module34Sections } from './module34Data'

const INITIAL_FORM = {
  studentName: 'Emile Fouda',
  studentId: 'ELV10047',
  section: 'Francophone',
  className: 'CM1',
  year: '2025–2026',
  originSchool: 'École publique du centre',
  observations: 'Élève redoublant de CM1.',
}

export default function Create() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)

  const classOptions = useMemo(() => module34SectionClasses[form.section] ?? [], [form.section])
  const inscriptionPreview = useMemo(() => buildInscriptionNumber(7), [])

  function updateField(field, value) {
    setForm(previous => ({ ...previous, [field]: value }))
  }

  return (
    <Module34Layout breadcrumb={['Inscriptions', 'Nouvelle inscription']} backTo="/inscriptions">
      <div className="module34-page-header">
        <div>
          <h1 className="module34-page-title">Nouvelle inscription</h1>
          <p className="module34-page-subtitle">Associez un élève à une classe, une section et une année scolaire.</p>
        </div>
      </div>

      <div className="module34-progress-steps">
        <div className="module34-step active"><div className="module34-step-num">1</div><div>Élève</div></div>
        <div className="module34-step-line active" />
        <div className="module34-step pending"><div className="module34-step-num">2</div><div>Section</div></div>
        <div className="module34-step-line" />
        <div className="module34-step pending"><div className="module34-step-num">3</div><div>Classe</div></div>
        <div className="module34-step-line" />
        <div className="module34-step pending"><div className="module34-step-num">4</div><div>Confirmation</div></div>
      </div>

      <div className="module34-grid-2">
        <div>
          <div className="module34-card" style={{ marginBottom: 16 }}>
            <div className="module34-card-header"><div className="module34-card-icon ci-v">👦</div><div><div className="module34-card-title">Sélection de l'élève</div><div className="module34-card-subtitle">Données d’identification de base</div></div></div>
            <div className="module34-card-body">
              <div className="module34-form-row cols-2">
                <div className="module34-form-group"><label className="module34-label">Élève</label><input className="module34-input" value={form.studentName} onChange={event => updateField('studentName', event.target.value)} /></div>
                <div className="module34-form-group"><label className="module34-label">Matricule élève</label><input className="module34-input" value={form.studentId} onChange={event => updateField('studentId', event.target.value)} /></div>
              </div>
              <div className="module34-form-row cols-2">
                <div className="module34-form-group">
                  <label className="module34-label">Section</label>
                  <select className="module34-select" value={form.section} onChange={event => { const nextSection = event.target.value; updateField('section', nextSection); updateField('className', module34SectionClasses[nextSection]?.[0] ?? form.className) }}>
                    {module34Sections.filter(item => item !== 'Tous').map(item => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
                <div className="module34-form-group">
                  <label className="module34-label">Classe</label>
                  <select className="module34-select" value={form.className} onChange={event => updateField('className', event.target.value)}>
                    {classOptions.map(className => <option key={className} value={className}>{className}</option>)}
                  </select>
                </div>
              </div>
              <div className="module34-form-row cols-2">
                <div className="module34-form-group"><label className="module34-label">Année scolaire</label><select className="module34-select" value={form.year} onChange={event => updateField('year', event.target.value)}>{module34SchoolYears.map(schoolYear => <option key={schoolYear} value={schoolYear}>{schoolYear}</option>)}</select></div>
                <div className="module34-form-group"><label className="module34-label">École d’origine</label><input className="module34-input" value={form.originSchool} onChange={event => updateField('originSchool', event.target.value)} /></div>
              </div>
              <div className="module34-form-group"><label className="module34-label">Observations</label><textarea className="module34-textarea" rows="4" value={form.observations} onChange={event => updateField('observations', event.target.value)} /></div>
            </div>
          </div>

          <div className="module34-footer">
            <button className="module34-button-secondary" type="button" onClick={() => navigate('/inscriptions')}>Annuler</button>
            <button className="module34-button" type="button" onClick={() => navigate('/inscriptions/show')}>Enregistrer l’inscription</button>
          </div>
        </div>

        <aside className="module34-summary-card">
          <div className="module34-summary-hero"><div className="module34-summary-avatar">EF</div></div>
          <div className="module34-summary-body">
            <div className="module34-summary-name">{form.studentName || 'Nom non saisi'}</div>
            <div className="module34-summary-id">{form.studentId || 'Matricule'}</div>
            <div className="module34-summary-divider" />
            <div className="module34-summary-row"><span className="module34-summary-label">Inscription</span><span className="module34-summary-value">{inscriptionPreview}</span></div>
            <div className="module34-summary-row"><span className="module34-summary-label">Section</span><span className="module34-summary-value">{form.section}</span></div>
            <div className="module34-summary-row"><span className="module34-summary-label">Classe</span><span className="module34-summary-value">{form.className}</span></div>
            <div className="module34-summary-row"><span className="module34-summary-label">Année</span><span className="module34-summary-value">{form.year}</span></div>
          </div>
        </aside>
      </div>
    </Module34Layout>
  )
}
