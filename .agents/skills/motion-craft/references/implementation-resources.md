# 从可运行资源取得具体能力

## 查找与选择

`scripts/find-motion-resources.py` 只读查找已安装的 `hyperframes-animation` / `hyperframes-motion`、`hyperframes-creative` / `hyperframes-design`。默认查找项目与用户的 Agents、Claude、Gemini 技能目录以及 Codex 配置目录；可用 `--skills-root` 指定项目的技能目录。返回绝对路径和缺失项，不下载或运行外部脚本。

按表达需要选择局部能力，打开真实文件。先理解它负责的关系，再使用当前宿主的技术合同。参考中的固定文案、装饰、字号、色板、时长和场景顺序都不是本片默认值。找到文件仅证明资源存在；代码可运行、画面可用和审美好是三个不同判断。

| 当前需要 | 关注参考中的关系 | 改编时要保留或重新求解的内容 |
| --- | --- | --- |
| UI 点击与确认 | 输入到达、目标受力、释放、结果出现的因果顺序 | 接触点按真实目标求取；装饰性点击不能替代真实状态变化；反馈性格由产品决定 |
| 列表项展开成详情 | 同一内容的身份、容器变化、内容重新布局与接管时机 | 保护文字字形；源/目标宽高比变化时不能只放大整张含字贴图；相机变化要重新考虑屏幕投影 |
| 镜头跟随阅读位置 | 初始观察与跟随阶段怎样在边界接上 | 使用实际字形或部件的边界；父层与子层变换不可混用；不要独立猜测相机和目标的路径 |
| 中英动字与快闪 | 词组切换、重音位置、遮罩、停顿和节奏中的重复线索 | 重算当前语言的分组、字面、宽度与阅读时段；不要逐字套用英语打字速度 |
| 场景接力 | 出去的东西如何引出进来的东西 | 继承实际对象、轮廓或运动；决定剪切、遮挡、光变或对象接管，而非默认整页切换 |

在 Three.js 中，优先取用这里的动作关系，结合项目的原生相机、对象层级、纹理与材质实现。CSS 的仿透视例子并不能证明实体材质或三维受光已经成立。AE、Blender 同理，沿用原生父子关系、遮罩、约束和曲线。

## 交给另一位作者时

传递当前内容、完整上下文、可用素材、宿主入口和已经选中的资源路径。设计尚未决定的地方留给作者；已经由用户确定的品牌或内容不要在交接中丢失。首稿测试可以开放共享工具与参考库，同时隔离其他作者和历史答案；不必为了隔离把成熟资源一起屏蔽。

如果资源查找不到，明确缺失并按现有引擎实现，不假称已经使用范例。下面的上游索引也可用于理解机制；按项目许可使用资源，不把示例或别人生成的作品当作自己的测试结果。

## 研究来源

本增补从 auto-motion 的调用流程、HyperFrames 技能与范例组织方式提炼，文字为本项目重新撰写；不复制上游的固定配额、字体禁用名单或调度脚本。上游固定于提交 `17ead629d010f7e5495f645d46fafd6876482c32`。

- [单镜头任务与素材规则](https://github.com/vibe-motion/auto-motion/blob/17ead629d010f7e5495f645d46fafd6876482c32/exampleFolder/run-claude-ai.sh)
- [动作规则与范例入口](https://github.com/vibe-motion/auto-motion/blob/17ead629d010f7e5495f645d46fafd6876482c32/exampleFolder/.claude/skills/hyperframes-motion/SKILL.md)
- [先布局再进入的构建方法](https://github.com/vibe-motion/auto-motion/blob/17ead629d010f7e5495f645d46fafd6876482c32/exampleFolder/.claude/skills/general-video/SKILL.md)
- [字体选择与实现资料](https://github.com/vibe-motion/auto-motion/blob/17ead629d010f7e5495f645d46fafd6876482c32/exampleFolder/.claude/skills/hyperframes-design/references/typography.md)
