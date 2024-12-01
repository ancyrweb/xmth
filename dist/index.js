"use strict";
(() => {
  // src/xmth.ts
  var Xmth = class {
    constructor(document2, httpClient) {
      this.document = document2;
      this.httpClient = httpClient;
    }
    initialize() {
      const loaders = this.document.querySelectorAll("[xh-get]");
      loaders.forEach(async (loader) => {
        let url = loader.getAttribute("xh-get");
        let target = loader;
        if (loader.hasAttribute("xh-target")) {
          target = this.document.querySelector(
            loader.getAttribute("xh-target")
          );
        }
        const result = await this.httpClient.send(url);
        target.innerHTML = result;
      });
    }
  };

  // src/adapters/fetch-adapter.ts
  var FetchAdapter = class {
    send(url) {
      return fetch(url).then((response) => response.text());
    }
  };

  // src/index.ts
  document.addEventListener("DOMContentLoaded", function() {
    new Xmth(document, new FetchAdapter()).initialize();
    setTimeout(() => {
      console.log("xmth loaded !");
    }, 500);
  });
})();
