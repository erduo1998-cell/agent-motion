![Agent Motion — Three.js talking-head films](docs/images/agent-motion-cover.png)

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md)

[作品比較](#demos) · [制作の流れ](#workflow) · [はじめる](#start)

**話しているアイデアを、伝わる映像に。**

元動画、完全な SRT、制作意図をエージェントに渡すと、Agent Motion が内容分析から演出・出力確認までを導きます。納品は **MP4 + 編集可能な Three.js プロジェクト**。

<sub>非商用利用向け。商用利用には事前の書面許可が必要です。 <a href="LICENSE">ライセンス ↗</a></sub>

<a id="demos"></a>

## ビフォー・アフター

### 01 / 緑化から品質を読み解く

**60 秒 · 左が元動画、右が完成版。** 元の時刻を対応させ、両側の顔に追跡式の柔らかな境界のぼかしを適用。プレビューは無音です。

<p align="center">
  <img src="docs/media/greening.gif" alt="緑化の動画：左が元動画、右が完成版" width="620">
</p>

<p align="center"><strong><a href="docs/media/greening.mp4">MP4 を見る / ダウンロード ↗</a></strong></p>

#### さらに 2 つの表現

<details>

<summary><strong>02 / ハイブリッドトレーニング</strong> — 60 秒の比較を開く</summary>

<p align="center">
  <img src="docs/media/hybrid-opening.gif" alt="02 / ハイブリッドトレーニング" width="620">
</p>

<p align="center"><strong><a href="docs/media/hybrid-opening.mp4">MP4 を見る / ダウンロード ↗</a></strong></p>

</details>

<details>

<summary><strong>03 / 学校とのコミュニケーション</strong> — 60 秒の比較を開く</summary>

<p align="center">
  <img src="docs/media/communication.gif" alt="03 / 学校とのコミュニケーション" width="620">
</p>

<p align="center"><strong><a href="docs/media/communication.mp4">MP4 を見る / ダウンロード ↗</a></strong></p>

</details>

作者が承認した 3 作品。緑化とトレーニングは元の順序で選んだ抜粋で、元の時刻を表示しています。学校の動画は連続した場面です。後の Skill 改訂すべてを検証する映像ではありません。 [版・抜粋・確認範囲 →](docs/demo-evidence.md)

<a id="workflow"></a>

## 話す映像から、ひとつの作品へ

![動画・字幕・意図から、分析、素材と人物、文字と空間、連続動作、音響、確認を経てMP4と編集可能な工程へ](docs/images/production-flow.png)

**内容分析 → 素材・人物レイヤー → 文字・空間構成 → 連続動作 → 音響 → 確認・修正。**

各段階の規則を読み、冒頭と最も難しい場面を先に完成させ、一貫した作者が全体へ展開します。元の発話時刻を保ち、実際の映像と音を確認します。セットアップや規則の閲覧だけで映画が自動生成されるわけではありません。

### 4 つのデザイン原則

![意味・人物・タイポグラフィ・連続した動きの4原則](docs/images/design-system.png)

- **意味を起点に** — 話の意味を動きで説明し、根拠と元の時刻を保つ。
- **空間の中の人物** — 同期した人物レイヤー、奥行き、再フレーミング。元背景を置き換える場合のみ輪郭線を使う。
- **役割のある文字** — 実際の構図で書体を比較し、階層・読み取れる停止点・読む時間を確保する。
- **途切れない動き** — 対象と視線を次の意味へつなぐ。連続サンプルを確認してから全体へ広げる。

<a id="start"></a>

## はじめる

**Node.js 22+、Python 3.10+、PATH 上の FFmpeg/ffprobe** が必要です。setup は Chromium をダウンロードし、有料生成サービスは呼び出しません。PowerShell と POSIX シェルで同じコマンドを使えます。

```sh
git clone https://github.com/erduo1998-cell/agent-motion.git
cd agent-motion
npm ci
npm run setup
npm run doctor
npm test
npm run smoke
```

動画と完全な SRT を `inputs/` に置き、エージェントでリポジトリを開いて依頼します。

> AGENTS.md とプロジェクト内の 2 つの Skill を読んでください。inputs/source.mp4 と inputs/source.srt から、元の発話順序と時間を保って動画を制作してください。作業先は work/my-first-film/。分析、素材、人物レイヤー、文字と空間、連続動作、音響、実際の出力確認を完了し、MP4 と編集可能なプロジェクトを納品してください。日本語で対応してください。

`npm run serve` を実行し、エージェントが作成した `http://127.0.0.1:8793/work/my-first-film/` を開きます。サーバーのルートに完成動画はありません。

### 使い慣れたエージェントと OS で

Codex、Claude Code、Gemini CLI、Cursor、GitHub Copilot の入口は同じローカル Skill を参照します。他のエージェントは `AGENTS.md` を直接読めます。**Codex 専用 API は不要。** ファイル、端末、ブラウザー、実際の映像・音声確認能力が必要です。

**Windows · macOS · Ubuntu：ツールチェーンを実行検証済み。** 3 OS × Node 22/24 の全 6 CI ジョブで、インストール、テスト、配布確認、ブラウザー診断、Three.js → H.264 の実レンダリングが成功しました。 [CI ↗](https://github.com/erduo1998-cell/agent-motion/actions/runs/35433570433)

これはツールチェーンの検証です。Codex には完成動画の制作記録がありますが、他のクライアントでそれぞれ全工程を完了した検証はまだありません。 [互換性と検証記録 →](docs/compatibility.md)

## 言語・参考分析・利用許可

README は 5 言語、正式 Skill は中国語で一元管理します。多言語エージェントは希望する言語で作業できます。各言語の書体、字形、改行、読む時間は要確認。自動吹き替えは含みません。

公開参考庫は **43 件の分析、109 の動作時間区間、5 組の教材手法** を文字/JSON で提供します。元動画、音声、抽出画像、サムネイル、完全な書き起こしは配布しません。任意の生成・マッティングは利用できるツールとライセンスに依存します。 [分析結果を読む →](reference-library/analysis/README.md)

自作コード、Skill、文書、分析には **Motion Craft Community License 1.0** を適用します。Apache-2.0 の条項に非商用制限を加えた独自ライセンスで、標準 Apache-2.0 ではありません。**商用利用には事前の書面許可が必要です。** フォントと依存関係は元の許諾条件を維持し、デモ素材は本許諾の対象外です。

[ライセンス](LICENSE) · [商用許可](COMMERCIAL-LICENSE.md) · [第三者の権利](THIRD_PARTY_NOTICES.md)

---

[構成](docs/architecture.md) · [貢献](CONTRIBUTING.md) · [公開準備](docs/release-readiness.md)
