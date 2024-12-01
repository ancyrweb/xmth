import { it, beforeEach, expect, afterEach } from 'vitest';
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

it('getting data on page load', async () => {
  let xmth = tester
    .prepareHtml('<div class="container" xh-get="/"></div>')
    .createXmth(new SimpleAjaxAdapter());

  xmth.initialize();
  await tester.waitForDOMOperations();

  const container = tester.document.querySelector('.container')!;
  expect(container.innerHTML).toBe('<h1>From Server</h1>');
});

it('getting data for specific target', async () => {
  let xmth = tester
    .prepareHtml(
      `
    <div>
        <div class="container" xh-get="/" xh-target=".target"></div>
        <div class="target"></div>
    </div>`,
    )
    .createXmth(new SimpleAjaxAdapter());

  xmth.initialize();
  await tester.waitForDOMOperations();

  const container = tester.document.querySelector('.target')!;
  expect(container.innerHTML).toBe('<h1>From Server</h1>');
});
