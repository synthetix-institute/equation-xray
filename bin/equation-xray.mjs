#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { analyzeText } from "../src/engine.mjs";

function usage() {
  console.error(`Usage:
  node bin/equation-xray.mjs <file> [--json]

Examples:
  node bin/equation-xray.mjs examples/schrodinger.tex
  node bin/equation-xray.mjs examples/transport_closure.tex --json`);
}

const args = process.argv.slice(2);
const file = args.find((arg) => !arg.startsWith("--"));
const asJson = args.includes("--json");

if (!file) {
  usage();
  process.exit(2);
}

const text = await readFile(file, "utf8");
const analysis = analyzeText(text, { sourceName: basename(file) });

if (asJson) {
  process.stdout.write(`${JSON.stringify(analysis, null, 2)}\n`);
} else {
  process.stdout.write(analysis.markdown);
}
