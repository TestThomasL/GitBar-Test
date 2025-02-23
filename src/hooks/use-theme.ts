import React from "react";

import { ThemeContext } from "contexts/theme";

/** Expose Theme context using a hook */
const useTheme = () => {
  const theme = React.useContext(ThemeContext);

  return theme;
};

export default useTheme;
