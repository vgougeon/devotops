import Banner from 'apps/user-interface/src/components/layout/banner';
import { motion } from 'framer-motion';
import { GoGlobe, GoRepo } from 'react-icons/go';
import { IoRocketSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function ManageHome() {
  return (
    <>
      <Banner>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 3, ease: 'backOut' }}
          className="relative w-full max-w-lg mx-10"
        >
          <GoGlobe size={82} />
          <h1 className="flex text-4xl font-semibold tracking-tighter">
            Dashboard
          </h1>
          <p className="mt-2 text-lg font-light">
            Bienvenue sur votre panel d'administration.
          </p>
          <Link to="/manage/add">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center mt-5 white-button big-button"
            >
              <IoRocketSharp className="mr-3" size={20} />
              <span>New project</span>
            </motion.button>
          </Link>
        </motion.div>
      </Banner>
    </>
  );
}
