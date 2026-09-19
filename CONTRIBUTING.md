# Contributing

Start with [AGENTS.md](AGENTS.md). The two project-local Skills are the production source of truth; global Skills do not replace them. Creative rules have one canonical Chinese version. README translations explain usage and must not silently alter those rules.

Use Node.js 22 or newer, Python 3.10 or newer, FFmpeg/ffprobe, and Chromium. Run `npm ci`, `npm run setup`, `npm run doctor`, and `npm test`. Changes to rendering require a real browser check and actual output inspection; changes to audio require listening. Report what was checked rather than claiming that file existence proves quality.

Keep changes focused. For a new reference section, update `stage-reading.json` so the reader includes it. Preserve continuous scene authorship: helper agents may research assets, but splitting one film into independent authors is not the default pipeline. Do not add fixed aesthetic templates as universal rules.

Use synthetic or permission-cleared inputs for reproducible bug reports. Include OS, Node/Python versions, agent host, command, expected behavior, and a minimal reproduction. Never include raw user footage, private conversation exports, credentials, caches, or downloaded reference videos.

The CI configuration covers Windows, macOS, and Linux. A workflow file is a plan for checks; only a completed run is evidence. Please state native platform results separately from simulated path tests.

## 中文

先读项目 AGENTS；只改本次范围。Skill 修改须维护分页来源清单和相对引用，保留创作自由与连续作者流程。运行相关检查；涉及画面或音轨时实际查看/试听。提交材料不得带入私人原片、历史对话或下载的参考视频。README 翻译不另立一套制作规则。

## License and study-library contributions

Project-owned contributions are covered by the complete [Motion Craft Community License 1.0](LICENSE), including Section 10 noncommercial restrictions, unless a separate written agreement says otherwise. Preserve third-party licenses. The public reference library accepts project-authored analysis, parameters and source links only; do not submit reference videos, audio, screenshots, thumbnails, full transcripts or embedded media data.
