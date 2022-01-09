import Banner from "../../components/layout/banner";
import { motion } from 'framer-motion';
import { RiServerLine } from 'react-icons/ri'
import { IoRocketSharp } from 'react-icons/io5'
import { BsGithub } from 'react-icons/bs'
import { Link } from "react-router-dom";
import { PageTransition } from "../layout/page";

const TECHNOLOGIES = [
    { name: 'React', src: '/assets/technologies/react.webp' },
    { name: 'Angular', src: '/assets/technologies/angular.png' },
    { name: 'Vue', src: '/assets/technologies/vue.png' },
    { name: 'Next', src: '/assets/technologies/next.png' },
    { name: 'Node', src: '/assets/technologies/node.png' },
]
export function HomePage() {
    return (
        <PageTransition>
            <Banner>
                <motion.div initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }} transition={{ duration: 3, ease: 'backOut' }}
                    className="relative w-full max-w-lg">
                    <RiServerLine size={82} />
                    <h1 className="flex text-6xl font-semibold tracking-tighter">
                        Devotops
                    </h1>
                    <p className="mt-5 text-xl font-light">
                        Automatisez le déploiement de vos applications avec notre plateforme Devotops
                        grâce à une interface simple et rapide
                    </p>
                    <div className="flex space-x-4">
                        <Link to="/">
                            <motion.button whileHover={{ scale: 1.02 }}
                                className="flex items-center mt-5 white-button big-button">
                                <IoRocketSharp className="mr-3" size={20} />
                                <span>Déployer mon projet</span>
                            </motion.button>
                        </Link>
                        <Link to="/deploy">
                            <motion.button whileHover={{ scale: 1.02 }}
                                className="flex items-center mt-5 gray-button big-button">
                                <BsGithub className="mr-3" size={20} />
                                <span>Mon espace</span>
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
                <div className="absolute bottom-0 flex items-center h-12 mt-auto">
                    <span className="text-xs italic opacity-75">works with</span>
                    <img src={'/assets/technologies/github.png'} className="object-contain h-8" />
                </div>
            </Banner>
            <div className="w-full h-32 shadow-lg bg-neutral-900">
                <div className="flex items-center w-full h-full mx-auto space-x-20 max-w">
                    {TECHNOLOGIES.map((tech, i) =>
                        <motion.img key={i} alt={tech.name}
                            whileHover={{ filter: 'grayscale(0)', scale: 1.2, transition: { duration: 0.5, ease: 'circOut' } }}
                            src={tech.src} className="object-contain h-12 grayscale filter" />
                    )}
                </div>
            </div>
            <div className="w-full py-16 mx-auto max-w">
                <h2 className="text-4xl font-medium tracking-tighter text-black">Une solution idéale et rapide</h2>
                <h3 className="text-2xl font-light text-black">Développez sereinement</h3>
                <p className="max-w-lg mt-5 text-xl font-light">
                    Automatisez le déploiement de vos applications avec notre plateforme Devotops
                    grâce à une interface simple et rapide
                </p>
            </div>
        </PageTransition>
    );
}

export default HomePage;
