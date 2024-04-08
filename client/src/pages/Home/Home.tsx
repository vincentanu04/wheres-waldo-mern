import { useContext, useEffect } from 'react';
import { GameList } from './components';
import { NavFooterContext } from '@/contexts';

const Home = () => {
  const { setNav, setFooter } = useContext(NavFooterContext);

  useEffect(() => {
    setNav(null);
    setFooter(null);
  }, []);

  return (
    <div className='flex flex-col px-6 md:px-20 py-3 md:py-6'>
      <h1 className='text-primary-foreground font-bold text-3xl self-center mb-6 md:mb-8'>
        Let's Play!
      </h1>
      <GameList />
    </div>
  );
};

export default Home;
