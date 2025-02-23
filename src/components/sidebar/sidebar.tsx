import React, { ReactNode } from "react";
import { View } from "react-native";

import { ThemeSpacingScale } from "constants/theme";
import useTheme from "hooks/use-theme";

import useStyles from "./sidebar.styles";

type Props = {
  topContainer?: ReactNode;
  bottomContainer?: ReactNode;
  marginVertical?: ThemeSpacingScale;
};

const Sidebar: React.FC<Props> = ({
  topContainer,
  bottomContainer,
  marginVertical: marginVerticalFromProps,
}) => {
  const $ = useStyles();
  const { spacing } = useTheme();
  const marginVertical = spacing(marginVerticalFromProps ?? 0);

  return (
    <View style={[$.container, { marginVertical }]}>
      <View style={$.section}>{topContainer}</View>
      <View style={$.section}>{bottomContainer}</View>
    </View>
  );
};

export default Sidebar;
