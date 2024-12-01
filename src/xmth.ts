import { IHttpClient } from './ports/http-client';

export class Xmth {
  constructor(
    private readonly document: Document,
    private readonly httpClient: IHttpClient,
  ) {}

  initialize() {
    this.document.querySelectorAll('[xh-get]').forEach(async (loader) => {
      const elementType = loader.tagName.toLowerCase();

      let url = loader.getAttribute('xh-get')!;
      let target = loader;
      if (loader.hasAttribute('xh-target')) {
        target = this.document.querySelector(
          loader.getAttribute('xh-target')!,
        )!;
      }

      const swap = loader.getAttribute('xh-swap') ?? 'innerHTML';

      if (elementType === 'button') {
        loader.addEventListener('click', async () => {
          const result = await this.httpClient.send(url, 'GET');
          this.swap(swap, target, result);
        });
      } else {
        const result = await this.httpClient.send(url, 'GET');
        this.swap(swap, target, result);
      }
    });

    this.document.querySelectorAll('[xh-post]').forEach(async (loader) => {
      const elementType = loader.tagName.toLowerCase();

      let url = loader.getAttribute('xh-post')!;
      let target = loader;
      if (loader.hasAttribute('xh-target')) {
        target = this.document.querySelector(
          loader.getAttribute('xh-target')!,
        )!;
      }

      const swap = loader.getAttribute('xh-swap') ?? 'innerHTML';

      if (elementType === 'button') {
        loader.addEventListener('click', async () => {
          const result = await this.httpClient.send(url, 'POST');
          this.swap(swap, target, result);
        });
      } else {
        const result = await this.httpClient.send(url, 'POST');
        this.swap(swap, target, result);
      }
    });
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
