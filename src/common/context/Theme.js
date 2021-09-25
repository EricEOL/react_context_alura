import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
ThemeContext.displayName = "Theme";

export const ThemeContextProvider = ({ children }) => {

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const theme = localStorage.getItem('theme');

    if(theme === 'dark') {
      return 'dark';
    } else {
      return 'light';
    }
  });

/*   useEffect(() => {

    const theme = localStorage.getItem('theme');

    if(!theme) {
      localStorage.setItem('theme', 'light');
    }

    if(theme === 'dark') {
      setIsDarkTheme('dark');
    } else {
      setIsDarkTheme('light');
    }
  }, [setIsDarkTheme]) */

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