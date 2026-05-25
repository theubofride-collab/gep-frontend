import { useState } from "react";

const COLORS = {
  violetProfond: "#4C1D95",
  violetHover: "#6D28D9",
  violetNuit: "#1E0B3B",
  cyanElectrique: "#06B6D4",
  cyanHover: "#22D3EE",
  fondPage: "#F8FAFF",
  fondCarte: "#FFFFFF",
  bordure: "#EDE9FE",
  textePrincipal: "#1E1B4B",
  texteSecondaire: "#6B7280",
  succes: "#059669",
  danger: "#E11D48",
  avertissement: "#D97706",
};

const navItems = [
  { id: "dashboard", icon: "⊞", label: "Dashboard" },
  { id: "students", icon: "👤", label: "Students" },
  { id: "teachers", icon: "🎓", label: "Teachers" },
  { id: "parents", icon: "👨‍👩‍👧", label: "Parents" },
  { id: "account", icon: "💳", label: "Account" },
  { id: "class", icon: "📚", label: "Class" },
  { id: "exam", icon: "📝", label: "Exam" },
  { id: "transport", icon: "🚌", label: "Transport" },
  { id: "notice", icon: "📢", label: "Notice" },
];

const Avatar = ({ name, size = 40, bg = COLORS.cyanElectrique, color = "#fff" }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", background: bg,
    display: "flex", alignItems: "center", justifyContent: "center",
    color, fontWeight: 700, fontSize: size * 0.32, flexShrink: 0,
    fontFamily: "'DM Sans', sans-serif",
  }}>
    {name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
  </div>
);

const Badge = ({ children, color = COLORS.succes }) => (
  <span style={{
    background: color + "20", color, borderRadius: 20, padding: "2px 10px",
    fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
  }}>{children}</span>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: COLORS.fondCarte, borderRadius: 16, border: `1px solid ${COLORS.bordure}`,
    padding: "20px 22px", ...style,
  }}>
    {children}
  </div>
);

const StatCard = ({ label, value, delta, color = COLORS.violetProfond }) => (
  <div style={{
    background: COLORS.fondCarte, borderRadius: 14, border: `1px solid ${COLORS.bordure}`,
    padding: "16px 20px", flex: 1, minWidth: 130,
  }}>
    <p style={{ margin: "0 0 6px", fontSize: 12, color: COLORS.texteSecondaire, fontWeight: 500 }}>{label}</p>
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
      <span style={{ fontSize: 26, fontWeight: 700, color: COLORS.textePrincipal }}>{value}</span>
      {delta && <span style={{ fontSize: 12, color: COLORS.succes, fontWeight: 500 }}>▲ {delta}</span>}
    </div>
  </div>
);

