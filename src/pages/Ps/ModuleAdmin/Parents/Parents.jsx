import { useEffect, useMemo, useState } from 'react'
import './Parents.css'

const STATUSES = ['Actif', 'Inactif', 'En attente']
const CLASSES = ['Classe 01', 'Classe 02', 'Classe 03', 'Classe 04']

const PARENTS = [
  { id: 'P-001', name: 'Famille Touré', email: 'famille.toure@example.com', phone: '05 45 22 11 09', children: ['Awa T. · CE2', 'Moussa T. · CM1'], classes: ['Classe 01', 'Classe 02'], status: 'Actif', access: 'Portail actif' },
  { id: 'P-002', name: 'Famille Kone', email: 'famille.kone@example.com', phone: '07 33 01 41 77', children: ['Mariam K. · 6e'], classes: ['Classe 03'], status: 'En attente', access: 'Invitation envoyée' },
  { id: 'P-003', name: 'Famille Kouadio', email: 'famille.kouadio@example.com', phone: '01 88 19 04 35', children: ['Joël K. · 4e', 'Nadia K. · 2nde', 'Sara K. · 5e'], classes: ['Classe 01', 'Classe 04'], status: 'Actif', access: 'Portail actif' },
  { id: 'P-004', name: 'Famille N’Dri', email: 'famille.ndri@example.com', phone: '05 12 30 92 11', children: ['Aminata N. · CE1', 'Ibrahim N. · CP'], classes: ['Classe 02'], status: 'Actif', access: 'Portail actif' },
  { id: 'P-005', name: 'Famille Bamba', email: 'famille.bamba@example.com', phone: '06 41 19 02 55', children: ['Koffi B. · CM2'], classes: ['Classe 03'], status: 'Inactif', access: 'Compte suspendu' },
  { id: 'P-006', name: 'Famille Koné', email: 'famille.kone2@example.com', phone: '05 74 90 13 22', children: ['Hawa K. · 3e'], classes: ['Classe 04'], status: 'En attente', access: 'Vérification requise' },
]

const MESSAGES = [
  { initials: 'AT', name: 'Mme Adjoa T.', text: 'Demande de confirmation pour la réunion de classe de CE2.', time: 'Il y a 12 min', unread: true },
  { initials: 'MK', name: 'M. Koffi', text: 'Merci pour la note partagée concernant les paiements du trimestre.', time: 'Il y a 1 h', unread: false },
  { initials: 'SN', name: 'Mme S. N’Guessan', text: 'J’ai besoin du relevé de présence pour la semaine dernière.', time: 'Hier', unread: true },
]

const EVENTS = [
  { day: '18', month: 'Juin', title: 'Réunion parents-professeurs', sub: 'Salle polyvalente · 16h30' },
  { day: '22', month: 'Juin', title: 'Relance paiements', sub: 'Envoi automatique · 08h00' },
  { day: '28', month: 'Juin', title: 'Journée portes ouvertes', sub: 'Cour de l’école · 09h00' },
]

function statusClass(status) {
  if (status === 'Actif') return 'status-actif'
  if (status === 'Inactif') return 'status-inactif'
  return 'status-attente'
}

function familyAvatar(name) {
  return name
    .split(' ')
    .slice(1, 3)
    .map(part => part[0] || '')
    .join('')
    .toUpperCase() || 'PF'
}

