# Agent Motion

**Turn talking-head footage into a designed film with a coding agent.** Recording + complete SRT + brief → MP4 + editable Three.js project.

[Demos](#demos) · [Get started](#start) · [How it works](#workflow) · [Compatibility](#compatibility)

**English** · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md)

<p align="center">
  <img src="docs/images/agent-motion-cover.png" alt="Agent Motion — Words into motion" width="620">
</p>

<a id="demos"></a>

## Demos

**Greenery, explained** · 60 seconds · Original left / result right

<p align="center">
  <img src="docs/media/greening.gif" alt="Greenery: original on the left, designed film on the right" width="620">
</p>

<p align="center"><a href="docs/media/greening.mp4">Watch the clearer MP4</a></p>

<details>
<summary><strong>Hybrid training</strong> · Expand the 60-second comparison</summary>

<p align="center">
  <img src="docs/media/hybrid-opening.gif" alt="Hybrid training: original on the left, designed film on the right" width="620">
</p>

<p align="center"><a href="docs/media/hybrid-opening.mp4">Watch the clearer MP4</a></p>

</details>

<details>
<summary><strong>Teacher communication</strong> · Expand the 60-second comparison</summary>

<p align="center">
  <img src="docs/media/communication.gif" alt="Teacher communication: original on the left, designed film on the right" width="620">
</p>

<p align="center"><a href="docs/media/communication.mp4">Watch the clearer MP4</a></p>

</details>

Three owner-approved films with matching source timecodes, tracked soft-edged face blur and silent previews. [Versions, excerpts and viewing scope](docs/demo-evidence.md)

<a id="start"></a>

## Get started

**1. Download and install**

You only need **Node.js 22+ and a coding agent**. Download this repository with **Code → Download ZIP**, then extract it; Git is not required. Open the extracted folder and double-click **`start.command` on macOS** or **`start.bat` on Windows**. On Linux, or from your agent's terminal, run:

```sh
node scripts/bootstrap.mjs
```

`npm run onboard` runs the same installer. It prepares the project dependencies, local Python environment, Chromium, FFmpeg / ffprobe and the person-matting model, then checks the environment and runs a short matting test. The first run needs an internet connection; let it finish. You do not need to install Python separately or tune a model. [Step-by-step guide and troubleshooting](docs/getting-started.md#english)

**2. Give your agent the brief**

Put your recording and complete SRT in `inputs/`, open the extracted folder in your coding agent, and send:

> Read AGENTS.md, follow the installation guide if needed, then read the two project-local Skills. Create a complete talking-head film using inputs/source.mp4 and inputs/source.srt. Prepare and verify a synchronized person cutout before composition; keep the original speech order and timing. Work in work/my-first-film/. Complete every production stage and inspect the actual picture and audio. Deliver the MP4 and editable project. Respond in English.

**Person matting is required for talking-head films.** The installer supplies a local CPU-capable method; a suitable existing person layer or another compatible tool can replace that method. A dedicated GPU is not required. Image generation remains optional.

**3. View the result**

Ask your agent to open the finished MP4 and editable preview. It can run `npm run serve` and open the film page it created at [work/my-first-film/](http://127.0.0.1:8793/work/my-first-film/). The server root has no preset film.

<details>
<summary>Checks your agent can run</summary>

```sh
npm run doctor -- --matting
npm test
npm run smoke
```

Doctor checks the matting environment; the rendering smoke performs a real Three.js → H.264 render. Neither replaces reviewing the person edges and the finished film. Installation and these local checks do not call paid generation services.

</details>

<a id="workflow"></a>

## How it works

Analyze the complete subtitles, then prepare assets and the person layer, compose type and space, animate continuously, mix sound, and review the output.

<p align="center">
  <img src="docs/images/production-flow.png" alt="Recording, complete SRT and brief pass through analysis and five production stages to an MP4 and editable project" width="940">
</p>

One continuous author develops the opening and hardest passage before expanding the film. The agent reads each stage, preserves speech timing and inspects the actual picture and sound.

<details>
<summary>Design principles: meaning, people, typography and continuous motion</summary>

<p align="center">
  <img src="docs/images/design-system.png" alt="Meaning first, people in frame, type with space, and motion that connects" width="940">
</p>

- **Meaning first**: choose actions that explain the spoken idea; keep evidence and timing intact.
- **A person in space**: keep a synchronized person layer, visible depth and intentional framing. Outline only when replacing the original background.
- **Typography with a role**: compare fonts in real compositions; establish hierarchy, readable landings and reading time.
- **Continuous movement**: carry objects and attention between ideas. Validate a continuous sample before expanding the film.

</details>

<a id="compatibility"></a>

## Compatibility

**Agents**: Codex, Claude Code, Gemini CLI, Cursor and GitHub Copilot have entry instructions for the same local Skills. Other agents can read `AGENTS.md` directly. No Codex-specific API is required. Hosts need file, terminal, browser and audiovisual inspection capabilities.

**Platforms**: the six Windows, macOS and Ubuntu × Node 22/24 CI jobs passed the rendering toolchain checks on September 19, 2026. That record predates the new installer and matting setup; see the verification record for their tested scope. Full-film production is evidenced in Codex; the other clients have not each completed an independent full-film test. [Compatibility and test evidence](docs/compatibility.md)

## Explore further

- [Architecture](docs/architecture.md) — the two Skills, toolchain and repository structure.
- [Reference analysis library](reference-library/analysis/README.md) — 43 cases, 109 mechanism windows and five tutorial methods; text / JSON only, without reference footage, audio, frames or complete transcripts.
- [Contributing](CONTRIBUTING.md) — how to make and verify changes.

READMEs are available in five languages; canonical Skills are maintained in Chinese. Agents can work in your language. Check fonts, glyphs, line breaks and reading time for each film; automatic dubbing is not included.

## License

**Noncommercial use. Commercial use requires prior written permission.**

Project-owned code, Skills, documents and analysis use **Motion Craft Community License 1.0**, a custom license based on Apache-2.0 terms with noncommercial restrictions. Fonts and dependencies retain their licenses; demo footage is excluded from the project grant.

[Full license](LICENSE) · [Commercial permission](COMMERCIAL-LICENSE.md) · [Third-party notices](THIRD_PARTY_NOTICES.md)
