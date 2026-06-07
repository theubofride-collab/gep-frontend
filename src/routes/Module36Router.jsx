import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Ps/Module_3.6/Dashboard/Dashboard'
import Create from '../pages/Ps/Module_3.6/Create/Create'
import Factures from '../pages/Ps/Module_3.6/Factures/Factures'
import Historique from '../pages/Ps/Module_3.6/Historique/Historique'
import Impayes from '../pages/Ps/Module_3.6/Impayes/Impayes'
import Liste from '../pages/Ps/Module_3.6/Liste/Liste'
import Bulletin from '../pages/Ps/Module_3.6/exports/Bulletin/Bulletin'
import ExportExcel from '../pages/Ps/Module_3.6/exports/ExportExcel/ExportExcel'
import ExportFacture from '../pages/Ps/Module_3.6/exports/ExportFacture/ExportFacture'
import FicheEleve from '../pages/Ps/Module_3.6/exports/FicheEleve/FicheEleve'
import ListeClasse from '../pages/Ps/Module_3.6/exports/ListeClasse/ListeClasse'

export default function Module36Router() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="liste" element={<Liste />} />
      <Route path="create" element={<Create />} />
      <Route path="impayes" element={<Impayes />} />
      <Route path="historique" element={<Historique />} />
      <Route path="factures" element={<Factures />} />
      <Route path="exports/liste-classe" element={<ListeClasse />} />
      <Route path="exports/bulletin" element={<Bulletin />} />
      <Route path="exports/facture" element={<ExportFacture />} />
      <Route path="exports/fiche-eleve" element={<FicheEleve />} />
      <Route path="exports/excel" element={<ExportExcel />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  )
}
