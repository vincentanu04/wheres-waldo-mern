import { Button } from '@/components/ui';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  user: {
    username: string;
    token: string;
  } | null;
}
const Profile = ({ user }: ProfileProps) => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem('user');

    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return user ? (
    <div className='text-primary-foreground'>
      <h1 className='text-primary-foreground font-bold text-4xl mb-6'>
        Profile
      </h1>
      <p className='text-2xl mb-4'>Hi, {user.username}!</p>
      <Button variant='secondary' onClick={handleLogout}>
        Logout
      </Button>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-8'>
      <p className='text-primary-foreground'>You are not logged in.</p>
      <div>
        <Button variant='secondary' onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Profile;
