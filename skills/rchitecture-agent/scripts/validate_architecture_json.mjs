#!/usr/bin/env node
import fs from "node:fs";

const target = process.argv[2] || "outputs/codex-diagram.json";
const raw = fs.readFileSync(target, "utf8");
const document = JSON.parse(raw);
const warnings = [];
const failures = [];

function requireArray(path, value) {
  if (!Array.isArray(value)) failures.push(`${path} must be an array`);
}

function hasNodeType(type) {
  return Array.isArray(document.nodes) && document.nodes.some((node) => node.type === type);
}

function hasLabelTerm(terms) {
  const text = JSON.stringify(document).toLowerCase();
  return terms.some((term) => text.includes(term));
}

if (!document.title) failures.push("title is required");
requireArray("groups", document.groups);
requireArray("nodes", document.nodes);
requireArray("edges", document.edges);

const ids = new Set();
for (const node of document.nodes || []) {
  if (!node.id) failures.push("node.id is required");
  if (ids.has(node.id)) failures.push(`duplicate node id: ${node.id}`);
  ids.add(node.id);
  if (!node.label) warnings.push(`node ${node.id} has no label`);
  if (!node.type) warnings.push(`node ${node.id} has no type`);
}

for (const edge of document.edges || []) {
  if (!ids.has(edge.from)) failures.push(`edge.from missing node: ${edge.from}`);
  if (!ids.has(edge.to)) failures.push(`edge.to missing node: ${edge.to}`);
  if (!edge.label) warnings.push(`edge ${edge.from}->${edge.to} has no label`);
}

const meta = document.meta || {};
for (const field of ["viewpoint", "stakeholders", "qualityGoals", "assumptions", "decisions", "risks", "reviewFindings", "sources"]) {
  if (meta[field] === undefined) warnings.push(`meta.${field} is missing`);
}

for (const field of ["stakeholders", "qualityGoals", "assumptions", "decisions", "risks", "reviewFindings", "sources"]) {
  if (meta[field] !== undefined && !Array.isArray(meta[field])) failures.push(`meta.${field} must be an array`);
}

if (!hasNodeType("observability")) warnings.push("observability node is missing");
if (hasNodeType("database") && !hasLabelTerm(["backup", "restore", "replication", "ha", "failover"])) {
  warnings.push("database exists but backup/restore/HA posture is not visible");
}
if (hasNodeType("queue") && !hasLabelTerm(["dlq", "retry", "idempotent"])) {
  warnings.push("queue exists but retry/DLQ/idempotency is not visible");
}
if (hasNodeType("edge") && !hasLabelTerm(["waf", "firewall", "armor", "tls", "auth", "rate"])) {
  warnings.push("public edge exists but security control is not visible");
}

const result = {
  file: target,
  nodes: document.nodes?.length || 0,
  edges: document.edges?.length || 0,
  warnings,
  failures
};

console.log(JSON.stringify(result, null, 2));
if (failures.length > 0) process.exit(1);
