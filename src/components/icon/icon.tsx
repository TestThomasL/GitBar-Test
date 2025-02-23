import React from "react";

import useTheme from "hooks/use-theme";
import { ThemeColor } from "models/theme";

import iconImportMap from "./icon-imports";

export type IconName = keyof typeof iconImportMap;

type Props = {
  color?: ThemeColor;
  name: IconName;
  size?: number;
};

const Icon: React.FC<Props> = ({ color = "icon", name, size = 24 }) => {
  const { colors } = useTheme();
  const IconComponent = iconImportMap[name];

  return <IconComponent color={colors[color]} width={size} height={size} />;
};

export default Icon;
