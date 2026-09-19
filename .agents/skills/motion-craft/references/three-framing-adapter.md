# Three.js：把实际对象放进选定画幅

[`scripts/three-frame.mjs`](../scripts/three-frame.mjs) 是可直接复制到项目的单文件适配器：包含构图数学和薄的 Three.js 接口，没有外部 import。它不提供影片、模型、材质或艺术参数；`THREE` 由当前工程传入。

新建对称透视镜头、且方案指定了主体的屏幕位置/占幅时，优先使用这个短接口，避免重新手写世界距离与 lookAt。相机须为 `PerspectiveCamera`、`zoom=1`、`filmOffset=0`、无 viewOffset，挂在未变换的场景根层。已有特殊镜头/原生时间系统沿用宿主等价方式，不为该工具重建工程。

```js
import { fitObjectsToFrame } from './three-frame.mjs';
function renderAt(t) {
  updateContentTransforms(t);
  const shot = framingEventAt(t); // 包含实际 objects、rect、viewFrom，以及落定保持区间
  fitObjectsToFrame({ THREE, camera, objects: shot.objects,
    rect: shot.rect, viewFrom: shot.viewFrom });
  renderer.render(scene, camera);
}
```

- `objects`：真正需要看的 Object3D 子树数组，例如具体部件或完整主体，不加入地面、全场景与屏幕注释。
- `rect`：归一化屏幕框 `{x,y,w,h}`，原点左上。由导演分区与实际内容决定，不是工具的艺术默认值。
- `viewFrom`：从目标朝观察者的方向 `[x,y,z]`。它决定观察角度，距离交给实际几何求解。`worldUp` 可选，默认 `[0,1,0]`。

`frameObjectPose(args)` 只求解；`applyFramePose(camera,pose)` 应用保存的落点；`fitObjectsToFrame(args)` 连续完成两者。求解读取当前世界 Box3 八角点，更新父级/自身变换后调用。结果位置、up、target 要一起使用，不能随后又把相机 lookAt 改回对象中心。

需要相机移动时，先选择状态保持和过渡区间，再对取景框与观察角度进行相应求值；关键近景不能只是时间零一个马上离开的端点。也可以在指定内容状态下预求 pose，按现有时间线插值，落点使用原 pose。相机与内容怎样配合由影片决定，适配器不创建循环或接管时间系统。

世界轴对齐 Box3 对旋转物体是保守边界，因此可能留出额外余量。矩形控制取景，不创建裁切遮罩。若要极近局部，应选实际局部，不能把整个模型塞进框后声称是细节镜头。
