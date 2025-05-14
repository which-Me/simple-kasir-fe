import { SidebarWrapper } from "@/pages/components/sidebar/sidebar";
import { NavbarWrapper } from "@/pages/components/navbar/navbar";

import { useState, createContext, useContext } from "react";
import { useAuth } from "@/contexts/Auth/AuthContext";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isVerify } = useAuth();
  if (isVerify) {
    return;
  }

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <LayoutContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggle,
      }}
    >
      <section className="flex">
        <SidebarWrapper />
        <NavbarWrapper>{children}</NavbarWrapper>
      </section>
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  return useContext(LayoutContext);
};
