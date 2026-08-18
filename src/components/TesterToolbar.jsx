import { usePromo } from '../context/PromoContext.jsx';
import styles from './TesterToolbar.module.css';

const ASPECT_RATIOS = [
  { label: '16 : 9', value: '16 / 9' },
  { label: '1 : 1', value: '1 / 1' },
  { label: '3 : 4', value: '3 / 4' },
  { label: '4 : 3', value: '4 / 3' },
];

const FIT_MODES = [
  { label: 'Cover (заполнить)', value: 'cover' },
  { label: 'Contain (вписать)', value: 'contain' },
];

function TesterToolbar() {
  const {
    images,
    uploadedImages,
    clearAllImages,
    randomizeAllImages,
    aspectRatio,
    setAspectRatio,
    objectFit,
    setObjectFit,
    highlightMyCovers,
    toggleHighlightMyCovers,
  } = usePromo();

  const count = Object.keys(images).length;
  const uploadedCount = Object.keys(uploadedImages || {}).length;

  return (
    <div className={styles.toolbar}>
      <div className={styles.leftGroup}>
        <div className={styles.tag}>
          <span className={styles.pulseDot} />
          <span>Тестер промо-карточек</span>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.label}>Соотношение сторон:</span>
          <div className={styles.btnGroup}>
            {ASPECT_RATIOS.map((item) => (
              <button
                key={item.value}
                className={`${styles.toggleBtn} ${
                  aspectRatio === item.value ? styles.active : ''
                }`}
                onClick={() => setAspectRatio(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.label}>Подгонка:</span>
          <div className={styles.btnGroup}>
            {FIT_MODES.map((item) => (
              <button
                key={item.value}
                className={`${styles.toggleBtn} ${
                  objectFit === item.value ? styles.active : ''
                }`}
                onClick={() => setObjectFit(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.rightGroup}>
        <div className={styles.counterBadge}>
          🖼️ Карточек: <strong>{count}</strong>
          {uploadedCount > 0 && (
            <span style={{ marginLeft: '6px', opacity: 0.85, fontSize: '0.85em', color: '#a394ff' }}>
              (загружено: <strong>{uploadedCount}</strong>)
            </span>
          )}
        </div>

        <button className={styles.clearBtn} onClick={randomizeAllImages} title="Выбрать случайные промо из образцов">
          🎲 Перемешать случайные
        </button>

        <button
          className={`${styles.highlightBtn} ${highlightMyCovers ? styles.highlightBtnActive : ''}`}
          onClick={toggleHighlightMyCovers}
          title="Подсветить карточки с вашими загрузками"
        >
          {highlightMyCovers ? '💡 Скрыть Мои Обложки' : '💡 Подсветить Мои Обложки'}
        </button>

        <a
          className={styles.linkBtn}
          href="https://telegram.me/TheRoom606"
          target="_blank"
          rel="noopener noreferrer"
          title="Перейти в канал автора: TG @TheRoom606"
        >
          <img className={styles.linkIcon} src="/telegram_icon.png" alt="Telegram" />
          <span>Канал Автора (@TheRoom606)</span>
        </a>

        <button className={styles.clearBtn} onClick={clearAllImages} title="Сбросить всё">
          🗑️ Сбросить всё
        </button>
      </div>
    </div>
  );
}

export default TesterToolbar;
