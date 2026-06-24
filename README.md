# Architecture Agent

Codex / Claude Code に指示して、外部の生成 AI API を使わずにソフトウェアアーキテクチャ図を作るためのローカルツールです。

Architecture Agent は、ブラウザ上で使う図編集ツールと、Codex / Claude Code が参照するアーキテクチャ用 skill pack で構成されています。エージェントが `outputs/codex-diagram.json` を編集し、ブラウザは描画、手動編集、エクスポートを担当します。

## 特徴

- アプリ側で生成 AI API を呼ばない prompt-to-diagram 形式のワークフロー
- Codex / Claude Code が編集しやすい JSON ベースのアーキテクチャモデル
- ローカルブラウザで動く図編集ツール
- ノードのドラッグ、ラベル編集、DSL 描画、SVG / PNG / JSON / Markdown エクスポート
- 品質目標、意思決定、リスク、レビュー結果、参照元を含むアーキテクチャメタデータ
- 次の観点を含む skill pack
  - C4、arc42、ISO/IEC/IEEE 42010 風の共通アーキテクチャ観点
  - AWS Well-Architected のレビュー観点
  - Google Cloud Well-Architected のレビュー観点
  - PostgreSQL の設計観点
  - MySQL の設計観点
- 図の構造とアーキテクチャ品質を確認する検証スクリプト

## クイックスタート

### A. リポジトリを clone して使う

```bash
git clone https://github.com/kochan17/architecture-agent.git
cd architecture-agent
npm run check
open outputs/architecture-studio.html
```

### B. GitHub から CLI をインストールする

```bash
npm install -g github:kochan17/architecture-agent
architecture-agent init my-architecture
architecture-agent open my-architecture
```

グローバルインストールせずに実行する場合:

```bash
npx github:kochan17/architecture-agent init my-architecture
cd my-architecture
node skills/architecture-agent/scripts/validate_architecture_json.mjs outputs/codex-diagram.json
```

### C. skill pack だけをインストールする

ブラウザ編集ツールや CLI は使わず、Codex / Claude Code 用の skill pack だけを入れたい場合:

```bash
npx skills add kochan17/architecture-agent/skills
```

ローカル checkout から追加する場合:

```bash
npx skills add ./skills
```

インストール後は、アーキテクチャ図の作成やレビューを依頼するときに `architecture-agent` skill を使うようエージェントに指示してください。

## CLI

```bash
architecture-agent init [directory]
```

ブラウザ編集ツール、サンプル JSON、skill pack を指定ディレクトリへコピーします。

```bash
architecture-agent open [directory]
```

`outputs/architecture-studio.html` を既定のブラウザで開きます。

```bash
architecture-agent validate [json-file]
```

`outputs/codex-diagram.json` または互換 JSON ファイルを検証します。

```bash
architecture-agent where
```

インストール済みパッケージの場所を表示します。

## Codex / Claude Code での使い方

1. このプロジェクトを Codex または Claude Code で開きます。
2. 作りたいアーキテクチャをエージェントに伝えます。
   - 例: `GCP + Cloud Run + Cloud SQL のB2B SaaS構成を、セキュリティと運用重視で作って`
   - 例: `AWS + PostgreSQL + SQS のSaaS構成を、Well-Architected観点でレビュー付きにして`
   - 例: `MySQLを使う構成に変えて、バックアップ、レプリケーション、権限設計も入れて`
3. エージェントに `skills/architecture-agent/SKILL.md` を読ませます。
4. エージェントが `outputs/codex-diagram.json` を更新します。
5. 検証を実行します。

```bash
npm run validate
```

6. `outputs/architecture-studio.html` を開きます。
7. `codex-diagram.json` の内容を `Codex JSON` に貼り付け、`Load JSON` を押します。
8. 必要に応じて SVG、PNG、JSON、Markdown として書き出します。

## Skill Pack

skill pack は次の場所にあります。

```text
skills/architecture-agent/
```

主なファイル:

- `SKILL.md`: ワークフローと出力ルール
- `references/common-architecture.md`: C4 / arc42 / ISO 42010 風の基本観点
- `references/aws.md`: AWS Well-Architected のレビュー観点
- `references/gcp.md`: Google Cloud Well-Architected のレビュー観点
- `references/postgresql.md`: PostgreSQL の設計観点
- `references/mysql.md`: MySQL の設計観点
- `references/quality-gate.md`: 最終レビュー用チェックリスト
- `scripts/validate_architecture_json.mjs`: 検証スクリプト

## JSON モデル

メインの編集対象ファイルは次の JSON です。

```text
outputs/codex-diagram.json
```

最小構成:

```json
{
  "title": "Architecture title",
  "meta": {
    "viewpoint": "container",
    "stakeholders": ["engineering", "operations"],
    "qualityGoals": ["reliability", "security"],
    "assumptions": [],
    "decisions": [],
    "risks": [],
    "reviewFindings": [],
    "sources": []
  },
  "groups": [],
  "nodes": [],
  "edges": []
}
```

対応しているノード種別:

- `user`
- `edge`
- `gateway`
- `app`
- `service`
- `database`
- `cache`
- `queue`
- `storage`
- `analytics`
- `observability`

## 検証

```bash
npm run check
```

確認する内容:

- HTML 内 JavaScript の構文
- JSON として読み込めるか
- ノード ID の重複
- 存在しないノードを参照している edge
- アーキテクチャメタデータの不足
- backup / restore / HA の姿勢が見えない database
- retry / DLQ / idempotency の姿勢が見えない queue
- security control の姿勢が見えない public edge

## このツールがしないこと

Architecture Agent は hosted SaaS ではありません。Web アプリから OpenAI、Anthropic、Google、AWS などの生成 AI API を呼びません。

アーキテクチャの検討は、ローカルファイルと参照資料を使って、Codex / Claude Code のセッション内で行います。

## ライセンス

MIT
