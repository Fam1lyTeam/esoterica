import type { ComponentType, JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Main } from '@/pages/Main/Main';
import { Experts } from '@/pages/Experts/Experts';
import { Earn } from '@/pages/Earn/Earn';
import { Friends } from '@/pages/Friends/Friends';

import { CalculatorIcon } from '@/components/Icons/Calculator';
import { GlobeIcon } from '@/components/Icons/Globe';
import { CoinsIcon } from '@/components/Icons/Coins';
import { UsersIcon } from '@/components/Icons/Users';

interface Route {
  path: string;
  Component: ComponentType;
  titleKey?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { 
    path: '/', 
    Component: Main, 
    titleKey: 'routes.index',
    icon: <CalculatorIcon/> 
  },
  { 
    path: '/experts', 
    Component: Experts, 
    titleKey: 'routes.experts',
    icon: <GlobeIcon/> 
  },
  { 
    path: '/earn', 
    Component: Earn, 
    titleKey: 'routes.earn',
    icon: <CoinsIcon/> 
  },
  { 
    path: '/friends', 
    Component: Friends, 
    titleKey: 'routes.friends',
    icon: <UsersIcon/> 
  }
];

export function useTranslatedRoutes(): Array<Omit<Route, 'titleKey'> & { title?: string }> {
  const { t } = useTranslation();

  return routes.map(({ titleKey, ...route }) => ({
    ...route,
    title: titleKey ? t(titleKey) : undefined,
  }));
}

