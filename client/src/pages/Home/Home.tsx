import { GameList } from './components';

const Home = () => {
  return (
    <div className='flex flex-col px-6 md:px-20 py-3 md:py-8'>
      <h1 className='text-primary-foreground font-bold text-3xl self-center mb-6 md:mb-10'>
        Let's Play!
      </h1>
      <GameList />
    </div>
  );
};

export default Home;