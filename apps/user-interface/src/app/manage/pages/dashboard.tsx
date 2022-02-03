import Banner from "apps/user-interface/src/components/layout/banner";
import { motion } from "framer-motion";
import { GoGlobe, GoRepo } from "react-icons/go";
import { useTitle } from "react-use";

export default function ManageDashboard() {
    useTitle('Dashboard - Devotops')
    return (
        <>
            <Banner>
                <motion.div initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }} transition={{ duration: 3, ease: 'backOut' }}
                    className="relative w-full max-w-lg mx-10">
                    <GoGlobe size={82} />
                    <h1 className="flex text-4xl font-semibold tracking-tighter">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-lg font-light">
                        Bienvenue sur votre panel d'administration.
                    </p>
                </motion.div>
            </Banner>
        </>
    )
}