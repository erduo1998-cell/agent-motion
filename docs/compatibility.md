# Platforms, agents and verification

This repository is an agent-driven Three.js video workspace. Its production rules and rendering toolchain are independent of Codex. An agent reads the local skills, plans the film, writes the scene, captures frames, mixes sound and reviews the actual result. There is no universal SRT-to-film compiler hidden behind the setup command.

**跨平台与多智能体适配已提供；实际验证范围单独记录。** 核心不依赖 Codex 私有接口。Windows、macOS、Linux 使用相同的 Node 入口；适配文件存在不代表每个客户端、模型、显卡和原生系统组合都已经实测。现有生产 Skill 以中文为准，Agent 可以按用户语言创作；输出语言仍需匹配字库、分词与阅读时长。

## Requirements and setup

For first use, prepare **Node.js 22+ and a coding agent**. Download the repository with **Code → Download ZIP** and fully extract it; Git is not required. Open the extracted folder in your agent. Double-click `start.command` on macOS or `start.bat` on Windows, or run this from the project root on any supported platform:

```text
node scripts/bootstrap.mjs
```

`npm run onboard` calls the same entrypoint. See the [beginner guide](getting-started.md) for each step, a ready-to-send agent prompt and troubleshooting. `node scripts/bootstrap.mjs --plan` shows the installation plan; `--help` lists its options.

The installer prepares Node packages, pinned uv, a project-local `.venv`, NumPy / ONNX Runtime, Chromium, local FFmpeg / FFprobe and the upstream RVM model. It prefers an available Python 3.10–3.13 for the virtual environment, and otherwise downloads a private Python 3.12. It then runs `doctor --matting` and `scripts/matting-smoke.mjs`, which exercises real short matting inference. Environments, model downloads and caches stay under project-local `.venv/` and `.runtime/` directories rather than requiring global Python packages. Model weights are fetched on first use and excluded from the distribution.

Automatic matting installation supports Windows x64, macOS x64/arm64, and glibc Linux x64/arm64. Native Windows ARM64 is not supported by the pinned ONNX Runtime wheel; use a supported x64 Node environment. macOS must also satisfy the pinned ONNX Runtime wheel requirement (13 or later). The first run needs internet access and enough time for dependencies and browser downloads. Linux may additionally need Chromium system libraries through its native package manager; that system step may require administrator access. No model API key or dedicated GPU is required for the local matting and rendering path. An agent/provider account, paid assets or external generation services are separate.

For agent diagnosis and rendering checks after installation:

```text
npm run doctor -- --matting
npm test
npm run smoke
```

`doctor` actually launches Chromium and checks WebGL2, Node, Python, FFmpeg and FFprobe; `--matting` also checks the person-matting environment. Missing requirements produce a nonzero exit. Use `npm run doctor -- --matting --json` for a machine-readable result.

The rendering `smoke` command renders a synthetic Three.js cube, compares repeated/out-of-order absolute-time captures, exports 12 PNG frames, encodes a one-second silent H.264 MP4 and verifies it with FFprobe. This is separate from the installer's short matting smoke. Neither validates a complete film's hair/hand edges, fonts, audio or creative decisions; the agent must inspect the actual output.

Advanced users can still manage their own environment: `npm ci` installs Node dependencies, and `npm run setup` prepares missing FFmpeg tools, downloads Playwright's matching Chromium and verifies the RVM model download. Those two commands alone do not prepare the Python matting environment. `--core-only` omits the model download; `--managed-media` forces the project-local FFmpeg installation for verification. On Linux, `npm run setup -- --with-deps` requests the browser's system packages. The Python wrapper can also use `PYTHON`, compatible local environments and system interpreters; normal first-time users should use the installer instead of configuring these manually.

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

## Required person matting and optional assets

The private downloaded video/tutorial library, old test films and private model weights are excluded from distribution. Production rules work with user-provided references, optional licensed local references and public source links. A missing private library does not block a new film.

**Person matting is required for talking-head packaging.** The supplied installer prepares a usable local method: RVM MobileNetV3 FP32 ONNX with ONNX Runtime on CPU. Its approximately 14 MB model is an upstream download, not a bundled repository asset. It does not require a dedicated GPU; runtime depends on the computer, source resolution and duration, and real-time performance is not promised.

The agent should verify a short sample before processing the complete recording:

```text
npm run matte -- --input inputs/source.mp4 --output work/my-film/person-preview --seconds 2
npm run matte -- --input inputs/source.mp4 --output work/my-film/person
```

