/**
 * Generate a seed from today's date.
 * @returns a seed as a number
 */
export function getSeedFromToday() {
  const date = new Date();

  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();

  return ((y * 10000 + m * 100 + d) * 100) >>> 0;
}

/**
 * Create a seeded PRNG function. \
 * Source: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
 * @param seed the seed
 * @returns a PRNG function
 */
export function mulberry32(seed: number): () => number {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}