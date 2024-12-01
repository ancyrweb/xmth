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
      .prepareHtml('<div xh-get="/"></div>')
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div xh-get="/"><h1>From Server</h1></div>
    `.trim(),
    );
  });

  test('outerHTML', async () => {
    await tester
      .prepareHtml('<div xh-get="/" xh-swap="outerHTML"></div>')
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(`<h1>From Server</h1>`);
  });

  test('textContent', async () => {
    await tester
      .prepareHtml('<div xh-get="/" xh-swap="textContent"></div>')
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    let content = '<h1>From Server</h1>';
    let escaped = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    expect(tester.document.body.innerHTML).toEqual(
      `<div xh-get="/" xh-swap="textContent">${escaped}</div>`.trim(),
    );
  });

  test('beforeBegin', async () => {
    await tester
      .prepareHtml('<div xh-get="/" xh-swap="beforeBegin"></div>')
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <h1>From Server</h1><div xh-get="/" xh-swap="beforeBegin"></div>
    `.trim(),
    );
  });

  test('afterBegin', async () => {
    await tester
      .prepareHtml('<div xh-get="/" xh-swap="afterBegin"><hr></div>')
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div xh-get="/" xh-swap="afterBegin"><h1>From Server</h1><hr></div>
    `.trim(),
    );
  });

  test('beforeEnd', async () => {
    await tester
      .prepareHtml('<div xh-get="/" xh-swap="beforeEnd"><hr></div>')
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div xh-get="/" xh-swap="beforeEnd"><hr><h1>From Server</h1></div>
    `.trim(),
    );
  });

  test('afterEnd', async () => {
    await tester
      .prepareHtml('<div xh-get="/" xh-swap="afterEnd"></div>')
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      `
      <div xh-get="/" xh-swap="afterEnd"></div><h1>From Server</h1>
    `.trim(),
    );
  });

  test('delete', async () => {
    await tester
      .prepareHtml('<div xh-get="/" xh-swap="delete"></div>')
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual('');
  });
  test('none', async () => {
    await tester
      .prepareHtml('<div xh-get="/" xh-swap="none"></div>')
      .createXmth(new SimpleAjaxAdapter())
      .initialize()
      .waitForDOMOperations();

    expect(tester.document.body.innerHTML).toEqual(
      '<div xh-get="/" xh-swap="none"></div>',
    );
  });
});
