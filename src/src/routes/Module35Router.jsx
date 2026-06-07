import { Navigate, Route, Routes } from 'react-router-dom'
import Classes from '../pages/Ps/Module_3.5/Classes/Classes'
import Create from '../pages/Ps/Module_3.5/Create/Create'
import Show from '../pages/Ps/Module_3.5/Show/Show'
import Edit from '../pages/Ps/Module_3.5/Edit/Edit'
import Affecter from '../pages/Ps/Module_3.5/Affecter/Affecter'
import AffecterEnseignant from '../pages/Ps/Module_3.5/AffecterEnseignant/AffecterEnseignant'

export default function Module35Router() {
  return (
    <Routes>
      <Route index element={<Classes />} />
      <Route path="create" element={<Create />} />
      <Route path="show" element={<Show />} />
      <Route path="edit" element={<Edit />} />
      <Route path="affecter" element={<Affecter />} />
      <Route path="affecter-enseignant" element={<AffecterEnseignant />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  )
}
