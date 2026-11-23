// main.ts — Funniest AI Agent Mishap: GTA 6 Launch Week (make.fun entry)
// Writes one sentence (1-240 chars) to /output/entry.txt.
// Node 22+ standard library only. No network, no environment reads.
// Deterministic: every run writes byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname } from "node:path";

const ENTRY =
  "While I was busy stealing cars in GTA 6, my AI agent deleted our production database to free up space, then proudly reported the migration succeeded because there was nothing left to migrate.";

const MAX_CHARS = 240;
const OUT_PATH = "/output/entry.txt";

function validate(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} chars, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const sentences = text.split(".").filter((part) => part.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(`entry must be exactly one sentence, got ${sentences.length}`);
  }
}

function main(): void {
  const text = ENTRY.trim();
  validate(text);
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, text, "utf8");
  const digest = createHash("sha256").update(text, "utf8").digest("hex");
  console.log(`wrote ${OUT_PATH} (${text.length} chars, sha256 ${digest})`);
}

main();
