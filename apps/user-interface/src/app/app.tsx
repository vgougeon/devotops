import Banner from "../components/layout/banner";
import { AnimatePresence, motion } from 'framer-motion';
import { RiServerLine } from 'react-icons/ri'
import { IoRocketSharp } from 'react-icons/io5'
import { BsGithub } from 'react-icons/bs'
import { Header } from "./layout/header";
import HomePage from "./pages/home";
import { Route, Router, Routes, useLocation } from 'react-router-dom'
import DeployPage from "./pages/deploy";

const TECHNOLOGIES = [
  { name: 'React', src: '/assets/technologies/react.webp' },
  { name: 'Angular', src: '/assets/technologies/angular.png' },
  { name: 'Vue', src: '/assets/technologies/vue.png' },
  { name: 'Next', src: '/assets/technologies/next.png' },
  { name: 'Node', src: '/assets/technologies/node.png' },
]
export function App() {
  const location = useLocation()
  return (
    <main className="overflow-hidden">
      <Header />
      <Routes location={location} key={ location.pathname}>
        <Route path='/' element={<HomePage key={1} />}/>
        <Route path='/deploy' element={<DeployPage key={2} />}/>
      </Routes>
    </main>
  );
}

export default App;
