import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module33Layout from '../inscriptions/Module33Layout'
import { module33Profile, module33SchoolYears } from '../inscriptions/module33Data'

const EDIT_TABS = [
  { id: 'identite', label: 'Identité', icon: '👤' },
  { id: 'tuteur', label: 'Tuteur', icon: '👨‍👩‍👧' },
  { id: 'scolarite', label: 'Scolarité', icon: '🏫' },
]

const INITIAL_STATE = {
  firstName: module33Profile.firstName,
  lastName: module33Profile.lastName,
  birthDate: '2015-03-12',
  birthPlace: module33Profile.birthPlace,
  nationality: module33Profile.nationality,
  gender: module33Profile.gender,
  tutor: module33Profile.tutor,
  tutorRole: module33Profile.tutorRole,
  phone: module33Profile.phone,
  phone2: module33Profile.secondaryPhone,
  address: module33Profile.address,
  profession: module33Profile.profession,
  className: module33Profile.className,
  section: module33Profile.section,
  year: module33Profile.year,
  originSchool: module33Profile.originSchool,
  bloodGroup: module33Profile.bloodGroup,
  observations: module33Profile.observations,
}

export default function Edit() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('identite')
  const [form, setForm] = useState(INITIAL_STATE)
  const [dirty, setDirty] = useState(new Set())

  const summaryName = [form.firstName, form.lastName].filter(Boolean).join(' ')
  const diffCount = dirty.size

  const summaryState = useMemo(() => ({
    name: summaryName || 'Nom non saisi...',
    className: form.className,
    section: form.section,
    year: form.year,
    gender: form.gender === 'M' ? 'Masculin' : 'Féminin',
  }), [form, summaryName])

  function updateField(field, value) {
    setForm(previous => ({ ...previous, [field]: value }))
    setDirty(previous => {
      const next = new Set(previous)
      if (INITIAL_STATE[field] === value) next.delete(field)
      else next.add(field)
      return next
    })
  }

  function resetForm() {
    setForm(INITIAL_STATE)
    setDirty(new Set())
  }

  return (
    <Module33Layout breadcrumb={['Élèves', module33Profile.fullName, 'Modifier']} backTo="/eleves/show">
      <div className="module33-page-header">
        <div>
          <h1 className="module33-page-title">Modifier l’élève</h1>
          <p className="module33-page-subtitle">Le module 3.3 conserve sa propre interface d’édition, séparée de l’administration générale.</p>
        </div>
      </div>

      <div className="module33-chip-tabs" style={{ marginBottom: 24, width: 'fit-content', padding: 5, border: '1.5px solid var(--bordure)', borderRadius: 13, background: 'var(--fond-carte)' }}>
        {EDIT_TABS.map(tab => (
          <button key={tab.id} type="button" className={`module33-chip${activeTab === tab.id ? ' active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="module33-grid-2" style={{ alignItems: 'start' }}>
        <div>
          <div className={`module33-status-banner${diffCount > 0 ? ' warning' : ' success'}`}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: diffCount > 0 ? 'var(--avertissement)' : 'var(--succes)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{diffCount}</div>
            <div>
              <div className="module33-status-title">{diffCount > 0 ? `${diffCount} champ(s) modifié(s)` : 'Aucune modification'}</div>
              <div className="module33-status-subtitle">Sauvegardez quand vous êtes prêt.</div>
            </div>
          </div>

          <div className={`module33-panel${activeTab === 'identite' ? ' active' : ''}`}>
            <div className="module33-card" style={{ marginBottom: 16 }}>
              <div className="module33-card-header">
                <div className="module33-card-icon">👤</div>
                <div>
                  <div className="module33-card-title">Informations personnelles</div>
                  <div className="module33-card-subtitle">Données d’état civil</div>
                </div>
              </div>
              <div className="module33-card-body">
                <div className="module33-form-row cols-2">
                  <div className="module33-form-group">
                    <label className="module33-label">Nom *</label>
                    <input className="module33-input" value={form.lastName} onChange={event => updateField('lastName', event.target.value)} />
                  </div>
                  <div className="module33-form-group">
                    <label className="module33-label">Prénom(s) *</label>
                    <input className="module33-input" value={form.firstName} onChange={event => updateField('firstName', event.target.value)} />
                  </div>
                </div>
                <div className="module33-form-row cols-3">
                  <div className="module33-form-group">
                    <label className="module33-label">Date de naissance *</label>
                    <input className="module33-input" type="date" value={form.birthDate} onChange={event => updateField('birthDate', event.target.value)} />
                  </div>
                  <div className="module33-form-group">
                    <label className="module33-label">Lieu de naissance *</label>
                    <input className="module33-input" value={form.birthPlace} onChange={event => updateField('birthPlace', event.target.value)} />
                  </div>
                  <div className="module33-form-group">
                    <label className="module33-label">Nationalité</label>
                    <input className="module33-input" value={form.nationality} onChange={event => updateField('nationality', event.target.value)} />
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
          </div>

          <div className={`module33-panel${activeTab === 'tuteur' ? ' active' : ''}`}>
            <div className="module33-card" style={{ marginBottom: 16 }}>
              <div className="module33-card-header">
                <div className="module33-card-icon cyan">👨‍👩‍👧</div>
                <div>
                  <div className="module33-card-title">Tuteur / Parent</div>
                  <div className="module33-card-subtitle">Contact principal du dossier</div>
                </div>
              </div>
              <div className="module33-card-body">
                <div className="module33-form-row cols-2">
                  <div className="module33-form-group">
                    <label className="module33-label">Nom complet</label>
                    <input className="module33-input" value={form.tutor} onChange={event => updateField('tutor', event.target.value)} />
                  </div>
                  <div className="module33-form-group">
                    <label className="module33-label">Lien de parenté</label>
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
                    <label className="module33-label">Téléphone</label>
                    <input className="module33-input" value={form.phone} onChange={event => updateField('phone', event.target.value)} />
                  </div>
                  <div className="module33-form-group">
                    <label className="module33-label">Téléphone secondaire</label>
                    <input className="module33-input" value={form.phone2} onChange={event => updateField('phone2', event.target.value)} />
                  </div>
                </div>
                <div className="module33-form-row cols-2">
                  <div className="module33-form-group">
                    <label className="module33-label">Adresse</label>
                    <input className="module33-input" value={form.address} onChange={event => updateField('address', event.target.value)} />
                  </div>
                  <div className="module33-form-group">
                    <label className="module33-label">Profession</label>
                    <input className="module33-input" value={form.profession} onChange={event => updateField('profession', event.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`module33-panel${activeTab === 'scolarite' ? ' active' : ''}`}>
            <div className="module33-card" style={{ marginBottom: 16 }}>
              <div className="module33-card-header">
                <div className="module33-card-icon green">🏫</div>
                <div>
                  <div className="module33-card-title">Scolarité</div>
                  <div className="module33-card-subtitle">Affectation et antécédents</div>
                </div>
              </div>
              <div className="module33-card-body">
                <div className="module33-form-row cols-3">
                  <div className="module33-form-group">
                    <label className="module33-label">Classe</label>
                    <select className="module33-select" value={form.className} onChange={event => updateField('className', event.target.value)}>
                      <option>CP</option>
                      <option>CE1</option>
                      <option>CE2</option>
                      <option>CM1</option>
                      <option>CM2</option>
                    </select>
                  </div>
                  <div className="module33-form-group">
                    <label className="module33-label">Section</label>
                    <select className="module33-select" value={form.section} onChange={event => updateField('section', event.target.value)}>
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </div>
                  <div className="module33-form-group">
                    <label className="module33-label">Année scolaire</label>
                    <select className="module33-select" value={form.year} onChange={event => updateField('year', event.target.value)}>
                      {module33SchoolYears.map(schoolYear => <option key={schoolYear}>{schoolYear}</option>)}
                    </select>
                  </div>
                </div>
                <div className="module33-form-row cols-2">
                  <div className="module33-form-group">
                    <label className="module33-label">École d’origine</label>
                    <input className="module33-input" value={form.originSchool} onChange={event => updateField('originSchool', event.target.value)} />
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
                  <label className="module33-label">Observations</label>
                  <textarea className="module33-textarea" rows="4" value={form.observations} onChange={event => updateField('observations', event.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="module33-layout-card">
            <div className="module33-layout-card-footer">
              <button className="module33-button-secondary" type="button" onClick={() => navigate('/eleves/show')}>Annuler</button>
              <button className="module33-button-secondary" type="button" onClick={resetForm}>Réinitialiser</button>
              <button className="module33-button" type="button" onClick={() => navigate('/eleves/show')}>Enregistrer les modifications</button>
            </div>
          </div>
        </div>

        <div>
          <div className="module33-card" style={{ marginBottom: 16 }}>
            <div className="module33-card-header">
              <div className="module33-card-icon amber">📌</div>
              <div>
                <div className="module33-card-title">Synthèse</div>
                <div className="module33-card-subtitle">Prévisualisation du dossier</div>
              </div>
            </div>
            <div className="module33-card-body">
              <div className="module33-summary-card" style={{ position: 'static' }}>
                <div className="module33-summary-hero">
                  <div className="module33-summary-avatar">{module33Profile.initials}</div>
                </div>
                <div className="module33-summary-body">
                  <div className="module33-summary-name">{summaryState.name}</div>
                  <div className="module33-summary-id">{module33Profile.id}</div>
                  <div className="module33-summary-divider" />
                  <div className="module33-summary-line">
                    <span className="module33-summary-label">Classe</span>
                    <span className="module33-summary-value">{summaryState.className}</span>
                  </div>
                  <div className="module33-summary-line">
                    <span className="module33-summary-label">Section</span>
                    <span className="module33-summary-value">{summaryState.section}</span>
                  </div>
                  <div className="module33-summary-line">
                    <span className="module33-summary-label">Année</span>
                    <span className="module33-summary-value">{summaryState.year}</span>
                  </div>
                  <div className="module33-summary-line">
                    <span className="module33-summary-label">Sexe</span>
                    <span className="module33-summary-value">{summaryState.gender}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="module33-card">
            <div className="module33-card-header">
              <div className="module33-card-icon cyan">🛠</div>
              <div>
                <div className="module33-card-title">Raccourcis</div>
                <div className="module33-card-subtitle">Actions rapides sur le dossier</div>
              </div>
            </div>
            <div className="module33-card-body" style={{ display: 'grid', gap: 10 }}>
              <button className="module33-button-secondary" type="button" onClick={() => navigate('/eleves/show')}>Voir la fiche</button>
              <button className="module33-button-danger" type="button" onClick={() => navigate('/eleves/delete')}>Désactiver le dossier</button>
              <button className="module33-button" type="button" onClick={() => navigate('/eleves')}>Retour à la liste</button>
            </div>
          </div>
        </div>
      </div>
    </Module33Layout>
  )
}
