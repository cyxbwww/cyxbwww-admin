import { error } from '@/router/constant/error';
import { auth } from '@/router/constant/auth';

export const constantRoutes: AuthRoute.Route[] = [
  {
    name: 'root',
    path: '/',
    redirect: '/dashboard',
    meta: {
      title: 'Root'
    }
  },
  ...error,
  ...auth
];
