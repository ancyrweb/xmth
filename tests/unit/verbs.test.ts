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
});
