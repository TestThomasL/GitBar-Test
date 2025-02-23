import { Config } from "services/api/api-wrapper";

import {
  GitHubAccessTokenRequest,
  GitHubAccessTokenResponse,
} from "./access-token";
import { NotificationsResponse } from "./notifications-response";

export type GitHubGetApiRequest = {
  "/notifications": NotificationsResponse;
  "/repos/:owner/:repo/issues/:issueId": {
    node_id: string;
  };
};

export type GitHubPostApiRequest = {
  "/login/oauth/access_token": GitHubAccessTokenRequest;
};

type GitHubPostApiRespone = {
  "/login/oauth/access_token": GitHubAccessTokenResponse;
};

export type GitHubApi = {
  get: <T extends keyof GitHubGetApiRequest>(
    path: T,
    config?: Config,
  ) => Promise<{
    data: GitHubGetApiRequest[T];
    status: number;
  }>;
  post: <T extends keyof GitHubPostApiRequest>(
    path: T,
    data: GitHubPostApiRequest[T],
    config?: Config,
  ) => Promise<{
    data: GitHubPostApiRespone[T];
    status: number;
  }>;
};
