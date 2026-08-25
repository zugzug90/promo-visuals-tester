/**
 * List of available sample promo covers in public/promo_covers_samples
 * Files range from pjpg928x522_211.webp to pjpg928x522_466.webp (256 images total)
 */
const BASE_URL = import.meta.env.BASE_URL || '/';
const buildPublicPath = (relativePath) => {
  const normalizedBase = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
  const normalizedPath = relativePath.replace(/^\/+/, '');
  return `${normalizedBase}${normalizedPath}`;
};

export const PROMO_SAMPLE_IMAGES = Array.from(
  { length: 256 },
  (_, i) => buildPublicPath(`promo_covers_samples/pjpg928x522_${211 + i}.webp`)
);

/**
 * List of available square icon samples in public/promo_icons_samples
 */
export const PROMO_ICON_IMAGES = [
  buildPublicPath('promo_icons_samples/pjpg128x128_x9wA.webp'),
  ...Array.from({ length: 14 }, (_, i) =>
    buildPublicPath(`promo_icons_samples/pjpg128x128_${String(i + 2).padStart(3, '0')}_x9wA.webp`)
  ),
];

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
 * Get a single random sample cover image URL
 */
export function getRandomSampleImage() {
  const index = Math.floor(Math.random() * PROMO_SAMPLE_IMAGES.length);
  return PROMO_SAMPLE_IMAGES[index];
}

/**
 * Get a single random icon image URL
 */
export function getRandomIconImage() {
  const index = Math.floor(Math.random() * PROMO_ICON_IMAGES.length);
  return PROMO_ICON_IMAGES[index];
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

/**
 * Generate a mapping of icon-strip game IDs to random square icon images
 */
export function generateRandomIconMap(gameIds) {
  const shuffled = shuffleArray(PROMO_ICON_IMAGES);
  const result = {};
  gameIds.forEach((id, index) => {
    result[id] = shuffled[index % shuffled.length];
  });
  return result;
}
