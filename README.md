![Agent Motion — Three.js talking-head films](docs/images/agent-motion-cover.png)

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md)

[Demos](#demos) · [Workflow](#workflow) · [Get started](#start)

**Your voice. A film that makes the idea visible.**

Give a coding agent your recording, complete SRT and brief. Agent Motion carries the work from content analysis to an edited **MP4 + editable Three.js project**.

<sub>Noncommercial use. Commercial use requires prior written permission. <a href="LICENSE">License ↗</a></sub>

<a id="demos"></a>

## See the difference

### 01 / Greenery, explained

**60 seconds · Original left / result right.** Matching source times; faces on both sides use tracked, soft-edged blur. These previews are silent.

<p align="center">
  <img src="docs/media/greening.gif" alt="Greenery: original on the left, designed film on the right" width="620">
</p>

<p align="center"><strong><a href="docs/media/greening.mp4">Watch / download MP4 ↗</a></strong></p>

#### Two more films

<details>

<summary><strong>02 / Hybrid training</strong> — Expand the 60-second comparison</summary>

<p align="center">
  <img src="docs/media/hybrid-opening.gif" alt="02 / Hybrid training" width="620">
</p>

<p align="center"><strong><a href="docs/media/hybrid-opening.mp4">Watch / download MP4 ↗</a></strong></p>

</details>

<details>

<summary><strong>03 / Teacher communication</strong> — Expand the 60-second comparison</summary>

<p align="center">
  <img src="docs/media/communication.gif" alt="03 / Teacher communication" width="620">
</p>

<p align="center"><strong><a href="docs/media/communication.mp4">Watch / download MP4 ↗</a></strong></p>

</details>

Three owner-approved films. Greenery and hybrid training use chronological selections with source timecodes; teacher communication is continuous. Historical examples do not validate every later Skill revision. [Versions and viewing scope →](docs/demo-evidence.md)

<a id="workflow"></a>

## From a recording to a film

![Video, subtitles and brief; analysis; assets and person layer; typography and space; continuous motion; sound; review; MP4 and editable project](docs/images/production-flow.png)

**Analyze → Prepare assets & person layer → Compose type & space → Animate continuously → Mix sound → Review & repair.**

The agent reads each stage, builds the opening and hardest passage, then develops the film with one continuous author. It preserves speech timing and inspects the actual output. Setup and the stage reader support this process; they do not generate a film by themselves.

### Four design principles

![Four principles: meaning, person, typography and continuous movement](docs/images/design-system.png)

- **Meaning first** — Choose visual actions that explain the spoken idea; keep evidence and timing intact.
- **A person in space** — Keep a synchronized person layer, visible depth and intentional framing. Outline only when replacing the original background.
- **Typography with a role** — Compare fonts in real compositions; establish hierarchy, readable landings and reading time.
- **Continuous movement** — Carry objects and attention between ideas. Develop a continuous sample before expanding the film.

<a id="start"></a>

## Start locally

Install **Node.js 22+**, **Python 3.10+** and **FFmpeg/ffprobe** on PATH. Setup downloads Chromium; it does not call a paid generation service. These commands work in PowerShell and POSIX shells.

```sh
git clone https://github.com/erduo1998-cell/agent-motion.git
cd agent-motion
npm ci
npm run setup
npm run doctor
npm test
npm run smoke
```

Put your recording and complete SRT in `inputs/`, open the repository in your coding agent, and send:

> Read AGENTS.md and the two project-local Skills. Create a complete talking-head film using inputs/source.mp4 and inputs/source.srt. Preserve the original speech order and timing. Work in work/my-first-film/. Complete content analysis, assets/person layer, typography and spatial composition, continuous motion, sound and actual output review. Deliver the MP4 and editable project. Respond in English.

Run `npm run serve`, then open the page created by the agent at `http://127.0.0.1:8793/work/my-first-film/`. The server root is not a completed film.

### Your agent. Your operating system.

Codex, Claude Code, Gemini CLI, Cursor and GitHub Copilot have entry instructions pointing to the same local Skills. Other agents can read `AGENTS.md` directly. **No Codex-specific API is required.** The host needs files, terminal commands, browser access and audiovisual inspection.

**Windows · macOS · Ubuntu — toolchain verified.** All six OS × Node 22/24 CI jobs passed installation, tests, packaging, browser diagnosis and a real Three.js → H.264 smoke render. [CI ↗](https://github.com/erduo1998-cell/agent-motion/actions/runs/35433570433)

This verifies the toolchain. Full-film production is evidenced in Codex; other client adapters have not each completed an independent end-to-end film. [Compatibility and evidence →](docs/compatibility.md)

## Languages, references & permission

Five README languages; canonical Skills are maintained in Chinese. Multilingual agents can work in your language. Check fonts, glyphs, line breaks and reading time for each output language; automatic dubbing is not included.

The public reference library contains **43 case analyses, 109 mechanism windows and five tutorial methods**—text/JSON results only. No reference videos, audio, frames, thumbnails or complete transcripts are distributed. Optional generation and matting depend on your available tools and licenses. [Explore the analysis library →](reference-library/analysis/README.md)

Project-owned code, Skills, documents and analysis use **Motion Craft Community License 1.0**, a custom license based on Apache-2.0 terms with noncommercial restrictions. It is not standard Apache-2.0. **Commercial use requires prior written authorization.** Fonts and dependencies retain their licenses; demo footage is excluded from the project grant.

[License](LICENSE) · [Commercial permission](COMMERCIAL-LICENSE.md) · [Third-party notices](THIRD_PARTY_NOTICES.md)

---

[Architecture](docs/architecture.md) · [Contributing](CONTRIBUTING.md) · [Release readiness](docs/release-readiness.md)
