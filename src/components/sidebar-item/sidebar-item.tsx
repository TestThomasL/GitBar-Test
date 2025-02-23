import React from "react";
import { TouchableOpacity } from "react-native";

import Icon, { IconName } from "components/icon/icon";

import useStyles from "./sidebar-item.styles";

type Props = {
  active?: boolean;
  icon: IconName;
  onPress: () => void;
};

const SidebarItem: React.FC<Props> = ({ active = false, icon, onPress }) => {
  const $ = useStyles();

  return (
    <TouchableOpacity
      hitSlop={10}
      style={[$.button, active && $.active]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Icon name={icon} size={20} />
    </TouchableOpacity>
  );
};

export default SidebarItem;
