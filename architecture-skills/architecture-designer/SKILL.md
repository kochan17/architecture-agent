---
name: architecture-designer
description: Use when creating or reviewing software architecture diagrams and documentation with Codex-controlled JSON for ArchDraft Studio. Covers common architecture foundations, C4/arc42/ISO 42010-style concerns, cloud providers, databases, quality gates, decisions, risks, and evidence-backed review output.
---

# Architecture Designer

Use this skill when the user asks Codex to create, improve, or review an architecture diagram for ArchDraft Studio without calling a generation API.

## Workflow

1. Clarify the system goal, users, workload type, critical data, deployment target, and non-functional priorities.
2. Select only the relevant reference files:
   - Common architecture foundation: `references/common-architecture.md`
   - AWS workloads: `references/aws.md`
   - Google Cloud workloads: `references/gcp.md`
   - PostgreSQL: `references/postgresql.md`
   - MySQL: `references/mysql.md`
   - Review gate: `references/quality-gate.md`
3. Produce or update `outputs/codex-diagram.json`.
4. Include architecture metadata, not only nodes and edges:
   - `meta.stakeholders`
   - `meta.qualityGoals`
   - `meta.assumptions`
   - `meta.decisions`
   - `meta.risks`
   - `meta.reviewFindings`
   - `meta.sources`
5. Run `node architecture-skills/architecture-designer/scripts/validate_architecture_json.mjs outputs/codex-diagram.json`.
6. If validation reports warnings, either fix the design or leave explicit rationale in `meta.decisions` / `meta.risks`.

## Output Rules

- Do not create a diagram that is only a service inventory. Show boundaries, data flow, trust boundaries, operational components, and failure/restore concerns when relevant.
- When using cloud services, apply the provider's official well-architected pillars as review lenses.
- When using databases, include backup/restore, monitoring, access control, replication/HA, and performance/indexing concerns unless intentionally out of scope.
- Every important architecture decision must have a reason and tradeoff.
- Every unresolved concern must be captured as a risk, not hidden.

## JSON Target

The diagram JSON must remain compatible with ArchDraft Studio:

```json
{
  "title": "Architecture title",
  "meta": {
    "viewpoint": "container",
    "stakeholders": ["engineering", "operations"],
    "qualityGoals": ["reliability", "security"],
    "assumptions": ["Expected traffic is moderate"],
    "decisions": [{ "id": "ADR-001", "decision": "Use managed PostgreSQL", "rationale": "Reduces operations burden", "tradeoffs": "Less low-level control" }],
    "risks": [{ "severity": "medium", "risk": "Single-region outage", "mitigation": "Add multi-region DR when RTO requires it" }],
    "reviewFindings": [{ "pillar": "reliability", "status": "warning", "finding": "No explicit restore path", "recommendation": "Add backup restore workflow" }],
    "sources": [{ "label": "AWS Well-Architected Framework", "url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html" }]
  },
  "groups": [],
  "nodes": [],
  "edges": []
}
```
