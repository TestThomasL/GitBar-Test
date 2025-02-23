import React, { PropsWithChildren } from "react";
import { View } from "react-native";

import Button, { ButtonType } from "components/button/button";
import Heading from "components/heading/heading";
import Spacer from "components/spacer/spacer";
import { ThemeSpacingScale } from "constants/theme";

import useStyles from "./onboarding-layout.styles";

type Buttons = {
  type: ButtonType;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}[];

type Props = {
  buttons?: Buttons;
  title: string;
  titleSpacing?: ThemeSpacingScale;
} & PropsWithChildren;

const OnboardingLayout: React.FC<Props> = ({
  buttons,
  children,
  title,
  titleSpacing,
}) => {
  const $ = useStyles();

  return (
    <View style={$.container}>
      <View>
        <Heading textAlign="center" size="l">
          {title}
        </Heading>
        {titleSpacing && <Spacer mt={titleSpacing} />}
        {children}
      </View>

      {buttons && buttons.length > 0 && (
        <View style={$.buttonGroup}>
          {buttons.map((button) => (
            <Spacer key={button.label} mt={2}>
              <Button
                style={[buttons.length > 1 && $.button]}
                size="xs"
                type={button.type}
                label={button.label}
                onPress={button.onPress}
                disabled={button.disabled}
              />
            </Spacer>
          ))}
        </View>
      )}
    </View>
  );
};

export default OnboardingLayout;
