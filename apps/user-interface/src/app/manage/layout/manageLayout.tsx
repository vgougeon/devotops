import authService from 'apps/user-interface/src/services/auth.service';
import managerService from 'apps/user-interface/src/services/manager.service';
import classnames from 'classnames';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { GoGlobe, GoHome, GoPerson, GoRepo, GoScreenFull } from 'react-icons/go';
import { RiTerminalBoxFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useLocation, useObservable } from 'react-use';

export function ManageLayout({ children }: any) {
  const user = useObservable(authService.user);
  const project = useObservable(managerService.currentProject);
  return (
    <main className="h-screen w-screen overflow-hidden bg-neutral-800 flex">
      <aside
        className={`w-96 h-screen bg-neutral-900 shrink-0 px-6 border-r border-white border-opacity-10 shadow`}
      >
        <div className="h-28 w-full flex items-center justify-between">
          <Link to="/">
            <motion.img whileHover={{ scale: 1.2 }} transition={{ duration: 0.5, type: 'spring', bounce: 0.6}}  whileTap={{ scale: 1 }}
              src={`/assets/logo.png`}
              className="w-12 h-12 p-2 rounded-lg bg-blue-600 hover:bg-blue-500"
            />
          </Link>
          {user && (
            <div className="flex items-center space-x-2">
              <div className="flex space-x-3 h-14 items-center bg-white bg-opacity-5 px-4 py-2 rounded border-white border-opacity-0 border cursor-pointer hover:border-opacity-20 hover:bg-opacity-10">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-white font-semibold leading-none">
                    {user.name}
                  </span>
                  <span className="text-xs text-white leading-none">
                    {user.login}
                  </span>
                </div>
                <img
                  src={user.avatar_url}
                  className="w-8 h-8 object-cover rounded-full"
                />
              </div>
            </div>
          )}
        </div>
        <hr className="border-t border-white border-opacity-5" />
        <nav className="flex flex-col space-y-2 mt-4">
          <AnimateSharedLayout>
            <NavItem name="Home" to="/manage" exact icon={<GoHome />} />
            <NavItem
              name="New project"
              to="/manage/add"
              exact
              icon={<GoRepo />}
            />
            {project && (
              <>
                <NavItem
                  name="Dashboard"
                  to="/manage"
                  exact
                  icon={<GoGlobe />}
                />
                <NavItem
                  name="Live console"
                  to="/manage/console"
                  icon={<RiTerminalBoxFill />}
                >
                  <NavItem
                    to="/manage/console/runtime"
                    exact
                    name="Runtime"
                    sub
                  />
                  <NavItem
                    to="/manage/console/deployment"
                    exact
                    name="Dernier déploiement"
                    sub
                  />
                </NavItem>
                <NavItem
                  name="Other"
                  to="/manage/other"
                  exact
                  icon={<GoScreenFull />}
                />
                <NavItem
                  name="Mon profil"
                  to="/manage/profile"
                  exact
                  icon={<GoPerson />}
                />
              </>
            )}
          </AnimateSharedLayout>
        </nav>
      </aside>
      <div className="h-screen grow overflow-y-auto">{children}</div>
    </main>
  );
}

export function NavItem({ name, to, icon, exact, children, sub }: any) {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname?.includes(to) || false;
  return (
    <div className="flex flex-col relative">
      {isActive && !sub && (
        <motion.div
          layoutId="sidenav_selected"
          className="absolute -left-6 bg-white w-1 h-12"
        ></motion.div>
      )}
      <Link
        to={to}
        className={classnames(
          'hover:bg-opacity-5 hover:shadow bg-white w-full flex items-center px-3 rounded space-x-3 relative',
          { 'bg-opacity-5 shadow': isActive && sub },
          { 'text-white': isActive },
          { 'text-neutral-500 bg-opacity-0': !isActive },
          { 'bg-opacity-0': isActive && !sub },
          { 'h-10': sub },
          { 'h-12': !sub }
        )}
      >
        {icon && <span className="text-xl">{icon}</span>}
        <span className="text-sm font-semibold">{name}</span>
        {children && (
          <BsFillCaretDownFill className="absolute right-5 top-0 bottom-0 my-auto text-neutral-500" />
        )}
      </Link>
      <AnimatePresence>
        {children && isActive && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            key={1}
            className="flex overflow-hidden"
          >
            <div className="w-0.5 mx-5 bg-white bg-opacity-5 shrink-0"></div>
            <div className="flex flex-col space-y-1 w-full">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
