import assert from "node:assert/strict";

import { sampleTitleHandoff } from "./handoff-math.mjs";

const options = { start: 10, duration: 4, travel: 48 };

// Exact boundary states define ownership of the shared reading slot.
assert.deepEqual(sampleTitleHandoff(9, options), {
  outgoing: { opacity: 1, offsetY: 0, visible: true },
  incoming: { opacity: 0, offsetY: 48, visible: false },
});
assert.deepEqual(sampleTitleHandoff(10, options), {
  outgoing: { opacity: 1, offsetY: 0, visible: true },
  incoming: { opacity: 0, offsetY: 48, visible: false },
});
assert.deepEqual(sampleTitleHandoff(12, options), {
  outgoing: { opacity: 0, offsetY: -48, visible: false },
  incoming: { opacity: 0, offsetY: 48, visible: false },
});
assert.deepEqual(sampleTitleHandoff(14, options), {
  outgoing: { opacity: 0, offsetY: -48, visible: false },
  incoming: { opacity: 1, offsetY: 0, visible: true },
});
assert.deepEqual(sampleTitleHandoff(15, options), {
  outgoing: { opacity: 0, offsetY: -48, visible: false },
  incoming: { opacity: 1, offsetY: 0, visible: true },
});

// Dense sampling checks the actual invariant: the two titles never compete.
for (let frame = -120; frame <= 360; frame += 1) {
  const state = sampleTitleHandoff(frame / 30 + 8, options);
  assert.equal(
    state.outgoing.visible && state.incoming.visible,
    false,
    `both titles visible at sample ${frame}`,
  );
  assert.ok(state.outgoing.opacity >= 0 && state.outgoing.opacity <= 1);
  assert.ok(state.incoming.opacity >= 0 && state.incoming.opacity <= 1);
}

// Absolute-time sampling is stateless: order, repeats, and caller mutation do not matter.
const sampleTimes = [13.75, 9.5, 12, 10.25, 14.5, 11.125];
const expected = new Map(
  sampleTimes.map((time) => [time, sampleTitleHandoff(time, options)]),
);
const mutated = sampleTitleHandoff(10.25, options);
mutated.outgoing.opacity = 99;
mutated.incoming.offsetY = -999;
for (const time of [12, 10.25, 13.75, 10.25, 9.5, 14.5, 11.125, 12]) {
  assert.deepEqual(sampleTitleHandoff(time, options), expected.get(time));
}

for (const duration of [0, -0.001, NaN, Infinity, -Infinity, "4", null, undefined]) {
  assert.throws(
    () => sampleTitleHandoff(10, { start: 10, duration }),
    RangeError,
    `duration ${String(duration)} should be rejected`,
  );
}

console.log("handoff-math: all tests passed");
