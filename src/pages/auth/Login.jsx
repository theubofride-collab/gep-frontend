import BrandLogo from '../../components/BrandLogo'

export default function Login() {
	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'grid',
				placeItems: 'center',
				padding: 24,
				background: 'linear-gradient(135deg, #0f172a 0%, #111827 45%, #0f766e 100%)',
				color: '#e5e7eb',
			}}
		>
			<div
				style={{
					width: '100%',
					maxWidth: 420,
					background: 'rgba(15, 23, 42, 0.86)',
					border: '1px solid rgba(148, 163, 184, 0.18)',
					borderRadius: 20,
					padding: 28,
					boxShadow: '0 24px 80px rgba(0, 0, 0, 0.35)',
					backdropFilter: 'blur(14px)',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
					<BrandLogo size={40} radius={12} fontSize={17} />
					<div>
						<div style={{ display: 'flex', alignItems: 'baseline', gap: 4, lineHeight: 1 }}>
							<span style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>GEP</span>
							<span style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', letterSpacing: 0.4 }}>Nebular</span>
						</div>
						<p style={{ margin: '6px 0 0', fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase', color: '#5eead4' }}>
							Accès administrateur
						</p>
					</div>
				</div>
				<h1 style={{ margin: '10px 0 8px', fontSize: 30, lineHeight: 1.1, color: '#fff' }}>
					Connexion
				</h1>
				<p style={{ margin: '0 0 24px', color: '#cbd5e1', lineHeight: 1.5 }}>
					Accédez à l'espace administratif de la plateforme.
				</p>

				<form style={{ display: 'grid', gap: 14 }}>
					<label style={{ display: 'grid', gap: 8 }}>
						<span style={{ fontSize: 14, color: '#cbd5e1' }}>Email</span>
						<input
							type="email"
							placeholder="contact@ecole.fr"
							style={{
								height: 46,
								borderRadius: 12,
								border: '1px solid rgba(148, 163, 184, 0.22)',
								background: 'rgba(15, 23, 42, 0.72)',
								color: '#fff',
								padding: '0 14px',
								outline: 'none',
							}}
						/>
					</label>

					<label style={{ display: 'grid', gap: 8 }}>
						<span style={{ fontSize: 14, color: '#cbd5e1' }}>Mot de passe</span>
						<input
							type="password"
							placeholder="••••••••"
							style={{
								height: 46,
								borderRadius: 12,
								border: '1px solid rgba(148, 163, 184, 0.22)',
								background: 'rgba(15, 23, 42, 0.72)',
								color: '#fff',
								padding: '0 14px',
								outline: 'none',
							}}
						/>
					</label>

					<button
						type="button"
						style={{
							height: 48,
							marginTop: 6,
							border: 0,
							borderRadius: 12,
							background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
							color: '#fff',
							fontWeight: 700,
							cursor: 'pointer',
						}}
					>
						Se connecter
					</button>
				</form>
			</div>
		</div>
	)
}
