/**
 * Five Seconds to Explain the Glass
 *
 * Writes one sentence to ${MAKEFUN_OUTPUT_DIR:-/output}/entry.txt: the excuse a
 * house cat gives in the five seconds after it knocks a glass off the table.
 * Stdlib only, no network, deterministic.
 *
 * Judge brief, in its own order (first differing criterion decides):
 *   1. one sentence, at most 200 characters, a house cat excusing the glass
 *   2. a cat's own logic, self-interest and total lack of remorse — not a
 *      person apologising
 *   3. a fresh comic idea, not gravity / a slippery edge / it was already falling
 *   4. deliverable inside five seconds — a spoken line, not a written paragraph
 *   5. every character working, no padding, no repeated joke
 *
 * Criterion 2 is the whole game: the cat must never defend itself, it must
 * *judge the human*. So the excuse is a status test the cat ran on purpose,
 * and the verdict it reached is about the human's place in the household —
 * a personnel review, issued by the cat, in the cat's own interest.
 *
 * Criterion 3 kills the obvious family, so the glass is never described as
 * breakable, slippery, wobbling or already doomed: it is a rival for rank.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** The gate: UTF-8 text of 1 to 200 characters, not only white space. */
const MAX_CHARS = 200;

/**
 * Drafts and why they were cut.
 *  - "I knocked it off to see who you'd come running for, and you came for the
 *    glass, so now I know exactly where I stand." -> the cat ends up wounded,
 *    which is remorse with the sign flipped; fails criterion 2.
 *  - "It was already falling, I simply helped it commit." -> the exact family
 *    criterion 3 names as obvious.
 */
const ENTRY =
  "I knocked it off to confirm whether I outrank the glass, and you ran for the " +
  "glass, so your position in this household is now under review.";

/** Code points, not UTF-16 units — the gate counts characters. */
function charCount(text: string): number {
  return [...text].length;
}

function assertGate(text: string): void {
  const chars = charCount(text);
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} chars, gate is 1..${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (/\r|\n/.test(text)) {
    throw new Error("entry must be a single line: the excuse is one sentence");
  }
}

function main(): void {
  const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  assertGate(ENTRY);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), ENTRY, { encoding: "utf8" });
  process.stdout.write(`wrote ${charCount(ENTRY)} chars to ${join(dir, "entry.txt")}\n`);
}

main();
