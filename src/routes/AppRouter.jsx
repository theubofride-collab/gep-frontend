import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from '../components/Ps/ModuleAdmin/Sidebar/Sidebar'
import Dashboard from '../pages/Ps/ModuleAdmin/Dashboard/Dashboard'
import Eleves from '../pages/Ps/ModuleAdmin/Eleves/Eleves'
import Enseignants from '../pages/Ps/ModuleAdmin/Enseignants/Enseignants'
import Parents from '../pages/Ps/ModuleAdmin/Parents/Parents'
import Compte from '../pages/Ps/ModuleAdmin/Compte/Compte'
import Classes from '../pages/Ps/ModuleAdmin/Classes/Classes'
import Examens from '../pages/Ps/ModuleAdmin/Examens/Examens'
import Transport from '../pages/Ps/ModuleAdmin/Transport/Transport'
import Annonces from '../pages/Ps/ModuleAdmin/Annonces/Annonces'
import Parametres from '../pages/Ps/ModuleAdmin/Parametres/Parametres'
import Sauvegardes from '../pages/Ps/ModuleAdmin/Sauvegardes/Sauvegardes'

export default function AppRouter() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="eleves" element={<Eleves />} />
          <Route path="enseignants" element={<Enseignants />} />
          <Route path="parents" element={<Parents />} />
          <Route path="compte" element={<Compte />} />
          <Route path="classes" element={<Classes />} />
          <Route path="examens" element={<Examens />} />
          <Route path="transport" element={<Transport />} />
          <Route path="annonces" element={<Annonces />} />
          
          <Route path="parametres" element={<Parametres />} />
          <Route path="sauvegardes" element={<Sauvegardes />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}
