# Demo evidence / 演示依据

Updated on 2026-09-19 after the owner requested a closer face mask with tracking and subtle blur in place of the earlier large pixel mosaics. These excerpts come from three owner-approved productions. They demonstrate visual output; they are not a regression test of every current Skill rule, a promise of identical output, or proof that every OS/agent combination has been tested.

三个对比均为一分钟，并包含认可的绿化作品。按最新反馈，原片与成片两侧的人物面部改用跟踪柔边模糊，替换此前影响观感的大块马赛克。历史作品和现行规则的版本关系仍保留，不把展示片当成所有平台、模型或最新规则的回归证明。

| Example / 演示 | Version / 版本 | Source ranges / 原片选段 | Presentation / 展示 |
| --- | --- | --- | --- |
| [Hybrid training / 混能训练](media/hybrid-opening.gif) · [MP4](media/hybrid-opening.mp4) | Hybrid training V4 | 0–10.5; 20.2–23.1; 30.4–34.9; 62.4–80.9; 101.8–119.3; 130.8–134.9; 144–146 seconds | Chronological selections, 60 seconds total / 按原顺序精选拼接 |
| [Communication / 家校沟通](media/communication.gif) · [MP4](media/communication.mp4) | Communication V3 | 0–60 seconds | Continuous 60-second excerpt / 连续一分钟 |
| [Greenery / 绿化看品质](media/greening.gif) · [MP4](media/greening.mp4) | Greenery V1, 2026-09-19 | 0–32; 44.25–72.25 seconds | Chronological selections, 60 seconds total / 按原顺序精选拼接 |

## Timing, privacy and quality / 时间、打码与画质

- Left is the supplied source; right is the rendered film at the **same source time**. Both play at 1× speed. The hybrid and greenery selections contain explicitly labelled jumps; they are not presented as a continuous minute of the original recording. No frame interpolation or speed changes were added.
- Both sides use **tracked, feathered Gaussian face blur**. Masks follow each face closely instead of covering the whole head or a large rectangular region; temporal smoothing is reset at cuts or large movement changes. The scope includes visible small background faces and faces entering/leaving a presenter window.
- Source files and original production renders remain unchanged. The masks exist only in these public-facing comparison copies. The rest of the original presentation, existing subtitles and animation are preserved.
- GIFs and MP4 companions are silent. They do not demonstrate voice, mixing or sound-design quality. MP4 companions retain a larger, clearer comparison for fullscreen viewing.

左右对应相同原片时间，原速播放；精选拼接处有标识，不把删去的中间时段说成连续展示。面部使用贴合轮廓、随人物移动的柔边模糊，两侧一起处理，保留头发、身体、字幕及周边动效；原片、原始成片不修改。无声对比不用于评价音效和混音。

| File / 文件 | Dimensions / 尺寸 | Frame rate / 帧率 | Frames / 帧数 | Duration / 时长 |
| --- | --- | --- | --- | --- |
| `hybrid-opening.gif` | 620×603 | 8 fps | 480 | 60.000 s |
| `communication.gif` | 620×603 | 8 fps | 480 | 60.000 s |
| `greening.gif` | 620×597 | 8 fps | 480 | 60.000 s |
| `hybrid-opening.mp4`, `communication.mp4` | 744×724 | 8 fps | 480 each | 60.000 s each |
| `greening.mp4` | 744×716 | 8 fps | 480 | 60.000 s |

GIF stores frame delays in hundredths of a second: alternating delays represent 8 fps, and total loop duration was checked explicitly. The GIFs use 620-pixel width and a 192-color palette to retain clearer typography and gradients. The taller hybrid/communication layout differs slightly from greenery. MP4 is preferred for fullscreen viewing and smaller downloads. The GIF sizes are approximately 37.4 MB (hybrid), 43.8 MB (communication) and 26.2 MB (greenery); each remains below the 50 MiB distribution limit.

## Evidence and verification / 依据与检查

Hybrid V4 and communication V3 acceptance was checked in the original September 17 project conversations. The September 19 greenery V1 also has explicit owner approval after its delivery, and the owner reaffirmed that choice during this release preparation. The original greenery production README still called it a preview because its maker had not completed full audiovisual review; the showcase records the owner's later approval without rewriting that historical record.

The historical source/output durations are 146.541/146.541 seconds for hybrid training and 86.784/86.800 seconds for communication. The greenery source is approximately 98.569 seconds. Only the selected 60 seconds per comparison are distributed here. Private conversation text, account identifiers and local source paths are excluded.

For the revised showcase, face detections at the 8 fps comparison rate are deduplicated and matched over time. Each face receives a close-fitting elliptical mask with a feathered edge, rather than a large union of neighboring boxes. Large motion, scale changes and cuts reset smoothing. Gaussian blur is approximately 9% of the tracked face width (with a small-face minimum); feathering is approximately 4.5%. The lighter setting preserves facial lighting and head orientation while softening facial features. Small background faces use their own localized masks.

All six final files passed complete decoding and duration checks. Independent visual review covered 180 full-frame MP4 samples at one-second intervals, plus consecutive entrance/exit and small-background-face sequences, 60 enlarged poster-region samples and selected final GIF frames. The three GIFs each decode to 480 frames and exactly 60,000 milliseconds. This is sampled visual review, not a claim that a reviewer manually watched every frame.

这次修订重点是脸部遮罩贴合、跟踪稳定与自然观感，不再采用整头大块像素覆盖。模糊强度按脸宽调节，边缘羽化；快速移动与切镜头重置平滑。此处理不能保证无法通过发型、衣着、声音或环境识别人，也不作为原片全程音画验收。

The four other independent September 19 production tests remain recorded as previews awaiting final real-time viewing/listening. Adding the separately approved greenery film does not change their status.

## Media selection and rights / 选段与素材权利

The hybrid selections avoid external running/strength-training photographs and paper screenshots. The greenery selections skip the seasonal photographs and the transition tail where those images remain visible; the selected garden scenes are the project's procedural models. No external visual reference clips, full source recordings, music or sound library are bundled. The old unredacted eight-second comparisons and superseded release packages are excluded from the current distribution.

混能选段避开外部健身照片与论文截图；绿化跳过四季照片及其过渡尾帧，保留原创园林模型与人物讲解。旧的未打码八秒对比及旧发行副本不进入当前发行包。素材不随项目许可再授权，详见[媒体说明](media/LICENSE.md)。
