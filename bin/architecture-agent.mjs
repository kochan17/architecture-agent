#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const packageRoot = path.resolve(path.dirname(__filename), "..");
const cwd = process.cwd();

const commands = new Set(["init", "open", "validate", "where", "help"]);
const command = process.argv[2] && commands.has(process.argv[2]) ? process.argv[2] : "help";

function usage() {
  console.log(`Architecture Agent

Usage:
  architecture-agent init [directory]      Copy the studio, sample JSON, and skill pack into a project
  architecture-agent open [directory]      Open architecture-studio.html in the default browser
  architecture-agent validate [json-file]  Validate an Architecture Agent/Codex architecture JSON file
  architecture-agent where                 Print this package location
  architecture-agent help                  Show this help
`);
}

function copyRecursive(source, target) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const item of fs.readdirSync(source)) {
      copyRecursive(path.join(source, item), path.join(target, item));
    }
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function init() {
  const target = path.resolve(cwd, process.argv[3] || "architecture-agent-workspace");
  copyRecursive(path.join(packageRoot, "outputs"), path.join(target, "outputs"));
  copyRecursive(path.join(packageRoot, "skills"), path.join(target, "skills"));
  console.log(`Created ${target}`);
  console.log(`Open: ${path.join(target, "outputs", "architecture-studio.html")}`);
  console.log(`Validate: node ${path.join(target, "skills", "architecture-agent", "scripts", "validate_architecture_json.mjs")} ${path.join(target, "outputs", "codex-diagram.json")}`);
}

function openStudio() {
  const targetDir = path.resolve(cwd, process.argv[3] || ".");
  const html = path.join(targetDir, "outputs", "architecture-studio.html");
  if (!fs.existsSync(html)) {
    console.error(`Not found: ${html}`);
    console.error("Run `architecture-agent init` first, or pass a directory that contains outputs/architecture-studio.html.");
    process.exit(1);
  }
  const opener = process.platform === "darwin" ? "open" : process.platform === "win32" ? "cmd" : "xdg-open";
  const args = process.platform === "win32" ? ["/c", "start", "", html] : [html];
  const result = spawnSync(opener, args, { stdio: "inherit" });
  process.exit(result.status || 0);
}

function validate() {
  const jsonFile = path.resolve(cwd, process.argv[3] || "outputs/codex-diagram.json");
  const validator = path.join(packageRoot, "skills", "architecture-agent", "scripts", "validate_architecture_json.mjs");
  const result = spawnSync(process.execPath, [validator, jsonFile], { stdio: "inherit" });
  process.exit(result.status || 0);
}

if (command === "help") usage();
if (command === "where") console.log(packageRoot);
if (command === "init") init();
if (command === "open") openStudio();
if (command === "validate") validate();
