import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game, Home, Layout } from './pages';
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
              <Route path='/game/:gameID' element={<Game />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GameContext.Provider>
    </NavFooterContext.Provider>
  );
}

export default App;
