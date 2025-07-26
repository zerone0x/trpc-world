import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { AccountProvider } from "./context/account";
import App from "./App.tsx";
import { GamePage } from "./pages/game.tsx";
import { ApiTestPage } from "./pages/api-test.tsx";
import { GraphPage } from "./pages/graph";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AccountProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/api-test" element={<ApiTestPage />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </AccountProvider>
    </ClerkProvider>
  </StrictMode>
);
