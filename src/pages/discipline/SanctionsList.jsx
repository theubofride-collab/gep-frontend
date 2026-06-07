import { useState, useRef } from 'react';
import './Discipline.css';

const getInitiales = (nom) => nom.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);

const SANCTIONS = [
  { id:1, nom:'Diallo Aïcha', matricule:'EP-2024-001', incident:'Retard', sanction:'Avertissement écrit pour retard', type:'Avertissement', dateDebut:'12/04/2026', dateFin:null, statut:'Terminée' },
  { id:2, nom:'Sow Mamadou', matricule:'EP-2024-002', incident:'Violence', sanction:'Exclusion temporaire 3 jours', type:'Exclusion temporaire', dateDebut:'19/04/2026', dateFin:'22/04/2026', statut:'Terminée' },
  { id:3, nom:'Ba Ibrahima', matricule:'EP-2024-004', incident:'Non-respect du règlement', sanction:'Retenue mercredi après-midi', type:'Retenue', dateDebut:'24/04/2026', dateFin:'24/04/2026', statut:'Terminée' },
  { id:4, nom:'Sarr Ousmane', matricule:'EP-2024-006', incident:'Violence', sanction:'Avertissement disciplinaire', type:'Avertissement', dateDebut:'29/04/2026', dateFin:null, statut:'En cours' },
];

export default function SanctionsList() {
  const [eleve, setEleve] = useState('');
  const [type, setType] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ incident:'', type:'', description:'', dateDebut:'', dateFin:'' });
  const [photoMap, setPhotoMap] = useState({});
  const fileRefs = useRef({});

  const filtered = SANCTIONS.filter(s =>
    (!eleve || s.nom.toLowerCase().includes(eleve.toLowerCase())) &&
    (!type || s.type === type)
  );

  const reset = () => { setEleve(''); setType(''); setDateDebut(''); setDateFin(''); };
  const getPeriode = s => s.dateFin && s.dateFin!==s.dateDebut ? `${s.dateDebut} → ${s.dateFin}` : s.dateDebut;
  const badgeStatut = s => s==='Terminée'?'badge badge-termine':'badge badge-encours';

  const handlePhoto = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoMap(prev => ({...prev, [id]: URL.createObjectURL(file)}));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Sanctions disciplinaires</h1>
          <p className="page-sub">Liste des sanctions appliquées aux élèves de l'établissement.</p>
        </div>
        <button className="btn-primary" onClick={()=>setShowModal(true)}>+ Nouvelle sanction</button>
      </div>

      {/* FILTRES */}
      <div className="card mb-18">
        <div className="filters-row">
          <div className="filter-group fg-2">
            <label>Élève</label>
            <div className="input-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input className="finput" placeholder="Tous les élèves" value={eleve} onChange={e=>setEleve(e.target.value)} />
            </div>
          </div>
          <div className="filter-group fg-2">
            <label>Type de sanction</label>
            <select className="fselect" value={type} onChange={e=>setType(e.target.value)}>
              <option value="">Tous les types</option>
              <option>Avertissement</option><option>Retenue</option>
              <option>Exclusion temporaire</option><option>Exclusion définitive</option>
            </select>
          </div>
          <div className="filter-group"><label>Du</label><input type="date" className="finput" value={dateDebut} onChange={e=>setDateDebut(e.target.value)} /></div>
          <div className="filter-group"><label>Au</label><input type="date" className="finput" value={dateFin} onChange={e=>setDateFin(e.target.value)} /></div>
          <button className="btn-reset" onClick={reset} style={{marginTop:22}}>Reset</button>
        </div>
      </div>

      {/* TABLEAU */}
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Élève</th><th>Incident lié</th><th>Sanction</th>
                <th>Période</th><th>Statut</th><th style={{textAlign:'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length===0 ? (
                <tr><td colSpan={6} className="empty">Aucune sanction trouvée.</td></tr>
              ) : filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="eleve-cell">
                      <div className="avatar" onClick={()=>fileRefs.current[s.id]?.click()} title="Cliquer pour ajouter une photo" style={{cursor:'pointer'}}>
                        {photoMap[s.id] ? <img src={photoMap[s.id]} alt={s.nom} /> : getInitiales(s.nom)}
                      </div>
                      <input type="file" accept="image/*" style={{display:'none'}} ref={el=>fileRefs.current[s.id]=el} onChange={e=>handlePhoto(s.id,e)} />
                      <div>
                        <div className="cell-name">{s.nom}</div>
                        <div className="cell-sub">{s.matricule}</div>
                      </div>
                    </div>
                  </td>
                  <td>{s.incident}</td>
                  <td>
                    <div style={{fontWeight:600,fontSize:13.5}}>{s.sanction}</div>
                    <div style={{fontSize:12,color:'#94a3b8',marginTop:2}}>{s.type}</div>
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>{getPeriode(s)}</td>
                  <td><span className={badgeStatut(s.statut)}>{s.statut}</span></td>
                  <td>
                    <div className="actions">
                      <button className="icon-btn edit" title="Modifier">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="icon-btn del" title="Supprimer">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="overlay" onClick={()=>setShowModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <h2>Nouvelle sanction</h2>
              <button className="modal-close" onClick={()=>setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="fgroup">
                <label>Incident lié</label>
                <select className="fselect" value={form.incident} onChange={e=>setForm({...form,incident:e.target.value})}>
                  <option value="">Sélectionner un incident...</option>
                  <option>Retard — Diallo Aïcha</option>
                  <option>Violence — Sow Mamadou</option>
                  <option>Absence répétée — Ndiaye Fatou</option>
                </select>
              </div>
              <div className="fgroup">
                <label>Type de sanction</label>
                <select className="fselect" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                  <option value="">Sélectionner...</option>
                  <option>Avertissement</option><option>Retenue</option>
                  <option>Exclusion temporaire</option><option>Exclusion définitive</option>
                </select>
              </div>
              <div className="fgroup"><label>Description</label><textarea className="finput ftextarea" placeholder="Décrivez la sanction..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></div>
              <div style={{display:'flex',gap:12}}>
                <div className="fgroup" style={{flex:1}}><label>Date début</label><input type="date" className="finput" value={form.dateDebut} onChange={e=>setForm({...form,dateDebut:e.target.value})} /></div>
                <div className="fgroup" style={{flex:1}}><label>Date fin (optionnel)</label><input type="date" className="finput" value={form.dateFin} onChange={e=>setForm({...form,dateFin:e.target.value})} /></div>
              </div>
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
