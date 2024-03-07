import { buttonVariants } from '@/components/ui';
import { GameContext } from '@/contexts/gameContext';
import { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface LayoutProps {
  user: boolean;
}

const Layout = ({ user }: LayoutProps) => {
  const { game } = useContext(GameContext);
  const { pathname } = useLocation();
  const playingGame = pathname.includes('/game/');

  return (
    <div className='flex flex-col min-h-screen bg-primary'>
      <nav className='py-3 px-3 md:px-20 flex justify-between border-b border-neutral-900 sticky top-0 bg-primary z-50'>
        <Link to='/' className='flex items-center gap-1'>
          <img src='/assets/waldo.svg' alt='Logo' width='40' />
          <h1 className='font-bold text-xl text-primary-foreground'>Waldo?</h1>
        </Link>
        <div className='flex md:gap-4'>
          <Link to='/' className={buttonVariants({ variant: 'link' })}>
            Play
          </Link>
          {user ? (
            <Link
              to='/login'
              className={`${buttonVariants({
                variant: 'secondary',
              })}`}
            >
              Login
            </Link>
          ) : (
            <></>
          )}
        </div>
      </nav>
      <main className='h-full grow'>
        <Outlet />
      </main>
      <footer
        className={`py-2 text-primary-foreground flex flex-col content-center text-xs border-t border-neutral-900 gap-1 bg-primary ${
          playingGame ? 'sticky bottom-0' : ''
        }`}
      >
        {playingGame ? (
          <div className='text-primary-foreground flex items-center justify-center gap-6'>
            <p className='hidden md:block'>You need to find:</p>
            {game?.targets.map(({ name, src }, index) => (
              <div className='flex gap-2 items-center font-bold' key={index}>
                <img
                  src={src}
                  alt={`target ${index + 1}`}
                  width={40}
                  className='max-h-10 object-cover'
                />
                <p>{name}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className='self-center'>Created by Vincent Tanuwidjaja.</p>
            <Link
              to='https://github.com/vincentanu04'
              className='flex self-center items-center gap-1'
            >
              <img src='/assets/github.svg' alt='Github logo' width={20} />
              <p className='text-blue-300 underline'>
                https://github.com/vincentanu04
              </p>
            </Link>
          </>
        )}
      </footer>
    </div>
  );
};

export default Layout;
