import { useState, useEffect } from "react";
import BrandLogo from "../components/BrandLogo";

const STATS = [
  { value: "500+", label: "Élèves gérés", icon: "🎓" },
  { value: "12",   label: "Classes actives", icon: "🏫" },
  { value: "98%",  label: "Paiements tracés", icon: "✅" },
  { value: "4",    label: "Rôles utilisateurs", icon: "👥" },
];

const FEATURES = [
  {
    icon: "📋",
    title: "Inscriptions",
    desc: "Inscrivez vos élèves, affectez-les aux classes et générez automatiquement leurs tranches de paiement.",
    color: "#06B6D4",
  },
  {
    icon: "💰",
    title: "Paiements",
    desc: "Suivez chaque versement, consultez les impayés et éditez des factures PDF en un clic.",
    color: "#6D28D9",
  },
  {
    icon: "📝",
    title: "Notes & Bulletins",
    desc: "Saisie des notes par matière, calcul automatique des moyennes, bulletins PDF prêts à imprimer.",
    color: "#06B6D4",
  },
  {
    icon: "🚌",
    title: "Transport",
    desc: "Gérez les abonnements bus, les mensualités et suivez les impayés de transport par élève.",
    color: "#6D28D9",
  },
  {
    icon: "⚠️",
    title: "Discipline",
    desc: "Signalez les incidents, appliquez des sanctions et gardez un historique complet par élève.",
    color: "#06B6D4",
  },
  {
    icon: "📊",
    title: "Tableaux de bord",
    desc: "Chaque acteur dispose d'une vue personnalisée avec les indicateurs clés de son périmètre.",
    color: "#6D28D9",
  },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, []);

  return (
    <div style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif", background: "#F8FAFF", color: "#1E1B4B", overflowX: "hidden" }}>

      {/* ── Google Font ── */}
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 60 ? "rgba(30,11,59,0.97)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(6,182,212,0.15)" : "none",
        transition: "all 0.4s ease",
        padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BrandLogo />
          <span style={{ fontWeight: 800, fontSize: 20, color: "#fff", letterSpacing: 0.5, lineHeight: 1 }}>
            GEP <span style={{ color: "#38bdf8", fontWeight: 700, fontSize: 13 }}>Nebular</span>
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Fonctionnalités", "À propos", "Contact"].map((l) => (
            <a key={l} href="#" style={{
              color: "rgba(255,255,255,0.75)", fontSize: 15, textDecoration: "none",
              fontWeight: 400, transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#06B6D4"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}
            >{l}</a>
          ))}
          <a href="/login" style={{
            background: "linear-gradient(135deg, #4C1D95, #06B6D4)",
            color: "#fff", padding: "9px 22px", borderRadius: 8,
            fontWeight: 600, fontSize: 14, textDecoration: "none",
            boxShadow: "0 0 20px rgba(6,182,212,0.3)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 4px 24px rgba(6,182,212,0.5)"; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 0 20px rgba(6,182,212,0.3)"; }}
          >Se connecter</a>
        </div>
      </nav>

      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{
        position: "relative", minHeight: "100vh",
        display: "flex", alignItems: "center",
        overflow: "hidden",
      }}>
        {/* Photo de fond ultra nette — Enfants en classe */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center 35%",
          transform: `translateY(${scrollY * 0.25}px)`,
          transition: "transform 0.1s linear",
        }} />

        {/* Overlay dégradé ajusté pour plus de netteté sur l'image */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(120deg, rgba(30,11,59,0.88) 0%, rgba(76,29,149,0.75) 40%, rgba(6,182,212,0.12) 100%)",
        }} />

        {/* Particules lumineuses */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: [180, 120, 200, 90, 150, 100, 80, 160][i],
            height: [180, 120, 200, 90, 150, 100, 80, 160][i],
            borderRadius: "50%",
            background: i % 2 === 0
              ? "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 70%)",
            left: `${[10, 80, 60, 25, 70, 40, 15, 85][i]}%`,
            top: `${[20, 10, 60, 80, 40, 70, 50, 30][i]}%`,
            animation: `float${i % 3} ${4 + i}s ease-in-out infinite alternate`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Contenu Hero */}
        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: 760, marginLeft: "8%",
          padding: "120px 0 80px",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(30px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(6,182,212,0.15)",
            border: "1px solid rgba(6,182,212,0.35)",
            borderRadius: 50, padding: "6px 16px", marginBottom: 28,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#06B6D4", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#22D3EE", fontSize: 13, fontWeight: 500 }}>
              Système de gestion scolaire — Réseau local
            </span>
          </div>

          {/* Titre */}
          <h1 style={{
            fontSize: "clamp(42px, 6vw, 76px)",
            fontWeight: 900, lineHeight: 1.05,
            color: "#fff", margin: "0 0 48px",
            letterSpacing: -1.5,
          }}>
            L'école primaire,{" "}
            <span style={{
              background: "linear-gradient(90deg, #06B6D4, #22D3EE, #A78BFA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              gérée avec précision
            </span>
          </h1>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="/login" style={{
              background: "linear-gradient(135deg, #4C1D95 0%, #06B6D4 100%)",
              color: "#fff", padding: "15px 36px",
              borderRadius: 10, fontWeight: 700, fontSize: 16,
              textDecoration: "none", display: "inline-flex",
              alignItems: "center", gap: 8,
              boxShadow: "0 8px 32px rgba(6,182,212,0.35)",
              transition: "transform 0.25s, box-shadow 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(6,182,212,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(6,182,212,0.35)"; }}
            >
              Accéder à l'application →
            </a>
            <a href="#features" style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff", padding: "15px 30px",
              borderRadius: 10, fontWeight: 500, fontSize: 15,
              textDecoration: "none",
              backdropFilter: "blur(8px)",
              transition: "background 0.25s, border 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            >
              Découvrir les modules
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 36, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 6, opacity: 0.5, animation: "bounce 2s ease-in-out infinite",
        }}>
          <span style={{ color: "#fff", fontSize: 11, letterSpacing: 2, fontWeight: 300 }}>DÉFILER</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #06B6D4, transparent)" }} />
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <section style={{
        background: "linear-gradient(135deg, #1E0B3B 0%, #2D0F5E 100%)",
        padding: "60px 8%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 32,
        borderTop: "1px solid rgba(6,182,212,0.2)",
        borderBottom: "1px solid rgba(6,182,212,0.2)",
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
            <div style={{
              fontSize: 42, fontWeight: 900, color: "#fff",
              background: "linear-gradient(90deg, #06B6D4, #A78BFA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 8, fontWeight: 300 }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section id="features" style={{ padding: "100px 8%" }}>
        {/* Titre section */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(76,29,149,0.1)",
            border: "1px solid rgba(76,29,149,0.2)",
            borderRadius: 50, padding: "5px 18px", marginBottom: 20,
          }}>
            <span style={{ color: "#6D28D9", fontSize: 13, fontWeight: 600 }}>MODULES DISPONIBLES</span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800,
            color: "#1E1B4B", lineHeight: 1.15, margin: "0 0 16px",
            letterSpacing: -1,
          }}>
            Tout ce dont une école{" "}
            <span style={{ color: "#4C1D95" }}>a besoin</span>
          </h2>
          <p style={{
            fontSize: 17, color: "#6B7280", maxWidth: 500,
            margin: "0 auto", fontWeight: 300, lineHeight: 1.7,
          }}>
            Six modules intégrés, un seul outil. Chaque acteur accède
            uniquement à son périmètre de responsabilité.
          </p>
        </div>

        {/* Grille de features */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: 16,
              padding: "32px 28px",
              border: "1px solid rgba(76,29,149,0.08)",
              boxShadow: "0 2px 20px rgba(76,29,149,0.06)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
              cursor: "default",
              opacity: visible ? 1 : 0,
              transitionDelay: `${i * 0.08}s`,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(76,29,149,0.14)`;
                e.currentTarget.style.borderColor = f.color + "44";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 2px 20px rgba(76,29,149,0.06)";
                e.currentTarget.style.borderColor = "rgba(76,29,149,0.08)";
              }}
            >
              {/* Icône */}
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: f.color === "#06B6D4"
                  ? "linear-gradient(135deg, #E0F7FA, #B2EBF2)"
                  : "linear-gradient(135deg, #EDE9FE, #DDD6FE)",
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 24,
                marginBottom: 20,
              }}>{f.icon}</div>

              {/* Titre */}
              <h3 style={{
                fontSize: 19, fontWeight: 700,
                color: "#1E1B4B", margin: "0 0 10px",
              }}>{f.title}</h3>

              {/* Description */}
              <p style={{
                fontSize: 14.5, color: "#6B7280",
                lineHeight: 1.7, margin: 0, fontWeight: 300,
              }}>{f.desc}</p>

              {/* Tag couleur */}
              <div style={{
                marginTop: 22,
                display: "inline-block",
                background: f.color + "15",
                border: `1px solid ${f.color}30`,
                borderRadius: 50, padding: "4px 14px",
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: f.color }}>
                  Inclus dans GEP
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ ACCES ROLES ══════════════════ */}
      <section style={{
        background: "linear-gradient(135deg, #1E0B3B 0%, #2D0F5E 100%)",
        padding: "90px 8%",
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 60, alignItems: "center",
        }}>
          {/* Texte gauche */}
          <div>
            <div style={{
              background: "rgba(6,182,212,0.12)",
              border: "1px solid rgba(6,182,212,0.25)",
              borderRadius: 50, padding: "5px 16px",
              display: "inline-block", marginBottom: 24,
            }}>
              <span style={{ color: "#22D3EE", fontSize: 12, fontWeight: 600 }}>ACCÈS SÉCURISÉ</span>
            </div>
            <h2 style={{
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 800, color: "#fff",
              lineHeight: 1.2, margin: "0 0 18px",
            }}>
              Chaque acteur a{" "}
              <span style={{ color: "#06B6D4" }}>son espace</span>
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.6)", fontSize: 15.5,
              lineHeight: 1.75, fontWeight: 300, margin: "0 0 28px",
            }}>
              Les droits d'accès sont contrôlés par JWT côté serveur.
              Personne n'accède à ce qui ne le concerne pas.
            </p>
            <a href="/login" style={{
              background: "linear-gradient(135deg, #06B6D4, #4C1D95)",
              color: "#fff", padding: "13px 28px",
              borderRadius: 9, fontWeight: 600, fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 6px 24px rgba(6,182,212,0.3)",
              display: "inline-block",
              transition: "transform 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              Se connecter →
            </a>
          </div>

          {/* Cartes rôles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { role: "Administrateur", desc: "Vue complète, configuration du système, gestion des utilisateurs", icon: "🛡️", badge: "#A78BFA" },
              { role: "Secrétaire", desc: "Inscriptions, paiements, transport, impressions et exports", icon: "📌", badge: "#06B6D4" },
              { role: "Comptable", desc: "Gestion globale de la caisse, validation des tranches et suivi financier", icon: "📊", badge: "#EC4899" },
              { role: "Enseignant", desc: "Saisie des notes, signalement absences et incidents de classe", icon: "📚", badge: "#34D399" },
            ].map((r, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "18px 20px",
                display: "flex", alignItems: "flex-start", gap: 16,
                backdropFilter: "blur(8px)",
                transition: "background 0.2s, border 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = r.badge + "44"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <div style={{ fontSize: 24, marginTop: 2 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{r.role}</span>
                    <span style={{
                      background: r.badge + "22",
                      border: `1px solid ${r.badge}44`,
                      color: r.badge, fontSize: 11,
                      fontWeight: 600, padding: "2px 10px",
                      borderRadius: 50,
                    }}>Actif</span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA FINAL ══════════════════ */}
      <section style={{
        padding: "110px 8%", textAlign: "center",
        background: "#F8FAFF",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: 600, height: 600,
          borderRadius: "50%", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(76,29,149,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 900, color: "#1E1B4B",
            margin: "0 0 20px", letterSpacing: -1.2,
          }}>
            Prêt à transformer{" "}
            <span style={{
              background: "linear-gradient(90deg, #4C1D95, #06B6D4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>votre école ?</span>
          </h2>
          <p style={{
            fontSize: 17, color: "#6B7280", maxWidth: 460,
            margin: "0 auto 44px", lineHeight: 1.7, fontWeight: 300,
          }}>
            Connectez-vous depuis n'importe quelle machine du réseau
            et commencez à gérer votre établissement.
          </p>
          <a href="/login" style={{
            background: "linear-gradient(135deg, #4C1D95 0%, #06B6D4 100%)",
            color: "#fff", padding: "17px 48px",
            borderRadius: 12, fontWeight: 800, fontSize: 17,
            textDecoration: "none",
            boxShadow: "0 10px 40px rgba(76,29,149,0.3)",
            display: "inline-block",
            transition: "transform 0.25s, box-shadow 0.25s",
            letterSpacing: 0.3,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 18px 50px rgba(76,29,149,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(76,29,149,0.3)"; }}
          >
            Accéder à GEP Nebular →
          </a>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{
        background: "#1E0B3B",
        padding: "40px 8%",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 16,
        borderTop: "1px solid rgba(6,182,212,0.15)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BrandLogo size={32} radius={8} fontSize={13} />
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, lineHeight: 1 }}>
            GEP <span style={{ color: "#38bdf8", fontWeight: 700, fontSize: 11 }}>Nebular</span>
          </span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: 0, fontWeight: 300 }}>
          © 2026 GEP Nebular — Génie Informatique — Réseau intranet scolaire
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Connexion", "À propos", "Support"].map(l => (
            <a key={l} href="#" style={{
              color: "rgba(255,255,255,0.35)", fontSize: 13,
              textDecoration: "none", fontWeight: 300,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#06B6D4"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
            >{l}</a>
          ))}
        </div>
      </footer>

      {/* ══════════════════ KEYFRAMES ══════════════════ */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes float0 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(12px, -18px) scale(1.06); }
        }
        @keyframes float1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-10px, 14px) scale(0.95); }
        }
        @keyframes float2 {
          from { transform: translate(0, 0) rotate(0deg); }
          to   { transform: translate(8px, -10px) rotate(5deg); }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
