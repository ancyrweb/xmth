import { IHttpClient } from './ports/http-client';

export class Xmth {
  constructor(
    private readonly document: Document,
    private readonly httpClient: IHttpClient,
  ) {}

  initialize() {
    const selectors = ['[xh-get]', '[xh-post]'];
    const loaders = this.document.querySelectorAll(selectors.join(', '));

    loaders.forEach(async (loader) => {
      const elementType = loader.tagName.toLowerCase();
      const { url, verb } = this.extractUrlAndVerb(loader);

      let target = loader;
      if (loader.hasAttribute('xh-target')) {
        target = this.document.querySelector(
          loader.getAttribute('xh-target')!,
        )!;
      }

      const swap = loader.getAttribute('xh-swap') ?? 'innerHTML';

      if (elementType === 'button') {
        loader.addEventListener('click', async () => {
          const result = await this.httpClient.send(url, verb);
          this.swap(swap, target, result);
        });
      } else {
        const result = await this.httpClient.send(url, verb);
        this.swap(swap, target, result);
      }
    });
  }

  private extractUrlAndVerb(loader: Element) {
    if (loader.hasAttribute('xh-post')) {
      return {
        url: loader.getAttribute('xh-post')!,
        verb: 'POST',
      };
    } else {
      return {
        url: loader.getAttribute('xh-get')!,
        verb: 'GET',
      };
    }
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
