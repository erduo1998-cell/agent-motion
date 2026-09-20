# Third-party notices

The custom Motion Craft Community License 1.0 at the repository root applies to project-owned code, Skills, documentation, original teaching illustrations and reference analysis. Commercial use requires separate written authorization. It does not relicense third-party dependencies, fonts, reference works, or demonstration footage.

| Component | License / source | Distribution |
| --- | --- | --- |
| Three.js | MIT; see `node_modules/three/LICENSE` after `npm ci` | Installed from the locked npm package |
| Playwright Core | Apache-2.0; see `node_modules/playwright-core/LICENSE` and `NOTICE` | Installed from the locked npm package |
| Chromium | Chromium and component notices | Downloaded separately by browser setup |
| FFmpeg / FFprobe | Existing user build, or conda-forge FFmpeg 8.0.1 GPL variant; retain its license and dependency notices | Invoked as external programs. Missing tools are installed into `.runtime/media`; no binaries bundled in the source distribution |
| uv / managed Python | uv upstream MIT / Apache-2.0 and the downloaded Python distribution's own notices | Pinned official uv download; private runtime in `.runtime/` and `.venv/` |
| Micromamba | Upstream BSD-3-Clause and component notices | Pinned official download used only to create the project-local media environment from conda-forge |
| NumPy / ONNX Runtime | NumPy BSD-3-Clause; ONNX Runtime MIT; transitive packages retain their notices | Installed into the private Python environment |
| Robust Video Matting (RVM) | [Upstream GPL-3.0 license](https://github.com/PeterL1n/RobustVideoMatting/blob/53d74c6826735f01f4406b5ca9075eee27bec094/LICENSE); no separate permissive weight license was found | Official MobileNetV3 FP32 ONNX download, SHA-256 checked. Model and license cached separately under `.runtime/models`; weights are not shipped in this repository |
| Font library | SIL Open Font License 1.1; each family's `OFL.txt` | Original font files, source manifest and notices retained under `reference-library/typography` |
| Demo media | See [media notice](docs/media/LICENSE.md) and [demo evidence](docs/demo-evidence.md) | Selected before/after excerpts; excluded from the project license grant |

Font families: Noto Sans SC, Noto Serif SC, ZCOOL QingKe HuangYou, ZCOOL KuaiLe, Ma Shan Zheng, Nunito, Barlow Condensed, Bebas Neue, Smiley Sans, and jf open 粉圓. Exact files, origin URLs and SHA-256 values are recorded in `reference-library/typography/font-assets.json`, `font-verification.json`, and family-specific source files. Keep original copyright, license, and reserved-name notices when redistributing fonts. Font modification is outside this release preparation. The huninn license also retains attribution to its Kosugi Maru (Apache-2.0) and Varela predecessors; keep that complete upstream notice.

The Skills cite design research in `.agents/skills/motion-craft/references/sources.md`. Citations are source attribution, not endorsement. Only the project-authored Vane Motion and tutorial analysis, measured parameters, conclusions and source links are distributed under `reference-library/analysis/`. The downloaded source videos, audio, extracted frames, thumbnails, full transcripts, private production history and frozen Impeccable experiments are not distributed. Referenced third-party works are not claimed as project-owned or relicensed. Historical skill snapshots are not runtime dependencies.

The three teaching illustrations bundled in the Motion Craft references (`composition-atlas.png`, `type-tides.png`, `type-time-weight.png`) are identified by their companion text as project-original diagrams and are covered by the project license. This release retains the images; it does not include or promise the historical image-generation scripts.

## README artwork

The cover, production-flow and design-principles images in `docs/images/` are original conceptual illustrations generated with the built-in image tool for this project. They contain no supplied reference-video frames or real-person portraits. They are covered by the project-owned custom noncommercial license; generation prompts and scope are recorded in [the artwork notes](docs/images/PROMPTS.md).


## Local matting backend

The original production workflow used RVM MobileNetV3 FP32 through ONNX Runtime on CPU. The installer downloads the same official v1.0.0 ONNX asset; its SHA-256 is pinned in `scripts/rvm-model.json`. The upstream license is also downloaded from a fixed commit and hash-checked. The v1.0.0 code tag and the pinned current code commit contain the same GPL license text; no separate permissive grant for the weight file was found.

The project license does not impose noncommercial terms on RVM, FFmpeg or other upstream software. No upstream RVM implementation files or pretrained weights are bundled. The local adapter invokes the model with its documented ONNX inputs and outputs. Downloading separately does not by itself settle every combined-work licensing question; any later combined binary/model distribution requires its own license review. Source distribution excludes `.runtime/`, `.venv/`, and `node_modules/`.

FFmpeg fallback installation uses only the conda-forge GPL build, through an isolated micromamba prefix. Package-manager and environment licenses remain in the installed packages. The source repository does not redistribute those binary packages. Rejected third-party static builds are not installation defaults.
