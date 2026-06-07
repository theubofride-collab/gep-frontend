import { Navigate, Route, Routes } from 'react-router-dom'
import ClasseIndex from '../pages/classes/ClasseIndex'
import ClasseCreate from '../pages/classes/ClasseCreate'
import ClasseShow from '../pages/classes/ClasseShow'
import ClasseEdit from '../pages/classes/ClasseEdit'
import Affecter from '../pages/classes/Affecter'
import AffecterEnseignant from '../pages/classes/AffecterEnseignant'

export default function Module35Router() {
  return (
    <Routes>
      <Route index element={<ClasseIndex />} />
      <Route path="create" element={<ClasseCreate />} />
      <Route path="show" element={<ClasseShow />} />
      <Route path="edit" element={<ClasseEdit />} />
      <Route path="affecter" element={<Affecter />} />
      <Route path="affecter-enseignant" element={<AffecterEnseignant />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  )
}
