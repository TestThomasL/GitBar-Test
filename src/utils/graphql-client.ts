import { ApolloClient, InMemoryCache } from "@apollo/client";

import DOMAINS from "constants/domains";
import URI_PATHS from "constants/uri-paths";

export const createGitLabGqlClient = (domain: string, token: string) =>
  new ApolloClient({
    uri: domain + URI_PATHS.gitlabGql,
    cache: new InMemoryCache(),
    defaultContext: {
      headers: {
        "Private-Token": token,
      },
    },
  });

export const createGitHubGqlClient = (token: string) =>
  new ApolloClient({
    uri: DOMAINS.githubApi + URI_PATHS.githubGql,
    cache: new InMemoryCache(),
    defaultContext: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
