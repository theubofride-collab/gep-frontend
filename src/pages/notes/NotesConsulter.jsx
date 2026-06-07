import { useState } from 'react';
import '../discipline/Discipline.css';
import './Notes.css';

const SECTIONS = ['Francophone','Anglophone','Bilingue'];
const ANNEES = ['2023-2024','2024-2025','2025-2026','2026-2027'];
const SEQUENCES = ['Séquence 1','Séquence 2','Séquence 3','Séquence 4','Séquence 5','Séquence 6'];
const TRIMESTRES = ['Trimestre 1','Trimestre 2','Trimestre 3'];

const CLASSES = {
  Francophone: ['Petite Section','Moyenne Section','Grande Section','SIL','CP','CE1','CE2','CM1','CM2'],
  Anglophone: ['Nursery 1','Nursery 2','Nursery 3','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6'],
  Bilingue: ['PS/Nursery 1','MS/Nursery 2','GS/Nursery 3','SIL/Class 1','CP/Class 2','CE1/Class 3','CE2/Class 4','CM1/Class 5','CM2/Class 6'],
};

const CLASSES_MATERNELLE_FR = ['Petite Section','Moyenne Section','Grande Section'];
const CLASSES_MATERNELLE_EN = ['Nursery 1','Nursery 2','Nursery 3'];
const CLASSES_MATERNELLE_BI = ['PS/Nursery 1','MS/Nursery 2','GS/Nursery 3'];

const isMaternelle = (section, classe) => {
  const m = section==='Anglophone'?CLASSES_MATERNELLE_EN:section==='Bilingue'?CLASSES_MATERNELLE_BI:CLASSES_MATERNELLE_FR;
  return m.includes(classe);
};

const MATIERES = {
  Francophone: {
    maternelle: [{nom:'Langage',coeff:3},{nom:'Éveil',coeff:2},{nom:'Maths/Numération',coeff:3},{nom:'Act. Manuelles',coeff:2},{nom:'Dessin/Graphisme',coeff:2},{nom:'Chant',coeff:1},{nom:'EPS/Psychomotricité',coeff:2},{nom:'Anglais init.',coeff:1}],
    primaire: [{nom:'Français',coeff:4},{nom:'Mathématiques',coeff:4},{nom:'Sciences',coeff:2},{nom:'Histoire-Géo',coeff:2},{nom:'Éducation Civique',coeff:2},{nom:'Anglais L2',coeff:2},{nom:'TIC',coeff:2},{nom:'EPS',coeff:1},{nom:'Arts',coeff:1},{nom:'Chant',coeff:1}],
  },
  Anglophone: {
    maternelle: [{nom:'Language',coeff:3},{nom:'Environment',coeff:2},{nom:'Maths/Numeracy',coeff:3},{nom:'Handwork',coeff:2},{nom:'Drawing',coeff:2},{nom:'Music',coeff:1},{nom:'PE',coeff:2},{nom:'French init.',coeff:1}],
    primaire: [{nom:'English',coeff:4},{nom:'Mathematics',coeff:4},{nom:'General Science',coeff:2},{nom:'History & Geo',coeff:2},{nom:'Civic Education',coeff:2},{nom:'French L2',coeff:2},{nom:'ICT',coeff:2},{nom:'PE',coeff:1},{nom:'Arts',coeff:1},{nom:'Music',coeff:1}],
  },
  Bilingue: {
    maternelle: [{nom:'Langage/Language',coeff:3},{nom:'Éveil/Environment',coeff:2},{nom:'Maths',coeff:3},{nom:'Act. Manuelles',coeff:2},{nom:'Dessin/Drawing',coeff:2},{nom:'Chant/Music',coeff:1},{nom:'EPS/PE',coeff:2},{nom:'Init. bilingue',coeff:1}],
    primaire: [{nom:'Français/French',coeff:3},{nom:'English',coeff:3},{nom:'Maths',coeff:4},{nom:'Sciences',coeff:2},{nom:'Histoire/History',coeff:2},{nom:'Éducation Civique',coeff:2},{nom:'TIC/ICT',coeff:2},{nom:'EPS/PE',coeff:1},{nom:'Arts',coeff:1},{nom:'Chant/Music',coeff:1}],
  },
};

const NOTES_DATA = [
  {id:1,nom:'Awa Diallo',matricule:'EL-001',notes:[8,12,14,15,16,10,14,14,13,15]},
  {id:2,nom:'Moussa Traoré',matricule:'EL-002',notes:[14,16,12,14,15,13,16,16,14,15]},
  {id:3,nom:'Fanta Camara',matricule:'EL-003',notes:[8,10,11,12,13,9,10,13,12,14]},
  {id:4,nom:'Ibrahim Sow',matricule:'EL-004',notes:[14,18,15,16,17,14,15,17,15,16]},
  {id:5,nom:'Mariam Bah',matricule:'EL-005',notes:[10,12,13,11,14,10,11,12,11,13]},
];

const getMoyenne = (notes,coeffs) => {
  const total=notes.reduce((a,n,i)=>a+n*(coeffs[i]||1),0);
  const totalC=coeffs.reduce((a,b)=>a+b,0);
  return (total/totalC).toFixed(2);
};
const getInitiales = (nom) => nom.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);

