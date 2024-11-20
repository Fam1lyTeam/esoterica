import type { ComponentType, JSX } from 'react';

import { Main } from '@/pages/Main/Main';
import { Experts } from '@/pages/Experts/Experts';
import { Earn } from '@/pages/Earn/Earn';
import { Friends } from '@/pages/Friends/Friends';
import { Results } from '@/pages/Results/Results';
import { Matrix } from '@/pages/Results/Matrix';
import { Pythagoras } from '@/pages/Results/Pythagoras';
import { Karmic } from '@/pages/Results/Karmic';
import { Psychological } from '@/pages/Results/Psychological';
import { Prognostics } from '@/pages/Results/Prognostics';
import { Relationship } from '@/pages/Results/Relationship';

import { CalculatorIcon } from '@/components/Icons/Calculator';
import { GlobeIcon } from '@/components/Icons/Globe';
import { CoinsIcon } from '@/components/Icons/Coins';
import { UsersIcon } from '@/components/Icons/Users';

interface Route {
  path: string;
  Component: ComponentType;
  titleKey?: string;
  icon?: JSX.Element;
  isNavItem?: boolean;
  children?: Route[];
}

export const routes: Route[] = [
  { 
    path: '/', 
    Component: Main, 
    titleKey: 'routes.index',
    icon: <CalculatorIcon/>,
    isNavItem: true
  },
  { 
    path: '/experts', 
    Component: Experts, 
    titleKey: 'routes.experts',
    icon: <GlobeIcon/>,
    isNavItem: true
  },
  { 
    path: '/earn', 
    Component: Earn, 
    titleKey: 'routes.earn',
    icon: <CoinsIcon/>,
    isNavItem: true
  },
  { 
    path: '/friends', 
    Component: Friends, 
    titleKey: 'routes.friends',
    icon: <UsersIcon/>, 
    isNavItem: true
  },
  { 
    path: '/results', 
    Component: Results, 
    titleKey: 'routes.results.main',
    isNavItem: false,
    children: [
      { path: '', Component: Matrix, titleKey: 'routes.results.matrix' },
      { path: 'pythagoras-square', Component: Pythagoras, titleKey: 'routes.results.pythagoras' },
      { path: 'karmic-portrait', Component: Karmic, titleKey: 'routes.results.karmic' },
      { path: 'psychological-portrait', Component: Psychological, titleKey: 'routes.results.psychological' },
      { path: 'prognostics', Component: Prognostics, titleKey: 'routes.results.prognostics' },
      { path: 'numerology-relationships', Component: Relationship, titleKey: 'routes.results.relationship' },
    ],
  },
];

export function getNavRoutes(): Route[] {
  return routes.filter(route => route.isNavItem);
}

export function getResultsRoutes(): Route[] {
  const resultsRoute = routes.find(route => route.path === '/results');
  return resultsRoute?.children || [];
}


