export interface IHttpClient {
  send(url: string): Promise<string>;
}
