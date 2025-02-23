import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Linking, View } from "react-native";
import { Alert } from "react-native-macos";

import GitLabLogo from "assets/illustrations/gitlab.svg";
import Body from "components/body/body";
import Button from "components/button/button";
import Spacer from "components/spacer/spacer";
import TextInput from "components/text-input/text-input";
import DOMAINS from "constants/domains";
import URI_PATHS from "constants/uri-paths";
import { GetCurrentUserQuery } from "gql/gitlab/codegen/graphql";
import QueryGetGitLabCurrentUser from "gql/gitlab/queries/current-user";
import useDispatch from "hooks/use-dispatch";
import useTranslation from "hooks/use-translation";
import RegisteredLayout from "layouts/registered-layout/registered-layout";
import { AccountType } from "models/account";
import { upsertOneAccount } from "store/slices/accounts";
import formatDomain from "utils/format-domain";
import { createGitLabGqlClient } from "utils/graphql-client";
import validateDomain from "utils/validate-domain";

import useStyles from "./register.styles";

const RegisterGitLab: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const $ = useStyles();
  const { goBack } = useNavigation();
  const [domain, setDomain] = React.useState("");
  const [token, setToken] = React.useState("");
  const [error, setError] = React.useState<"domain" | "token">();
  const [data, setData] = React.useState<GetCurrentUserQuery>();

  const getGitLabUser = useCallback(async () => {
    let gitlabDomain = DOMAINS.gitlabDefault;

    if (domain && domain.length > 0) {
      if (!validateDomain(domain)) {
        setError("domain");
        return;
      }
      gitlabDomain = formatDomain(domain);
    }
    setDomain(gitlabDomain);

    const client = createGitLabGqlClient(gitlabDomain, token);

    try {
      const result = await client.query<GetCurrentUserQuery>({
        query: QueryGetGitLabCurrentUser,
      });
      setData(result.data);
    } catch (e: any) {
      if (e.response.status === 401) {
        setError("token");
      } else {
        setError("domain");
      }
    }
  }, [domain, token]);

  useEffect(() => {
    if (!data) return;
    if (data.currentUser === null) {
      setError("token");
      return;
    }

    dispatch(
      upsertOneAccount({
        id: data.currentUser?.id ?? "",
        type: AccountType.GitLab,
        auth: {
          domain,
          privateToken: token,
          userName: data.currentUser?.username ?? "",
        },
      }),
    );
  }, [data, dispatch, domain, token]);

  const onPersonalAccessTokenPress = async () => {
    if (!domain) {
      Alert.alert(
        t("RegisterGitLab/Alert/Domain"),
        t("RegisterGitLab/Alert/DomainDescription"),
        [
          {
            text: t("General/Button/Back"),
          },
          {
            text: t("RegisterGitLab/Alert/DomainOpen", {
              domain: DOMAINS.gitlabDefault,
            }),
            onPress: () =>
              void Linking.openURL(
                DOMAINS.gitlabDefault + URI_PATHS.gitlabAccessToken,
              ),
          },
        ],
      );
      return;
    }
    await Linking.openURL(`${domain}${URI_PATHS.gitlabAccessToken}`);
  };

  return (
    <>
      {!data?.currentUser && (
        <View style={$.container}>
          <GitLabLogo width={60} height={60} />
          <Spacer mt={4} />
          <TextInput
            style={$.input}
            accessibilityHint={t("RegisterGitLab/Label/Host")}
            accessibilityLabel={t("RegisterGitLab/Label/Host")}
            label={t("RegisterGitLab/Label/Host")}
            placeholder={DOMAINS.gitlabDefault}
            onChangeText={setDomain}
            value={domain}
            state={error === "domain" ? "error" : "neutral"}
            message={
              error === "domain"
                ? t("RegisterGitLab/Message/Domain")
                : undefined
            }
          />
          <Spacer mt={1} />
          <View>
            <TextInput
              style={$.input}
              accessibilityHint={t("RegisterGitLab/Label/Token")}
              accessibilityLabel={t("RegisterGitLab/Label/Token")}
              label={t("RegisterGitLab/Label/Token")}
              placeholder={t("RegisterGitLab/Placeholder/Token")}
              onChangeText={setToken}
              state={error === "token" ? "error" : "neutral"}
              message={
                error === "token"
                  ? t("RegisterGitLab/Message/Token")
                  : undefined
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
                      onPress={onPersonalAccessTokenPress}
                    >
                      {t("Register/Helper/Token")}
                    </Body>
                  ),
                  scopes: (
                    <Body size="x2s" bold>
                      {t("RegisterGitLab/Helper/Scopes")}
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
              onPress={getGitLabUser}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      )}
      {data?.currentUser && (
        <RegisteredLayout
          avatarUrl={
            data.currentUser.avatarUrl?.includes("https")
              ? data.currentUser.avatarUrl
              : `${domain}${data.currentUser.avatarUrl}`
          }
          name={data.currentUser.name}
          type={AccountType.GitLab}
          onRetryPress={getGitLabUser}
        />
      )}
    </>
  );
};

export default RegisterGitLab;
