import { createRoot } from "react-dom/client";
import { setBaseUrl, setAuthTokenGetter } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

// On Vercel, we can use relative path if frontend and backend are same domain
const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:3001" : "");
setBaseUrl(apiUrl);
setAuthTokenGetter(() => {
  // Check for tokens in localStorage (admin first, then usher, then vendor)
  const adminToken = localStorage.getItem("adminToken");
  if (adminToken) return adminToken;
  
  const usherToken = localStorage.getItem("usherToken");
  if (usherToken) return usherToken;
  
  const vendorToken = localStorage.getItem("vendorToken");
  if (vendorToken) return vendorToken;
  
  return null;
});

createRoot(document.getElementById("root")!).render(<App />);
