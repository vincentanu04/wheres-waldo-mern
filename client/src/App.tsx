import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Game, Home, Layout, Leaderboard, Login, Signup } from './pages';
import { Game as GameType } from './pages/Game/Game';
import { ReactNode, useState } from 'react';
import { GameContext, NavFooterContext } from './contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthContext } from './hooks/useAuthContext';
import Profile from './pages/Profile/Profile';

const queryClient = new QueryClient();

function App() {
  const [game, setGame] = useState<GameType | null>(null);
  const [nav, setNav] = useState<ReactNode | null>(null);
  const [footer, setFooter] = useState<ReactNode | null>(null);
  const { state } = useAuthContext();
  const { user } = state;

  return (
    <QueryClientProvider client={queryClient}>
      <NavFooterContext.Provider value={{ nav, setNav, footer, setFooter }}>
        <GameContext.Provider value={{ game: game, setGame: setGame }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout user={user} />}>
                <Route index element={<Home />} />
                <Route path='/game/:gameName' element={<Game />} />
                <Route
                  path='/game/:gameName/leaderboard'
                  element={<Leaderboard />}
                />
                <Route
                  path='/profile'
                  element={<Profile user={user} />}
                ></Route>
                <Route
                  path='/login'
                  element={user ? <Navigate to={'/'} /> : <Login />}
                />
                <Route
                  path='/signup'
                  element={user ? <Navigate to={'/'} /> : <Signup />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </GameContext.Provider>
      </NavFooterContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
