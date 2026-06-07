import { useState } from 'react';
import '../discipline/Discipline.css';
import './Notes.css';

const SECTIONS = ['Francophone','Anglophone','Bilingue'];
const ANNEES = ['2023-2024','2024-2025','2025-2026','2026-2027'];
const CLASSES = {
  Francophone: ['Petite Section','Moyenne Section','Grande Section','SIL','CP','CE1','CE2','CM1','CM2'],
  Anglophone: ['Nursery 1','Nursery 2','Nursery 3','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6'],
  Bilingue: ['PS/Nursery 1','MS/Nursery 2','GS/Nursery 3','SIL/Class 1','CP/Class 2','CE1/Class 3','CE2/Class 4','CM1/Class 5','CM2/Class 6'],
};

const CLASSES_MAT = {
  Francophone:['Petite Section','Moyenne Section','Grande Section'],
  Anglophone:['Nursery 1','Nursery 2','Nursery 3'],
  Bilingue:['PS/Nursery 1','MS/Nursery 2','GS/Nursery 3'],
};

const isMaternelle = (section,classe) => CLASSES_MAT[section].includes(classe);

const COEFFS = {
  Francophone: { maternelle:[3,2,3,2,2,1,2,1], primaire:[4,4,2,2,2,2,2,1,1,1] },
  Anglophone: { maternelle:[3,2,3,2,2,1,2,1], primaire:[4,4,2,2,2,2,2,1,1,1] },
  Bilingue: { maternelle:[3,2,3,2,2,1,2,1], primaire:[3,3,4,2,2,2,2,1,1,1] },
};

const ELEVES_DATA = [
  {id:1,nom:'Moussa Traoré',matricule:'EL-002',seq1:[14,16,12,14,15,13,16,16,14,15],seq2:[15,17,13,15,16,14,17,17,15,16],seq3:[16,15,14,13,14,12,15,15,14,16],seq4:[17,16,15,14,15,13,16,16,15,17],seq5:[17,18,16,15,16,15,17,17,16,18],seq6:[16,17,15,16,15,14,16,16,15,17]},
  {id:2,nom:'Ibrahim Sow',matricule:'EL-004',seq1:[14,18,15,16,17,14,15,17,15,16],seq2:[15,17,14,15,16,15,16,16,14,17],seq3:[16,16,15,14,15,13,16,16,14,16],seq4:[15,17,16,15,16,14,15,15,15,17],seq5:[16,18,15,15,16,14,17,17,15,18],seq6:[15,17,14,16,15,13,16,16,14,17]},
  {id:3,nom:'Sékou Keïta',matricule:'EL-006',seq1:[16,18,14,15,17,15,18,18,16,17],seq2:[15,17,15,16,16,14,17,17,15,18],seq3:[14,16,14,15,15,13,16,16,14,17],seq4:[15,17,15,14,16,14,15,15,15,16],seq5:[16,18,16,15,17,15,17,17,16,18],seq6:[15,17,15,16,16,14,16,16,15,17]},
  {id:4,nom:'Awa Diallo',matricule:'EL-001',seq1:[8,12,13,15,16,10,14,14,13,15],seq2:[9,13,12,14,15,11,13,13,12,14],seq3:[10,12,13,13,14,10,13,13,12,14],seq4:[11,13,12,12,13,11,14,14,13,15],seq5:[10,14,13,14,15,12,14,14,13,15],seq6:[11,13,12,13,14,11,13,13,12,14]},
  {id:5,nom:'Mariam Bah',matricule:'EL-005',seq1:[10,12,13,11,14,10,11,12,11,13],seq2:[11,11,12,12,13,9,11,11,10,12],seq3:[10,12,11,11,12,10,12,12,11,13],seq4:[11,13,12,12,13,11,12,12,11,13],seq5:[10,12,13,12,13,10,13,13,12,14],seq6:[11,11,12,11,12,10,12,12,11,13]},
];

const getMoySeq = (notes,coeffs) => parseFloat((notes.slice(0,coeffs.length).reduce((a,n,i)=>a+n*coeffs[i],0)/coeffs.reduce((a,b)=>a+b,0)).toFixed(2));
const getMoyT = (e,t,coeffs) => parseFloat(((getMoySeq(e[`seq${t*2-1}`],coeffs)+getMoySeq(e[`seq${t*2}`],coeffs))/2).toFixed(2));
const getMoyAnn = (e,coeffs) => parseFloat(((getMoyT(e,1,coeffs)+getMoyT(e,2,coeffs)+getMoyT(e,3,coeffs))/3).toFixed(2));
const getInitiales = (nom) => nom.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);

