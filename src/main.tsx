import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { UserMgtContextProvider } from "./contexts/UserMgtContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserMgtContextProvider>
      <App />
    </UserMgtContextProvider>
  </StrictMode>
);
