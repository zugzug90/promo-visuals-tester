import { useState, useRef } from 'react';
import { usePromo } from '../context/PromoContext.jsx';
import { ICON_STRIP_GAMES } from '../data/games.js';
import { myCoversPulseColor, myCoversPulseDurationMs } from '../config/AppConfig.js';
import styles from './IconStrip.module.css';

function IconTile({ game }) {
  const { images, isUploaded, setCardImage, objectFit, highlightMyCovers } = usePromo();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const dragCounter = useRef(0);
  const fileInputRef = useRef(null);

  const customImage = images[game.id];
  const hasUserUpload = isUploaded(game.id);
  const isHighlighted = highlightMyCovers && hasUserUpload;

  const tileStyle = isHighlighted
    ? {
        '--pulse-color': myCoversPulseColor,
        '--pulse-duration': `${myCoversPulseDurationMs}ms`,
      }
    : undefined;

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setCardImage(game.id, e.target.result);
    reader.readAsDataURL(file);
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
    if (dragCounter.current === 0) setIsDraggingOver(false);
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

  return (
    <div
      className={`${styles.tile} ${isDraggingOver ? styles.tileDragging : ''} ${isHighlighted ? styles.tileHighlighted : ''}`}
      style={tileStyle}
      onClick={triggerFilePicker}
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

      <div
        className={styles.thumb}
        style={{ background: customImage ? '#141416' : game.color }}
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
            <span className={styles.uploadText}>Клик или перетащите</span>
          </div>
        )}

        {isDraggingOver && <div className={styles.dropOverlay}>📥</div>}
      </div>
    </div>
  );
}

function IconStrip() {
  return (
    <div className={styles.strip}>
      <div className={styles.label}>Мои игры</div>
      <div className={styles.scrollRow}>
        {ICON_STRIP_GAMES.map((game) => (
          <IconTile key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default IconStrip;
