import React from 'react';
import styles from './GameCard.module.css';

function GameCard({ game }) {
  return (
    <div className={styles.card}>
      {game.badge && (
        <div className={styles.badge}>{game.badge}</div>
      )}
      <div className={styles.thumb} style={{ background: game.color }}>
        {game.tag === 'Турбо' && (
          <div className={styles.tagTurbo}>⚡ Турбо</div>
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{game.title}</span>
        {game.score !== null && (
          <span className={styles.score}>{game.score}</span>
        )}
      </div>
    </div>
  );
}

export default GameCard;
