import { FONT_MAPPING } from "constants/fonts";
import { FontFamily, FontStyle, FontWeight } from "models/font";

const createFontStyle = (options: {
  family: FontFamily;
  style?: FontStyle;
  weight?: FontWeight;
}) => {
  const { family } = options;
  const style = options.style ?? "normal";
  const weight = options.weight ?? "400";

  const fontStyles = FONT_MAPPING[family];

  const fontStyleWeights = fontStyles[style];

  if (!fontStyleWeights) {
    return {
      fontFamily: fontStyles.normal["400"],
    };
  }

  if (!fontStyleWeights[weight]) {
    return {
      fontFamily: fontStyleWeights["400"],
    };
  }

  return {
    fontFamily: fontStyleWeights[weight],
  };
};

export default createFontStyle;
