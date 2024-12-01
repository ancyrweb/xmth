import { IChronology } from '../../src/ports/chronology';

type Stamp = {
  time: number;
  resolve: () => void;
};
export class ForwardableChronology implements IChronology {
  private stamps: Stamp[] = [];

  wait(time: number): Promise<void> {
    return new Promise((resolve) => {
      this.stamps.push({ time, resolve });
    });
  }

  async forward(time: number) {
    for (const stamp of this.stamps) {
      stamp.time -= time;
      if (stamp.time <= 0) {
        stamp.resolve();
      }
    }
  }
}
