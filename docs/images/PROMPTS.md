# README artwork / 首页视觉素材

These original explanatory illustrations were generated with the built-in image generation tool on 2026-09-19. They are conceptual artwork, not screenshots of a shipped editor or evidence of a finished film. The actual before/after examples are in `docs/media/`.

本目录为内置生图工具生成的原创说明图，解释项目与制作方法；不是产品界面截图，也不代替真实成片。统一使用奶油白、深墨绿与少量暖黄。项目自有图像按根目录 [Motion Craft Community License 1.0](../../LICENSE) 提供，商用须事先书面授权。

## Assets

- [Cover](agent-motion-cover.png): project identity and spoken words becoming a film.
- [Production flow](production-flow.png): video/SRT/brief → content analysis → assets → composition → motion → sound → review → MP4 + editable project. The refinement arrow illustrates a review loop.
- [Design principles](design-system.png): meaning, person framing, typography/spatial hierarchy, and connected motion.

English originals and Simplified Chinese sibling images are available. The Chinese edition localizes all headings and labels; only the brand, technical terms and the illustrative letter A remain in Latin script. No real portrait or third-party study media was supplied to generation.

## Simplified Chinese assets

- [中文封面](agent-motion-cover-zh-CN.png)：保留 Agent Motion 品牌，中文口号为“让口播里的想法，成为看得见的画面。”
- [中文制作流程](production-flow-zh-CN.png)：原片 / SRT / 制作要求 → 内容分析 → 素材人物 → 场面排版 → 连续动画 → 声音制作 → 检查交付 → MP4 / 可编辑工程，包含修复回路。
- [中文设计原则](design-system-zh-CN.png)：语义先行、人物进入空间、排版各有角色、运动保持连续。

中文版本于 2026-09-19 使用内置 image_gen 编辑原图生成，保留米白、墨绿、芥末黄和原图形系统。三张成品均逐张视觉核对标题、阶段、标签和说明；设计图第一栏的立体文字经局部修正为单字“意”，避免重叠字形。它们是说明图，不是实际产品截图。原英文图保留。

## Exact Chinese localization prompts

### Chinese cover

```text
Use case: text-localization.
Edit target: the provided Agent Motion cover. Produce its Simplified Chinese sibling edition, keeping the original 2:1 composition, warm ivory opaque paper background, near-black forest green typography, muted mustard yellow accents, tactile texture, three sculptural panels, waveform, dimensional A, abstract faceless bust, soft shadows and spacing.
Keep the large two-line brand title exactly "AGENT" / "MOTION". Replace "Words into motion." with the exact Simplified Chinese tagline "让口播里的想法，成为看得见的画面。" Set this in clean, elegant Chinese typography, two balanced lines if needed within the original left title block, not tiny text. Replace the bottom caption "THREE.JS × CODING AGENTS" with "Three.js × 编程智能体". Preserve the letter A as an abstract typographic graphic. No other English words.
All Chinese characters and punctuation must be correct and readable. Only localize the text; preserve the established visual identity, panel graphics, layout and atmosphere. Fully opaque edge-to-edge rectangular artwork, no transparent pixels, no browser/mockup, no extra captions or watermarks.
```

### Chinese production flow

```text
Use case: text-localization.
Edit target: provided Agent Motion production-flow illustration. Create its Simplified Chinese edition, preserving the exact original diagram geometry, five-stage order and connectivity, numbered 01–05 stations, input row, return arrow, original icons, warm ivory opaque paper, forest green ink, small mustard accents and subtle shadows. 2:1 landscape.
Replace ALL English labels with the following exact Chinese text:
Top title: "从口播到成片"
Input box: "原片 + SRT + 制作要求"
Analysis box: "内容分析"
Stage 01 heading: "素材人物"; subtitle: "素材 + 同步人物层"
Stage 02 heading: "场面排版"; subtitle: "字体 + 空间构图"
Stage 03 heading: "连续动画"; subtitle: "动作 + 镜头衔接"
Stage 04 heading: "声音制作"; subtitle: "原声 + 音效混音"
Stage 05 heading: "检查交付"; subtitle: "渲染 + 视听检查"
Return arrow label: "修复"
Result box: "MP4 + 可编辑工程"
Bottom-left note: "连续作者，完成整片。"
Retain the letters SRT in the file icon and A in the spatial-typography illustration. No other English text except MP4. Input leads to content analysis; content analysis leads to 01; stages 01→02→03→04→05; review leads to result, with return arrow to animation for fixes. Content analysis is separate from the five production stages, do not make it one of the numbered five. Chinese headings should be large and perfectly readable, stylish editorial Chinese typography, no cramped text. Exact Chinese wording and correct characters are critical. Only text localization and typographic fitting; preserve all original visual forms and arrow meanings. Fully opaque seamless ivory background, no alpha or checkerboard, no border mockup or watermark.
```

