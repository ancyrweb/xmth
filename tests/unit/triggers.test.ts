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

describe('user-defined triggers', () => {
  test('on page load', async () => {
    await tester
      .prepareHtml('<div class="container" xh-get="/" xh-trigger="load"></div>')
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div class="container" xh-get="/" xh-trigger="load"><h1>From Server</h1></div>
    `.trim(),
    );
  });

  test('on click', async () => {
    await tester
      .prepareHtml(
        '<div class="container" xh-get="/" xh-trigger="click"></div>',
      )
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div class="container" xh-get="/" xh-trigger="click"></div>
    `.trim(),
    );

    const container = tester.document.querySelector('.container')!;
    container.dispatchEvent(new Event('click'));

    await tester.waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div class="container" xh-get="/" xh-trigger="click"><h1>From Server</h1></div>
    `.trim(),
    );
  });

  test('mouseenter', async () => {
    await tester
      .prepareHtml(
        '<div class="container" xh-get="/" xh-trigger="mouseenter"></div>',
      )
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div class="container" xh-get="/" xh-trigger="mouseenter"></div>
    `.trim(),
    );

    const container = tester.document.querySelector('.container')!;
    container.dispatchEvent(new Event('mouseenter'));

    await tester.waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div class="container" xh-get="/" xh-trigger="mouseenter"><h1>From Server</h1></div>
    `.trim(),
    );
  });
});
