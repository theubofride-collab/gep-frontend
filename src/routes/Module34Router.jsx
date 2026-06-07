import { Navigate, Route, Routes } from 'react-router-dom'
import Inscriptions from '../pages/Ps/Module_3.4/Inscriptions/Inscriptions'
import Create from '../pages/Ps/Module_3.4/Create/Create'
import Show from '../pages/Ps/Module_3.4/Show/Show'
import Cloturer from '../pages/Ps/Module_3.4/Cloturer/Cloturer'

export default function Module34Router() {
  return (
    <Routes>
      <Route index element={<Inscriptions />} />
      <Route path="create" element={<Create />} />
      <Route path="show" element={<Show />} />
      <Route path="cloturer" element={<Cloturer />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  )
}