const MiniCalendar = () => {
  const days = ["MO","TU","WE","TH","FR","SA","SU"];
  const dates = [
    [null,null,1,2,3,4,5],
    [6,7,8,9,10,11,12],
    [13,14,15,16,17,18,19],
    [20,21,22,23,24,25,26],
    [27,28,null,null,null,null,null],
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 0 }}>
        {days.map(d => (
          <div key={d} style={{ flex:1, textAlign:"center", fontSize:10, color:COLORS.texteSecondaire, fontWeight:600, padding:"4px 0" }}>{d}</div>
        ))}
      </div>
      {dates.map((week, wi) => (
        <div key={wi} style={{ display:"flex" }}>
          {week.map((d, di) => (
            <div key={di} style={{
              flex:1, textAlign:"center", fontSize:12, padding:"5px 0",
              borderRadius: d===16 ? "50%" : 0,
              background: d===16 ? COLORS.cyanElectrique : "transparent",
              color: d===16 ? "#fff" : d ? COLORS.texteSecondaire : "transparent",
              fontWeight: d===16 ? 700 : 400, cursor: d ? "pointer" : "default",
            }}>{d || ""}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

const CalendarCard = ({ activeTab }) => {
  const [tab, setTab] = useState("day");
  return (
    <Card style={{ gridRow: "span 2" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <span style={{ fontWeight:700, fontSize:15, color:COLORS.texteSecondaire }}>Event Calendar</span>
        <span style={{ color:COLORS.texteSecondaire, cursor:"pointer" }}>···</span>
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:16 }}>
        {["Day to day", activeTab || "Events"].map((t,i) => (
          <button key={i} onClick={() => {}} style={{
            flex:1, padding:"7px 0", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontWeight:600,
            background: i===0 ? COLORS.cyanElectrique : COLORS.fondPage,
            color: i===0 ? "#fff" : COLORS.texteSecondaire,
          }}>{t}</button>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <span style={{ fontSize:13, fontWeight:600, color:COLORS.texteSecondaire }}>Feb 2023</span>
        <div style={{ display:"flex", gap:6 }}>
          <span style={{ cursor:"pointer", color:COLORS.texteSecondaire }}>‹</span>
          <span style={{ cursor:"pointer", color:COLORS.texteSecondaire }}>›</span>
        </div>
      </div>
      <MiniCalendar />
    </Card>
  );
};

const Sidebar = ({ active, setActive }) => (
  <div style={{
    width: 200, minHeight: "100vh", background: COLORS.violetNuit,
    display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0,
    fontFamily: "'DM Sans', sans-serif",
  }}>
    <div style={{ padding: "0 22px 32px", display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ width:32, height:32, borderRadius:8, background:COLORS.cyanElectrique, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ color:"#fff", fontWeight:900, fontSize:14 }}>A</span>
      </div>
      <span style={{ color:"#fff", fontWeight:800, fontSize:18, letterSpacing:1 }}>ACERO</span>
    </div>
    <div style={{ flex:1 }}>
      {navItems.map(item => (
        <div key={item.id} onClick={() => setActive(item.id)} style={{
          display:"flex", alignItems:"center", gap:12, padding:"11px 22px",
          cursor:"pointer", borderLeft: active===item.id ? `3px solid ${COLORS.cyanElectrique}` : "3px solid transparent",
          background: active===item.id ? "rgba(6,182,212,0.1)" : "transparent",
          color: active===item.id ? COLORS.cyanElectrique : "rgba(255,255,255,0.55)",
          fontSize:13, fontWeight: active===item.id ? 600 : 400,
          transition:"all 0.15s",
        }}>
          <span style={{ fontSize:15 }}>{item.icon}</span>
          {item.label}
        </div>
      ))}
    </div>
    <div style={{ padding:"0 22px" }}>
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:16 }}>
        {["⚙ Settings","⬆ Log out"].map((item,i) => (
          <div key={i} style={{ color:"rgba(255,255,255,0.45)", fontSize:13, padding:"9px 0", cursor:"pointer" }}>{item}</div>
        ))}
      </div>
    </div>
  </div>
);

const TopBar = ({ title }) => (
  <div style={{
    display:"flex", alignItems:"center", justifyContent:"space-between",
    padding:"18px 28px", background:COLORS.fondCarte,
    borderBottom:`1px solid ${COLORS.bordure}`, fontFamily:"'DM Sans', sans-serif",
  }}>
    <h1 style={{ margin:0, fontSize:20, fontWeight:700, color:COLORS.texteSecondaire }}>{title}</h1>
    <div style={{ display:"flex", alignItems:"center", gap:16 }}>
      <div style={{
        display:"flex", alignItems:"center", gap:8, background:COLORS.fondPage,
        border:`1px solid ${COLORS.bordure}`, borderRadius:20, padding:"7px 14px",
      }}>
        <span style={{ color:COLORS.texteSecondaire, fontSize:13 }}>🔍</span>
        <input placeholder="Search" style={{ border:"none", background:"transparent", outline:"none", fontSize:13, color:COLORS.texteSecondaire, width:140 }} />
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", border:`1px solid ${COLORS.bordure}`, borderRadius:20, cursor:"pointer" }}>
        <span style={{ fontSize:13 }}>🌐</span>
        <span style={{ fontSize:12, color:COLORS.texteSecondaire }}>EN</span>
      </div>
      <div style={{ position:"relative" }}>
        <span style={{ fontSize:20 }}>✉️</span>
        <span style={{ position:"absolute", top:-4, right:-4, background:COLORS.danger, color:"#fff", borderRadius:"50%", width:14, height:14, fontSize:8, display:"flex", alignItems:"center", justifyContent:"center" }}>2</span>
      </div>
      <div style={{ position:"relative" }}>
        <span style={{ fontSize:20 }}>🔔</span>
        <span style={{ position:"absolute", top:-4, right:-4, background:COLORS.avertissement, color:"#fff", borderRadius:"50%", width:14, height:14, fontSize:8, display:"flex", alignItems:"center", justifyContent:"center" }}>3</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
        <Avatar name="Steven Jhon" size={34} bg={COLORS.violetProfond} />
        <div>
          <p style={{ margin:0, fontSize:13, fontWeight:600, color:COLORS.texteSecondaire }}>Steven Jhon</p>
          <p style={{ margin:0, fontSize:11, color:COLORS.texteSecondaire }}>Admin</p>
        </div>
      </div>
    </div>
  </div>
);

const ExamTable = ({ rows }) => (
  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, fontFamily:"'DM Sans', sans-serif" }}>
    <thead>
      <tr style={{ borderBottom:`1px solid ${COLORS.bordure}` }}>
        {["Exam Id","Student Name","Subject","Class","Status","Sub. Date"].map(h => (
          <th key={h} style={{ padding:"8px 10px", textAlign:"left", color:COLORS.texteSecondaire, fontWeight:600, fontSize:12 }}>{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((r, i) => (
        <tr key={i} style={{ borderBottom:`1px solid ${COLORS.fondPage}` }}>
          <td style={{ padding:"10px", color:COLORS.violetProfond, fontWeight:500 }}>{r.id}</td>
          <td style={{ padding:"10px", color:COLORS.texteSecondaire, display:"flex", alignItems:"center", gap:8 }}>
            <Avatar name={r.student} size={26} bg={COLORS.violetProfond} />{r.student}
          </td>
          <td style={{ padding:"10px", color:COLORS.texteSecondaire }}>{r.subject}</td>
          <td style={{ padding:"10px", color:COLORS.texteSecondaire }}>{r.class}</td>
          <td style={{ padding:"10px" }}>
            <Badge color={r.status==="Active"?COLORS.succes:r.status==="Opened"?COLORS.cyanElectrique:COLORS.texteSecondaire}>{r.status}</Badge>
          </td>
          <td style={{ padding:"10px", color:COLORS.texteSecondaire }}>{r.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const examRows = [
  { id:"#mat21", student:"Jason Black", subject:"Maths", class:"5th", status:"Active", date:"21 Jul 2022" },
  { id:"#mat21", student:"Gerald Ferrell", subject:"English", class:"7th", status:"Opened", date:"14 Jun 2022" },
  { id:"#mat21", student:"Delbert Barna", subject:"Physics", class:"6th", status:"Completed", date:"10 Mar 2022" },
  { id:"#mat21", student:"Mary Byrd", subject:"Chemistry", class:"4th", status:"Active", date:"06 Jan 2022" },
];

// ===== PAGE 1: DASHBOARD =====
const DashboardPage = () => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const earnings = [35,48,30,55,42,60,38,52,45,65,50,70];
  const expenses = [20,30,22,38,28,45,25,35,30,48,36,52];
  const max = 80;
  return (
    <div style={{ flex:1, background:COLORS.fondPage, overflowY:"auto", fontFamily:"'DM Sans', sans-serif" }}>
      <TopBar title="Dashboard" />
      <div style={{ padding:"24px 28px", display:"grid", gap:20 }}>
        <div style={{ display:"flex", gap:14 }}>
          <StatCard label="Students" value="1260" delta="2.5%" />
          <StatCard label="Teachers" value="224" />
          <StatCard label="Parents" value="840" />
          <StatCard label="Earnings" value="$54000" delta="8.1%" />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }}>
          <div style={{ display:"grid", gap:20 }}>
            <Card>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <span style={{ fontWeight:700, fontSize:15, color:COLORS.texteSecondaire }}>Earnings</span>
                <div style={{ display:"flex", gap:16, fontSize:12, color:COLORS.texteSecondaire }}>
                  <span>● Earnings</span><span style={{ color:COLORS.cyanElectrique }}>● Expense</span>
                  <select style={{ border:`1px solid ${COLORS.bordure}`, borderRadius:6, padding:"2px 6px", fontSize:11, color:COLORS.texteSecondaire }}>
                    <option>2023 ▾</option>
                  </select>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:120 }}>
                {months.map((m,i) => (
                  <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                    <div style={{ width:"100%", display:"flex", gap:2, alignItems:"flex-end", height:100 }}>
                      <div style={{ flex:1, background:COLORS.violetProfond, borderRadius:"3px 3px 0 0", height:`${(earnings[i]/max)*100}%`, opacity:0.85 }} />
                      <div style={{ flex:1, background:COLORS.cyanElectrique, borderRadius:"3px 3px 0 0", height:`${(expenses[i]/max)*100}%`, opacity:0.7 }} />
                    </div>
                    <span style={{ fontSize:9, color:COLORS.texteSecondaire }}>{m}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <span style={{ fontWeight:700, fontSize:15, color:COLORS.texteSecondaire }}>Notice Board</span>
                <span style={{ color:COLORS.texteSecondaire, cursor:"pointer" }}>···</span>
              </div>
              {[
                { title:"Inter-school competition (sports/singing/drawing/drama)", date:"10 Feb, 2023", views:"7k" },
                { title:"Disciplinary action if school discipline is not followed", date:"6 Feb, 2023", views:"7k" },
                { title:"School Annual function celebration 2023-24", date:"2 Feb, 2023", views:"7k" },
                { title:"Returning library books timely (Usually pinned on notice...)", date:"31 Jan, 2023", views:"7k" },
              ].map((n,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom: i<3?`1px solid ${COLORS.fondPage}`:"none" }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:COLORS.fondPage, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>📌</div>
                  <div style={{ flex:1 }}>
                    <p style={{ margin:0, fontSize:12, color:COLORS.texteSecondaire, fontWeight:500 }}>{n.title}</p>
                    <p style={{ margin:0, fontSize:11, color:COLORS.texteSecondaire }}>{n.date}</p>
                  </div>
                  <div style={{ display:"flex", gap:8, color:COLORS.texteSecondaire, fontSize:11 }}>
                    <span>👥 {n.views}</span>
                  </div>
                </div>
              ))}
            </Card>
          </div>
          <div style={{ display:"grid", gap:20, gridTemplateRows:"auto auto" }}>
            <CalendarCard activeTab="Social Media" />
            <Card>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <span style={{ fontWeight:700, fontSize:15, color:COLORS.texteSecondaire }}>Students</span>
                <span style={{ color:COLORS.texteSecondaire, cursor:"pointer" }}>···</span>
              </div>
              <div style={{ position:"relative", width:120, height:120, margin:"0 auto 12px" }}>
                <svg viewBox="0 0 120 120" style={{ transform:"rotate(-90deg)" }}>
                  <circle cx="60" cy="60" r="48" fill="none" stroke={COLORS.fondPage} strokeWidth="16"/>
                  <circle cx="60" cy="60" r="48" fill="none" stroke={COLORS.violetProfond} strokeWidth="16" strokeDasharray="301.6" strokeDashoffset="135.7" strokeLinecap="round"/>
                  <circle cx="60" cy="60" r="48" fill="none" stroke={COLORS.cyanElectrique} strokeWidth="16" strokeDasharray="301.6" strokeDashoffset="165.9" strokeLinecap="round" opacity="0.6"/>
                </svg>
                <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:20, fontWeight:700, color:COLORS.texteSecondaire }}>1260</span>
                  <span style={{ fontSize:10, color:COLORS.texteSecondaire }}>Total</span>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"center", gap:16, fontSize:12 }}>
                <span style={{ color:COLORS.violetProfond }}>● Male 55%</span>
                <span style={{ color:COLORS.cyanElectrique }}>● Female 45%</span>
              </div>
            </Card>
            <Card style={{ background: "linear-gradient(135deg, #4C1D95, #06B6D4)", border:"none" }}>
              <p style={{ margin:"0 0 8px", fontWeight:700, fontSize:14, color:"#fff" }}>Join the community and find out more</p>
              <p style={{ margin:"0 0 14px", fontSize:12, color:"rgba(255,255,255,0.7)" }}>Join different community and keep updated with the latest messages.</p>
              <button style={{ background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.4)", color:"#fff", borderRadius:20, padding:"6px 16px", fontSize:12, cursor:"pointer", fontWeight:600 }}>Explore now</button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== PAGE 2: STUDENTS =====
const StudentsPage = () => (
  <div style={{ flex:1, background:COLORS.fondPage, overflowY:"auto", fontFamily:"'DM Sans', sans-serif" }}>
    <TopBar title="Dashboard" />
    <div style={{ padding:"24px 28px", display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }}>
      <div style={{ display:"grid", gap:20 }}>
        <Card>
          <div style={{ display:"flex", gap:20, alignItems:"flex-start" }}>
            <div style={{ position:"relative" }}>
              <Avatar name="Jason Black" size={80} bg={COLORS.violetProfond} />
              <div style={{ position:"absolute", bottom:0, right:0, width:20, height:20, borderRadius:"50%", background:COLORS.cyanElectrique, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"#fff", fontSize:10 }}>+</span>
              </div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div>
                  <h2 style={{ margin:"0 0 2px", fontSize:17, fontWeight:700, color:COLORS.texteSecondaire }}>Jason Black <span style={{ color:COLORS.texteSecondaire, fontSize:13, fontWeight:400 }}>(1406)</span></h2>
                  <p style={{ margin:"0 0 2px", fontSize:12, color:COLORS.texteSecondaire }}>jasonblack@gmail.com</p>
                  <p style={{ margin:"0 0 12px", fontSize:12, color:COLORS.texteSecondaire }}>+ 88 9856418</p>
                </div>
                <span style={{ color:COLORS.texteSecondaire, cursor:"pointer" }}>···</span>
              </div>
              <div style={{ background:COLORS.fondPage, borderRadius:10, padding:"14px 16px", border:`1px solid ${COLORS.bordure}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:13, fontWeight:600, color:COLORS.texteSecondaire }}>Personal Details</span>
                  <span style={{ color:COLORS.texteSecondaire }}>∧</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 24px", fontSize:12 }}>
                  {[
                    ["Gender","Male"],["Father's Name","Alex Black"],["Mother's Name","Jessica Black"],
                    ["Date Of Birth","14, June 2006"],["Religion","Christian"],["Father Occupation","Banker"],
                    ["Admission Date","05, June 2012"],["Address","House 10, Road 6, Australia."],
                    ["Class","11th."],["Section","Pink"],
                  ].map(([k,v],i) => (
                    <div key={i} style={{ display:"flex", gap:6 }}>
                      <span style={{ color:COLORS.texteSecondaire, flexShrink:0 }}>{k}:</span>
                      <span style={{ color:COLORS.texteSecondaire, fontWeight:500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex", gap:12, marginTop:12 }}>
                {["🖨","📍","👥","🐦","📷"].map((ic,i) => (
                  <div key={i} style={{ width:28, height:28, borderRadius:6, border:`1px solid ${COLORS.bordure}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:14 }}>{ic}</div>
                ))}
              </div>
              <div style={{ marginTop:14, padding:12, border:`1px solid ${COLORS.bordure}`, borderRadius:8 }}>
                <p style={{ margin:"0 0 6px", fontSize:12, fontWeight:600, color:COLORS.texteSecondaire }}>About Student</p>
                <p style={{ margin:0, fontSize:11, color:COLORS.texteSecondaire }}>Hi there! My name is Jason, and I am a 11th standard student. I love going to school and learning new things every day. My favourite subject is maths, and I enjoy playing with my friends.</p>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontWeight:700, fontSize:15, color:COLORS.texteSecondaire }}>All Exam Results</span>
          </div>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ borderBottom:`1px solid ${COLORS.bordure}` }}>
                {["Exam Id","Type","Subject","Grade","%","Date"].map(h => (
                  <th key={h} style={{ padding:"8px 10px", textAlign:"left", color:COLORS.texteSecondaire, fontWeight:600, fontSize:12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { id:"#mat21", type:"Class Test", subject:"Maths", grade:"A", pct:89, date:"21 Jul 2022" },
                { id:"#mat21", type:"Quarterly Test", subject:"English", grade:"A+", pct:93, date:"14 Jun 2022" },
                { id:"#mat21", type:"Oral Test", subject:"Physics", grade:"B", pct:78, date:"10 Mar 2022" },
                { id:"#mat21", type:"Class Test", subject:"Chemistry", grade:"A", pct:88, date:"06 Jan 2022" },
              ].map((r,i) => (
                <tr key={i} style={{ borderBottom:`1px solid ${COLORS.fondPage}` }}>
                  <td style={{ padding:"10px", color:COLORS.violetProfond, fontWeight:500 }}>{r.id}</td>
                  <td style={{ padding:"10px", color:COLORS.texteSecondaire }}>{r.type}</td>
                  <td style={{ padding:"10px", color:COLORS.texteSecondaire }}>{r.subject}</td>
                  <td style={{ padding:"10px" }}><Badge color={COLORS.succes}>{r.grade}</Badge></td>
                  <td style={{ padding:"10px", color:COLORS.texteSecondaire, fontWeight:600 }}>{r.pct}</td>
                  <td style={{ padding:"10px", color:COLORS.texteSecondaire }}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:14 }}>
            {[1,2,"…",10].map((p,i) => (
              <button key={i} style={{ width:28, height:28, borderRadius:6, border:`1px solid ${COLORS.bordure}`, background:i===0?COLORS.violetProfond:"transparent", color:i===0?"#fff":COLORS.texteSecondaire, cursor:"pointer", fontSize:12 }}>{p}</button>
            ))}
          </div>
        </Card>
      </div>
      <div style={{ display:"grid", gap:20, gridTemplateRows:"auto auto" }}>
        <div style={{ display:"flex", gap:12 }}>
          <Card style={{ flex:1 }}>
            <p style={{ margin:"0 0 4px", fontSize:11, color:COLORS.texteSecondaire }}>Events</p>
            <p style={{ margin:0, fontSize:24, fontWeight:700, color:COLORS.texteSecondaire }}>6</p>
          </Card>
          <Card style={{ flex:1 }}>
            <p style={{ margin:"0 0 4px", fontSize:11, color:COLORS.texteSecondaire }}>Growth</p>
            <p style={{ margin:0, fontSize:24, fontWeight:700, color:COLORS.succes }}>72%</p>
          </Card>
        </div>
        <Card>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontWeight:700, fontSize:14, color:COLORS.texteSecondaire }}>Attendance</span>
            <span style={{ fontSize:12, color:COLORS.texteSecondaire }}>Feb 2023 ▾</span>
          </div>
          <div style={{ position:"relative", width:110, height:110, margin:"0 auto 14px" }}>
            <svg viewBox="0 0 110 110" style={{ transform:"rotate(-90deg)" }}>
              <circle cx="55" cy="55" r="44" fill="none" stroke={COLORS.fondPage} strokeWidth="14"/>
              <circle cx="55" cy="55" r="44" fill="none" stroke={COLORS.violetProfond} strokeWidth="14" strokeDasharray="276.5" strokeDashoffset="55.3" strokeLinecap="round"/>
              <circle cx="55" cy="55" r="44" fill="none" stroke={COLORS.cyanElectrique} strokeWidth="14" strokeDasharray="276.5" strokeDashoffset="221.2" strokeLinecap="round" opacity="0.6"/>
              <circle cx="55" cy="55" r="44" fill="none" stroke={COLORS.avertissement} strokeWidth="14" strokeDasharray="276.5" strokeDashoffset="262.7" strokeLinecap="round" opacity="0.7"/>
            </svg>
          </div>
          {[
            { label:"Present", color:COLORS.violetProfond },
            { label:"Half Day Present", color:COLORS.cyanElectrique },
            { label:"Late Coming", color:COLORS.avertissement },
            { label:"Absent", color:COLORS.danger },
          ].map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:COLORS.texteSecondaire, marginBottom:4 }}>
              <span style={{ width:10, height:10, borderRadius:"50%", background:s.color, display:"inline-block" }} />
              {s.label}
            </div>
          ))}
        </Card>
        <CalendarCard />
      </div>
    </div>
  </div>
);

