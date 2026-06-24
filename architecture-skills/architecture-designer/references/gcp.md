# Google Cloud Architecture Reference

Primary source:
- Google Cloud Well-Architected Framework: https://docs.cloud.google.com/architecture/framework

Google Cloud review lenses include:
- Operational excellence
- Security, privacy, and compliance
- Reliability
- Cost optimization
- Performance optimization
- Sustainability

Deployment archetypes include:
- Zonal
- Regional
- Multi-regional
- Global
- Hybrid
- Multicloud

## GCP Diagram Expectations

For production Google Cloud workloads, consider:
- Resource hierarchy: organization, folders, projects, environments.
- Identity and access: IAM, service accounts, workload identity, least privilege.
- Network: VPC, subnets, load balancers, Cloud Armor, private access, egress controls.
- Compute: Cloud Run, GKE, Compute Engine, Cloud Functions, or App Engine with scaling posture.
- Data: Cloud SQL, AlloyDB, Spanner, BigQuery, Cloud Storage with backup/restore and encryption.
- Reliability: zones/regions, health checks, managed failover, redundancy, graceful degradation.
- Operations: Cloud Logging, Monitoring, Trace, Error Reporting, SLOs, incident response.
- Cost: quotas, autoscaling, storage lifecycle, committed use where relevant.

## Common GCP Patterns

- Web app: Cloud Load Balancing + Cloud Armor + Cloud Run/GKE + Cloud SQL + Cloud Monitoring.
- Global app: global load balancer + regional backends + Spanner/replicated data strategy.
- Data analytics: Pub/Sub + Dataflow + BigQuery + Cloud Storage + governance and monitoring.
- Kubernetes: GKE + Gateway/Ingress + service mesh if needed + workload identity + observability.

## Mandatory Warnings

Warn if:
- Cloud SQL appears without backup, HA/failover, maintenance, and connection management.
- GKE appears without workload identity, network policy, autoscaling, and observability.
- Public ingress appears without Cloud Armor/auth/rate-limiting discussion.
- Multi-region is claimed without data consistency and failover strategy.
- BigQuery/data platform appears without governance, partitioning/cost controls, and data quality.
