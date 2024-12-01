import { Xmth } from './xmth';
import { FetchAdapter } from './adapters/fetch-adapter';

document.addEventListener('DOMContentLoaded', function () {
  new Xmth(document, new FetchAdapter()).initialize();

  setTimeout(() => {
    console.log('xmth loaded !');
  }, 500);
});
