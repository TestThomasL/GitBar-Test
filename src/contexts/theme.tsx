import React, { PropsWithChildren } from "react";

import { THEME, THEME_DARK } from "constants/theme";
import useAppearance from "hooks/use-appearance";
import PopoverModule from "modules/popover-module/src/PopoverModule";

/** Gets the theme based on if dark mode is enabled */
const getTheme = (isDark?: boolean) => {
  const themeApp = isDark ? THEME_DARK : THEME;
  return {
    isDark,
    ...themeApp,
  };
};

export const ThemeContext = React.createContext(getTheme());

/** Creates a theme object to provide the app with colors, font sizes, etc. */
const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isDark } = useAppearance();
  const theme = React.useMemo(() => getTheme(isDark), [isDark]);

  PopoverModule.setAppearance(isDark);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
