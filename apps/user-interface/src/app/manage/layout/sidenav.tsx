import authService from "apps/user-interface/src/services/auth.service"
import classnames from "classnames"
import { GoGlobe, GoRepo } from "react-icons/go"
import { Link } from "react-router-dom"
import { useLocation, useObservable } from "react-use"

export function Sidenav() {
    const user = useObservable(authService.user)
    return (
        <aside className={`w-96 h-screen bg-neutral-900 shrink-0 px-6`}>
            <div className="h-28 w-full flex items-center justify-between">
                <img src={`/assets/logo.png`} className="w-12 h-12 p-2 rounded-lg bg-blue-600" />
                {user && <div className="flex items-center space-x-2">
                    {/* <Link to="/manage">
                        <div className="flex space-x-3 items-center h-12 bg-white bg-opacity-5 px-4 py-2 rounded border-white border-opacity-10 border cursor-pointer hover:border-opacity-20 hover:bg-opacity-10">
                            <GoRepo className="text-white" size={22} />
                        </div>
                    </Link> */}
                    <div className="flex space-x-3 h-14 items-center bg-white bg-opacity-5 px-4 py-2 rounded border-white border-opacity-0 border cursor-pointer hover:border-opacity-20 hover:bg-opacity-10">
                        <div className="flex flex-col items-end">
                            <span className="text-sm text-white font-semibold leading-none">{user.name}</span>
                            <span className="text-xs text-white leading-none">{user.login}</span>
                        </div>
                        <img src={user.avatar_url} className="w-8 h-8 object-cover rounded-full" />
                    </div>
                </div>
                }
            </div>
            <hr className="border-t border-white border-opacity-5" />
            <nav className="flex flex-col space-y-2 mt-4">
                <NavItem name="Dashboard" to="/manage" exact icon={<GoGlobe />} />
                <NavItem name="My projects" to="/manage/projects" icon={<GoRepo />}>
                    <NavItem to="/manage/projects/test1" name="Projet X" sub />
                    <NavItem to="/manage/projects/test2" name="Projet Y" sub />
                </NavItem>
            </nav>
        </aside>
    )
}

export function NavItem({ name, to, icon, exact, children, sub }: any) {
    const location = useLocation()
    const isActive = exact ? location.pathname === to : location.pathname?.includes(to)
    return (
        <div className="flex flex-col">
            <Link to={to} className={classnames('hover:bg-opacity-5 bg-white   w-full flex items-center px-3 rounded space-x-3',
                { 'bg-opacity-5': isActive && sub },
                { 'text-white': isActive },
                { 'text-neutral-500 bg-opacity-0': !isActive },
                { 'bg-opacity-0': isActive && !sub },
                { 'h-10': sub },
                { 'h-12': !sub },
            )}>
                {icon && <span className="text-xl">{icon}</span>}
                <span className="text-sm font-semibold">{name}</span>
            </Link>
            {children &&
                <div className="flex mt-1.5">
                    <div className="w-0.5 mx-5 bg-white bg-opacity-5 shrink-0"></div>
                    <div className="flex flex-col space-y-1 w-full">
                        {children}
                    </div>
                </div>
            }



        </div>
    )
}