import { useState, useRef } from 'react';
import './Discipline.css';

const getInitiales = (nom) => nom.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);

const INCIDENTS = [
  { id:1, nom:'Diallo Aïcha', matricule:'EP-2024-001', classe:'CM2-A', type:'Retard', gravite:'Faible', date:'12/04/2026 08:15', statut:'Traité' },
  { id:2, nom:'Sow Mamadou', matricule:'EP-2024-002', classe:'CM1-B', type:'Violence', gravite:'Grave', date:'18/04/2026 10:45', statut:'En cours' },
  { id:3, nom:'Ndiaye Fatou', matricule:'EP-2024-003', classe:'CE2-A', type:'Absence répétée', gravite:'Moyenne', date:'20/04/2026 08:00', statut:'En cours' },
  { id:4, nom:'Ba Ibrahima', matricule:'EP-2024-004', classe:'CM2-A', type:'Non-respect du règlement', gravite:'Moyenne', date:'22/04/2026 14:20', statut:'Traité' },
  { id:5, nom:'Faye Awa', matricule:'EP-2024-005', classe:'CE1-C', type:'Retard', gravite:'Faible', date:'25/04/2026 08:10', statut:'En cours' },
  { id:6, nom:'Sarr Ousmane', matricule:'EP-2024-006', classe:'CM1-A', type:'Violence', gravite:'Grave', date:'29/04/2026 11:00', statut:'En cours' },
];

const PER_PAGE = 4;

export default function IncidentsList() {
  const [search, setSearch] = useState('');
  const [eleve, setEleve] = useState('');
  const [gravite, setGravite] = useState('');
  const [statut, setStatut] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ eleve:'', type:'', gravite:'', description:'' });
  const [photoMap, setPhotoMap] = useState({});
  const fileRefs = useRef({});

  const filtered = INCIDENTS.filter(i => {
    const s = search.toLowerCase();
    return (!search || i.nom.toLowerCase().includes(s) || i.matricule.toLowerCase().includes(s) || i.type.toLowerCase().includes(s))
      && (!eleve || i.nom.toLowerCase().includes(eleve.toLowerCase()))
      && (!gravite || i.gravite === gravite)
      && (!statut || i.statut === statut);
  });

  const total = Math.ceil(filtered.length / PER_PAGE);
  const items = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);
  const reset = () => { setSearch(''); setEleve(''); setGravite(''); setStatut(''); setDateDebut(''); setDateFin(''); setPage(1); };
  const badgeGravite = g => g==='Grave'?'badge badge-grave':g==='Moyenne'?'badge badge-moyenne':'badge badge-faible';
  const badgeStatut = s => s==='Traité'?'badge badge-traite':'badge badge-encours';
  const handlePhoto = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoMap(prev => ({...prev, [id]: URL.createObjectURL(file)}));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion de la discipline</h1>
          <p className="page-sub">Liste des incidents signalés au sein de l'établissement.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Nouvel incident</button>
      </div>

      <div className="card mb-18">
        <div className="filters-row">
          <div className="filter-group fg-2">
            <label>Recherche</label>
            <div className="input-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input className="finput" placeholder="Nom, matricule, description..." value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} />
            </div>
          </div>
          <div className="filter-group fg-2">
            <label>Élève</label>
            <div className="input-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input className="finput" placeholder="Tous les élèves" value={eleve} onChange={e=>{setEleve(e.target.value);setPage(1);}} />
            </div>
          </div>
          <div className="filter-group">
            <label>Gravité</label>
            <select className="fselect" value={gravite} onChange={e=>{setGravite(e.target.value);setPage(1);}}>
              <option value="">Toutes</option><option>Faible</option><option>Moyenne</option><option>Grave</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Statut</label>
            <select className="fselect" value={statut} onChange={e=>{setStatut(e.target.value);setPage(1);}}>
              <option value="">Tous</option><option>Traité</option><option>En cours</option>
            </select>
          </div>
        </div>
        <div className="filters-row mt-12">
          <div className="filter-group"><label>Du</label><input type="date" className="finput" value={dateDebut} onChange={e=>setDateDebut(e.target.value)} /></div>
          <div className="filter-group"><label>Au</label><input type="date" className="finput" value={dateFin} onChange={e=>setDateFin(e.target.value)} /></div>
          <button className="btn-reset" onClick={reset}>Réinitialiser les filtres</button>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Élève</th><th>Type d'incident</th><th>Gravité</th>
                <th>Date</th><th>Statut</th><th style={{textAlign:'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan={6} className="empty">Aucun incident trouvé.</td></tr>
              ) : items.map(inc => (
                <tr key={inc.id}>
                  <td>
                    <div className="eleve-cell">
                      <div className="avatar" onClick={() => fileRefs.current[inc.id]?.click()} title="Cliquer pour ajouter une photo" style={{cursor:'pointer'}}>
                        {photoMap[inc.id] ? <img src={photoMap[inc.id]} alt={inc.nom} /> : getInitiales(inc.nom)}
                      </div>
                      <input type="file" accept="image/*" style={{display:'none'}} ref={el => fileRefs.current[inc.id] = el} onChange={e => handlePhoto(inc.id, e)} />
                      <div>
                        <div className="cell-name">{inc.nom}</div>
                        <div className="cell-sub">{inc.matricule} · {inc.classe}</div>
                      </div>
                    </div>
                  </td>
                  <td>{inc.type}</td>
                  <td><span className={badgeGravite(inc.gravite)}>{inc.gravite}</span></td>
                  <td>{inc.date}</td>
                  <td><span className={badgeStatut(inc.statut)}>{inc.statut}</span></td>
                  <td>
                    <div className="actions">
                      <button className="icon-btn view" title="Voir"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                      <button className="icon-btn edit" title="Modifier"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                      <button className="icon-btn del" title="Supprimer"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-foot">
          <span>{filtered.length} incident(s) — page {page} / {total||1}</span>
          <div className="pagination">
            <button className="pg-btn" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>‹ Previous</button>
            {Array.from({length:total},(_,i)=>i+1).map(p=>(
              <button key={p} className={`pg-btn${page===p?' active':''}`} onClick={()=>setPage(p)}>{p}</button>
            ))}
            <button className="pg-btn" onClick={()=>setPage(p=>Math.min(total,p+1))} disabled={page===total||total===0}>Next ›</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <h2>Nouvel incident</h2>
              <button className="modal-close" onClick={()=>setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="fgroup"><label>Élève</label><input className="finput" placeholder="Nom ou matricule..." value={form.eleve} onChange={e=>setForm({...form,eleve:e.target.value})} /></div>
              <div className="fgroup"><label>Type d'incident</label><select className="fselect" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="">Sélectionner...</option><option>Retard</option><option>Violence</option><option>Absence répétée</option><option>Non-respect du règlement</option><option>Autre</option></select></div>
              <div className="fgroup"><label>Gravité</label><select className="fselect" value={form.gravite} onChange={e=>setForm({...form,gravite:e.target.value})}><option value="">Sélectionner...</option><option>Faible</option><option>Moyenne</option><option>Grave</option></select></div>
              <div className="fgroup"><label>Description</label><textarea className="finput ftextarea" placeholder="Décrivez l'incident..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></div>
            </div>
            <div className="modal-foot">
              <button className="btn-outline" onClick={()=>setShowModal(false)}>Annuler</button>
              <button className="btn-primary">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
