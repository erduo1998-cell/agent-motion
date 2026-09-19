# Platforms, agents and verification

This repository is an agent-driven Three.js video workspace. Its production rules and rendering toolchain are independent of Codex. An agent reads the local skills, plans the film, writes the scene, captures frames, mixes sound and reviews the actual result. There is no universal SRT-to-film compiler hidden behind the setup command.

**跨平台与多智能体适配已提供；实际验证范围单独记录。** 核心不依赖 Codex 私有接口。Windows、macOS、Linux 使用相同的 Node 入口；适配文件存在不代表每个客户端、模型、显卡和原生系统组合都已经实测。现有生产 Skill 以中文为准，Agent 可以按用户语言创作；输出语言仍需匹配字库、分词与阅读时长。

## Requirements and setup

Install Node.js **22+**, Python **3.10+**, and FFmpeg/FFprobe with the `libx264` encoder available on PATH. Open a new terminal after installing them. The Node wrapper checks `python3`, `python`, versioned Python commands on POSIX, and `py -3` / `python` / `python3` on Windows. `PYTHON` explicitly selects an interpreter if needed.

Run these commands from the repository root. They work in PowerShell and POSIX shells without a shell script or a Unix compatibility layer:

```text
npm ci
npm run setup
npm run doctor
npm test
npm run smoke
```

`setup` downloads Playwright's matching Chromium browser; it does not install Python, FFmpeg or AI clients. On Linux, `npm run setup -- --with-deps` also asks Playwright to install browser system packages, which may require administrator access. Browser downloads need network access; local rendering does not require an API key. A model/provider subscription, paid asset or external generation service is separate from this repository.

`doctor` actually launches Chromium and checks WebGL2, in addition to checking Node, Python, FFmpeg and FFprobe. It exits nonzero for missing requirements. Use `npm run doctor -- --json` for a machine-readable result.

`smoke` renders a synthetic Three.js cube, compares repeated/out-of-order absolute-time captures, exports 12 PNG frames into a temporary folder, encodes a one-second silent H.264 MP4, then checks it with FFprobe. It prints the artifact folder. It does not validate talking-head matting, font coverage, final-film audio or an agent's creative decisions.

## Portable configuration

| Variable | Purpose |
| --- | --- |
| `PYTHON` | Python executable path, without arguments; useful when the system default is too old |
| `BROWSER_EXECUTABLE` | Explicit Chrome/Chromium executable path; takes priority over channel |
| `BROWSER_CHANNEL` | Playwright browser channel such as `chrome` or `msedge`; omit to use installed Chromium |
| `FFMPEG_PATH` | FFmpeg executable path for doctor/smoke and new film renderers |
| `FFPROBE_PATH` | FFprobe executable path |
| `PORT` | Local preview port; default `8793` |

Example in PowerShell:

```powershell
$env:PYTHON = 'C:\Python313\python.exe'
$env:BROWSER_CHANNEL = 'chrome'
npm run doctor
```

Equivalent POSIX example, using an existing executable path:

```sh
PYTHON=/path/to/python3 BROWSER_CHANNEL=chrome npm run doctor
```

Use `launchBrowser()` from `scripts/browser.mjs` in new capture/render scripts. Construct file paths with Node/Python path libraries and pass process arguments as arrays. Do not copy machine-specific Chrome/Homebrew paths, `--use-angle=metal` or `h264_videotoolbox` from private historical experiments into a portable film. Use CPU `libx264` as the default shared encoder; hardware acceleration is an optional per-machine optimization.

The local service binds to `127.0.0.1`, supports media range requests, and blocks dotfile credentials and symlinks escaping its root. It is a local preview service, not a public production host. Files intentionally placed in `inputs/` and `work/` remain accessible to your local film.

## Agent entrypoints

| Client | Repository entrypoint | Integration scope |
| --- | --- | --- |
| Codex / agents that read AGENTS.md | `AGENTS.md` | Canonical route to both project-local skills |
| Claude Code | `CLAUDE.md` | Routes to the same local skills and runtime |
| Gemini CLI | `GEMINI.md` | Routes to the same local skills and runtime |
| Cursor | `.cursor/rules/three-video.mdc` | Always-applied project rule with the same route |
| GitHub Copilot agent workflows | `.github/copilot-instructions.md` | Repository instructions with the same route |
| Other coding agents | Explicitly read `AGENTS.md` | Same workflow when equivalent tools are available |

