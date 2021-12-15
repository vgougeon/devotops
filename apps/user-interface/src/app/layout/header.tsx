import { AnimateSharedLayout, motion } from "framer-motion"
import { PropsWithChildren } from "react"
import { Link, useLocation } from "react-router-dom"

export function Header() {
    const location = useLocation()
    return (
        <header className="fixed top-0 z-20 w-full h-20 border-b border-white backdrop-filter backdrop-blur border-opacity-10">
            <div className="flex items-center h-full mx-auto space-x-20 max-w">
                <img src="assets/logo.png" className="object-contain h-8" />
                <nav className="flex items-center space-x-16">
                    <AnimateSharedLayout>
                        <Link to="/">
                            <A active={location.pathname === '/'}>Home</A>
                        </Link>
                        <Link to="/deploy">
                            <A active={location.pathname === '/deploy'}>Déployer</A>
                        </Link>
                        <Link to="/deploy">
                            <A active={location.pathname === '/deploy'}>Documentation</A>
                        </Link>
                    </AnimateSharedLayout>
                </nav>
            </div>

        </header>
    )
}

function A({ children, active }: PropsWithChildren<{ active?: boolean }>) {
    return (
        <a className="relative text-sm font-medium text-white hover:text-blue-200">
            {children}
            {active &&
                <motion.div layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 w-full h-0.5 bg-white bg-opacity-50 rounded"></motion.div>
            }
        </a>
    )
}