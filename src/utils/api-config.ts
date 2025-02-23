import { Config } from "services/api/api-wrapper";

export const azureConfig = (
  params: Config["params"],
  token: string,
): Config => ({
  params,
  headers: {
    Authorization: `Basic ${token}`,
  },
});

export const githubConfig = (
  token: string,
  params?: Config["params"],
): Config => ({
  params,
  headers: {
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
