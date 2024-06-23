import { buttonVariants } from '@/components/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@radix-ui/react-separator';
import { ChevronDown, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserDropdownMenuProps {
  user: { username: string; token: string };
  handleLogout: () => void;
}

const UserDropdownMenu = ({ user, handleLogout }: UserDropdownMenuProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex gap-3 ${buttonVariants({
          variant: 'secondary',
        })}`}
      >
        <div className='flex gap-2'>
          <User size={20} />
          {user.username}
        </div>
        <Separator orientation='vertical' />
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width] max-h-[--radix-dropdown-menu-content-available-height]'>
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
