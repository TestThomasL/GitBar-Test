export type AzureAuth = {
  token: string;
  organization: string;
};

export type GitHubAuth = {
  accessToken: string;
  userName: string;
};

export type GitLabAuth = {
  privateToken: string;
  domain: string;
  userName: string;
};
