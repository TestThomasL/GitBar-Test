import React from "react";
import { TouchableOpacity } from "react-native";

import Icon, { IconName } from "components/icon/icon";
import { ThemeColor } from "models/theme";

import useStyles from "./icon-button.styles";

type Props = {
  icon: IconName;
  onPress: () => void;
  type: "neutral" | "danger" | "secondary";
  spacing?: number;
  size?: number;
};

const IconButton: React.FC<Props> = ({
  icon,
  onPress,
  type = "neutral",
  size = 20,
  spacing = 8,
}) => {
  const $ = useStyles();

  const iconColor = (): ThemeColor => {
    switch (type) {
      case "danger":
        return "iconOnCtaDanger";
      case "secondary":
        return "iconOnCtaSecondary";
      case "neutral":
      default:
        return "iconOnCta";
    }
  };

  return (
    <TouchableOpacity
      style={[
        $.button,
        type === "danger" && $.danger,
        type === "neutral" && $.neutral,
        type === "secondary" && $.secondary,
        {
          padding: (spacing / 20) * size,
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Icon name={icon} size={size} color={iconColor()} />
    </TouchableOpacity>
  );
};

export default IconButton;
