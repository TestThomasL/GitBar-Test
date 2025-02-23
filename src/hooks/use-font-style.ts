import { useMemo } from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";

import useTheme from "hooks/use-theme";
import { FontFamily, FontWeight } from "models/font";
import createFontStyle from "utils/create-font-style";

const useFontStyle = (style: StyleProp<TextStyle>) => {
  const { fontFamilies, fontWeights, colors } = useTheme();

  const getStyle = (): StyleProp<TextStyle> => {
    const flattenStyle = StyleSheet.flatten(style);
    const { fontFamily, fontStyle, fontWeight, ...restStyle } = flattenStyle;

    return {
      ...restStyle,
      ...createFontStyle({
        family: fontFamily ? (fontFamily as FontFamily) : fontFamilies.primary,
        style: fontStyle ?? "normal",
        weight: fontWeight ? (fontWeight as FontWeight) : fontWeights.normal,
      }),
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => getStyle(), [style, fontFamilies, fontWeights, colors]);
};

export default useFontStyle;