### Chinese design principles

```text
Use case: text-localization.
Edit target: provided Agent Motion design-principles illustration. Create Simplified Chinese sibling, preserving original 2:1 layout, four editorial columns, ordinals 01–04, illustrated waveform/sculptural word, abstract faceless person with reframing inset, dimensional letter A with layered typography, continuous mustard motion path through three planes, warm ivory opaque paper background, forest green, restrained mustard, subtle paper texture and shadows.
Replace top title with exact "围绕内容，设计画面".
Column 01: heading "语义先行"; subtitle "让动作跟随口播含义"; replace sculptural English word IDEA with sculptural Chinese word "想法".
Column 02: heading "人物进入空间"; subtitle "有意识地重新取景".
Column 03: heading "排版各有角色"; subtitle "先分主次，再做装饰"; the large sculptural A may stay as an abstract typographic illustration.
Column 04: heading "运动保持连续"; subtitle "让意义在场景间延续".
No English text other than the single sculptural A. All Chinese characters must be exact, clear and legible at README display width. Match the original hierarchy with attractive, strong Chinese display typography, aligned heading/subtitle baselines and generous negative space. Only localize text and fit Chinese typography; keep visuals, lighting and composition unchanged. Entire rectangular image fully opaque with seamless warm ivory background, no transparent pixels, no extra captions, no watermark or mockup.
```

### Chinese sculptural-character refinement

```text
Use case: precise-object-edit. Edit the provided Chinese design-principles diagram. Change ONLY the small ivory typographic sculpture in the FIRST of four columns, immediately to the right of the green waveform. Its Chinese word currently has confusing doubled or stacked letter shapes. Replace it with a clean, minimal, single upright ivory sculptural Chinese character "意", one character only, one clearly readable front face, subtle extrusion backwards and soft studio shadow. No duplicate character, no text beneath or behind it, no extra marks. Preserve the connecting mustard thread from waveform.
Keep EVERYTHING else unchanged: the exact title "围绕内容，设计画面", all four numbers and headings/subtitles, all other three column illustrations, all colors, layout, spacing, opaque ivory background and shadows. Especially preserve exact column text: "语义先行" / "让动作跟随口播含义"; "人物进入空间" / "有意识地重新取景"; "排版各有角色" / "先分主次，再做装饰"; "运动保持连续" / "让意义在场景间延续". Keep wide 2:1 ratio. Do not change any title or other element.
```

## Exact prompt set

### Cover

```text
Create a finished premium editorial cover image for the GitHub README of "Agent Motion", an agent-driven Three.js talking-head motion-design project. Asset type: wide 2:1 landscape cover, ideally 2048x1024. It must feel like a beautifully art-directed motion studio identity, restrained, tactile and confident, not an AI SaaS dashboard. Background warm ivory #F4F1E8, typography near-black forest green #163D32, tiny warm yellow #E5B84B accents. Immaculate Swiss editorial typography, generous breathing room, subtle fine paper texture. Left 52% is a bold oversized two-line title, exact words "AGENT" then "MOTION", clean heavy grotesk, beautifully spaced and completely readable at GitHub README width. Under it exact smaller sentence "Words into motion." At bottom left restrained small text "THREE.JS × CODING AGENTS". Right 48% is an original sculptural composition that visualizes spoken words becoming a film: three elegant floating portrait-format film panels at slight 3D angles, overlapping with real depth and soft studio shadows; a refined speech waveform thread flows into a large dimensional letter A, through a typographic title card, into a polished final film panel. Keep panels mostly typographic and abstract, with an elegant simplified faceless cut-paper human bust silhouette on just one panel to indicate talking-head video. No actual person, no photograph or discernible face, no pixel censorship. One muted yellow sphere is an accent, not decoration everywhere. Sparse subtle registration lines and a minimal timeline baseline provide craft detail. Keep shapes thoughtfully composed with a visible focal hierarchy and no clutter. EXACT TEXT ONLY: AGENT, MOTION, Words into motion., THREE.JS × CODING AGENTS, plus optional single large A on the sculptural panel. No gibberish captions, no badges, no gradients in purple or blue, no neon, no glassmorphism, no robot heads, no stock clipart, no developer console. High-end motion design / print portfolio aesthetic. This is a real final README cover, edge-to-edge artwork, no surrounding browser or mockup.
```

### Production flow

