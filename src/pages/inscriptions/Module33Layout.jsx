import { NavLink, Link } from 'react-router-dom'
import BrandLogo from '../../components/ui/BrandLogo'
import './module33.css'

const NAV_GROUPS = [
  {
    label: 'Principal',
    items: [
      { label: 'Élèves', icon: '👦', to: '/eleves' },
      { label: 'Nouvel élève', icon: '＋', to: '/eleves/create' },
    ],
  },
]

function renderBreadcrumb(breadcrumb) {
  if (!breadcrumb || breadcrumb.length === 0) return null

  return breadcrumb.map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 ? <span> &rsaquo; </span> : null}
      {index === breadcrumb.length - 1 ? <strong>{part}</strong> : part}
    </span>
  ))
}

export default function Module33Layout({ breadcrumb, backTo, children }) {
  return (
    <div className="module33-shell">
      <aside className="module33-sidebar">
        <div className="module33-logo">
          <BrandLogo size={36} radius={10} fontSize={15} />
          <div>
            <div className="module33-brand-name"><span className="module33-brand-main">GEP</span> <span className="module33-brand-accent">Nebular</span></div>
            <div className="module33-brand-role">Module 3.3</div>
          </div>
        </div>

        {NAV_GROUPS.map(group => (
          <div key={group.label} className="module33-nav-group">
            <div className="module33-nav-label">{group.label}</div>
            {group.items.map(item => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `module33-nav-link${isActive ? ' active' : ''}`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </aside>

      <div className="module33-main">
        <header className="module33-topbar">
          {backTo ? (
            <Link className="module33-back-btn" to={backTo}>
              ← Retour
            </Link>
          ) : null}
          <div className="module33-breadcrumb">{renderBreadcrumb(breadcrumb)}</div>
          <div className="module33-top-actions">
            <div className="module33-avatar-pill">
              <div className="module33-avatar">SM</div>
              <div>
                <div className="module33-avatar-name">Sophie M.</div>
                <div className="module33-avatar-role">Secrétaire</div>
              </div>
            </div>
          </div>
        </header>

        <main className="module33-content">{children}</main>
      </div>
    </div>
  )
}
