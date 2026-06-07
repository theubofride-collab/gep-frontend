import { useEffect, useMemo, useState } from 'react'
import './Compte.css'

const profileStats = [
	{ label: 'Étudiants', value: '15K' },
	{ label: 'Enseignants', value: '200' },
	{ label: 'Classes', value: '48' },
]

const profileMeta = [
	{ icon: '📧', value: 'luke.robert@nebula.school' },
	{ icon: '📞', value: '+237 699 123 456' },
	{ icon: '📍', value: 'Yaoundé, Cameroun' },
	{ icon: '🗓️', value: 'Membre depuis Jan 2022' },
]

const activityItems = [
	{ icon: '✅', tone: 'success', title: 'Connexion réussie', desc: 'Chrome · Yaoundé', time: 'Il y a 2 min' },
	{ icon: '👤', tone: 'violet', title: 'Profil modifié', desc: 'Photo de profil mise à jour', time: 'Hier 14h32' },
	{ icon: '📝', tone: 'cyan', title: 'Examen créé', desc: 'Maths — Classe 6e A', time: '15 mai' },
	{ icon: '⚠️', tone: 'warning', title: 'Alerte de présence', desc: '12 absences signalées', time: '14 mai' },
	{ icon: '🔐', tone: 'danger', title: 'Mot de passe changé', desc: 'Depuis Firefox · Douala', time: '10 mai' },
]

const notificationGroups = [
	{
		title: 'Académique',
		items: [
			{ label: "Résultats d'examens", sub: 'Quand les notes sont publiées', channels: ['email', 'app'] },
			{ label: 'Absences des étudiants', sub: 'Alertes de présence en temps réel', channels: ['email', 'app', 'sms'] },
			{ label: 'Nouveaux étudiants inscrits', sub: 'À chaque nouvelle inscription', channels: ['email'] },
		],
	},
	{
		title: 'Système',
		items: [
			{ label: 'Mises à jour de la plateforme', sub: 'Nouvelles fonctionnalités', channels: ['email'] },
			{ label: 'Alertes de sécurité', sub: 'Connexions et modifications critiques', channels: ['email', 'app', 'sms'] },
			{ label: 'Rapports hebdomadaires', sub: 'Résumé chaque lundi matin', channels: ['email'] },
		],
	},
]

const plans = [
	{
		name: 'Gratuit',
		icon: '🌱',
		price: '0',
		currency: 'FCFA/mois',
		badge: 'Actuel',
		current: true,
		features: [
			['✓', true, "Jusqu'à 100 étudiants"],
			['✓', true, '2 enseignants'],
			['✓', true, 'Tableau de bord basique'],
			['—', false, 'Rapports avancés'],
			['—', false, 'Export CSV/PDF'],
			['—', false, 'Support prioritaire'],
		],
	},
	{
		name: 'Pro',
		icon: '🚀',
		price: '15 000',
		currency: 'FCFA/mois',
		badge: 'Populaire',
		popular: true,
		features: [
			['✓', true, "Jusqu'à 5 000 étudiants"],
			['✓', true, '50 enseignants'],
			['✓', true, 'Tableaux de bord avancés'],
			['✓', true, 'Rapports & exports'],
			['✓', true, 'Notifications SMS'],
			['—', false, 'Support dédié 24h/7j'],
		],
	},
	{
		name: 'Établissement',
		icon: '🏛️',
		price: 'Sur devis',
		currency: '',
		features: [
			['✓', true, 'Étudiants illimités'],
			['✓', true, 'Enseignants illimités'],
			['✓', true, 'Multi-établissements'],
			['✓', true, 'API personnalisée'],
			['✓', true, 'SSO & Active Directory'],
			['✓', true, 'Support dédié 24h/7j'],
		],
	},
]

const usageItems = [
	{ label: 'Étudiants', value: '100/100', percent: 100, tone: 'warning' },
	{ label: 'Enseignants', value: '2/2', percent: 100, tone: 'violet' },
	{ label: 'Stockage', value: '62%', percent: 62, tone: 'cyan' },
	{ label: 'Exports ce mois', value: '3/10', percent: 30, tone: 'success' },
]

const sessions = [
	{ icon: '🖥️', name: 'Chrome — Windows 11', info: 'Yaoundé · Il y a 2 min', current: true },
	{ icon: '📱', name: 'Safari — iPhone 15', info: 'Douala · Il y a 3h' },
	{ icon: '💻', name: 'Firefox — macOS', info: 'Bafoussam · Hier' },
	{ icon: '📱', name: 'Chrome — Android', info: 'Garoua · Il y a 3 jours' },
]

const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const channelLabels = { email: '📧', app: '📱', sms: '💬' }

function toneClass(tone) {
	return `act-icon act-${tone}`
}

