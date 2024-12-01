import { IHttpClient } from '../ports/http-client';

export class FetchAdapter implements IHttpClient {
  send(url: string): Promise<string> {
    return fetch(url).then((response) => response.text());
  }
}
