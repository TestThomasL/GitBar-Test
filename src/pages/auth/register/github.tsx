import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import { GetViewerQuery } from "gql/github/codegen/graphql";
import QueryGetGitHubViewer from "gql/github/queries/viewer";
import useDispatch from "hooks/use-dispatch";
import useGitHubAuth from "hooks/use-github-auth";
import RegisteredLayout from "layouts/registered-layout/registered-layout";
import { AccountType } from "models/account";
import { RootStackParamList } from "models/root-stack-param-list";
import githubApi from "services/api/github/api";
import { upsertOneAccount } from "store/slices/accounts";
import { createGitHubGqlClient } from "utils/graphql-client";

const RegisterGithub: React.FC = () => {
  const dispatch = useDispatch();
  const { error: gitHubError, openAuthSession } = useGitHubAuth();
  const [data, setData] = useState<GetViewerQuery>();
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string>();

  const {
    params: { code },
  } = useRoute<RouteProp<RootStackParamList, "RegisterGitHub">>();

  useEffect(() => {
    if (gitHubError) {
      setError(gitHubError);
    }
  }, [gitHubError]);

  useEffect(() => {
    const fetchToken = async () => {
      setToken("");
      const response = await githubApi
        .post(
          "/login/oauth/access_token",
          {
            client_id: process.env.GITHUB_CLIENT_ID ?? "",
            code,
            client_secret: process.env.GITHUB_CLIENT_SECRET ?? "",
          },
          {
            headers: {
              Accept: "application/json",
            },
          },
        )
        .catch((err) => {
          setError("Failed to fetch token");
          console.error("GitHub OAuth Api:", err.message);
        });

      setError(undefined);
      setToken(response?.data.access_token ?? "");
    };

    if (!token) {
      void fetchToken();
    }
  }, [code, token]);

  useEffect(() => {
    const getUser = async () => {
      const client = createGitHubGqlClient(token);
      try {
        const result = await client.query<GetViewerQuery>({
          query: QueryGetGitHubViewer,
        });
        setData(result.data);
      } catch (e: any) {
        // TODO: implement error handling
        setError("Failed to fetch user");
      }
    };

    if (token) {
      void getUser();
    }
  }, [token]);

  useEffect(() => {
    if (data && token) {
      dispatch(
        upsertOneAccount({
          id: data.viewer.id,
          type: AccountType.GitHub,
          auth: {
            userName: data.viewer.login,
            accessToken: token,
          },
        }),
      );
    }
  }, [data, dispatch, token]);

  return (
    <RegisteredLayout
      avatarUrl={data?.viewer.avatarUrl}
      error={error}
      name={data?.viewer.login ?? ""}
      type={AccountType.GitHub}
      onRetryPress={openAuthSession}
    />
  );
};

export default RegisterGithub;
