import Banner from "apps/user-interface/src/components/layout/banner";
import { motion } from "framer-motion";
import { BsGithub } from "react-icons/bs";
import { GoRepo } from "react-icons/go";
import { IoRocketSharp } from "react-icons/io5";
import { RiServerLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function ManageDashboard() {
    return (
        <>
            <Banner>
                <motion.div initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }} transition={{ duration: 3, ease: 'backOut' }}
                    className="relative w-full max-w-lg mx-10">
                    <GoRepo size={82} />
                    <h1 className="flex text-6xl font-semibold tracking-tighter">
                        Mes projets
                    </h1>
                    <p className="mt-5 text-xl font-light">
                        Choisissez le projet sur lequel vous voulez travailler
                    </p>
                </motion.div>
            </Banner>
        </>
    )
}