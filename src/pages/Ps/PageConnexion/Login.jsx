import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginHero from '../../../components/Ps/PageConnexion/LoginHero'
import LoginPanel from '../../../components/Ps/PageConnexion/LoginPanel'
import { highlights, metrics, roles, rolesWithMatricule } from '../../../components/Ps/PageConnexion/loginData'
import './Login.css'

export default function Login() {
	const navigate = useNavigate()
	const [activeRole, setActiveRole] = useState('parent')
	const [email, setEmail] = useState('')
	const [matricule, setMatricule] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		document.title = 'Gep Nebula — Connexion'
	}, [])

	function handleSubmit(event) {
		event.preventDefault()
		if (!email.trim() || !password.trim()) return
		if (rolesWithMatricule.has(activeRole) && !matricule.trim()) return
		navigate('/admin/dashboard')
	}

	return (
		<div className="login-page">
			<div className="login-orb login-orb-one" />
			<div className="login-orb login-orb-two" />
			<div className="login-grid">
				<LoginHero highlights={highlights} metrics={metrics} />

				<LoginPanel
					roles={roles}
					rolesWithMatricule={rolesWithMatricule}
					activeRole={activeRole}
					onRoleChange={setActiveRole}
					email={email}
					onEmailChange={setEmail}
					matricule={matricule}
					onMatriculeChange={setMatricule}
					password={password}
					onPasswordChange={setPassword}
					onSubmit={handleSubmit}
				/>
			</div>
		</div>
	)
}
