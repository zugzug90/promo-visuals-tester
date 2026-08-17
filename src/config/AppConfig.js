/**
 * Application Configuration
 */
export const AppConfig = {
  /**
   * Количество рядов в первой секции "Рекомендованные игры".
   * В одном ряду отображается 6 карточек.
   * Дефолтное значение: 4 (4 * 6 = 24 карточки).
   */
  rowsPerRecommendedGamesTopSection: 4,

  /**
   * Порог рейтинга, выше которого бейдж score отображается
   * с ярко-зелёным фоном вместо стандартного серого.
   */
  greenRatingThreshold: 75,
};

export const rowsPerRecommendedGamesTopSection = AppConfig.rowsPerRecommendedGamesTopSection;
export const greenRatingThreshold = AppConfig.greenRatingThreshold;

export default AppConfig;
