"use strict";
setTimeout(() => {
    console.log("xmth loaded !");
}, 500);
document.addEventListener("DOMContentLoaded", function () {
    const loaders = document.querySelectorAll("[xh-load]");
    loaders.forEach((loader) => {
        let url = loader.getAttribute("xh-load");
        fetch(url)
            .then((response) => response.text())
            .then((html) => {
            loader.innerHTML = html;
        });
    });
});
