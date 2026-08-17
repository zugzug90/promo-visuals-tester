/**
 * List of available sample promo covers in public/promo_covers_samples
 * Files range from pjpg928x522_211.webp to pjpg928x522_466.webp (256 images total)
 */
export const PROMO_SAMPLE_IMAGES = Array.from(
  { length: 256 },
  (_, i) => `/promo_covers_samples/pjpg928x522_${211 + i}.webp`
);

/**
 * Fisher-Yates shuffle helper
 */
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Get a single random sample image URL
 */
export function getRandomSampleImage() {
  const index = Math.floor(Math.random() * PROMO_SAMPLE_IMAGES.length);
  return PROMO_SAMPLE_IMAGES[index];
}

/**
 * Generate a mapping of game IDs to random promo cover images
 */
export function generateRandomImageMap(gameIds) {
  const shuffled = shuffleArray(PROMO_SAMPLE_IMAGES);
  const result = {};
  gameIds.forEach((id, index) => {
    result[id] = shuffled[index % shuffled.length];
  });
  return result;
}