```text
Create a polished, accurate production workflow infographic for Agent Motion, a Three.js motion-design project operated by a coding agent. Finished 2:1 landscape image, ideally 2048x1024. Same premium editorial identity: warm ivory #F4F1E8 paper, near-black forest-green #163D32, restrained mustard yellow #E5B84B, precise clean typography, very subtle paper texture and minimal shadows. No purple gradients, generic SaaS template, robot mascot or busy UI. This diagram must communicate a real sequence, not an invented product interface.
Layout: generous top margin with exact large title "FROM VOICE TO VIDEO". Below title, a compact upper input row with "VIDEO + SRT + BRIEF" and a rightward arrow into "CONTENT ANALYSIS". The output of CONTENT ANALYSIS connects clearly down and left to the first stage in the main row. Main row occupies central width: five beautifully spaced stage stations connected left to right by thin intentional arrows. Each station has a big ordinal, a clean subtle dimensional illustration, and a readable exact label: "01 ASSETS", "02 COMPOSITION", "03 MOTION", "04 SOUND", "05 REVIEW". Under each stage just one short line, exact: "Person + media", "Type + space", "Continuous scenes", "Voice + mix", "Render + inspect". Illustrations: layered portrait outline and asset tiles; sculptural A with spatial grid; a single continuous curved trajectory and title panels; minimal waveform; film panel with elegant check mark. All illustrations elegant forest-green and ivory with one small mustard accent, no faces or photos. The fifth REVIEW station connects down to a clear, larger end result reading exactly "MP4 + EDITABLE PROJECT". A fine curved return arrow from REVIEW back to MOTION, with tiny but legible exact label "Refine", expresses review-driven revision, not infinite automation. Bottom-left exact short note "One agent. One continuous film." This means one continuous author using the workflow, not five separate authors. Make the numbered labels easy to read at 900px display width; no tiny paragraphs. Use a precise editorial grid, light separator rules and enough negative space. All text must be exactly specified and spelled correctly, no other text, no watermarks. Return the finished flat artwork, no page mockup.
```

### Flow background refinement

```text
Edit this workflow infographic, preserving its exact words, five stage order, icon illustrations, arrows, and layout. Fix ONLY the background/compositing: replace all transparent regions with one fully opaque seamless warm ivory paper background, RGB #F4F1E8, with a very subtle paper texture matching the ivory cards. Remove all white jagged alpha fringes around the stage cards and connectors, making them clean and naturally integrated with soft quiet shadows. This must be a complete opaque rectangular page, no alpha transparency anywhere, no cutout background and no black background. Keep dark forest-green text high-contrast on ivory and preserve all exact readable text: FROM VOICE TO VIDEO; VIDEO + SRT + BRIEF; CONTENT ANALYSIS; 01 ASSETS; 02 COMPOSITION; 03 MOTION; 04 SOUND; 05 REVIEW; Person + media; Type + space; Continuous scenes; Voice + mix; Render + inspect; Refine; MP4 + EDITABLE PROJECT; One agent. One continuous film. Do not change the content, sequence, spelling or arrow meanings. Preserve 2:1 landscape aspect ratio.
```

### Design principles

```text
Create the final design-principles illustration for the GitHub README of Agent Motion, an agent-driven Three.js talking-head motion-design toolkit. Finished wide 2:1 landscape artwork, ideally 2048x1024. Identity: premium motion studio editorial design with warm ivory #F4F1E8, near-black forest green #163D32, restrained mustard yellow #E5B84B, subtle tactile paper, beautifully balanced spacing, soft 3D studio shadows. Minimal, intelligent, not childish or a corporate slide template.
Exact top title: "DESIGNED AROUND THE MESSAGE". Under it four equal-width editorial columns separated by thin pale green rules, each containing a distinct sculptural demonstration and a strong ordinal/label. Columns:
01 label "MEANING FIRST". Visual: a compact speech waveform resolving into one decisive large dimensional word "IDEA", with a single mustard emphasis line, suggesting motion follows spoken meaning.
02 label "PEOPLE IN FRAME". Visual: tasteful abstract faceless cut-paper bust silhouette, shoulders visible, held naturally inside a floating vertical film panel, with a second inset crop outline demonstrating thoughtful reframing and a soft shadow showing depth. No actual person, eyes, portrait photo or facial censorship.
03 label "TYPE WITH SPACE". Visual: one large beautiful letter A and a smaller geometric line of type-like rectangular marks arranged on two staggered planes, showing strong hierarchy, generous margins, foreground-background occlusion and depth. No gibberish words.
04 label "MOTION THAT CONNECTS". Visual: three little clean scene planes linked by one continuous flowing mustard trajectory which enters and exits neighboring panels; a repeated small green sphere carries identity across them. No disconnected arrows or slide-deck transitions.
Under the column labels, short exact lines respectively: "Follow the spoken idea", "Reframe with intention", "Hierarchy before decoration", "Carry meaning between scenes".
Text must be exact, high contrast and comfortably legible at 900px README width. Use at least 42px-equivalent headings at 2048px canvas. Large airy composition, aligned baselines, consistent depth and lighting across all four illustrations, 60% negative space. No rounded card-grid UI, no neon, no purple/blue gradient, no glossy robots, no extra captions or invented claims. Return actual edge-to-edge design illustration, no browser chrome or presentation mockup.
```
