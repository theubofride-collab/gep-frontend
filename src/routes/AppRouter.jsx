import { Routes, Route, Navigate } from 'react-router-dom'
import AdminSidebar from '../components/layout/AdminSidebar'
import Dashboard from '../pages/administration/Dashboard'
import Enseignants from '../pages/administration/Enseignants'
import Parents from '../pages/administration/Parents'
import Compte from '../pages/administration/Compte'
import Examens from '../pages/administration/Examens'
import Transport from '../pages/transport/Transport'
import Annonces from '../pages/administration/Annonces'
import Parametres from '../pages/administration/Parametres'
import Sauvegardes from '../pages/administration/Sauvegardes'

export default function AppRouter() {
  return (
    <div className="app-layout">
      <AdminSidebar />
      <main className="main-content">
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="eleves" element={<Navigate to="/eleves" replace />} />
          <Route path="enseignants" element={<Enseignants />} />
          <Route path="parents" element={<Parents />} />
          <Route path="compte" element={<Compte />} />
          <Route path="classes" element={<Navigate to="/classes" replace />} />
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
