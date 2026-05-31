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
  { title:"TABLEAU DE BORD", items:[
    { label:"Vue générale", icon:"🏠" },
    { label:"Alertes disciplinaires", icon:"⚠️", badge:4 },
  ]},
  { title:"INSCRIPTIONS", items:[
    { label:"Inscrire un élève", icon:"➕" },
    { label:"Liste des élèves", icon:"🎒" },
    { label:"Transferts & Sorties", icon:"🔄" },
  ]},
  { title:"NOTES & BULLETINS", items:[
    { label:"Saisie des notes", icon:"✏️" },
    { label:"Bulletins", icon:"📄" },
    { label:"Relevés de notes", icon:"📋" },
  ]},
  { title:"TRANSPORT", items:[
    { label:"Gestion transport", icon:"🚌" },
    { label:"Affectation bus", icon:"📍" },
  ]},
  { title:"IMPRESSIONS", items:[
    { label:"Listes de classe", icon:"🖨️" },
    { label:"Fiches élèves", icon:"👤" },
    { label:"Export Excel", icon:"📊" },
  ]},
];
 
const ELEVES_RECENT = [
  { initials:"AN", name:"Awa Ndiaye", classe:"CE1-B", section:"Primaire FR", statut:"Inscrit", type:"success", transport:"Bus 2" },
  { initials:"KD", name:"Kofi Diallo", classe:"Class 3", section:"Primaire EN", statut:"Inscrit", type:"success", transport:"—" },
  { initials:"MB", name:"Marie Bah", classe:"Moyenne Section", section:"Maternelle", statut:"En attente", type:"warning", transport:"Bus 1" },
  { initials:"OD", name:"Omar Diop", classe:"CM1-A", section:"Primaire FR", statut:"Inscrit", type:"success", transport:"Bus 3" },
  { initials:"FT", name:"Fatou Touré", classe:"CP-B", section:"Bilingue", statut:"Incomplet", type:"danger", transport:"—" },
];
 
const ALERTES = [
  { initials:"ST", name:"Sarah Tchoumi", classe:"CM1-A", motif:"Bagarre en récré", date:"Auj. 10h15", gravite:"danger" },
  { initials:"PK", name:"Paul Kamga", classe:"CE2-B", motif:"Insolence envers prof", date:"Auj. 08h40", gravite:"warning" },
  { initials:"LN", name:"Lucas Ndzi", classe:"CM2-A", motif:"Absences répétées", date:"Hier", gravite:"warning" },
  { initials:"YS", name:"Yves Sow", classe:"Class 4", motif:"Vol de matériel", date:"Hier", gravite:"danger" },
];
 
const TRANSPORT_LINES = [
  { bus:"Bus 1", chauffeur:"M. Oumar", eleves:24, route:"Quartier Nord → École", statut:"En route" },
  { bus:"Bus 2", chauffeur:"M. Thierno", eleves:18, route:"Quartier Est → École", statut:"Arrivé" },
  { bus:"Bus 3", chauffeur:"Mme Awa", eleves:21, route:"Quartier Sud → École", statut:"Arrivé" },
];
 
const IMPRESSIONS = [
  { label:"Liste de classe CM1-A", icon:"📋" },
  { label:"Bulletin T2 CE1-B", icon:"📄" },
  { label:"Fiche élève — Awa Ndiaye", icon:"👤" },
  { label:"Export Excel — Tous élèves", icon:"📊" },
  { label:"Liste transport Bus 2", icon:"🚌" },
  { label:"Convocation disciplinaire", icon:"⚠️" },
];
 
