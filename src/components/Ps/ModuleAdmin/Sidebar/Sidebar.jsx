import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const nav = [
  { to: '/admin/dashboard', icon: '⊞', label: 'Tableau de bord' },
  { to: '/admin/eleves', icon: '👤', label: 'Élèves' },
  { to: '/admin/enseignants', icon: '🎓', label: 'Enseignants' },
  { to: '/admin/parents', icon: '👨‍👩‍👧', label: 'Parents' },
  { to: '/admin/compte', icon: '💳', label: 'Compte' },
  { to: '/admin/classes', icon: '🏫', label: 'Classes' },
  { to: '/admin/examens', icon: '📝', label: 'Examens' },
  { to: '/admin/transport', icon: '🚌', label: 'Transport' },
  { to: '/admin/annonces', icon: '📢', label: 'Annonces' },
  { to: '/admin/types-paiement', icon: '💳', label: 'Types de paiement' },
  { to: '/admin/parametres', icon: '⚙️', label: 'Paramètres' },
  { to: '/admin/sauvegardes', icon: '🗄️', label: 'Sauvegardes' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div className="brand-name">Nebula GEP</div>
          <div className="brand-role">Administrateur</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {nav.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
