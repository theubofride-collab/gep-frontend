import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module33Layout from '../inscriptions/Module33Layout'
import { buildMatricule, module33ClassFilters, module33Profile, module33SchoolYears, module33Sections, module33SectionClasses } from '../inscriptions/module33Data'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  birthDate: '',
  birthPlace: '',
  nationality: 'Camerounaise',
  gender: 'M',
  tutorName: '',
  tutorRole: 'Père',
  tutorPhone: '',
  tutorPhone2: '',
  address: '',
  profession: '',
  className: 'CP',
  section: 'Francophone',
  year: '2025–2026',
  originSchool: '',
  bloodGroup: '',
  observations: '',
}

function getInitials(firstName, lastName) {
  return `${(firstName[0] || 'E').toUpperCase()}${(lastName[0] || 'L').toUpperCase()}`
}

export default function Create() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [photoLabel, setPhotoLabel] = useState('Cliquez pour uploader')

  const classOptions = form.section && form.section !== 'Tous' ? module33SectionClasses[form.section] ?? [] : module33ClassFilters.slice(1)
  const matriculePreview = useMemo(() => buildMatricule(`${form.className}-${form.section}`.length + 8), [form.className, form.section])
  const summaryName = [form.firstName, form.lastName].filter(Boolean).join(' ') || 'Nom non saisi...'
  const summaryInitials = getInitials(form.firstName, form.lastName)
  const summaryGender = form.gender === 'M' ? 'Masculin' : 'Féminin'

  function updateField(field, value) {
    setForm(previous => ({ ...previous, [field]: value }))
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    setPhotoLabel(file ? file.name : 'Cliquez pour uploader')
  }

  return (
    <Module33Layout breadcrumb={['Élèves', 'Nouvel élève']} backTo="/eleves">
      <div className="module33-page-header">
        <div>
          <h1 className="module33-page-title">Ajouter un élève</h1>
          <p className="module33-page-subtitle">Le formulaire reprend l’esprit du HTML de référence, avec les trois sections identité, tuteur et scolarité.</p>
        </div>
      </div>

      <div className="module33-progress-steps">
        <div className="module33-step active">
          <div className="module33-step-num">1</div>
          <div className="module33-step-label">Identité</div>
        </div>
        <div className="module33-step-line active" />
        <div className="module33-step pending">
          <div className="module33-step-num">2</div>
          <div className="module33-step-label">Tuteur</div>
        </div>
        <div className="module33-step-line" />
        <div className="module33-step pending">
          <div className="module33-step-num">3</div>
          <div className="module33-step-label">Scolarité</div>
        </div>
        <div className="module33-step-line" />
        <div className="module33-step pending">
          <div className="module33-step-num">4</div>
          <div className="module33-step-label">Confirmation</div>
        </div>
      </div>

      <div className="module33-grid-2" style={{ alignItems: 'start' }}>
        <div>
          <div className="module33-card" style={{ marginBottom: 16 }}>
            <div className="module33-card-header">
              <div className="module33-card-icon">👦</div>
              <div>
                <div className="module33-card-title">Informations personnelles</div>
                <div className="module33-card-subtitle">Données d’état civil de l’élève</div>
              </div>
            </div>
            <div className="module33-card-body">
              <div className="module33-form-row cols-2">
                <div className="module33-form-group">
                  <label className="module33-label">Nom *</label>
                  <input className="module33-input" type="text" value={form.lastName} onChange={event => updateField('lastName', event.target.value)} placeholder="Ex : Mbarga" />
                </div>
                <div className="module33-form-group">
                  <label className="module33-label">Prénom(s) *</label>
                  <input className="module33-input" type="text" value={form.firstName} onChange={event => updateField('firstName', event.target.value)} placeholder="Ex : Emile Jean" />
                </div>
              </div>

              <div className="module33-form-row cols-3">
                <div className="module33-form-group">
                  <label className="module33-label">Date de naissance *</label>
                  <input className="module33-input" type="date" value={form.birthDate} onChange={event => updateField('birthDate', event.target.value)} />
                </div>
                <div className="module33-form-group">
                  <label className="module33-label">Lieu de naissance *</label>
                  <input className="module33-input" type="text" value={form.birthPlace} onChange={event => updateField('birthPlace', event.target.value)} placeholder="Ex : Yaoundé" />
                </div>
                <div className="module33-form-group">
                  <label className="module33-label">Nationalité</label>
                  <input className="module33-input" type="text" value={form.nationality} onChange={event => updateField('nationality', event.target.value)} />
                </div>
              </div>

              <div className="module33-form-group">
                <label className="module33-label">Sexe *</label>
                <div className="module33-radio-group">
                  <div className={`module33-radio-option${form.gender === 'M' ? ' selected' : ''}`} onClick={() => updateField('gender', 'M')}>
                    <div className="module33-radio-dot" />
                    <span>♂ Masculin</span>
                  </div>
                  <div className={`module33-radio-option${form.gender === 'F' ? ' selected' : ''}`} onClick={() => updateField('gender', 'F')}>
                    <div className="module33-radio-dot" />
                    <span>♀ Féminin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="module33-card" style={{ marginBottom: 16 }}>
            <div className="module33-card-header">
              <div className="module33-card-icon cyan">👨‍👩‍👧</div>
              <div>
                <div className="module33-card-title">Tuteur / Parent</div>
                <div className="module33-card-subtitle">Personne responsable de l’élève</div>
              </div>
            </div>
            <div className="module33-card-body">
              <div className="module33-form-row cols-2">
                <div className="module33-form-group">
                  <label className="module33-label">Nom complet du tuteur *</label>
                  <input className="module33-input" type="text" value={form.tutorName} onChange={event => updateField('tutorName', event.target.value)} placeholder="Ex : M. Mbarga Jean" />
                </div>
                <div className="module33-form-group">
                  <label className="module33-label">Lien de parenté *</label>
                  <select className="module33-select" value={form.tutorRole} onChange={event => updateField('tutorRole', event.target.value)}>
                    <option>Père</option>
                    <option>Mère</option>
                    <option>Oncle / Tante</option>
                    <option>Tuteur légal</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>

              <div className="module33-form-row cols-2">
                <div className="module33-form-group">
                  <label className="module33-label">Téléphone *</label>
                  <input className="module33-input" type="tel" value={form.tutorPhone} onChange={event => updateField('tutorPhone', event.target.value)} placeholder="Ex : 699 000 000" />
                </div>
                <div className="module33-form-group">
                  <label className="module33-label">Téléphone secondaire</label>
                  <input className="module33-input" type="tel" value={form.tutorPhone2} onChange={event => updateField('tutorPhone2', event.target.value)} placeholder="Ex : 677 000 000" />
                </div>
              </div>

              <div className="module33-form-row cols-2">
                <div className="module33-form-group">
                  <label className="module33-label">Adresse domicile</label>
                  <input className="module33-input" type="text" value={form.address} onChange={event => updateField('address', event.target.value)} placeholder="Ex : Quartier Melen, Yaoundé" />
                </div>
                <div className="module33-form-group">
                  <label className="module33-label">Profession du tuteur</label>
                  <input className="module33-input" type="text" value={form.profession} onChange={event => updateField('profession', event.target.value)} placeholder="Ex : Fonctionnaire" />
                </div>
              </div>
            </div>
          </div>

          <div className="module33-card">
            <div className="module33-card-header">
              <div className="module33-card-icon green">🏫</div>
              <div>
                <div className="module33-card-title">Informations scolaires</div>
                <div className="module33-card-subtitle">Affectation et antécédents</div>
              </div>
            </div>
            <div className="module33-card-body">
              <div className="module33-form-row cols-3">
                <div className="module33-form-group">
                  <label className="module33-label">Classe *</label>
                  <select className="module33-select" value={form.className} onChange={event => updateField('className', event.target.value)}>
                    {classOptions.map(className => (
                      <option key={className} value={className}>{className}</option>
                    ))}
                  </select>
                </div>
                <div className="module33-form-group">
                  <label className="module33-label">Section *</label>
                  <select
                    className="module33-select"
                    value={form.section}
                    onChange={event => {
                      const nextSection = event.target.value
                      updateField('section', nextSection)
                      updateField('className', module33SectionClasses[nextSection]?.[0] ?? form.className)
                    }}
                  >
                    {module33Sections.filter(item => item !== 'Tous').map(section => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>
                <div className="module33-form-group">
                  <label className="module33-label">Année scolaire *</label>
                  <select className="module33-select" value={form.year} onChange={event => updateField('year', event.target.value)}>
                    {module33SchoolYears.map(schoolYear => (
                      <option key={schoolYear} value={schoolYear}>{schoolYear}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="module33-form-row cols-2">
                <div className="module33-form-group">
                  <label className="module33-label">École d’origine</label>
                  <input className="module33-input" type="text" value={form.originSchool} onChange={event => updateField('originSchool', event.target.value)} placeholder="Laisser vide si primo-inscrit" />
                  <span className="module33-hint">Pour les transferts d’autres établissements.</span>
                </div>
                <div className="module33-form-group">
                  <label className="module33-label">Groupe sanguin</label>
                  <select className="module33-select" value={form.bloodGroup} onChange={event => updateField('bloodGroup', event.target.value)}>
                    <option value="">Inconnu</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>
              </div>

              <div className="module33-form-group">
                <label className="module33-label">Observations / Besoins particuliers</label>
                <textarea className="module33-textarea" rows="4" value={form.observations} onChange={event => updateField('observations', event.target.value)} placeholder="Ex : Allergies, handicap, besoins spéciaux..." />
              </div>

              <div className="module33-form-group" style={{ marginTop: 14 }}>
                <label className="module33-label">Matricule (généré automatiquement)</label>
                <div className="module33-status-banner success">
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 800, color: 'var(--violet-profond)' }}>{matriculePreview}</div>
                  <div>
                    <div className="module33-status-title">Attribué à l’enregistrement</div>
                    <div className="module33-status-subtitle">Il s’aligne sur la logique du module 3.3.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="module33-layout-card" style={{ marginTop: 16 }}>
            <div className="module33-layout-card-footer module33-form-footer">
                <button className="module33-button-secondary" type="button" onClick={() => navigate('/eleves')}>✕ Annuler</button>
              <button className="module33-button" type="button" onClick={() => navigate('/eleves/show')}>✓ Enregistrer l’élève</button>
            </div>
          </div>
        </div>

        <div>
          <div className="module33-card" style={{ marginBottom: 16 }}>
            <div className="module33-card-header">
              <div className="module33-card-icon amber">📷</div>
              <div>
                <div className="module33-card-title">Photo d’identité</div>
                <div className="module33-card-subtitle">Optionnel</div>
              </div>
            </div>
            <div className="module33-card-body">
              <label className="module33-preview-box" htmlFor="photoInput">
                <div className="module33-preview-avatar">{summaryInitials}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--texte-sec)' }}>{photoLabel}</div>
                <div style={{ fontSize: 10, color: 'var(--texte-sec)' }}>JPG, PNG · Max 2 Mo</div>
              </label>
              <input id="photoInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
            </div>
          </div>

          <div className="module33-summary-card">
            <div className="module33-summary-hero">
              <div className="module33-summary-avatar">{summaryInitials}</div>
            </div>
            <div className="module33-summary-body">
              <div className="module33-summary-name" style={summaryName === 'Nom non saisi...' ? { color: 'var(--texte-sec)', fontStyle: 'italic', fontSize: 12, fontWeight: 400 } : undefined}>
                {summaryName}
              </div>
              <div className="module33-summary-id">{matriculePreview}</div>
              <div className="module33-summary-divider" />
              <div className="module33-summary-line">
                <span className="module33-summary-label">Classe</span>
                <span className={`module33-summary-value${form.className ? '' : ' placeholder'}`}>{form.className || '—'}</span>
              </div>
              <div className="module33-summary-line">
                <span className="module33-summary-label">Section</span>
                <span className={`module33-summary-value${form.section ? '' : ' placeholder'}`}>{form.section || '—'}</span>
              </div>
              <div className="module33-summary-line">
                <span className="module33-summary-label">Date de naissance</span>
                <span className={`module33-summary-value${form.birthDate ? '' : ' placeholder'}`}>{form.birthDate || '—'}</span>
              </div>
              <div className="module33-summary-line">
                <span className="module33-summary-label">Sexe</span>
                <span className="module33-summary-value">{summaryGender}</span>
              </div>
              <div className="module33-summary-line">
                <span className="module33-summary-label">Année scolaire</span>
                <span className="module33-summary-value">{form.year}</span>
              </div>
              <div className="module33-summary-divider" />
              <div className="module33-status-banner success">
                <div style={{ fontSize: 14 }}>✅</div>
                <div>
                  <div className="module33-status-title">Prêt à enregistrer</div>
                  <div className="module33-status-subtitle">Les champs requis sont organisés comme dans le prototype HTML.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="module33-layout-card" style={{ marginTop: 16 }}>
            <div className="module33-layout-card-body">
              <div className="module33-card-title" style={{ marginBottom: 12 }}>Rappel</div>
              <div className="module33-hint">Ce module 3.3 reste indépendant du module admin. Les routes et composants sont isolés dans le dossier Ps.</div>
            </div>
          </div>
        </div>
      </div>
    </Module33Layout>
  )
}
