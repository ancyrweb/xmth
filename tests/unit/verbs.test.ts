import { XmthTester } from './xmth-tester';
import { IHttpClient } from '../../src/ports/http-client';

class VerbBoundedHttpClient implements IHttpClient {
  constructor(private readonly expectedVerb = 'GET') {}
  async send(url: string, method: string): Promise<string> {
    if (method !== this.expectedVerb) {
      throw new Error(`Expected ${this.expectedVerb} but got ${method}`);
    }

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

describe('verbs', () => {
  test('GET', async () => {
    await tester
      .prepareHtml('<div class="container" xh-get="/"></div>')
      .createXmth(new VerbBoundedHttpClient('GET'))
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div class="container" xh-get="/"><h1>From Server</h1></div>
    `.trim(),
    );
  });

  test('POST', async () => {
    await tester
      .prepareHtml('<div class="container" xh-post="/"></div>')
      .createXmth(new VerbBoundedHttpClient('POST'))
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div class="container" xh-post="/"><h1>From Server</h1></div>
    `.trim(),
    );
  });

  test('PATCH', async () => {
    await tester
      .prepareHtml('<div class="container" xh-patch="/"></div>')
      .createXmth(new VerbBoundedHttpClient('PATCH'))
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div class="container" xh-patch="/"><h1>From Server</h1></div>
    `.trim(),
    );
  });

  test('PUT', async () => {
    await tester
      .prepareHtml('<div class="container" xh-put="/"></div>')
      .createXmth(new VerbBoundedHttpClient('PUT'))
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div class="container" xh-put="/"><h1>From Server</h1></div>
    `.trim(),
    );
  });

  test('DELETE', async () => {
    await tester
      .prepareHtml('<div class="container" xh-delete="/"></div>')
      .createXmth(new VerbBoundedHttpClient('DELETE'))
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div class="container" xh-delete="/"><h1>From Server</h1></div>
    `.trim(),
    );
  });
});
