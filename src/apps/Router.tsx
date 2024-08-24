import { 
  createBrowserRouter,
  RouteObject,
} from 'react-router-dom';

import RootLayout from '@Layout/RootLayout';
import ErrorLayout from '@Layout/ErrorLayout';

import PCURoutes from '@pcu/Routes';

const routes: Array<RouteObject> = [
  {
    id: 'root',
    path: '',
    element: <RootLayout/>,
    // element: <ErrorLayout/>,
    errorElement: <ErrorLayout/>,
    children: [
      ...PCURoutes,
    ]
  },
];

const Router = createBrowserRouter(routes);

export default Router;