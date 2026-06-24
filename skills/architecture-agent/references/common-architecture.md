# Common Architecture Foundation

Sources:
- ISO/IEC/IEEE 42010:2022: https://www.iso.org/standard/74393.html
- C4 model: https://c4model.com/
- arc42: https://arc42.org/overview

## Minimum Bar

An architecture output must cover more than boxes and arrows.

Always identify:
- System purpose and scope
- Stakeholders and concerns
- Viewpoint: context, container, component, runtime, deployment, data, or security
- Quality goals: reliability, security, performance, maintainability, operability, cost, compliance
- Constraints: organization, technology, regulation, timeline, budget
- Key decisions and rationale
- Known risks and technical debt

## View Selection

- Context view: users, external systems, high-level responsibilities.
- Container view: deployable/runtime units, data stores, major communication paths.
- Component view: internals of a container or service.
- Runtime view: important scenarios, sequence, error handling, retries, timeouts.
- Deployment view: regions, zones, networks, compute, storage, routing.
- Data view: ownership, schema, lifecycle, consistency, backup/restore.
- Security view: identities, trust boundaries, secrets, encryption, authorization, audit.

## Review Heuristics

Reject or warn if:
- No clear boundary between external users, edge, app, data, and operations.
- Database is present but backup/restore, monitoring, and access control are absent.
- Public ingress exists but authentication, authorization, TLS, WAF/firewall, or rate limiting is absent without rationale.
- Async processing exists but retry, dead-letter handling, idempotency, and observability are absent.
- Multi-service architecture exists but ownership, API boundaries, and failure isolation are unclear.
- Claims of high availability appear without redundancy across failure domains.
- Expensive or complex managed services appear without cost or operational rationale.

## Required Metadata

When writing `outputs/codex-diagram.json`, include:
- `meta.viewpoint`
- `meta.stakeholders`
- `meta.qualityGoals`
- `meta.assumptions`
- `meta.decisions`
- `meta.risks`
- `meta.reviewFindings`
- `meta.sources`
