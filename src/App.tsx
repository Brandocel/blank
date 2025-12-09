import AppRoutes from "./routes";
import Splash from "./common/splash/Splash";
import { useState } from "react";

const ENABLE_SPLASH = true;

function App() {
  const [showSplash, setShowSplash] = useState(ENABLE_SPLASH);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-cabinet relative">
      {/* 👇 Tu app SIEMPRE está renderizada */}
      <AppRoutes />

      {/* 👇 El Splash solo es una capa ENCIMA mientras showSplash sea true */}
      {ENABLE_SPLASH && showSplash && (
        <Splash
          onDone={() => setShowSplash(false)}
        />
      )}
    </div>
  );
}

export default App;
