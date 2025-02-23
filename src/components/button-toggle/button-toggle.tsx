import React from "react";
import { Pressable, View } from "react-native";

import Body from "components/body/body";

import useStyles from "./button-toggle.styles";

export type ButtonToggleOption = {
  label: string;
  onPress: () => void;
};

type Props = {
  selectedIndex?: number;
  buttons: ButtonToggleOption[];
};

const ButtonToggle: React.FC<Props> = ({ selectedIndex = 0, buttons }) => {
  const $ = useStyles();
  const [activeIndex, setActiveIndex] = React.useState(selectedIndex);

  return (
    <View style={$.container}>
      {buttons.map((button, index) => (
        <Pressable
          key={`${button.label}`}
          accessibilityRole="button"
          style={[$.button, activeIndex === index && $.activeButton]}
          onPress={() => {
            setActiveIndex(index);
            button.onPress();
          }}
        >
          <Body textAlign="center" size="xs">
            {button.label}
          </Body>
        </Pressable>
      ))}
    </View>
  );
};

export default ButtonToggle;
