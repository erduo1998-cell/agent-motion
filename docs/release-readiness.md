# Release preparation / 开源准备

Prepared on 2026-09-19. The owner authorized a private GitHub upload to `erduo1998-cell/agent-motion`, branch `main`. Public release is not authorized. Local validation and hosted CI evidence are recorded separately.

## Prepared

- Two project-local production Skills, an explicit AGENTS router and thin adapters for Codex, Claude Code, Gemini CLI, Cursor and GitHub Copilot.
- English, Simplified Chinese, Japanese, Spanish and French README files; one canonical production rule set and a Mermaid workflow diagram.
- Three synchronized before/after GIFs and MP4 companions from three owner-approved films. Excerpt-level checks and source timing are recorded in [demo evidence](demo-evidence.md).
- Portable Python selection, browser setup/diagnosis, deterministic Three.js browser smoke, software H.264 encoding and local preview serving. No fixed Mac Chrome path, Metal backend or VideoToolbox encoder is required by the shipped runtime.
- Optional local reference libraries: absent private downloads do not block the published workflow. The open-font library retains all 10 families' license notices.
- A custom license derived from Apache-2.0 clauses with Section 10 noncommercial restrictions for project-owned code, Skills, documentation and analysis, third-party notices, contribution and security guidance, distribution allowlist and a manifest with per-file SHA-256 values.
- A three-OS, two-Node-version GitHub Actions configuration. Execution evidence is tracked separately in [compatibility](compatibility.md).

## Local verification

The five README files were rendered locally in a browser: all three GIFs loaded in each language, desktop layout was inspected and successive screenshot hashes confirmed animation. The Chinese preview was also visually checked at a phone-width viewport. This is a local rendering check, not a live GitHub homepage check.

All six current Demo files were fully decoded. The three GIFs run for exactly 60 seconds, with both sides face-redacted, and each is below 20 MB. Hybrid/communication GIFs are 496×483 at 6 fps; greenery is 620×597 at 8 fps. MP4 companions are 744 pixels wide, 8 fps and 60 seconds. All are silent. Exact selections and frame counts are recorded in the demo evidence. The 11 font-file checksums and source asset manifest were verified.

A fresh allowlisted distribution was checked on macOS arm64 with Node **24.16.0**, Python **3.14**, FFmpeg **8.1.2** and Playwright Chromium. `npm ci --ignore-scripts` installed both locked dependencies from the public registry; `npm run setup` found the matching browser. `npm test` passed all four suites (geometry/handoff, server behavior and boundaries, stage pagination/source validation, and Skill integrity). `npm run doctor` passed all five environment checks. `npm run smoke` rendered Three.js frames, proved deterministic backward seeking, encoded H.264, and verified a 320×180, 12-frame, one-second MP4. The browser cache and host Python/FFmpeg were shared prerequisites; this was a clean source directory, not a fresh OS installation.

The working tree was also checked on Node 26.4.0. The smoke proves the rendering path, not arbitrary talking-head production quality. Windows/Linux and Node 22 native runs remain pending.

## Reproduce the distribution

```sh
npm run package:check
npm run package:release
```

The first command verifies the allowlisted files, relative Markdown links, file sizes and selected private-data signatures. The second copies only those files into a new `dist/agent-motion-<timestamp>/` directory and adds `RELEASE-MANIFEST.json`. No Git staging, commit, remote write or upload is performed. The manifest can be used to verify an archive or downloaded release.

Excluded: user `inputs/` except its guide, all `work/`, frozen `skill-versions/`, downloaded tutorial/reference-video libraries, dependencies, caches, model weights and environment files. The scan is a targeted packaging check, not a claim of exhaustive secret detection.

## Publication boundary

Native Windows/Linux runs and end-to-end production in every non-Codex client have not been performed during this local preparation. The CI and adapters make those checks reproducible; completed runs must be recorded before describing them as tested. There is no mandatory Codex runtime dependency.

The project owner requested the selected Demo showcase. Its underlying footage/person rights have not been independently verified; the media is explicitly excluded from the project license grant. The authorized private repository includes only the redacted showcase copies. See [media permissions](media/LICENSE.md).

The authorized remote operation is creating and uploading the prepared distribution to the private repository `erduo1998-cell/agent-motion` on `main`. Changing visibility to public requires a later explicit instruction. No public Release is created, and this private upload does not change the count of already-public projects.

## 中文交付边界

本轮完成可复核发行目录，并获准上传至私有 GitHub 仓库 `erduo1998-cell/agent-motion` 的 `main` 分支；公开发布尚未授权。历史工程、旧实验、下载参考片没有被删除或打包。核心流程不要求 Codex，已提供其他客户端入口；不能把“入口可用”写成每一种模型都实测完成整片。Windows/Linux 原生运行以及线上 GitHub 渲染与 CI 仍须在对应环境记录结果。Demo 为明确认可作品片段，非最新规则的全片回归，也不附带素材再授权。

## Face-redaction revision / 打码与一分钟展示修订

The owner requested the greenery case and one-minute GIFs. Current public media replace both sides’ face regions with opaque pixel mosaics; source recordings and original production renders remain untouched. Older unredacted demo media and superseded release copies were moved to ignored local working storage and are excluded from the new archive. The media revision leaves rendering runtime code unchanged. A subsequent revision adds the text-only reference analysis library, routes the Skills to it, and applies the requested custom noncommercial license; affected Skill/package checks are rerun.

## Reference analysis and license scope / 参考分析与许可

Only final analysis parameters and project-authored conclusions are shipped from the study library: 43 cases, 109 mechanism time windows and five tutorial method groups, in 47 Markdown/JSON files. Reference videos, audio, extracted images, thumbnails and full transcripts stay outside distribution. The project uses Motion Craft Community License 1.0: Apache-2.0-derived clauses with an additional noncommercial condition, explicitly labelled as a custom license. Commercial use requires prior written authorization. Third-party licenses remain unchanged.

Negative packaging checks confirmed that a video file, an embedded media data URL and a raw transcript fixture are rejected from the analysis library. The temporary fixtures were removed. All four test suites passed again after the Skill reference routes and integrity hashes were updated.
