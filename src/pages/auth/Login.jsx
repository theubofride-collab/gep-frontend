import { useState } from "react";
import BrandLogo from '../../components/BrandLogo'

export default function Login() {
  const [email, setEmail] = useState("");
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if ((!email.trim() && !matricule.trim()) || !password.trim()) {
      setMessage("Veuillez renseigner votre adresse e-mail ou votre matricule, et votre mot de passe.");
      return;
    }

    setMessage("Connexion en cours...");
    window.setTimeout(() => {
      setMessage(`Prêt à ouvrir l'espace sécurisé de GEP Nebula.`);
    }, 500);
  }

  return (
    <div className="login-shell" style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, rgba(30, 11, 59, 0.15), transparent 32%), #F8F5FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <style>{`
        .login-card {
          width: 100%;
          max-width: 1120px;
          min-height: 680px;
          display: flex;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 40px 96px rgba(30, 11, 59, 0.18);
          border: 1px solid rgba(124, 58, 237, 0.14);
          background: #FFFFFF;
          position: relative;
        }

        .login-side {
          flex: 0 0 36%;
          background: linear-gradient(180deg, #1E0B3B 0%, #4C1D95 100%);
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 52px 36px;
          gap: 28px;
          position: relative;
        }

        .login-side::before {
          content: "";
          position: absolute;
          top: 24px;
          right: -42px;
          width: 150px;
          height: 150px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          filter: blur(10px);
        }

        .login-side::after {
          content: "";
          position: absolute;
          bottom: 24px;
          left: -36px;
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 50%;
          filter: blur(8px);
        }

        .login-side h1 {
          font-size: clamp(2.4rem, 2vw, 3.2rem);
          line-height: 1.05;
          margin: 0;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .login-side p {
          margin: 0;
          font-size: 1rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.88);
        }

        .login-side-features {
          display: grid;
          gap: 12px;
          margin-top: 12px;
        }

        .login-side-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
          font-size: 0.88rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .login-main {
          flex: 1;
          padding: 44px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-main h2 {
          margin: 16px 0 10px;
          font-size: clamp(2rem, 2.2vw, 2.6rem);
          line-height: 1.05;
          color: #1E1B4B;
          font-weight: 800;
        }

        .login-main p {
          margin: 0;
          color: #6B7280;
          font-size: 0.95rem;
          line-height: 1.75;
        }

        .login-credential-card {
          margin-top: 34px;
          display: grid;
          gap: 14px;
          padding: 26px;
          border-radius: 24px;
          background: #F8F3FF;
          border: 1px solid rgba(124, 58, 237, 0.16);
        }

        .login-credential-card p {
          margin: 0;
          color: #1E0B3B;
        }

        .login-credential-card p strong {
          color: #4C1D95;
        }

        .login-form {
          display: grid;
          gap: 18px;
          margin-top: 30px;
        }

        .login-field {
          display: grid;
          gap: 10px;
          color: #374151;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .login-field input {
          width: 100%;
          padding: 16px 18px;
          border-radius: 18px;
          border: 1px solid #E5E7EB;
          background: #F8FAFF;
          color: #111827;
          outline: none;
          font-size: 0.95rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .login-field input:focus {
          border-color: #7C3AED;
          box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12);
        }

        /* Ensure label and input always stack vertically in case global CSS overrides occur */
        .login-main .login-form > .login-field {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 10px !important;
          align-items: start !important;
        }

        .login-main .login-form > .login-field > span {
          display: block !important;
        }

        .login-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .login-actions label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #6B7280;
          font-size: 0.92rem;
          font-weight: 500;
        }

        .login-actions button {
          border: none;
          background: none;
          color: #4C1D95;
          font-weight: 700;
          text-decoration: underline;
          font-size: 0.93rem;
          cursor: pointer;
        }

        .login-submit {
          width: 100%;
          padding: 18px 20px;
          border-radius: 18px;
          border: none;
          background: linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%);
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 18px 40px rgba(124, 58, 237, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .login-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 24px 48px rgba(124, 58, 237, 0.28);
        }

        .login-message {
          color: #1E0B3B;
          font-weight: 600;
          font-size: 0.95rem;
          margin-top: 22px;
          padding: 18px;
          border-radius: 16px;
          background: #F3E8FF;
          border: 1px solid #E9D5FF;
          line-height: 1.7;
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
            border-radius: 24px;
          }

          .login-side {
            display: none;
          }

          .login-main {
            padding: 24px 18px;
          }
        }
      `}</style>

      <div className="login-card">
        <div className="login-side">
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <BrandLogo
              size={64}
              radius={18}
              fontSize={26}
              bg="linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)"
              color="#FFFFFF"
              shadow="0 18px 40px rgba(124, 58, 237, 0.28)"
              label="G"
            />
            <div>
              <p style={{ fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", margin: 0, opacity: 0.88 }}>
                Portail du personnel
              </p>
              <p style={{ fontSize: "18px", margin: "6px 0 0", fontWeight: 800, letterSpacing: "0.04em" }}>
                GEP Nebula
              </p>
            </div>
          </div>

          <div>
            <h1 style={{ fontSize: "clamp(2.4rem, 2vw, 3.2rem)", lineHeight: 1.05, margin: 0, fontWeight: 800 }}>
              Bienvenue dans votre espace
            </h1>
            <p style={{ fontSize: "1rem", margin: "18px 0 0", lineHeight: 1.75, maxWidth: "340px", color: "rgba(255,255,255,0.88)" }}>
              Bienvenue sur le portail GEP Nebula. Connectez-vous pour retrouver vos tableaux de bord, classes et documents.
            </p>
          </div>

          <div className="login-side-features">
            <span className="login-side-chip">Connexion dédiée</span>
            <span className="login-side-chip">Sécurité renforcée</span>
            <span className="login-side-chip">Design Nebula</span>
          </div>
        </div>

        <div className="login-main">
          <div style={{ maxWidth: "460px", width: "100%" }}>
              <p style={{ margin: 0, color: "#1E0B3B", fontWeight: 700, fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Connexion sécurisée
            </p>
            <h2 style={{ margin: "16px 0 8px", fontSize: "32px", fontWeight: 800, color: "#1E1B4B" }}>
              Entrez votre e-mail ou votre matricule
            </h2>
            <p style={{ margin: 0, color: "#6B7280", fontSize: "15px", lineHeight: 1.7 }}>
              L'accès au portail est réservé au personnel autorisé. Merci d'utiliser vos identifiants professionnels.
            </p>

            <div className="login-credential-card">
                <p style={{ color: "#1E0B3B", fontWeight: 700, fontSize: "14px" }}>
                  Accès interne
                </p>
                <p style={{ color: "#1E0B3B", fontSize: "15px", lineHeight: 1.6 }}>
                  Renseignez soit votre adresse e-mail, soit votre matricule selon votre préférence.
                </p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-field">
                <span>Adresse e-mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="votre.nom@gepnebula.school"
                />
              </div>

              <div className="login-field">
                <span>Matricule</span>
                <input
                  type="text"
                  value={matricule}
                  onChange={(event) => setMatricule(event.target.value)}
                  placeholder="123456"
                />
              </div>

              <div className="login-field">
                <span>Mot de passe</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••••"
                  required
                />
              </div>

              <div className="login-actions">
                <label>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#7C3AED" }}
                  />
                  Se souvenir de moi
                </label>
                <button type="button">Mot de passe oublié ?</button>
              </div>

              <button className="login-submit" type="submit">
                Se connecter
              </button>
            </form>

            {message && (
              <div className="login-message">
                {message}
              </div>
            )}

            <p style={{ marginTop: "26px", color: "#6B7280", fontSize: "13px", textAlign: "center" }}>
              GEP Nebula — accès sécurisé pour le personnel administratif et pédagogique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
