
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
 
function StatCard({ label, value, change, icon, color, bg, sub }) {
  return (
    <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px",
      padding:"20px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div>
        <p style={{ fontSize:"11px", color:C.textSec, margin:"0 0 8px",
          textTransform:"uppercase", letterSpacing:"0.8px", fontWeight:"600" }}>{label}</p>
        <p style={{ fontSize:"22px", fontWeight:"700", color:C.textMain, margin:"0 0 4px" }}>{value}</p>
        {sub && <p style={{ fontSize:"11px", color:C.textSec, margin:"0 0 6px" }}>{sub}</p>}
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
    { label:"Récapitulatif mensuel", icon:"📅" },
  ]},
  { title:"PAIEMENTS", items:[
    { label:"Élèves ayant payé", icon:"✅" },
    { label:"Impayés", icon:"❌", badge:47 },
    { label:"Enregistrer paiement", icon:"💳" },
    { label:"Historique paiements", icon:"🕐" },
  ]},
  { title:"SCOLARITÉ", items:[
    { label:"Frais de scolarité", icon:"🎒" },
    { label:"Frais de transport", icon:"🚌" },
    { label:"Autres frais", icon:"📋" },
  ]},
  { title:"RAPPORTS", items:[
    { label:"Rapport financier", icon:"📊" },
    { label:"Export Excel", icon:"📤" },
    { label:"Reçus & Factures", icon:"🧾" },
  ]},
];
 
const PAYES = [
  { initials:"MB", name:"Mariama Bah", classe:"CM2-A", section:"Primaire FR", montant:"75 000", type:"Scolarité T2", date:"Auj. 09h12" },
  { initials:"OD", name:"Ousmane Diop", classe:"Class 3", section:"Primaire EN", montant:"18 000", type:"Cantine", date:"Auj. 10h05" },
  { initials:"IN", name:"Ibrahima Ndiaye", classe:"CP-A", section:"Primaire FR", montant:"50 000", type:"Inscription", date:"Hier 14h30" },
  { initials:"KD", name:"Kofi Diallo", classe:"Nursery", section:"Maternelle EN", montant:"75 000", type:"Scolarité T2", date:"Hier 11h00" },
];
 
const IMPAYES = [
  { initials:"AC", name:"Awa Cissé", classe:"CM2-B", retard:"30j", montant:"75 000", section:"Primaire FR", gravite:"danger" },
  { initials:"FS", name:"Fatou Sow", classe:"CM1-A", retard:"16j", montant:"75 000", section:"Primaire FR", gravite:"danger" },
  { initials:"KD2", name:"Khady Diallo", classe:"CP-B", retard:"16j", montant:"75 000", section:"Bilingue", gravite:"warning" },
  { initials:"CB", name:"Cheikh Ba", classe:"CE2-B", retard:"11j", montant:"95 000", section:"Primaire FR", gravite:"warning" },
  { initials:"PT", name:"Paul Tchoumi", classe:"Grande Section", retard:"8j", montant:"60 000", section:"Maternelle", gravite:"warning" },
];
 
const FRAIS_NIVEAUX = [
  { niveau:"Petite / Moy. / Grande Section", scolarite:"60 000", transport:"15 000", inscription:"10 000" },
  { niveau:"SIL / CP / CE1", scolarite:"75 000", transport:"18 000", inscription:"12 000" },
  { niveau:"CE2 / CM1 / CM2", scolarite:"85 000", transport:"18 000", inscription:"12 000" },
  { niveau:"Nursery / Class 1–3 (EN)", scolarite:"90 000", transport:"20 000", inscription:"15 000" },
  { niveau:"Class 4–6 (EN)", scolarite:"100 000", transport:"20 000", inscription:"15 000" },
  { niveau:"Niveaux Bilingues", scolarite:"95 000", transport:"18 000", inscription:"13 000" },
];
 
