import { Navigate, Route, Routes } from 'react-router-dom'
import EleveIndex from '../pages/eleves/EleveIndex'
import EleveCreate from '../pages/eleves/EleveCreate'
import EleveShow from '../pages/eleves/EleveShow'
import EleveEdit from '../pages/eleves/EleveEdit'
import EleveDelete from '../pages/eleves/EleveDelete'
import EleveSearch from '../pages/eleves/EleveSearch'

export default function Module33Router() {
  return (
    <Routes>
      <Route index element={<EleveIndex />} />
      <Route path="create" element={<EleveCreate />} />
      <Route path="show" element={<EleveShow />} />
      <Route path="edit" element={<EleveEdit />} />
      <Route path="delete" element={<EleveDelete />} />
      <Route path="search" element={<EleveSearch />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  )
}
