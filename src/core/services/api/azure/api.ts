import apiWrapper from "services/api/api-wrapper";

import {
  AzureApi as AzureApiType,
  azureApiEndpoints,
} from "./models/api-model";

const azureApi: AzureApiType = {
  get(path, config) {
    const endpoint = azureApiEndpoints[path];
    return apiWrapper(endpoint, "GET", `${path}`, {
      headers: {
        "Content-type": "application/json",

        ...config?.headers,
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      redirect: "error",
      ...config,
    });
  },
};

export default azureApi;
