# Shared-slot title handoff

`sampleTitleHandoff(t, { start, duration, travel = 40 })` is a pure,
dependency-free sampler for two different titles that occupy the same reading
position. Times use any consistent unit. The old title exits during the first
half of `duration`; the new title enters during the second half. Both are fully
transparent at the midpoint. Each half uses cubic smoothstep easing.

The return value contains `outgoing` and `incoming`. Each has:

- `opacity`: a scalar from 0 to 1
- `offsetY`: the title's vertical offset from its resting position
- `visible`: whether that title has nonzero opacity, useful for optional culling

The sampler depends only on its arguments. Repeated calls and absolute-time
calls made in any order return the same state. It is not tied to a 30-second
timeline.

## DOM example

This example assumes a project-local `skill/` copy; adapt the import path to your host.

```js
import { sampleTitleHandoff } from "./skill/scripts/handoff-math.mjs";

function renderTitleSlot(timeSeconds, parentAlpha) {
  const state = sampleTitleHandoff(timeSeconds, {
    start: 3.2,
    duration: 0.8,
    travel: 32,
  });

  // Apply shared scene/envelope alpha once, on the parent slot.
  titleSlot.style.opacity = parentAlpha;

  for (const [element, title] of [
    [oldTitle, state.outgoing],
    [newTitle, state.incoming],
  ]) {
    element.style.opacity = title.opacity;
    element.style.transform = `translateY(${title.offsetY}px)`;
    element.hidden = !title.visible;
  }
}
```

Do not also multiply `parentAlpha` into either child's `opacity`: the DOM
inheritance chain already applies the parent once. The same rule applies in
other engines—put the shared environment fade on the common parent and the
handoff opacity on each title layer.

## AE and Blender equivalents

| Sampler field | After Effects | Blender |
| --- | --- | --- |
| `opacity` | Text layer Transform > Opacity: `opacity * 100` | Text material alpha: `opacity` |
| `offsetY` | Add to the text layer Position Y; positive is downward | Add on the title's camera-facing local vertical axis; scale/sign to the scene |
| `visible` | Optional layer/culling switch when false | Optional `hide_viewport` / `hide_render` when false |

In After Effects, place both text layers inside one precomp, use the sampled
opacity on those layers, and apply the shared scene fade once to the outer
precomp layer. In Blender, use the sampled opacity on each title material, then
apply the shared fade once to the composited title branch. Do not bake that
shared alpha into a title value and then apply it again downstream.

This helper solves only a same-slot text replacement. It does not require every
artistic transition to be serial, and it does not manage text already separated
into different positions. Environment motion, camera motion, and other shared
objects can continue continuously through the title handoff.

## Run the focused test

```sh
node <skill-directory>/scripts/test-handoff-math.mjs
```
