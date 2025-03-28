import { useContext, createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // read theme browser user
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => setIsDark(e.matches);

    setIsDark(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    // clear listener
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // function toggle theme
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
