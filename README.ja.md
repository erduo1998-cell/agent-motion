# Agent Motion · Three.js トーキングヘッド動画

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md)

> **商用利用には事前の書面許可が必要です。** [ライセンス](LICENSE) · [参照分析のみ。元の参照動画は含みません](reference-library/analysis/README.md)

**元動画、完全な SRT 字幕、制作意図から、コーディングエージェントがモーションデザイン付きの動画を制作します。** 内容分析、人物レイヤー、タイポグラフィ、空間構成、連続アニメーション、音響、出力確認までをローカル Skill が案内します。MP4 と編集可能な Three.js プロジェクトを納品します。

## ビフォー・アフター

各 GIF は60秒。左が元動画、右が完成版で、両側の顔を不透明なモザイクで覆っています。トレーニングと緑化は元の順序で選んだ抜粋、学校の動画は連続した場面です。元の時刻を表示した無音の比較です。

![トレーニング動画の比較](docs/media/hybrid-opening.gif)

![緑化：顔を隠した60秒の比較](docs/media/greening.gif)

![学校とのコミュニケーション](docs/media/communication.gif)

作者が承認した 3 作品から抜粋しています。最新ルールの全項目を検証した映像ではありません。[バージョンと検証範囲](docs/demo-evidence.md)。

## セットアップ

Node.js 22+、Python 3.10+、PATH 上の FFmpeg/ffprobe、Chromium が必要です。プロジェクト内で実行してください。setup はブラウザーをダウンロードします。

```sh
git clone https://github.com/erduo1998-cell/agent-motion.git
cd agent-motion
npm ci
npm run setup
npm run doctor
npm test
npm run smoke
```

自分の動画と SRT を `inputs/` に置き、エージェントに次のように依頼します。

> AGENTS.md とプロジェクト内の 2 つの Skill を読んでください。inputs/source.mp4 と inputs/source.srt から、元の発話順序と時間を保って動画を制作してください。作業先は work/my-first-film/。分析、素材、人物レイヤー、構成、動き、音響、実際の出力確認を完了し、MP4 と編集可能なプロジェクトを納品してください。日本語で対応してください。

`npm run serve` で起動し、制作後の `http://127.0.0.1:8793/work/my-first-film/` を開きます。

## エージェントと OS

Codex 固有の API は必須ではありません。Codex、Claude Code、Gemini CLI、Cursor、GitHub Copilot 用の入口が同じ Skill を参照します。ファイル操作、コマンド実行、ブラウザー、映像・音声確認能力が必要です。Windows/macOS/Linux 用の共通ツールと CI 設定を提供します。入口の対応は、すべての環境での完成動画検証を意味しません。[実測範囲](docs/compatibility.md)を確認してください。

エージェントが全工程を実行します。汎用のワンコマンド動画コンパイラーではありません。1 本の動画は一貫した作者が担当します。素材生成やマッティングは利用可能なツールとライセンスに依存します。

README は 5 言語、正式な制作 Skill は中国語です。日本語では日本語用の字形、改行、読み時間を確認してください。自動翻訳音声は含まれません。

[構成](docs/architecture.md) · [貢献](CONTRIBUTING.md) · [公開準備](docs/release-readiness.md)

自作コード、Skill、文書、参照分析には [Motion Craft Community License 1.0](LICENSE) を適用します。Apache-2.0 の条項を基に非商用制限を追加した独自ライセンスです。**商用利用には事前の書面による許可が必要**です。[商用許可](COMMERCIAL-LICENSE.md)。標準 Apache-2.0 ではありません。第三者のフォント・依存関係は元のライセンス、デモ映像は別扱いです。[第三者の権利](THIRD_PARTY_NOTICES.md)。
