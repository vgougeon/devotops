import Banner from "../components/layout/banner";
import { motion } from 'framer-motion';
import { RiServerLine } from 'react-icons/ri'

const TECHNOLOGIES = [
  { name: 'React', src: '/assets/technologies/react.webp' },
  { name: 'Angular', src: '/assets/technologies/angular.png' },
  { name: 'Vue', src: '/assets/technologies/vue.png' },
  { name: 'Next', src: '/assets/technologies/next.png' },
  { name: 'Node', src: '/assets/technologies/node.png' },
]
export function App() {
  return (
    <main>
      <Banner>
        <div className="w-full max-w-lg">
          <RiServerLine size={82} />
          <h1 className="flex text-6xl font-semibold tracking-tighter">
            Devotops
          </h1>
          <p className="mt-5 text-xl font-light">
            Automatisez le déploiement de vos applications avec notre plateforme Devotops
            grâce à une interface simple et rapide
          </p>
          <div className="flex space-x-4">
            <motion.button whileHover={{ scale: 1.02 }}
            className="mt-5 white-button big-button">Déployer mon projet</motion.button>
            <motion.button whileHover={{ scale: 1.02 }}
            className="mt-5 gray-button big-button">Mon espace</motion.button>
          </div>
          <div className="absolute bottom-0 flex items-center h-12 mt-auto">
            <span className="text-xs italic opacity-75">works with</span>
            <img src={'/assets/technologies/github.png'} className="object-contain h-8" />
          </div>
          
        </div>
      </Banner>
      <div className="w-full h-32 bg-cgray-900">
        <div className="flex items-center w-full h-full mx-auto space-x-20 max-w">
          {TECHNOLOGIES.map(tech =>
            <motion.img alt={ tech.name }
              whileHover={{ filter: 'grayscale(0)', scale: 1.2, transition: { duration: 0.5, ease: 'circOut' }}}
              src={tech.src} className="object-contain h-12 grayscale filter" />
          )}
        </div>
      </div>
      <div className="w-full py-8 mx-auto max-w">
        <h1 className="text-4xl font-medium tracking-tighter text-black">Une solution idéale et rapide</h1>
      </div>
    </main>
  );
}

export default App;
