# MySQL Architecture Reference

Primary source:
- MySQL 8.4 Reference Manual: https://dev.mysql.com/doc/refman/8.4/en/

Relevant official documentation areas include:
- Security
- Access control and account management
- Encrypted connections
- Backup and recovery
- Optimization
- Indexes
- InnoDB storage engine
- Replication and group replication

## Diagram Expectations

When MySQL appears, consider:
- Storage engine assumptions, usually InnoDB.
- Connectivity: private network, TLS, connection pooling/proxy if needed.
- Access control: accounts, roles/privileges, password policy, audit needs.
- Backup/recovery: logical/physical backup, binlog/PITR, retention, restore testing.
- HA/replication: replicas, group replication, failover, replication lag.
- Performance: indexes, EXPLAIN, buffer pool, query patterns, lock contention.
- Operations: monitoring, slow query log, replication health, disk growth.

## Mandatory Warnings

Warn if:
- MySQL is a critical dependency but no backup/recovery strategy is described.
- Replication is used without failover and lag handling.
- Application writes are spread across services without data ownership.
- Public access or weak privilege boundaries are implied.
- Performance-sensitive workloads lack indexing/query-plan considerations.
