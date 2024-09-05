import { RouteObject, } from 'react-router-dom';

export default [
  {
    id: 'home',
    path: '',
    lazy: () => import('./pages/Home')
      .then(module => ({ Component: module.default, })),
  },
] as Array<RouteObject>;