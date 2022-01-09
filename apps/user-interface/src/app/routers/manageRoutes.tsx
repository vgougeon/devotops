import { Route, Routes, useLocation } from 'react-router-dom'
import ManageDashboard from "../manage/pages/dashboard";
import { Sidenav } from "../manage/layout/sidenav";

export function ManageRoutes() {
  const location = useLocation()
  return (
    <main className="h-screen w-screen overflow-hidden bg-neutral-800 flex">
      <Sidenav />
      <div className="h-screen grow overflow-y-auto">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<ManageDashboard />} />
        </Routes>
      </div>

    </main>
  );
}
