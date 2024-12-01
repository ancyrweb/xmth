import { Window, Document } from 'happy-dom';
import { ForSendingAjaxRequests, Xmth } from '../../src/xmth';

export class XmthTester {
  public window: Window;
  public document: Document;

  constructor() {
    this.window = new Window({ url: 'https://localhost:3000' });
    this.document = this.window.document;
  }

  prepareHtml(html: string) {
    this.document.body.innerHTML = html;
    return this;
  }

  createXmth(forSendingAjaxRequests: ForSendingAjaxRequests) {
    return new Xmth(this.document as any, forSendingAjaxRequests);
  }

  waitForDOMOperations() {
    return new Promise((resolve) => setTimeout(resolve, 0));
  }

  close() {
    this.window.close();
  }
}
