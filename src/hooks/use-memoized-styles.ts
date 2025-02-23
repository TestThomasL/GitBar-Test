import React, { DependencyList } from "react";
import { StyleSheet } from "react-native";

import useTheme from "hooks/use-theme";

// In order to prevent allocating memory for new stylesheet object creation
const useMemoizedStyles = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  callback: (theme: ReturnType<typeof useTheme>) => T,
  dependencies?: DependencyList,
): T => {
  const theme = useTheme();
  const dependencyList = dependencies ? [...dependencies, theme] : [theme];
  return React.useMemo(
    () => StyleSheet.create(callback(theme)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencyList,
  );
};

export default useMemoizedStyles;