The adapter formats follow the official [Claude Code memory documentation](https://code.claude.com/docs/en/memory), [Gemini CLI project context documentation](https://geminicli.com/docs/cli/gemini-md/), [Cursor rules documentation](https://cursor.com/docs/rules) and [GitHub Copilot custom instructions documentation](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions). These are instruction adapters, not forks of the production skills. `agents/openai.yaml` is optional Codex UI metadata and is not a runtime dependency.

Use a capable agent mode that can read/write local files, execute Node/Python/FFmpeg, inspect images and continuous video, and listen to audio for an audible deliverable. Text-only chat or autocomplete does not supply that execution environment. Media inspection can use the client's native tools; the workflow does not require a particular connector. If a required inspection tool is absent, report the exact gap and treat the output as a preview until that check is completed.

Open the repository as the agent's workspace and ask:

```text
Read AGENTS.md and the two project-local skills. Use inputs/source.mp4,
inputs/source.srt and my reference to create a complete talking-head film
in work/my-film/. Follow the full analysis and production stages, preserve
original speech timing, render the result, and inspect the actual picture
and audio before delivery. Respond in my language.
```

Start the paginated rules with:

```text
npm run read-stage -- --stage srt --kind talking-head
```

Each `NEXT_READ` command reads exactly the next page. The command uses the Node wrapper so Python selection, Unicode output and paths with spaces work consistently. Run it from the repository root. This reader returns the complete source rules; it does not itself run video production.

For preview, run `npm run serve` and open your film's URL, for example `http://127.0.0.1:8793/work/my-film/index.html`. The root URL is not a generated film. The self-contained toolchain fixture is at `http://127.0.0.1:8793/tests/fixtures/smoke.html`.

## Assets and optional capabilities

The private downloaded video/tutorial library, old test films and private model weights are excluded from distribution. Production rules work with user-provided references, optional licensed local references and public source links. A missing private library does not block a new film.

The workflow requires a synchronized independent person layer for talking-head packaging. The agent may create it with a compatible local matting model, a licensed external tool, or reuse a suitable user-provided layer. No particular ONNX model or paid service is bundled or mandatory. The selected method may need its own dependencies and license review; preserve source timing and verify hair, hands and motion edges in the actual result.

Optional typography maintenance scripts need Pillow/fontTools; ordinary rendering uses the selected local font files. Optional HyperFrames references can be discovered by `find-motion-resources.py` from project/user Agents, Claude, Gemini and Codex directories or a supplied `--skills-root`. They are references, not required engines or plugins.

## Verification record

As of **2026-09-19**:

| Environment / check | Evidence |
| --- | --- |
| macOS arm64 | Local `doctor`, `npm test`, and real Three.js → Chromium → FFmpeg smoke passed; Node 26.4.0 in the working tree and Node 24.16.0 in a fresh allowlisted distribution, Python 3.14, Chromium 153.0.8010.12, FFmpeg 8.1.2 |
| Windows, Ubuntu and macOS hosted runners | All six OS × Node 22/24 jobs passed installation, tests, packaging, browser diagnosis and real Three.js → PNG → H.264/FFprobe smoke in [GitHub Actions run 35433570433](https://github.com/erduo1998-cell/agent-motion/actions/runs/35433570433) at commit `013e2d82` |
| Node 24 / 22 | Both passed on all three hosted operating systems; Node 24.16.0 also passed clean-distribution checks on the local Mac |
| Codex | Existing local production/testing used Codex; toolchain checks here also ran through Codex |
| Claude Code / Gemini CLI / Cursor / Copilot | Instruction-file integration supplied and formats checked against official docs; no independent end-to-end film run in those clients yet |

`npm test` covers existing geometry/handoff math, server paths/ranges/security boundaries, stage manifest completeness, pagination/source-change rejection and the current skill file hashes. CI repeats tests, doctor and smoke across Windows, macOS and Ubuntu on Node 22 and 24. The repository is private. The linked hosted run verifies the toolchain, not a full film in every agent client or every personal computer. Do not infer film quality from a successful dependency check.

The first hosted Windows run exposed Git checkout converting LF to CRLF and breaking the exact Skill hashes. The repository now ships `.gitattributes` to keep text as LF; the hash checks remain strict. A real checkout with `core.autocrlf=true` preserved all 58 Skill files after the fix, and both Windows CI jobs passed. No production Skill content was changed for this fix.
