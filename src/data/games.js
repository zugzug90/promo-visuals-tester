import { AppConfig } from '../config/AppConfig.js';

// Game data model
export class Game {
  constructor({ id, title, color, score, badge, tag }) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.score = score;
    this.badge = badge ?? null; // 'Топовая' | null
    this.tag = tag ?? null;     // 'Турбо' | null
  }
}

export class GameSection {
  constructor({ id, title, games }) {
    this.id = id;
    this.title = title;
    this.games = games;
  }
}

const PALETTE = [
  '#c8a227', '#c8a227', '#1a1a1a', '#a8bf3e', '#18b5c8',
  '#f5f5f5', '#1a3a1a', '#0f2044', '#e8b030', '#1855a8',
  '#42a0d8', '#1a1a8a', '#f5e040', '#ea3030', '#c0e8f8',
  '#a0a0a0', '#1a1a1a', '#f8f8f8', '#8a2f80', '#d0e8b0',
  '#e08030', '#e8e048', '#f8a030', '#30c060', '#a8d808',
  '#c03020', '#2a2a60', '#60c888', '#c8a828', '#a0d0f0',
  '#f08040', '#88c030', '#d8d8d8', '#1040a0', '#58b8e8',
];

const TITLES = [
  'Чвеландские Герои', 'Стрикс', 'Ночи у Фредди 3', 'Ночи у Фредди 2',
  'Черемша и Брдыщ в СССР', 'Нубик Лесоруб', 'Закидай Егорку',
  'Цифровой Цирк: Объединение', 'Отмой Спрунки', 'Очень Наглые Комары',
  'Прокачка Пушек: Брейнроты', 'Собаки против Пришельцев', 'Я Монстр!',
  'Супер Хотпот: Сортировка Еды', 'Фруктовый поток: Цветной фруктовый шутер',
  'Счастья!', 'Соедини все точки', 'Фрукты: Физическое соединение',
  'Симулятор Кейсов: Открой Все Стэнд Боксы', 'Блок Ниндзя!',
  'Школьные Аниме Драмы', 'Шлёпни От Боли', 'Сломай Купол',
  'Uncle Hit: Punch Monster', 'Распаковка Монстров', 'Tank Fury: Битва',
  'Пиксельный Ниндзя', 'Hamster Комбо', 'Цветные банки', 'Скайблок 3D',
  'Обби: Цунами', 'Копатель Стиле', 'BlockWorld', 'Нубик Шахтёр',
  'Удар на Стриме Симулятор Хайпа', 'Зонадо: ярость стихии', 'Кот Банан Куда-то Бежит',
  'Художник и Громилы',
];

function makeGames(count, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const isFirstSection = offset === 0;
    const isNewGameBadge = isFirstSection && ((i >= 0 && i < 2) || (i >= 6 && i < 9));

    return new Game({
      id: offset + i,
      title: TITLES[(offset + i) % TITLES.length],
      color: PALETTE[(offset + i) % PALETTE.length],
      score: Math.floor(Math.random() * 60 + 30),
      badge: isNewGameBadge ? 'Новая игра' : ((offset + i) % 7 === 0 ? 'Топовая' : null),
      tag: (offset + i) % 5 === 0 ? 'Турбо' : null,
    });
  });
}

export const SMALL_GAMES = Array.from({ length: 14 }, (_, i) => new Game({
  id: 1000 + i,
  title: TITLES[i % TITLES.length],
  color: PALETTE[(i + 3) % PALETTE.length],
  score: null,
  badge: null,
  tag: null,
}));

// Icon strip games — shown as square 1:1 tiles above the promo sections
export const ICON_STRIP_GAMES = Array.from({ length: 16 }, (_, i) => new Game({
  id: 2000 + i,
  title: TITLES[(i + 7) % TITLES.length],
  color: PALETTE[(i + 9) % PALETTE.length],
  score: null,
  badge: null,
  tag: null,
}));

export const MY_GAMES_LINK = { id: 'my', title: 'Мои игры' };

// 6 cards per row in the grid layout
const CARDS_PER_ROW = 6;
const topSectionRows = AppConfig?.rowsPerRecommendedGamesTopSection ?? 4;
const topSectionGamesCount = topSectionRows * CARDS_PER_ROW;

let currentOffset = 0;
const section1Games = makeGames(topSectionGamesCount, currentOffset);
currentOffset += topSectionGamesCount;

const section2Games = makeGames(6, currentOffset);
currentOffset += 6;

const section3Games = makeGames(12, currentOffset);
currentOffset += 12;

const section4Games = makeGames(6, currentOffset);
currentOffset += 6;

export const SECTIONS = [
  new GameSection({ id: 1, title: 'Рекомендованные игры', games: section1Games }),
  new GameSection({ id: 2, title: 'Рекомендованные игры', games: section2Games }),
  new GameSection({ id: 3, title: 'Популярные сегодня', games: section3Games }),
  new GameSection({ id: 4, title: 'Новинки', games: section4Games }),
];

export function getAllGameIds() {
  const ids = [];
  SECTIONS.forEach((section) => {
    section.games.forEach((game) => ids.push(game.id));
  });
  SMALL_GAMES.forEach((game) => ids.push(game.id));
  ICON_STRIP_GAMES.forEach((game) => ids.push(game.id));
  return ids;
}
