# Third-party notices

The custom Motion Craft Community License 1.0 at the repository root applies to project-owned code, Skills, documentation, original teaching illustrations and reference analysis. Commercial use requires separate written authorization. It does not relicense third-party dependencies, fonts, reference works, or demonstration footage.

| Component | License / source | Distribution |
| --- | --- | --- |
| Three.js | MIT; see `node_modules/three/LICENSE` after `npm ci` | Installed from the locked npm package |
| Playwright Core | Apache-2.0; see `node_modules/playwright-core/LICENSE` and `NOTICE` | Installed from the locked npm package |
| Chromium | Chromium and component notices | Downloaded separately by browser setup |
| FFmpeg | Depends on the user's build; see that build's license/configuration | External prerequisite; no binary bundled |
| Font library | SIL Open Font License 1.1; each family's `OFL.txt` | Original font files, source manifest and notices retained under `reference-library/typography` |
| Demo media | See [media notice](docs/media/LICENSE.md) and [demo evidence](docs/demo-evidence.md) | Selected before/after excerpts; excluded from the project license grant |

Font families: Noto Sans SC, Noto Serif SC, ZCOOL QingKe HuangYou, ZCOOL KuaiLe, Ma Shan Zheng, Nunito, Barlow Condensed, Bebas Neue, Smiley Sans, and jf open 粉圓. Exact files, origin URLs and SHA-256 values are recorded in `reference-library/typography/font-assets.json`, `font-verification.json`, and family-specific source files. Keep original copyright, license, and reserved-name notices when redistributing fonts. Font modification is outside this release preparation. The huninn license also retains attribution to its Kosugi Maru (Apache-2.0) and Varela predecessors; keep that complete upstream notice.

The Skills cite design research in `.agents/skills/motion-craft/references/sources.md`. Citations are source attribution, not endorsement. Only the project-authored Vane Motion and tutorial analysis, measured parameters, conclusions and source links are distributed under `reference-library/analysis/`. The downloaded source videos, audio, extracted frames, thumbnails, full transcripts, private production history and frozen Impeccable experiments are not distributed. Referenced third-party works are not claimed as project-owned or relicensed. Historical skill snapshots are not runtime dependencies.

The three teaching illustrations bundled in the Motion Craft references (`composition-atlas.png`, `type-tides.png`, `type-time-weight.png`) are identified by their companion text as project-original diagrams and are covered by the project license. This release retains the images; it does not include or promise the historical image-generation scripts.

## README artwork

The cover, production-flow and design-principles images in `docs/images/` are original conceptual illustrations generated with the built-in image tool for this project. They contain no supplied reference-video frames or real-person portraits. They are covered by the project-owned custom noncommercial license; generation prompts and scope are recorded in [the artwork notes](docs/images/PROMPTS.md).
