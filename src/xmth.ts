import { IHttpClient } from './ports/http-client';

export class Xmth {
  constructor(
    private readonly document: Document,
    private readonly httpClient: IHttpClient,
  ) {}

  initialize() {
    const loaders = this.document.querySelectorAll('[xh-get]');
    loaders.forEach(async (loader) => {
      const elementType = loader.tagName.toLowerCase();

      let url = loader.getAttribute('xh-get')!;
      let target = loader;
      if (loader.hasAttribute('xh-target')) {
        target = this.document.querySelector(
          loader.getAttribute('xh-target')!,
        )!;
      }

      if (elementType === 'button') {
        loader.addEventListener('click', async () => {
          target.innerHTML = await this.httpClient.send(url);
        });
      } else {
        target.innerHTML = await this.httpClient.send(url);
      }
    });
  }
}
