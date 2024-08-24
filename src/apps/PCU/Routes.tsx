import { RouteObject, } from 'react-router-dom';

export default [
  {
    id: 'signin',
    path: 'pcu/signin',
    lazy: () => import('./pages/Signin')
      .then(module => ({ Component: module.default })),
  }
] as Array<RouteObject>;