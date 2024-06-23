import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  user: {
    username: string;
    token: string;
  } | null;
}
const Profile = ({ user }: ProfileProps) => {
  const navigate = useNavigate();
  return user ? (
    <></>
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
