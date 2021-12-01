import { useLayoutEffect, useRef } from "react";
import Dots from "../pixi/dots";

export function App() {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    new Dots(ref.current!)
  }, [])
  return (
    <div ref={ref} className="banner w-full bg-gradient-to-b from-blue-900 to-blue-600">
      <div className="absolute h-full w-full flex items-center justify-around top-0 left-0 text-white">
        <div className="w-full max-w-lg">
          <h1 className="text-6xl font-semibold tracking-tighter flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 8v4h-20v-4h20zm2-2h-24v8h24v-8zm-21 5l.863-2h1.275l-.863 2h-1.275zm2.066 0l.864-2h1.275l-.863 2h-1.276zm2.067 0l.863-2h1.275l-.864 2h-1.274zm2.066 0l.863-2h1.274l-.863 2h-1.274zm3.341 0h-1.274l.863-2h1.275l-.864 2zm7.46 0c-.552 0-1-.448-1-1s.448-1 1-1c.553 0 1 .448 1 1s-.447 1-1 1zm2 7v4h-20v-4h20zm2-2h-24v8h24v-8zm-21 5l.863-2h1.275l-.863 2h-1.275zm2.066 0l.863-2h1.275l-.863 2h-1.275zm2.067 0l.863-2h1.275l-.864 2h-1.274zm2.066 0l.863-2h1.274l-.863 2h-1.274zm3.341 0h-1.274l.863-2h1.275l-.864 2zm7.46 0c-.552 0-1-.448-1-1s.448-1 1-1c.553 0 1 .448 1 1s-.447 1-1 1zm-15.597-16h-2.403l4-5h12l4 5h-2.403l-2.667-3h-9.86l-2.667 3z"/></svg>
            Devotops
          </h1>
          <p className="text-xl font-light mt-5">
          Automatisez le déploiement de vos applications avec notre plateforme Devotops
          grâce à une interface simple et rapide
          </p>
          <button className="white-button mt-5 big-button">Déployer mon projet</button>
        </div>
        <div className="w-full max-w-lg"></div>
      </div>
    </div>
  );
}

export default App;
