import DOMAINS from "constants/domains";

import { GitHubGetApiRequest, GitHubPostApiRequest } from "./models/api-model";

export const githubGetApiEndpoints: Record<keyof GitHubGetApiRequest, string> =
  {
    "/notifications": DOMAINS.githubApi,
    "/repos/:owner/:repo/issues/:issueId": DOMAINS.githubApi,
  };

export const githubPostApiEndpoints: Record<
  keyof GitHubPostApiRequest,
  string
> = {
  "/login/oauth/access_token": DOMAINS.github,
};
