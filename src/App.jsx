import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Ps/PageConnexion/Login'
import AppRouter from './routes/AppRouter'
import Module33Router from './routes/Module33Router'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AppRouter />} />
        <Route path="/eleves/*" element={<Module33Router />} />
        <Route path="/ps/module-3-3/*" element={<Module33Router />} />
      </Routes>
    </BrowserRouter>
  )
}
