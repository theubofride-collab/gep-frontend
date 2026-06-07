import { Navigate, Route, Routes } from 'react-router-dom'
import NotesLayout from '../pages/notes/NotesLayout'
import NotesSaisie from '../pages/notes/NotesSaisie'
import NotesConsulter from '../pages/notes/NotesConsulter'
import Moyennes from '../pages/notes/Moyennes'
import Bulletins from '../pages/notes/Bulletins'

export default function NotesRouter() {
  return (
    <Routes>
      <Route element={<NotesLayout />}>
        <Route index element={<NotesSaisie />} />
        <Route path="consulter" element={<NotesConsulter />} />
        <Route path="moyennes" element={<Moyennes />} />
        <Route path="bulletins" element={<Bulletins />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  )
}
