import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { LanguageProvider } from "./common/i18n/LanguageContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // ❌ Sin StrictMode, solo para test de rendimiento del video
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
