import { PropsWithChildren } from 'react';
import { NavigationBar } from '@/components/Navigation/NavigationBar';

import './Layout.css'

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="body-container">
      <main className="main-container">
        <div className="content-container">
          {children}
        </div>
        <NavigationBar/>
      </main>
    </div>
  );
};

