import { useState, useRef } from 'react';
import '../discipline/Discipline.css';
import './Notes.css';
import './Bulletin.css';

const SECTIONS = ['Francophone','Anglophone','Bilingue'];
const ANNEES = ['2023-2024','2024-2025','2025-2026','2026-2027'];
const SEQUENCES = ['Séquence 1','Séquence 2','Séquence 3','Séquence 4','Séquence 5','Séquence 6'];
const TRIMESTRES = ['Trimestre 1','Trimestre 2','Trimestre 3'];

const CLASSES = {
  Francophone:['Petite Section','Moyenne Section','Grande Section','SIL','CP','CE1','CE2','CM1','CM2'],
  Anglophone:['Nursery 1','Nursery 2','Nursery 3','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6'],
  Bilingue:['PS/Nursery 1','MS/Nursery 2','GS/Nursery 3','SIL/Class 1','CP/Class 2','CE1/Class 3','CE2/Class 4','CM1/Class 5','CM2/Class 6'],
};
const CLASSES_MAT = {Francophone:['Petite Section','Moyenne Section','Grande Section'],Anglophone:['Nursery 1','Nursery 2','Nursery 3'],Bilingue:['PS/Nursery 1','MS/Nursery 2','GS/Nursery 3']};
const isMaternelle = (section,classe) => CLASSES_MAT[section].includes(classe);

