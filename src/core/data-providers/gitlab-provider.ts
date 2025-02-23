import QueryGetGitLabCurrentUser from "gql/gitlab/queries/current-user";
import QueryGetGitLabPullRequests from "gql/gitlab/queries/pull-requests";
import { AccountType } from "models/account";
import { GitLabAuth } from "models/auth";
import { AccountState } from "models/profile";
import transformGitLabPullRequest from "transformers/gitlab/gitlab-pull-request";
import { createGitLabGqlClient } from "utils/graphql-client";

import BaseProvider from "./base-provider";

class GitLabProvider extends BaseProvider {
  auth: GitLabAuth;

  constructor(id: string, auth: GitLabAuth) {
    super(id, auth, auth.userName, AccountType.GitLab);
    this.auth = auth;
    this.client = createGitLabGqlClient(auth.domain, auth.privateToken);
  }

  async getProfile() {
    if (!this.profile) {
      const data = await this.query(QueryGetGitLabCurrentUser);

      const avatarUrl = data.currentUser?.avatarUrl?.includes("https")
        ? data.currentUser.avatarUrl
        : `${this.auth.domain}${data.currentUser?.avatarUrl}`;

      this.profile = {
        id: data.currentUser?.id ?? "",
        avatarUrl,
        userName: data.currentUser?.username ?? "",
        name: data.currentUser?.name ?? "",
        type: this.accountType,
        state: AccountState.Valid,
      };
    }

    return this.profile;
  }

  async getPullRequests() {
    const profile = await this.getProfile();
    const data = await this.query(QueryGetGitLabPullRequests);

    return transformGitLabPullRequest({
      profile,
      domain: this.auth.domain,
      data,
    }).filter(
      (pr, index, self) => index === self.findIndex((p) => p.id === pr.id),
    );
  }
}

export default GitLabProvider;
