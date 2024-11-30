"use strict";
setTimeout(() => {
    console.log("xmth loaded !");
}, 500);
document.addEventListener("DOMContentLoaded", function () {
    const loaders = document.querySelectorAll("[xh-get]");
    loaders.forEach((loader) => {
        let url = loader.getAttribute("xh-get");
        let target = loader;
        if (loader.hasAttribute("xh-target")) {
            target = document.querySelector(loader.getAttribute("xh-target"));
        }
        fetch(url)
            .then((response) => response.text())
            .then((html) => {
            target.innerHTML = html;
        });
    });
});
