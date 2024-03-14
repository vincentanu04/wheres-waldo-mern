import { ReactNode, createContext } from 'react';

export const NavFooterContext = createContext<{
  nav: ReactNode | null;
  setNav: React.Dispatch<React.SetStateAction<ReactNode | null>>;
  footer: ReactNode | null;
  setFooter: React.Dispatch<React.SetStateAction<ReactNode>>;
}>({ nav: null, setNav: () => {}, footer: null, setFooter: () => {} });