export default function SecretaireDashboard() {
  const [activeNav, setActiveNav] = useState("Vue générale");
  const [searchVal, setSearchVal] = useState("");
 
  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Segoe UI', sans-serif", background:C.pageBg }}>
      <style>{`
        @media (max-width: 1024px) {
          aside { width: 200px; } header { padding: 0 16px; }
          main { padding: 16px; }
          [style*="gridTemplateColumns: repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
          [style*="gridTemplateColumns: 1fr 380px"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          aside { position: fixed; left: -240px; top: 0; z-index: 999; width: 240px; height: 100vh; }
          header { padding: 0 12px; height: 56px; }
          main { padding: 12px; }
          [style*="gridTemplateColumns: repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
          [style*="gridTemplateColumns: 1fr 380px"] { grid-template-columns: 1fr !important; }
          [style*="padding: 20px 24px"] { padding: 16px !important; }
          h1 { font-size: 20px !important; }
          h3 { font-size: 14px !important; }
          table { font-size: 12px !important; }
        }
        @media (max-width: 480px) {
          aside { display: none; }
          header { flex-direction: column; height: auto; gap: 8px; padding: 8px 12px !important; }
          main { padding: 8px; }
          [style*="gridTemplateColumns: repeat(4,1fr)"] { grid-template-columns: 1fr !important; }
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
              <div style={{ color:"#A78BFA", fontSize:"11px" }}>Espace Secrétaire</div>
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
          <Avatar initials="AB" size={36} idx={2} />
          <div>
            <div style={{ color:"#fff", fontSize:"13px", fontWeight:"600" }}>Mme Aïcha Bah</div>
            <div style={{ color:"#7C3AED", fontSize:"11px" }}>Secrétaire</div>
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
            <input type="text" placeholder="Rechercher un élève, une classe..."
              value={searchVal} onChange={function(e){setSearchVal(e.target.value);}}
              style={{ padding:"9px 14px 9px 36px", borderRadius:"10px",
                border:"1px solid "+C.border, fontSize:"13px", outline:"none",
                width:"320px", background:C.pageBg, color:C.textMain }} />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
            <div style={{ position:"relative", cursor:"pointer" }}>
              <span style={{ fontSize:"20px" }}>🔔</span>
              <span style={{ position:"absolute", top:"-4px", right:"-4px", width:"16px", height:"16px",
                borderRadius:"50%", background:C.danger, color:"#fff", fontSize:"9px",
                display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold" }}>4</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:"13px", fontWeight:"600", color:C.textMain }}>Mme Aïcha Bah</div>
                <div style={{ fontSize:"11px", color:C.textSec }}>Secrétaire</div>
              </div>
              <Avatar initials="AB" size={36} idx={2} />
            </div>
          </div>
        </header>
 
        {/* Content */}
        <main style={{ flex:1, padding:"28px", overflowY:"auto" }}>
 
          {/* Welcome */}
          <div style={{ marginBottom:"28px" }}>
            <h1 style={{ fontSize:"24px", fontWeight:"700", color:C.textMain, margin:"0 0 4px" }}>
              Bonjour, Mme Aïcha 👋
            </h1>
            <p style={{ fontSize:"14px", color:C.textSec, margin:0 }}>
              Voici un aperçu de l'activité du secrétariat aujourd'hui.
            </p>
          </div>
 
          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"24px" }}>
            <StatCard label="Total élèves inscrits" value="740" change="+3 cette semaine" icon="🎒" color={C.primary} bg="#EDE9FE" />
            <StatCard label="Inscriptions en attente" value="8" change="à traiter" icon="⏳" color={C.warning} bg="#FEF3C7" />
            <StatCard label="Alertes disciplinaires" value="4" change="aujourd'hui" icon="⚠️" color={C.danger} bg="#FFE4E6" />
            <StatCard label="Élèves en transport" value="63" change="3 bus actifs" icon="🚌" color={C.info} bg="#CFFAFE" />
          </div>
 
          {/* Inscriptions + Alertes */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:"20px", marginBottom:"24px" }}>
 
            {/* Tableau élèves */}
            <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px", padding:"20px 24px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
                <h3 style={{ fontSize:"15px", fontWeight:"700", margin:0, color:C.textMain }}>
                  Élèves — Inscriptions récentes
                </h3>
                <button style={{ fontSize:"12px", padding:"8px 16px", borderRadius:"8px",
                  background:C.primary, color:"#fff", border:"none", cursor:"pointer", fontWeight:"600" }}>
                  + Inscrire un élève
                </button>
              </div>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"12px" }}>
                <thead>
                  <tr>
                    {["Élève","Classe","Section","Transport","Statut"].map(function(h){
                      return <th key={h} style={{ textAlign:"left", color:C.textSec, fontWeight:"600",
                        padding:"8px 10px", borderBottom:"1px solid "+C.border,
                        fontSize:"11px", textTransform:"uppercase", letterSpacing:"0.8px" }}>{h}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {ELEVES_RECENT.map(function(e, i) {
                    var isLast = i === ELEVES_RECENT.length - 1;
                    return (
                      <tr key={i} style={{ background:i%2===0?"transparent":C.pageBg }}>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                            <Avatar initials={e.initials} size={30} idx={i} />
                            <span style={{ fontWeight:"600", color:C.textMain }}>{e.name}</span>
                          </div>
                        </td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border, color:C.textSec }}>{e.classe}</td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border, color:C.textSec }}>{e.section}</td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border, color:C.textSec }}>{e.transport}</td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                          <Badge label={e.statut} type={e.type} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
 
            {/* Alertes disciplinaires */}
            <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px", padding:"20px 24px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                <h3 style={{ fontSize:"15px", fontWeight:"700", margin:0, color:C.textMain }}>
                  ⚠️ Alertes disciplinaires
                </h3>
                <Badge label={ALERTES.length+" actives"} type="danger" />
              </div>
              {ALERTES.map(function(a, i) {
                return (
                  <div key={i} style={{ padding:"12px", borderRadius:"10px",
                    background:a.gravite==="danger"?"#FFF1F2":"#FFFBEB",
                    marginBottom:i<ALERTES.length-1?"10px":"0",
                    border:"1px solid "+(a.gravite==="danger"?"#FFE4E6":"#FEF3C7") }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"6px" }}>
                      <Avatar initials={a.initials} size={30} idx={i+2} />
                      <div>
                        <p style={{ fontSize:"13px", fontWeight:"600", color:C.textMain, margin:"0 0 1px" }}>{a.name}</p>
                        <p style={{ fontSize:"11px", color:C.textSec, margin:0 }}>{a.classe} · {a.date}</p>
                      </div>
                    </div>
                    <p style={{ fontSize:"12px", color:a.gravite==="danger"?C.danger:C.warning,
                      margin:0, fontWeight:"500" }}>{a.motif}</p>
                  </div>
                );
              })}
            </div>
          </div>
 
          {/* Transport + Impressions */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
 
            {/* Transport */}
            <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px", padding:"20px 24px" }}>
              <h3 style={{ fontSize:"15px", fontWeight:"700", margin:"0 0 16px", color:C.textMain }}>
                🚌 Gestion du transport scolaire
              </h3>
              {TRANSPORT_LINES.map(function(bus, i) {
                var online = bus.statut === "En route";
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"14px",
                    padding:"12px", borderRadius:"10px", background:C.pageBg,
                    marginBottom:i<TRANSPORT_LINES.length-1?"10px":"0",
                    border:"1px solid "+C.border }}>
                    <div style={{ width:"40px", height:"40px", borderRadius:"10px",
                      background:online?"#D1FAE5":"#CFFAFE",
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px" }}>🚌</div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:"13px", fontWeight:"600", color:C.textMain, margin:"0 0 2px" }}>
                        {bus.bus} · {bus.chauffeur}
                      </p>
                      <p style={{ fontSize:"11px", color:C.textSec, margin:0 }}>{bus.route}</p>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <Badge label={bus.statut} type={online?"warning":"success"} />
                      <p style={{ fontSize:"11px", color:C.textSec, margin:"4px 0 0" }}>{bus.eleves} élèves</p>
                    </div>
                  </div>
                );
              })}
            </div>
 
            {/* Impressions rapides */}
            <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px", padding:"20px 24px" }}>
              <h3 style={{ fontSize:"15px", fontWeight:"700", margin:"0 0 16px", color:C.textMain }}>
                🖨️ Impressions & Exports rapides
              </h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                {IMPRESSIONS.map(function(imp, i) {
                  return (
                    <button key={i} style={{ display:"flex", alignItems:"center", gap:"8px",
                      padding:"11px 12px", borderRadius:"10px",
                      border:"1px solid "+C.border, cursor:"pointer",
                      background:C.pageBg, fontSize:"12px", color:C.textMain, fontWeight:"500",
                      textAlign:"left" }}>
                      <span style={{ fontSize:"16px" }}>{imp.icon}</span>
                      <span>{imp.label}</span>
                    </button>
                  );
                })}
              </div>
              <button style={{ width:"100%", marginTop:"14px", padding:"11px",
                borderRadius:"10px", border:"none", background:C.primary,
                color:"#fff", fontSize:"13px", fontWeight:"600", cursor:"pointer" }}>
                📊 Exporter tous les élèves (Excel)
              </button>
            </div>
          </div>
 
        </main>
      </div>
    </div>
  );
}
