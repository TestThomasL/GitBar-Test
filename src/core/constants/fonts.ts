import { FontFamily, FontStyles } from "models/font";

/* All fonts mapped to their resource */
export const FONT_RESOURCES = {
  /* eslint-disable global-require */
  "Lato-Regular": require("assets/fonts/Lato-Regular.ttf"),
  "Lato-Italic": require("assets/fonts/Lato-Italic.ttf"),
  "Lato-Bold": require("assets/fonts/Lato-Bold.ttf"),
  "Lato-BoldItalic": require("assets/fonts/Lato-BoldItalic.ttf"),
  "Lato-Black": require("assets/fonts/Lato-Black.ttf"),
  "Lato-BlackItalic": require("assets/fonts/Lato-BlackItalic.ttf"),
  "Lato-Light": require("assets/fonts/Lato-Light.ttf"),
  "Lato-LightItalic": require("assets/fonts/Lato-LightItalic.ttf"),
  "Lato-Hairline": require("assets/fonts/Lato-Hairline.ttf"),
  "Lato-HairlineItalic": require("assets/fonts/Lato-HairlineItalic.ttf"),
  /* eslint-enable global-require */
} as const;

/* Font mapping for all fonts with the available styles and weights */
export const FONT_MAPPING: Record<
  FontFamily,
  FontStyles<keyof typeof FONT_RESOURCES>
> = {
  Lato: {
    normal: {
      100: "Lato-Hairline",
      300: "Lato-Light",
      400: "Lato-Regular",
      700: "Lato-Bold",
      900: "Lato-Black",
    },
    italic: {
      100: "Lato-HairlineItalic",
      300: "Lato-LightItalic",
      400: "Lato-Italic",
      700: "Lato-BoldItalic",
      900: "Lato-BlackItalic",
    },
  },
};
