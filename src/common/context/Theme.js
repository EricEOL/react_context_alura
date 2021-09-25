import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();
ThemeContext.displayName = "Theme";

export const ThemeContextProvider = ({ children }) => {

  const [isDarkTheme, setIsDarkTheme] = useState(true);

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