import { Listbox, Transition } from "@headlessui/react";
import authService from "apps/user-interface/src/services/auth.service";
import { Fragment, useEffect, useState } from "react";
import { useObservable, useTitle } from "react-use";
import { HiCheck, HiOutlineChevronDoubleDown } from 'react-icons/hi'
import managerService from "apps/user-interface/src/services/manager.service";

const templates = ["nginx", "nodejs"]
export default function ManageAdd() {
  useTitle('New project - Devotops')
  const projects = useObservable(authService.projects)
  const [selected, setSelected] = useState(null)
  const [selectedP, setSelectedP] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  const send = () => {
    managerService.addProject(selectedP, selected)
  }
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
        <Listbox value={selectedP} onChange={setSelectedP}>
              <div className="relative mt-3">
                <Listbox.Button className="relative w-full py-3 pl-5 pr-10 text-left group
                cursor-pointer bg-neutral-900 text-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                  <span className="block truncate">{selectedP || 'Select a project'}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <HiOutlineChevronDoubleDown
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-neutral-900 text-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                    {projects?.map((project, projectId) => (
                      <Listbox.Option key={projectId} value={project.name} className={({ active }) =>
                        `${active ? 'text-blue-300 bg-gray-800' : ''}
                          cursor-default select-none relative h-12 flex flex-col justify-center pl-10 pr-4`
                      }>
                        {({ selected, active }) => (<>
                            <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>{project.name}</span>
                            {selected ? (
                              <span className={`${active ? 'text-amber-600' : 'text-amber-600'} absolute inset-y-0 left-0 flex items-center pl-3`}>
                                <HiCheck className="w-5 h-5" aria-hidden="true" />
                              </span>
                            ) : null}
                            <span className="text-gray-500 text-xs">{ project.html_url }</span>
                        </>)}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
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
          {/* <Select items={["Ansible: NGINX", "Ansible: NODE.JS"]} placeHolder="Select a script"  /> */}
          <div className="w-72 mt-3">
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-3 pl-5 pr-10 text-left group
                cursor-pointer bg-neutral-900 text-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                  <span className="block truncate">{selected || 'Select a template'}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <HiOutlineChevronDoubleDown
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-neutral-900 text-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {templates.map((template, templateId) => (
                      <Listbox.Option key={templateId} value={template} className={({ active }) =>
                        `${active ? 'text-blue-300 bg-gray-800' : ''}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                      }>
                        {({ selected, active }) => (<>
                            <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>{template}</span>
                            {selected ? (
                              <span className={`${active ? 'text-amber-600' : 'text-amber-600'} absolute inset-y-0 left-0 flex items-center pl-3`}>
                                <HiCheck className="w-5 h-5" aria-hidden="true" />
                              </span>
                            ) : null}
                        </>)}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
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
          <button onClick={() => send()} className="h-12 w-fit bg-blue-700 hover:bg-blue-500 text-white items-center flex px-5 rounded shadow border border-white border-opacity-20">Create</button>
        </div>
      </div>
    </div>
  );
}
