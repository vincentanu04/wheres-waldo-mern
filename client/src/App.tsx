import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game, Home, Layout } from './pages';
import { Game as GameType } from './pages/Game/Game';
import { useState } from 'react';
import { GameContext } from './contexts/gameContext';

function App() {
  const [game, setGame] = useState<GameType | null>(null);

  return (
    <GameContext.Provider value={{ game: game, setGame: setGame }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout user={true} />}>
            <Route index element={<Home />} />
            <Route path='/game/:gameID' element={<Game />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameContext.Provider>
  );
}

export default App;