export default function Compte() {
	const [tab, setTab] = useState('profil')
	const [activeDays, setActiveDays] = useState(['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'])
	const [notificationState, setNotificationState] = useState(() => ({
		'Résultats d\'examens': ['email', 'app'],
		'Absences des étudiants': ['email', 'app', 'sms'],
		'Nouveaux étudiants inscrits': ['email'],
		'Mises à jour de la plateforme': ['email'],
		"Alertes de sécurité": ['email', 'app', 'sms'],
		'Rapports hebdomadaires': ['email'],
	}))
	const [toggles, setToggles] = useState({ tfa: true, alerts: true, location: false })

	useEffect(() => {
		document.title = 'Gep Nebula — Compte'
	}, [])

	const planUsage = useMemo(() => usageItems, [])

	function toggleDay(day) {
		setActiveDays(current => (current.includes(day) ? current.filter(item => item !== day) : [...current, day]))
	}

	function toggleChannel(label, channel) {
		setNotificationState(current => {
			const next = { ...current }
			const channels = new Set(next[label] || [])
			if (channels.has(channel)) channels.delete(channel)
			else channels.add(channel)
			next[label] = Array.from(channels)
			return next
		})
	}

	function renderChannels(label) {
		const channels = notificationState[label] || []
		return (
			<div className="notif-channels">
				{Object.keys(channelLabels).map(channel => (
					<button
						key={channel}
						type="button"
						className={`channel-btn ${channels.includes(channel) ? 'active' : ''}`}
						onClick={() => toggleChannel(label, channel)}
						title={channel}
					>
						{channelLabels[channel]}
					</button>
				))}
			</div>
		)
	}

	return (
		<div className="account-page">
			<div className="page-header">
				<div>
					<h1 className="page-title">👤 Mon Compte</h1>
					<p className="page-subtitle">Gérez votre profil, sécurité et préférences.</p>
				</div>
				<button className="btn-primary" type="button">Exporter le rapport</button>
			</div>

			<div className="account-tabs" role="tablist" aria-label="Compte">
				<button type="button" className={`atab ${tab === 'profil' ? 'active' : ''}`} onClick={() => setTab('profil')}>👤 Profil</button>
				<button type="button" className={`atab ${tab === 'securite' ? 'active' : ''}`} onClick={() => setTab('securite')}>🔒 Sécurité</button>
				<button type="button" className={`atab ${tab === 'notifications' ? 'active' : ''}`} onClick={() => setTab('notifications')}>🔔 Notifications</button>
				<button type="button" className={`atab ${tab === 'abonnement' ? 'active' : ''}`} onClick={() => setTab('abonnement')}>💎 Abonnement</button>
			</div>

			<div className={`tab-panel ${tab === 'profil' ? 'active' : ''}`}>
				<div className="profile-layout">
					<div>
						<div className="profile-card">
							<div className="profile-banner" />
							<div className="profile-avatar-wrap">
								<div className="profile-avatar">
									LR
									<div className="avatar-overlay">📷</div>
								</div>
							</div>
							<div className="profile-info-card">
								<div className="profile-name">Luke J. Robert</div>
								<div className="profile-role-badge">🛡️ Administrateur</div>
								<div className="profile-stats">
									{profileStats.map(item => (
										<div key={item.label} className="ps-item">
											<div className="ps-val">{item.value}</div>
											<div className="ps-lbl">{item.label}</div>
										</div>
									))}
								</div>
								<div className="profile-divider" />
								{profileMeta.map(item => (
									<div key={item.value} className="profile-meta-item">
										<div className="pm-icon">{item.icon}</div>
										<div className="pm-val">{item.value}</div>
									</div>
								))}
							</div>
						</div>

						<div className="activity-panel">
							<div className="activities-title">Activité récente</div>
							<div className="activity-list">
								{activityItems.map(item => (
									<div key={item.title} className="activity-item">
										<div className={toneClass(item.tone)}>{item.icon}</div>
										<div>
											<div className="act-title">{item.title}</div>
											<div className="act-desc">{item.desc}</div>
										</div>
										<div className="act-time">{item.time}</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="form-sections">
						<div className="form-section">
							<div className="fs-header">
								<div>
									<div className="fs-title">Informations personnelles</div>
									<div className="fs-subtitle">Modifiez vos données de profil</div>
								</div>
								<button className="btn-save" type="button">💾 Sauvegarder</button>
							</div>
							<div className="form-grid form-grid-profile">
								<div className="form-group"><label>Prénom</label><input className="form-input" defaultValue="Luke" /></div>
								<div className="form-group"><label>Nom</label><input className="form-input" defaultValue="Robert" /></div>
								<div className="form-group"><label>Email</label><input className="form-input" defaultValue="luke.robert@nebula.school" /></div>
								<div className="form-group"><label>Téléphone</label><input className="form-input" defaultValue="+237 699 123 456" /></div>
								<div className="form-group"><label>Ville</label><input className="form-input" defaultValue="Yaoundé" /></div>
								<div className="form-group"><label>Pays</label><input className="form-input" defaultValue="Cameroun" /></div>
							</div>
							<div className="form-grid full">
								<div className="form-group"><label>Biographie</label><textarea className="form-input textarea" rows="3" defaultValue="Administrateur principal de Nebula School. Passionné d'éducation et de technologie." /></div>
							</div>
						</div>

						<div className="form-section">
							<div className="fs-header">
								<div>
									<div className="fs-title">Paramètres du compte</div>
									<div className="fs-subtitle">Langue, fuseau horaire et affichage</div>
								</div>
								<button className="btn-edit" type="button">✏️ Modifier</button>
							</div>
							<div className="form-grid">
								<div className="form-group">
									<label>Langue</label>
									<select className="form-select"><option>Français</option><option>English</option><option>Español</option></select>
								</div>
								<div className="form-group">
									<label>Fuseau horaire</label>
									<select className="form-select"><option>UTC+1 (Afrique Centrale)</option><option>UTC+0 (Londres)</option><option>UTC-5 (New York)</option></select>
								</div>
								<div className="form-group">
									<label>Format de date</label>
									<select className="form-select"><option>JJ/MM/AAAA</option><option>MM/DD/YYYY</option><option>AAAA-MM-JJ</option></select>
								</div>
								<div className="form-group">
									<label>Thème</label>
									<select className="form-select"><option>Clair (défaut)</option><option>Sombre</option><option>Système</option></select>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`tab-panel ${tab === 'securite' ? 'active' : ''}`}>
				<div className="two-col-grid">
					<div>
						<div className="form-section">
							<div className="fs-header">
								<div>
									<div className="fs-title">🔐 Changer le mot de passe</div>
									<div className="fs-subtitle">Utilisez un mot de passe fort et unique</div>
								</div>
							</div>
							<div className="form-grid full password-grid">
								<div className="form-group"><label>Mot de passe actuel</label><input className="form-input" type="password" placeholder="••••••••" /></div>
								<div className="form-group"><label>Nouveau mot de passe</label><input className="form-input" type="password" placeholder="••••••••" /></div>
								<div className="form-group"><label>Confirmer</label><input className="form-input" type="password" placeholder="••••••••" /></div>
							</div>
							<div className="strength-block">
								<div className="strength-label">Force du mot de passe</div>
								<div className="strength-bars">
									<div className="strength-bar danger" />
									<div className="strength-bar warning" />
									<div className="strength-bar muted" />
									<div className="strength-bar muted" />
								</div>
								<div className="strength-note">Moyen — Ajoutez des caractères spéciaux</div>
							</div>
							<button className="btn-save full-btn" type="button">🔐 Mettre à jour</button>
						</div>

						<div className="form-section section-spacer">
							<div className="fs-header">
								<div>
									<div className="fs-title">⚙️ Options de sécurité</div>
								</div>
							</div>
							<div className="security-list">
								<div className="security-item">
									<div className="sec-icon act-g">📱</div>
									<div><div className="sec-title">Authentification 2 facteurs</div><div className="sec-desc">Via application ou SMS</div></div>
									<div className="sec-action"><button type="button" className={`toggle ${toggles.tfa ? 'on' : ''}`} onClick={() => setToggles(current => ({ ...current, tfa: !current.tfa }))}><span className="toggle-knob" /></button></div>
								</div>
								<div className="security-item">
									<div className="sec-icon act-v">🔔</div>
									<div><div className="sec-title">Alertes de connexion</div><div className="sec-desc">Notification à chaque nouvelle connexion</div></div>
									<div className="sec-action"><button type="button" className={`toggle ${toggles.alerts ? 'on' : ''}`} onClick={() => setToggles(current => ({ ...current, alerts: !current.alerts }))}><span className="toggle-knob" /></button></div>
								</div>
								<div className="security-item">
									<div className="sec-icon act-c">📍</div>
									<div><div className="sec-title">Vérification de localisation</div><div className="sec-desc">Bloquer les connexions suspectes</div></div>
									<div className="sec-action"><button type="button" className={`toggle ${toggles.location ? 'on' : ''}`} onClick={() => setToggles(current => ({ ...current, location: !current.location }))}><span className="toggle-knob" /></button></div>
								</div>
								<div className="security-item">
									<div className="sec-icon act-danger">🗑️</div>
									<div><div className="sec-title">Supprimer le compte</div><div className="sec-desc">Action irréversible</div></div>
									<div className="sec-action"><button className="btn-danger" type="button">Supprimer</button></div>
								</div>
							</div>
						</div>
					</div>

					<div>
						<div className="form-section">
							<div className="fs-header">
								<div>
									<div className="fs-title">💻 Sessions actives</div>
									<div className="fs-subtitle">Appareils connectés à votre compte</div>
								</div>
							</div>
							<div className="session-list">
								{sessions.map(session => (
									<div key={session.name} className="session-item">
										<span className="ses-icon">{session.icon}</span>
										<div>
											<div className="ses-name">{session.name}</div>
											<div className="ses-info">{session.info}</div>
										</div>
										{session.current ? <span className="ses-current">Actuelle</span> : <span className="ses-revoke">Révoquer</span>}
									</div>
								))}
							</div>
							<button className="btn-danger full-btn" type="button">🚫 Déconnecter toutes les sessions</button>
						</div>
					</div>
				</div>
			</div>

			<div className={`tab-panel ${tab === 'notifications' ? 'active' : ''}`}>
				<div className="two-col-grid">
					<div className="form-section">
						<div className="fs-header">
							<div>
								<div className="fs-title">📬 Canaux de notification</div>
								<div className="fs-subtitle">Choisissez comment être notifié</div>
							</div>
							<button className="btn-save" type="button">💾 Sauvegarder</button>
						</div>
						{notificationGroups.map(group => (
							<div key={group.title} className="notif-section">
								<div className="notif-section-title">{group.title}</div>
								{group.items.map(item => (
									<div key={item.label} className="notif-row">
										<div>
											<div className="notif-label">{item.label}</div>
											<div className="notif-sub">{item.sub}</div>
										</div>
										{renderChannels(item.label)}
									</div>
								))}
							</div>
						))}
					</div>

					<div className="form-section">
						<div className="fs-header">
							<div>
								<div className="fs-title">⏰ Horaires de silence</div>
								<div className="fs-subtitle">Ne pas déranger pendant ces plages</div>
							</div>
						</div>
						<div className="form-grid silence-grid">
							<div className="form-group"><label>Début</label><input className="form-input" type="time" defaultValue="22:00" /></div>
							<div className="form-group"><label>Fin</label><input className="form-input" type="time" defaultValue="07:00" /></div>
						</div>
						<div className="days-card">
							<div className="days-title">Jours actifs</div>
							<div className="days-wrap">
								{days.map(day => (
									<button key={day} type="button" className={`day-chip ${activeDays.includes(day) ? 'active-day' : ''}`} onClick={() => toggleDay(day)}>{day}</button>
								))}
							</div>
						</div>
						<div className="email-summary">
							<div className="days-title">Résumé par email</div>
							<div className="notif-row compact-row">
								<div><div className="notif-label">Fréquence</div></div>
								<select className="form-select"><option>Quotidien</option><option>Hebdomadaire</option><option>Mensuel</option></select>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`tab-panel ${tab === 'abonnement' ? 'active' : ''}`}>
				<div className="plan-layout">
					{plans.map(plan => (
						<div key={plan.name} className={`plan-card ${plan.current ? 'current' : ''} ${plan.popular ? 'popular' : ''}`}>
							{plan.badge && <div className={plan.current ? 'plan-current-badge' : 'plan-popular-badge'}>{plan.current ? '✓ ' : '⚡ '}{plan.badge}</div>}
							<div className="plan-icon">{plan.icon}</div>
							<div className="plan-name">{plan.name}</div>
							<div className="plan-price">{plan.price} {plan.currency && <span>{plan.currency}</span>}</div>
							{plan.features.map(feature => (
								<div key={feature[2]} className={`plan-feature ${feature[1] ? 'yes' : ''}`}>
									<div className={`feat-dot ${feature[1] ? 'feat-yes' : 'feat-no'}`}>{feature[0]}</div>
									{feature[2]}
								</div>
							))}
							<button className={`btn-plan ${plan.current ? 'btn-plan-outline' : plan.popular ? 'btn-plan-cyan' : 'btn-plan-solid'}`} type="button">
								{plan.current ? 'Plan actuel' : plan.name === 'Établissement' ? 'Nous contacter' : 'Passer à Pro'}
							</button>
						</div>
					))}
				</div>

				<div className="usage-bar-section">
					<div className="usage-title">📊 Utilisation actuelle (Plan Gratuit)</div>
					{planUsage.map(item => (
						<div key={item.label} className="usage-row">
							<span className="usage-label">{item.label}</span>
							<div className="usage-track"><div className={`usage-fill uf-${item.tone[0]}`} style={{ width: `${item.percent}%` }} /></div>
							<span className="usage-pct">{item.value}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}