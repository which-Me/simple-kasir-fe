import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "@/contexts/Theme/ThemeContext";
import { LayoutProvider } from "@/pages/Layout/Layout";
import App from "@/App";
import "@/styles/index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <HeroUIProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </HeroUIProvider>
  // </StrictMode>
);
