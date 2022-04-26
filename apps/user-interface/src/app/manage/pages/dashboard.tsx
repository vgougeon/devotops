import managerService from "apps/user-interface/src/services/manager.service";
import { Link } from "react-router-dom";
import { useObservable, useTitle } from "react-use";

export default function ManageDashboard() {
    useTitle('Dashboard - Devotops')
    const project = useObservable(managerService.currentProject)
    const status = useObservable(managerService.status)
    return (
        <div className="p-5 flex flex-wrap gap-5">
            <div className="relative w-[400px] shadow h-fit">
                <div className="bg-white bg-opacity-5 p-5">
                    <h2 className="text-white text-lg font-semibold">
                        <span className="text-sm text-blue-300">DEVOTOPS </span>
                        / {project?.name}
                    </h2>
                    <span className="text-gray-400 text-sm">{project?.url}</span>
                </div>
                <div className="bg-white bg-opacity-10 w-full text-white">
                    {status && Object.entries<any>(status).map(([key, value]) =>
                        <div className="w-full h-10 flex items-center justify-between px-3">
                            <span className="">{key}</span>
                            <span className="text-sm opacity-80">{value}</span>
                        </div>
                    )}
                </div>
                <div className="bg-white bg-opacity-10 h-12 w-full text-white">
                    { status && <a target={'_blank'} href={'http://54.37.228.12:' + status.portParsed } className="h-16 flex items-center justify-center bg-blue-500 rounded px-2">
                        Accéder au projet
                    </a> }
                </div>
            </div>
            <div className="relative w-[400px] shadow h-fit">
                <div className="bg-white bg-opacity-5 p-5 mb-4 flex flex-col gap-2">
                    <h2 className="text-white text-lg font-semibold">
                        <span className="text-sm text-blue-300">Template </span>
                        / {project?.name}
                    </h2>
                    <span className="text-sm px-2 py-1 bg-blue-500 text-white rounded w-fit">{project?.template}</span>
                </div>
            </div>
        </div>
    )
}