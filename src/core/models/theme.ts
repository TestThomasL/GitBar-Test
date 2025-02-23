import {
  LINE_HEIGHTS,
  THEME,
  THEME_BORDER_RADIUSES,
  THEME_COLORS_DARK,
  THEME_COLORS_LIGHT,
  THEME_FONT_FAMILIES,
  THEME_FONT_SIZES,
  THEME_FONT_WEIGHTS,
} from "constants/theme";

type ThemeColors = typeof THEME_COLORS_DARK | typeof THEME_COLORS_LIGHT;

export type ThemeColor = keyof ThemeColors;

export type ThemeFontSizes = typeof THEME_FONT_SIZES;

export type ThemeLineHeights = typeof LINE_HEIGHTS;

export type ThemeFontWeights = typeof THEME_FONT_WEIGHTS;

export type ThemeBorderRadiuses = typeof THEME_BORDER_RADIUSES;

export type ThemeFontFamilies = typeof THEME_FONT_FAMILIES;

export type Theme = typeof THEME;
