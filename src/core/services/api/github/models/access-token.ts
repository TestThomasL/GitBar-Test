export type GitHubAccessTokenRequest = {
  code: string;
  client_id: string;
  client_secret: string;
};

export type GitHubAccessTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
};
