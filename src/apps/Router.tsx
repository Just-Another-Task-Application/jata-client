import { 
  createBrowserRouter,
  RouteObject,
} from 'react-router-dom';

import RootLayout from '@Layout/RootLayout';
import ErrorLayout from '@Layout/ErrorLayout';
import NotFoundLayout from '@Layout/NotFoundLayout';

import PCURoutes from '@pcu/Routes';
import LandingRoutes from '@landing/Routes'

const routes: Array<RouteObject> = [
  {
    id: 'root',
    path: '',
    element: <RootLayout/>,
    errorElement: <ErrorLayout/>,
    children: [
      ...LandingRoutes,
      ...PCURoutes,
      {
        id: 'shop',
        path: 'shop',
        lazy: () => import('./Shop/pages/Shop')
          .then(module => ({ Component: module.default, })),
      },
    ],
  },
  {
    id: '404',
    path: '*',
    element: <NotFoundLayout/>
  }
];

const Router = createBrowserRouter(routes);

export default Router;