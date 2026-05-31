
import React, { useState } from "react";
 
// ── Palette ──────────────────────────────────────────────────────────
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
 
// ── Nav ──────────────────────────────────────────────────────────────
const NAV = [
  { title:"VUE GENERALE", items:[
    { label:"Tableau de bord", icon:"🏠" },
    { label:"Utilisateurs connectés", icon:"🟢" },
    { label:"Activités récentes", icon:"🕐" },
  ]},
  { title:"GESTION ECOLE", items:[
    { label:"Elèves & Classes", icon:"🎒" },
    { label:"Enseignants", icon:"👩‍🏫" },
    { label:"Emplois du temps", icon:"📅" },
    { label:"Sections & Niveaux", icon:"🏫" },
  ]},
  { title:"ADMINISTRATION", items:[
    { label:"Utilisateurs & Rôles", icon:"👤" },
    { label:"Rapports & Stats", icon:"📊" },
    { label:"Paramètres système", icon:"⚙️" },
  ]},
];
 
const CLASSES_MAT = ["Petite Section","Moyenne Section","Grande Section"];
const CLASSES_FR  = ["SIL","CP","CE1","CE2","CM1","CM2"];
const CLASSES_EN  = ["Nursery","Class 1","Class 2","Class 3","Class 4","Class 5","Class 6"];
 
const ACTIVITIES = [
  { icon:"📝", text:"M. Dupont a saisi les notes de CM2-A", time:"Il y a 5 min", type:"info" },
  { icon:"👤", text:"Nouvelle inscription : Awa Ndiaye (CE1-B)", time:"Il y a 18 min", type:"success" },
  { icon:"⚠️", text:"Incident signalé en Grande Section par Mme Kone", time:"Il y a 32 min", type:"warning" },
  { icon:"💳", text:"Paiement reçu : 75 000 FCFA — Lucas Ndzi", time:"Il y a 1 h", type:"success" },
  { icon:"🔒", text:"Connexion admin depuis un nouvel appareil", time:"Il y a 2 h", type:"danger" },
  { icon:"📊", text:"Rapport mensuel généré automatiquement", time:"Il y a 3 h", type:"purple" },
];
 
const USERS_ONLINE = [
  { initials:"MD", name:"M. Dupont", role:"Enseignant CM2", status:"En ligne", classe:"CM2-A" },
  { initials:"SK", name:"Mme Koné", role:"Enseignante GS", status:"En ligne", classe:"Grande Section" },
  { initials:"AB", name:"Mme Aïcha B.", role:"Secrétaire", status:"En ligne", classe:"—" },
  { initials:"YD", name:"Yves Diallo", role:"Comptable", status:"Inactif", classe:"—" },
  { initials:"FC", name:"Mme Fanta C.", role:"Enseignante CP", status:"En ligne", classe:"CP-B" },
];
 
const SECTIONS_DATA = [
  { section:"Maternelle Francophone", classes:CLASSES_MAT, eleves:87, enseignants:6 },
  { section:"Primaire Francophone", classes:CLASSES_FR, eleves:312, enseignants:14 },
  { section:"Primaire Anglophone", classes:CLASSES_EN, eleves:198, enseignants:10 },
  { section:"Primaire Bilingue", classes:["SIL-B","CP-B","CE1-B","CE2-B","CM1-B","CM2-B"], eleves:143, enseignants:8 },
];
 