const GROUPES = {
  Francophone: {
    maternelle:[
      {groupe:'Activités d\'Éveil et de Communication', matieres:[
        {nom:'Langage / Communication',coeff:3,enseignant:'Mme Ngo Marie'},
        {nom:'Éveil / Découverte du monde',coeff:2,enseignant:'Mme Biya Claire'},
        {nom:'Anglais (initiation)',coeff:1,enseignant:'Mme Nkono Grace'},
      ]},
      {groupe:'Activités Mathématiques', matieres:[
        {nom:'Mathématiques / Numération',coeff:3,enseignant:'M. Mbarga Jean'},
      ]},
      {groupe:'Activités d\'Expression', matieres:[
        {nom:'Activités Manuelles',coeff:2,enseignant:'Mme Ekani Rose'},
        {nom:'Dessin / Graphisme',coeff:2,enseignant:'Mme Ekani Rose'},
        {nom:'Chant / Musique',coeff:1,enseignant:'M. Essomba David'},
        {nom:'EPS / Psychomotricité',coeff:2,enseignant:'M. Tabi Simon'},
      ]},
    ],
    primaire:[
      {groupe:'Enseignements Généraux', matieres:[
        {nom:'Français',coeff:4,enseignant:'Mme Ngo Marie'},
        {nom:'Mathématiques',coeff:4,enseignant:'M. Mbarga Jean'},
        {nom:'Sciences et Technologie',coeff:2,enseignant:'M. Ateba Paul'},
        {nom:'Histoire-Géographie',coeff:2,enseignant:'Mme Biya Claire'},
        {nom:'Éducation Civique et Morale',coeff:2,enseignant:'M. Onana Pierre'},
        {nom:'Anglais (L2)',coeff:2,enseignant:'Mme Nkono Grace'},
        {nom:'TIC',coeff:2,enseignant:'M. Fouda Eric'},
      ]},
      {groupe:'Enseignements Complémentaires', matieres:[
        {nom:'EPS',coeff:1,enseignant:'M. Tabi Simon'},
        {nom:'Dessin / Arts Plastiques',coeff:1,enseignant:'Mme Ekani Rose'},
        {nom:'Chant / Musique',coeff:1,enseignant:'M. Essomba David'},
      ]},
    ],
  },
  Anglophone: {
    maternelle:[
      {groupe:'Language & Communication Activities', matieres:[
        {nom:'Language / Communication',coeff:3,enseignant:'Mrs. Smith Anna'},
        {nom:'Environmental Studies',coeff:2,enseignant:'Mrs. Davis Helen'},
        {nom:'French (initiation)',coeff:1,enseignant:'Mme Ngo Marie'},
      ]},
      {groupe:'Mathematics Activities', matieres:[
        {nom:'Mathematics / Numeracy',coeff:3,enseignant:'Mr. Johnson Paul'},
      ]},
      {groupe:'Expression Activities', matieres:[
        {nom:'Handwork / Craft',coeff:2,enseignant:'Mrs. Ekani Rose'},
        {nom:'Drawing / Graphism',coeff:2,enseignant:'Mrs. Ekani Rose'},
        {nom:'Songs / Music',coeff:1,enseignant:'Mr. Essomba David'},
        {nom:'PE / Psychomotricity',coeff:2,enseignant:'Mr. Tabi Simon'},
      ]},
    ],
    primaire:[
      {groupe:'General Subjects', matieres:[
        {nom:'English Language',coeff:4,enseignant:'Mrs. Smith Anna'},
        {nom:'Mathematics',coeff:4,enseignant:'Mr. Johnson Paul'},
        {nom:'General Science',coeff:2,enseignant:'Mr. Brown James'},
        {nom:'History & Geography',coeff:2,enseignant:'Mrs. Davis Helen'},
        {nom:'Civic Education',coeff:2,enseignant:'Mr. Wilson Tom'},
        {nom:'French (2nd Language)',coeff:2,enseignant:'Mme Ngo Marie'},
        {nom:'ICT',coeff:2,enseignant:'Mr. Fouda Eric'},
      ]},
      {groupe:'Complementary Subjects', matieres:[
        {nom:'Physical Education',coeff:1,enseignant:'Mr. Tabi Simon'},
        {nom:'Arts & Craft',coeff:1,enseignant:'Mrs. Ekani Rose'},
        {nom:'Music',coeff:1,enseignant:'Mr. Essomba David'},
      ]},
    ],
  },
  Bilingue: {
    maternelle:[
      {groupe:'Activités d\'Éveil / Language Activities', matieres:[
        {nom:'Langage / Language',coeff:3,enseignant:'Mme Ngo Marie'},
        {nom:'Éveil / Environmental Studies',coeff:2,enseignant:'Mme Biya Claire'},
        {nom:'Anglais/French (initiation)',coeff:1,enseignant:'Mrs. Smith Anna'},
      ]},
      {groupe:'Activités Mathématiques / Mathematics', matieres:[
        {nom:'Mathématiques / Mathematics',coeff:3,enseignant:'M. Mbarga Jean'},
      ]},
      {groupe:'Activités d\'Expression', matieres:[
        {nom:'Activités Manuelles / Handwork',coeff:2,enseignant:'Mme Ekani Rose'},
        {nom:'Dessin / Drawing',coeff:2,enseignant:'Mme Ekani Rose'},
        {nom:'Chant / Music',coeff:1,enseignant:'M. Essomba David'},
        {nom:'EPS / Psychomotricity',coeff:2,enseignant:'M. Tabi Simon'},
      ]},
    ],
    primaire:[
      {groupe:'Enseignements Généraux / General Subjects', matieres:[
        {nom:'Français / French',coeff:3,enseignant:'Mme Ngo Marie'},
        {nom:'English Language',coeff:3,enseignant:'Mrs. Smith Anna'},
        {nom:'Mathématiques / Mathematics',coeff:4,enseignant:'M. Mbarga Jean'},
        {nom:'Sciences / General Science',coeff:2,enseignant:'M. Ateba Paul'},
        {nom:'Histoire-Géo / History & Geography',coeff:2,enseignant:'Mme Biya Claire'},
        {nom:'Éducation Civique / Civic Education',coeff:2,enseignant:'M. Onana Pierre'},
        {nom:'TIC / ICT',coeff:2,enseignant:'M. Fouda Eric'},
      ]},
      {groupe:'Enseignements Complémentaires', matieres:[
        {nom:'EPS / Physical Education',coeff:1,enseignant:'M. Tabi Simon'},
        {nom:'Arts Plastiques / Arts & Craft',coeff:1,enseignant:'Mme Ekani Rose'},
        {nom:'Chant / Music',coeff:1,enseignant:'M. Essomba David'},
      ]},
    ],
  },
};

