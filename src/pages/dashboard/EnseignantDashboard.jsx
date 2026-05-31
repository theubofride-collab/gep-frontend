
import React, { useState } from "react";
 
const C = {
  primary:"#4C1D95", primaryHov:"#6D28D9", accent:"#06B6D4",
  pageBg:"#F8FAFF", sidebar:"#1E0B3B", card:"#FFFFFF",
  textMain:"#1E1B4B", textSec:"#6B7280", border:"#EDE9FE",
  success:"#059669", danger:"#E11D48", warning:"#D97706", info:"#0891B2",
};
const AVG = ["#4C1D95","#06B6D4","#059669","#D97706","#E11D48","#6D28D9","#0891B2"];
 
function Avatar({ initials, size=38, idx=0 }) {
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:AVG[idx%AVG.length],
      color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size*0.34, fontWeight:"bold", flexShrink:0 }}>
      {initials}
    </div>
  );
}
 
function Badge({ label, type="info" }) {
  const s = { success:{bg:"#D1FAE5",c:"#059669"}, danger:{bg:"#FFE4E6",c:"#E11D48"},
    warning:{bg:"#FEF3C7",c:"#D97706"}, info:{bg:"#CFFAFE",c:"#0891B2"}, purple:{bg:"#EDE9FE",c:"#4C1D95"} };
  const st = s[type]||s.info;
  return <span style={{ fontSize:"11px", padding:"3px 10px", borderRadius:"20px",
    background:st.bg, color:st.c, fontWeight:"600" }}>{label}</span>;
}
 
function StatCard({ label, value, change, icon, color, bg }) {
  return (
    <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px",
      padding:"20px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div>
        <p style={{ fontSize:"11px", color:C.textSec, margin:"0 0 8px",
          textTransform:"uppercase", letterSpacing:"0.8px", fontWeight:"600" }}>{label}</p>
        <p style={{ fontSize:"28px", fontWeight:"700", color:C.textMain, margin:"0 0 8px" }}>{value}</p>
        {change && <span style={{ fontSize:"11px", color, background:bg,
          padding:"3px 8px", borderRadius:"20px", fontWeight:"600" }}>↗ {change}</span>}
      </div>
      <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:bg,
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", flexShrink:0 }}>
        {icon}
      </div>
    </div>
  );
}
 
const NAV = [
  { title:"MA CLASSE", items:[
    { label:"Tableau de bord", icon:"🏠" },
    { label:"Mes élèves", icon:"🎒" },
    { label:"Emploi du temps", icon:"📅" },
  ]},
  { title:"EVALUATION", items:[
    { label:"Saisir les notes", icon:"✏️" },
    { label:"Bulletins", icon:"📄" },
    { label:"Devoirs & Exercices", icon:"📝" },
  ]},
  { title:"SUIVI", items:[
    { label:"Absences du jour", icon:"📍", badge:3 },
    { label:"Signalements", icon:"⚠️", badge:2 },
    { label:"Historique présences", icon:"🕐" },
  ]},
  { title:"COMMUNICATION", items:[
    { label:"Messages parents", icon:"💬" },
    { label:"Annonces", icon:"📢" },
    { label:"Paramètres", icon:"⚙️" },
  ]},
];
 
var ELEVES = [
  { initials:"EN", name:"Emma Ndzie", avg:15.5, presence:98, statut:"Excellent", type:"success", absent:false, signalement:null },
  { initials:"LN", name:"Lucas Ndzi", avg:13.0, presence:92, statut:"Bon", type:"info", absent:false, signalement:null },
  { initials:"ST", name:"Sarah Tchoumi", avg:10.5, presence:85, statut:"À suivre", type:"warning", absent:true, signalement:"Turbulences répétées" },
  { initials:"KD", name:"Kofi Diallo", avg:17.0, presence:99, statut:"Excellent", type:"success", absent:false, signalement:null },
  { initials:"MB", name:"Marie Bah", avg:8.5, presence:78, statut:"En difficulté", type:"danger", absent:false, signalement:"Difficultés en lecture" },
  { initials:"OT", name:"Omar Touré", avg:14.2, presence:95, statut:"Bon", type:"info", absent:true, signalement:null },
  { initials:"FD", name:"Fatou Diop", avg:11.8, presence:88, statut:"Moyen", type:"warning", absent:false, signalement:null },
  { initials:"YS", name:"Yves Sow", avg:6.5, presence:70, statut:"En difficulté", type:"danger", absent:true, signalement:"Comportement agressif" },
];
 
