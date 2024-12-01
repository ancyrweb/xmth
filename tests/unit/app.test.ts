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

describe('getting data through AJAX', () => {
  test('in the same target', async () => {
    await tester
      .prepareHtml('<div class="container" xh-get="/"></div>')
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    const container = tester.document.querySelector('.container')!;
    expect(container.innerHTML).toBe('<h1>From Server</h1>');
  });

  test('on another target', async () => {
    await tester
      .prepareHtml(
        `
      <div>
          <div class="container" xh-get="/" xh-target=".target"></div>
          <div class="target"></div>
      </div>
`,
      )
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    const container = tester.document.querySelector('.target')!;
    expect(container.innerHTML).toBe('<h1>From Server</h1>');
  });
});
