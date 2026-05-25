import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import AppRouter from './routes/AppRouter'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AppRouter />} />
      </Routes>
    </BrowserRouter>
  )
}
