import { Header } from "../layout/header";
import HomePage from "../pages/home";
import { Route, Routes, useLocation } from 'react-router-dom'
import DeployPage from "../pages/deploy";
import { AuthorizationPage } from "../pages/authorization";

export function MainRoutes() {
  const location = useLocation()
  return (
    <main className="overflow-hidden">
      <Header />
      <Routes location={location} key={ location.pathname}>
        <Route path='/authorization' element={<AuthorizationPage key={0} />}/>
        <Route path='/' element={<HomePage key={1} />}/>
        <Route path='/deploy' element={<DeployPage key={2} />}/>
      </Routes>
    </main>
  );
}
