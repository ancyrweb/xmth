"use strict";
(() => {
  // src/xmth.ts
  var FetchAdapter = class {
    send(url) {
      return fetch(url).then((response) => response.text());
    }
  };
  var Xmth = class {
    constructor(document2, forSending) {
      this.document = document2;
      this.forSending = forSending;
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
        const result = await this.forSending.send(url);
        target.innerHTML = result;
      });
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
