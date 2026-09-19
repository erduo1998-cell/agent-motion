# Release preparation / 开源准备

Prepared on 2026-09-19. The owner authorized a private GitHub upload to `erduo1998-cell/agent-motion`, branch `main`. Public release is not authorized. Local validation and hosted CI evidence are recorded separately.

## Prepared

- Two project-local production Skills, an explicit AGENTS router and thin adapters for Codex, Claude Code, Gemini CLI, Cursor and GitHub Copilot.
- English, Simplified Chinese, Japanese, Spanish and French README files; one canonical production rule set, a generated cover, production-flow illustration and design-principles artwork.
- Three synchronized before/after GIFs and MP4 companions from three owner-approved films. Excerpt-level checks and source timing are recorded in [demo evidence](demo-evidence.md).
- Portable Python selection, browser setup/diagnosis, deterministic Three.js browser smoke, software H.264 encoding and local preview serving. No fixed Mac Chrome path, Metal backend or VideoToolbox encoder is required by the shipped runtime.
- Optional local reference libraries: absent private downloads do not block the published workflow. The open-font library retains all 10 families' license notices.
- A custom license derived from Apache-2.0 clauses with Section 10 noncommercial restrictions for project-owned code, Skills, documentation and analysis, third-party notices, contribution and security guidance, distribution allowlist and a manifest with per-file SHA-256 values.
- A three-OS, two-Node-version GitHub Actions configuration. Execution evidence is tracked separately in [compatibility](compatibility.md).

## Local verification

The five README files were rendered locally in a browser: the generated cover, flow and design artwork loaded with the three GIF examples in each language. The greenery example leads, and the other two are available in expandable sections with adjacent MP4 links. Desktop layout and animation were inspected. The Chinese preview was also visually checked at a phone-width viewport. GitHub’s Markdown renderer accepted the centered media, images and expandable examples. The rendered HTML was inspected locally at desktop and 390-pixel phone width with no horizontal overflow in any of the five languages. This is a local visual check using GitHub-rendered Markdown, not a logged-in live GitHub homepage check.

All six current Demo files were fully decoded. The three GIFs run for exactly 60 seconds, with tracked feathered face blur on both sides. Hybrid/communication GIFs are 620×603 at 8 fps; greenery is 620×597 at 8 fps. MP4 companions are 744 pixels wide, 8 fps and 60 seconds. All are silent. Exact selections and frame counts are recorded in the demo evidence. The 11 font-file checksums and source asset manifest were verified.

A fresh allowlisted distribution was checked on macOS arm64 with Node **24.16.0**, Python **3.14**, FFmpeg **8.1.2** and Playwright Chromium. `npm ci --ignore-scripts` installed both locked dependencies from the public registry; `npm run setup` found the matching browser. `npm test` passed all four suites (geometry/handoff, server behavior and boundaries, stage pagination/source validation, and Skill integrity). `npm run doctor` passed all five environment checks. `npm run smoke` rendered Three.js frames, proved deterministic backward seeking, encoded H.264, and verified a 320×180, 12-frame, one-second MP4. The browser cache and host Python/FFmpeg were shared prerequisites; this was a clean source directory, not a fresh OS installation.

The working tree was also checked on Node 26.4.0. The smoke proves the rendering path, not arbitrary talking-head production quality. Subsequent private GitHub CI passed on Windows, Ubuntu and macOS with Node 22 and 24; see the hosted verification below.

## Reproduce the distribution

```sh
npm run package:check
npm run package:release
```

The first command verifies the allowlisted files, relative Markdown links, file sizes and selected private-data signatures. The second copies only those files into a new `dist/agent-motion-<timestamp>/` directory and adds `RELEASE-MANIFEST.json`. No Git staging, commit, remote write or upload is performed. The manifest can be used to verify an archive or downloaded release.

Excluded: user `inputs/` except its guide, all `work/`, frozen `skill-versions/`, downloaded tutorial/reference-video libraries, dependencies, caches, model weights and environment files. The scan is a targeted packaging check, not a claim of exhaustive secret detection.

## Publication boundary

