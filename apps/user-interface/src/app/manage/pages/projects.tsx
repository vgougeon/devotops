import Banner from "apps/user-interface/src/components/layout/banner";
import authService from "apps/user-interface/src/services/auth.service";
import managerService from "apps/user-interface/src/services/manager.service";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GoGlobe, GoRepo } from "react-icons/go";
import { HiArrowRight, HiSelector } from "react-icons/hi";
import { useNavigate, useRoutes } from "react-router-dom";
import { useLocation, useObservable, useTitle } from "react-use";

export default function ManageProjects() {
    useTitle('My projects - Devotops')
    const [projects, setProjects] = useState<any[]>([])
    useEffect(() => {
        axios.get('/api/projects', {
            headers: { 'Authorization': authService.appToken.value }
        }).then(response => setProjects(response.data))
    }, [])
    const navigate = useNavigate()
    const select = (project: any) => {
        managerService.setProject(project)
        navigate('/manage/dashboard')
    }
    return (
        <div className="p-5">
            <div className="bg-neutral-900 shadow p-5 max-w-[800px]">
                <h2 className="text-white text-lg font-semibold mb-5">My synchronized projects</h2>
                {projects.map(project =>
                    <div className="w-full text-white p-3 px-5 border-white border-opacity-5 border-2 flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="font-semibold">{project.name}</span>
                            <span className="text-sm opacity-75">{project.url}</span>
                        </div>
                        <button className="h-10 px-4 bg-gray-700 rounded hover:bg-blue-700" onClick={() => select(project)}>
                            <HiArrowRight />
                        </button>
                    </div>

                )}
            </div>
        </div>
    )
}