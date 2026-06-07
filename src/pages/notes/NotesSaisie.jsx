import { useState, useRef } from 'react';
import '../discipline/Discipline.css';
import './Notes.css';

const SECTIONS = ['Francophone','Anglophone','Bilingue'];
const ANNEES = ['2023-2024','2024-2025','2025-2026','2026-2027'];
const SEQUENCES = ['Séquence 1','Séquence 2','Séquence 3','Séquence 4','Séquence 5','Séquence 6'];
const TRIMESTRES = ['Trimestre 1 (Seq1+Seq2)','Trimestre 2 (Seq3+Seq4)','Trimestre 3 (Seq5+Seq6)'];

const CLASSES = {
  Francophone: ['Petite Section','Moyenne Section','Grande Section','SIL','CP','CE1','CE2','CM1','CM2'],
  Anglophone: ['Nursery 1','Nursery 2','Nursery 3','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6'],
  Bilingue: ['PS/Nursery 1','MS/Nursery 2','GS/Nursery 3','SIL/Class 1','CP/Class 2','CE1/Class 3','CE2/Class 4','CM1/Class 5','CM2/Class 6'],
};

const CLASSES_MATERNELLE_FR = ['Petite Section','Moyenne Section','Grande Section'];
const CLASSES_MATERNELLE_EN = ['Nursery 1','Nursery 2','Nursery 3'];
const CLASSES_MATERNELLE_BI = ['PS/Nursery 1','MS/Nursery 2','GS/Nursery 3'];

const MATIERES_MATERNELLE = {
  Francophone: [
    {nom:'Langage / Communication', coeff:3},
    {nom:'Éveil / Découverte du monde', coeff:2},
    {nom:'Mathématiques / Numération', coeff:3},
    {nom:'Activités Manuelles', coeff:2},
    {nom:'Dessin / Graphisme', coeff:2},
    {nom:'Chant / Musique', coeff:1},
    {nom:'EPS / Psychomotricité', coeff:2},
    {nom:'Anglais (initiation)', coeff:1},
  ],
  Anglophone: [
    {nom:'Language / Communication', coeff:3},
    {nom:'Environmental Studies', coeff:2},
    {nom:'Mathematics / Numeracy', coeff:3},
    {nom:'Handwork / Craft', coeff:2},
    {nom:'Drawing / Graphism', coeff:2},
    {nom:'Songs / Music', coeff:1},
    {nom:'PE / Psychomotricity', coeff:2},
    {nom:'French (initiation)', coeff:1},
  ],
  Bilingue: [
    {nom:'Langage / Language', coeff:3},
    {nom:'Éveil / Environmental Studies', coeff:2},
    {nom:'Mathématiques / Mathematics', coeff:3},
    {nom:'Activités Manuelles / Handwork', coeff:2},
    {nom:'Dessin / Drawing', coeff:2},
    {nom:'Chant / Music', coeff:1},
    {nom:'EPS / Psychomotricity', coeff:2},
    {nom:'Anglais / French (initiation)', coeff:1},
  ],
};

const MATIERES_PRIMAIRE = {
  Francophone: [
    {nom:'Français', coeff:4},{nom:'Mathématiques', coeff:4},
    {nom:'Sciences et Technologie', coeff:2},{nom:'Histoire-Géographie', coeff:2},
    {nom:'Éducation Civique et Morale', coeff:2},{nom:'Anglais (L2)', coeff:2},
    {nom:'TIC', coeff:2},{nom:'EPS', coeff:1},
    {nom:'Dessin / Arts Plastiques', coeff:1},{nom:'Chant / Musique', coeff:1},
  ],
  Anglophone: [
    {nom:'English Language', coeff:4},{nom:'Mathematics', coeff:4},
    {nom:'General Science', coeff:2},{nom:'History & Geography', coeff:2},
    {nom:'Civic Education', coeff:2},{nom:'French (2nd Language)', coeff:2},
    {nom:'ICT', coeff:2},{nom:'Physical Education', coeff:1},
    {nom:'Arts & Craft', coeff:1},{nom:'Music', coeff:1},
  ],
  Bilingue: [
    {nom:'Français / French', coeff:3},{nom:'English Language', coeff:3},
    {nom:'Mathématiques / Mathematics', coeff:4},{nom:'Sciences / General Science', coeff:2},
    {nom:'Histoire-Géo / History & Geography', coeff:2},
    {nom:'Éducation Civique / Civic Education', coeff:2},{nom:'TIC / ICT', coeff:2},
    {nom:'EPS / Physical Education', coeff:1},
    {nom:'Arts Plastiques / Arts & Craft', coeff:1},{nom:'Chant / Music', coeff:1},
  ],
};

