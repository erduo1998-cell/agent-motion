# 来源与证据边界

研究访问日期：2026-09-13。共采用 30 个公开页面，包含软件官方文档、官方设计体系、机构教育资料和原始实践者采访。它们不是同一种证据，也不共同构成一个行业认证标准。

本 Skill 的“触发—动作—验证—修复—例外”结构、跨镜头记录、屏幕占位诊断、语言与声音路由是综合推导；来源支持其中的基础概念，不代表来源提出了同样的整套法则。没有开展跨引擎成片对照实验。网页中的嵌入视频/动态图没有逐一播放，不能把其观感当已验证证据。

## 排版与文字

| 编号 | 来源 | 实读范围与采用边界 |
|---|---|---|
| LAY-A | Adobe：[What makes a great layout?](https://www.adobe.com/learn/illustrator/web/layout-basics) | 阅读 7 项布局原则正文：主次、对齐、留白、分组等。它讨论静态布局；运动中的占位检查是本 Skill 扩展。 |
| LAY-B | IBM：[Type basics](https://www.ibm.com/design/language/typography/type-basics/) | 阅读 Tracking、Leading、Alignment、Comfortable reading、容器行长及标题部分。Plex、全左齐等属于品牌体例，不作为中文/视频通则。 |
| LAY-C | Nielsen Norman Group：[The Principle of Common Region](https://www.nngroup.com/articles/common-region/) | 阅读正文的分组及容器过度使用分析；属于作者的设计分析，未读其引用的 Palmer 原始论文。用于区分有效分组和多余边框。 |
| LAY-D | Adobe：[Modifying and using views](https://helpx.adobe.com/ca/after-effects/desktop/view-and-preview/preview-video-and-audio/modifying-using-views.html) | 阅读 3D view、Resolution、Safe zones 相关段落。传统电视 title/action safe 的比例不移植为所有平台规格。 |
| LAY-E | W3C：[Understanding SC 1.4.3 — Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | 阅读 criterion、例外及 rationale。是 WCAG 2.2 的解释材料；仅在相关网页 UI/可访问性任务中适用，不是通用美学分数。 |
| LANG-A | W3C：[Requirements for Chinese Text Layout / 中文排版需求](https://www.w3.org/TR/clreq/) | 读取文档状态、6.1 禁则/西文断行、6.2 行内调整、6.3.3 混排、6.4 字面等部分。访问时为 2026-09-01 Group Note Draft，尚非正式 W3C 推荐标准。书籍规则不能整套照搬到短视频。 |
| LANG-B | W3C Internationalization：[Approaches to line breaking](https://www.w3.org/International/articles/typography/linebreak.en.html) | 阅读按词、音节和字符断行的比较与标点处理。说明语言差异，不提供视频阅读速度阈值。 |
| LANG-C | Adobe：[New Pan-CJK Font Release: Source Han Sans 2.0](https://blog.adobe.com/en/publish/2018/11/19/new-pan-cjk-font-source-han-sans-2-0) | 阅读地区文字支持与字形设计说明。用来提醒语言/地区字形核实，不推荐旧版本、不宣称已检查用户本地字体。 |
| LANG-D | Unicode：[UAX #29 — Unicode Text Segmentation](https://www.unicode.org/reports/tr29/) | 阅读 Introduction、Conformance 与 Grapheme Cluster Boundaries 开头。字素不总等于单一代码点，中文分词还需语言机制；字形/语义编舞不能简化为编码拆分。 |

中文源中关于混排的间距示例不是所有字体统一的必填值。中英文视觉字号、语义分组的动效单位、译文重新计时，是本 Skill 面向视频的应用判断。

## 运动、编舞与转场

| 编号 | 来源 | 实读范围与采用边界 |
|---|---|---|
| MO-A | Adobe：[Speed — Apply and control speed changes](https://helpx.adobe.com/after-effects/desktop/animate-in-after-effects/speed-between-keyframes/speed.html) | 阅读速度图、路径点、入/出速度、Easy Ease、roving keyframes。用于区分 timing/spacing 与连续穿越；具体控制项属于 AE。 |
| MO-B | Carbon：[Motion overview](https://carbondesignsystem.com/elements/motion/overview/) | 阅读 Style、Easing、Duration、strategy、evaluation 和 adaptive motion。UI 毫秒 tokens、禁弹跳偏好不扩成视频法则。 |
| MO-C | Carbon：[Motion choreography](https://carbondesignsystem.com/elements/motion/choreography/) | 阅读 Paths、semantic/spatial consistency、Continuity、sequence/stagger。语义一致可迁移；网格方向及错峰数字依原场景。 |
| MO-D | Material Design v1：[Choreography](https://m1.material.io/motion/choreography.html) | 阅读共享元素、Continuity、Layout awareness、Creation。此为旧版官方归档，不代表当前 Material 3 全部规范。 |
| MO-E | IBM：[Classic principles](https://www.ibm.com/design/language/animation/classic-principles/) | 阅读十二项图形动画迁移说明。是品牌应用案例，不是 Disney 原著。 |
| MO-F | IBM：[Tips and techniques](https://www.ibm.com/design/language/animation/tips-and-techniques/) | 阅读 Attention、Visual clarity、Physicality、Structure、Type 等正文。焦点、节奏与中间构图可迁移；24fps、单轴和字形偏好属于该品牌指导。 |
| MO-G | Adobe / Sheena Lyonnais：[Redesigning the 12 Principles of Animation for Motion Design](https://blog.adobe.com/en/publish/2016/11/08/redesigning-the-12-principles-of-animation-for-motion-design) | 实读对 Issara Willenskomer 的原始采访，关于角色与交互设计目标差别。属于实践者观点；不采纳所有动效都应缓动的绝对说法。 |
| MO-H | Adobe：[Understanding the 12 principles of animation](https://www.adobe.com/creativecloud/animation/discover/principles-of-animation.html) | 实读 History 与十二项解释/FAQ。是官方教育摘要，未阅读 Johnston/Thomas 的 1981 年原著；迁移表不冒充原著译文。 |

无音乐节奏、口播与配乐优先级、后加音乐的弹性窗口，是在编舞和理解顺序之上综合提出的工作方法，未宣称上述来源给出了统一音画算法。未读到正文的 Material 3 页面不作为证据。

## 空间、镜头与引擎

| 编号 | 来源 | 实读范围与采用边界 |
|---|---|---|
| SP-A | Adobe：[Cameras, lights, and points of interest](https://helpx.adobe.com/after-effects/desktop/work-with-layers/camera-layer/cameras-lights-points-interest.html) | 阅读 Camera settings、Active Camera、单/双节点、取景、景深和光源。未把 beta 或特定渲染器能力泛化。 |
| SP-B | Adobe：[Use 3D layers in After Effects](https://helpx.adobe.com/mena_en/after-effects/desktop/work-with-layers/3d-layers/3d-layers.html) | 阅读 3D overview、轴空间、Orientation/Rotation、图层交互。普通 3D 图层仍可为平面；混合 2D 层/预合成有交互边界。 |
| SP-C | Adobe Animate：[Layer depth and Camera Z-depth](https://helpx.adobe.com/animate/desktop/using/layer-depth.html) | 阅读 Layer depth、Maintain size、Parallax。Animate 工具命名不直接等同真实摄影术语。 |
| SP-D | Blender：[Cameras — Blender 4.3 Manual](https://docs.blender.org/manual/en/4.3/render/cameras.html) | 通过检索工具提供的多段官方正文读取 Lens、投影、裁切、DOF、Sensor、Safe Areas。直接站点访问受限，未查看图片；本机版本未核实。 |
| SP-E | Adobe：[Channel the 180-degree rule for compelling cinematography](https://www.adobe.com/creativecloud/video/discover/what-is-the-180-degree-rule.html) | 阅读轴线、同侧机位及有意越轴。主要为影视摄影指导；MG 的空间方向迁移是本 Skill 推导。 |
| SP-F | Bucknell University ENFS-340：[The Language of Movement](https://practicumfall2018.blogs.bucknell.edu/lesson-6-1-the-language-of-movement/) | 阅读相机运动分类、Motivated/Unmotivated Movement。相机可跟随动作，也可揭示环境或情绪；未播放内嵌电影片段。 |
| SP-G | Three.js：[PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html) | 阅读构造器、fov/aspect/near/far、焦距与投影更新。普通相机不等于已配置景深管线。 |
| SP-H | Three.js：[OrthographicCamera](https://threejs.org/docs/pages/OrthographicCamera.html) | 阅读距离与投影尺寸关系、frustum、zoom、投影更新。用于明确正交视图的适用边界。 |
| SP-I | Three.js：[Shadows](https://threejs.org/manual/en/shadows.html) | 检索工具提供的官方正文：shadow maps、fake shadows、投射/接收、阴影覆盖。直接旧地址返回 404；只据所读正文做概念核验，接口需对照项目版本。 |
| ENGINE-V | Three.js：[Vector3 — project](https://threejs.org/docs/pages/Vector3.html#project) | 阅读 world→NDC 投影定义。投影锚点可见不证明对象全部可见，全时段占位是本 Skill 工程推导。 |
| ENGINE-I | Adobe：[Keyframe interpolation](https://helpx.adobe.com/after-effects/desktop/animate-in-after-effects/animation-keyframes/keyframe-interpolation.html) | 阅读时间与空间插值、线性及自动曲线路径相关说明。用于纠正“直路径等于僵硬速度”的混淆。 |
| ENGINE-M | Three.js：[AnimationMixer — setTime](https://threejs.org/docs/pages/AnimationMixer.html#setTime) | 阅读时间定位与 timeScale 作用。只涉及 mixer 动画，不保证粒子、模拟、后处理均可任意跳帧。 |
| ENGINE-B | Blender 5.0：[Simulation Zone](https://docs.blender.org/manual/en/5.0/modeling/geometry_nodes/simulation/simulation_zone.html) | 阅读模拟缓存与 Baking。可用烘焙支持非顺序帧输出；接口与缓存方式依项目版本。 |

## 表现力与连续叙事补充

以下补充来源于 2026-09-13 修订研究。已读取作者正文，未播放内嵌视频；BUCK、Ordinary Folk 的图片读取未成功，因此不声称完成了这些案例的画面或动态分析。

| 编号 | 来源 | 实读范围与采用边界 |
|---|---|---|
| CRAFT-A | BUCK：[Comfy Brand Refresh](https://buck.co/work/comfy-brand-refresh) | 作者将节点、模块和控制联系到连接、分离、扩张、重组。关系驱动构思为本 Skill 综合，非通用模板。 |
| CRAFT-B | Ordinary Folk：[Small Steps](https://www.ordinaryfolk.co/project/small-steps) | 作者说明一个点贯穿作品的叙事。身份接力方法据此及既有连续性资料综合，不冒充观看分析。 |
| CRAFT-C | School of Motion / Justin Peterson：[Show-stopping Sports Mograph](https://schoolofmotion.com/blog/how-to-design-show-stopping-sports-mograph) | 阅读作者正文和逐时转录，包含低机位广角与平视比较。体育包装的强度不是所有场景的统一要求。 |
| CRAFT-D | School of Motion：[Six Essential Motion Design Transitions](https://schoolofmotion.com/blog/six-essential-motion-design-transitions-tutorial) | 阅读形状匹配、动作匹配、穿入、变形等说明。把它们组织为事件关系和代码身份依赖，是本 Skill 的实现方法。 |
| CRAFT-E | Adobe：[Formatting characters](https://helpx.adobe.com/after-effects/desktop/add-text/formatting-characters-and-paragraphs/formatting-characters-character-panel.html) | 阅读 kerning、tracking、leading 与 CJK tsume。字形排版约束不等于动态编舞方案。 |

`composition-rig.md`、`screen-score.md` 和构图脚本是根据实际独立初稿失效现象建立的工作方法与数学实现；它们不是上述作者发布的规则，不宣称审美保证。

## 使用证据时不要越界

- 将“官方软件机制”“品牌体例”“实践者意见”“本 Skill 推导”分开。官方来源也可能含有只针对自己品牌的偏好。
- 35 个来源不代表 35 项独立实证实验。此包的结构检查和场景演练也不证明所有引擎的成片质量一定提升。
- 实作时只为当前技术问题复核相关官方文档，不要求每次联网重读全部来源。
- 继续保留现有项目授权与实现契约；通用设计资料不授予付费生成、发布或修改无关项目的权限。