The output directory contains synchronized `foreground.mp4`, `alpha.mp4` and `matting.json`. The foreground and alpha mask are a pair for composition, not a standalone transparent MP4. Keep the source speech timing and inspect hair, hands and moving edges. The production workflow preserves and mixes the original audio into the final film.

A compatible local or external tool, or a verified user-provided person layer, can replace the default implementation. The **method is selectable; the person layer is not optional**. The private historical test2 production used RVM locally; that history is not evidence that this new installer has passed on every supported OS.

RVM retains its upstream **GPL-3.0** license. The project's noncommercial license cannot replace or override RVM's terms. Weights are excluded from the repository distribution and downloaded on demand. This setup description is not a completed legal review of GPL combined distribution; consult the applicable licenses when changing or redistributing the backend. See [third-party notices](../THIRD_PARTY_NOTICES.md).

Image generation, paid services and additional reference libraries are optional; their absence does not make the required person layer optional.

Optional typography maintenance scripts need Pillow/fontTools; ordinary rendering uses the selected local font files. Optional HyperFrames references can be discovered by `find-motion-resources.py` from project/user Agents, Claude, Gemini and Codex directories or a supplied `--skills-root`. They are references, not required engines or plugins.

## Verification record

**Rendering toolchain record as of 2026-09-19.** These results predate the new one-step installer and required RVM setup. They do not attest that the new onboarding or matting smoke has passed on every CI platform; new results must be recorded separately after execution.

| Environment / check | Evidence |
| --- | --- |
| macOS arm64 | Local `doctor`, `npm test`, and real Three.js → Chromium → FFmpeg smoke passed; Node 26.4.0 in the working tree and Node 24.16.0 in a fresh allowlisted distribution, Python 3.14, Chromium 153.0.8010.12, FFmpeg 8.1.2 |
| Windows, Ubuntu and macOS hosted runners | All six OS × Node 22/24 jobs passed installation, tests, packaging, browser diagnosis and real Three.js → PNG → H.264/FFprobe smoke in [GitHub Actions run 35433570433](https://github.com/erduo1998-cell/agent-motion/actions/runs/35433570433) at commit `013e2d82` |
| Node 24 / 22 | Both passed on all three hosted operating systems; Node 24.16.0 also passed clean-distribution checks on the local Mac |
| Codex | Existing local production/testing used Codex; toolchain checks here also ran through Codex |
| Claude Code / Gemini CLI / Cursor / Copilot | Instruction-file integration supplied and formats checked against official docs; no independent end-to-end film run in those clients yet |

`npm test` covers existing geometry/handoff math, server paths/ranges/security boundaries, stage manifest completeness, pagination/source-change rejection and the current skill file hashes. CI repeats tests, doctor and smoke across Windows, macOS and Ubuntu on Node 22 and 24. The linked hosted run verifies the then-current rendering toolchain, not a full film in every agent client or every personal computer. Do not infer film quality from a successful dependency check.

The first hosted Windows run exposed Git checkout converting LF to CRLF and breaking the exact Skill hashes. The repository now ships `.gitattributes` to keep text as LF; the hash checks remain strict. A real checkout with `core.autocrlf=true` preserved all 58 Skill files after the fix, and both Windows CI jobs passed. No production Skill content was changed for this fix.


## First-run integration / 2026-09-20

The local macOS arm64 check used the new installer, project-local FFmpeg/FFprobe 8.0.1, Python environment, pinned RVM model, and Chromium. `doctor --matting`, real recurrent ONNX inference, synchronized foreground/alpha H.264 encoding and full decode passed. A separate isolated setup with Python absent from PATH downloaded managed Python 3.12 and installed the pinned dependencies successfully. Re-running the environment preparation reused the project environment.

All six Windows, macOS and Ubuntu × Node 22/24 jobs passed the new installer, real CPU matting, all 16 tests, package checks and Three.js video rendering in [run 35486146307](https://github.com/erduo1998-cell/agent-motion/actions/runs/35486146307), commit `bbd945c7`. The workflow forced the project-local FFmpeg fallback instead of relying on a preinstalled media toolchain. Native Windows ARM64 and Linux ARM64 are not covered by this hosted matrix; Windows ARM64 is explicitly unsupported by the pinned ONNX runtime.

A local two-second human sample retained 720×1280 resolution and all 60 frames at 30 fps; the foreground/alpha metadata matched, and a composited frame was visually inspected. This sample stays private. Synthetic tests also checked nine alpha levels through H.264 encode/decode without changing opacity values. These checks do not replace full-film hair, hand, motion and audio review.
