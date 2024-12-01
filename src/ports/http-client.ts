export interface IHttpClient {
  send(url: string, method: string): Promise<string>;
}
