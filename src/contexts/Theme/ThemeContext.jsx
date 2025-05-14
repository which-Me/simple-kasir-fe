import {
  useContext,
  createContext,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useLayoutEffect(() => {
    // get theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      // read theme browser user
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      setIsDark(mediaQuery.matches);
      localStorage.setItem("theme", mediaQuery.matches ? "dark" : "light");

      // func handle change
      const handleChange = (e) => {
        setIsDark(e.matches);
        localStorage.setItem("theme", e.matches ? "dark" : "light");
      };

      // listener
      mediaQuery.addEventListener("change", handleChange);
      // clear listener
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, []);

  // Update the HTML class to match the current theme
  useEffect(() => {
    const html = document.querySelector("html");
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  // function toggle theme
  const toggleTheme = () => {
    setIsDark((prevTheme) => {
      // modify localstorage
      localStorage.setItem("theme", !prevTheme ? "dark" : "light");
      // return bool for state
      return !prevTheme;
    });
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
