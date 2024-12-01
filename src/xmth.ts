import { IHttpClient } from './ports/http-client';

const verbs = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'];
const allSelectors = verbs.map((verb) => `[xh-${verb.toLowerCase()}]`);

export class Xmth {
  constructor(
    private readonly document: Document,
    private readonly httpClient: IHttpClient,
  ) {}

  initialize() {
    const loaders = this.document.querySelectorAll(allSelectors.join(', '));

    loaders.forEach(async (loader) => {
      const elementType = loader.tagName.toLowerCase();
      const { url, verb } = this.extractUrlAndVerb(loader);
      const target = this.extractTarget(loader);
      const swapType = this.extractSwapType(loader);

      if (elementType === 'button') {
        loader.addEventListener('click', async () => {
          const result = await this.httpClient.send(url, verb);
          this.swap(swapType, target, result);
        });
      } else {
        const result = await this.httpClient.send(url, verb);
        this.swap(swapType, target, result);
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
