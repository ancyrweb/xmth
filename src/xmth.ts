export interface ForSendingAjaxRequests {
  send(url: string): Promise<string>;
}

export class FetchAdapter implements ForSendingAjaxRequests {
  send(url: string): Promise<string> {
    return fetch(url).then((response) => response.text());
  }
}

export class Xmth {
  constructor(
    private readonly document: Document,
    private readonly forSending: ForSendingAjaxRequests,
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

      const result = await this.forSending.send(url);
      target.innerHTML = result;
    });
  }
}
