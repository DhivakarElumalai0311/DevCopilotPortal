export class BaseApiService {
  public async fetchAuthorized(
    input: RequestInfo | Request,
    init?: RequestInit
  ): Promise<Response> {
    let response: Response | null = null;

    if (init || typeof input === "string") {
      if (!init) init = {};
      if (!init.headers) init.headers = {};
      (init.headers as any)["x-requested-with"] = `d35app`;
      response = await fetch(input, init);
    } else {
      (input as Request).headers.set("x-requested-with", `d35app`);
      response = await fetch(input);
    }

    if (response.type === "opaqueredirect") return response;
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.statusText}`
      );
    }

    return response;
  }

  protected async asJson<T>(response: Response): Promise<T> {
    const text = await response.text();
    if (text) return JSON.parse(text) as T;
    if (text === "") return {} as T;
    throw new Error("Unable to parse response json");
  }
}
