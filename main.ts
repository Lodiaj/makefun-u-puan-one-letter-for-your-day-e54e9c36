// One Letter for Your Day — make.fun entry
// The entry is exactly one letter, A-Z, standing for the word that
// describes the day. This letter is Z: the hidden word is "zombie" —
// a day shuffled through on zero sleep, running on fumes, brain
// half-offline. Vivid, funny, and true: everyone has had a zombie day.
//
// The program writes exactly one character to /output/entry.txt and
// nothing else: no word, no gloss, no punctuation, no newline.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LETTER = "Z";
const OUT = "/output/entry.txt";

// Guard: the entry must be exactly one ASCII letter, A-Z.
if (!/^[A-Z]$/.test(LETTER)) {
  throw new Error(`letter must be a single A-Z character, got ${JSON.stringify(LETTER)}`);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, LETTER, "utf8");

// Byte-length gate + round-trip verification: the file on disk must be
// exactly 1 byte and that byte must be the letter, nothing else.
const back = readFileSync(OUT, "utf8");
if (Buffer.byteLength(back, "utf8") !== 1 || back !== LETTER) {
  throw new Error(
    `round-trip check failed: expected exactly 1 byte ${JSON.stringify(LETTER)}, got ${JSON.stringify(back)}`,
  );
}
console.log(`wrote ${LETTER} to ${OUT}`);
