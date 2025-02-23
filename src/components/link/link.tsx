import React from "react";
import { Pressable } from "react-native";

import Body from "components/body/body";
import Icon from "components/icon/icon";

import useStyles from "./link.styles";

type Props = {
  onPress: () => void;
  label: string;
};

const Link: React.FC<Props> = ({ label, onPress }) => {
  const $ = useStyles();

  return (
    <Pressable accessibilityRole="button" style={$.link} onPress={onPress}>
      <Body bold size="xs" color="textLink">
        {label}
      </Body>
      <Icon name="ChevronRight" color="textLink" size={22} />
    </Pressable>
  );
};

export default Link;