export default function ComptableDashboard() {
  const [activeNav, setActiveNav] = useState("Vue générale");
  const [activeTab, setActiveTab] = useState("payes");
 
  var totalEncaisse = 4875000;
  var totalAttendu = 6180000;
  var totalRestant = totalAttendu - totalEncaisse;
  var tauxRecouvrement = Math.round((totalEncaisse / totalAttendu) * 100);
 
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
          table { font-size: 11px !important; }
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
              <div style={{ color:"#A78BFA", fontSize:"11px" }}>Espace Comptable</div>
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
          <Avatar initials="YD" size={36} idx={3} />
          <div>
            <div style={{ color:"#fff", fontSize:"13px", fontWeight:"600" }}>M. Yves Diallo</div>
            <div style={{ color:"#7C3AED", fontSize:"11px" }}>Comptable</div>
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
            <input type="text" placeholder="Rechercher un élève, une facture..."
              style={{ padding:"9px 14px 9px 36px", borderRadius:"10px",
                border:"1px solid "+C.border, fontSize:"13px", outline:"none",
                width:"320px", background:C.pageBg, color:C.textMain }} />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
            <div style={{ position:"relative", cursor:"pointer" }}>
              <span style={{ fontSize:"20px" }}>🔔</span>
              <span style={{ position:"absolute", top:"-4px", right:"-4px", width:"16px", height:"16px",
                borderRadius:"50%", background:C.danger, color:"#fff", fontSize:"9px",
                display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold" }}>7</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:"13px", fontWeight:"600", color:C.textMain }}>M. Yves Diallo</div>
                <div style={{ fontSize:"11px", color:C.textSec }}>Comptable</div>
              </div>
              <Avatar initials="YD" size={36} idx={3} />
            </div>
          </div>
        </header>
 
        {/* Content */}
        <main style={{ flex:1, padding:"28px", overflowY:"auto" }}>
 
          <div style={{ marginBottom:"28px" }}>
            <h1 style={{ fontSize:"24px", fontWeight:"700", color:C.textMain, margin:"0 0 4px" }}>
              Bonjour, M. Diallo
            </h1>
            <p style={{ fontSize:"14px", color:C.textSec, margin:0 }}>
              Gestion financière de l'établissement · Mai 2026
            </p>
          </div>
 
          {/* Stats financières */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"24px" }}>
            <StatCard label="Total encaissé (mois)" value="4 875 000" sub="FCFA" change="+12.4% vs mois dernier" icon="💰" color={C.success} bg="#D1FAE5" />
            <StatCard label="Paiements reçus" value="84" change="+8 vs mois dernier" icon="✅" color={C.info} bg="#CFFAFE" />
            <StatCard label="Impayés actifs" value="47" change="-3 vs mois dernier" icon="❌" color={C.danger} bg="#FFE4E6" />
            <StatCard label="Somme restante" value="1 305 000" sub="FCFA à recouvrer" icon="⏳" color={C.warning} bg="#FEF3C7" />
          </div>
 
          {/* Barre de recouvrement */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px",
            padding:"20px 24px", marginBottom:"24px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
              <h3 style={{ fontSize:"15px", fontWeight:"700", margin:0, color:C.textMain }}>
                Taux de recouvrement global — Mai 2026
              </h3>
              <span style={{ fontSize:"20px", fontWeight:"700", color:tauxRecouvrement>=80?C.success:C.warning }}>
                {tauxRecouvrement}%
              </span>
            </div>
            <div style={{ height:"14px", borderRadius:"8px", background:C.border, overflow:"hidden", marginBottom:"10px" }}>
              <div style={{ width:tauxRecouvrement+"%", height:"100%", borderRadius:"8px",
                background:"linear-gradient(90deg,"+C.success+","+C.accent+")",
                transition:"width 0.8s ease" }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:"12px", color:C.success, fontWeight:"600" }}>
                ✅ Encaissé : 4 875 000 FCFA
              </span>
              <span style={{ fontSize:"12px", color:C.danger, fontWeight:"600" }}>
                ❌ Restant : 1 305 000 FCFA
              </span>
              <span style={{ fontSize:"12px", color:C.textSec }}>
                Total attendu : 6 180 000 FCFA
              </span>
            </div>
          </div>
 
          {/* Tabs : Payés / Impayés */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px",
            padding:"20px 24px", marginBottom:"24px" }}>
            <div style={{ display:"flex", gap:"8px", marginBottom:"20px" }}>
              {[
                { key:"payes", label:"✅ Élèves ayant payé", count:84 },
                { key:"impayes", label:"❌ Impayés", count:47 },
              ].map(function(tab) {
                var isActive = activeTab === tab.key;
                return (
                  <button key={tab.key} onClick={function(){setActiveTab(tab.key);}} style={{
                    padding:"9px 18px", borderRadius:"10px", border:"none", cursor:"pointer",
                    fontSize:"13px", fontWeight:"600",
                    background:isActive?(tab.key==="payes"?"#D1FAE5":"#FFE4E6"):"transparent",
                    color:isActive?(tab.key==="payes"?C.success:C.danger):C.textSec,
                    borderBottom:isActive?"2px solid "+(tab.key==="payes"?C.success:C.danger):"2px solid transparent"
                  }}>
                    {tab.label} ({tab.count})
                  </button>
                );
              })}
              <button style={{ marginLeft:"auto", fontSize:"12px", padding:"8px 16px",
                borderRadius:"8px", background:C.primary, color:"#fff",
                border:"none", cursor:"pointer", fontWeight:"600" }}>
                + Enregistrer un paiement
              </button>
            </div>
 
            {activeTab === "payes" ? (
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"12px" }}>
                <thead>
                  <tr>
                    {["Élève","Classe","Section","Type","Montant (FCFA)","Date"].map(function(h){
                      return <th key={h} style={{ textAlign:"left", color:C.textSec, fontWeight:"600",
                        padding:"8px 10px", borderBottom:"1px solid "+C.border,
                        fontSize:"11px", textTransform:"uppercase", letterSpacing:"0.8px" }}>{h}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {PAYES.map(function(p, i) {
                    var isLast = i === PAYES.length - 1;
                    return (
                      <tr key={i} style={{ background:i%2===0?"transparent":C.pageBg }}>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                            <Avatar initials={p.initials} size={30} idx={i} />
                            <span style={{ fontWeight:"600", color:C.textMain }}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border, color:C.textSec }}>{p.classe}</td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border, color:C.textSec }}>{p.section}</td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                          <Badge label={p.type} type="info" />
                        </td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border, fontWeight:"700", color:C.success }}>
                          {p.montant} FCFA
                        </td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border, color:C.textSec }}>{p.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"12px" }}>
                <thead>
                  <tr>
                    {["Élève","Classe","Section","Retard","Montant dû (FCFA)","Action"].map(function(h){
                      return <th key={h} style={{ textAlign:"left", color:C.textSec, fontWeight:"600",
                        padding:"8px 10px", borderBottom:"1px solid "+C.border,
                        fontSize:"11px", textTransform:"uppercase", letterSpacing:"0.8px" }}>{h}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {IMPAYES.map(function(imp, i) {
                    var isLast = i === IMPAYES.length - 1;
                    return (
                      <tr key={i} style={{ background:i%2===0?"transparent":"#FFF8F8" }}>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                            <Avatar initials={imp.initials} size={30} idx={i+3} />
                            <span style={{ fontWeight:"600", color:C.textMain }}>{imp.name}</span>
                          </div>
                        </td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border, color:C.textSec }}>{imp.classe}</td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border, color:C.textSec }}>{imp.section}</td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                          <Badge label={imp.retard+" retard"} type={imp.gravite} />
                        </td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border, fontWeight:"700", color:C.danger }}>
                          {imp.montant} FCFA
                        </td>
                        <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border }}>
                          <button style={{ fontSize:"11px", padding:"4px 10px", borderRadius:"6px",
                            background:C.primary, color:"#fff", border:"none", cursor:"pointer", fontWeight:"600" }}>
                            Relancer
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
 
          {/* Grille des frais par niveau */}
          <div style={{ background:C.card, border:"1px solid "+C.border, borderRadius:"14px", padding:"20px 24px" }}>
            <h3 style={{ fontSize:"15px", fontWeight:"700", margin:"0 0 16px", color:C.textMain }}>
              📋 Grille des frais scolaires par niveau (FCFA)
            </h3>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"12px" }}>
              <thead>
                <tr>
                  {["Niveau","Scolarité / Trimestre","Transport / Mois","Inscription"].map(function(h){
                    return <th key={h} style={{ textAlign:"left", color:C.textSec, fontWeight:"600",
                      padding:"8px 10px", borderBottom:"1px solid "+C.border,
                      fontSize:"11px", textTransform:"uppercase", letterSpacing:"0.8px" }}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {FRAIS_NIVEAUX.map(function(f, i) {
                  var isLast = i === FRAIS_NIVEAUX.length - 1;
                  return (
                    <tr key={i} style={{ background:i%2===0?"transparent":C.pageBg }}>
                      <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border,
                        fontWeight:"600", color:C.textMain }}>{f.niveau}</td>
                      <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border,
                        color:C.success, fontWeight:"700" }}>{f.scolarite} FCFA</td>
                      <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border,
                        color:C.info, fontWeight:"700" }}>{f.transport} FCFA</td>
                      <td style={{ padding:"11px 10px", borderBottom:isLast?"none":"1px solid "+C.border,
                        color:C.warning, fontWeight:"700" }}>{f.inscription} FCFA</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
 
        </main>
      </div>
    </div>
  );
}
