import { useNavigate } from 'react-router-dom'
import Module34Layout from '../../../../components/Ps/Module_3.4/Module34Layout'
import { getInscriptionById } from '../../../../components/Ps/Module_3.4/module34Data'

export default function Show() {
  const navigate = useNavigate()
  const inscription = getInscriptionById('INS-2025-0047')

  return (
    <Module34Layout breadcrumb={['Inscriptions', inscription.id]} backTo="/inscriptions">
      <div className="module34-hero">
        <div className="module34-hero-top">
          <div className="module34-hero-avatar">{inscription.initials}</div>
          <div className="module34-hero-info">
            <div className="module34-hero-name">{inscription.fullName}</div>
            <div className="module34-hero-sub">{inscription.studentId} · {inscription.id}</div>
            <div className="module34-hero-tags">
              <span className="module34-htag active">📋 Active</span>
              <span className="module34-htag section">{inscription.section}</span>
              <span className="module34-htag class">{inscription.className}</span>
              <span className="module34-htag year">{inscription.year}</span>
            </div>
          </div>
        </div>
        <div className="module34-hero-stats">
          <div className="module34-hstat"><div className="module34-hstat-val">15.<span style={{ color: '#06b6d4' }}>4</span></div><div className="module34-hstat-lbl">Moyenne T1</div></div>
          <div className="module34-hstat"><div className="module34-hstat-val">2</div><div className="module34-hstat-lbl">Absences</div></div>
          <div className="module34-hstat"><div className="module34-hstat-val">0</div><div className="module34-hstat-lbl">Incidents</div></div>
          <div className="module34-hstat"><div className="module34-hstat-val"><span style={{ color: '#06b6d4' }}>{inscription.percent}%</span></div><div className="module34-hstat-lbl">Paiements</div></div>
        </div>
      </div>

      <div className="module34-tabs-bar">
        <div className="module34-tab-item active">Informations</div>
        <div className="module34-tab-item">Fiche élève</div>
        <div className="module34-tab-item">Notes</div>
        <div className="module34-tab-item">Paiements</div>
        <div className="module34-tab-item">Historique</div>
      </div>

      <div className="module34-panels">
        <div className="module34-grid-2">
          <div>
            <div className="module34-panel">
              <div className="module34-panel-header"><div className="module34-card-icon ci-v">📋</div><div><div className="module34-panel-title">Détails de l'inscription</div><div className="module34-panel-subtitle">Informations principales</div></div></div>
              <div className="module34-panel-body">
                <div className="module34-info-grid">
                  <div className="module34-info-item"><div className="module34-info-label">N° inscription</div><div className="module34-info-value mono">{inscription.id}</div></div>
                  <div className="module34-info-item"><div className="module34-info-label">Matricule élève</div><div className="module34-info-value mono">{inscription.studentId}</div></div>
                  <div className="module34-info-item"><div className="module34-info-label">Année scolaire</div><div className="module34-info-value">{inscription.year}</div></div>
                  <div className="module34-info-item"><div className="module34-info-label">Date d'inscription</div><div className="module34-info-value">{inscription.dateLabel}</div></div>
                  <div className="module34-info-item"><div className="module34-info-label">Section</div><div className="module34-info-value"><span className="module34-section-tag sec-fr">{inscription.section}</span></div></div>
                  <div className="module34-info-item"><div className="module34-info-label">Classe</div><div className="module34-info-value">{inscription.className}</div></div>
                  <div className="module34-info-item"><div className="module34-info-label">Statut</div><div className="module34-info-value"><span className="module34-badge b-active"><span className="bdot" />Active</span></div></div>
                  <div className="module34-info-item"><div className="module34-info-label">Enregistrée par</div><div className="module34-info-value">{inscription.by}</div></div>
                </div>
              </div>
            </div>

            <div className="module34-panel">
              <div className="module34-panel-header"><div className="module34-card-icon ci-a">📝</div><div><div className="module34-panel-title">Observations</div></div></div>
              <div className="module34-panel-body"><p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{inscription.observations}</p></div>
            </div>
          </div>

          <div>
            <div className="module34-panel">
              <div className="module34-panel-header"><div className="module34-card-icon ci-c">🏫</div><div><div className="module34-panel-title">Classe affectée</div></div></div>
              <div className="module34-panel-body">
                <div style={{ background: 'linear-gradient(135deg, rgba(76,29,149,.07), rgba(6,182,212,.05))', border: '1.5px solid #ede9fe', borderRadius: 12, padding: 16, textAlign: 'center', marginBottom: 14 }}>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 32, fontWeight: 800, color: '#4c1d95' }}>{inscription.className}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Section {inscription.section}</div>
                </div>
                <div className="module34-info-grid">
                  <div className="module34-info-item"><div className="module34-info-label">Responsable</div><div className="module34-info-value">M. Nkomo Alain</div></div>
                  <div className="module34-info-item"><div className="module34-info-label">Salle</div><div className="module34-info-value">Bâtiment B — S04</div></div>
                  <div className="module34-info-item"><div className="module34-info-label">Tuteur</div><div className="module34-info-value">M. Fouda Jean</div></div>
                  <div className="module34-info-item"><div className="module34-info-label">Téléphone</div><div className="module34-info-value">699 000 000</div></div>
                </div>
              </div>
            </div>

            <div className="module34-panel">
              <div className="module34-panel-header"><div className="module34-card-icon ci-g">💳</div><div><div className="module34-panel-title">Situation paiements</div></div></div>
              <div className="module34-panel-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(5,150,105,.05)', border: '1px solid rgba(5,150,105,.15)', borderRadius: 10 }}>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 800, color: '#059669' }}>75 000</div>
                    <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>FCFA payés</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 12, background: 'rgba(217,119,6,.05)', border: '1px solid rgba(217,119,6,.15)', borderRadius: 10 }}>
                    <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 800, color: '#d97706' }}>25 000</div>
                    <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>FCFA restants</div>
                  </div>
                </div>
                <div className="module34-summary-progress"><div style={{ width: `${inscription.percent}%` }} /></div>
                <div style={{ fontSize: 11, color: '#6b7280', textAlign: 'center', marginTop: 8 }}>{inscription.percent}% du total réglé — T3 en attente</div>
              </div>
            </div>

            <div className="module34-footer">
              <button className="module34-button-secondary" type="button" onClick={() => navigate('/inscriptions')}>Retour</button>
              <button className="module34-button" type="button" onClick={() => navigate('/inscriptions/cloturer')}>Clôturer</button>
            </div>
          </div>
        </div>
      </div>
    </Module34Layout>
  )
}
