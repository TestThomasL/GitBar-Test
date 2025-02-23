import { useNavigation } from "@react-navigation/native";
import { encode } from "js-base64";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Alert, Linking, View } from "react-native";

import AzureDevOpsLogo from "assets/illustrations/azure-devops.svg";
import Body from "components/body/body";
import Button from "components/button/button";
import Spacer from "components/spacer/spacer";
import TextInput from "components/text-input/text-input";
import DOMAINS from "constants/domains";
import URI_PATHS from "constants/uri-paths";
import useDispatch from "hooks/use-dispatch";
import useTranslation from "hooks/use-translation";
import RegisteredLayout from "layouts/registered-layout/registered-layout";
import { AccountType } from "models/account";
import azureApi from "services/api/azure/api";
import { ProfileResponse } from "services/api/azure/models/profile-response";
import { upsertOneAccount } from "store/slices/accounts";

import useStyles from "./register.styles";

const RegisterAzure: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const $ = useStyles();
  const { goBack } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState<ProfileResponse>();
  const [error, setError] = useState<"organization" | "token">();

  const getAzureUser = React.useCallback(async () => {
    setLoading(true);
    const responseData = await azureApi
      .get("/:organization/_apis/profile/profiles/me", {
        params: {
          organization,
        },
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .catch((err) => {
        setLoading(false);
        console.error(err.message);
        if (err.statusCode === 404) {
          setError("organization");
        } else {
          setError("token");
        }
      });

    setLoading(false);

    if (responseData?.status === 203) {
      setError("token");
      return;
    }

    if (responseData?.data) {
      setError(undefined);
      setData(responseData.data);
    }
  }, [organization, token]);

  useEffect(() => {
    if (data) {
      dispatch(
        upsertOneAccount({
          id: data.id,
          type: AccountType.Azure,
          auth: {
            organization,
            token,
          },
        }),
      );
    }
  }, [data, dispatch, organization, token]);

  const onTokenPress = async () => {
    if (!organization) {
      Alert.alert(
        t("RegisterAzure/Alert/Organization"),
        t("RegisterAzure/Alert/OrganizationDescription"),
      );
      return;
    }

    await Linking.openURL(
      `${DOMAINS.devAzure}/${organization}${URI_PATHS.azureAccessToken}`,
    );
  };

  return (
    <>
      {!data && (
        <View style={$.container}>
          <AzureDevOpsLogo width={60} height={60} />
          <Spacer mt={4} />
          <View>
            <TextInput
              style={$.input}
              accessibilityHint={t("RegisterAzure/Label/Organization")}
              accessibilityLabel={t("RegisterAzure/Label/Organization")}
              label={t("RegisterAzure/Label/Organization")}
              placeholder="Organization"
              onChangeText={setOrganization}
              state={error === "organization" ? "error" : "neutral"}
              message={
                error === "organization"
                  ? t("RegisterAzure/Message/Organization")
                  : undefined
              }
            />
            <Spacer mt={0.5} />
            <Body size="x2s" textAlign="left" color="textSecondary">
              <FormattedMessage
                id="register.organization"
                defaultMessage={t("RegisterAzure/Helper/OrganizationExample")}
                values={{
                  organization: (
                    <Body size="x2s" bold>
                      {organization.length > 3
                        ? organization
                        : t("RegisterAzure/Helper/Organization")}
                    </Body>
                  ),
                }}
              />
            </Body>
          </View>
          <Spacer mt={1} />
          <View>
            <TextInput
              style={$.input}
              accessibilityHint={t("RegisterAzure/Label/Token")}
              accessibilityLabel={t("RegisterAzure/Label/Token")}
              label={t("RegisterAzure/Label/Token")}
              placeholder={t("RegisterAzure/Placeholder/Token")}
              onChangeText={(text) => setToken(encode(`gition:${text}`))}
              state={error === "token" ? "error" : "neutral"}
              message={
                error === "token" ? t("RegisterAzure/Message/Token") : undefined
              }
            />
            <Spacer mt={0.5} />
            <Body size="x2s" textAlign="left" color="textSecondary">
              <FormattedMessage
                id="register.token"
                defaultMessage={t("Register/Helper/TokenDescription")}
                values={{
                  token: (
                    <Body
                      size="x2s"
                      bold
                      color="textLink"
                      onPress={onTokenPress}
                    >
                      {t("Register/Helper/Token")}
                    </Body>
                  ),
                  scopes: (
                    <Body size="x2s" bold>
                      {t("RegisterAzure/Helper/Scopes")}
                    </Body>
                  ),
                }}
              />
            </Body>
          </View>
          <Spacer mt={1} />
          <View style={$.buttonGroup}>
            <Button
              boldText={false}
              size="xs"
              type="secondary"
              label={t("General/Button/Back")}
              onPress={goBack}
              style={{ flex: 1 }}
            />
            <Button
              boldText={false}
              size="xs"
              label={t("General/Button/Continue")}
              onPress={getAzureUser}
              style={{ flex: 1 }}
              disabled={
                loading || !(organization.length > 5 && token.length > 5)
              }
            />
          </View>
        </View>
      )}
      {data && (
        <RegisteredLayout
          name={data.displayName}
          type={AccountType.Azure}
          onRetryPress={getAzureUser}
        />
      )}
    </>
  );
};

export default RegisterAzure;