// ===== PAGE 3: TEACHERS =====
const TeachersPage = () => (
  <div style={{ flex:1, background:COLORS.fondPage, overflowY:"auto", fontFamily:"'DM Sans', sans-serif" }}>
    <TopBar title="Dashboard" />
    <div style={{ padding:"24px 28px", display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }}>
      <div style={{ display:"grid", gap:20 }}>
        <Card>
          <div style={{ display:"flex", gap:20, alignItems:"flex-start" }}>
            <div style={{ position:"relative" }}>
              <Avatar name="Carla Peter" size={80} bg={COLORS.cyanElectrique} />
              <div style={{ position:"absolute", bottom:0, right:0, width:20, height:20, borderRadius:"50%", background:COLORS.violetProfond, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"#fff", fontSize:10 }}>+</span>
              </div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div>
                  <h2 style={{ margin:"0 0 2px", fontSize:17, fontWeight:700, color:COLORS.texteSecondaire }}>Carla Peter <span style={{ color:COLORS.texteSecondaire, fontSize:13, fontWeight:400 }}>(14)</span></h2>
                  <p style={{ margin:"0 0 2px", fontSize:12, color:COLORS.texteSecondaire }}>carlapeter@gmail.com</p>
                  <p style={{ margin:0, fontSize:12, color:COLORS.texteSecondaire }}>+89 88 9856418</p>
                </div>
                <span style={{ color:COLORS.texteSecondaire, cursor:"pointer" }}>···</span>
              </div>
              <div style={{ display:"flex", gap:12, marginTop:10 }}>
                {["🖨","📍","👥","🐦","📷"].map((ic,i) => (
                  <div key={i} style={{ width:28, height:28, borderRadius:6, border:`1px solid ${COLORS.bordure}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:14 }}>{ic}</div>
                ))}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Card style={{ background:COLORS.fondPage, border:`1px solid ${COLORS.bordure}`, padding:"10px 14px" }}>
                <p style={{ margin:"0 0 2px", fontSize:11, color:COLORS.texteSecondaire }}>Events</p>
                <p style={{ margin:0, fontSize:20, fontWeight:700, color:COLORS.texteSecondaire }}>6</p>
              </Card>
              <Card style={{ background:COLORS.fondPage, border:`1px solid ${COLORS.bordure}`, padding:"10px 14px" }}>
                <p style={{ margin:"0 0 2px", fontSize:11, color:COLORS.texteSecondaire }}>Target achieved</p>
                <p style={{ margin:0, fontSize:20, fontWeight:700, color:COLORS.succes }}>84%</p>
              </Card>
            </div>
          </div>
          <div style={{ marginTop:20 }}>
            <p style={{ fontWeight:700, fontSize:13, color:COLORS.texteSecondaire, marginBottom:10 }}>Groups</p>
            <div style={{ display:"flex", gap:12 }}>
              {[
                { label:"Teacher's", sub:"Union", color:COLORS.violetProfond },
                { label:"5th class", sub:"Maths", color:COLORS.cyanElectrique },
                { label:"6th class", sub:"Science", color:COLORS.succes },
              ].map((g,i) => (
                <div key={i} style={{ flex:1, border:`1px solid ${COLORS.bordure}`, borderRadius:10, padding:"10px 12px", textAlign:"center" }}>
                  <p style={{ margin:"0 0 2px", fontSize:12, color:COLORS.texteSecondaire, fontWeight:600 }}>{g.label}</p>
                  <p style={{ margin:"0 0 8px", fontSize:11, color:COLORS.texteSecondaire }}>{g.sub}</p>
                  <button style={{ background:g.color, color:"#fff", border:"none", borderRadius:14, padding:"4px 14px", fontSize:11, cursor:"pointer", fontWeight:600 }}>Join</button>
                </div>
              ))}
              <button style={{ flex:1, border:`2px dashed ${COLORS.bordure}`, borderRadius:10, padding:"10px 12px", background:"transparent", cursor:"pointer", color:COLORS.violetProfond, fontWeight:600, fontSize:12 }}>+ Create New Group</button>
            </div>
            <div style={{ display:"flex", gap:8, marginTop:12 }}>
              {["CP","JB","GF","DB","MB"].map((name,i) => (
                <Avatar key={i} name={name} size={30} bg={[COLORS.violetProfond,COLORS.cyanElectrique,COLORS.succes,COLORS.avertissement,COLORS.danger][i]} />
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <span style={{ fontWeight:700, fontSize:15, color:COLORS.texteSecondaire }}>Exam holds</span>
          </div>
          <ExamTable rows={examRows} />
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:14 }}>
            {[1,2,"…",10].map((p,i) => (
              <button key={i} style={{ width:28, height:28, borderRadius:6, border:`1px solid ${COLORS.bordure}`, background:i===0?COLORS.violetProfond:"transparent", color:i===0?"#fff":COLORS.texteSecondaire, cursor:"pointer", fontSize:12 }}>{p}</button>
            ))}
          </div>
        </Card>
      </div>
      <div style={{ display:"grid", gap:20 }}>
        <CalendarCard />
        <Card>
          <p style={{ fontWeight:700, fontSize:14, color:COLORS.texteSecondaire, marginBottom:12 }}>Today's Timeline</p>
          {[
            { time:"10:00 am", subject:"Solve real-world problems involving...", class:"Class: 8th" },
            { time:"11:00 am", subject:"Integers and rational numbers.", class:"Class: 8th" },
            { time:"2:00 pm", subject:"Expressions, equations and inequalities", class:"Class: 6th" },
            { time:"4:00 pm", subject:"Geometric transformations", class:"Class: 7th" },
            { time:"5:00 pm", subject:"Solve real-world problems involving...", class:"Class: 8th" },
          ].map((t,i) => (
            <div key={i} style={{ display:"flex", gap:12, marginBottom:12, paddingBottom:12, borderBottom: i<4?`1px solid ${COLORS.fondPage}`:"none" }}>
              <div style={{ width:2, background:COLORS.violetProfond, borderRadius:1, alignSelf:"stretch", minHeight:36, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <p style={{ margin:"0 0 2px", fontSize:12, fontWeight:500, color:COLORS.texteSecondaire }}>{t.subject}</p>
                <p style={{ margin:0, fontSize:11, color:COLORS.cyanElectrique }}>{t.class}</p>
              </div>
              <span style={{ fontSize:11, color:COLORS.texteSecondaire, whiteSpace:"nowrap" }}>{t.time}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  </div>
);

// ===== PAGE 4: PARENTS =====
const ParentsPage = () => (
  <div style={{ flex:1, background:COLORS.fondPage, overflowY:"auto", fontFamily:"'DM Sans', sans-serif" }}>
    <TopBar title="Dashboard" />
    <div style={{ padding:"24px 28px", display:"grid", gap:20 }}>
      <div style={{ display:"flex", gap:14 }}>
        <StatCard label="Due Fees" value="$4503" />
        <StatCard label="Results" value="24" delta="3%" />
        <StatCard label="Complaints" value="12" />
        <StatCard label="Expenses" value="$54000" />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }}>
        <div style={{ display:"grid", gap:20 }}>
          <Card>
            <div style={{ display:"flex", gap:20, alignItems:"flex-start" }}>
              <Avatar name="William Balck" size={80} bg={COLORS.violetProfond} />
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <div>
                    <h2 style={{ margin:"0 0 2px", fontSize:17, fontWeight:700, color:COLORS.texteSecondaire }}>William Balck</h2>
                    <p style={{ margin:"0 0 2px", fontSize:12, color:COLORS.texteSecondaire }}>williamblack@gmail.com</p>
                    <p style={{ margin:0, fontSize:12, color:COLORS.texteSecondaire }}>+ 88 9856418</p>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <span style={{ cursor:"pointer", color:COLORS.texteSecondaire, fontSize:18 }}>👤</span>
                    <span style={{ cursor:"pointer", color:COLORS.texteSecondaire }}>···</span>
                  </div>
                </div>
                <div style={{ display:"flex", gap:12, marginTop:10 }}>
                  {["🖨","📍","👥","🐦","📷"].map((ic,i) => (
                    <div key={i} style={{ width:28, height:28, borderRadius:6, border:`1px solid ${COLORS.bordure}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:14 }}>{ic}</div>
                  ))}
                </div>
              </div>
              <div style={{ minWidth:240 }}>
                <p style={{ fontWeight:700, fontSize:13, color:COLORS.texteSecondaire, marginBottom:10 }}>Kids</p>
                <div style={{ display:"flex", gap:14 }}>
                  {[
                    { name:"Jessia", class:"Class: 2nd", color:COLORS.cyanElectrique },
                    { name:"Jack", class:"Class: 6th", color:COLORS.violetProfond },
                    { name:"Jason", class:"Class: 11th", color:COLORS.succes },
                  ].map((k,i) => (
                    <div key={i} style={{ textAlign:"center" }}>
                      <Avatar name={k.name} size={36} bg={k.color} />
                      <p style={{ margin:"4px 0 0", fontSize:11, fontWeight:600, color:COLORS.texteSecondaire }}>{k.name}</p>
                      <p style={{ margin:0, fontSize:10, color:COLORS.texteSecondaire }}>{k.class}</p>
                    </div>
                  ))}
                  <span style={{ color:COLORS.texteSecondaire, cursor:"pointer", alignSelf:"flex-start" }}>···</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop:20 }}>
              <p style={{ fontWeight:700, fontSize:13, color:COLORS.texteSecondaire, marginBottom:10 }}>Joined Community</p>
              <div style={{ display:"flex", gap:12 }}>
                {[
                  { label:"Parents", sub:"Union", color:COLORS.violetProfond },
                  { label:"Transportation", sub:"March", color:COLORS.cyanElectrique },
                  { label:"Marathon", sub:"2023", color:COLORS.succes },
                ].map((g,i) => (
                  <div key={i} style={{ flex:1, border:`1px solid ${COLORS.bordure}`, borderRadius:10, padding:"10px 12px", textAlign:"center" }}>
                    <p style={{ margin:"0 0 2px", fontSize:12, color:COLORS.texteSecondaire, fontWeight:600 }}>{g.label}</p>
                    <p style={{ margin:"0 0 8px", fontSize:11, color:COLORS.texteSecondaire }}>{g.sub}</p>
                    <button style={{ background:COLORS.danger + "15", color:COLORS.danger, border:`1px solid ${COLORS.danger}30`, borderRadius:14, padding:"4px 14px", fontSize:11, cursor:"pointer", fontWeight:600 }}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontWeight:700, fontSize:15, color:COLORS.texteSecondaire }}>Exam Results</span>
            </div>
            <ExamTable rows={examRows} />
          </Card>
        </div>
        <div style={{ display:"grid", gap:20 }}>
          <CalendarCard />
          <Card>
            <p style={{ fontWeight:700, fontSize:14, color:COLORS.texteSecondaire, marginBottom:12 }}>All Expenses</p>
            {[
              { label:"Exam Fees", amount:"$150.00", date:"22/12/2019", status:"Paid" },
              { label:"Semester Fees", amount:"$350.00", date:"01/12/2019", status:"Due" },
              { label:"External Exam Fees", amount:"$180.00", date:"22/12/2019", status:"Paid" },
              { label:"Project Fees", amount:"$100.00", date:"01/12/2019", status:"Paid" },
              { label:"Tour Fees", amount:"...", date:"...", status:"Due" },
            ].map((e,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom: i<4?`1px solid ${COLORS.fondPage}`:"none" }}>
                <div>
                  <p style={{ margin:"0 0 2px", fontSize:13, fontWeight:600, color:COLORS.violetProfond }}>{e.amount}</p>
                  <p style={{ margin:0, fontSize:11, color:COLORS.texteSecondaire }}>{e.date}</p>
                </div>
                <div style={{ flex:1, marginLeft:12 }}>
                  <p style={{ margin:0, fontSize:12, color:COLORS.texteSecondaire }}>{e.label}</p>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  {e.status==="Due" && <span style={{ fontSize:14 }}>🔔</span>}
                  <Badge color={e.status==="Paid"?COLORS.succes:COLORS.danger}>{e.status}</Badge>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const pages = {
    dashboard: <DashboardPage />,
    students: <StudentsPage />,
    teachers: <TeachersPage />,
    parents: <ParentsPage />,
  };

  const currentPage = pages[activePage] || (
    <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:COLORS.fondPage, flexDirection:"column", gap:12 }}>
      <span style={{ fontSize:40 }}>🚧</span>
      <p style={{ color:COLORS.texteSecondaire, fontFamily:"'DM Sans', sans-serif", fontSize:16 }}>Page "<b>{activePage}</b>" — à venir</p>
    </div>
  );

  return (
    <div style={{ display:"flex", height:"100vh", fontFamily:"'DM Sans', sans-serif", overflow:"hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <Sidebar active={activePage} setActive={setActivePage} />
      {currentPage}
    </div>
  );
}
