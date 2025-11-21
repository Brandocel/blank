import AppRoutes from "./routes";
import Splash from "./common/splash/Splash";
import { useState } from "react";



function App() {
  const [showSplash, setShowSplash] = useState(true)
  if (showSplash) {
    return <Splash delayMs={500} onDone={() => setShowSplash(false)} />
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-cabinet">
      {showSplash && (
        <Splash delayMs={0} onDone={() => setShowSplash(false)} />
      )}
      <AppRoutes />
    </div>
  );
}

export default App;
