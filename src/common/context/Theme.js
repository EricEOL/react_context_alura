import { createContext, useContext, useEffect, useState } from "react";
import { darkTheme } from "themes";

export const ThemeContext = createContext();
ThemeContext.displayName = "Theme";

export const ThemeContextProvider = ({ children }) => {

  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    console.log(theme);
  }, [darkTheme, setIsDarkTheme])

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {

  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  return {
    isDarkTheme,
    setIsDarkTheme
  }
}