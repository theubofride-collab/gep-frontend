import { useEffect, useMemo, useState } from 'react'
import './Parametres.css'

const NAV_GROUPS = [
  { title: 'Général', items: [
    { key: 'profil', icon: '👤', label: 'Profil' },
    { key: 'etablissement', icon: '🏫', label: 'Établissement' },
    { key: 'apparence', icon: '🎨', label: 'Apparence' },
    { key: 'langue', icon: '🌍', label: 'Langue & Région' },
  ] },
  { title: 'Compte', items: [
    { key: 'securite', icon: '🔐', label: 'Sécurité' },
    { key: 'notifications', icon: '🔔', label: 'Notifications' },
    { key: 'confidentialite', icon: '🛡️', label: 'Confidentialité' },
  ] },
  { title: 'Système', items: [
    { key: 'abonnement', icon: '⚡', label: 'Abonnement' },
    { key: 'integrations', icon: '🔗', label: 'Intégrations' },
    { key: 'donnees', icon: '📦', label: 'Données & Export' },
  ] },
]

const PLAN_FEATURES = {
  Gratuit: ['Jusqu’à 100 élèves', '5 enseignants', 'Rapport mensuel', 'Support email'],
  Pro: ['Élèves illimités', 'Enseignants illimités', 'Rapports avancés', 'Portail parents', 'Support prioritaire'],
  Établissement: ['Multi-campus', 'API personnalisée', 'Intégration SMS', 'Manager dédié', 'SLA 99.9%'],
}

const NOTIFICATIONS = [
  { key: 'inscriptions', label: 'Nouvelles inscriptions', sub: 'Recevoir une alerte à chaque nouvel élève inscrit', defaultValue: true },
  { key: 'parents', label: 'Messages des parents', sub: 'Notification en temps réel pour chaque message entrant', defaultValue: true },
  { key: 'examens', label: 'Rappels d’examens', sub: 'Alerte 24h avant la date d’un examen programmé', defaultValue: true },
  { key: 'absences', label: 'Alertes d’absence', sub: 'Signalement automatique des absences non justifiées', defaultValue: false },
  { key: 'hebdo', label: 'Rapports hebdomadaires', sub: 'Résumé automatique chaque lundi matin', defaultValue: true },
  { key: 'email', label: 'Notifications par email', sub: 'Envoi d’alertes importantes à votre adresse email', defaultValue: true },
  { key: 'sms', label: 'Notifications SMS', sub: 'Alertes urgentes par SMS (opérateur requis)', defaultValue: false },
]

const INTEGRATIONS = [
  { title: 'SMS Gateway', detail: 'Envoi de notifications parents et alertes urgentes', status: 'Connecté', icon: '📲' },
  { title: 'Email serveur', detail: 'SMTP sécurisé pour les notifications et rapports', status: 'Actif', icon: '✉️' },
  { title: 'Paiement mobile', detail: 'Intégration des paiements scolaires et reçus', status: 'En attente', icon: '💳' },
  { title: 'API établissement', detail: 'Connexion aux services partenaires internes', status: 'Actif', icon: '🧩' },
]

const EXPORT_ITEMS = [
  { title: 'Sauvegarde complète', detail: 'Télécharger l’ensemble des données au format ZIP' },
  { title: 'Export CSV', detail: 'Comptes, classes, paiements et présences' },
  { title: 'Journal d’activité', detail: 'Historique des opérations administratives' },
]

const ACCENT_SWATCHES = [
  'linear-gradient(135deg,#4C1D95,#06B6D4)',
  'linear-gradient(135deg,#059669,#06B6D4)',
  'linear-gradient(135deg,#D97706,#E11D48)',
  'linear-gradient(135deg,#1D4ED8,#7C3AED)',
  'linear-gradient(135deg,#065F46,#0891B2)',
  'linear-gradient(135deg,#9D174D,#C2410C)',
]

function Toggle({ value, onChange }) {
  return <button type="button" className={`toggle ${value ? 'on' : ''}`} onClick={() => onChange(!value)} aria-pressed={value} />
}

