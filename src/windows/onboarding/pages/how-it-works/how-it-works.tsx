import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";

import HowItWorksColorsImage from "assets/illustrations/onboarding/how-it-works-colors.jpg";
import HowItWorksHideImage from "assets/illustrations/onboarding/how-it-works-hide.jpg";
import HowItWorksRelevantImage from "assets/illustrations/onboarding/how-it-works-relevant.jpg";
import FeatureItem from "components/feature-item/feature-item";
import useTranslation from "hooks/use-translation";
import OnboardingLayout from "layouts/onboarding-layout/onboarding-layout";
import { OnboardingStackParamList } from "models/onboarding-stack-param-list";

import useStyles from "./how-it-works.styles";

const HowItWorks: React.FC = () => {
  const $ = useStyles();
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<NavigationProp<OnboardingStackParamList>>();

  return (
    <OnboardingLayout
      title={t("Onboarding/HowItWorks/Heading")}
      titleSpacing={6}
      buttons={[
        {
          type: "neutral",
          label: t("General/Button/Next"),
          onPress: () => navigate("LaunchAtLogin"),
        },
      ]}
    >
      <View style={$.wrapper}>
        <FeatureItem
          image={HowItWorksRelevantImage}
          heading={t("Onboarding/HowItWorks/RelevantTabHeading")}
          body={t("Onboarding/HowItWorks/RelevantTabBody")}
        />
        <FeatureItem
          image={HowItWorksHideImage}
          heading={t("Onboarding/HowItWorks/HidePRsHeading")}
          body={t("Onboarding/HowItWorks/HidePRsBody")}
        />
        <FeatureItem
          image={HowItWorksColorsImage}
          heading={t("Onboarding/HowItWorks/ColorCodedProjectsHeading")}
          body={t("Onboarding/HowItWorks/ColorCodedProjectsBody")}
        />
      </View>
    </OnboardingLayout>
  );
};

export default HowItWorks;
