import { XmthTester } from './xmth-tester';
import { IHttpClient } from '../../src/ports/http-client';
import { ForwardableChronology } from '../adapters/forwardable-chronology';
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

describe('trigger modifiers', () => {
  describe('delay mechanics', () => {
    test('when theres a delay, it should immediately load', async () => {
      let chronology = new ForwardableChronology();

      await tester
        .prepareHtml('<div xh-get="/" xh-trigger="load delay:100"></div>')
        .withHttpClient(new SimpleAjaxAdapter())
        .withChronology(chronology)
        .createXmth()
        .initialize()
        .waitForDOMOperations();

      expect(tester.document.body.innerHTML).not.toContain(
        '<h1>From Server</h1>',
      );
    });

    test('after the delay, it should load', async () => {
      let chronology = new ForwardableChronology();

      tester
        .prepareHtml('<div xh-get="/" xh-trigger="load delay:100"></div>')
        .withHttpClient(new SimpleAjaxAdapter())
        .withChronology(chronology)
        .createXmth()
        .initialize();

      await chronology.forward(99);
      expect(tester.document.body.innerHTML).not.toContain(
        '<h1>From Server</h1>',
      );
      await chronology.forward(1);

      expect(tester.document.body.innerHTML).toContain('<h1>From Server</h1>');
    });

    test('treating the delay with "ms" units', async () => {
      let chronology = new ForwardableChronology();

      tester
        .prepareHtml('<div xh-get="/" xh-trigger="load delay:100ms"></div>')
        .withHttpClient(new SimpleAjaxAdapter())
        .withChronology(chronology)
        .createXmth()
        .initialize();

      await chronology.forward(99);
      expect(tester.document.body.innerHTML).not.toContain(
        '<h1>From Server</h1>',
      );
      await chronology.forward(1);

      expect(tester.document.body.innerHTML).toContain('<h1>From Server</h1>');
    });

    test('treating the delay with "s" units', async () => {
      let chronology = new ForwardableChronology();

      tester
        .prepareHtml('<div xh-get="/" xh-trigger="load delay:1s"></div>')
        .withHttpClient(new SimpleAjaxAdapter())
        .withChronology(chronology)
        .createXmth()
        .initialize();

      await chronology.forward(999);
      expect(tester.document.body.innerHTML).not.toContain(
        '<h1>From Server</h1>',
      );
      await chronology.forward(1);

      expect(tester.document.body.innerHTML).toContain('<h1>From Server</h1>');
    });
  });

  describe('delay after event', () => {
    test('treating the delay with "s" units', async () => {
      let chronology = new ForwardableChronology();

      tester
        .prepareHtml('<div xh-get="/" xh-trigger="click delay:100ms"></div>')
        .withHttpClient(new SimpleAjaxAdapter())
        .withChronology(chronology)
        .createXmth()
        .initialize();

      let container = tester.document.querySelector('div')!;
      container.dispatchEvent(new Event('click'));

      await chronology.forward(99);
      expect(container.innerHTML).not.toContain('<h1>From Server</h1>');
      await chronology.forward(1);
      expect(container.innerHTML).toContain('<h1>From Server</h1>');
    });
  });
});
