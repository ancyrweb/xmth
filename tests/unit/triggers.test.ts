import { XmthTester } from './xmth-tester';
import { IHttpClient } from '../../src/ports/http-client';
import { Event } from 'happy-dom';
import { SimpleAjaxAdapter } from '../adapters/simple-ajax-adapter';

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
      .prepareHtml('<div xh-get="/" xh-trigger="load"></div>')
      .withHttpClient(new SimpleAjaxAdapter())
      .createXmth()
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div xh-get="/" xh-trigger="load"><h1>From Server</h1></div>
    `.trim(),
    );
  });

  test('on click', async () => {
    await tester
      .prepareHtml('<div xh-get="/" xh-trigger="click"></div>')
      .withHttpClient(new SimpleAjaxAdapter())
      .createXmth()
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div xh-get="/" xh-trigger="click"></div>
    `.trim(),
    );

    const container = tester.document.querySelector('div')!;
    container.dispatchEvent(new Event('click'));

    await tester.waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div xh-get="/" xh-trigger="click"><h1>From Server</h1></div>
    `.trim(),
    );
  });

  test('mouseenter', async () => {
    await tester
      .prepareHtml('<div xh-get="/" xh-trigger="mouseenter"></div>')
      .withHttpClient(new SimpleAjaxAdapter())
      .createXmth()
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div xh-get="/" xh-trigger="mouseenter"></div>
    `.trim(),
    );

    const container = tester.document.querySelector('div')!;
    container.dispatchEvent(new Event('mouseenter'));

    await tester.waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div xh-get="/" xh-trigger="mouseenter"><h1>From Server</h1></div>
    `.trim(),
    );
  });
});