export default function Parametres() {
  const [section, setSection] = useState('profil')
  const [saved, setSaved] = useState(false)
  const [accent, setAccent] = useState(0)
  const [theme, setTheme] = useState('Clair')
  const [language, setLanguage] = useState('Français')
  const [timezone, setTimezone] = useState('Africa/Douala (WAT, UTC+1)')
  const [dateFormat, setDateFormat] = useState('JJ/MM/AAAA')
  const [timeFormat, setTimeFormat] = useState('24 heures')
  const [plan, setPlan] = useState('Gratuit')
  const [notifs, setNotifs] = useState(() => Object.fromEntries(NOTIFICATIONS.map(item => [item.key, item.defaultValue])))
  const [security, setSecurity] = useState({ timeout: 30, twoFactor: false, loginAlerts: true })
  const [profile, setProfile] = useState({ firstName: 'Luke', lastName: 'Johnson-Ramos', email: 'luke.jr@gep-nebula.cm', phone: '+237 699 123 456', role: 'Administrateur', department: 'Direction Générale', bio: 'Administrateur principal du système Nebula pour le Groupe d’Écoles Privées.' })
  const [school, setSchool] = useState({ name: 'GEP Nebula', matricule: 'CM/YDE/0045/B1', city: 'Yaoundé', region: 'Centre', address: 'Quartier Bastos, Rue 1.234, Yaoundé, Cameroun', email: 'direction@gep-nebula.cm', website: 'www.gep-nebula.cm', schoolYear: '2025 – 2026', evaluation: 'Notation sur 20' })

  useEffect(() => {
    document.title = 'Gep Nebula — Paramètres'
  }, [])

  useEffect(() => {
    if (!saved) return undefined
    const timer = window.setTimeout(() => setSaved(false), 2200)
    return () => window.clearTimeout(timer)
  }, [saved])

  const activeNavLabel = useMemo(() => NAV_GROUPS.flatMap(group => group.items).find(item => item.key === section)?.label ?? 'Profil', [section])

  const handleSave = () => setSaved(true)

  return (
    <div className="params-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">⚙️ Paramètres</h1>
          <p className="page-subtitle">Gérez votre compte, l’établissement et les préférences système</p>
        </div>
        <div className="header-actions">
          <button className="btn-sec" type="button">↺ Réinitialiser</button>
          <button className="btn-prim" type="button" onClick={handleSave}>{saved ? '✅ Enregistré' : '💾 Enregistrer'}</button>
        </div>
      </div>

      <div className="settings-layout">
        <nav className="settings-nav">
          {NAV_GROUPS.map(group => (
            <div key={group.title} className="settings-nav-block">
              <div className="settings-nav-title">{group.title}</div>
              {group.items.map(item => (
                <button key={item.key} type="button" className={`settings-nav-item ${section === item.key ? 'active' : ''}`} onClick={() => setSection(item.key)}>
                  <span className="sn-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}

          <div className="nav-divider" />
          <div className="settings-nav-title">Résumé</div>
          <div className="nav-summary">
            <div className="nav-summary-title">Section active</div>
            <div className="nav-summary-value">{activeNavLabel}</div>
            <div className="nav-summary-meta">Abonnement actuel : {plan}</div>
          </div>
        </nav>

        <div className="settings-content">
          <div className="settings-section">
            <div className="section-header">
              <div className="section-icon">👤</div>
              <div>
                <div className="section-title">Profil Administrateur</div>
                <div className="section-desc">Vos informations personnelles et de contact</div>
              </div>
            </div>
            <div className="section-body">
              <div className="avatar-upload">
                <div className="avatar-large">LR</div>
                <div className="avatar-upload-info">
                  <button className="btn-secondary" type="button">📷 Changer la photo</button>
                  <p>JPG, PNG ou GIF — max 2 Mo</p>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-field"><label>Prénom</label><input type="text" value={profile.firstName} onChange={event => setProfile(current => ({ ...current, firstName: event.target.value }))} /></div>
                <div className="form-field"><label>Nom</label><input type="text" value={profile.lastName} onChange={event => setProfile(current => ({ ...current, lastName: event.target.value }))} /></div>
                <div className="form-field"><label>Email</label><input type="email" value={profile.email} onChange={event => setProfile(current => ({ ...current, email: event.target.value }))} /></div>
                <div className="form-field"><label>Téléphone</label><input type="tel" value={profile.phone} onChange={event => setProfile(current => ({ ...current, phone: event.target.value }))} /></div>
                <div className="form-field"><label>Rôle</label><select value={profile.role} onChange={event => setProfile(current => ({ ...current, role: event.target.value }))}><option>Administrateur</option><option>Directeur</option><option>Censeur</option></select></div>
                <div className="form-field"><label>Département</label><input type="text" value={profile.department} onChange={event => setProfile(current => ({ ...current, department: event.target.value }))} /></div>
                <div className="form-field full"><label>Bio / Description</label><textarea value={profile.bio} onChange={event => setProfile(current => ({ ...current, bio: event.target.value }))} /></div>
              </div>

              <div className="form-actions">
                <button className="btn-prim" type="button" onClick={handleSave}>💾 Enregistrer les modifications</button>
                <button className="btn-sec" type="button">Annuler</button>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <div className="section-icon">🏫</div>
              <div>
                <div className="section-title">Informations de l’établissement</div>
                <div className="section-desc">Nom, adresse et coordonnées de votre école</div>
              </div>
            </div>
            <div className="section-body">
              <div className="form-grid">
                <div className="form-field"><label>Nom de l’établissement</label><input type="text" value={school.name} onChange={event => setSchool(current => ({ ...current, name: event.target.value }))} /></div>
                <div className="form-field"><label>Matricule MINESEC</label><input type="text" value={school.matricule} onChange={event => setSchool(current => ({ ...current, matricule: event.target.value }))} /></div>
                <div className="form-field"><label>Ville</label><input type="text" value={school.city} onChange={event => setSchool(current => ({ ...current, city: event.target.value }))} /></div>
                <div className="form-field"><label>Région</label><select value={school.region} onChange={event => setSchool(current => ({ ...current, region: event.target.value }))}><option>Centre</option><option>Littoral</option><option>Ouest</option><option>Sud</option></select></div>
                <div className="form-field full"><label>Adresse complète</label><input type="text" value={school.address} onChange={event => setSchool(current => ({ ...current, address: event.target.value }))} /></div>
                <div className="form-field"><label>Email officiel</label><input type="email" value={school.email} onChange={event => setSchool(current => ({ ...current, email: event.target.value }))} /></div>
                <div className="form-field"><label>Site web</label><input type="text" value={school.website} onChange={event => setSchool(current => ({ ...current, website: event.target.value }))} /></div>
                <div className="form-field"><label>Année scolaire en cours</label><select value={school.schoolYear} onChange={event => setSchool(current => ({ ...current, schoolYear: event.target.value }))}><option>2025 – 2026</option><option>2026 – 2027</option></select></div>
                <div className="form-field"><label>Système d’évaluation</label><select value={school.evaluation} onChange={event => setSchool(current => ({ ...current, evaluation: event.target.value }))}><option>Notation sur 20</option><option>Notation sur 100</option><option>Lettres (A–F)</option></select></div>
              </div>
              <div className="form-actions">
                <button className="btn-prim" type="button" onClick={handleSave}>💾 Enregistrer</button>
                <button className="btn-sec" type="button">Annuler</button>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <div className="section-icon">🎨</div>
              <div>
                <div className="section-title">Apparence</div>
                <div className="section-desc">Thème, langue et préférences d’affichage</div>
              </div>
            </div>
            <div className="section-body">
              <div className="field-stack">
                <label>Thème de l’interface</label>
                <div className="radio-group">
                  {['Clair', 'Sombre', 'Système'].map(option => (
                    <button key={option} type="button" className={`radio-option ${theme === option ? 'selected' : ''}`} onClick={() => setTheme(option)}>
                      <span className="radio-dot" /> {option === 'Clair' ? '☀️' : option === 'Sombre' ? '🌙' : '💻'} {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field-stack">
                <label>Couleur d’accentuation</label>
                <div className="color-swatch-row">
                  {ACCENT_SWATCHES.map((swatch, index) => (
                    <button key={swatch} type="button" className={`color-swatch ${accent === index ? 'selected' : ''}`} style={{ background: swatch }} onClick={() => setAccent(index)}>
                      {accent === index ? '✓' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-grid">
                <div className="form-field"><label>Langue</label><select value={language} onChange={event => setLanguage(event.target.value)}><option>Français</option><option>English</option></select></div>
                <div className="form-field"><label>Fuseau horaire</label><select value={timezone} onChange={event => setTimezone(event.target.value)}><option>Africa/Douala (WAT, UTC+1)</option><option>Europe/Paris (CET, UTC+1)</option></select></div>
                <div className="form-field"><label>Format de date</label><select value={dateFormat} onChange={event => setDateFormat(event.target.value)}><option>JJ/MM/AAAA</option><option>MM/JJ/AAAA</option><option>AAAA-MM-JJ</option></select></div>
                <div className="form-field"><label>Format horaire</label><select value={timeFormat} onChange={event => setTimeFormat(event.target.value)}><option>24 heures</option><option>12 heures (AM/PM)</option></select></div>
              </div>

              <div className="form-actions">
                <button className="btn-prim" type="button" onClick={handleSave}>💾 Appliquer</button>
                <button className="btn-sec" type="button">Réinitialiser</button>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <div className="section-icon">🔔</div>
              <div>
                <div className="section-title">Notifications</div>
                <div className="section-desc">Gérez quand et comment vous recevez des alertes</div>
              </div>
            </div>
            <div className="section-body">
              {NOTIFICATIONS.map(item => (
                <div key={item.key} className="toggle-row">
                  <div className="toggle-info">
                    <div className="toggle-label">{item.label}</div>
                    <div className="toggle-sub">{item.sub}</div>
                  </div>
                  <Toggle value={notifs[item.key]} onChange={value => setNotifs(current => ({ ...current, [item.key]: value }))} />
                </div>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <div className="section-icon">🔐</div>
              <div>
                <div className="section-title">Sécurité du compte</div>
                <div className="section-desc">Mot de passe, 2FA et sessions actives</div>
              </div>
            </div>
            <div className="section-body">
              <div className="form-grid">
                <div className="form-field"><label>Mot de passe actuel</label><input type="password" placeholder="••••••••••" /></div>
                <div className="form-field" />
                <div className="form-field"><label>Nouveau mot de passe</label><input type="password" placeholder="••••••••••" /></div>
                <div className="form-field"><label>Confirmer le nouveau mot de passe</label><input type="password" placeholder="••••••••••" /></div>
              </div>
              <div className="form-actions">
                <button className="btn-prim" type="button">🔒 Mettre à jour le mot de passe</button>
              </div>
              <div className="toggle-row">
                <div className="toggle-info">
                  <div className="toggle-label">Authentification à deux facteurs (2FA)</div>
                  <div className="toggle-sub">Sécurisez votre compte avec un code SMS ou une application d’authentification</div>
                </div>
                <Toggle value={security.twoFactor} onChange={value => setSecurity(current => ({ ...current, twoFactor: value }))} />
              </div>
              <div className="toggle-row">
                <div className="toggle-info">
                  <div className="toggle-label">Alertes de connexion</div>
                  <div className="toggle-sub">Soyez notifié à chaque nouvelle connexion à votre compte</div>
                </div>
                <Toggle value={security.loginAlerts} onChange={value => setSecurity(current => ({ ...current, loginAlerts: value }))} />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <div className="section-icon">⚡</div>
              <div>
                <div className="section-title">Abonnement & facturation</div>
                <div className="section-desc">Plan actuel, facturation et mise à niveau</div>
              </div>
            </div>
            <div className="section-body">
              <div className="plan-overview">
                <span className="plan-overview-icon">📊</span>
                <div className="plan-overview-text">
                  <div className="plan-overview-title">Plan actuel : <span>Gratuit</span></div>
                  <div className="plan-overview-sub">Renouvelé automatiquement — aucune facturation active</div>
                </div>
                <button className="btn-prim" type="button" onClick={() => setPlan('Pro')}>⚡ Passer à Pro</button>
              </div>

              <div className="plan-grid">
                {['Gratuit', 'Pro', 'Établissement'].map(planName => (
                  <div key={planName} className={`plan-card ${plan === planName ? 'current' : ''}`} onClick={() => setPlan(planName)}>
                    <div className="plan-badge">{plan === planName ? 'Actuel' : planName === 'Pro' ? 'Populaire' : ''}</div>
                    <div className="plan-name">{planName}</div>
                    <div className="plan-price">{planName === 'Gratuit' ? '0 FCFA' : planName === 'Pro' ? '9 900 FCFA' : '24 900 FCFA'} <span>/ mois</span></div>
                    <div className="plan-features">
                      {PLAN_FEATURES[planName].map(feature => <div key={feature} className="plan-feature">{feature}</div>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <div className="section-icon">🔗</div>
              <div>
                <div className="section-title">Intégrations</div>
                <div className="section-desc">Connectez les services externes essentiels</div>
              </div>
            </div>
            <div className="section-body">
              <div className="integration-grid">
                {INTEGRATIONS.map(item => (
                  <div key={item.title} className="integration-card">
                    <div className="integration-top">
                      <div className="integration-icon">{item.icon}</div>
                      <span className={`integration-status ${item.status === 'Connecté' ? 'success' : item.status === 'Actif' ? 'info' : 'warning'}`}>{item.status}</span>
                    </div>
                    <div className="integration-title">{item.title}</div>
                    <div className="integration-detail">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <div className="section-icon">📦</div>
              <div>
                <div className="section-title">Données & export</div>
                <div className="section-desc">Sauvegardes, exports et journal d’activité</div>
              </div>
            </div>
            <div className="section-body">
              <div className="export-list">
                {EXPORT_ITEMS.map(item => (
                  <div key={item.title} className="export-item">
                    <div>
                      <div className="export-title">{item.title}</div>
                      <div className="export-detail">{item.detail}</div>
                    </div>
                    <button className="btn-sec" type="button">Exporter</button>
                  </div>
                ))}
              </div>

              <div className="danger-zone">
                <div className="danger-title">⚠️ Zone critique</div>
                <div className="danger-desc">Ces actions sont irréversibles. Procédez avec la plus grande prudence.</div>
                <div className="danger-actions">
                  <button className="btn-danger" type="button">🗑️ Supprimer toutes les données de l’année</button>
                  <button className="btn-danger" type="button">❌ Désactiver le compte établissement</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}