import { Route, Routes, useLocation } from 'react-router-dom';
import { useTitle } from 'react-use';
import ManageAdd from '../manage/pages/add';
import ManageDashboard from '../manage/pages/dashboard';
import ManageHome from '../manage/pages/home';
import ManageProjects from '../manage/pages/projects';

export function ManageRoutes() {
  const location = useLocation();
  useTitle('Manager - Devotops')
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<ManageHome />} key={location.pathname} />
      <Route path="/add" element={<ManageAdd />} key={location.pathname} />
      <Route path="/projects" element={<ManageProjects />} key={location.pathname} />
      <Route path="/dashboard" element={<ManageDashboard />} key={location.pathname} />
    </Routes>
  );
}