const ELEVES = [
  {matricule:'EP-001',nom:'DIALLO',prenom:'Aïcha',dateNaiss:'15/03/2016',lieuNaiss:'Yaoundé',sexe:'Féminin',classe:'CM2',section:'Francophone',effectif:5,enseignant:'M. Mbarga Jean',redoublant:'NON'},
  {matricule:'EP-002',nom:'SOW',prenom:'Mamadou',dateNaiss:'22/07/2015',lieuNaiss:'Douala',sexe:'Masculin',classe:'CM2',section:'Francophone',effectif:5,enseignant:'M. Mbarga Jean',redoublant:'NON'},
  {matricule:'EP-003',nom:'CAMARA',prenom:'Fanta',dateNaiss:'10/05/2016',lieuNaiss:'Yaoundé',sexe:'Féminin',classe:'CM2',section:'Francophone',effectif:5,enseignant:'M. Mbarga Jean',redoublant:'NON'},
  {matricule:'EP-004',nom:'NDIAYE',prenom:'Fatou',dateNaiss:'05/09/2016',lieuNaiss:'Yaoundé',sexe:'Féminin',classe:'CM2',section:'Francophone',effectif:5,enseignant:'M. Mbarga Jean',redoublant:'NON'},
  {matricule:'EP-005',nom:'BA',prenom:'Ibrahima',dateNaiss:'18/11/2015',lieuNaiss:'Douala',sexe:'Masculin',classe:'CM2',section:'Francophone',effectif:5,enseignant:'M. Mbarga Jean',redoublant:'NON'},
  {matricule:'EP-006',nom:'KONÉ',prenom:'Aminata',dateNaiss:'03/07/2021',lieuNaiss:'Yaoundé',sexe:'Féminin',classe:'Petite Section',section:'Francophone',effectif:5,enseignant:'Mme Ngo Marie',redoublant:'NON'},
];

const NOTES = {
  'EP-001':{seq1:[14,12,13,15,16,10,15,14,13,15],seq2:[15,13,12,14,15,11,14,15,14,16],seq3:[13,14,14,13,14,12,13,14,13,15],seq4:[16,15,13,15,16,13,15,15,14,16],seq5:[14,16,15,14,15,12,14,16,15,17],seq6:[15,17,14,15,16,13,16,15,14,16]},
  'EP-002':{seq1:[16,14,12,13,15,14,13,16,14,15],seq2:[17,15,13,14,16,15,14,17,15,16],seq3:[15,16,14,15,14,13,15,15,14,16],seq4:[16,17,15,16,15,14,16,16,15,17],seq5:[17,18,16,15,16,15,17,17,16,18],seq6:[16,17,15,16,15,14,16,16,15,17]},
  'EP-003':{seq1:[8,10,11,12,13,9,10,13,12,14],seq2:[9,11,10,11,12,10,11,12,11,13],seq3:[10,10,11,11,12,9,10,12,11,13],seq4:[9,11,12,12,13,10,11,13,12,14],seq5:[10,12,11,12,13,11,12,13,12,14],seq6:[9,11,10,11,12,10,11,12,11,13]},
  'EP-004':{seq1:[12,13,14,13,15,12,13,14,13,14],seq2:[13,14,13,14,14,13,12,13,12,15],seq3:[14,12,13,12,14,11,13,13,13,14],seq4:[13,14,14,13,14,12,13,14,12,15],seq5:[14,15,14,14,15,13,14,14,13,15],seq6:[13,14,13,14,14,12,13,13,12,14]},
  'EP-005':{seq1:[10,11,12,11,13,10,11,12,11,13],seq2:[11,12,11,12,12,11,10,11,10,12],seq3:[10,11,12,11,12,10,11,12,11,13],seq4:[11,12,11,12,13,11,12,12,11,13],seq5:[10,13,12,12,13,10,11,12,11,14],seq6:[11,12,11,11,12,10,11,11,10,13]},
  'EP-006':{seq1:[14,15,16,14],seq2:[15,16,15,15],seq3:[13,14,15,13],seq4:[15,16,14,15],seq5:[14,15,16,14],seq6:[15,16,15,15]},
};

