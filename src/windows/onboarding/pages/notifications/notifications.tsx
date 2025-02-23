import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import { useDispatch } from "react-redux";

import NotificationConfirmImage from "assets/illustrations/onboarding/notification-confirmation.jpg";
import NotificationImage from "assets/illustrations/onboarding/notification.jpg";
import Body from "components/body/body";
import { TranslationKey } from "contexts/intl";
import useTranslation from "hooks/use-translation";
import OnboardingLayout from "layouts/onboarding-layout/onboarding-layout";
import { OnboardingStackParamList } from "models/onboarding-stack-param-list";
import NotificationsModule from "modules/notifications-module";
import { setAllowNotifications } from "store/slices/settings";

import useStyles from "./notifications.styles";

type PageContentType = Record<
  string,
  {
    image: ImageSourcePropType;
    heading: TranslationKey;
    body: TranslationKey;
  }
>;

const PageContent: PageContentType = {
  true: {
    image: NotificationConfirmImage,
    heading: "Onboarding/Notifications/ConfirmHeading",
    body: "Onboarding/Notifications/ConfirmBody",
  },
  false: {
    image: NotificationImage,
    heading: "Onboarding/Notifications/Heading",
    body: "Onboarding/Notifications/Body",
  },
};

const Notifications: React.FC = () => {
  const $ = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<NavigationProp<OnboardingStackParamList>>();
  const [awaitingPermissions, setAwaitingPermissions] = useState(false);

  const onContinue = async (accepted: boolean) => {
    if (accepted) {
      setAwaitingPermissions(true);
      await NotificationsModule.requestPermissions();
    }
    dispatch(setAllowNotifications(accepted));
    navigate("ReadyToGo");
  };

  const { image, heading, body } = PageContent[awaitingPermissions.toString()];

  return (
    <OnboardingLayout
      title={t(heading)}
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
          disabled: awaitingPermissions,
        },
      ]}
    >
      <View style={$.wrapper}>
        <Image
          style={$.image}
          source={image}
          accessibilityIgnoresInvertColors
        />
        <View style={$.content}>
          <Body size="s">{t(body)}</Body>
        </View>
      </View>
    </OnboardingLayout>
  );
};

export default Notifications;
