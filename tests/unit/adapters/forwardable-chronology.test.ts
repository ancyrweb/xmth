import { ForwardableChronology } from '../../adapters/forwardable-chronology';

test('not fulfilled when the time has not elapsed', () => {
  let fulfilled = false;
  const chronology = new ForwardableChronology();

  chronology.wait(0).then(() => {
    fulfilled = true;
  });

  expect(fulfilled).toBe(false);
});

test('fulfilling after the time has elapsed', async () => {
  let fulfilled = false;
  const chronology = new ForwardableChronology();

  chronology.wait(0).then(() => {
    fulfilled = true;
  });

  await chronology.forward(1);

  expect(fulfilled).toBe(true);
});

test('not fulfilling before the time has elapsed', async () => {
  let fulfilled = false;
  const chronology = new ForwardableChronology();

  chronology.wait(5).then(() => {
    fulfilled = true;
  });

  await chronology.forward(4);
  expect(fulfilled).toBe(false);
  await chronology.forward(1);
  expect(fulfilled).toBe(true);
});
