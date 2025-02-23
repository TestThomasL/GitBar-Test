import QueryGetGithubPullRequests from "gql/github/queries/pull-requests";
import QueryGetGitHubViewer from "gql/github/queries/viewer";
import { AccountType } from "models/account";
import { GitHubAuth } from "models/auth";
import { AccountState } from "models/profile";
import githubApi from "services/api/github/api";
import transformGitHubNotification from "transformers/github/github-notification";
import transformGithubPullRequest from "transformers/github/github-pull-request";
import { githubConfig } from "utils/api-config";
import { createGitHubGqlClient } from "utils/graphql-client";

import BaseProvider from "./base-provider";

class GitHubProvider extends BaseProvider {
  auth: GitHubAuth;

  constructor(id: string, auth: GitHubAuth) {
    super(id, auth, auth.userName, AccountType.GitHub);
    this.auth = auth;
    this.client = createGitHubGqlClient(this.auth.accessToken);
  }

  async getProfile() {
    if (!this.profile) {
      const data = await this.query(QueryGetGitHubViewer);

      this.profile = {
        id: data.viewer.id,
        avatarUrl: data.viewer.avatarUrl,
        userName: data.viewer.login,
        name: data.viewer.name ?? "",
        type: this.accountType,
        state: AccountState.Valid,
      };
    }

    return this.profile;
  }

  async getPullRequests() {
    const profile = await this.getProfile();
    const data = await this.query(QueryGetGithubPullRequests);

    return transformGithubPullRequest(profile, data).filter(
      (pr, index, self) => index === self.findIndex((p) => p.id === pr.id),
    );
  }

  async getNotifications() {
    const data = await githubApi.get(
      "/notifications",
      githubConfig(this.auth.accessToken, {
        all: "true",
      }),
    );

    return data.data.map(transformGitHubNotification);
  }
}

export default GitHubProvider;
