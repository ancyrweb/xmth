import { XmthTester } from './xmth-tester';
import { SimpleAjaxAdapter } from '../adapters/simple-ajax-adapter';

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
      .withHttpClient(new SimpleAjaxAdapter())
      .createXmth()
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
      .withHttpClient(new SimpleAjaxAdapter())
      .createXmth()
      .initialize()
      .waitForDOMOperations();

    const container = tester.document.querySelector('.target')!;
    expect(container.innerHTML).toBe('<h1>From Server</h1>');
  });

  test('if the target is a button, it does not fetch on page load', async () => {
    await tester
      .prepareHtml(
        `
      <div>
          <button class="container" xh-get="/" xh-target=".target"></button>
          <div class="target"></div>
      </div>
`,
      )
      .withHttpClient(new SimpleAjaxAdapter())
      .createXmth()
      .initialize()
      .waitForDOMOperations();

    const container = tester.document.querySelector('.target')!;
    expect(container.innerHTML).toBe('');
  });

  test('clicking on the button loads the data', async () => {
    await tester
      .prepareHtml(
        `
      <div>
          <button class="container" xh-get="/" xh-target=".target"></button>
          <div class="target"></div>
      </div>
`,
      )
      .withHttpClient(new SimpleAjaxAdapter())
      .createXmth()
      .initialize()
      .waitForDOMOperations();

    const button = tester.document.querySelector('button')!;
    button.click();

    await tester.waitForDOMOperations();

    const container = tester.document.querySelector('.target')!;
    expect(container.innerHTML).toBe('<h1>From Server</h1>');
  });
});