const getAppreciation = (n) => {
  if(n>=18) return 'Excellent'; if(n>=16) return 'Très Bien'; if(n>=14) return 'Bien';
  if(n>=12) return 'Assez Bien'; if(n>=10) return 'Passable'; if(n>=8) return 'Médiocre';
  return 'Insuffisant';
};
const getMoyGen = (notes,coeffs) => {
  const n=notes.slice(0,coeffs.length);
  return parseFloat((n.reduce((a,v,i)=>a+v*coeffs[i],0)/coeffs.reduce((a,b)=>a+b,0)).toFixed(2));
};
const getMoyGroupe = (notes,matieres) => {
  const total=notes.reduce((a,n,i)=>a+n*(matieres[i]?.coeff||1),0);
  const totalC=matieres.reduce((a,m)=>a+m.coeff,0);
  return (total/totalC).toFixed(2);
};

export default function Bulletins() {
  const [section,setSection]=useState('Francophone');
  const [classe,setClasse]=useState('CM2');
  const [annee,setAnnee]=useState('2025-2026');
  const [typePeriode,setTypePeriode]=useState('sequence');
  const [periode,setPeriode]=useState('Séquence 1');
  const [eleveId,setEleveId]=useState('');
  const [search,setSearch]=useState('');
  const [photoMap,setPhotoMap]=useState({});
  const fileRef=useRef(null);

  const isMat=isMaternelle(section,classe);
  const groupes=isMat?GROUPES[section].maternelle:GROUPES[section].primaire;
  const allMats=groupes.flatMap(g=>g.matieres);
  const coeffs=allMats.map(m=>m.coeff);
  const eleve=ELEVES.find(e=>e.matricule===eleveId);
  const notesEleve=eleveId?NOTES[eleveId]:null;
  const elevesSection=ELEVES.filter(e=>e.section===section&&e.classe===classe);

  const handleType=(t)=>{setTypePeriode(t);setPeriode(t==='sequence'?'Séquence 1':t==='trimestre'?'Trimestre 1':'Annuel');};
  const handlePhoto=(e)=>{const file=e.target.files[0];if(!file)return;setPhotoMap(prev=>({...prev,[eleveId]:URL.createObjectURL(file)}));};

  const getColonnes=()=>{
    if(!notesEleve)return null;
    if(typePeriode==='sequence'){const idx=SEQUENCES.indexOf(periode)+1;return{headers:[`Seq${idx}`],getData:(i)=>[notesEleve[`seq${idx}`]?.[i]??'—']};}
    if(typePeriode==='trimestre'){const tIdx=TRIMESTRES.indexOf(periode)+1;const s1=tIdx*2-1;const s2=tIdx*2;return{headers:[`Seq${s1}`,`Seq${s2}`,'Moy.T'],getData:(i)=>{const v1=notesEleve[`seq${s1}`]?.[i]??0;const v2=notesEleve[`seq${s2}`]?.[i]??0;return[v1,v2,((v1+v2)/2).toFixed(1)];}};}
    return{headers:['Moy.T1','Moy.T2','Moy.T3','Moy.Ann'],getData:(i)=>{const t1=((notesEleve.seq1?.[i]??0)+(notesEleve.seq2?.[i]??0))/2;const t2=((notesEleve.seq3?.[i]??0)+(notesEleve.seq4?.[i]??0))/2;const t3=((notesEleve.seq5?.[i]??0)+(notesEleve.seq6?.[i]??0))/2;const ann=((t1+t2+t3)/3).toFixed(2);return[t1.toFixed(1),t2.toFixed(1),t3.toFixed(1),ann];}};
  };

  const cols=getColonnes();

  const getRangMatiere=(ci)=>{
    if(!cols||elevesSection.length===0)return{rang:'—',max:'—',min:'—'};
    const getNote=(n)=>{
      if(typePeriode==='sequence'){const idx=SEQUENCES.indexOf(periode)+1;return n[`seq${idx}`]?.[ci]??0;}
      if(typePeriode==='trimestre'){const tIdx=TRIMESTRES.indexOf(periode)+1;const s1=tIdx*2-1;const s2=tIdx*2;return((n[`seq${s1}`]?.[ci]??0)+(n[`seq${s2}`]?.[ci]??0))/2;}
      const t1=((n.seq1?.[ci]??0)+(n.seq2?.[ci]??0))/2;const t2=((n.seq3?.[ci]??0)+(n.seq4?.[ci]??0))/2;const t3=((n.seq5?.[ci]??0)+(n.seq6?.[ci]??0))/2;return(t1+t2+t3)/3;
    };
    const allN=elevesSection.filter(e=>NOTES[e.matricule]).map(e=>getNote(NOTES[e.matricule]));
    const noteE=getNote(notesEleve);
    const sorted=[...allN].sort((a,b)=>b-a);
    const rang=sorted.findIndex(n=>Math.abs(n-noteE)<0.01)+1;
    return{rang:rang||1,max:Math.max(...allN).toFixed(1),min:Math.min(...allN).toFixed(1)};
  };

  const getStats=()=>{
    if(!notesEleve||!cols)return{rang:'—',max:'—',min:'—',moy:'—'};
    const getMoyE=(n)=>{
      if(typePeriode==='sequence'){const idx=SEQUENCES.indexOf(periode)+1;return getMoyGen(n[`seq${idx}`]??[],coeffs);}
      if(typePeriode==='trimestre'){const tIdx=TRIMESTRES.indexOf(periode)+1;const s1=tIdx*2-1;const s2=tIdx*2;return parseFloat(((getMoyGen(n[`seq${s1}`]??[],coeffs)+getMoyGen(n[`seq${s2}`]??[],coeffs))/2).toFixed(2));}
      const t1=(getMoyGen(n.seq1??[],coeffs)+getMoyGen(n.seq2??[],coeffs))/2;const t2=(getMoyGen(n.seq3??[],coeffs)+getMoyGen(n.seq4??[],coeffs))/2;const t3=(getMoyGen(n.seq5??[],coeffs)+getMoyGen(n.seq6??[],coeffs))/2;return parseFloat(((t1+t2+t3)/3).toFixed(2));
    };
    const allMoys=elevesSection.filter(e=>NOTES[e.matricule]).map(e=>getMoyE(NOTES[e.matricule]));
    const moyE=getMoyE(notesEleve);
    const sorted=[...allMoys].sort((a,b)=>b-a);
    const rang=sorted.findIndex(n=>Math.abs(n-moyE)<0.01)+1;
    return{rang:rang||1,max:Math.max(...allMoys).toFixed(2),min:Math.min(...allMoys).toFixed(2),moy:moyE.toFixed(2)};
  };

  const getMoyGroupeAuto=(g,start)=>{
    if(!cols)return'—';
    const n=g.matieres.map((_,i)=>{const d=cols.getData(start+i);return parseFloat(d[d.length-1]);});
    return getMoyGroupe(n,g.matieres);
  };

  const stats=eleveId?getStats():null;
  let mIdx=0;

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Bulletin de notes</h1><p className="page-sub">Générez les bulletins par séquence, trimestre ou annuel.</p></div>
        {eleveId&&<button className="btn-primary" onClick={()=>window.print()}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>Imprimer / PDF</button>}
      </div>

      <div className="card mb-18">
        <div className="filters-row">
          <div className="filter-group"><label>Année scolaire</label>
            <select className="fselect" value={annee} onChange={e=>setAnnee(e.target.value)}>{ANNEES.map(a=><option key={a}>{a}</option>)}</select>
          </div>
          <div className="filter-group"><label>Section</label>
            <select className="fselect" value={section} onChange={e=>{setSection(e.target.value);setClasse(CLASSES[e.target.value][CLASSES[e.target.value].length-1]);setEleveId('');}}>{SECTIONS.map(s=><option key={s}>{s}</option>)}</select>
          </div>
          <div className="filter-group"><label>Classe</label>
            <select className="fselect" value={classe} onChange={e=>{setClasse(e.target.value);setEleveId('');}}>{CLASSES[section].map(c=><option key={c}>{c}</option>)}</select>
          </div>
          <div className="filter-group"><label>Type</label>
            <select className="fselect" value={typePeriode} onChange={e=>handleType(e.target.value)}>
              <option value="sequence">Séquence</option><option value="trimestre">Trimestre</option><option value="annuel">Annuel</option>
            </select>
          </div>
          {typePeriode!=='annuel'&&<div className="filter-group"><label>Période</label>
            <select className="fselect" value={periode} onChange={e=>setPeriode(e.target.value)}>{(typePeriode==='sequence'?SEQUENCES:TRIMESTRES).map(p=><option key={p}>{p}</option>)}</select>
          </div>}
          <div className="filter-group fg-2"><label>Rechercher</label>
            <div className="input-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input className="finput" placeholder="Nom ou matricule..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
          </div>
          <div className="filter-group fg-2"><label>Élève</label>
            <select className="fselect" value={eleveId} onChange={e=>setEleveId(e.target.value)}>
              <option value="">Choisir...</option>
              {ELEVES.filter(e=>e.section===section&&e.classe===classe&&(!search||e.nom.toLowerCase().includes(search.toLowerCase())||e.prenom.toLowerCase().includes(search.toLowerCase()))).map(e=>(
                <option key={e.matricule} value={e.matricule}>{e.nom} {e.prenom}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!eleveId&&(
        <div className="card" style={{padding:20}}>
          <div style={{fontSize:13,fontWeight:600,color:'#1E1B4B',marginBottom:12}}>
            {isMat?'🌟 Classe Maternelle':'📚 Classe Primaire'} — {classe} — {section} — {annee}
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
            {ELEVES.filter(e=>e.section===section&&e.classe===classe).map(e=>(
              <button key={e.matricule} onClick={()=>setEleveId(e.matricule)}
                style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',background:'#F8FAFF',border:'1.5px solid #EDE9FE',borderRadius:10,cursor:'pointer',fontFamily:'inherit'}}
                onMouseEnter={ev=>{ev.currentTarget.style.borderColor='#4C1D95';ev.currentTarget.style.background='#ede9fe';}}
                onMouseLeave={ev=>{ev.currentTarget.style.borderColor='#EDE9FE';ev.currentTarget.style.background='#F8FAFF';}}>
                <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#3B0764,#4C1D95)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:11,fontWeight:700}}>{e.nom[0]}{e.prenom[0]}</div>
                <div><div style={{fontWeight:600,fontSize:13,color:'#1E1B4B'}}>{e.nom} {e.prenom}</div><div style={{fontSize:11,color:'#94a3b8'}}>{e.matricule}</div></div>
              </button>
            ))}
          </div>
        </div>
      )}

      {eleveId&&cols&&(
        <div className="bulletin-container">
          <div className="bulletin-header">
            <div className="bulletin-header-left">
              <div className="bul-republic">RÉPUBLIQUE DU CAMEROUN</div>
              <div className="bul-sub">Ministère des Enseignements de Base</div>
              <div className="bul-sub">Délégation Régionale du Centre</div>
              <div className="bul-sub" style={{fontStyle:'italic'}}>Yaoundé — Biyem-Assi</div>
            </div>
            <div className="bulletin-header-center">
              <div className="bul-logo-name">GEP <span style={{color:'#06B6D4'}}>Nebula</span></div>
              <div className="bul-logo-sub">École {isMat?'Maternelle et':''}  Primaire — Yaoundé, Biyem-Assi</div>
              <div className="bul-title">{typePeriode==='annuel'?'BULLETIN ANNUEL':typePeriode==='trimestre'?`BULLETIN — ${periode.toUpperCase()}`:`BULLETIN — ${periode.toUpperCase()}`}</div>
              <div className="bul-annee">Année Scolaire : {annee}</div>
            </div>
            <div className="bulletin-header-right">
              <div className="bul-republic" style={{textAlign:'right'}}>REPUBLIC OF CAMEROON</div>
              <div className="bul-sub" style={{textAlign:'right'}}>Ministry of Basic Education</div>
              <div className="bul-sub" style={{textAlign:'right'}}>Regional Delegation of Centre</div>
              <div className="bul-sub" style={{textAlign:'right',fontStyle:'italic'}}>Yaoundé — Biyem-Assi</div>
            </div>
          </div>

          <div className="bul-eleve-wrap">
            <div className="bul-eleve-info">
              <div className="bul-info-row">
                <span className="bul-label">Nom et Prénom :</span><span className="bul-value">{eleve.nom} {eleve.prenom}</span>
                <span className="bul-label" style={{marginLeft:16}}>Matricule :</span><span className="bul-value">{eleve.matricule}</span>
                <span className="bul-label" style={{marginLeft:16}}>Rang :</span><span className="bul-value" style={{color:'#4C1D95'}}>{stats.rang} / {eleve.effectif}</span>
              </div>
              <div className="bul-info-row">
                <span className="bul-label">Date de Naissance :</span><span className="bul-value">{eleve.dateNaiss}</span>
                <span className="bul-label" style={{marginLeft:16}}>Lieu :</span><span className="bul-value">{eleve.lieuNaiss}</span>
                <span className="bul-label" style={{marginLeft:16}}>Sexe :</span><span className="bul-value">{eleve.sexe}</span>
              </div>
              <div className="bul-info-row">
                <span className="bul-label">Classe :</span><span className="bul-value">{eleve.classe}</span>
                <span className="bul-label" style={{marginLeft:16}}>Effectif :</span><span className="bul-value">{eleve.effectif}</span>
                <span className="bul-label" style={{marginLeft:16}}>Section :</span><span className="bul-value">{eleve.section}</span>
                <span className="bul-label" style={{marginLeft:16}}>Niveau :</span><span className="bul-value">{isMat?'Maternelle':'Primaire'}</span>
              </div>
              <div className="bul-info-row">
                <span className="bul-label">Enseignant Principal :</span><span className="bul-value">{eleve.enseignant}</span>
                <span className="bul-label" style={{marginLeft:16}}>Redoublant :</span><span className="bul-value">{eleve.redoublant}</span>
              </div>
            </div>
            <div onClick={()=>fileRef.current?.click()} style={{cursor:'pointer'}}>
              {photoMap[eleveId]?<img src={photoMap[eleveId]} alt="Photo" style={{width:80,height:95,objectFit:'cover',borderRadius:6}}/>
                :<div className="bul-photo-placeholder"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span style={{fontSize:10,color:'#94a3b8'}}>Photo</span></div>}
              <input type="file" accept="image/*" style={{display:'none'}} ref={fileRef} onChange={handlePhoto}/>
            </div>
          </div>

          <table className="bul-table">
            <thead>
              <tr>
                <th className="col-mat">MATIÈRES</th>
                <th className="col-ens">Enseignant</th>
                {cols.headers.map(h=><th key={h} className="col-note">{h}</th>)}
                <th className="col-coeff">Coeff</th>
                <th className="col-note">Moy×C</th>
                <th className="col-rang">Rang</th>
                <th className="col-note">Max</th>
                <th className="col-note">Min</th>
                <th className="col-appre">Appréciation</th>
              </tr>
            </thead>
            <tbody>
              {groupes.map(g=>{
                const gStart=mIdx;
                const rows=g.matieres.map(mat=>{
                  const ci=mIdx++;
                  const data=cols.getData(ci);
                  const lastVal=parseFloat(data[data.length-1]);
                  const moyC=(lastVal*mat.coeff).toFixed(1);
                  const appre=getAppreciation(lastVal);
                  const rm=getRangMatiere(ci);
                  return (
                    <tr key={mat.nom}>
                      <td className="col-mat">{mat.nom}</td>
                      <td className="col-ens">{mat.enseignant}</td>
                      {data.map((v,i)=><td key={i} className="col-note" style={{color:parseFloat(v)>=10?'#059669':'#E11D48',fontWeight:i===data.length-1?700:500}}>{v}</td>)}
                      <td className="col-coeff">{mat.coeff}</td>
                      <td className="col-note" style={{fontWeight:600}}>{moyC}</td>
                      <td className="col-rang" style={{fontWeight:700,color:'#4C1D95'}}>{rm.rang}</td>
                      <td className="col-note" style={{color:'#059669'}}>{rm.max}</td>
                      <td className="col-note" style={{color:'#E11D48'}}>{rm.min}</td>
                      <td className="col-appre" style={{fontStyle:'italic',color:'#6B7280'}}>{appre}</td>
                    </tr>
                  );
                });
                const moyG=getMoyGroupeAuto(g,gStart);
                return [
                  <tr key={g.groupe} className="bul-groupe-row"><td colSpan={4+cols.headers.length}>{g.groupe}</td></tr>,
                  ...rows,
                  <tr key={`mg-${g.groupe}`} className="bul-moy-row">
                    <td colSpan={2+cols.headers.length} style={{fontStyle:'italic',color:'#4C1D95',fontWeight:600}}>Moyenne du Groupe :</td>
                    <td colSpan={5} style={{fontWeight:700,color:parseFloat(moyG)>=10?'#059669':'#E11D48'}}>{moyG} / 20</td>
                  </tr>
                ];
              })}
            </tbody>
          </table>

          <div className="bul-resultats">
            <div className="bul-res-title">{typePeriode==='annuel'?'Résultats Annuels':`Résultats — ${periode}`}</div>
            <table className="bul-resume">
              <thead><tr><th>Total Coefficients</th><th>Moyenne Générale</th><th>Rang</th><th>Moy. Max Classe</th><th>Moy. Min Classe</th><th>Appréciation</th></tr></thead>
              <tbody><tr>
                <td style={{fontWeight:600}}>{coeffs.reduce((a,b)=>a+b,0)}</td>
                <td style={{fontWeight:700,color:parseFloat(stats.moy)>=10?'#4C1D95':'#E11D48',fontSize:14}}>{stats.moy} / 20</td>
                <td style={{fontWeight:700,color:'#4C1D95'}}>{stats.rang} / {eleve.effectif}</td>
                <td style={{color:'#059669',fontWeight:600}}>{stats.max}</td>
                <td style={{color:'#E11D48',fontWeight:600}}>{stats.min}</td>
                <td style={{fontStyle:'italic',color:'#6B7280'}}>{getAppreciation(parseFloat(stats.moy))}</td>
              </tr></tbody>
            </table>
          </div>

          <div className="bul-decisions">
            <table className="bul-dec-table">
              <tbody>
                <tr>
                  <td className="bul-dec-label" rowSpan={2}>Discipline</td>
                  <td>J :</td><td>TB □</td><td>BIEN □</td><td>AB □</td><td>PASS □</td>
                  <td className="bul-obs" rowSpan={4}><div style={{fontWeight:600,fontSize:10.5,color:'#4C1D95',marginBottom:4}}>Observations Enseignant Principal</div><div style={{height:40}}></div><div style={{fontSize:10,color:'#94a3b8'}}>Signature :</div></td>
                  <td className="bul-obs" rowSpan={4}><div style={{fontWeight:600,fontSize:10.5,color:'#4C1D95',marginBottom:4}}>Observations du Directeur</div><div style={{height:40}}></div><div style={{fontSize:10,color:'#94a3b8'}}>Cachet & Signature :</div></td>
                </tr>
                <tr><td>NJ :</td><td>MED □</td><td>INS □</td><td>FAIB □</td><td>NULL □</td></tr>
                <tr><td className="bul-dec-label" rowSpan={2}>Absences</td><td colSpan={5}>Justifiées : _____ &nbsp;&nbsp; Non justifiées : _____</td></tr>
                <tr><td colSpan={5}>Avertissements : ___ &nbsp; Exclusions : ___ &nbsp; Tableau d'honneur : □</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bul-signatures">
            <div className="bul-sign-box"><div className="bul-sign-title">Visa des Parents / Tuteur</div><div style={{height:40}}></div></div>
            <div className="bul-sign-box"><div className="bul-sign-title">Visa du Chef d'Établissement</div><div style={{height:40}}></div></div>
          </div>
        </div>
      )}
    </div>
  );
}
