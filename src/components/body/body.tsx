import React, { PropsWithChildren } from "react";
import { TextProps, TextStyle } from "react-native";

import Text from "components/text/text";
import useTheme from "hooks/use-theme";
import { ThemeColor, ThemeFontSizes } from "models/theme";

export type BodySize = "l" | "m" | "s" | "xs" | "x2s";

type ThemeBodySize = keyof Pick<
  ThemeFontSizes,
  "bodyL" | "bodyM" | "bodyS" | "bodyXS" | "bodyX2S"
>;

type StyleProps = Pick<TextStyle, "textAlign">;

const sizeMapping: Record<BodySize, ThemeBodySize> = {
  l: "bodyL",
  m: "bodyM",
  s: "bodyS",
  xs: "bodyXS",
  x2s: "bodyX2S",
};

export type Props = {
  bold?: boolean;
  capitalize?: boolean;
  color?: ThemeColor;
  size?: BodySize;
  underline?: boolean;
  zIndex?: number;
} & PropsWithChildren &
  Pick<TextProps, "testID" | "numberOfLines" | "onTextLayout" | "onPress"> &
  StyleProps;

const Body: React.FC<Props> = ({
  bold = false,
  capitalize = false,
  color: colorFromProps,
  children,
  numberOfLines,
  size = "m",
  testID,
  textAlign = "left",
  underline = false,
  zIndex,
  onPress,
  onTextLayout,
}) => {
  const { fontSizes, fontWeights, lineHeights, colors } = useTheme();

  const fontSizeKey = sizeMapping[size];
  const fontSize = fontSizes[fontSizeKey];
  const lineHeight = lineHeights[fontSizeKey];
  const fontWeight = bold ? fontWeights.bold : fontWeights.normal;
  const color = colorFromProps ? colors[colorFromProps] : colors.text;
  const textTransform = capitalize ? "capitalize" : "none";
  const textDecorationLine = underline ? "underline" : "none";

  return (
    <Text
      testID={testID}
      style={{
        color,
        fontSize,
        fontWeight,
        lineHeight,
        textAlign,
        textTransform,
        textDecorationLine,
        zIndex,
      }}
      onTextLayout={onTextLayout}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

export default Body;
