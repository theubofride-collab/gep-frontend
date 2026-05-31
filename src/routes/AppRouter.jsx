import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/dashboard/Dashboard';

// Pages discipline
import IncidentsList from '../pages/discipline/IncidentsList';
import SanctionsList from '../pages/discipline/SanctionsList';

// Pages notes
import NotesSaisie from '../pages/notes/NotesSaisie';
import NotesConsulter from '../pages/notes/NotesConsulter';
import Bulletins from '../pages/notes/Bulletins';
import Moyennes from '../pages/notes/Moyennes';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<div>Page Login</div>} />

        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Discipline */}
          <Route path="discipline/incidents" element={
            <ProtectedRoute roles={['ADMIN', 'SECRETAIRE', 'ENSEIGNANT']}>
              <IncidentsList />
            </ProtectedRoute>
          } />
          <Route path="discipline/sanctions" element={
            <ProtectedRoute roles={['ADMIN', 'SECRETAIRE']}>
              <SanctionsList />
            </ProtectedRoute>
          } />

          {/* Notes */}
          <Route path="notes/saisie" element={
            <ProtectedRoute roles={['ENSEIGNANT', 'ADMIN']}>
              <NotesSaisie />
            </ProtectedRoute>
          } />
          <Route path="notes/consulter" element={
            <ProtectedRoute roles={['ADMIN', 'SECRETAIRE', 'ENSEIGNANT']}>
              <NotesConsulter />
            </ProtectedRoute>
          } />
          <Route path="notes/bulletins" element={
            <ProtectedRoute roles={['ADMIN', 'SECRETAIRE']}>
              <Bulletins />
            </ProtectedRoute>
          } />
          <Route path="notes/moyennes" element={
            <ProtectedRoute roles={['ADMIN', 'SECRETAIRE', 'ENSEIGNANT']}>
              <Moyennes />
            </ProtectedRoute>
          } />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
