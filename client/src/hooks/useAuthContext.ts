import { AuthContext, AuthContextType } from '@/contexts/authContext';
import { useContext } from 'react';

export const useAuthContext = () => {
  const context: AuthContextType | undefined = useContext(AuthContext);

  if (!context) {
    throw Error('AuthContext must be used inside an AuthContextProvider');
  }

  return context;
};
