# Agent Motion · Three.js 口播视频动效

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md)

> **未经事先书面授权不得商用。** [许可证](LICENSE) · [参考库仅包含分析参数与结果，不附参考原视频](reference-library/analysis/README.md)

**给智能体一段口播、完整字幕和制作要求，让它完成从内容分析到成片的动效包装。**

Agent Motion 将 SRT 分析、素材与人物层、字体排版、空间构图、连续动画、音效混音和成片检查串成制作流程。底层是 **Three.js**；输出 MP4，并保留可继续修改的场景与工程。

## 原片与成片，直接对比

每张 GIF **一分钟，左边原片、右边成片，原片时间同步对应，两侧人物面部均已打码**。混能与绿化按原时间顺序精选拼接，并标出原时码；家校沟通为连续片段。动图无声，不能用于评价音效与混音。

![混能训练开场：原片与成片](docs/media/hybrid-opening.gif)

![绿化看品质：一分钟原片与成片对比，面部已打码](docs/media/greening.gif)

![老师家校沟通：原片与成片](docs/media/communication.gif)

来自作者明确认可的三期成片：混能训练、家校沟通与绿化看品质。当前 Skill 后续又完善了人物背景、空间和字体规则，展示片不冒充最新版全部规则的回归结果。[查看版本、选段和测试范围](docs/demo-evidence.md)。

## 开始使用

准备 **Node.js 22+、Python 3.10+、FFmpeg/ffprobe 和 Chromium**。进入下载的项目目录执行；setup 下载浏览器，不调用付费生成服务。

```sh
git clone https://github.com/erduo1998-cell/agent-motion.git
cd agent-motion
npm ci
npm run setup
npm run doctor
npm test
npm run smoke
```

把原片和完整 SRT 放入 `inputs/`，在智能体里打开项目目录，然后发送：

> 先读 AGENTS.md 和本项目两个本地 Skill。根据 inputs/source.mp4 与 inputs/source.srt 完成口播视频动效包装，保留原口播顺序和时间。在 work/my-first-film/ 独立制作，完成内容分析、素材与人物层、字体和空间构图、连续动画、声音和实际成片检查，交付 MP4 及可编辑工程。

运行 `npm run serve`，打开 `http://127.0.0.1:8793/work/my-first-film/` 查看智能体在本次任务创建的影片页面。项目根地址没有预设成片。

## 多智能体与 Windows 支持

**核心流程不依赖 Codex 专属 API。** 不同客户端读取同一份项目 Skill，使用文件、终端、浏览器与媒体检查能力完成制作。

| 环境 | 已提供的适配 |
| --- | --- |
| Codex | AGENTS 与本地 Skill；已有历史制作案例 |
| Claude Code、Gemini CLI | 专属项目入口，回到同一套规则 |
| Cursor、GitHub Copilot | 工作区指令入口；使用能执行命令的 Agent 模式 |
| Windows、macOS、Linux | 统一 Node/Python 工具、路径处理、浏览器准备与三系统 CI 配置 |
| 其他智能体 | 显式读取 AGENTS.md，具备相同工具能力即可接入 |

“入口已适配”和“每个模型、系统均已完整实拍验证”分开记录。具体已运行检查、环境要求与剩余原生验证见[兼容性说明](docs/compatibility.md)，不以配置文件存在代替测试结果。

## 全流程怎样完成

```mermaid
flowchart LR
  A[原片 + 完整 SRT + 要求] --> B[内容与时间分析]
  B --> C[素材与同步人物层]
  C --> D[字体与空间构图]
  D --> E[连续动画与衔接]
  E --> F[声音与渲染]
  F --> G[实际视听检查与修复]
  G --> H[MP4 + 可编辑工程]
```

自动化由智能体遵循 Skill 执行：分析、设计、写场景、渲染、检查和修复。分页脚本负责完整读取制作要求，不是任意视频的一键编译器。整片保持连续作者；“支持多种智能体”不等于把每一段拆给不同作者。抠像和可选生成素材根据可用工具与许可准备。

## 多语种与开源范围

提供中、英、日、西、法五语 README；正式 Skill 以中文维护，避免翻译产生多套规则。多语言智能体可读取后按用户语言工作。已有中英文排版方法；其他语言须重新核对字库、分行和阅读时间，不包含自动配音翻译或所有文字系统的排版保证。

公开范围包括 Skill、辅助脚本、精选对比、带许可证的字体库，以及参考库已经整理好的分析参数和结论。参考库只发布文字/JSON分析，不附原视频、音频、抽帧图、缩略图或完整转写。用户原片、历史工程、下载的参考视频、缓存及旧实验快照保留在本地，不进入发行包。

[项目结构](docs/architecture.md) · [兼容性](docs/compatibility.md) · [参与维护](CONTRIBUTING.md) · [开源准备报告](docs/release-readiness.md)

项目自有代码、Skill、文档与参考分析采用 [Motion Craft Community License 1.0](LICENSE)：基于 Apache-2.0 条款增加非商业限制。**未经作者事先书面授权不得商用**，详见[商业授权说明](COMMERCIAL-LICENSE.md)。这是自定义源码可见许可，不是标准 Apache-2.0。第三方字体/依赖保留原许可，Demo 素材不另授权，详见[第三方说明](THIRD_PARTY_NOTICES.md)。
