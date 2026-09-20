# Getting started / 第一次使用

[中文](#中文) · [English](#english)

<a id="中文"></a>

## 中文

### 1. 先准备两样东西

- **[Node.js 22 或更新版本](https://nodejs.org/zh-cn/download)**：安装完成后重新打开智能体或终端，让它能找到 `node` 和 `npm`。
- **一个能执行任务的编程智能体**：例如 Codex、Claude Code、Gemini CLI、Cursor 或 GitHub Copilot 的 Agent 模式。它需要读写项目文件、执行命令，并检查实际画面与声音。只有聊天框或代码补全的模式不够。

你不需要先学 Three.js，不需要自己安装 Git、Python、FFmpeg，也不需要挑选或调整抠像模型。编程智能体自己的账号和服务由你准备。

自动安装支持 Windows x64、macOS 13+（Intel / Apple 芯片）和 glibc Linux（x64 / arm64）；原生 Windows ARM64 暂不支持，需使用受支持的 x64 Node 环境。

### 2. 下载并解压项目

在仓库页面点击 **Code → Download ZIP**。下载后先完整解压，再打开解压后的文件夹；不要直接在压缩包里启动。这个文件夹里应能看到 `AGENTS.md`、`package.json`、`start.command` 和 `start.bat`。

用你的编程智能体打开这个**整个文件夹**，让它能读取里面的文件。会用 Git 的用户也可以克隆仓库，两种方式用法相同。

### 3. 启动一次安装

| 系统 | 操作 |
| --- | --- |
| macOS | 双击项目中的 `start.command` |
| Windows | 双击项目中的 `start.bat` |
| Linux，或任何系统的智能体终端 | 在项目文件夹内运行 `node scripts/bootstrap.mjs` |

也可以在项目文件夹内运行 `npm run onboard`，它调用同一个安装入口。终端不熟悉也没关系，把下面这句话交给智能体：

> 请先读 AGENTS.md 和 docs/getting-started.md，在当前项目运行 node scripts/bootstrap.mjs，完成安装并检查结果。如果报错，先查实际原因并修复，不要跳过人物抠像检查。

首次安装需要联网下载依赖和浏览器，耗时随网速而变化。安装会准备 Node 依赖、固定版本的 uv、项目内的 Python 环境、NumPy / ONNX Runtime、Chromium、FFmpeg / ffprobe，以及约 14 MB 的 RVM 人物抠像模型；随后执行包含抠像检查的环境诊断和一次真实的小片段抠像测试。

安装器优先使用已有的 Python 3.10–3.13 创建虚拟环境；没有合适版本时，准备项目私有的 Python 3.12。运行环境与缓存保存在项目的 `.venv/`、`.runtime/` 等本地目录，不要求修改全局 Python。模型权重首次从上游下载，不包含在仓库发行包中。浏览器和运行环境也需要下载，**14 MB 只是模型大小，不是整个安装大小**。

安装通过不代表影片已经制作完成。若某项检查失败，把完整报错交给智能体，让它修复后重跑同一安装命令。

### 4. 放入原片和字幕

把你自己的文件复制到 `inputs/`：

```text
inputs/
  source.mp4     原始口播视频
  source.srt     与原片时间对应的完整字幕
```

可以用其他文件名，在给智能体的消息里写清实际路径即可。SRT 需要覆盖整段口播。没有 SRT 时，请先让你的智能体用可用的转写工具生成并检查时间；本项目安装器不提供自动转写服务。再告诉它视频用途、画幅、风格和想参考的效果。

### 5. 让智能体完成制作

复制下面的消息，并补充你的制作要求：

> 先读 AGENTS.md，按需完成安装，再读本项目两个本地 Skill。使用 inputs/source.mp4 和 inputs/source.srt 制作完整口播动效视频。真人口播必须先有与原片同步、经检查的人物抠像层；先做短片段确认边缘，再处理全片，不能用原背景矩形视频代替人物层。保留原始口播顺序、语音和时间。在 work/my-first-film/ 完成各制作阶段，检查实际画面、声音和时序，交付 MP4、可编辑工程与检查结果。我的画幅和风格要求是：……

人物抠像是必需步骤；可以选择其他兼容工具，或复用已检查合格的人物层。默认方案使用 **RVM MobileNetV3 FP32 ONNX + ONNX Runtime CPU**，不要求独立显卡。CPU 速度取决于机器、片长和分辨率；安装成功不保证实时处理，也不保证每段头发、手部和运动边缘都无需修复。

不需要自己调模型。下面是智能体可以调用的命令：

```sh
# 先试跑两秒，检查人物边缘与同步
npm run matte -- --input inputs/source.mp4 --output work/my-film/person-preview --seconds 2

# 确认后处理完整原片
npm run matte -- --input inputs/source.mp4 --output work/my-film/person
```

输出目录包含 `foreground.mp4`（人物前景）、`alpha.mp4`（同步透明度遮罩）和 `matting.json`（处理记录）。前景与遮罩需要配对使用；普通播放器直接打开前景 MP4，不等于看到带透明背景的最终合成。原始语音由制作流程保留并混入最终影片，不要从人物层文件推断最终声音是否完整。

### 6. 查看交付

让智能体打开最终 MP4，播放并检查画面与声音。它也可以运行 `npm run serve`，打开它创建的工程页面，例如 `http://127.0.0.1:8793/work/my-first-film/`。根地址没有预设影片。

制作产物在 `work/`，你的原素材在 `inputs/`。不要为解决安装问题删除这两个目录。

### 遇到问题

| 现象 | 下一步 |
| --- | --- |
| 提示找不到 `node` 或 `npm` | 确认 Node.js 22+ 已安装，重新打开终端和智能体；让智能体检查 `node --version` |
| macOS 不允许双击脚本，或 ZIP 解压后脚本不可执行 | 在项目文件夹的终端运行 `node scripts/bootstrap.mjs`；无需关闭系统安全设置 |
| 下载失败、超时或访问被网络限制 | 保留错误信息，确认能访问依赖下载源后重跑；让智能体检查实际失败步骤 |
| 浏览器缺少系统库，常见于 Linux | 让智能体按安装错误补齐发行版的 Chromium 系统依赖；此类系统安装可能需要管理员权限 |
| 抠像失败或边缘不好 | 让智能体运行 `npm run doctor -- --matting`，用两秒样片定位模型、解码、时序或边缘问题，再决定修复方法 |
| 智能体无法查看视频或听声音 | 换用具备相关工具的模式，或补上人工检查；完成检查前只能视为待验预览 |

### 模型许可与验证范围

RVM 由上游按 **GPL-3.0** 提供，保留自己的许可。项目的非商业许可不替换或覆盖 RVM 许可；仓库不打包模型权重，安装器按需下载。若要再分发模型、改造后端或组合打包，请核对各部分许可；本说明不代表已经完成 GPL 组合分发的法律审查。详见 [第三方说明](../THIRD_PARTY_NOTICES.md)。

各平台和智能体的实际验证情况以 [兼容性与验证记录](compatibility.md#verification-record) 为准。旧版渲染 CI 通过不自动证明新增安装器、抠像流程或每台电脑都已通过测试。

<a id="english"></a>

## English

### 1. Prepare Node and an agent

Install **Node.js 22+**, then reopen your terminal or agent so it can find `node` and `npm`. Use a coding agent that can read and write files, run commands, and inspect the actual picture and sound. Codex, Claude Code, Gemini CLI, Cursor and GitHub Copilot have repository entry instructions; a text-only chat or autocomplete mode is not enough.

You do not need to learn Three.js first, install Git/Python/FFmpeg yourself, or choose a matting model. Your agent account or provider service is separate.

Automatic installation supports Windows x64, macOS 13+ (Intel / Apple Silicon), and glibc Linux x64 / arm64. Native Windows ARM64 is not supported by the pinned runtime.

### 2. Download and extract

Choose **Code → Download ZIP** on the repository page, then fully extract the archive. Open the extracted folder as your agent's workspace. It should contain `AGENTS.md`, `package.json`, `start.command` and `start.bat`. Do not launch files from inside the ZIP. Cloning with Git is also supported.

### 3. Run the installer

Double-click **`start.command` on macOS** or **`start.bat` on Windows**. On Linux, or in any agent terminal, run this from the extracted project folder:

```sh
node scripts/bootstrap.mjs
```

`npm run onboard` is the same entrypoint. If terminals are unfamiliar, ask your agent:

> Read AGENTS.md and docs/getting-started.md. Run node scripts/bootstrap.mjs in this workspace, complete installation and inspect the results. Diagnose and fix any failing step; do not skip matting verification.

The first run needs internet access. It prepares Node dependencies, pinned uv, a project-local Python environment, NumPy / ONNX Runtime, Chromium, FFmpeg / ffprobe and the approximately 14 MB RVM model. It then checks the environment, including matting, and runs a real short matting test. It prefers an available Python 3.10–3.13 for the virtual environment; otherwise it prepares a private Python 3.12. Environments and caches stay in local directories such as `.venv/` and `.runtime/`; you do not need to modify global Python.

The model is downloaded from upstream, not bundled in the repository distribution. **14 MB describes only the model**, not all installation downloads. Wait for installation to finish. If a step fails, give the agent the complete error and rerun the same installer after fixing the cause. On Linux, missing Chromium system libraries may need your distribution's package manager and administrator permission.

### 4. Supply your recording and subtitles

Copy your recording to `inputs/source.mp4` and its complete, time-aligned subtitles to `inputs/source.srt`. Other filenames work if you tell the agent their paths. If you have no SRT, ask the agent to transcribe and verify the timing with an available transcription tool first; the installer does not provide transcription. Add your intended audience, aspect ratio, style and references.

Send your agent:

> Read AGENTS.md, complete installation if necessary, then read both project-local Skills. Make a complete talking-head film from inputs/source.mp4 and inputs/source.srt. Prepare and inspect a synchronized person cutout, starting with a short sample before processing the whole recording; do not substitute a rectangle of the original background for the person layer. Preserve original speech order, audio and timing. Work in work/my-first-film/, complete all production stages, and inspect the actual picture, audio and synchronization. Deliver the MP4, editable project and check results. My aspect ratio and style are: …

**Person matting is required.** A compatible alternative tool or a verified existing person layer may replace the supplied implementation. The default is **RVM MobileNetV3 FP32 ONNX with ONNX Runtime on CPU**; no dedicated GPU is required. Processing time depends on your hardware, resolution and recording length. Installation does not guarantee real-time performance or perfect hair, hands and motion edges.

Your agent can use:

```sh
npm run matte -- --input inputs/source.mp4 --output work/my-film/person-preview --seconds 2
npm run matte -- --input inputs/source.mp4 --output work/my-film/person
```

Each output folder contains synchronized `foreground.mp4`, `alpha.mp4` and `matting.json`. The foreground and alpha mask are used together in the composition; opening the foreground MP4 alone does not show the final transparent composite. The production workflow preserves the original speech and adds it to the finished film.

### 5. Review the film

Ask the agent to open the final MP4 and review the picture and sound. For the editable project it can run `npm run serve` and open the film page it created, for example `http://127.0.0.1:8793/work/my-first-film/`. The server root has no preset film. Outputs live in `work/` and your originals in `inputs/`; do not delete these folders to troubleshoot installation.

If Node is not found, reopen the agent after installing Node 22+ and check `node --version`. If macOS cannot launch the script, use the Node command above instead of disabling system security. For network failures, keep the error and retry after restoring access to the download sources. For matting problems, ask the agent to run `npm run doctor -- --matting` and inspect a two-second sample. A missing audiovisual inspection capability must be supplied by another mode or a human review before the preview is accepted as complete.

### Licensing and verification

Upstream RVM retains its **GPL-3.0** license. This project's noncommercial license does not replace or override it. Model weights are downloaded on demand and excluded from the repository distribution. Check the applicable licenses before redistributing models or combined packages; this guide does not claim a completed legal review of GPL combined distribution. See [third-party notices](../THIRD_PARTY_NOTICES.md).

See the [verification record](compatibility.md#verification-record) for actual platform and agent coverage. Passing the older rendering CI does not by itself validate the new installer, matting workflow or every user's computer.
