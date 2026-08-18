import { useState, useRef } from 'react';
import { usePromo } from '../context/PromoContext.jsx';
import { greenRatingThreshold, myCoversPulseColor, myCoversPulseDurationMs } from '../config/AppConfig.js';
import styles from './GameCard.module.css';

function GameCard({ game }) {
  const { images, isUploaded, setCardImage, removeCardImage, aspectRatio, objectFit, highlightMyCovers } = usePromo();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const dragCounter = useRef(0);
  const fileInputRef = useRef(null);

  const customImage = images[game.id];
  const hasUserUpload = isUploaded(game.id);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setCardImage(game.id, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDraggingOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDraggingOver(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
    e.target.value = '';
  };

  const triggerFilePicker = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleClearImage = (e) => {
    e.stopPropagation();
    removeCardImage(game.id);
  };

  const isHighlighted = highlightMyCovers && hasUserUpload;

  return (
    <div
      className={`${styles.card} ${isDraggingOver ? styles.cardDragging : ''} ${isHighlighted ? styles.cardHighlighted : ''}`}
      style={isHighlighted ? {
        '--pulse-color': myCoversPulseColor,
        '--pulse-duration': `${myCoversPulseDurationMs}ms`,
      } : undefined}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {game.badge && (
        <div className={`${styles.badge} ${game.badge === 'Новая игра' ? styles.badgeNew : ''}`}>
          {game.badge}
        </div>
      )}

      <div
        className={styles.thumb}
        style={{
          background: customImage ? '#141416' : game.color,
          aspectRatio: aspectRatio || '16 / 9',
        }}
      >
        {customImage ? (
          <img
            src={customImage}
            alt={game.title}
            className={styles.uploadedImage}
            style={{ objectFit: objectFit || 'cover' }}
          />
        ) : (
          <div className={styles.emptyHint}>
            <span className={styles.uploadIcon}>📥</span>
            <span className={styles.uploadText}>Перетащите сюда</span>
          </div>
        )}



        {game.tag === 'Турбо' && (
          <div className={styles.tagTurbo}>⚡ Турбо</div>
        )}

        {/* Score badge — bottom-left corner of thumb */}
        {game.score !== null && (
          <div
            className={`${styles.score} ${game.score > greenRatingThreshold ? styles.scoreGreen : ''}`}
          >
            {game.score}
          </div>
        )}

        {/* Hover action overlay */}
        <div className={styles.actionOverlay}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={triggerFilePicker}
            title={hasUserUpload ? 'Заменить картинку' : 'Загрузить картинку'}
          >
            {hasUserUpload ? '🔄' : '📁'}
          </button>
          {hasUserUpload && (
            <button
              type="button"
              className={`${styles.actionBtn} ${styles.deleteBtn}`}
              onClick={handleClearImage}
              title="Удалить загруженное промо"
            >
              🗑️
            </button>
          )}
        </div>

        {/* Drag drop active highlight overlay */}
        {isDraggingOver && (
          <div className={styles.dropOverlay}>
            <div className={styles.dropContent}>
              <span className={styles.dropIcon}>✨</span>
              <span className={styles.dropMessage}>Отпустите картинку</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameCard;
