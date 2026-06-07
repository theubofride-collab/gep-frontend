import { Navigate, Route, Routes } from 'react-router-dom'
import Eleves from '../pages/Ps/Module_3.3/Eleves/Eleves'
import Create from '../pages/Ps/Module_3.3/Create/Create'
import Show from '../pages/Ps/Module_3.3/Show/Show'
import Edit from '../pages/Ps/Module_3.3/Edit/Edit'
import Delete from '../pages/Ps/Module_3.3/Delete/Delete'
import Search from '../pages/Ps/Module_3.3/Search/Search'

export default function Module33Router() {
  return (
    <Routes>
      <Route index element={<Eleves />} />
      <Route path="create" element={<Create />} />
      <Route path="show" element={<Show />} />
      <Route path="edit" element={<Edit />} />
      <Route path="delete" element={<Delete />} />
      <Route path="search" element={<Search />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  )
}
