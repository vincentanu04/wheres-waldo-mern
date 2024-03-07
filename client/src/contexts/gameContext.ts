import { Game } from '@/pages/Game/Game';
import { createContext } from 'react';

export const GameContext = createContext<{
  game: Game | null;
  setGame: React.Dispatch<React.SetStateAction<Game | null>>;
}>({ game: null, setGame: () => {} });
