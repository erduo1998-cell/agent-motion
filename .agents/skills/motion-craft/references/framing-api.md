# Frame math：跨引擎构图算子

`frame-math.mjs` 是零依赖 ES module。它只计算构图与 rig 状态，不生成影片、不绑定渲染循环，也不规定所有动画都要缩放。先决定每个画幅的排版、视觉主体与允许的裁切，再在需要的状态上求解。

## 2D：实际内容 bounds → 屏幕区域

```js
import { fitRectTransform, sampleRigKeyframes } from '../scripts/frame-math.mjs';

const fit = fitRectTransform({
  bounds: { x: 120, y: -40, w: 640, h: 240 }, // rig 本地坐标内的真实内容边界
  viewport: { w: 1080, h: 1920 },             // 完整输出画幅，像素；可带 x/y 原点
  rect: { x: 0.08, y: 0.2, w: 0.84, h: 0.45 }, // 屏幕局部视窗
  mode: 'contain',                          // 或 cover：有意填满并裁切
  align: { x: 0.5, y: 0.5 },
  maxScale: 2,
});
// screenX = sourceX * fit.scale + fit.tx；screenY 同理。
// CSS 使用 transform-origin: 0 0，matrix(scale, 0, 0, scale, tx, ty)。
```

`rect` 采用完整 viewport 的归一化坐标：左上角 `(0,0)`，右下角 `(1,1)`，y 向下。它是可放主体的局部区域，例如避开字幕后的上半屏；不能把完整舞台空白当作实际内容 bounds。输出含 `targetRect`、`mappedBounds`、逆映射的 `sourceWindow`。`sourceWindow` 未与内容边界求交，在 contain 时可能大于内容。

`contain` 保留全部指定 bounds；`cover` 可裁掉区域外内容，需宿主的 mask、overflow 或 scissor 实施裁切。`maxScale` 是硬上限：它可能令 cover 无法填满，此时 `limitedByMaxScale=true`、`coversTarget=false`。rect 本身不会设置裁切。宽高必须大于零。

同一个语义状态换画幅时，更换完整 viewport 与适合该画幅的 rect 后重新求 fit；若布局已改变，也重新测量真实 bounds。不要仅按输出宽度比例缩放整个原始舞台。局部特写可传局部对象 bounds，允许其余内容出画。

## Rig：关键状态之间平移、缩放

```js
const state = sampleRigKeyframes([
  { time: 0, scale: 1, tx: 0, ty: 0, ease: 'smoothstep' },
  { time: 2, scale: fit.scale, tx: fit.tx, ty: fit.ty },
], timeInSeconds);
```

状态是 `{scale, tx, ty}`，scale 必须大于零。`interpolateRig(a,b,t,{ease})` 在 log-space 插值 scale，平移线性插值，再整体应用 easing。内置 `linear`、`smoothstep`、`smootherstep`，也接受返回 `[0,1]` 的函数；输入与 easing 结果会 clamp。关键帧时间严格递增，区间采用起始关键帧的 ease，时间范围外保持端点。它是绝对时间采样，可 seek；无需逐帧累加。各关键状态应在同一 source 坐标系中，插值过程不会自动重新排版或保证中间帧不跨越字幕区。

## 3D：真实逐点透视构图

```js
import { solvePerspectiveFraming } from '../scripts/frame-math.mjs';

const framing = solvePerspectiveFraming({
  points: worldBoundsCorners, // 世界坐标 [x,y,z][]，通常为实际包围盒的 8 个角
  // fitIndices: [0, 1, 2, 3], // 可选：仅保证所选局部点入画
  basis: { right: [1,0,0], up: [0,1,0], forward: [0,0,-1] },
  verticalFov: 40 * Math.PI / 180,
  aspect: outputWidth / outputHeight, // 完整画幅宽高比，不是 rect 的宽高比
  rect: { x: 0.08, y: 0.15, w: 0.84, h: 0.6 },
  near: 0.1,
});
// Three-like adapter：把 position / up 写入相机，再 lookAt(...target)。
// 同时采用输入的 FOV、aspect、near；far 应大于 framing.depthRange.far。
```

`forward` 从相机指向场景，basis 必须正交且 `right × up = -forward`，函数会归一化长度。固定方向与 FOV，通过后退及相机平面内平移，把指定点投进 rect。必须一起采用返回的 `position`、`target`、`up`；再次看向原始对象中心会改变求解所用方向。输出 `lateralShift.x/y` 是沿 right/up 的世界单位平移，并非镜头偏移或归一化 screen shift。`anchor` 可选，默认所选点的世界 AABB 中心；`distance` 是相机到经过 anchor 的相机平行平面的距离，`minDistance` 默认 near 且必须大于零。

对于点在相机方向坐标系内的 `(u,v,z)`，其真实深度是 `distance + z`。每条屏幕边都产生对相机平移的线性约束；求交直接得到满足全部点与 near 的最小后退距离。输出还含 `projectedRect`、`depthRange`、`fittedIndices`。因此细长盒体、极宽或极窄画幅、偏置区域与前后深度差都参与求解。

保证只覆盖指定点及其凸包：若 8 个角包围了真实内容，则盒内边与面也入画。动画变形后的内容须更新边界；稀疏采样不代表未采到的几何。用 fitIndices 聚焦局部时，未选点可能被裁切或落在 near 后方，这是允许局部特写的明确选择。若需要更松的构图，把 rect 留出边距；边界解可能刚好接触视窗或 near，实际渲染宜留少量余量。

## 数值验证

```sh
node scripts/test-frame-math.mjs
```

测试独立从返回的世界相机位置重投影，覆盖已知 8 角盒体的解析距离、逐点深度、旋转方向、偏置 rect、自定义 anchor、1:100 / 100:1 画幅、指定局部点、64 组确定性点云，以及 2D contain / cover / 最大缩放与 log-scale 插值。
