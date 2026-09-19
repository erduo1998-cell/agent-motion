/**
 * Sample a non-overlapping handoff between two titles sharing one reading slot.
 *
 * The outgoing title owns the first half of the interval. The incoming title
 * owns the second half. At the midpoint both are fully transparent, so the
 * result remains safe when sampled at repeated or non-monotonic absolute times.
 */
export function sampleTitleHandoff(
  t,
  { start, duration, travel = 40 } = {},
) {
  if (!Number.isFinite(t)) {
    throw new TypeError("t must be a finite number");
  }
  if (!Number.isFinite(start)) {
    throw new TypeError("start must be a finite number");
  }
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new RangeError("duration must be a finite number greater than zero");
  }
  if (!Number.isFinite(travel)) {
    throw new TypeError("travel must be a finite number");
  }

  const elapsed = (t - start) / duration;
  const exitProgress = Math.min(1, Math.max(0, elapsed * 2));
  const enterProgress = Math.min(1, Math.max(0, elapsed * 2 - 1));
  const easedExit = exitProgress * exitProgress * (3 - 2 * exitProgress);
  const easedEnter = enterProgress * enterProgress * (3 - 2 * enterProgress);

  const outgoingOpacity = 1 - easedExit;
  const incomingOpacity = easedEnter;

  return {
    outgoing: {
      opacity: outgoingOpacity,
      offsetY: easedExit === 0 ? 0 : -travel * easedExit,
      visible: outgoingOpacity > 0,
    },
    incoming: {
      opacity: incomingOpacity,
      offsetY: travel * (1 - easedEnter),
      visible: incomingOpacity > 0,
    },
  };
}