The six hosted toolchain jobs passed on Windows, Ubuntu and macOS with Node 22 and 24 in [GitHub Actions run 35433570433](https://github.com/erduo1998-cell/agent-motion/actions/runs/35433570433) at commit `013e2d82`. They installed locked dependencies, ran all four test groups and the package check, launched Chromium/WebGL2, rendered frames and encoded/verified H.264. This does not establish end-to-end film production in every non-Codex client. There is no mandatory Codex runtime dependency.

The project owner requested the selected Demo showcase. Its underlying footage/person rights have not been independently verified; the media is explicitly excluded from the project license grant. The authorized private repository includes only the redacted showcase copies. See [media permissions](media/LICENSE.md).

The authorized remote operation is creating and uploading the prepared distribution to the private repository `erduo1998-cell/agent-motion` on `main`. Changing visibility to public requires a later explicit instruction. No public Release is created, and this private upload does not change the count of already-public projects.

## 中文交付边界

本轮完成可复核发行目录，并获准上传至私有 GitHub 仓库 `erduo1998-cell/agent-motion` 的 `main` 分支；公开发布尚未授权。历史工程、旧实验、下载参考片没有被删除或打包。核心流程不要求 Codex，已提供其他客户端入口；不能把“入口可用”写成每一种模型都实测完成整片。Windows、Ubuntu、macOS 的 Node 22/24 托管 CI 已全部通过；个人电脑上的完整制作和各智能体全流程仍按实际完成情况记录。五语页面已做本地渲染检查，未将其冒充所有客户端的 GitHub 页面检查。Demo 为明确认可作品片段，非最新规则的全片回归，也不附带素材再授权。

## Face-redaction revision / 打码与一分钟展示修订

The owner requested the greenery case and one-minute GIFs. Following the owner’s visual feedback, current showcase media use closely tracked feathered face blur on both sides; source recordings and original production renders remain untouched. The earlier large pixel mosaics were replaced to preserve the presentation of the film. Older unredacted demo media and superseded release copies were moved to ignored local working storage and are excluded from the new archive. The media revision leaves rendering runtime code unchanged. A subsequent revision adds the text-only reference analysis library, routes the Skills to it, and applies the requested custom noncommercial license; affected Skill/package checks are rerun.

## Reference analysis and license scope / 参考分析与许可

Only final analysis parameters and project-authored conclusions are shipped from the study library: 43 cases, 109 mechanism time windows and five tutorial method groups, in 47 Markdown/JSON files. Reference videos, audio, extracted images, thumbnails and full transcripts stay outside distribution. The project uses Motion Craft Community License 1.0: Apache-2.0-derived clauses with an additional noncommercial condition, explicitly labelled as a custom license. Commercial use requires prior written authorization. Third-party licenses remain unchanged.

Negative packaging checks confirmed that a video file, an embedded media data URL and a raw transcript fixture are rejected from the analysis library. The temporary fixtures were removed. All four test suites passed again after the Skill reference routes and integrity hashes were updated.

## Private GitHub verification / 私有上传验证

Repository: [erduo1998-cell/agent-motion](https://github.com/erduo1998-cell/agent-motion), default branch `main`. The GitHub API reported `private: true` and `visibility: private`; an unauthenticated request returned HTTP 404. An independent clone of the initial upload matched all 208 source files by SHA-256 and passed the packaging check. The Windows checkout fix added `.gitattributes`, bringing that source snapshot to 209 files; the subsequent presentation revision also adds the three generated illustrations and their prompt record.

The original failed Windows jobs are retained as history. The subsequent six-job run above passed with strict Skill hashes unchanged. The repository remains private; publishing it requires a later explicit owner instruction.

## Visual revision / 视觉修订

The owner rejected the earlier oversized opaque face mosaics. All three one-minute comparisons were rebuilt with per-face tracking, tightly fitted feathered ellipses and Gaussian blur; the source videos and original film renders were preserved. Face lighting and head orientation remain visible, while facial details are softened. Tiny background faces are handled with separate local masks. This is not a claim of complete anonymity.

Three original README illustrations were produced with the built-in image-generation tool: the cover, production workflow, and four design principles. [Assets and exact prompts](images/PROMPTS.md) document their conceptual nature and generation instructions. The five README pages use a common editorial layout with translated explanatory text.
