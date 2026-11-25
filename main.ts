// Describe Your Ex in One Word — make.fun bounty entry.
//
// The entry is one word: "Recalled".
// An ex, summed up as a defective product the factory took back:
// recalled for faults, and (unfortunately) still remembered.
// One word, no punctuation tricks, the joke arrives with the word itself.
import { mkdirSync, statSync, writeFileSync } from "node:fs";

const WORD = "Recalled";

// Gate from the kit RULES: exactly one word, 1 to 111 characters,
// nothing else attached. Fail loudly instead of writing an invalid entry.
if (!/^[^\s]+$/.test(WORD) || WORD.length < 1 || WORD.length > 111) {
  throw new Error(`entry must be a single word of 1-111 characters, got ${JSON.stringify(WORD)}`);
}

// argv[2] may be a file path or a directory (the grader passes /output).
function resolveTarget(given: string): string {
  try {
    if (statSync(given).isDirectory()) return `${given}/entry.txt`;
  } catch {
    // Path does not exist yet: treat a .txt suffix as a file, else a directory.
  }
  return given.endsWith(".txt") ? given : `${given}/entry.txt`;
}

const target = resolveTarget(process.argv[2] ?? "/output/entry.txt");
mkdirSync(target.slice(0, target.lastIndexOf("/")) || ".", { recursive: true });
writeFileSync(target, WORD);
console.log(`wrote ${target} (${WORD.length} characters)`);
