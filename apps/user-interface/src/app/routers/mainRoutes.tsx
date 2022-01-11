import { Header } from "../layout/header";
import HomePage from "../pages/home";
import { Route, Routes, useLocation } from 'react-router-dom'
import DeployPage from "../pages/deploy";
import { AuthorizationPage } from "../pages/authorization";

export function MainRoutes() {
  const location = useLocation()
  return (
    <main className="overflow-hidden">
      <Routes location={location} key={ location.pathname}>
        <Route path='/authorization' element={<AuthorizationPage key={location.pathname} />}/>
        <Route path='/' element={<HomePage key={location.pathname} />}/>
        <Route path='/deploy' element={<DeployPage key={location.pathname} />}/>
      </Routes>
    </main>
  );
}
