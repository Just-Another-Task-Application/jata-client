import { RouteObject, } from 'react-router-dom';

import DashboardRoot from '@pcu/sections/dashboard/DashboardRoot';

export default [
  {
    id: 'pcu',
    path: 'pcu',
    element: <DashboardRoot/>,
    children: [
      {
        id: 'dashboard',
        path: 'dashboard',
        lazy: () => import('./pages/Dashboard')
          .then(module => ({ Component: module.default, })),
      },
    ],
  },
  {
    id: 'signin',
    path: 'signin',
    lazy: () => import('./pages/Signin')
      .then(module => ({ Component: module.default, })),
  },
  {
    id: 'recover',
    path: 'recoverAccount',
    lazy: () => import('./pages/Recover')
      .then(module => ({ Component: module.default, })),
  }
] as Array<RouteObject>;