var MATIERES = ["Français","Mathématiques","Sciences","Histoire-Géo","Anglais","EPS","Art Plastique"];
 
var ALERTES_INCIDENTS = [
  { eleve:"Sarah Tchoumi", motif:"Turbulences répétées en classe", heure:"08h30", gravite:"warning" },
  { eleve:"Yves Sow", motif:"Comportement agressif envers un camarade", heure:"10h15", gravite:"danger" },
];
 
var NOTES_A_SAISIR = [
  { matiere:"Mathématiques", type:"Devoir 3", deadline:"Demain", eleves:28 },
  { matiere:"Français", type:"Contrôle T2", deadline:"Vendredi", eleves:28 },
  { matiere:"Sciences", type:"TP noté", deadline:"Semaine prochaine", eleves:28 },
];
 
export default function EnseignantDashboard() {
  var [activeNav, setActiveNav] = useState("Tableau de bord");
  var [activeTab, setActiveTab] = useState("tous");
  var [notes, setNotes] = useState({});
 
  var absentsAujourdhui = ELEVES.filter(function(e){ return e.absent; });
  var signalements = ELEVES.filter(function(e){ return e.signalement; });
 
  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Segoe UI', sans-serif", background:C.pageBg }}>
      <style>{`
        @media (max-width: 1024px) {
          aside { width: 200px; } header { padding: 0 16px; }
          main { padding: 16px; }
          [style*="gridTemplateColumns: repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
          [style*="gridTemplateColumns: 1fr 380px"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          aside { position: fixed; left: -240px; top: 0; z-index: 999; transition: left 0.3s; width: 240px; height: 100vh; }
          [data-testid="sidebar-open"] { left: 0; }
          header { padding: 0 12px; height: 56px; }
          header > div:first-child { width: 200px; }
          main { padding: 12px; }
          [style*="gridTemplateColumns: repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
          [style*="gridTemplateColumns: repeat(2,1fr)"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 1fr 380px"] { grid-template-columns: 1fr !important; }
          [style*="padding: 20px 24px"] { padding: 16px !important; }
          h1 { font-size: 20px !important; }
          h2 { font-size: 18px !important; }
          h3 { font-size: 14px !important; }
          table { font-size: 12px !important; }
        }
        @media (max-width: 480px) {
          aside { display: none; }
          header { flex-direction: column; height: auto; gap: 8px; padding: 8px 12px !important; }
          main { padding: 8px; }
          [style*="gridTemplateColumns: repeat(4,1fr)"] { grid-template-columns: 1fr !important; }
          [style*="padding: 40px 48px"] { padding: 16px 12px !important; }
          [style*="padding: 20px 24px"] { padding: 12px !important; }
          h1 { font-size: 18px !important; }
          table { font-size: 11px !important; overflow-x: auto; }
        }
      `}</style>
 
      {/* Sidebar */}
      <aside style={{ width:"240px", minHeight:"100vh", background:C.sidebar,
        display:"flex", flexDirection:"column", flexShrink:0 }}>
        <div style={{ padding:"24px 20px 20px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ width:"36px", height:"36px", borderRadius:"10px",
              background:"linear-gradient(135deg,#6D28D9,#06B6D4)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px" }}>🎓</div>
            <div>
              <div style={{ color:"#fff", fontWeight:"700", fontSize:"15px" }}>GEP Nebular</div>
              <div style={{ color:"#A78BFA", fontSize:"11px" }}>Espace Enseignant</div>
            </div>
          </div>
        </div>
 
        <nav style={{ flex:1, padding:"16px 12px", overflowY:"auto" }}>
          {NAV.map(function(section) {
            return (
              <div key={section.title} style={{ marginBottom:"20px" }}>
                <div style={{ color:"#7C3AED", fontSize:"10px", fontWeight:"700",
                  letterSpacing:"1.2px", padding:"0 8px", marginBottom:"6px" }}>
                  {section.title}
                </div>
                {section.items.map(function(item) {
                  var isActive = activeNav === item.label;
                  return (
                    <button key={item.label} onClick={function(){setActiveNav(item.label);}} style={{
                      display:"flex", alignItems:"center", gap:"10px", width:"100%",
                      padding:"9px 12px", borderRadius:"8px", border:"none", cursor:"pointer",
                      marginBottom:"2px",
                      background:isActive?"rgba(109,40,217,0.35)":"transparent",
                      color:isActive?"#C4B5FD":"#94A3B8",
                      fontSize:"13px", fontWeight:isActive?"600":"400", textAlign:"left",
                      borderLeft:isActive?"3px solid #7C3AED":"3px solid transparent"
                    }}>
                      <span>{item.icon}</span>
                      <span style={{ flex:1 }}>{item.label}</span>
                      {item.badge && (
                        <span style={{ background:C.danger, color:"#fff", borderRadius:"10px",
                          fontSize:"10px", fontWeight:"700", padding:"1px 7px" }}>{item.badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
 
        <div style={{ padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,0.08)",
          display:"flex", alignItems:"center", gap:"10px" }}>
          <Avatar initials="MS" size={36} idx={0} />
          <div>
            <div style={{ color:"#fff", fontSize:"13px", fontWeight:"600" }}>Mme Sophie Ngo</div>
            <div style={{ color:"#7C3AED", fontSize:"11px" }}>CM1-A · Primaire FR</div>
          </div>
        </div>
      </aside>
 
      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
 
        {/* Topbar */}
        <header style={{ background:C.card, borderBottom:"1px solid "+C.border,
          padding:"0 28px", height:"64px",
          display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:"12px", top:"50%",
              transform:"translateY(-50%)", color:C.textSec, fontSize:"14px" }}>🔍</span>
            <input type="text" placeholder="Rechercher un élève de ma classe..."
              style={{ padding:"9px 14px 9px 36px", borderRadius:"10px",
                border:"1px solid "+C.border, fontSize:"13px", outline:"none",
                width:"300px", background:C.pageBg, color:C.textMain }} />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
            <div style={{ position:"relative", cursor:"pointer" }}>
              <span style={{ fontSize:"20px" }}>🔔</span>
              <span style={{ position:"absolute", top:"-4px", right:"-4px", width:"16px", height:"16px",
                borderRadius:"50%", background:C.danger, color:"#fff", fontSize:"9px",
                display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold" }}>2</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:"13px", fontWeight:"600", color:C.textMain }}>Mme Sophie Ngo</div>
                <div style={{ fontSize:"11px", color:C.textSec }}>CM1-A · Primaire FR</div>
              </div>
              <Avatar initials="SN" size={36} idx={0} />
            </div>
          </div>
        </header>
 
        {/* Content */}
        <main style={{ flex:1, padding:"28px", overflowY:"auto" }}>
 
          {/* Welcome */}
          <div style={{ marginBottom:"24px" }}>
            <h1 style={{ fontSize:"24px", fontWeight:"700", color:C.textMain, margin:"0 0 4px" }}>
              Bonjour, Mme Sophie Ngo
            </h1>
            <p style={{ fontSize:"14px", color:C.textSec, margin:0 }}>
              Classe CM1-A · Section Primaire Francophone · 28 élèves
            </p>
          </div>
 
          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"24px" }}>
            <StatCard label="Total élèves (ma classe)" value="28" change="CM1-A FR" icon="🎒" color={C.primary} bg="#EDE9FE" />
            <StatCard label="Notes à saisir" value="3" change="délais proches" icon="✏️" color={C.warning} bg="#FEF3C7" />
            <StatCard label="Absences aujourd'hui" value={absentsAujourdhui.length.toString()} change="à justifier" icon="📍" color={C.danger} bg="#FFE4E6" />
            <StatCard label="Alertes / Incidents" value={ALERTES_INCIDENTS.length.toString()} change="dans ma salle" icon="⚠️" color={C.info} bg="#CFFAFE" />
          </div>
 
          {/* Alertes incidents — bandeau rouge si présents */}
          {ALERTES_INCIDENTS.length > 0 && (
            <div style={{ background:"#FFF1F2", border:"1px solid #FFE4E6", borderRadius:"14px",
              padding:"16px 20px", marginBottom:"24px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                <span style={{ fontSize:"18px" }}>🚨</span>
                <h3 style={{ fontSize:"14px", fontWeight:"700", color:C.danger, margin:0 }}>
                  Incidents détectés dans ma salle aujourd'hui
                </h3>
                <Badge label={ALERTES_INCIDENTS.length+" alerte(s)"} type="danger" />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                {ALERTES_INCIDENTS.map(function(a, i) {
                  return (
                    <div key={i} style={{ background:"#fff", border:"1px solid #FFE4E6",
                      borderRadius:"10px", padding:"12px 14px",
                      borderLeft:"4px solid "+(a.gravite==="danger"?C.danger:C.warning) }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                        <span style={{ fontSize:"13px", fontWeight:"700", color:C.textMain }}>{a.eleve}</span>
                        <span style={{ fontSize:"11px", color:C.textSec }}>{a.heure}</span>
                      </div>
                      <p style={{ fontSize:"12px", color:a.gravite==="danger"?C.danger:C.warning, margin:0 }}>{a.motif}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
 
          {/* Notes à saisir + Absences */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:"20px", marginBottom:"24px" }}>
 
            {/* Notes à saisir */}
            <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px", padding:"20px 24px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                <h3 style={{ fontSize:"15px", fontWeight:"700", margin:0, color:C.textMain }}>
                  ✏️ Notes à saisir
                </h3>
                <button style={{ fontSize:"12px", padding:"8px 16px", borderRadius:"8px",
                  background:C.primary, color:"#fff", border:"none", cursor:"pointer", fontWeight:"600" }}>
                  + Nouvelle évaluation
                </button>
              </div>
              {NOTES_A_SAISIR.map(function(n, i) {
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"14px",
                    padding:"12px", borderRadius:"10px", background:C.pageBg,
                    marginBottom:i<NOTES_A_SAISIR.length-1?"10px":"0",
                    border:"1px solid "+C.border }}>
                    <div style={{ width:"40px", height:"40px", borderRadius:"10px",
                      background:"#EDE9FE", display:"flex", alignItems:"center",
                      justifyContent:"center", fontSize:"18px" }}>✏️</div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:"13px", fontWeight:"600", color:C.textMain, margin:"0 0 2px" }}>
                        {n.matiere} — {n.type}
                      </p>
                      <p style={{ fontSize:"11px", color:C.textSec, margin:0 }}>
                        {n.eleves} élèves · Deadline : {n.deadline}
                      </p>
                    </div>
                    <button style={{ fontSize:"11px", padding:"6px 12px", borderRadius:"8px",
                      background:C.primary, color:"#fff", border:"none", cursor:"pointer", fontWeight:"600" }}>
                      Saisir
                    </button>
                  </div>
                );
              })}
 
              {/* Saisie rapide de note */}
              <div style={{ marginTop:"20px", padding:"16px", background:C.pageBg,
                borderRadius:"10px", border:"1px solid "+C.border }}>
                <p style={{ fontSize:"13px", fontWeight:"600", color:C.textMain, margin:"0 0 12px" }}>
                  Saisie rapide — Mathématiques DS3
                </p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px" }}>
                  {ELEVES.slice(0,6).map(function(e, i) {
                    return (
                      <div key={i} style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
                        <span style={{ fontSize:"11px", color:C.textSec }}>{e.name.split(" ")[0]}</span>
                        <input
                          type="number" min="0" max="20"
                          placeholder="—/20"
                          value={notes[e.name]||""}
                          onChange={function(ev){
                            var n2 = Object.assign({}, notes);
                            n2[e.name] = ev.target.value;
                            setNotes(n2);
                          }}
                          style={{ padding:"6px 8px", borderRadius:"6px", border:"1px solid "+C.border,
                            fontSize:"12px", outline:"none", width:"100%", background:"#fff" }}
                        />
                      </div>
                    );
                  })}
                </div>
                <button style={{ width:"100%", marginTop:"12px", padding:"10px",
                  borderRadius:"8px", background:C.success, color:"#fff",
                  border:"none", cursor:"pointer", fontSize:"13px", fontWeight:"600" }}>
                  ✅ Enregistrer les notes
                </button>
              </div>
            </div>
 
            {/* Absences + Signalements */}
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
 
              {/* Absences du jour */}
              <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px", padding:"20px 24px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
                  <h3 style={{ fontSize:"15px", fontWeight:"700", margin:0, color:C.textMain }}>
                    📍 Absences aujourd'hui
                  </h3>
                  <Badge label={absentsAujourdhui.length+" absent(s)"} type="danger" />
                </div>
                {absentsAujourdhui.length === 0 ? (
                  <p style={{ fontSize:"13px", color:C.success, fontWeight:"600", textAlign:"center", padding:"12px 0" }}>
                    ✅ Tous les élèves sont présents !
                  </p>
                ) : (
                  absentsAujourdhui.map(function(e, i) {
                    return (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px",
                        padding:"10px", borderRadius:"8px", background:"#FFF1F2",
                        marginBottom:i<absentsAujourdhui.length-1?"8px":"0",
                        border:"1px solid #FFE4E6" }}>
                        <Avatar initials={e.initials} size={30} idx={i+1} />
                        <div style={{ flex:1 }}>
                          <p style={{ fontSize:"13px", fontWeight:"600", color:C.textMain, margin:"0 0 1px" }}>{e.name}</p>
                          <p style={{ fontSize:"11px", color:C.textSec, margin:0 }}>Absence non justifiée</p>
                        </div>
                        <button style={{ fontSize:"10px", padding:"4px 8px", borderRadius:"6px",
                          background:"transparent", color:C.danger,
                          border:"1px solid "+C.danger, cursor:"pointer", fontWeight:"600" }}>
                          Notifier
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
 
              {/* Signalements */}
              <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px", padding:"20px 24px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
                  <h3 style={{ fontSize:"15px", fontWeight:"700", margin:0, color:C.textMain }}>
                    ⚠️ Signalements élèves
                  </h3>
                  <button style={{ fontSize:"11px", padding:"5px 10px", borderRadius:"6px",
                    background:C.danger, color:"#fff", border:"none", cursor:"pointer", fontWeight:"600" }}>
                    + Signaler
                  </button>
                </div>
                {signalements.map(function(e, i) {
                  return (
                    <div key={i} style={{ padding:"10px 12px", borderRadius:"8px",
                      background:"#FFFBEB", border:"1px solid #FEF3C7",
                      marginBottom:i<signalements.length-1?"8px":"0" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
                        <Avatar initials={e.initials} size={26} idx={i+4} />
                        <span style={{ fontSize:"12px", fontWeight:"600", color:C.textMain }}>{e.name}</span>
                      </div>
                      <p style={{ fontSize:"11px", color:C.warning, margin:0, fontWeight:"500" }}>
                        {e.signalement}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
 
          {/* Tableau des élèves de la classe */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px", padding:"20px 24px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
              <div>
                <h3 style={{ fontSize:"15px", fontWeight:"700", margin:"0 0 2px", color:C.textMain }}>
                  Mes élèves — CM1-A
                </h3>
                <p style={{ fontSize:"12px", color:C.textSec, margin:0 }}>
                  Section Primaire Francophone · 28 élèves · Année 2025/2026
                </p>
              </div>
              {/* Filtres */}
              <div style={{ display:"flex", gap:"6px" }}>
                {[
                  { key:"tous", label:"Tous" },
                  { key:"absents", label:"Absents" },
                  { key:"difficultés", label:"En difficulté" },
                ].map(function(tab) {
                  var isActive = activeTab === tab.key;
                  return (
                    <button key={tab.key} onClick={function(){setActiveTab(tab.key);}} style={{
                      padding:"6px 12px", borderRadius:"8px", border:"1px solid "+C.border,
                      cursor:"pointer", fontSize:"12px", fontWeight:"600",
                      background:isActive?C.primary:"transparent",
                      color:isActive?"#fff":C.textSec
                    }}>{tab.label}</button>
                  );
                })}
              </div>
            </div>
 
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"12px" }}>
              <thead>
                <tr>
                  {["Élève","Moyenne","Présence","Statut","Aujourd'hui","Signalement","Actions"].map(function(h){
                    return <th key={h} style={{ textAlign:"left", color:C.textSec, fontWeight:"600",
                      padding:"8px 10px", borderBottom:"1px solid "+C.border,
                      fontSize:"11px", textTransform:"uppercase", letterSpacing:"0.8px" }}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {ELEVES.filter(function(e){
                  if(activeTab==="absents") return e.absent;
                  if(activeTab==="difficultés") return e.type==="danger";
                  return true;
                }).map(function(e, i, arr) {
                  var isLast = i === arr.length - 1;
                  return (
                    <tr key={i} style={{ background:e.absent?"#FFF8F8":i%2===0?"transparent":C.pageBg }}>
                      <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                          <div style={{ position:"relative" }}>
                            <Avatar initials={e.initials} size={30} idx={i} />
                            {e.absent && (
                              <span style={{ position:"absolute", top:"-2px", right:"-2px",
                                width:"10px", height:"10px", borderRadius:"50%",
                                background:C.danger, border:"2px solid #fff" }} />
                            )}
                          </div>
                          <span style={{ fontWeight:"600", color:C.textMain }}>{e.name}</span>
                        </div>
                      </td>
                      <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border,
                        fontWeight:"700",
                        color:e.avg>=14?C.success:e.avg>=10?C.warning:C.danger }}>
                        {e.avg}/20
                      </td>
                      <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                          <div style={{ width:"60px", height:"5px", borderRadius:"3px", background:C.border, overflow:"hidden" }}>
                            <div style={{ width:e.presence+"%", height:"100%", borderRadius:"3px",
                              background:e.presence>=90?C.success:e.presence>=80?C.warning:C.danger }} />
                          </div>
                          <span style={{ fontSize:"11px", color:C.textSec }}>{e.presence}%</span>
                        </div>
                      </td>
                      <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                        <Badge label={e.statut} type={e.type} />
                      </td>
                      <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                        {e.absent
                          ? <Badge label="Absent" type="danger" />
                          : <Badge label="Présent" type="success" />}
                      </td>
                      <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                        {e.signalement
                          ? <span style={{ fontSize:"11px", color:C.warning }}>{e.signalement}</span>
                          : <span style={{ fontSize:"11px", color:C.textSec }}>—</span>}
                      </td>
                      <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                        <div style={{ display:"flex", gap:"4px" }}>
                          <button style={{ fontSize:"10px", padding:"4px 8px", borderRadius:"6px",
                            background:"#EDE9FE", color:C.primary,
                            border:"none", cursor:"pointer", fontWeight:"600" }}>Notes</button>
                          <button style={{ fontSize:"10px", padding:"4px 8px", borderRadius:"6px",
                            background:"#FFE4E6", color:C.danger,
                            border:"none", cursor:"pointer", fontWeight:"600" }}>Signal.</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
 
          {/* Matières rapides */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px",
            padding:"20px 24px", marginTop:"20px" }}>
            <h3 style={{ fontSize:"15px", fontWeight:"700", margin:"0 0 14px", color:C.textMain }}>
              📚 Mes matières — Actions rapides
            </h3>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
              {MATIERES.map(function(m, i) {
                return (
                  <button key={i} style={{ padding:"10px 16px", borderRadius:"10px",
                    border:"1px solid "+C.border, cursor:"pointer",
                    background:C.pageBg, fontSize:"12px", color:C.textMain,
                    fontWeight:"600", display:"flex", alignItems:"center", gap:"6px" }}>
                    <span style={{ width:"8px", height:"8px", borderRadius:"50%",
                      background:AVG[i%AVG.length], display:"inline-block" }} />
                    {m}
                  </button>
                );
              })}
            </div>
          </div>
 
        </main>
      </div>
    </div>
  );
}
