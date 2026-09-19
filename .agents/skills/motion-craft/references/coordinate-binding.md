# 把构图事件接到真实相机

事件格式统一为 `{time, focusIds, targetRect}`；`targetRect` 是完整输出画幅中的归一化矩形。它必须进入每个落定 pose 的求解。对象表只登记可作为主体的实际图形或 mesh；focusIds 选谁，就测谁，不追加全部标题、陪衬框或舞台根节点。

**构建顺序：**先确定输出画幅并排版内容 → 等字体完成，单独换行、测量字幕层，把实测占位用于制定事件 targetRect → 测量 focusIds 对应的内容 → 求每个落定 pose → 接绝对时间采样或逐帧重算 → 渲染。真实口播字幕和固定说明放在相机 rig 外的屏幕层，尺寸和位置独立处理。主句若承担动字/图形内容，则登记在内容节点中参与构图和接力；不能把所有中文都误分成固定字幕。这些步骤属于正常构建，不等画面出错后才补。

## 2D：静态内容先求 keys，再插值 parent matrix

以下使用 SVG 的真实几何 bounds；`rig` 是 SVG 根节点的直接子 `<g>`，`nodes` 是 `Map<id, SVGGraphicsElement>`，只映射需要构图的内容节点。根 SVG 的 viewBox 与输出像素坐标一致。测量时对象保持参与布局，可用 opacity:0 隐藏，不用 display:none 导致零尺寸。图形有粗描边、阴影等超出几何的绘制范围时，应在测量处加入实际外扩量。字幕是 rig 外的独立 HTML/SVG 层。

```js
import { fitRectTransform, sampleRigKeyframes } from '../scripts/frame-math.mjs';

await document.fonts.ready; // 此前完成布局；此前也已由字幕实测占位确定 targetRect
svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

function focusBounds(ids) {
  if (!ids.length) throw new Error('focusIds cannot be empty');
  const toRig = rig.getCTM().inverse();
  const points = ids.flatMap(id => {
    const node = nodes.get(id);
    if (!node || node === rig || !rig.contains(node)) throw new Error(`Invalid focus: ${id}`);
    const b = node.getBBox(); // 实际被选节点，不是设计画布或外层装饰框
    const m = toRig.multiply(node.getCTM());
    return [[b.x,b.y], [b.x+b.width,b.y], [b.x,b.y+b.height], [b.x+b.width,b.y+b.height]]
      .map(([x,y]) => new DOMPoint(x,y).matrixTransform(m));
  });
  const xs = points.map(p => p.x), ys = points.map(p => p.y);
  const x = Math.min(...xs), y = Math.min(...ys);
  return { x, y, w: Math.max(...xs)-x, h: Math.max(...ys)-y };
}

const keys = events.map(e => ({
  time: e.time,
  ...fitRectTransform({
    bounds: focusBounds(e.focusIds), viewport: {w: W, h: H},
    rect: e.targetRect, mode: 'contain', // 这里实际消费事件 rect
  }),
}));

function renderCamera2D(time) {
  const {scale: s, tx, ty} = sampleRigKeyframes(keys, time);
  rig.setAttribute('transform', `matrix(${s} 0 0 ${s} ${tx} ${ty})`);
}
```

上述 keys 保证各落定时刻满足对应 bounds/rect；中间是镜头过渡，不保证始终贴合目标框。若内容在区间内变形或重新排版，应在内容更新后重新运行 `focusBounds → fitRectTransform`，直接应用当帧矩阵，不能继续使用旧 keys。局部特写只选择该局部；需要有意裁切时改用 cover，并在宿主设置相应裁切区域。不要再叠加手写的 `scale: 1.02` 或额外镜头偏移。

## 3D：动态内容更新后，逐帧求真正的透视 pose

以下接 Three-like 场景；相机挂在无变换根节点，使用标准对称透视投影。`objects` 是 `Map<id, Object3D>`，登记当前可见的实际内容对象；如登记组，其子树必须只包含该语义主体。未选陪衬不会混入 bounds。方向 basis 只在初始化取一次；相机后续平移不会改变它。

```js
import { solvePerspectiveFraming } from '../scripts/frame-math.mjs';

camera.zoom = 1; camera.filmOffset = 0; camera.clearViewOffset();
camera.updateWorldMatrix(true, false);
const q = camera.getWorldQuaternion(new THREE.Quaternion());
const axis = (x,y,z) => new THREE.Vector3(x,y,z).applyQuaternion(q).toArray();
const basis = {right: axis(1,0,0), up: axis(0,1,0), forward: axis(0,0,-1)};

function applyEvent3D(e, W, H) { // 在该帧内容动画更新后调用
  const points = e.focusIds.flatMap(id => {
    const object = objects.get(id);
    if (!object) throw new Error(`Invalid focus: ${id}`);
    object.updateWorldMatrix(true, true);
    const b = new THREE.Box3().setFromObject(object, true); // 更新后的世界 bounds
    if (b.isEmpty()) throw new Error(`Empty focus: ${id}`);
    const corners = [];
    for (const x of [b.min.x,b.max.x])
      for (const y of [b.min.y,b.max.y])
        for (const z of [b.min.z,b.max.z]) corners.push([x,y,z]);
    return corners;
  });
  const p = solvePerspectiveFraming({
    points, basis, verticalFov: camera.fov * Math.PI / 180,
    aspect: W/H, rect: e.targetRect, near: camera.near,
  });
  camera.position.fromArray(p.position);
  camera.up.fromArray(p.up);
  camera.lookAt(...p.target); // 必须用返回 target，不能再次看向对象原始中心
  camera.aspect = W/H;
  camera.far = Math.max(camera.far, p.depthRange.far + 1);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld(true);
}

// 每帧顺序：updateContentAt(time) → applyEvent3D(eventAt(time), W, H) → renderer.render(...)
```

`eventAt(time)` 必须在落定时刻返回事件原值；过渡期间可插值 targetRect，再交给上述实时求解。focusIds 在预设事件边界切换，或明确选择过渡期间的主体，不能自动并入整个场景。若改为缓存 3D keys，则在对应的内容状态下先求每个 pose，再用同一进度插值 position 与 target；只保证落定 pose 的构图，中间不再是实时 fit。两种模式选其一，避免插值结果被旧求解或额外手写位移覆盖。

需要改变观察角度时，每个事件可以提供 orientation；用该姿态构造正交 basis 再求解。过渡姿态用四元数 slerp，不能对三个基向量直接逐分量混合后当作正交相机。固定方向示例只演示最短接线，不要求全片固定角度。
