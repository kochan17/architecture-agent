# Architecture Quality Gate

Use this checklist before finalizing `outputs/codex-diagram.json`.

## Gate A: Completeness

- [ ] System boundary is clear.
- [ ] Users/external systems are shown.
- [ ] Runtime components are shown.
- [ ] Data stores are shown.
- [ ] Operational components are shown where relevant.
- [ ] Trust/network boundaries are shown where relevant.
- [ ] Main data/request flows are labeled.

## Gate B: Quality Attributes

- [ ] Reliability: redundancy, failover, backup/restore, recovery assumptions.
- [ ] Security: authentication, authorization, secrets, encryption, network exposure.
- [ ] Performance: scaling, caching, indexes/query plans, async processing, bottlenecks.
- [ ] Operability: monitoring, logs, traces, alerts, runbooks, incident path.
- [ ] Cost: managed service choices, scaling boundaries, storage lifecycle.
- [ ] Maintainability: ownership boundaries, module/service responsibilities, API contracts.

## Gate C: Decision Quality

- [ ] Each major service choice has rationale.
- [ ] Tradeoffs are explicit.
- [ ] Alternatives are captured when the decision is high impact.
- [ ] Risks are recorded instead of hidden.
- [ ] Sources are listed for provider/database-specific best practices.

## Status Semantics

Use in `meta.reviewFindings`:
- `pass`: addressed sufficiently for current scope.
- `warning`: acceptable only with documented rationale or future action.
- `fail`: should not be presented as production-ready.
