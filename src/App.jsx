import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import PsLogin from './pages/Ps/PageConnexion/Login'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import ComptableDashboard from './pages/dashboard/ComptableDashboard'
import EnseignantDashboard from './pages/dashboard/EnseignantDashboard'
import SecretaireDashboard from './pages/dashboard/SecretaireDashboard'
import AppRouter from './routes/AppRouter'
import Module33Router from './routes/Module33Router'
import Module34Router from './routes/Module34Router'
import Module35Router from './routes/Module35Router'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ps/login" element={<PsLogin />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/comptable" element={<ComptableDashboard />} />
        <Route path="/dashboard/enseignant" element={<EnseignantDashboard />} />
        <Route path="/dashboard/secretaire" element={<SecretaireDashboard />} />
        <Route path="/admin/*" element={<AppRouter />} />
        <Route path="/eleves/*" element={<Module33Router />} />
        <Route path="/ps/module-3-3/*" element={<Module33Router />} />
        <Route path="/inscriptions/*" element={<Module34Router />} />
        <Route path="/ps/module-3-4/*" element={<Module34Router />} />
        <Route path="/classes/*" element={<Module35Router />} />
        <Route path="/ps/module-3-5/*" element={<Module35Router />} />
      </Routes>
    </BrowserRouter>
  )
}

