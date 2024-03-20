import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game, Home, Layout, Leaderboard } from './pages';
import { Game as GameType } from './pages/Game/Game';
import { ReactNode, useState } from 'react';
import { GameContext, NavFooterContext } from './contexts';

function App() {
  const [game, setGame] = useState<GameType | null>(null);
  const [nav, setNav] = useState<ReactNode | null>(null);
  const [footer, setFooter] = useState<ReactNode | null>(null);

  return (
    <NavFooterContext.Provider value={{ nav, setNav, footer, setFooter }}>
      <GameContext.Provider value={{ game: game, setGame: setGame }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout user={true} />}>
              <Route index element={<Home />} />
              <Route path='/game/:gameName' element={<Game />} />
              <Route
                path='/game/:gameName/leaderboard'
                element={<Leaderboard />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </GameContext.Provider>
    </NavFooterContext.Provider>
  );
}

export default App;
