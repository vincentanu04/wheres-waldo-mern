import { Dispatch, ReactNode, createContext, useReducer } from 'react';

interface User {
  username: string;
}

export interface AuthState {
  user: User | null;
}

type AuthAction = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' };

export interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log('AUTH CONTEXT STATE:', state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
