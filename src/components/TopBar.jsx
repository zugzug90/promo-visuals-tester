import { useState, useRef } from 'react';
import { SearchIcon, ArrowRightIcon } from './Icons.jsx';
import { SMALL_GAMES, MY_GAMES_LINK } from '../data/games.js';
import { usePromo } from '../context/PromoContext.jsx';
import styles from './TopBar.module.css';

function SmallGameTile({ game }) {
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

  return (
    <div
      className={`${styles.smallTile} ${isDraggingOver ? styles.smallTileDragging : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className={styles.smallThumb}
        style={{ background: customImage ? '#141416' : game.color }}
      >
        {customImage && (
          <img
            src={customImage}
            alt={game.title}
            className={styles.smallUploadedImage}
            style={{ objectFit: objectFit || 'cover' }}
          />
        )}
        {isDraggingOver && <div className={styles.smallDropOverlay}>📥</div>}
      </div>
      <span className={styles.smallTitle}>{game.title}</span>
    </div>
  );
}

function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.myGamesBtn}>
        <span>{MY_GAMES_LINK.title}</span>
        <ArrowRightIcon size={14} />
      </div>

      <div className={styles.scrollRow}>
        {SMALL_GAMES.map((g) => (
          <SmallGameTile key={g.id} game={g} />
        ))}
      </div>

      <div className={styles.searchBar}>
        <SearchIcon />
        <input
          className={styles.searchInput}
          placeholder="Найти игру или жанр"
          readOnly
        />
      </div>

      <div className={styles.headerActions}>
        <button className={styles.steamBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0z"/>
          </svg>
          <span>Ключи Steam</span>
        </button>
        <button className={styles.promoBtn}>
          <span>⚡ Время приключений</span>
        </button>
        <button className={styles.aiBtn}>🤖 Игры AI</button>
        <div className={styles.coinsBadge}>
          <span>🪙</span>
          <span>0</span>
        </div>
        <button className={styles.iconCircle}>🔔</button>
        <div className={styles.avatarBtn}>
          <div className={styles.notifBadge}>2</div>
          <div className={styles.avatar} />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
