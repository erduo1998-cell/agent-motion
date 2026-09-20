# Agent Motion

**コーディングエージェントで、話すだけの動画を演出のある作品に。** 元動画 + 完全な SRT + 制作意図 → MP4 + 編集可能な Three.js プロジェクト。

[作品比較](#demos) · [はじめる](#start) · [制作の流れ](#workflow) · [互換性](#compatibility)

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語** · [Español](README.es.md) · [Français](README.fr.md)

<p align="center">
  <img src="docs/images/agent-motion-cover.png" alt="Agent Motion — 言葉を動きに" width="620">
</p>

<a id="demos"></a>

## 作品比較

**緑化から品質を読み解く** · 60 秒 · 左：元動画 / 右：完成版

<p align="center">
  <img src="docs/media/greening.gif" alt="緑化の動画：左が元動画、右が演出を加えた完成版" width="620">
</p>

<p align="center"><a href="docs/media/greening.mp4">より鮮明な MP4 を見る</a></p>

<details>
<summary><strong>ハイブリッドトレーニング</strong> · 60 秒の比較を開く</summary>

<p align="center">
  <img src="docs/media/hybrid-opening.gif" alt="ハイブリッドトレーニング：左が元動画、右が演出を加えた完成版" width="620">
</p>

<p align="center"><a href="docs/media/hybrid-opening.mp4">より鮮明な MP4 を見る</a></p>

</details>

<details>
<summary><strong>先生と保護者のコミュニケーション</strong> · 60 秒の比較を開く</summary>

<p align="center">
  <img src="docs/media/communication.gif" alt="先生と保護者のコミュニケーション：左が元動画、右が演出を加えた完成版" width="620">
</p>

<p align="center"><a href="docs/media/communication.mp4">より鮮明な MP4 を見る</a></p>

</details>

作者が承認した 3 作品です。元動画のタイムコードを左右で対応させ、顔には追跡式のぼかしを柔らかな境界で適用しています。プレビューは無音です。[版・抜粋・確認範囲](docs/demo-evidence.md)

<a id="start"></a>

## はじめる

**1. ダウンロードしてインストールする**

必要なのは **Node.js 22+ とコーディングエージェント**です。リポジトリの **Code → Download ZIP** からダウンロードして展開してください。Git は不要です。展開したフォルダーで、macOS は **`start.command`**、Windows は **`start.bat`** をダブルクリックします。Linux またはエージェントの端末では、次を実行します。

```sh
node scripts/bootstrap.mjs
```

`npm run onboard` も同じインストーラーを実行します。プロジェクトの依存関係、ローカル Python 環境、Chromium、FFmpeg / ffprobe、人物の切り抜きモデルを準備し、環境診断と短い切り抜きテストを行います。初回はインターネット接続が必要です。完了するまで待ってください。Python の個別インストールやモデルの調整は不要です。[詳しい手順とトラブル対処（英語・中国語）](docs/getting-started.md#english)

**2. エージェントに素材を渡す**

元動画と完全な SRT を `inputs/` に置き、エージェントで展開したフォルダー全体を開いて、次のように依頼します。

> AGENTS.md を読み、必要ならインストール手順を完了してから、プロジェクト内の 2 つの Skill を読んでください。inputs/source.mp4 と inputs/source.srt から動画を最後まで制作してください。合成前に元動画と同期した人物の切り抜きレイヤーを作成して確認し、発話の順序と時間を保ってください。work/my-first-film/ で全段階を完了し、実際の映像と音を確認して、MP4 と編集可能なプロジェクトを納品してください。日本語で対応してください。

**人物が話す動画では、人物の切り抜きが必須です。** インストーラーは CPU で動くローカル方式を用意します。適切な既存の人物レイヤーや互換ツールで代替できますが、人物レイヤー自体は省略できません。専用 GPU は不要です。画像生成は必要に応じて利用します。

**3. 完成版を見る**

完成した MP4 と編集用プレビューをエージェントに開いてもらいます。`npm run serve` を実行し、作成した動画ページ [work/my-first-film/](http://127.0.0.1:8793/work/my-first-film/) を開けます。サーバーのルートには既定の動画はありません。

<details>
<summary>エージェントが実行できる検証</summary>

```sh
npm run doctor -- --matting
npm test
npm run smoke
```

Doctor は切り抜き環境を確認し、Smoke は Three.js → H.264 の実際のレンダリングを行います。人物の輪郭と完成動画の確認は別途必要です。インストールとローカル検証は有料生成サービスを呼び出しません。

</details>

<a id="workflow"></a>

## 制作の流れ

字幕全体を分析し、素材と人物レイヤーを準備して、文字と空間を構成します。その後、連続した動きと音を作り、完成した映像を確認します。

<p align="center">
  <img src="docs/images/production-flow.png" alt="元動画・完全な SRT・制作意図から、分析と 5 つの制作段階を経て MP4 と編集可能なプロジェクトへ" width="940">
</p>

一貫した制作担当が、冒頭と最も難しい場面を先に仕上げてから全編へ広げます。エージェントは各段階の規則を読み、発話の時間を保ち、実際の映像と音を確認します。

<details>
<summary>デザイン原則：意味、人物、文字、連続した動き</summary>

<p align="center">
  <img src="docs/images/design-system.png" alt="意味を起点に、空間の中の人物、役割のある文字、つながる動き" width="940">
</p>

- **意味を起点に**：話の意味を説明する動きを選び、根拠と時間を正確に保ちます。
- **空間の中の人物**：同期した人物レイヤー、見える奥行き、意図のある構図を保ちます。輪郭線は元の背景を置き換える場合にのみ使います。
- **役割のある文字**：実際の構図で書体を比較し、情報の階層、読み取れる位置、読む時間を整えます。
- **連続した動き**：対象と視線を次の意味へつなぎます。連続したサンプルを検証してから全編へ広げます。

</details>

<a id="compatibility"></a>

## 互換性

**エージェント**：Codex、Claude Code、Gemini CLI、Cursor、GitHub Copilot には、同じローカル Skill を読むための入口があります。他のエージェントは `AGENTS.md` を直接読めます。Codex 専用 API は不要です。実行環境には、ファイル、端末、ブラウザーの操作と、実際の映像・音声を確認する能力が必要です。

**OS**：2026 年 9 月 19 日に、Windows、macOS、Ubuntu × Node 22/24 の全 6 CI ジョブでレンダリング環境の検証が成功しました。この記録は新しいインストーラーと切り抜き機能の導入前のものです。新機能の実測範囲は検証記録を参照してください。Codex には全編を制作した記録があります。他のクライアントでは、それぞれ独立した全編制作の検証はまだ完了していません。[互換性と検証記録](docs/compatibility.md)

## さらに詳しく

- [構成](docs/architecture.md) — 2 つの Skill、ツールチェーン、リポジトリの構成。
- [参考分析ライブラリ](reference-library/analysis/README.md) — 43 事例、109 の演出手法の時間区間、5 つのチュートリアル手法。文字 / JSON のみで、参考動画、音声、抽出画像、完全な書き起こしは含みません。
- [開発への参加](CONTRIBUTING.md) — 変更と検証の方法。

README は 5 言語で提供し、正式な Skill は中国語で管理しています。エージェントは希望する言語で作業できます。動画ごとに書体、字形、改行、読む時間を確認してください。自動吹き替えは含まれません。

## ライセンス

**非商用利用向けです。商用利用には事前の書面による許可が必要です。**

プロジェクト独自のコード、Skill、文書、分析には **Motion Craft Community License 1.0** を適用します。Apache-2.0 の条項を基に非商用制限を加えた独自ライセンスです。フォントと依存関係は元のライセンスを維持し、デモ動画はこのプロジェクトの利用許諾に含まれません。

[ライセンス全文](LICENSE) · [商用利用の許可](COMMERCIAL-LICENSE.md) · [第三者の権利に関する表示](THIRD_PARTY_NOTICES.md)
