import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, View } from "react-native";

import IntroImage from "assets/illustrations/onboarding/intro.jpg";
import Body from "components/body/body";
import Spacer from "components/spacer/spacer";
import useTranslation from "hooks/use-translation";
import OnboardingLayout from "layouts/onboarding-layout/onboarding-layout";
import { OnboardingStackParamList } from "models/onboarding-stack-param-list";

import useStyles from "./intro.styles";

const Intro: React.FC = () => {
  const $ = useStyles();
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<NavigationProp<OnboardingStackParamList>>();

  return (
    <OnboardingLayout
      title={t("Onboarding/Intro/Heading")}
      titleSpacing={2}
      buttons={[
        {
          type: "neutral",
          label: t("Onboarding/Intro/GetStarted"),
          onPress: () => navigate("HowItWorks"),
        },
      ]}
    >
      <View>
        <Body textAlign="center">{t("Onboarding/Intro/SubHeading")}</Body>
        <Spacer mt={10} />
        <Image
          style={$.image}
          source={IntroImage}
          accessibilityIgnoresInvertColors
        />
      </View>
    </OnboardingLayout>
  );
};

export default Intro;
