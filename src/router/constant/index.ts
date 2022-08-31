import { error } from '@/router/constant/error';
import { auth } from '@/router/constant/auth';

export const constantRoutes: AuthRoute.Route[] = [
  {
    name: 'root',
    path: '/',
    redirect: '/dashboard/analysis',
    meta: {
      title: 'Root'
    }
  },
  ...error,
  ...auth
];
