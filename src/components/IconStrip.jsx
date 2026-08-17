import { useState, useRef } from 'react';
import { usePromo } from '../context/PromoContext.jsx';
import { ICON_STRIP_GAMES } from '../data/games.js';
import styles from './IconStrip.module.css';

function IconTile({ game }) {
  const { images, setCardImage, objectFit } = usePromo();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const dragCounter = useRef(0);

  const customImage = images[game.id];

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setCardImage(game.id, e.target.result);
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
      className={`${styles.tile} ${isDraggingOver ? styles.tileDragging : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className={styles.thumb}
        style={{ background: customImage ? '#141416' : game.color }}
      >
        {customImage && (
          <img
            src={customImage}
            alt={game.title}
            className={styles.uploadedImage}
            style={{ objectFit: objectFit || 'cover' }}
          />
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
