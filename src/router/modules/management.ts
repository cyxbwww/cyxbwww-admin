const management: AuthRoute.Route = {
  name: 'management',
  path: '/management',
  component: 'basic',
  children: [
    {
      name: 'management_menu',
      path: '/management/menu',
      component: 'self',
      meta: {
        title: '菜单管理',
        requiresAuth: true,
        icon: 'material-symbols:menu'
      }
    },
    {
      name: 'management_role',
      path: '/management/role',
      component: 'self',
      meta: {
        title: '角色管理',
        requiresAuth: true,
        icon: 'carbon:user-role'
      }
    },
    {
      name: 'management_user',
      path: '/management/user',
      component: 'self',
      meta: {
        title: '用户管理',
        requiresAuth: true,
        icon: 'ic:round-manage-accounts'
      }
    }
  ],
  meta: {
    title: '系统管理',
    icon: 'carbon:cloud-service-management',
    order: 3
  }
};

export default management;
