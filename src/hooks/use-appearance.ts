import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import Appearance from "models/appearance";
import { selectAppearance } from "store/selectors/settings";

import useSelector from "./use-selector";

const useAppearance = () => {
  const [isDark, setIsDark] = useState(false);
  const appearance = useSelector(selectAppearance);
  const colorScheme = useColorScheme();

  useEffect(() => {
    setIsDark(
      (colorScheme === "dark" && appearance === Appearance.Auto) ||
        appearance === Appearance.Dark,
    );
  }, [colorScheme, appearance]);

  return { isDark, appearance };
};

export default useAppearance;
