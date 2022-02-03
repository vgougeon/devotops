import authService from "apps/user-interface/src/services/auth.service";
import classNames from "classnames";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useObservable, useTitle } from "react-use";
import { Select } from "../../layout/components/select";

export default function ManageAdd() {
  useTitle('New project - Devotops')
  const projects = useObservable(authService.projects)
  const [selectedProject, setSelectedProject] = useState(null)
  useEffect(() => {
    authService.getProjects()
  }, [])
  return (
    <div className="p-10 pb-96">
      <h2 className="text-2xl text-white font-semibold tracking-tight">
        New project
      </h2>
      <span className="text-gray-300 text-sm">
        Create a new project by selecting a repository and a pipeline template
      </span>
      <hr className="border-t border-white border-opacity-10 my-4" />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <div className="flex flex-col">
          <h3 className="text-xl tracking-tighter text-white">Repository</h3>
          <span className="text-gray-300 text-sm">
            The repository that you want to clone and deploy on Devotops
          </span>
        </div>
        <div className="flex flex-col col-span-3 bg-neutral-900 rounded space-y-2 p-2">
          <AnimateSharedLayout>
            {projects?.map((project: any) =>
              <div onClick={() => setSelectedProject(project)}
                className={classNames(
                  "w-full h-24 border-2 border-white rounded p-3 text-white shadow hover:shadow-lg hover:border-opacity-20 cursor-pointer relative",
                  { "border-opacity-5 bg-neutral-800 hover:border-opacity-20": selectedProject !== project },
                  { "border-opacity-75 bg-green-900 hover:border-opacity-100": selectedProject === project },
                )}>
                <div className="flex">
                  {selectedProject === project && <motion.div className="absolute w-0.5 h-full -left-2 top-0 rounded bg-green-400" layoutId="highlighted-project"></motion.div>}
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm">
                      <span className="bg-green-500 bg-opacity-75 px-2 py-0.5 mr-1 rounded text-white w-fit text-xs">{project?.private ? 'Private' : 'Public'}</span>
                      {" "} {project?.full_name}
                    </span>
                    <span className="opacity-75 text-sm font-light">{project?.description || 'This project has no description'}</span>
                    <a href={project?.html_url} target="_blank" className="text-blue-400 text-sm hover:underline hover:text-blue-300">
                      {project?.html_url || 'This project has no description'}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </AnimateSharedLayout>
        </div>
      </div>
      <hr className="border-t border-white border-opacity-10 my-4" />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <div className="flex flex-col">
          <h3 className="text-xl tracking-tighter text-white">Template</h3>
          <span className="text-gray-300 text-sm">
            The pipeline you want to use to build, run and deploy your project
          </span>
        </div>
        <div className="flex flex-col">
          <Select items={["Ansible: NGINX", "Ansible: NODE.JS"]} placeHolder="Select a script"  />
        </div>
      </div>
      <hr className="border-t border-white border-opacity-10 my-4" />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <div className="flex flex-col">
          <h3 className="text-xl tracking-tighter text-white">Start</h3>
          <span className="text-gray-300 text-sm">
            Create the project !
          </span>
        </div>
        <div className="flex flex-col">
          <button className="h-12 w-fit bg-blue-700 hover:bg-blue-500 text-white items-center flex px-5 rounded shadow border border-white border-opacity-20">Create</button>
        </div>
      </div>
    </div>
  );
}
