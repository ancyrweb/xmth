import { FetchAdapter, Xmth } from './xmth';

document.addEventListener('DOMContentLoaded', function () {
  new Xmth(document, new FetchAdapter()).initialize();

  setTimeout(() => {
    console.log('xmth loaded !');
  }, 500);
});
