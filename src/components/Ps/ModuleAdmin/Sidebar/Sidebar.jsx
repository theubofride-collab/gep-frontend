import { NavLink } from 'react-router-dom'
import BrandLogo from '../../../BrandLogo'
import './Sidebar.css'

const nav = [
  { to: '/admin/dashboard', icon: '⊞', label: 'Tableau de bord' },
  { to: '/paiements', icon: '💳', label: 'Paiements' },
  { to: '/admin/eleves', icon: '👤', label: 'Élèves' },
  { to: '/admin/enseignants', icon: '🎓', label: 'Enseignants' },
  { to: '/admin/parents', icon: '👨‍👩‍👧', label: 'Parents' },
  { to: '/admin/compte', icon: '💳', label: 'Compte' },
  { to: '/admin/classes', icon: '🏫', label: 'Classes' },
  { to: '/admin/examens', icon: '📝', label: 'Examens' },
  { to: '/admin/transport', icon: '🚌', label: 'Transport' },
  { to: '/admin/annonces', icon: '📢', label: 'Annonces' },
  { to: '/admin/parametres', icon: '⚙️', label: 'Paramètres' },
  { to: '/admin/sauvegardes', icon: '🗄️', label: 'Sauvegardes' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <BrandLogo />
        <div>
          <div className="brand-name"><span className="brand-name-main">GEP</span> <span className="brand-name-accent">Nebular</span></div>
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
