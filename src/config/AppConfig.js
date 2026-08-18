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

  /**
   * Цвет пульсирующей обводки "Мои Обложки".
   * Любой валидный CSS-цвет: '#rrggbb', 'hsl(...)', 'rgba(...)' и т.д.
   */
  myCoversPulseColor: '#ffe033',

  /**
   * Цвет водяного знака в правом верхнем углу.
   * Любой валидный CSS-цвет: '#rrggbb', 'hsl(...)', 'rgba(...)' и т.д.
   */
  watermarkColor: '#4dc8ff',

  /**
   * Прозрачность водяного знака.
   * Значение от 0 до 1, где 0 = полностью прозрачный, 1 = полностью непрозрачный.
   */
  watermarkOpacity: 0.25,

  /**
   * Сила затемнения при наведении на карточку.
   * Значение от 0 до 1, где 0 = нет затемнения, 1 = очень тёмное.
   */
  cardHoverDarkness: 0.18,

  /**
   * Размер шрифта названия игры в карточке.
   * Можно задать в px, rem и других валидных CSS-единицах.
   */
  cardTitleFontSize: '12px',

  /**
   * Цвет названия игры на карточке.
   */
  cardTitleColor: '#ffffff',

  /**
   * Период одного цикла пульсации "Мои Обложки" в миллисекундах.
   * Дефолт: 3000 мс (3 секунды).
   */
  myCoversPulseDurationMs: 3000,
};

export const rowsPerRecommendedGamesTopSection = AppConfig.rowsPerRecommendedGamesTopSection;
export const greenRatingThreshold = AppConfig.greenRatingThreshold;
export const myCoversPulseColor = AppConfig.myCoversPulseColor;
export const watermarkColor = AppConfig.watermarkColor;
export const watermarkOpacity = AppConfig.watermarkOpacity;
export const cardHoverDarkness = AppConfig.cardHoverDarkness;
export const cardTitleFontSize = AppConfig.cardTitleFontSize;
export const cardTitleColor = AppConfig.cardTitleColor;
export const myCoversPulseDurationMs = AppConfig.myCoversPulseDurationMs;

export default AppConfig;

