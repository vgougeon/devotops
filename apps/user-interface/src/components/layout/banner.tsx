import { PropsWithChildren, useLayoutEffect, useRef } from "react";
import Dots from "../../pixi/dots";

export function Banner({ children, dark }: PropsWithChildren<{ dark?: boolean}>) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    new Dots(ref.current!)
  }, [])
  return (
    <div ref={ref} className={`w-full overflow-hidden banner bg-gradient-to-br 
    ${dark ? 'from-cgray-900 to-cgray-700' :  'from-indigo-900 to-indigo-500'}
    min-h-600`}>
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center w-full h-full mx-auto text-white max-w">
        { children }
        <div className="relative w-full max-w-lg"></div>
      </div>
    </div>
  );
}

export default Banner;
