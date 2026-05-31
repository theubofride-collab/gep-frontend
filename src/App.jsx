import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Ps/PageConnexion/Login'
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
