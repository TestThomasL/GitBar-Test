import apiWrapper from "services/api/api-wrapper";

import { githubGetApiEndpoints, githubPostApiEndpoints } from "./api-endpoints";
import { GitHubApi } from "./models/api-model";

const githubApi: GitHubApi = {
  get(path, config) {
    const endpoint = githubGetApiEndpoints[path];
    return apiWrapper(endpoint, "GET", `${path}`, {
      headers: {
        "Content-type": "application/json",

        ...config?.headers,
      },
      ...config,
    });
  },
  post(path, data, config) {
    const endpoint = githubPostApiEndpoints[path];
    return apiWrapper(endpoint, "POST", `${path}`, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
};

export default githubApi;
