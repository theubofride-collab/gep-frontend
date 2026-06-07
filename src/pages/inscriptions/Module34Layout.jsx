import { Link, NavLink } from 'react-router-dom'
import BrandLogo from '../../components/ui/BrandLogo'
import './module34.css'

const NAV_GROUPS = [
  {
    label: 'Principal',
    items: [
      { label: 'Inscriptions', icon: '📋', to: '/inscriptions' },
      { label: 'Nouvelle inscription', icon: '＋', to: '/inscriptions/create' },
    ],
  },
]

function renderBreadcrumb(breadcrumb) {
  if (!breadcrumb?.length) return null

  return breadcrumb.map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 ? <span> &rsaquo; </span> : null}
      {index === breadcrumb.length - 1 ? <strong>{part}</strong> : part}
    </span>
  ))
}

export default function Module34Layout({ breadcrumb, backTo, children }) {
  return (
    <div className="module34-shell">
      <aside className="module34-sidebar">
        <div className="module34-logo">
          <BrandLogo size={36} radius={10} fontSize={15} />
          <div>
            <div className="module34-brand-name"><span className="module34-brand-main">GEP</span> <span className="module34-brand-accent">Nebular</span></div>
            <div className="module34-brand-role">Module 3.4</div>
          </div>
        </div>

        {NAV_GROUPS.map(group => (
          <div key={group.label} className="module34-nav-group">
            <div className="module34-nav-label">{group.label}</div>
            {group.items.map(item => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `module34-nav-link${isActive ? ' active' : ''}`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </aside>

      <div className="module34-main">
        <header className="module34-topbar">
          {backTo ? (
            <Link className="module34-back-btn" to={backTo}>← Retour</Link>
          ) : null}
          <div className="module34-breadcrumb">{renderBreadcrumb(breadcrumb)}</div>
          <div className="module34-top-actions">
            <div className="module34-avatar-pill">
              <div className="module34-avatar">SM</div>
              <div>
                <div className="module34-avatar-name">Sophie M.</div>
                <div className="module34-avatar-role">Secrétaire</div>
              </div>
            </div>
          </div>
        </header>

        <main className="module34-content">{children}</main>
      </div>
    </div>
  )
}
