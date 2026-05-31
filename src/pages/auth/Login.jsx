import { useState } from "react";

const ROLES = ["Enseignant", "Administrateur", "Secrétaire", "Comptable"];

export default function Login() {
  const [role, setRole] = useState(ROLES[0]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(`Connexion en cours pour ${role}...`);
    window.setTimeout(() => {
      setMessage(`Prêt à ouvrir l'espace ${role} de GEP Nebular.`);
    }, 500);
  }

  return (
    <div className="login-shell" style={{
      minHeight: "100vh",
      background: "#F8F5FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <style>{`
        .login-card {
          width: 100%;
          max-width: 1100px;
          min-height: 640px;
          display: flex;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 36px 90px rgba(76, 29, 149, 0.18);
          border: 1px solid rgba(109, 40, 217, 0.12);
          background: #FFFFFF;
        }

        .login-side {
          flex: 0 0 35%;
          background: linear-gradient(180deg, #5B21B6 0%, #7C3AED 100%);
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px 32px;
          gap: 24px;
        }

        .login-main {
          flex: 1;
          background: #FFFFFF;
          padding: 40px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .role-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        @media (max-width: 960px) {
          .login-card {
            flex-direction: column;
            min-height: auto;
            max-width: 760px;
          }

          .login-side {
            flex: none;
            width: 100%;
            padding: 36px 28px;
          }

          .login-main {
            padding: 32px 28px;
          }
        }

        @media (max-width: 640px) {
          .login-shell {
            padding: 16px;
          }

          .login-card {
            max-width: 100%;
            border-radius: 22px;
          }

          .login-side {
            display: none;
          }

          .login-main {
            padding: 24px 18px;
          }

          .role-buttons {
            flex-direction: column;
          }
        }
      `}</style>
      <div className="login-card">

        <div className="login-side">
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            }}>
              G
            </div>
            <div>
              <p style={{ fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", margin: 0, opacity: 0.9 }}>
                GEP Nebular
              </p>
              <p style={{ fontSize: "14px", margin: "4px 0 0", opacity: 0.85 }}>
                Portail du personnel
              </p>
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: "40px", lineHeight: 1.05, margin: 0, fontWeight: 800 }}>
              GEP Nebular
            </h1>
            <p style={{ fontSize: "20px", margin: "16px 0 0", lineHeight: 1.5, maxWidth: "320px", color: "rgba(255,255,255,0.92)" }}>
              vous souhaite la bienvenue. 
              Un espace d'accès sécurisé pour l'ensemble des équipes pédagogiques et administratives.
            </p>
          </div>
          <div style={{
            marginTop: "auto",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: "20px",
          }}>
            <p style={{ fontSize: "13px", margin: 0, opacity: 0.9 }}>
              Connectez-vous avec votre compte professionnel pour accéder aux outils de gestion scolaire.
            </p>
            <div style={{ display: "grid", gap: "10px", marginTop: "18px" }}>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", padding: "12px 16px", borderRadius: "16px", background: "rgba(255,255,255,0.08)" }}>
                Administrateur · Secrétaire · Enseignant · Comptable
              </span>
            </div>
          </div>
        </div>

        <div className="login-main">
          <div style={{ maxWidth: "460px", width: "100%" }}>
            <p style={{ margin: 0, color: "#6D28D9", fontWeight: 700, fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Connexion personnel
            </p>
            <h2 style={{ margin: "16px 0 8px", fontSize: "32px", fontWeight: 800, color: "#1E1B4B" }}>
              Accédez à votre espace GEP Nebular
            </h2>
            <p style={{ margin: 0, color: "#6B7280", fontSize: "15px", lineHeight: 1.7 }}>
              Sélectionnez votre rôle, saisissez vos identifiants et commencez votre journée de gestion scolaire.
            </p>

            <div style={{ marginTop: "28px", display: "grid", gap: "12px" }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#374151", fontWeight: 600 }}>
                Rôle
              </p>
              <div className="role-buttons">
                {ROLES.map((item) => {
                  const isActive = item === role;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setRole(item)}
                      style={{
                        flex: "1 1 45%",
                        minWidth: "130px",
                        padding: "12px 18px",
                        borderRadius: "14px",
                        border: isActive ? "2px solid #6D28D9" : "1px solid #E5E7EB",
                        background: isActive ? "#EDE9FE" : "#F8FAFF",
                        color: isActive ? "#4C1D95" : "#475569",
                        cursor: "pointer",
                        fontWeight: 700,
                        textAlign: "center",
                      }}>
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "18px", marginTop: "30px" }}>
              <label style={{ display: "grid", gap: "10px", color: "#374151", fontWeight: 600, fontSize: "14px" }}>
                Adresse e-mail
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="votre.nom@gepnebular.school"
                  style={{
                    width: "100%",
                    padding: "16px 18px",
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    background: "#F8FAFF",
                    color: "#111827",
                    outline: "none",
                    fontSize: "15px",
                  }}
                  required
                />
              </label>

              <label style={{ display: "grid", gap: "10px", color: "#374151", fontWeight: 600, fontSize: "14px" }}>
                Mot de passe
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••••"
                  style={{
                    width: "100%",
                    padding: "16px 18px",
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    background: "#F8FAFF",
                    color: "#111827",
                    outline: "none",
                    fontSize: "15px",
                  }}
                  required
                />
              </label>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "#6B7280", fontSize: "14px" }}>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#6D28D9" }}
                  />
                  Se souvenir de moi
                </label>
                <button
                  type="button"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#6D28D9",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}>
                  Mot de passe oublié ?
                </button>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  borderRadius: "16px",
                  border: "none",
                  background: "#6D28D9",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 18px 30px rgba(109, 40, 217, 0.22)",
                }}>
                Se connecter
              </button>
            </form>

            {message && (
              <div style={{
                marginTop: "22px",
                padding: "18px",
                borderRadius: "16px",
                background: "#F3E8FF",
                color: "#5B21B6",
                fontSize: "14px",
                lineHeight: 1.7,
                border: "1px solid #E9D5FF",
              }}>
                {message}
              </div>
            )}

            <p style={{ marginTop: "26px", color: "#6B7280", fontSize: "13px", textAlign: "center" }}>
              GEP Nebular — accès sécurisé pour le personnel administratif et pédagogique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
