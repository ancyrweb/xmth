import { IChronology } from '../ports/chronology';

export class RealTimeChronology implements IChronology {
  wait(time: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
}
