export default function LoginPanel({
	roles,
	rolesWithMatricule,
	activeRole,
	onRoleChange,
	email,
	onEmailChange,
	matricule,
	onMatriculeChange,
	password,
	onPasswordChange,
	onSubmit,
}) {
	return (
		<section className="login-panel">
			<div className="login-panel-inner">
				<div className="login-panel-header">
					<div>
						<h2>Connexion</h2>
						<p>Choisissez votre profil puis entrez vos identifiants.</p>
					</div>
					<span className="login-panel-chip">Accès sécurisé</span>
				</div>

				<div className="login-role-grid" aria-label="Sélection du rôle">
					{roles.map(role => (
						<button
							key={role.id}
							type="button"
							className={`login-role ${activeRole === role.id ? 'is-active' : ''}`}
							onClick={() => onRoleChange(role.id)}
						>
							<span className="login-role-icon" aria-hidden="true">{role.icon}</span>
							<span>{role.label}</span>
						</button>
					))}
				</div>

				<form className="login-form" onSubmit={onSubmit}>
					<label className="login-field">
						<span>Email</span>
						<div className="login-input-wrap">
							<span className="login-input-icon" aria-hidden="true">@</span>
							<input
								type="email"
								value={email}
								onChange={event => onEmailChange(event.target.value)}
								placeholder="contact@ecole.fr"
								autoComplete="email"
							/>
						</div>
					</label>

					{rolesWithMatricule.has(activeRole) && (
						<label className="login-field">
							<span>Matricule</span>
							<div className="login-input-wrap">
								<span className="login-input-icon" aria-hidden="true">#</span>
								<input
									type="text"
									value={matricule}
									onChange={event => onMatriculeChange(event.target.value)}
									placeholder="MAT-2026-001"
									autoComplete="off"
								/>
							</div>
						</label>
					)}

					<label className="login-field">
						<span>Mot de passe</span>
						<div className="login-input-wrap">
							<span className="login-input-icon" aria-hidden="true">🔒</span>
							<input
								type="password"
								value={password}
								onChange={event => onPasswordChange(event.target.value)}
								placeholder="••••••••"
								autoComplete="current-password"
							/>
						</div>
					</label>

					<div className="login-form-meta">
						<label className="login-remember">
							<input type="checkbox" defaultChecked />
							<span>Se souvenir de moi</span>
						</label>
						<button type="button" className="login-link">Mot de passe oublié ?</button>
					</div>

					<button className="login-submit" type="submit">
						Se connecter
					</button>
				</form>

				<div className="login-footer-note">
					Connexion disponible pour le profil <strong>{roles.find(role => role.id === activeRole)?.label}</strong>.
				</div>
			</div>
		</section>
	)
}
