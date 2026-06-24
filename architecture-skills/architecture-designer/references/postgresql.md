# PostgreSQL Architecture Reference

Primary source:
- PostgreSQL documentation: https://www.postgresql.org/docs/current/

Relevant official documentation areas include:
- Server configuration
- Client authentication
- Database roles
- Routine maintenance
- Backup and restore
- High availability, load balancing, and replication
- Monitoring database activity
- Reliability and write-ahead log
- Performance tips and indexes

## Diagram Expectations

When PostgreSQL appears, consider:
- Ownership: which service owns the schema and writes.
- Connectivity: private network, connection pooling, TLS where applicable.
- Access control: roles, least privilege, migration user separation.
- Backup/restore: logical or physical backups, PITR, retention, restore testing.
- HA/replication: primary/standby, read replicas, failover, replication lag.
- Performance: indexes, query plans, connection limits, pooling, vacuum/analyze, partitioning.
- Observability: slow queries, locks, replication lag, disk, WAL, CPU, memory, connections.
- Data lifecycle: retention, archival, deletion, PII handling.

## Mandatory Warnings

Warn if:
- PostgreSQL is central but no backup/restore path is shown.
- Multiple services write to the same schema without ownership boundaries.
- High availability is claimed without replication/failover details.
- Heavy traffic is expected but there is no connection pooling or read/write strategy.
- Sensitive data exists without access control and encryption posture.
