import assert from 'node:assert/strict';
import { fitRectTransform, interpolateRig, sampleRigKeyframes, solvePerspectiveFraming } from './frame-math.mjs';

const close = (actual, expected, epsilon = 1e-9) => assert.ok(Math.abs(actual - expected) <= epsilon, `${actual} != ${expected}`);
const dot = (a, b) => a.reduce((sum, v, i) => sum + v * b[i], 0);
const box = [];
for (const x of [-2, 2]) for (const y of [-1, 1]) for (const z of [-3, 3]) box.push([x, y, z]);

// Independently project world points using the returned camera pose.
function verifyFit(points, camera, { aspect, verticalFov, rect, near = 0.01 }, indices = points.map((_, i) => i)) {
  const tan = Math.tan(verticalFov / 2);
  for (const i of indices) {
    const p = points[i].map((v, axis) => v - camera.position[axis]);
    const depth = dot(p, camera.basis.forward);
    const x = (dot(p, camera.basis.right) / (depth * tan * aspect) + 1) / 2;
    const y = (1 - dot(p, camera.basis.up) / (depth * tan)) / 2;
    assert.ok(depth >= near - 1e-8, `point ${i}: depth ${depth}`);
    assert.ok(x >= rect.x - 1e-8 && x <= rect.x + rect.w + 1e-8, `point ${i}: screen x ${x}`);
    assert.ok(y >= rect.y - 1e-8 && y <= rect.y + rect.h + 1e-8, `point ${i}: screen y ${y}`);
  }
}

const fit = fitRectTransform({ bounds: { x: 20, y: -10, w: 200, h: 100 }, viewport: { w: 1000, h: 500 }, rect: { x: 0.1, y: 0.2, w: 0.6, h: 0.6 } });
close(fit.scale, 3); close(fit.tx, 40); close(fit.ty, 130);
assert.deepEqual(fit.mappedBounds, { x: 100, y: 100, w: 600, h: 300 });
for (const aspect of [0.01, 9 / 16, 16 / 9, 100]) {
  const config = { bounds: { x: -31, y: 17, w: 220, h: 70 }, viewport: { x: 10, y: 20, w: aspect * 800, h: 800 }, rect: { x: 0.2, y: 0.1, w: 0.6, h: 0.7 } };
  const contained = fitRectTransform(config);
  const b = contained.mappedBounds, r = contained.targetRect;
  assert.ok(b.x >= r.x - 1e-8 && b.y >= r.y - 1e-8 && b.x + b.w <= r.x + r.w + 1e-8 && b.y + b.h <= r.y + r.h + 1e-8);
  const covered = fitRectTransform({ ...config, mode: 'cover' });
  assert.equal(covered.coversTarget, true);
  assert.ok(covered.sourceWindow.w <= config.bounds.w + 1e-8 && covered.sourceWindow.h <= config.bounds.h + 1e-8);
}
const capped = fitRectTransform({ bounds: { x: 0, y: 0, w: 100, h: 100 }, viewport: { w: 1000, h: 500 }, mode: 'cover', maxScale: 2 });
assert.equal(capped.scale, 2); assert.equal(capped.limitedByMaxScale, true); assert.equal(capped.coversTarget, false);

const a = { scale: 1, tx: -100, ty: 20 }, b = { scale: 9, tx: 100, ty: 60 };
const mid = interpolateRig(a, b, 0.5, { ease: 'linear' });
close(mid.scale, 3); close(mid.tx, 0); close(mid.ty, 40);
assert.deepEqual(interpolateRig(a, b, -1), a);
assert.deepEqual(interpolateRig(a, b, 2), b);
close(sampleRigKeyframes([{ time: 2, ...a, ease: 'linear' }, { time: 4, ...b }], 3).scale, 3);
assert.deepEqual(sampleRigKeyframes([{ time: 2, ...a }], 999), a);

const full = { aspect: 2, verticalFov: Math.PI / 2, rect: { x: 0, y: 0, w: 1, h: 1 } };
const camera = solvePerspectiveFraming({ points: box, ...full });
close(camera.distance, 4); close(camera.position[2], 4);
verifyFit(box, camera, full);
for (const aspect of [0.01, 0.1, 9 / 16, 16 / 9, 10, 100]) {
  const config = { aspect, verticalFov: 0.7, rect: { x: 0.65, y: 0.12, w: 0.3, h: 0.7 }, basis: { right: [0.8, 0, -0.6], up: [0, 1, 0], forward: [-0.6, 0, -0.8] } };
  verifyFit(box, solvePerspectiveFraming({ points: box, ...config }), config);
  verifyFit(box, solvePerspectiveFraming({ points: box, ...config, anchor: [70, -30, 11] }), config);
}

const localPoints = [...box, [100, 100, 100]];
const fitIndices = box.map((_, i) => i);
const localCamera = solvePerspectiveFraming({ points: localPoints, fitIndices, ...full });
assert.deepEqual(localCamera.position, camera.position);
verifyFit(localPoints, localCamera, full, fitIndices);

// Deterministic asymmetrical point clouds exercise depth and extremum changes.
let seed = 12345;
const rand = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 2 ** 32);
for (let i = 0; i < 64; i++) {
  const points = Array.from({ length: 16 }, () => [rand() * 20 - 7, rand() * 5 - 4, rand() * 50 - 30]);
  const config = { aspect: 10 ** (rand() * 4 - 2), verticalFov: 0.2 + rand() * 2, rect: { x: rand() * 0.3, y: rand() * 0.3, w: 0.6, h: 0.6 } };
  verifyFit(points, solvePerspectiveFraming({ points, ...config }), config);
}

assert.throws(() => solvePerspectiveFraming({ points: box, ...full, fitIndices: [] }), /fitIndices/);
assert.throws(() => solvePerspectiveFraming({ points: box, ...full, basis: { right: [1, 0, 0], up: [1, 1, 0], forward: [0, 0, -1] } }), /orthogonal/);
assert.throws(() => fitRectTransform({ bounds: { x: 0, y: 0, w: 0, h: 1 }, viewport: { w: 1, h: 1 } }), /bounds.w/);
assert.throws(() => sampleRigKeyframes([{ time: 1, ...a }, { time: 1, ...b }], 1), /strictly increase/);
console.log('frame-math: 2D contain/cover/caps, log-scale rigs, 3D box/portrait/ultrawide/local/depth tests passed.');
