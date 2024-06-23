import { Game } from '@/pages/Game/Game';

const games: Game[] = [
  {
    id: 1,
    name: 'Meme Supreme',
    imageSrc: '/assets/games/meme/meme.jpg',
    targets: [
      { name: 'Waldo', src: '/assets/games/meme/waldo.jpg' },
      { name: 'Elmo', src: '/assets/games/meme/elmo.jpeg' },
      { name: 'Mojo Jojo', src: '/assets/games/meme/mojojojo.png' },
    ],
  },
  {
    id: 2,
    name: 'Quantum City (hard)',
    imageSrc: '/assets/games/city/city.jpg',
    targets: [
      { name: 'Brian The Dog', src: '/assets/games/city/brianthedog.jpeg' },
      { name: 'Tom', src: '/assets/games/city/tom.jpeg' },
      { name: 'Pokeball', src: '/assets/games/city/pokeball.jpeg' },
    ],
  },
  {
    id: 3,
    name: 'Red & Blue',
    imageSrc: '/assets/games/red&blue/red&blue.jpg',
    targets: [
      { name: 'M&M', src: '/assets/games/red&blue/m&m.jpeg' },
      { name: 'Mario', src: '/assets/games/red&blue/mario.jpeg' },
      { name: 'Angry Bird', src: '/assets/games/red&blue/angrybird.jpeg' },
    ],
  },
];

export default games;
