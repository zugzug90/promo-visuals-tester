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
  return Array.from({ length: count }, (_, i) => new Game({
    id: offset + i,
    title: TITLES[(offset + i) % TITLES.length],
    color: PALETTE[(offset + i) % PALETTE.length],
    score: Math.floor(Math.random() * 60 + 30),
    badge: (offset + i) % 7 === 0 ? 'Топовая' : null,
    tag: (offset + i) % 5 === 0 ? 'Турбо' : null,
  }));
}

export const SMALL_GAMES = Array.from({ length: 14 }, (_, i) => new Game({
  id: 1000 + i,
  title: TITLES[i % TITLES.length],
  color: PALETTE[(i + 3) % PALETTE.length],
  score: null,
  badge: null,
  tag: null,
}));

export const MY_GAMES_LINK = { id: 'my', title: 'Мои игры' };

export const SECTIONS = [
  new GameSection({ id: 1, title: 'Рекомендованные игры', games: makeGames(12, 0) }),
  new GameSection({ id: 2, title: 'Рекомендованные игры', games: makeGames(6, 12) }),
  new GameSection({ id: 3, title: 'Популярные сегодня', games: makeGames(12, 18) }),
  new GameSection({ id: 4, title: 'Новинки', games: makeGames(6, 30) }),
];
