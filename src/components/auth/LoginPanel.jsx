export default function LoginPanel({
	userType,
	onUserTypeChange,
	email,
	onEmailChange,
	password,
	onPasswordChange,
	matricule,
	onMatriculeChange,
	showPassword,
	onToggleShowPassword,
	isLoading,
	feedback,
	onSubmit,
}) {
	return (
		<section className="login-panel">
			<div className="login-panel-inner">
				<div className="login-panel-header">
					<div className="login-panel-heading">
						<span className="login-panel-eyebrow">Portail Nebula</span>
						<span className="login-panel-chip">Accès sécurisé</span>
						<h2>Accédez à votre espace de gestion</h2>
						<p>Connectez-vous pour piloter vos opérations et suivre vos données depuis un seul tableau de bord.</p>
					</div>
				</div>

				<label className="login-parent-check">
					<input
						type="checkbox"
						checked={userType === 'parent'}
						onChange={(e) => onUserTypeChange(e.target.checked ? 'parent' : 'staff')}
					/>
					<span>Je suis un parent</span>
				</label>

				<form className="login-form" onSubmit={onSubmit}>
					{userType === 'staff' && (
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

					<label className="login-field">
						<span>Mot de passe</span>
						<div className="login-input-wrap">
							<span className="login-input-icon" aria-hidden="true">🔒</span>
							<input
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={event => onPasswordChange(event.target.value)}
								placeholder="••••••••"
								autoComplete="current-password"
							/>
							<button
								type="button"
								className="login-password-toggle"
								onClick={onToggleShowPassword}
							>
								{showPassword ? 'Masquer' : 'Afficher'}
							</button>
						</div>
					</label>

					<div className="login-form-meta">
						<label className="login-remember">
							<input type="checkbox" defaultChecked />
							<span>Se souvenir de moi</span>
						</label>
						<button type="button" className="login-link">Mot de passe oublié ?</button>
					</div>

					<button className="login-submit" type="submit" disabled={isLoading}>
						{isLoading ? 'Connexion en cours...' : 'Se connecter'}
					</button>

					{feedback?.message && (
						<div className={`login-feedback ${feedback.type === 'error' ? 'is-error' : 'is-warning'}`}>
							{feedback.message}
						</div>
					)}
				</form>
			</div>
		</section>
	)
}
