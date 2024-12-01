import { Window } from 'happy-dom';
import { it, beforeEach, expect, afterEach } from 'vitest';
import { ForSendingAjaxRequests, Xmth } from '../../src/xmth';
import { XmthTester } from './xmth-tester';

class SimpleAjaxAdapter implements ForSendingAjaxRequests {
  async send(url: string): Promise<string> {
    return `<h1>Contacts</h1>`;
  }
}

let tester: XmthTester;

beforeEach(() => {
  tester = new XmthTester();
});

afterEach(() => {
  tester.close();
});

it('getting', async () => {
  let xmth = tester
    .prepareHtml('<div class="container" xh-get="/"></div>')
    .createXmth(new SimpleAjaxAdapter());

  xmth.initialize();
  await tester.waitForDOMOperations();

  const container = tester.document.querySelector('.container')!;
  expect(container.innerHTML).toBe('<h1>Contacts</h1>');
});
