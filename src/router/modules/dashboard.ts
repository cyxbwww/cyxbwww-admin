const dashboard: AuthRoute.Route = {
  name: 'dashboard',
  path: '/dashboard',
  component: 'basic',
  meta: {
    title: '工作台',
    requiresAuth: true
  }
};

export default dashboard;
