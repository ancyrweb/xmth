import { IHttpClient } from './ports/http-client';

export class Xmth {
  constructor(
    private readonly document: Document,
    private readonly httpClient: IHttpClient,
  ) {}

  initialize() {
    const loaders = this.document.querySelectorAll('[xh-get]');
    loaders.forEach(async (loader) => {
      let url = loader.getAttribute('xh-get')!;
      let target = loader;
      if (loader.hasAttribute('xh-target')) {
        target = this.document.querySelector(
          loader.getAttribute('xh-target')!,
        )!;
      }

      const result = await this.httpClient.send(url);
      target.innerHTML = result;
    });
  }
}
