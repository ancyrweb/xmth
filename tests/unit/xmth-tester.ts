import { Window, Document } from 'happy-dom';
import { Xmth } from '../../src/xmth';
import { IHttpClient } from '../../src/ports/http-client';
import { ImmediateChronology } from '../adapters/immediate-chronology';

export class XmthTester {
  public window: Window;
  public document: Document;
  public xmth: Xmth | undefined;
  public httpClient: IHttpClient | undefined;

  constructor() {
    this.window = new Window();
    this.document = this.window.document;
  }

  prepareHtml(html: string) {
    this.document.body.innerHTML = html;
    return this;
  }

  withHttpClient(httpClient: IHttpClient) {
    this.httpClient = httpClient;
    return this;
  }

  createXmth() {
    this.xmth = new Xmth(
      // happy-dom's Document is not 100% compatible with the real DOM
      // But the surface API cover our needs, so the cast is safe
      this.document as any,
      this.httpClient!,
      new ImmediateChronology(),
    );
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
