const URI_PATHS = {
  azureAccessToken: "/_usersSettings/tokens",
  githubAccessToken: "/access_token",
  githubGql: "/graphql",
  githubOauthAuthorize: `/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo,read:user`,
  githubOauth: "/login/oauth",
  gitlabGql: "/api/graphql",
  gitlabAccessToken:
    "/-/user_settings/personal_access_tokens?name=Example+token&scopes=api",
};

export default URI_PATHS;
