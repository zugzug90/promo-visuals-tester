import React from 'react';
import GameCard from './GameCard.jsx';
import styles from './GamesSection.module.css';

function GamesSection({ section }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{section.title}</h2>
        <a className={styles.allLink} href="#">Все игры →</a>
      </div>
      <div className={styles.grid}>
        {section.games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}

export default GamesSection;
