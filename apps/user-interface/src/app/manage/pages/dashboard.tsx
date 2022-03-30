import managerService from "apps/user-interface/src/services/manager.service";
import { useObservable, useTitle } from "react-use";

export default function ManageDashboard() {
    useTitle('Dashboard - Devotops')
    const project = useObservable(managerService.currentProject)
    const status = useObservable(managerService.status)
    return (
        <div className="relative max-w-[400px] shadow">
            <div className="bg-white bg-opacity-5 p-5">
                <h2 className="text-white text-lg font-semibold">
                    <span className="text-sm text-blue-300">DEVOTOPS </span>
                    / {project?.name}
                </h2>
                <span className="text-gray-400 text-sm">{project?.url}</span>
            </div>
            <div className="bg-white bg-opacity-10 w-full h-96 text-white">
                {status && Object.entries<any>(status).map(([key, value]) =>
                    <div className="w-full h-10 flex items-center justify-between px-3">
                        <span className="">{ key }</span>
                        <span className="text-sm opacity-80">{ value }</span>
                    </div>
                )}
            </div>
        </div>
    )
}