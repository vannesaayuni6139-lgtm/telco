
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { ensureDemoUser } from "./auth";

  // Ensure demo/admin user exists on startup (client-side demo data)
  ensureDemoUser();

  createRoot(document.getElementById("root")!).render(<App />);
  