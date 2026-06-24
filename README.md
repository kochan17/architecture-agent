# ArchDraft Studio

Codex/Claude Codeで指示して、外部の生成AI APIを使わずにソフトウェアアーキテクチャ図を作るためのローカルツールです。

ArchDraft Studioは、ブラウザ上の図編集ツールと、Codexが参照するアーキテクチャ・スキルパックで構成されています。Codexが `codex-diagram.json` を編集し、ブラウザは描画・手動編集・エクスポートを担当します。

## Features

- Prompt-to-diagram style workflow without app-side AI API calls
- Codex-controlled JSON architecture model
- Local browser editor: drag nodes, edit labels, render DSL, export SVG/PNG/JSON/Markdown
- Architecture metadata: quality goals, decisions, risks, review findings, sources
- Skill pack references for:
  - common architecture foundations: C4, arc42, ISO/IEC/IEEE 42010-style concerns
  - AWS Well-Architected review lens
  - Google Cloud Well-Architected review lens
  - PostgreSQL architecture concerns
  - MySQL architecture concerns
- Validation script for diagram structure and architecture quality warnings

## Quick Start

### Option A: Clone

```bash
git clone https://github.com/kochan17/archdraft-studio.git
cd archdraft-studio
npm run check
open outputs/architecture-studio.html
```

### Option B: Install CLI from GitHub

After this repository is public, your friends can install directly from GitHub:

```bash
npm install -g github:kochan17/archdraft-studio
archdraft init my-architecture
archdraft open my-architecture
```

Or run without global install:

```bash
npx github:kochan17/archdraft-studio init my-architecture
cd my-architecture
node architecture-skills/architecture-designer/scripts/validate_architecture_json.mjs outputs/codex-diagram.json
```

## CLI

```bash
archdraft init [directory]
```

Copies the browser studio, sample architecture JSON, and skill pack into a working directory.

```bash
archdraft open [directory]
```

Opens `outputs/architecture-studio.html`.

```bash
archdraft validate [json-file]
```

Validates `outputs/codex-diagram.json` or another compatible JSON file.

```bash
archdraft where
```

Prints the installed package path.

## Codex / Claude Code Workflow

1. Open this project in Codex or Claude Code.
2. Tell the agent what architecture you want.
   - Example: `GCP + Cloud Run + Cloud SQL のB2B SaaS構成を、セキュリティと運用重視で作って`
   - Example: `AWS + PostgreSQL + SQS のSaaS構成を、Well-Architected観点でレビュー付きにして`
   - Example: `MySQLを使う構成に変えて、バックアップ、レプリケーション、権限設計も入れて`
3. The agent should read `architecture-skills/architecture-designer/SKILL.md`.
4. The agent updates `outputs/codex-diagram.json`.
5. Run validation:

```bash
npm run validate
```

6. Open `outputs/architecture-studio.html`.
7. Paste the JSON into `Codex JSON` and click `Load JSON`.
8. Export SVG, PNG, JSON, or Markdown.

## Architecture Skill Pack

The skill pack lives in:

```text
architecture-skills/architecture-designer/
```

Important files:

- `SKILL.md`: workflow and output rules
- `references/common-architecture.md`: C4 / arc42 / ISO 42010-style baseline
- `references/aws.md`: AWS Well-Architected review lens
- `references/gcp.md`: Google Cloud Well-Architected review lens
- `references/postgresql.md`: PostgreSQL design concerns
- `references/mysql.md`: MySQL design concerns
- `references/quality-gate.md`: final review checklist
- `scripts/validate_architecture_json.mjs`: validation script

## JSON Model

The main editable architecture file is:

```text
outputs/codex-diagram.json
```

Minimum shape:

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

Supported node types:

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

## Validation

```bash
npm run check
```

Checks:

- HTML script syntax
- JSON parseability
- duplicate node IDs
- missing edge references
- missing architecture metadata
- database without visible backup/restore/HA posture
- queue without retry/DLQ/idempotency posture
- public edge without visible security control posture

## What This Is Not

This is not a hosted SaaS and does not call OpenAI, Anthropic, Google, AWS, or any other generation API from the web app. The architecture reasoning happens in your coding agent session, using local files and references.

## License

MIT
