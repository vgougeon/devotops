import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";

export function Select({ placeHolder, items }: any) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)

    const ref = useRef<HTMLDivElement>(null)

    useOnClickOutside(ref, () => {
        if (open) setOpen(false)
    })

    const openSelect = () => {
        if(!open) setOpen(true)
    }

    const select = (item: any) => {
        if(open) setOpen(false)
        setSelected(item)
    }


    return (
        <div ref={ref} onClick={openSelect}
            className="max-w-lg w-full h-12 bg-neutral-900 border border-white border-opacity-25 text-white rounded shadow flex items-center px-5 relative hover:bg-opacity-75 cursor-pointer">
            { selected 
            ? <span className="font-medium">{ selected }</span>
            : <span className="text-gray-300">{placeHolder || 'Select an item'}</span> }
            <BsFillCaretDownFill className="absolute right-5 top-0 bottom-0 my-auto text-neutral-200" />
            <AnimatePresence>
                {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden w-full flex flex-col absolute top-12 left-0 mt-1 bg-neutral-900 text-sm font-medium rounded shadow">
                    {items.map((item: any, i: number) =>
                        <div key={i} onClick={() => select(item)}
                        className={classNames(`w-full h-12 flex items-center px-4`, 
                        { 'bg-blue-600 hover:bg-opacity-90 bg-opacity-100': selected === item },
                        { 'bg-white hover:bg-opacity-10 bg-opacity-0': selected !== item },
                        )}>
                            { item }
                        </div>
                    )}
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}


function useOnClickOutside(ref: any, handler: any) {
    useEffect(
        () => {
            const listener = (event: any) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}