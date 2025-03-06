import React from "react";
import { Appearance } from "react-native";

const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(Appearance.getColorScheme());

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);
