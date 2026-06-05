import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginHero from '../../../components/Ps/PageConnexion/LoginHero'
import LoginPanel from '../../../components/Ps/PageConnexion/LoginPanel'
import { highlights, metrics } from '../../../components/Ps/PageConnexion/loginData'
import './Login.css'

export default function Login() {
	const navigate = useNavigate()
	const [userType, setUserType] = useState('staff')
	const [email, setEmail] = useState('')
	const [matricule, setMatricule] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [feedback, setFeedback] = useState({ type: '', message: '' })
	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		document.title = 'Gep Nebula — Connexion'
	}, [])

	async function handleSubmit(event) {
		event.preventDefault()
		if (isLoading) return

		if (!email.trim() || !password.trim()) {
			setFeedback({
				type: 'warning',
				message: 'Veuillez remplir votre email et votre mot de passe avant de continuer.',
			})
			return
		}

		setFeedback({ type: '', message: '' })
		setIsLoading(true)

		await new Promise(resolve => setTimeout(resolve, 900))

		if (password !== 'nebula2026') {
			setIsLoading(false)
			setFeedback({
				type: 'error',
				message: 'Mot de passe incorrect. Vérifiez vos identifiants puis réessayez.',
			})
			return
		}

		setIsLoading(false)
		navigate('/admin/dashboard')
	}

	return (
		<div className="login-page">
			<div className="login-orb login-orb-one" />
			<div className="login-orb login-orb-two" />
			<div className="login-grid">
				<LoginHero highlights={highlights} metrics={metrics} />

				<LoginPanel
					userType={userType}
					onUserTypeChange={setUserType}
					email={email}
					onEmailChange={value => {
						setEmail(value)
						if (feedback.message) setFeedback({ type: '', message: '' })
					}}
					matricule={matricule}
					onMatriculeChange={value => {
						setMatricule(value)
						if (feedback.message) setFeedback({ type: '', message: '' })
					}}
					password={password}
					onPasswordChange={value => {
						setPassword(value)
						if (feedback.message) setFeedback({ type: '', message: '' })
					}}
					showPassword={showPassword}
					onToggleShowPassword={() => setShowPassword(prev => !prev)}
					isLoading={isLoading}
					feedback={feedback}
					onSubmit={handleSubmit}
				/>
			</div>
		</div>
	)
}
