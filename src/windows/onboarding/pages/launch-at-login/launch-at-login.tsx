import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, View } from "react-native";

import LaunchAtLoginImage from "assets/illustrations/onboarding/launch-at-login.jpg";
import Body from "components/body/body";
import useTranslation from "hooks/use-translation";
import OnboardingLayout from "layouts/onboarding-layout/onboarding-layout";
import { OnboardingStackParamList } from "models/onboarding-stack-param-list";
import LaunchAtLoginModule from "modules/app-module/src/LaunchAtLogin";

import useStyles from "./launch-at-login.styles";

const LaunchAtLogin: React.FC = () => {
  const $ = useStyles();
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<NavigationProp<OnboardingStackParamList>>();

  const onContinue = async (accepted: boolean) => {
    await LaunchAtLoginModule.setStatus(accepted);
    navigate("Notifications");
  };

  return (
    <OnboardingLayout
      title={t("Onboarding/LaunchAtLogin/Heading")}
      titleSpacing={6}
      buttons={[
        {
          type: "secondary",
          label: t("General/Button/Skip"),
          onPress: () => onContinue(false),
        },
        {
          type: "neutral",
          label: t("General/Button/Yes"),
          onPress: () => onContinue(true),
        },
      ]}
    >
      <View style={$.wrapper}>
        <Image
          style={$.image}
          source={LaunchAtLoginImage}
          accessibilityIgnoresInvertColors
        />
        <View style={$.content}>
          <Body size="s">{t("Onboarding/LaunchAtLogin/Body")}</Body>
        </View>
      </View>
    </OnboardingLayout>
  );
};

export default LaunchAtLogin;