export default function NotesConsulter() {
  const [section, setSection] = useState('Francophone');
  const [classe, setClasse] = useState('CM2');
  const [annee, setAnnee] = useState('2025-2026');
  const [typePeriode, setTypePeriode] = useState('sequence');
  const [periode, setPeriode] = useState('Séquence 1');
  const [search, setSearch] = useState('');
  const [vue, setVue] = useState('classe');

  const isMat = isMaternelle(section,classe);
  const matieres = isMat?MATIERES[section].maternelle:MATIERES[section].primaire;
  const coeffs = matieres.map(m=>m.coeff);
  const filtered = NOTES_DATA.filter(e=>!search||e.nom.toLowerCase().includes(search.toLowerCase())||e.matricule.toLowerCase().includes(search.toLowerCase()));

  const sectionColor = section==='Francophone'?'#4C1D95':section==='Anglophone'?'#0891B2':'#D97706';
  const sectionBg = section==='Francophone'?'#ede9fe':section==='Anglophone'?'#e0f2fe':'#fef3c7';

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Consulter les notes</h1>
          <p className="page-sub">
            {isMat?'🌟 Maternelle':'📚 Primaire'} &nbsp;
            <span style={{display:'inline-flex',alignItems:'center',padding:'2px 10px',borderRadius:20,fontSize:11.5,fontWeight:700,background:sectionBg,color:sectionColor}}>{section}</span>
          </p>
        </div>
        <button className="btn-outline">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Exporter PDF
        </button>
      </div>

      <div className="card mb-18">
        <div className="filters-row">
          <div className="filter-group"><label>Année scolaire</label>
            <select className="fselect" value={annee} onChange={e=>setAnnee(e.target.value)}>
              {ANNEES.map(a=><option key={a}>{a}</option>)}
            </select>
          </div>
          <div className="filter-group"><label>Section</label>
            <select className="fselect" value={section} onChange={e=>{setSection(e.target.value);setClasse(CLASSES[e.target.value][CLASSES[e.target.value].length-1]);}}>
              {SECTIONS.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="filter-group"><label>Classe</label>
            <select className="fselect" value={classe} onChange={e=>setClasse(e.target.value)}>
              {CLASSES[section].map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="filter-group"><label>Type</label>
            <select className="fselect" value={typePeriode} onChange={e=>{setTypePeriode(e.target.value);setPeriode(e.target.value==='sequence'?'Séquence 1':'Trimestre 1');}}>
              <option value="sequence">Séquence</option>
              <option value="trimestre">Trimestre</option>
            </select>
          </div>
          <div className="filter-group"><label>Période</label>
            <select className="fselect" value={periode} onChange={e=>setPeriode(e.target.value)}>
              {(typePeriode==='sequence'?SEQUENCES:TRIMESTRES).map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="filter-group fg-2"><label>Élève</label>
            <div className="input-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input className="finput" placeholder="Nom ou matricule..." value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
          </div>
        </div>
      </div>

      <div className="vue-tabs">
        <button className={`vue-tab${vue==='classe'?' active':''}`} onClick={()=>setVue('classe')}>Vue par classe</button>
        <button className={`vue-tab${vue==='eleve'?' active':''}`} onClick={()=>setVue('eleve')}>Vue par élève</button>
      </div>

      {vue==='classe'&&(
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Élève</th>
                  {matieres.map((m,i)=>(
                    <th key={m.nom} style={{fontSize:9.5,maxWidth:60,whiteSpace:'normal',textAlign:'center'}}>
                      {m.nom.split('/')[0].trim()}<br/><span style={{color:'#06B6D4'}}>c{coeffs[i]}</span>
                    </th>
                  ))}
                  <th style={{color:'#4C1D95'}}>Moyenne</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(eleve=>{
                  const notes = eleve.notes.slice(0,matieres.length);
                  const moy=getMoyenne(notes,coeffs);
                  return (
                    <tr key={eleve.id}>
                      <td>
                        <div className="eleve-cell">
                          <div className="avatar">{getInitiales(eleve.nom)}</div>
                          <div><div className="cell-name">{eleve.nom}</div><div className="cell-sub">{eleve.matricule}</div></div>
                        </div>
                      </td>
                      {notes.map((n,i)=>(
                        <td key={i} style={{textAlign:'center'}}>
                          <span style={{fontWeight:700,color:n>=10?'#059669':'#E11D48'}}>{n}</span>
                        </td>
                      ))}
                      <td style={{textAlign:'center'}}><strong style={{fontSize:14,color:parseFloat(moy)>=10?'#4C1D95':'#E11D48'}}>{moy}</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {vue==='eleve'&&filtered.length>0&&(
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Matière</th><th>Coefficient</th><th style={{textAlign:'center'}}>Note /20</th><th style={{textAlign:'center'}}>Note × Coeff</th><th>Appréciation</th></tr>
              </thead>
              <tbody>
                {matieres.map((mat,i)=>{
                  const note=filtered[0].notes[i]||0;
                  const appre=note>=18?'Excellent':note>=16?'Très Bien':note>=14?'Bien':note>=12?'Assez Bien':note>=10?'Passable':note>=8?'Médiocre':'Insuffisant';
                  return (
                    <tr key={mat.nom}>
                      <td style={{fontWeight:500}}>{mat.nom}</td>
                      <td style={{color:'#06B6D4',fontWeight:600}}>{coeffs[i]}</td>
                      <td style={{textAlign:'center'}}><span style={{fontWeight:700,color:note>=10?'#059669':'#E11D48'}}>{note}.0</span></td>
                      <td style={{textAlign:'center',fontWeight:600}}>{(note*coeffs[i]).toFixed(1)}</td>
                      <td style={{color:'#6B7280',fontStyle:'italic'}}>{appre}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
