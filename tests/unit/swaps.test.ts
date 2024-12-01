import { XmthTester } from './xmth-tester';
import { IHttpClient } from '../../src/ports/http-client';

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

describe('swaps', () => {
  test('innerHTML', async () => {
    await tester
      .prepareHtml('<div class="container" xh-get="/"></div>')
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div class="container" xh-get="/"><h1>From Server</h1></div>
    `.trim(),
    );
  });

  test('outerHTML', async () => {
    await tester
      .prepareHtml(
        '<div class="container" xh-get="/" xh-swap="outerHTML"></div>',
      )
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(`<h1>From Server</h1>`);
  });
});
