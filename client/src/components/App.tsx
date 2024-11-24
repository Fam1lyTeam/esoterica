import { useEffect } from 'react';
import { useLaunchParams, miniApp, useSignal, initData } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Navigate, Route, Routes, HashRouter, type RouteObject } from 'react-router-dom';
import { loadLanguage } from '@/localization/i18n';
import { routes } from '@/core/routes';
import { DateProvider } from '@/core/DateContext';
import { Layout } from '@/components/Layout/Layout';

import '@/assets/global.css';
import '@/assets/font.css';
import '@/assets/esoterica.css';

 type RouteWithChildren = RouteObject & {
  Component: React.ComponentType<any>;
  children?: RouteWithChildren[];
}; 

export const App: React.FC = () => {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const initDataState = useSignal(initData.state);

  useEffect(() => {
    const userLang = initDataState?.user?.languageCode ? initDataState.user.languageCode : 'ru';
    loadLanguage(userLang);
  }, []);

  const renderRoutes = (routes: RouteWithChildren[]) =>
    routes.map(({ path, Component, children }) => (
      <Route key={path} path={path} element={<Component />}>
        {children && renderRoutes(children)}
      </Route>
    ));

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <DateProvider>
          <Layout>
            <Routes>
              {renderRoutes(routes)}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes> 
          </Layout>
        </DateProvider>
      </HashRouter>
    </AppRoot>
  );
}
