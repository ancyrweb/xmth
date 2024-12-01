import { Xmth } from './xmth';
import { FetchAdapter } from './adapters/fetch-adapter';
import { RealTimeChronology } from './adapters/real-time-chronology';

document.addEventListener('DOMContentLoaded', function () {
  new Xmth(document, new FetchAdapter(), new RealTimeChronology()).initialize();

  setTimeout(() => {
    console.log('xmth loaded !');
  }, 500);
});
