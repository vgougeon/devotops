import { PropsWithChildren, useLayoutEffect, useRef } from "react";
import Dots from "../../pixi/dots";

export function Banner({ children }: PropsWithChildren<{}>) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    new Dots(ref.current!)
  }, [])
  return (
    <div ref={ref} className="w-full banner bg-gradient-to-b from-blue-900 to-blue-600 min-h-600">
      <div className="absolute top-0 left-0 flex items-center justify-around w-full h-full text-white">
        { children }
        <div className="w-full max-w-lg"></div>
      </div>
    </div>
  );
}

export default Banner;
