# AWS Architecture Reference

Primary source:
- AWS Well-Architected Framework: https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html

AWS Well-Architected uses these review lenses:
- Operational excellence
- Security
- Reliability
- Performance efficiency
- Cost optimization
- Sustainability

## AWS Diagram Expectations

For production AWS workloads, consider:
- Account and environment separation when relevant.
- VPC boundaries, public/private subnets, route tables, NAT/egress if network topology matters.
- Edge controls: CloudFront, WAF, Route 53, ALB/API Gateway where appropriate.
- Identity and access: IAM roles, least privilege, secrets handling, workload identity.
- Data protection: encryption in transit/at rest, KMS, backup/restore, retention.
- Reliability: multi-AZ services, health checks, autoscaling, failover, queue-based decoupling.
- Operations: CloudWatch logs/metrics/alarms, tracing, dashboards, runbooks.
- Cost: right-sizing, autoscaling, storage lifecycle, reserved/savings options where relevant.

## Common AWS Patterns

- Web app: CloudFront + WAF + ALB/API Gateway + private app tier + managed database.
- Serverless API: API Gateway + Lambda + DynamoDB/RDS + EventBridge/SQS + CloudWatch.
- Event-driven: producer services + EventBridge/SNS/SQS/Kinesis + consumers + DLQ + idempotency.
- Data platform: ingestion + durable raw storage + transformation + warehouse/lakehouse + governance.

## Mandatory Warnings

Warn if:
- A public workload lacks WAF/rate limiting/authentication discussion.
- RDS/Aurora appears without backup, Multi-AZ/read replica/restore posture.
- SQS/EventBridge/Kinesis appears without DLQ/retry/idempotency.
- Lambda appears without timeout, concurrency, retry, and observability concerns.
- S3 appears without lifecycle, access control, encryption, and public access posture.
