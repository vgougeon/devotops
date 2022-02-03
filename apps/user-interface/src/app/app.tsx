import { Route, Routes, useLocation } from 'react-router-dom';
import { useTitle } from 'react-use';
import { Header } from './layout/header';
import { ManageLayout } from './manage/layout/manageLayout';
import { MainRoutes } from './routers/mainRoutes';
import { ManageRoutes } from './routers/manageRoutes';

export function App() {
  const location = useLocation();
  let Layout = Header;
  if (location.pathname.startsWith('/manage')) Layout = ManageLayout;
  useTitle('Home - Devotops')
  return (
    <main className="overflow-hidden">
      <Layout>
        <Routes location={location} key={location.pathname}>
          <Route path="/manage/*" element={<ManageRoutes />} />
          <Route path="*" element={<MainRoutes />} />
        </Routes>
      </Layout>
    </main>
  );
}

export default App;
