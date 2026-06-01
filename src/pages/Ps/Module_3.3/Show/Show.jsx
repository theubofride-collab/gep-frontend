import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Module33Layout from '../../../../components/Ps/Module_3.3/Module33Layout'
import { module33Profile } from '../../../../components/Ps/Module_3.3/module33Data'

const TABS = [
  { id: 'identite', label: 'Identité', icon: '👤' },
  { id: 'notes', label: 'Notes', icon: '📝' },
  { id: 'paiements', label: 'Paiements', icon: '💳' },
  { id: 'discipline', label: 'Discipline', icon: '🚨' },
  { id: 'transport', label: 'Transport', icon: '🚌' },
]

export default function Show() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('identite')

  return (
    <Module33Layout breadcrumb={['Élèves', module33Profile.fullName, 'Fiche']} backTo="/eleves">
      <div className="module33-hero">
        <div className="module33-hero-top">
          <div className="module33-hero-avatar">{module33Profile.initials}</div>
          <div style={{ flex: 1 }}>
            <div className="module33-hero-name">{module33Profile.fullName}</div>
            <div className="module33-hero-subtitle">{module33Profile.id}</div>
            <div className="module33-hero-tags">
              {module33Profile.tags.map((tag, index) => (
                <span
                  key={tag}
                  className={`module33-hero-tag ${index === 0 ? 'primary' : index === 1 ? 'cyan' : index === 2 ? 'green' : 'amber'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="module33-row-tag success" style={{ marginTop: 4 }}>
              <span className="bdot" />
              Actif
            </div>
          </div>
        </div>

        <div className="module33-hero-stats">
          {module33Profile.metrics.map(metric => (
            <div key={metric.label} className="module33-hero-stat">
              <div className="module33-hero-stat-value">{metric.value}</div>
              <div className="module33-hero-stat-label">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="module33-tab-bar">
        {TABS.map(tab => (
          <button key={tab.id} type="button" className={`module33-tab${activeTab === tab.id ? ' active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="module33-layout-card" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        <div className={`module33-panel${activeTab === 'identite' ? ' active' : ''}`}>
          <div className="module33-card-body">
            <div className="module33-grid-2">
              <div className="module33-card">
                <div className="module33-card-header">
                  <div className="module33-card-icon">👤</div>
                  <div>
                    <div className="module33-card-title">Informations personnelles</div>
                    <div className="module33-card-subtitle">État civil de l’élève</div>
                  </div>
                </div>
                <div className="module33-card-body">
                  <div className="module33-info-grid">
                    <div className="module33-info-item"><div className="module33-info-label">Nom complet</div><div className="module33-info-value">{module33Profile.fullName}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Matricule</div><div className="module33-info-value" style={{ fontFamily: 'monospace', color: 'var(--violet-profond)' }}>{module33Profile.id}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Date de naissance</div><div className="module33-info-value">{module33Profile.birthDateLabel}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Lieu de naissance</div><div className="module33-info-value">{module33Profile.birthPlace}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Nationalité</div><div className="module33-info-value">{module33Profile.nationality}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Sexe</div><div className="module33-info-value">{module33Profile.gender === 'M' ? 'Masculin' : 'Féminin'}</div></div>
                  </div>
                </div>
              </div>

              <div className="module33-card">
                <div className="module33-card-header">
                  <div className="module33-card-icon cyan">👨‍👩‍👧</div>
                  <div>
                    <div className="module33-card-title">Tuteur / Parent</div>
                    <div className="module33-card-subtitle">Responsable du dossier</div>
                  </div>
                </div>
                <div className="module33-card-body">
                  <div className="module33-info-grid">
                    <div className="module33-info-item"><div className="module33-info-label">Nom</div><div className="module33-info-value">{module33Profile.tutor}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Lien</div><div className="module33-info-value">{module33Profile.tutorRole}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Téléphone</div><div className="module33-info-value">{module33Profile.phone}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Secondaire</div><div className="module33-info-value">{module33Profile.secondaryPhone}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Adresse</div><div className="module33-info-value">{module33Profile.address}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Profession</div><div className="module33-info-value">{module33Profile.profession}</div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="module33-grid-2" style={{ marginTop: 16 }}>
              <div className="module33-card">
                <div className="module33-card-header">
                  <div className="module33-card-icon green">🏫</div>
                  <div>
                    <div className="module33-card-title">Scolarité</div>
                    <div className="module33-card-subtitle">Affectation et suivi</div>
                  </div>
                </div>
                <div className="module33-card-body">
                  <div className="module33-info-grid">
                    <div className="module33-info-item"><div className="module33-info-label">Classe</div><div className="module33-info-value">{module33Profile.className}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Section</div><div className="module33-info-value">{module33Profile.section}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Année scolaire</div><div className="module33-info-value">{module33Profile.year}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Origine</div><div className="module33-info-value">{module33Profile.originSchool}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Groupe sanguin</div><div className="module33-info-value">{module33Profile.bloodGroup}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Statut</div><div className="module33-info-value">Actif</div></div>
                  </div>
                  <div className="module33-layout-card" style={{ marginTop: 14 }}>
                    <div className="module33-layout-card-body">
                      <div className="module33-hint">{module33Profile.observations}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="module33-card">
                <div className="module33-card-header">
                  <div className="module33-card-icon amber">🕒</div>
                  <div>
                    <div className="module33-card-title">Historique</div>
                    <div className="module33-card-subtitle">Événements récents du dossier</div>
                  </div>
                </div>
                <div className="module33-card-body">
                  <div className="module33-timeline">
                    {module33Profile.timeline.map(item => (
                      <div key={item.label} className="module33-timeline-item">
                        <div className={`module33-timeline-dot ${item.tone}`}>•</div>
                        <div>
                          <div className="module33-timeline-title">{item.label}</div>
                          <div className="module33-timeline-detail">{item.detail}</div>
                          <div className="module33-timeline-time">{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`module33-panel${activeTab === 'notes' ? ' active' : ''}`}>
          <div className="module33-card-body">
            <div className="module33-card" style={{ marginBottom: 16 }}>
              <div className="module33-card-header">
                <div className="module33-card-icon cyan">📝</div>
                <div>
                  <div className="module33-card-title">Résultats par matière</div>
                  <div className="module33-card-subtitle">Lecture rapide des performances</div>
                </div>
              </div>
              <div className="module33-card-body">
                <table className="module33-mini-table">
                  <thead>
                    <tr>
                      <th>Matière</th>
                      <th>Enseignant</th>
                      <th>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {module33Profile.notes.map(note => (
                      <tr key={note.subject}>
                        <td>{note.subject}</td>
                        <td>{note.teacher}</td>
                        <td><span className={`module33-row-tag ${note.grade === 'fg' ? 'success' : 'info'}`}>{note.average}/20</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className={`module33-panel${activeTab === 'paiements' ? ' active' : ''}`}>
          <div className="module33-card-body">
            <div className="module33-card">
              <div className="module33-card-header">
                <div className="module33-card-icon green">💳</div>
                <div>
                  <div className="module33-card-title">Paiements récents</div>
                  <div className="module33-card-subtitle">Scolarité, transport et services</div>
                </div>
              </div>
              <div className="module33-card-body">
                <table className="module33-mini-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Montant</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {module33Profile.payments.map(payment => (
                      <tr key={`${payment.type}-${payment.date}`}>
                        <td>{payment.type}</td>
                        <td>{payment.date}</td>
                        <td>{payment.amount}</td>
                        <td><span className={`module33-row-tag ${payment.status === 'payé' ? 'success' : 'warning'}`}>{payment.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className={`module33-panel${activeTab === 'discipline' ? ' active' : ''}`}>
          <div className="module33-card-body">
            <div className="module33-grid-2">
              <div className="module33-card">
                <div className="module33-card-header">
                  <div className="module33-card-icon amber">🚨</div>
                  <div>
                    <div className="module33-card-title">Incidents et observations</div>
                    <div className="module33-card-subtitle">Historique éducatif et comportemental</div>
                  </div>
                </div>
                <div className="module33-card-body">
                  <div className="module33-timeline">
                    {module33Profile.incidents.map(item => (
                      <div key={`${item.type}-${item.date}`} className="module33-timeline-item">
                        <div className="module33-timeline-dot warning">!</div>
                        <div>
                          <div className="module33-timeline-title">{item.type}</div>
                          <div className="module33-timeline-detail">{item.detail}</div>
                          <div className="module33-timeline-time">{item.date} · {item.sanction}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="module33-card">
                <div className="module33-card-header">
                  <div className="module33-card-icon primary">📌</div>
                  <div>
                    <div className="module33-card-title">Synthèse</div>
                    <div className="module33-card-subtitle">Points à garder en tête</div>
                  </div>
                </div>
                <div className="module33-card-body">
                  <div className="module33-info-grid">
                    <div className="module33-info-item"><div className="module33-info-label">Présence</div><div className="module33-info-value">96 %</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Retards</div><div className="module33-info-value">2</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Avertissements</div><div className="module33-info-value">1</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Commentaires</div><div className="module33-info-value">Positif</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`module33-panel${activeTab === 'transport' ? ' active' : ''}`}>
          <div className="module33-card-body">
            <div className="module33-grid-2">
              <div className="module33-card">
                <div className="module33-card-header">
                  <div className="module33-card-icon cyan">🚌</div>
                  <div>
                    <div className="module33-card-title">Transport</div>
                    <div className="module33-card-subtitle">Service de déplacement scolaire</div>
                  </div>
                </div>
                <div className="module33-card-body">
                  <div className="module33-info-grid">
                    <div className="module33-info-item"><div className="module33-info-label">Statut</div><div className="module33-info-value">{module33Profile.transport.status}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Itinéraire</div><div className="module33-info-value">{module33Profile.transport.route}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Chauffeur</div><div className="module33-info-value">{module33Profile.transport.driver}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Bus</div><div className="module33-info-value">{module33Profile.transport.vehicle}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Départ</div><div className="module33-info-value">{module33Profile.transport.departure}</div></div>
                    <div className="module33-info-item"><div className="module33-info-label">Année</div><div className="module33-info-value">{module33Profile.year}</div></div>
                  </div>
                </div>
              </div>

              <div className="module33-card">
                <div className="module33-card-header">
                  <div className="module33-card-icon green">✨</div>
                  <div>
                    <div className="module33-card-title">Actions rapides</div>
                    <div className="module33-card-subtitle">Les routes du module 3.3 restent indépendantes</div>
                  </div>
                </div>
                <div className="module33-card-body" style={{ display: 'grid', gap: 10 }}>
                  <button className="module33-button-secondary" type="button" onClick={() => navigate('/eleves/edit')}>Modifier la fiche</button>
                  <button className="module33-button-danger" type="button" onClick={() => navigate('/eleves/delete')}>Désactiver le dossier</button>
                  <button className="module33-button" type="button" onClick={() => navigate('/eleves')}>Retour à la liste</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Module33Layout>
  )
}
