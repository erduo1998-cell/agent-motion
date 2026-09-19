# 把已设计的 UI 带进空间

`scripts/ui-surface.mjs` 是可选的 Three.js 技术适配器，不含界面模板。它把你自己绘制的界面放到受光的实体上，并让操作位置跟随这个实体。宿主提供 THREE 和 RoundedBoxGeometry；不依赖网络。

```js
const panel = createUISurface(THREE, RoundedBoxGeometry, {
  width: 6, height: 4, depth: .14,
  bodyMaterial: yourBodyMaterial,
  paint(ctx, layout) {
    // 用实际文案、字体、你自己的布局绘制背景、文字和控件。
    drawYourInterface(ctx, layout.width, layout.height);
    layout.anchor('play', yourPlayX, yourPlayY);
  }
});
scene.add(panel.group);
// 手势与被操作对象用同一位置来源。光标可以是3D对象，或将这个世界点投影到屏幕。
cursor.position.copy(panel.anchorPoint('play', .02));
```

`redraw(paint)` 更新内容；`resize(width,height)` 在新比例上重新绘制，不拉伸文字；`point(x,y)` 将纹理像素位置映射到世界；`anchorPoint(name)` 获得绘制时登记的操作位置。异步字体先等待加载，再绘制。

界面发光与材质受光是不同的选择：屏幕可用自发光成分，纸或印刷面通常受外部光影响。适配器默认受光表面，具体材料、深度、边缘和照明由作者决定。

多个面板可以组成有层级的系统；独立操作部件也可以自己创建。把每个元素都拆成悬浮板不是目的。选择哪些对象应分离、怎样显出边缘以及镜头为什么靠近，依然依靠本片的操作和表达。

使用后实际检查交付画幅中的面、字与操作点。坐标正确不代表材质、取景和连续性已成立；正视且暗到没有侧边的盒子，仍可能被看成平面。
