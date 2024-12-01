import { Window, Document } from 'happy-dom';
import { Xmth } from '../../src/xmth';
import { IHttpClient } from '../../src/ports/http-client';

export class XmthTester {
  public window: Window;
  public document: Document;
  public xmth: Xmth | undefined;

  constructor() {
    this.window = new Window({ url: 'https://localhost:3000' });
    this.document = this.window.document;
  }

  prepareHtml(html: string) {
    this.document.body.innerHTML = html;
    return this;
  }

  createXmth(httpClient: IHttpClient) {
    this.xmth = new Xmth(this.document as any, httpClient);
    return this;
  }

  initialize() {
    this.xmth!.initialize();
    return this;
  }

  async waitForDOMOperations() {
    await new Promise((resolve) => setTimeout(resolve, 0));
    return this;
  }

  close() {
    this.window.close();
  }
}
