import { IChronology } from '../../src/ports/chronology';

export class ImmediateChronology implements IChronology {
  async wait(time: number): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }
}
