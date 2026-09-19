# Demo evidence / 演示依据

Updated on 2026-09-19 after the owner's request to add the greenery film, redact faces and extend each GIF to one minute. These excerpts come from three owner-approved productions. They demonstrate visual output; they are not a regression test of every current Skill rule, a promise of identical output, or proof that every OS/agent combination has been tested.

按本轮要求新增认可的绿化作品，将三个对比全部改为一分钟，并对原片与成片两侧的人物面部打码。历史作品和现行规则的版本关系仍保留，不把展示片当成所有平台、模型或最新规则的回归证明。

| Example / 演示 | Version / 版本 | Source ranges / 原片选段 | Presentation / 展示 |
| --- | --- | --- | --- |
| [Hybrid training / 混能训练](media/hybrid-opening.gif) · [MP4](media/hybrid-opening.mp4) | Hybrid training V4 | 0–10.5; 20.2–23.1; 30.4–34.9; 62.4–80.9; 101.8–119.3; 130.8–134.9; 144–146 seconds | Chronological selections, 60 seconds total / 按原顺序精选拼接 |
| [Communication / 家校沟通](media/communication.gif) · [MP4](media/communication.mp4) | Communication V3 | 0–60 seconds | Continuous 60-second excerpt / 连续一分钟 |
| [Greenery / 绿化看品质](media/greening.gif) · [MP4](media/greening.mp4) | Greenery V1, 2026-09-19 | 0–32; 44.25–72.25 seconds | Chronological selections, 60 seconds total / 按原顺序精选拼接 |

## Timing, privacy and quality / 时间、打码与画质

- Left is the supplied source; right is the rendered film at the **same source time**. Both play at 1× speed. The hybrid and greenery selections contain explicitly labelled jumps; they are not presented as a continuous minute of the original recording. No frame interpolation or speed changes were added.
- Both sides have faces covered by **opaque grey pixel mosaics**. The mosaic pattern is independent of the original face pixels, not a light blur. The scope includes small background faces found in the gym footage and faces entering/leaving a moving presenter window.
- Source files and original production renders remain unchanged. The masks exist only in these public-facing comparison copies. The rest of the original presentation, existing subtitles and animation are preserved.
- GIFs and MP4 companions are silent. They do not demonstrate voice, mixing or sound-design quality. MP4 companions retain a larger, clearer comparison for fullscreen viewing.

左右对应相同原片时间，原速播放；精选拼接处有标识，不把删去的中间时段说成连续展示。马赛克为不使用原脸像素的实心覆盖，两侧一起处理；原片、原始成片不修改。无声对比不用于评价音效和混音。

| File / 文件 | Dimensions / 尺寸 | Frame rate / 帧率 | Frames / 帧数 | Duration / 时长 |
| --- | --- | --- | --- | --- |
| `hybrid-opening.gif` | 496×483 | 6 fps | 360 | 60.000 s |
| `communication.gif` | 496×483 | 6 fps | 360 | 60.000 s |
| `greening.gif` | 620×597 | 8 fps | 480 | 60.000 s |
| `hybrid-opening.mp4`, `communication.mp4` | 744×724 | 8 fps | 480 each | 60.000 s each |
| `greening.mp4` | 744×716 | 8 fps | 480 | 60.000 s |

GIF stores frame delays in hundredths of a second: alternating delays represent 6/8 fps, and total loop duration was checked explicitly. The different GIF dimensions balance moving source detail against file size; all three remain under 20 MB each.

## Evidence and verification / 依据与检查

Hybrid V4 and communication V3 acceptance was checked in the original September 17 project conversations. The September 19 greenery V1 also has explicit owner approval after its delivery, and the owner reaffirmed that choice during this release preparation. The original greenery production README still called it a preview because its maker had not completed full audiovisual review; the showcase records the owner's later approval without rewriting that historical record.

The historical source/output durations are 146.541/146.541 seconds for hybrid training and 86.784/86.800 seconds for communication. The greenery source is approximately 98.569 seconds. Only the selected 60 seconds per comparison are distributed here. Private conversation text, account identifiers and local source paths are excluded.

For redaction, local face detection was run at the 8 fps comparison output rate. Expanded opaque masks cover detected face boxes. Moving-window transitions and small/partially visible faces received conservative additional coverage; greenery also uses the original scene's crop/scale mapping to cross-check the right-side face position. Per-frame box coverage was checked programmatically, and timed contact sheets plus denser transition frames were inspected. Independent review covered the tricky entrance/exit and background-person cases. These checks concern face coverage in the demonstration copies, not a new full-film audio acceptance test or a guarantee against identifying someone from non-face context.

已逐输出帧核对检测框与遮罩覆盖，并查看全时段抽帧和加密转场帧；对人物入窗、回全景、部分脸入场和健身房远处小脸进行了独立复查。此处报告的是展示副本的打码检查，不是重新完成原片全程音画验收，也不把遮脸说成消除所有环境或身份线索。

The four other independent September 19 production tests remain recorded as previews awaiting final real-time viewing/listening. Adding the separately approved greenery film does not change their status.

## Media selection and rights / 选段与素材权利

The hybrid selections avoid external running/strength-training photographs and paper screenshots. The greenery selections skip the seasonal photographs and the transition tail where those images remain visible; the selected garden scenes are the project's procedural models. No external visual reference clips, full source recordings, music or sound library are bundled. The old unredacted eight-second comparisons and superseded release packages are excluded from the current distribution.

混能选段避开外部健身照片与论文截图；绿化跳过四季照片及其过渡尾帧，保留原创园林模型与人物讲解。旧的未打码八秒对比及旧发行副本不进入当前发行包。素材不随项目许可再授权，详见[媒体说明](media/LICENSE.md)。