const isMaternelle = (section, classe) => {
  const matClasses = section==='Anglophone'?CLASSES_MATERNELLE_EN:section==='Bilingue'?CLASSES_MATERNELLE_BI:CLASSES_MATERNELLE_FR;
  return matClasses.includes(classe);
};

const getMatieres = (section, classe) => isMaternelle(section,classe)?MATIERES_MATERNELLE[section]:MATIERES_PRIMAIRE[section];

const ELEVES = [
  {id:1,nom:'Awa Diallo',matricule:'EL-001'},{id:2,nom:'Moussa Traoré',matricule:'EL-002'},
  {id:3,nom:'Fanta Camara',matricule:'EL-003'},{id:4,nom:'Ibrahim Sow',matricule:'EL-004'},
  {id:5,nom:'Mariam Bah',matricule:'EL-005'},
];

const getInitiales = (nom) => nom.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
const getAppreciation = (n) => {
  if(n>=18) return 'Excellent'; if(n>=16) return 'Très Bien'; if(n>=14) return 'Bien';
  if(n>=12) return 'Assez Bien'; if(n>=10) return 'Passable'; if(n>=8) return 'Médiocre';
  return 'Insuffisant';
};

export default function NotesSaisie() {
  const [section, setSection] = useState('Francophone');
  const [classe, setClasse] = useState('CM2');
  const [annee, setAnnee] = useState('2025-2026');
  const [typePeriode, setTypePeriode] = useState('sequence');
  const [periode, setPeriode] = useState('Séquence 1');
  const [photoMap, setPhotoMap] = useState({});
  const fileRefs = useRef({});
  const [saved, setSaved] = useState(false);

  const matieres = getMatieres(section, classe);
  const [matiere, setMatiere] = useState(matieres[0].nom);

  const initNotes = (mats) => ELEVES.reduce((acc,e)=>({...acc,[e.id]:{note:'',coeff:mats[0].coeff,saved:false}}),{});
  const [notes, setNotes] = useState(initNotes(matieres));

  const handleSection = (s) => {
    setSection(s);
    const cl = CLASSES[s][CLASSES[s].length-1];
    setClasse(cl);
    const mats = getMatieres(s,cl);
    setMatiere(mats[0].nom);
    setNotes(initNotes(mats));
    setSaved(false);
  };

  const handleClasse = (c) => {
    setClasse(c);
    const mats = getMatieres(section,c);
    setMatiere(mats[0].nom);
    setNotes(initNotes(mats));
    setSaved(false);
  };

  const handleMatiere = (m) => {
    setMatiere(m);
    const mat = matieres.find(x=>x.nom===m);
    setNotes(ELEVES.reduce((acc,e)=>({...acc,[e.id]:{note:'',coeff:mat?.coeff||1,saved:false}}),{}));
    setSaved(false);
  };

  const handleType = (t) => { setTypePeriode(t); setPeriode(t==='sequence'?'Séquence 1':'Trimestre 1 (Seq1+Seq2)'); };
  const update = (id,field,val) => { setNotes(prev=>({...prev,[id]:{...prev[id],[field]:val,saved:false}})); setSaved(false); };
  const saveAll = () => { setNotes(prev=>{ const u={...prev}; Object.keys(u).forEach(id=>{if(u[id].note!=='') u[id].saved=true;}); return u; }); setSaved(true); };
  const handlePhoto = (id,e) => { const file=e.target.files[0]; if(!file) return; setPhotoMap(prev=>({...prev,[id]:URL.createObjectURL(file)})); };

  const sectionColor = section==='Francophone'?'#4C1D95':section==='Anglophone'?'#0891B2':'#D97706';
  const sectionBg = section==='Francophone'?'#ede9fe':section==='Anglophone'?'#e0f2fe':'#fef3c7';
  const isMat = isMaternelle(section, classe);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Saisie des notes</h1>
          <p className="page-sub">
            {isMat ? '🌟 Classe Maternelle' : '📚 Classe Primaire'} &nbsp;
            <span style={{display:'inline-flex',alignItems:'center',padding:'2px 10px',borderRadius:20,fontSize:11.5,fontWeight:700,background:sectionBg,color:sectionColor}}>{section}</span>
          </p>
        </div>
        {saved && <span style={{color:'#059669',fontWeight:600,fontSize:13,display:'flex',alignItems:'center',gap:6,background:'#d1fae5',padding:'8px 16px',borderRadius:8}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Notes enregistrées !
        </span>}
      </div>

      <div className="card mb-18">
        <div className="filters-row">
          <div className="filter-group"><label>Année scolaire</label>
            <select className="fselect" value={annee} onChange={e=>setAnnee(e.target.value)}>
              {ANNEES.map(a=><option key={a}>{a}</option>)}
            </select>
          </div>
          <div className="filter-group"><label>Section</label>
            <select className="fselect" value={section} onChange={e=>handleSection(e.target.value)}>
              {SECTIONS.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="filter-group"><label>Classe</label>
            <select className="fselect" value={classe} onChange={e=>handleClasse(e.target.value)}>
              {CLASSES[section].map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="filter-group fg-2"><label>Matière</label>
            <select className="fselect" value={matiere} onChange={e=>handleMatiere(e.target.value)}>
              {getMatieres(section,classe).map(m=><option key={m.nom}>{m.nom} (coeff {m.coeff})</option>)}
            </select>
          </div>
          <div className="filter-group"><label>Type période</label>
            <select className="fselect" value={typePeriode} onChange={e=>handleType(e.target.value)}>
              <option value="sequence">Séquence</option>
              <option value="trimestre">Trimestre</option>
            </select>
          </div>
          <div className="filter-group"><label>Période</label>
            <select className="fselect" value={periode} onChange={e=>setPeriode(e.target.value)}>
              {(typePeriode==='sequence'?SEQUENCES:TRIMESTRES).map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="card mb-18" style={{padding:'10px 18px',display:'flex',gap:20,fontSize:12,color:'#6B7280',alignItems:'center',flexWrap:'wrap'}}>
        <span><strong style={{color:'#1E1B4B'}}>Année :</strong> {annee}</span>
        <span><strong style={{color:'#1E1B4B'}}>Classe :</strong> {classe}</span>
        <span><strong style={{color:'#1E1B4B'}}>Matière :</strong> {matiere}</span>
        <span><strong style={{color:'#1E1B4B'}}>Période :</strong> {periode}</span>
        <span><strong style={{color:'#1E1B4B'}}>Niveau :</strong> {isMat?'Maternelle':'Primaire'}</span>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Élève</th><th>Note /20</th><th>Coefficient</th><th>Appréciation</th><th>Statut</th></tr>
            </thead>
            <tbody>
              {ELEVES.map(eleve=>{
                const n=notes[eleve.id]||{note:'',coeff:1,saved:false};
                const val=parseFloat(n.note);
                const appre=n.note!==''&&!isNaN(val)?getAppreciation(val):'—';
                const noteColor=!isNaN(val)&&n.note!==''?(val>=10?'#059669':'#E11D48'):'#1E1B4B';
                return (
                  <tr key={eleve.id}>
                    <td>
                      <div className="eleve-cell">
                        <div className="avatar" title="Photo" style={{cursor:'pointer'}} onClick={()=>fileRefs.current[eleve.id]?.click()}>
                          {photoMap[eleve.id]?<img src={photoMap[eleve.id]} alt={eleve.nom}/>:getInitiales(eleve.nom)}
                        </div>
                        <input type="file" accept="image/*" style={{display:'none'}} ref={el=>fileRefs.current[eleve.id]=el} onChange={e=>handlePhoto(eleve.id,e)}/>
                        <div><div className="cell-name">{eleve.nom}</div><div className="cell-sub">{eleve.matricule}</div></div>
                      </div>
                    </td>
                    <td><input type="number" min="0" max="20" step="0.5" className="note-input" value={n.note} placeholder="—" style={{color:noteColor,fontWeight:n.note!==''?700:400}} onChange={ev=>update(eleve.id,'note',ev.target.value)}/></td>
                    <td><input type="number" min="1" max="5" className="note-input" value={n.coeff} onChange={ev=>update(eleve.id,'coeff',ev.target.value)}/></td>
                    <td style={{fontStyle:appre==='—'?'italic':'normal',color:appre==='—'?'#94a3b8':'#1E1B4B'}}>{appre}</td>
                    <td>{n.saved&&n.note!==''
                      ?<span style={{color:'#059669',fontWeight:600,fontSize:13,display:'flex',alignItems:'center',gap:4}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Saisie</span>
                      :<span style={{color:'#94a3b8',fontSize:12}}>En attente</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-foot">
          <span style={{fontSize:12,color:'#94a3b8'}}>💡 Cliquez sur l'avatar pour ajouter la photo</span>
          <button className="btn-primary" onClick={saveAll}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Enregistrer toutes les notes
          </button>
        </div>
      </div>
    </div>
  );
}
