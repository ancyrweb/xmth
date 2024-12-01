import { XmthTester } from './xmth-tester';
import { IHttpClient } from '../../src/ports/http-client';
import { Event } from 'happy-dom';

class SimpleAjaxAdapter implements IHttpClient {
  async send(url: string): Promise<string> {
    return `<h1>From Server</h1>`;
  }
}

let tester: XmthTester;

beforeEach(() => {
  tester = new XmthTester();
});

afterEach(() => {
  tester.close();
});

describe('trigger modifiers', () => {
  test('waiting 100ms after page load', async () => {
    await tester
      .prepareHtml('<div xh-get="/" xh-trigger="load delay:100ms"></div>')
      .withHttpClient(new SimpleAjaxAdapter())
      .createXmth()
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div xh-get="/" xh-trigger="load delay:100ms"><h1>From Server</h1></div>
    `.trim(),
    );
  });
});
