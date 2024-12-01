import { IHttpClient } from './ports/http-client';
import { IChronology } from './ports/chronology';

const verbs = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'];
const allSelectors = verbs.map((verb) => `[xh-${verb.toLowerCase()}]`);

export class Xmth {
  constructor(
    private readonly document: Document,
    private readonly httpClient: IHttpClient,
    private readonly chronology: IChronology,
  ) {}

  initialize() {
    const elements = this.document.querySelectorAll(allSelectors.join(', '));

    elements.forEach(async (element) => {
      const { url, verb } = this.extractUrlAndVerb(element);
      const target = this.extractTarget(element);
      const swapType = this.extractSwapType(element);
      const trigger = Trigger.fromElement(element);

      if (trigger.action === 'load') {
        const result = await this.httpClient.send(url, verb);
        this.swap(swapType, target, result);
      } else {
        element.addEventListener(trigger.action, async () => {
          const result = await this.httpClient.send(url, verb);
          this.swap(swapType, target, result);
        });
      }
    });
  }

  private extractSwapType(loader: Element) {
    return loader.getAttribute('xh-swap') ?? 'innerHTML';
  }

  private extractTarget(loader: Element) {
    let target = loader;
    if (loader.hasAttribute('xh-target')) {
      target = this.document.querySelector(loader.getAttribute('xh-target')!)!;
    }

    return target;
  }

  private extractUrlAndVerb(loader: Element) {
    return verbs.reduce(
      (acc, verb) => {
        if (loader.hasAttribute(`xh-${verb.toLowerCase()}`)) {
          return {
            url: loader.getAttribute(`xh-${verb.toLowerCase()}`)!,
            verb,
          };
        }
        return acc;
      },
      // Atrocious, will be refactored
      // TODO : refactor when we have an error mechanism in place
      null as { url: string; verb: string } | null,
    )!;
  }

  private swap(type: string, target: Element, value: string) {
    if (type === 'outerHTML') {
      target.outerHTML = value;
    } else if (type === 'textContent') {
      target.textContent = value;
    } else if (type === 'beforeBegin') {
      target.insertAdjacentHTML('beforebegin', value);
    } else if (type === 'afterBegin') {
      target.insertAdjacentHTML('afterbegin', value);
    } else if (type === 'beforeEnd') {
      target.insertAdjacentHTML('beforeend', value);
    } else if (type === 'afterEnd') {
      target.insertAdjacentHTML('afterend', value);
    } else if (type === 'delete') {
      target.remove();
    } else if (type === 'none') {
      return;
    } else {
      target.innerHTML = value;
    }
  }
}

class Trigger {
  public action: string;
  public delay: number;

  constructor(action: string, delay = 0) {
    this.action = action;
    this.delay = delay;
  }

  static fromElement(element: Element) {
    const elementType = element.tagName.toLowerCase();

    if (element.hasAttribute('xh-trigger')) {
      const attribute = element.getAttribute('xh-trigger')!;
      const parts = attribute.split(' ');
      return new Trigger(parts[0]);
    } else if (elementType === 'button') {
      return new Trigger('click');
    }

    return new Trigger('load');
  }
}