export default function Moyennes() {
  const [section, setSection] = useState('Francophone');
  const [classe, setClasse] = useState('CM2');
  const [annee, setAnnee] = useState('2025-2026');

  const isMat = isMaternelle(section,classe);
  const coeffs = isMat?COEFFS[section].maternelle:COEFFS[section].primaire;

  const elevesMoyennes = ELEVES_DATA.map(e=>({
    ...e,
    moyT1:getMoyT(e,1,coeffs),
    moyT2:getMoyT(e,2,coeffs),
    moyT3:getMoyT(e,3,coeffs),
    moyAnn:getMoyAnn(e,coeffs),
  })).sort((a,b)=>b.moyAnn-a.moyAnn);

  const moyClasse = (elevesMoyennes.reduce((a,e)=>a+e.moyAnn,0)/elevesMoyennes.length).toFixed(2);
  const getBarWidth = (moy) => `${(moy/20)*100}%`;
  const sectionColor = section==='Francophone'?'#4C1D95':section==='Anglophone'?'#0891B2':'#D97706';
  const sectionBg = section==='Francophone'?'#ede9fe':section==='Anglophone'?'#e0f2fe':'#fef3c7';

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Moyennes par classe</h1>
          <p className="page-sub">
            {isMat?'🌟 Maternelle':'📚 Primaire'} &nbsp;
            <span style={{display:'inline-flex',alignItems:'center',padding:'2px 10px',borderRadius:20,fontSize:11.5,fontWeight:700,background:sectionBg,color:sectionColor}}>{section}</span>
          </p>
        </div>
        <button className="btn-outline">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Exporter Excel
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
        </div>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:18}}>
        {[
          {label:'Effectif', val:elevesMoyennes.length, color:'#4C1D95'},
          {label:'Moyenne classe', val:`${moyClasse}/20`, color:'#059669'},
          {label:'Admis (≥10)', val:elevesMoyennes.filter(e=>e.moyAnn>=10).length, color:'#0891B2'},
          {label:'À soutenir (<10)', val:elevesMoyennes.filter(e=>e.moyAnn<10).length, color:'#E11D48'},
        ].map(s=>(
          <div key={s.label} className="card" style={{padding:'14px 18px'}}>
            <div style={{fontSize:11,color:'#6B7280',textTransform:'uppercase',letterSpacing:'0.05em',fontWeight:700}}>{s.label}</div>
            <div style={{fontSize:22,fontWeight:700,color:s.color,marginTop:4,fontFamily:'Outfit,sans-serif'}}>{s.val}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{width:50}}>Rang</th>
                <th>Élève</th>
                <th style={{textAlign:'center'}}>Moy. T1</th>
                <th style={{textAlign:'center'}}>Moy. T2</th>
                <th style={{textAlign:'center'}}>Moy. T3</th>
                <th style={{textAlign:'center',color:'#4C1D95'}}>Moy. Annuelle</th>
                <th style={{width:130}}>Progression</th>
              </tr>
            </thead>
            <tbody>
              {elevesMoyennes.map((eleve,index)=>{
                const rang=index+1;
                const isTop=rang<=3; const isBad=eleve.moyAnn<10;
                return (
                  <tr key={eleve.id} style={{background:isBad?'rgba(225,29,72,0.04)':'transparent'}}>
                    <td style={{textAlign:'center'}}>
                      <div style={{width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,margin:'0 auto',background:isTop?'linear-gradient(135deg,#3B0764,#4C1D95)':'#F8FAFF',color:isTop?'white':'#6B7280',border:isTop?'none':'1.5px solid #EDE9FE'}}>{rang}</div>
                    </td>
                    <td>
                      <div className="eleve-cell">
                        <div className="avatar">{getInitiales(eleve.nom)}</div>
                        <div>
                          <div style={{display:'flex',alignItems:'center',gap:6}}>
                            <span className="cell-name">{eleve.nom}</span>
                            {isTop&&<span className="perf-top">Top</span>}
                            {isBad&&<span className="perf-soutenir">À soutenir</span>}
                          </div>
                          <div className="cell-sub">{eleve.matricule}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{textAlign:'center',color:'#6B7280'}}>{eleve.moyT1}</td>
                    <td style={{textAlign:'center',color:'#6B7280'}}>{eleve.moyT2}</td>
                    <td style={{textAlign:'center',color:'#6B7280'}}>{eleve.moyT3}</td>
                    <td style={{textAlign:'center'}}><strong style={{fontSize:15,color:eleve.moyAnn>=10?'#4C1D95':'#E11D48'}}>{eleve.moyAnn}</strong></td>
                    <td><div className="prog-wrap"><div className="prog-fill" style={{width:getBarWidth(eleve.moyAnn)}}/></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-foot">
          <span>{elevesMoyennes.length} élève(s) — {classe} — {section} — {annee}</span>
          <div style={{display:'flex',gap:16,fontSize:12}}>
            <span style={{display:'flex',alignItems:'center',gap:4}}><span style={{width:10,height:10,borderRadius:'50%',background:'#059669',display:'inline-block'}}></span>Top 3</span>
            <span style={{display:'flex',alignItems:'center',gap:4}}><span style={{width:10,height:10,borderRadius:'50%',background:'#E11D48',display:'inline-block'}}></span>À soutenir</span>
          </div>
        </div>
      </div>
    </div>
  );
}
