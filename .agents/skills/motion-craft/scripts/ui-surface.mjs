/** A neutral physical UI carrier. Supply your own layout, colors, fonts and motion. */
export function createUISurface(THREE, RoundedBoxGeometry, {
  width, height, depth = 0.12, radius = 0.08, pixelsPerUnit = 180,
  bodyMaterial, faceMaterial = {}, paint,
} = {}) {
  if (!(width > 0 && height > 0 && depth > 0)) throw new Error('Positive world dimensions required');
  const group = new THREE.Group();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const ownsBodyMaterial = !bodyMaterial;
  const bodyMat = bodyMaterial || new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.45});
  const body = new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 4, Math.min(radius, depth / 2)), bodyMat);
  body.castShadow = body.receiveShadow = true;
  const faceMat = new THREE.MeshStandardMaterial({
    map: texture, roughness: 0.7, metalness: 0, transparent: true,
    alphaTest: 0.01, ...faceMaterial,
  });
  const face = new THREE.Mesh(new THREE.PlaneGeometry(width, height), faceMat);
  face.position.z = depth / 2 + 0.001;
  face.receiveShadow = true;
  group.add(body, face);
  let currentPaint = paint;
  const anchors = new Map();

  function redraw(nextPaint = currentPaint) {
    currentPaint = nextPaint;
    canvas.width = Math.ceil(width * pixelsPerUnit);
    canvas.height = Math.ceil(height * pixelsPerUnit);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    anchors.clear();
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(0, 0, canvas.width, canvas.height, Math.min(radius * pixelsPerUnit, canvas.width / 2, canvas.height / 2));
    ctx.clip();
    // Layout in the actual texture pixels; no stretching an old layout into a new aspect ratio.
    currentPaint?.(ctx, {width: canvas.width, height: canvas.height,
      anchor(name, x, y) { anchors.set(name, {x, y}); }});
    ctx.restore();
    texture.needsUpdate = true;
  }

  function point(x, y, lift = 0, target = new THREE.Vector3()) {
    target.set((x / canvas.width - 0.5) * width, (0.5 - y / canvas.height) * height, depth / 2 + 0.001 + lift);
    group.updateWorldMatrix(true, false);
    return group.localToWorld(target);
  }

  function anchorPoint(name, lift = 0, target = new THREE.Vector3()) {
    const p = anchors.get(name);
    if (!p) throw new Error(`Unknown UI anchor: ${name}`);
    return point(p.x, p.y, lift, target);
  }

  function resize(nextWidth, nextHeight) {
    if (!(nextWidth > 0 && nextHeight > 0)) throw new Error('Positive dimensions required');
    width = nextWidth; height = nextHeight;
    body.geometry.dispose(); face.geometry.dispose();
    body.geometry = new RoundedBoxGeometry(width, height, depth, 4, Math.min(radius, depth / 2));
    face.geometry = new THREE.PlaneGeometry(width, height);
    redraw();
  }

  function dispose() {
    body.geometry.dispose(); face.geometry.dispose(); texture.dispose(); faceMat.dispose();
    if (ownsBodyMaterial) bodyMat.dispose();
    group.removeFromParent();
  }

  redraw();
  return {group, body, face, canvas, texture, redraw, resize, point, anchorPoint, dispose};
}
