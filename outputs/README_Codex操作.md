# Rchitecture Agent を Codex で操作する方法

このツールは生成AI APIを使いません。図の生成・変更は Codex が `codex-diagram.json` を編集し、ブラウザ側はそれを描画・手動編集・書き出しするだけです。

## 基本フロー

1. Codex に自然言語で指示する
   - 例: 「Next.js + Supabase + Stripe + Resend のSaaS構成図にして」
   - 例: 「Redis と Queue を追加して、非同期処理の流れを見えるようにして」
   - 例: 「Kubernetes構成に変えて、Ingress、Service、Deployment、Postgresを入れて」
2. Codex が `skills/rchitecture-agent/` の該当リファレンスを読む
3. Codex が `codex-diagram.json` を編集する
4. Codex が検証を実行する
   - `node skills/rchitecture-agent/scripts/validate_architecture_json.mjs outputs/codex-diagram.json`
5. `architecture-studio.html` を開き、`Codex JSON` に `codex-diagram.json` の内容を貼り付けて `Load JSON` を押す
6. 必要ならブラウザ上でノードをドラッグ・編集する
7. SVG / PNG / JSON / Markdown で書き出す

## Codex が編集するJSON形式

```json
{
  "title": "Diagram title",
  "meta": {
    "viewpoint": "container",
    "stakeholders": ["engineering", "operations"],
    "qualityGoals": ["reliability", "security"],
    "assumptions": ["Single-region is acceptable for the initial phase"],
    "decisions": [
      { "id": "ADR-001", "decision": "Use managed PostgreSQL", "rationale": "Reduce operations burden", "tradeoffs": "Less low-level control" }
    ],
    "risks": [
      { "severity": "medium", "risk": "Single-region outage", "mitigation": "Add DR when RTO requires it" }
    ],
    "reviewFindings": [
      { "pillar": "reliability", "status": "warning", "finding": "No multi-region DR", "recommendation": "Document RTO/RPO" }
    ],
    "sources": [
      { "label": "AWS Well-Architected Framework", "url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html" }
    ]
  },
  "groups": [
    { "id": "boundary", "label": "Boundary", "x": 360, "y": 130, "w": 690, "h": 480 }
  ],
  "nodes": [
    { "id": "api", "label": "API services", "type": "service", "x": 520, "y": 470 }
  ],
  "edges": [
    { "from": "api", "to": "database", "label": "read/write" }
  ]
}
```

## ノード type

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

## 重要な考え方

- 外部の生成AI APIは不要
- Codex が図の構造を作る
- Webツールは描画・編集・エクスポートに専念する
- このチャットで「図を変更して」と言えば、Codex が `codex-diagram.json` を更新できる