export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("Tableau de bord");
 
  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Segoe UI', sans-serif", background:C.pageBg }}>
      <style>{`
        @media (max-width: 1024px) {
          aside { width: 200px; } header { padding: 0 16px; }
          main { padding: 16px; }
          [style*="gridTemplateColumns: repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
          [style*="gridTemplateColumns: repeat(2,1fr)"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 1fr 380px"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          aside { position: fixed; left: -240px; top: 0; z-index: 999; width: 240px; height: 100vh; }
          header { padding: 0 12px; height: 56px; }
          header > div:first-child { width: 200px; }
          main { padding: 12px; }
          [style*="gridTemplateColumns: repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
          [style*="gridTemplateColumns: repeat(2,1fr)"] { grid-template-columns: 1fr !important; }
          [style*="padding: 20px 24px"] { padding: 16px !important; }
          h1 { font-size: 20px !important; }
          h2 { font-size: 18px !important; }
          h3 { font-size: 14px !important; }
        }
        @media (max-width: 480px) {
          aside { display: none; }
          header { flex-direction: column; height: auto; gap: 8px; padding: 8px 12px !important; }
          main { padding: 8px; }
          [style*="gridTemplateColumns: repeat(4,1fr)"] { grid-template-columns: 1fr !important; }
          [style*="padding: 20px 24px"] { padding: 12px !important; }
          h1 { font-size: 18px !important; }
        }
      `}</style>
 
      {/* ── Sidebar ── */}
      <aside style={{ width:"240px", minHeight:"100vh", background:C.sidebar,
        display:"flex", flexDirection:"column", flexShrink:0 }}>
        <div style={{ padding:"24px 20px 20px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ width:"36px", height:"36px", borderRadius:"10px",
              background:"linear-gradient(135deg,#6D28D9,#06B6D4)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px" }}>🎓</div>
            <div>
              <div style={{ color:"#fff", fontWeight:"700", fontSize:"15px" }}>GEP Nebular</div>
              <div style={{ color:"#A78BFA", fontSize:"11px" }}>Espace Administrateur</div>
            </div>
          </div>
        </div>
 
        <nav style={{ flex:1, padding:"16px 12px", overflowY:"auto" }}>
          {NAV.map(function(section) {
            return (
              <div key={section.title} style={{ marginBottom:"24px" }}>
                <div style={{ color:"#7C3AED", fontSize:"10px", fontWeight:"700",
                  letterSpacing:"1.2px", padding:"0 8px", marginBottom:"8px" }}>
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
                      <span>{item.icon}</span><span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
 
        <div style={{ padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,0.08)",
          display:"flex", alignItems:"center", gap:"10px" }}>
          <Avatar initials="AD" size={36} idx={0} />
          <div>
            <div style={{ color:"#fff", fontSize:"13px", fontWeight:"600" }}>M. Administrateur</div>
            <div style={{ color:"#7C3AED", fontSize:"11px" }}>Super Admin</div>
          </div>
        </div>
      </aside>
 
      {/* ── Main ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
 
        {/* Topbar */}
        <header style={{ background:C.card, borderBottom:"1px solid "+C.border,
          padding:"0 28px", height:"64px",
          display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:"12px", top:"50%",
              transform:"translateY(-50%)", color:C.textSec, fontSize:"14px" }}>🔍</span>
            <input type="text" placeholder="Rechercher un élève, enseignant, classe..."
              style={{ padding:"9px 14px 9px 36px", borderRadius:"10px",
                border:"1px solid "+C.border, fontSize:"13px", outline:"none",
                width:"320px", background:C.pageBg, color:C.textMain }} />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
            <div style={{ position:"relative", cursor:"pointer" }}>
              <span style={{ fontSize:"20px" }}>🔔</span>
              <span style={{ position:"absolute", top:"-4px", right:"-4px", width:"16px", height:"16px",
                borderRadius:"50%", background:C.danger, color:"#fff", fontSize:"9px",
                display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold" }}>5</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:"13px", fontWeight:"600", color:C.textMain }}>M. Administrateur</div>
                <div style={{ fontSize:"11px", color:C.textSec }}>Super Admin</div>
              </div>
              <Avatar initials="AD" size={36} idx={0} />
            </div>
          </div>
        </header>
 
        {/* Content */}
        <main style={{ flex:1, padding:"28px", overflowY:"auto" }}>
 
          {/* Welcome */}
          <div style={{ marginBottom:"28px" }}>
            <h1 style={{ fontSize:"24px", fontWeight:"700", color:C.textMain, margin:"0 0 4px" }}>
              Tableau de bord Administrateur
            </h1>
            <p style={{ fontSize:"14px", color:C.textSec, margin:0 }}>
              Vue globale de l'établissement · Lundi 30 mai 2026
            </p>
          </div>
 
          {/* Stats principales */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"24px" }}>
            <StatCard label="Total élèves" value="740" change="+12 ce mois" icon="🎒" color={C.primary} bg="#EDE9FE" />
            <StatCard label="Classes actives" value="28" change="4 sections" icon="🏫" color={C.info} bg="#CFFAFE" />
            <StatCard label="Utilisateurs connectés" value="12" change="sur 38 total" icon="🟢" color={C.success} bg="#D1FAE5" />
            <StatCard label="Incidents du jour" value="3" change="-2 vs hier" icon="⚠️" color={C.warning} bg="#FEF3C7" />
          </div>
 
          {/* Sections de l'école */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px",
            padding:"20px 24px", marginBottom:"24px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
              <h3 style={{ fontSize:"15px", fontWeight:"700", margin:0, color:C.textMain }}>
                Sections & Niveaux de l'établissement
              </h3>
              <button style={{ fontSize:"12px", padding:"8px 16px", borderRadius:"8px",
                background:C.primary, color:"#fff", border:"none", cursor:"pointer", fontWeight:"600" }}>
                + Nouvelle classe
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"16px" }}>
              {SECTIONS_DATA.map(function(sec, i) {
                return (
                  <div key={i} style={{ border:"1px solid "+C.border, borderRadius:"12px", padding:"16px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
                      <span style={{ fontSize:"13px", fontWeight:"700", color:C.textMain }}>{sec.section}</span>
                      <Badge label={sec.eleves+" élèves"} type="purple" />
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"10px" }}>
                      {sec.classes.map(function(cl) {
                        return (
                          <span key={cl} style={{ fontSize:"11px", padding:"3px 8px", borderRadius:"6px",
                            background:C.pageBg, color:C.textSec, border:"1px solid "+C.border }}>
                            {cl}
                          </span>
                        );
                      })}
                    </div>
                    <p style={{ fontSize:"12px", color:C.textSec, margin:0 }}>
                      👩‍🏫 {sec.enseignants} enseignants
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
 
          {/* Deux colonnes : Activités + Utilisateurs */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:"20px" }}>
 
            {/* Activités récentes */}
            <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px", padding:"20px 24px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
                <h3 style={{ fontSize:"15px", fontWeight:"700", margin:0, color:C.textMain }}>Dernières activités</h3>
                <button style={{ fontSize:"12px", color:C.primaryHov, background:"transparent",
                  border:"none", cursor:"pointer", fontWeight:"600" }}>Tout voir →</button>
              </div>
              {ACTIVITIES.map(function(act, i) {
                return (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"12px",
                    padding:"12px 0", borderBottom:i<ACTIVITIES.length-1?"1px solid "+C.border:"none" }}>
                    <div style={{ width:"36px", height:"36px", borderRadius:"10px",
                      background:C.pageBg, display:"flex", alignItems:"center",
                      justifyContent:"center", fontSize:"16px", flexShrink:0 }}>
                      {act.icon}
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:"13px", color:C.textMain, margin:"0 0 2px", fontWeight:"500" }}>{act.text}</p>
                      <p style={{ fontSize:"11px", color:C.textSec, margin:0 }}>{act.time}</p>
                    </div>
                    <Badge label={act.type==="success"?"OK":act.type==="danger"?"Alerte":act.type==="warning"?"Attention":"Info"} type={act.type} />
                  </div>
                );
              })}
            </div>
 
            {/* Utilisateurs connectés */}
            <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px", padding:"20px 24px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                <h3 style={{ fontSize:"15px", fontWeight:"700", margin:0, color:C.textMain }}>
                  Utilisateurs <span style={{ color:C.success }}>●</span> en ligne
                </h3>
                <Badge label="12 / 38" type="success" />
              </div>
              {USERS_ONLINE.map(function(u, i) {
                var online = u.status === "En ligne";
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px",
                    padding:"10px 0", borderBottom:i<USERS_ONLINE.length-1?"1px solid "+C.border:"none" }}>
                    <div style={{ position:"relative" }}>
                      <Avatar initials={u.initials} size={36} idx={i} />
                      <span style={{
                        position:"absolute", bottom:0, right:0,
                        width:"10px", height:"10px", borderRadius:"50%",
                        background:online?C.success:"#9CA3AF",
                        border:"2px solid #fff"
                      }} />
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:"13px", fontWeight:"600", color:C.textMain, margin:"0 0 1px" }}>{u.name}</p>
                      <p style={{ fontSize:"11px", color:C.textSec, margin:0 }}>{u.role}</p>
                    </div>
                    <span style={{ fontSize:"11px", color:C.textSec }}>{u.classe}</span>
                  </div>
                );
              })}
              <button style={{ width:"100%", marginTop:"16px", padding:"10px",
                borderRadius:"10px", border:"1px solid "+C.border, background:C.pageBg,
                fontSize:"12px", color:C.primary, fontWeight:"600", cursor:"pointer" }}>
                Gérer tous les utilisateurs →
              </button>
            </div>
          </div>
 
          {/* Stats globales supplémentaires */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginTop:"24px" }}>
            <StatCard label="Taux de présence global" value="94%" change="+2% vs semaine" icon="📈" color={C.success} bg="#D1FAE5" />
            <StatCard label="Paiements en attente" value="47" change="sur 740 élèves" icon="💳" color={C.warning} bg="#FEF3C7" />
            <StatCard label="Enseignants actifs" value="38" change="3 absents auj." icon="👩‍🏫" color={C.info} bg="#CFFAFE" />
            <StatCard label="Bulletins générés" value="312" change="ce trimestre" icon="📄" color={C.primary} bg="#EDE9FE" />
          </div>
 
        </main>
      </div>
    </div>
  );
}
