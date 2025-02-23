import React, { PropsWithChildren } from "react";
import { Image, View, ViewStyle } from "react-native";

import BlobOne from "assets/illustrations/blob-1.png";
import BlobTwo from "assets/illustrations/blob-2.png";

import useStyles from "./blob-background.styles";

type Props = {
  style?: ViewStyle;
} & PropsWithChildren;

const BlobBackground: React.FC<Props> = ({ children, style }) => {
  const $ = useStyles();

  return (
    <View style={[style, $.wrapper]}>
      <Image
        source={BlobOne}
        accessibilityIgnoresInvertColors
        style={$.blobOne}
      />
      <Image
        source={BlobTwo}
        accessibilityIgnoresInvertColors
        style={$.blobTwo}
      />
      {children}
    </View>
  );
};

export default BlobBackground;
