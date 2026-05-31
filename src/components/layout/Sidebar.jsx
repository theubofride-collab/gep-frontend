import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">G</div>
        <div>
          <div className="sidebar-logo-title">GEP <span style={{color:'#06B6D4'}}>Nebula</span></div>
          <div className="sidebar-logo-sub">Espace administratif</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({isActive})=>`sidebar-link ${isActive?'active':''}`}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <span>Tableau de bord</span>
        </NavLink>

        <div className="sidebar-section">Discipline</div>
        <NavLink to="/discipline/incidents" className={({isActive})=>`sidebar-link ${isActive?'active':''}`}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span>Incidents</span>
        </NavLink>
        <NavLink to="/discipline/sanctions" className={({isActive})=>`sidebar-link ${isActive?'active':''}`}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>Sanctions</span>
        </NavLink>

        <div className="sidebar-section">Notes</div>
        <NavLink to="/notes/saisie" className={({isActive})=>`sidebar-link ${isActive?'active':''}`}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>Saisie des notes</span>
        </NavLink>
        <NavLink to="/notes/consulter" className={({isActive})=>`sidebar-link ${isActive?'active':''}`}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          <span>Consulter</span>
        </NavLink>
        <NavLink to="/notes/bulletins" className={({isActive})=>`sidebar-link ${isActive?'active':''}`}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>Bulletins</span>
        </NavLink>
        <NavLink to="/notes/moyennes" className={({isActive})=>`sidebar-link ${isActive?'active':''}`}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          <span>Moyennes</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{user?.prenom?.[0]}{user?.nom?.[0]}</div>
          <div>
            <div className="sidebar-user-name">{user?.prenom} {user?.nom}</div>
            <div className="sidebar-user-role">{user?.role==='ADMIN'?'Administrateur':user?.role==='SECRETAIRE'?'Secrétaire':'Enseignant'}</div>
          </div>
        </div>
        <button className="sidebar-logout" onClick={handleLogout} title="Déconnexion">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </aside>
  );
}
