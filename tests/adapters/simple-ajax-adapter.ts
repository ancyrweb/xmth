import { IHttpClient } from '../../src/ports/http-client';

export class SimpleAjaxAdapter implements IHttpClient {
  async send(url: string): Promise<string> {
    return `<h1>From Server</h1>`;
  }
}
