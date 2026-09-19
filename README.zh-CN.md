![Agent Motion — Three.js talking-head films](docs/images/agent-motion-cover.png)

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md)

[作品对比](#demos) · [制作流程](#workflow) · [开始使用](#start)

**让口播里的想法，成为看得见的画面。**

把原片、完整 SRT 和制作要求交给智能体。Agent Motion 完成内容分析、动效包装与成片检查，交付 **MP4 + 可编辑 Three.js 工程**。

<sub>非商业使用；商用须事先取得书面授权。 <a href="LICENSE">许可证 ↗</a></sub>

<a id="demos"></a>

## 看见前后的变化

### 01 / 绿化，看见品质

**60 秒 · 左边原片，右边成片。** 两侧原时码同步对应，人物面部采用贴合脸部的跟踪柔边模糊。预览无声。

<p align="center">
  <img src="docs/media/greening.gif" alt="绿化看品质：左侧原片，右侧动效成片" width="620">
</p>

<p align="center"><strong><a href="docs/media/greening.mp4">观看 / 下载更清晰的 MP4 ↗</a></strong></p>

#### 再看两种表达

<details>

<summary><strong>02 / 混能训练</strong> — 展开一分钟对比</summary>

<p align="center">
  <img src="docs/media/hybrid-opening.gif" alt="02 / 混能训练" width="620">
</p>

<p align="center"><strong><a href="docs/media/hybrid-opening.mp4">观看 / 下载更清晰的 MP4 ↗</a></strong></p>

</details>

<details>

<summary><strong>03 / 家校沟通</strong> — 展开一分钟对比</summary>

<p align="center">
  <img src="docs/media/communication.gif" alt="03 / 家校沟通" width="620">
</p>

<p align="center"><strong><a href="docs/media/communication.mp4">观看 / 下载更清晰的 MP4 ↗</a></strong></p>

</details>

三期均来自作者认可的成片。绿化、混能为按原顺序精选的片段，标有原时码；家校沟通为连续片段。历史示例不代表后来每项 Skill 修订均已回归验证。 [版本、选段与检查范围 →](docs/demo-evidence.md)

<a id="workflow"></a>

## 从一段口播，到一部成片

![原片、完整字幕与要求，依次经过内容分析、素材人物、字体空间、连续动画、声音、检查修复，输出MP4和可编辑工程](docs/images/production-flow.png)

**内容分析 → 素材与人物层 → 字体与空间构图 → 连续动画 → 声音 → 检查与修复。**

智能体逐阶段完整读取规则，先做通开场与最难关系段，再由连续作者扩展整片。保留原口播时序，检查实际画面与声音。安装命令和分页工具支撑制作，成片由智能体执行完成。

### 四个设计原则

![四个设计原则：语义、人物、排版、连续运动](docs/images/design-system.png)

- **语义先行** — 动作解释口播含义，证据与原时间保持准确。
- **人物进入空间** — 同步人物层、可见纵深与二次取景；仅在替换人物原背景时描边。
- **排版各有角色** — 在真实构图里比较字体，建立主次、可读落点与阅读时间。
- **运动保持连续** — 让对象与视线接住下一层意思；先验证连续样段，再扩展全片。

<a id="start"></a>

## 开始使用

准备 **Node.js 22+、Python 3.10+、FFmpeg/ffprobe**，并将后两者配置到 PATH。setup 会下载 Chromium，不调用付费生成服务。以下命令适用于 PowerShell 与 POSIX 终端。

```sh
git clone https://github.com/erduo1998-cell/agent-motion.git
cd agent-motion
npm ci
npm run setup
npm run doctor
npm test
npm run smoke
```

将原片和完整 SRT 放进 `inputs/`，在智能体中打开项目目录，发送：

> 先读 AGENTS.md 和本项目两个本地 Skill。根据 inputs/source.mp4 与 inputs/source.srt 完成口播视频动效包装，保留原口播顺序和时间。在 work/my-first-film/ 独立制作，完成内容分析、素材与人物层、字体和空间构图、连续动画、声音和实际成片检查，交付 MP4 及可编辑工程。

运行 `npm run serve`，打开智能体本次创建的影片页面 `http://127.0.0.1:8793/work/my-first-film/`。服务根地址没有预设成片。

### 用你熟悉的智能体与系统

Codex、Claude Code、Gemini CLI、Cursor、GitHub Copilot 均有项目入口，读取同一套本地 Skill。其他智能体可直接读取 `AGENTS.md`。**核心不依赖 Codex 专属 API。** 宿主需要文件、终端、浏览器与实际视听检查能力。

**Windows · macOS · Ubuntu：工具链已实测。** 三系统 × Node 22/24 共六项 CI 均通过安装、测试、发行检查、浏览器诊断及真实 Three.js → H.264 渲染。 [CI ↗](https://github.com/erduo1998-cell/agent-motion/actions/runs/35433570433)

上述证据验证工具链。完整影片已有 Codex 制作记录；其他客户端入口尚未逐一独立完成整片验证。 [兼容性与实测记录 →](docs/compatibility.md)

## 语言、参考与使用许可

提供五语 README，正式 Skill 统一以中文维护。多语言智能体可以按你的语言工作；输出时仍需核对字库、字形、分行和阅读时间，不包含自动配音翻译。

公开参考库提供 **43 个案例分析、109 个机制时间窗与 5 组教程方法**，仅含文字/JSON 结果，不附原视频、音频、抽帧、缩略图或完整转写。可选生成与抠像根据可用工具及许可准备。 [查看分析结果库 →](reference-library/analysis/README.md)

项目自有代码、Skill、文档与分析采用 **Motion Craft Community License 1.0**：基于 Apache-2.0 条款增加非商业限制的自定义许可，并非标准 Apache-2.0。**未经事先书面授权不得商用。** 字体、依赖保留原许可；Demo 素材不另授权。

[许可证](LICENSE) · [商业授权](COMMERCIAL-LICENSE.md) · [第三方说明](THIRD_PARTY_NOTICES.md)

---

[项目结构](docs/architecture.md) · [参与维护](CONTRIBUTING.md) · [发行准备](docs/release-readiness.md)