export default function Parents() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tous les statuts')
  const [classFilter, setClassFilter] = useState('Toutes les classes')

  useEffect(() => {
    document.title = 'Gep Nebula — Parents'
  }, [])

  const stats = useMemo(() => ({
    total: PARENTS.length,
    active: PARENTS.filter(parent => parent.status === 'Actif').length,
    unread: 34,
    meetings: 12,
  }), [])

  const filteredParents = useMemo(() => {
    const query = search.trim().toLowerCase()
    return PARENTS.filter(parent => {
      if (statusFilter !== 'Tous les statuts') {
        if (statusFilter === 'Actifs' && parent.status !== 'Actif') return false
        if (statusFilter === 'Inactifs' && parent.status !== 'Inactif') return false
        if (statusFilter === 'En attente' && parent.status !== 'En attente') return false
      }
      if (classFilter !== 'Toutes les classes' && !parent.classes.includes(classFilter)) return false
      if (!query) return true
      return [parent.name, parent.email, parent.phone, parent.children.join(' '), parent.status, parent.access].join(' ').toLowerCase().includes(query)
    })
  }, [classFilter, search, statusFilter])

  return (
    <div className="parents-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">👨‍👩‍👧 Gestion des Parents</h1>
          <p className="page-subtitle">Répertoire, communications et suivi parental</p>
        </div>
        <div className="header-actions">
          <button className="btn-sec" type="button">📨 Message</button>
          <button className="btn-prim" type="button">＋ Ajouter un parent</button>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-card"><div className="stat-label">Total Parents</div><div className="stat-value">{stats.total}</div><span className="stat-badge badge-green">▲ +14 ce mois</span></div>
        <div className="stat-card"><div className="stat-label">Comptes Actifs</div><div className="stat-value">{stats.active}</div><span className="stat-badge badge-green">87%</span></div>
        <div className="stat-card"><div className="stat-label">Messages Non Lus</div><div className="stat-value">{stats.unread}</div><span className="stat-badge badge-red">▲ +8 aujourd'hui</span></div>
        <div className="stat-card"><div className="stat-label">Réunions Planifiées</div><div className="stat-value">{stats.meetings}</div><span className="stat-badge badge-blue">cette semaine</span></div>
      </div>

      <div className="grid-2col">
        <div>
          <div className="toolbar">
            <button className="btn-primary" type="button">+ Ajouter un parent</button>
            <button className="btn-secondary" type="button">⬇ Exporter</button>
            <select className="filter-select" value={statusFilter} onChange={event => setStatusFilter(event.target.value)}>
              <option>Tous les statuts</option>
              <option>Actifs</option>
              <option>Inactifs</option>
              <option>En attente</option>
            </select>
            <select className="filter-select" value={classFilter} onChange={event => setClassFilter(event.target.value)}>
              <option>Toutes les classes</option>
              {CLASSES.map(className => <option key={className}>{className}</option>)}
            </select>
            <input className="search-inline ml-auto" type="text" placeholder="🔍 Rechercher un parent..." value={search} onChange={event => setSearch(event.target.value)} />
          </div>

          <div className="card parents-table-card">
            <div className="card-header">
              <span className="card-title">📋 Liste des Parents</span>
              <span className="view-all">Voir tout</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '28px' }} />
                    <th>Parent</th>
                    <th>ID</th>
                    <th>Téléphone</th>
                    <th>Enfants inscrits</th>
                    <th>Statut</th>
                    <th>Accès portail</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParents.map((parent, index) => (
                    <tr key={parent.id}>
                      <td><div className={`checkbox ${index === 0 ? 'checked' : ''}`}>{index === 0 ? '✓' : ''}</div></td>
                      <td>
                        <div className="parent-cell">
                          <div className="par-avatar">{familyAvatar(parent.name)}</div>
                          <div>
                            <div className="par-name">{parent.name}</div>
                            <div className="par-email">{parent.email}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="id-badge">{parent.id}</span></td>
                      <td>{parent.phone}</td>
                      <td>
                        <div className="enfants-cell">
                          {parent.children.map(child => <span key={child} className="enfant-tag">{child}</span>)}
                        </div>
                      </td>
                      <td><span className={`status-badge ${statusClass(parent.status)}`}>{parent.status}</span></td>
                      <td>{parent.access}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          <button className="action-btn" type="button">Message</button>
                          <button className="action-btn" type="button">Profil</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <div>Affichage de 1 à {filteredParents.length} sur {PARENTS.length}</div>
              <div className="page-btns">
                <button className="page-btn" type="button">‹</button>
                <button className="page-btn active" type="button">1</button>
                <button className="page-btn" type="button">2</button>
                <button className="page-btn" type="button">›</button>
              </div>
            </div>
          </div>
        </div>

        <div className="right-col">
          <div className="panel-card">
            <div className="panel-title">Messages récents</div>
            {MESSAGES.map(message => (
              <div key={message.name} className="msg-item">
                <div className="msg-avatar">{message.initials}</div>
                <div className="msg-body">
                  <div className="msg-name">{message.name}</div>
                  <div className="msg-text">{message.text}</div>
                  <div className="msg-time">{message.time}</div>
                </div>
                {message.unread && <div className="msg-unread" />}
              </div>
            ))}
          </div>

          <div className="panel-card">
            <div className="panel-title">Événements à venir</div>
            {EVENTS.map(event => (
              <div key={event.title} className="event-item">
                <div className="event-date">
                  <div className="event-day">{event.day}</div>
                  <div className="event-month">{event.month}</div>
                </div>
                <div>
                  <div className="event-title">{event.title}</div>
                  <div className="event-sub">{event.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
