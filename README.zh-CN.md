# Agent Motion

**让智能体，把口播做成动效视频。** 原片 + 完整 SRT + 制作要求 → MP4 + 可编辑 Three.js 工程。

[看效果](#demos) · [开始使用](#start) · [制作方法](#workflow) · [兼容性](#compatibility)

[English](README.md) · **简体中文** · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md)

<p align="center">
  <img src="docs/images/agent-motion-cover-zh-CN.png" alt="Agent Motion：让口播里的想法，成为看得见的画面" width="620">
</p>

<a id="demos"></a>

## 看效果

**绿化，看见品质** · 60 秒 · 左侧原片 / 右侧成片

<p align="center">
  <img src="docs/media/greening.gif" alt="绿化看品质：左侧原片，右侧动效成片" width="620">
</p>

<p align="center"><a href="docs/media/greening.mp4">观看更清晰的 MP4</a></p>

<details>
<summary><strong>混能训练</strong> · 展开 60 秒对比</summary>

<p align="center">
  <img src="docs/media/hybrid-opening.gif" alt="混能训练：左侧原片，右侧动效成片" width="620">
</p>

<p align="center"><a href="docs/media/hybrid-opening.mp4">观看更清晰的 MP4</a></p>

</details>

<details>
<summary><strong>家校沟通</strong> · 展开 60 秒对比</summary>

<p align="center">
  <img src="docs/media/communication.gif" alt="家校沟通：左侧原片，右侧动效成片" width="620">
</p>

<p align="center"><a href="docs/media/communication.mp4">观看更清晰的 MP4</a></p>

</details>

三个示例均为作者认可的成片，左右原时码对应；人物面部做跟踪柔边模糊，预览无声。[版本、选段与检查范围](docs/demo-evidence.md)

<a id="start"></a>

## 开始使用

**1. 安装环境**

准备 Node.js 22+、Python 3.10+、FFmpeg / ffprobe，并配置到 PATH。以下命令适用于 PowerShell 与 POSIX 终端；setup 会下载 Chromium。

```sh
git clone https://github.com/erduo1998-cell/agent-motion.git
cd agent-motion
npm ci
npm run setup
npm run doctor
```

**2. 交给智能体**

把原片和完整 SRT 放进 `inputs/`，用你熟悉的编程智能体打开项目目录，发送：

> 先读 AGENTS.md 和本项目两个本地 Skill。根据 inputs/source.mp4 与 inputs/source.srt 完成口播视频动效包装，保留原口播顺序和时间。在 work/my-first-film/ 制作，完成各阶段和实际成片检查，交付 MP4 及可编辑工程。

**3. 查看结果**

运行 `npm run serve`，打开智能体创建的影片页面 [work/my-first-film/](http://127.0.0.1:8793/work/my-first-film/)。服务根地址没有预设成片。

<details>
<summary>验证安装与渲染</summary>

```sh
npm test
npm run smoke
```

Smoke 会完成一次真实 Three.js → H.264 渲染。安装和验证不调用付费生成服务；可选生图、抠像按可用工具及许可配置。

</details>

<a id="workflow"></a>

## 制作方法

先读完整字幕，梳理内容；再依次完成素材与人物层、字体与空间、连续动画、声音、检查与修复。

<p align="center">
  <img src="docs/images/production-flow-zh-CN.png" alt="原片、完整字幕与要求经过内容分析和五个制作阶段，输出 MP4 与可编辑工程" width="940">
</p>

同一位连续作者先做通开场与最难关系段，再扩展整片。智能体逐阶段读取规则，保留口播时序，并检查实际画面与声音。

<details>
<summary>设计原则：语义、人物、排版与连续运动</summary>

<p align="center">
  <img src="docs/images/design-system-zh-CN.png" alt="语义先行、人物进入空间、排版各有角色、运动保持连续" width="940">
</p>

- **语义先行**：动作解释口播含义，证据与原时间保持准确。
- **人物进入空间**：同步人物层、可见纵深与二次取景；仅在替换原背景时描边。
- **排版各有角色**：在真实构图里比较字体，建立主次、可读落点与阅读时间。
- **运动保持连续**：让对象与视线接住下一层意思，先验证连续样段，再扩展全片。

</details>

<a id="compatibility"></a>

## 兼容性

**智能体**：Codex、Claude Code、Gemini CLI、Cursor、GitHub Copilot 均有入口，共用本地 Skill。其他智能体可直接读取 `AGENTS.md`。核心不依赖 Codex 专属 API，宿主需支持文件、终端、浏览器与实际视听检查。

**系统**：Windows、macOS、Ubuntu × Node 22/24，六项 CI 均通过安装、测试及真实渲染。完整影片已有 Codex 制作记录；其他客户端尚未逐一完成整片验证。[兼容性与实测证据](docs/compatibility.md)

## 进一步了解

- [项目结构](docs/architecture.md) — 两个 Skill、工具链与文件分工。
- [参考分析库](reference-library/analysis/README.md) — 43 个案例、109 个机制时间窗、5 组教程方法；只提供文字 / JSON，不包含借鉴原片、音频、抽帧或完整转写。
- [参与维护](CONTRIBUTING.md) — 修改与验证方式。

README 提供五种语言，正式 Skill 以中文维护。智能体可按你的语言工作；成片需核对字库、字形、分行与阅读时间，不含自动配音翻译。

## 使用许可

**非商业使用；未经事先书面授权，不得商用。**

项目自有代码、Skill、文档和分析采用 **Motion Craft Community License 1.0**，基于 Apache-2.0 条款增加非商业限制，属于自定义许可。字体与依赖保留原许可，Demo 素材不另授权。

[完整许可证](LICENSE) · [商业授权](COMMERCIAL-LICENSE.md) · [第三方说明](THIRD_PARTY_NOTICES.md)
