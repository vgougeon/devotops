import { AnimateSharedLayout, motion } from "framer-motion"
import { PropsWithChildren } from "react"
import { Link, useLocation } from "react-router-dom"
import { FaGithub } from 'react-icons/fa'
import { GoRepo } from 'react-icons/go'
import { useObservable } from "react-use"
import authService from "../../services/auth.service"
import { HashLoader } from "react-spinners"

const scopes = ["user, repo"]
const link =
    `https://github.com/login/oauth/authorize
?client_id=${process.env.NX_GITHUB_CLIENT_ID}
&redirect_uri=${process.env.NX_GITHUB_REDIRECT_URI}
&current_page=${window.location}
&scope=${scopes.join(' ')}`

export function Header({ children }: any) {
    const location = useLocation()
    const user = useObservable(authService.user)
    const code = useObservable(authService.code)
    return (
        <>
        <header className="fixed top-0 z-20 w-full h-20 border-b border-white backdrop-filter backdrop-blur border-opacity-10">
            <div className="flex items-center justify-between h-full mx-auto space-x-20 max-w w-full">
                <div className="flex items-center h-full space-x-20">
                    <img src="assets/logo.png" className="object-contain h-8" />
                    <nav className="flex items-center space-x-16">
                        <AnimateSharedLayout>
                            <Link to="/">
                                <A active={location.pathname === '/'}>Home</A>
                            </Link>
                            <Link to="/deploy">
                                <A active={location.pathname === '/deploy'}>Deploy</A>
                            </Link>
                        </AnimateSharedLayout>
                    </nav>
                </div>
                <div>
                    {user && <div className="flex items-center space-x-2">
                        <Link to="/manage">
                            <div className="flex space-x-3 items-center h-12 bg-white bg-opacity-5 px-4 py-2 rounded border-white border-opacity-10 border cursor-pointer hover:border-opacity-20 hover:bg-opacity-10">
                                <GoRepo className="text-white" size={22} />
                            </div>
                        </Link>
                        <div className="flex space-x-3 h-12 items-center bg-white bg-opacity-5 px-4 py-2 rounded border-white border-opacity-10 border cursor-pointer hover:border-opacity-20 hover:bg-opacity-10">
                            <div className="flex flex-col items-end">
                                <span className="text-sm text-white font-semibold leading-none">{user.name}</span>
                                <span className="text-xs text-white leading-none">{user.login}</span>
                            </div>
                            <img src={user.avatar_url} className="w-8 h-8 object-cover rounded-full" />
                        </div>
                    </div>
                    }
                    {!user && !code &&
                        <a href={link}>
                            <motion.button whileTap={{ scale: 0.95 }}
                                className="bg-black bg-opacity-20 hover:bg-opacity-10 shadow text-white border-white border-opacity-20 hover:border-opacity-40 text-xs px-3 py-2 border rounded flex items-center space-x-3">
                                <FaGithub size={20} />
                                <span>Login with github</span>
                            </motion.button>
                        </a>}
                    {code && !user && <div className="flex space-x-3 items-center bg-white bg-opacity-5 px-4 py-2 rounded border-white border-opacity-10 border cursor-pointer hover:border-opacity-20 hover:bg-opacity-10">
                        <HashLoader size={18} color="white" />
                    </div>}
                </div>
            </div>
        </header>
        { children }
        </>
    )
}

function A({ children, active }: PropsWithChildren<{ active?: boolean }>) {
    return (
        <span className="relative text-sm font-medium text-white hover:text-blue-200">
            {children}
            {active &&
                <motion.div layoutId="A_underline"
                    className="absolute -bottom-1 left-0 right-0 w-full h-0.5 bg-white bg-opacity-50 rounded"></motion.div>
            }
        </span>
    )
}