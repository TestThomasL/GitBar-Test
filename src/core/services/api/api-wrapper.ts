import { ApiRequestError, buildUrl } from "./utils";

export type Config = RequestInit & {
  params?: Record<string, string>;
  signal?: AbortSignal;
};

const responseSymbol = Symbol("response");
type ApiResponse<T> = T & { [responseSymbol]: Response };

async function apiWrapper(
  endpoint: string,
  method: RequestInit["method"],
  path: string,
  config: Config,
): Promise<{
  data: any;
  status: number;
  redirected: boolean;
}> {
  // eslint-disable-next-line prefer-const
  let { params, ...init } = config;
  params = params || {};

  init.headers = new Headers(init.headers);
  init.method = method;

  if (init.body) {
    init.headers.set("Content-Type", "application/json");
  }

  const url = endpoint + buildUrl(path, params);
  const start = Date.now();

  let response: Response;

  try {
    response = await fetch(url, init);
  } catch (err: any) {
    if (err.message) {
      throw new Error(`${method} ${url} failed: ${err.message}`);
    }
    throw err;
  }

  const duration = (Date.now() - start) / 1000;

  if (duration > 1) {
    // console.info(
    //   `${method} ${url.substring(
    //     endpoint.length,
    //   )} took ${duration.toFixed(3)}s`,
    // );
  }

  if (!response.ok) {
    const err = new ApiRequestError(
      response.status,
      `${method} ${url} failed: ${response.status} ${response.statusText}`,
      null,
    ) as any as ApiResponse<Error>;
    err[responseSymbol] = response;
    throw err;
  }

  let data;
  if (response.headers.get("Content-Type")?.includes("application/json")) {
    data = await response.json();
  }

  // Check if the data response is an error
  if (data?.error) {
    const err = new ApiRequestError(
      response.status,
      `${method} ${url} failed: ${data.error}`,
      data.error,
    ) as any as ApiResponse<Error>;
    err[responseSymbol] = response;
    throw err;
  }

  if (config.signal && config.signal.aborted) {
    throw new Error("Aborted");
  }

  if (data) {
    data[responseSymbol] = response;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    data,
    status: response.status,
    redirected: response.redirected,
  };
}

export default apiWrapper;
