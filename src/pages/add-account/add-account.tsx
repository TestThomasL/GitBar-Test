import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";

import Button from "components/button/button";
import Heading from "components/heading/heading";
import Spacer from "components/spacer/spacer";
import { ToastApiContext } from "contexts/toasts";
import useGitHubAuth from "hooks/use-github-auth";
import useTranslation from "hooks/use-translation";
import DefaultLayout from "layouts/default-layout/default-layout";
import { RootStackParamList } from "models/root-stack-param-list";

import useStyles from "./add-account.styles";

const AddAccount: React.FC = () => {
  const { t } = useTranslation();
  const { addToast } = useContext(ToastApiContext);
  const { openAuthSession, error: gitHubError } = useGitHubAuth();
  const { params } = useRoute<RouteProp<RootStackParamList, "AddAccount">>();
  const $ = useStyles();
  const { navigate } = useNavigation();

  useEffect(() => {
    if (gitHubError) {
      addToast({
        message: gitHubError,
        type: "error",
      });
    }
  });

  return (
    <DefaultLayout sideBarHidden>
      <View style={$.container}>
        <Heading size="m">{t("Onboarding/Heading/AddAccount")}</Heading>
        <Spacer mt={2} />
        <View style={$.buttonGroup}>
          <Button
            boldText={false}
            size="xs"
            type="secondary"
            label={t("Onboarding/Button/GitHub")}
            onPress={openAuthSession}
          />
          <Button
            boldText={false}
            size="xs"
            type="secondary"
            label={t("Onboarding/Button/GitLab")}
            onPress={() => {
              navigate("RegisterGitLab");
            }}
          />
          <Button
            boldText={false}
            size="xs"
            type="secondary"
            label={t("Onboarding/Button/Azure")}
            onPress={() => {
              navigate("RegisterAzure");
            }}
          />
          {params?.showBackButton && (
            <Button
              boldText={false}
              size="xs"
              type="neutral"
              label={t("General/Button/Back")}
              onPress={() => navigate("Settings")}
            />
          )}
        </View>
      </View>
    </DefaultLayout>
  );
};

export default AddAccount;
