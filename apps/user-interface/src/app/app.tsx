import { Route, Routes, useLocation } from 'react-router-dom'
import { MainRoutes } from "./routers/mainRoutes";
import { ManageRoutes } from "./routers/manageRoutes";

export function App() {
  const location = useLocation()
  return (
    <main className="overflow-hidden">
      <Routes location={location} key={ location.pathname}>
        <Route path='/manage/*' element={<ManageRoutes />}/>
        <Route path='*' element={<MainRoutes />}/>
      </Routes>
    </main>
  );
}

export default App;
