import { iconifyRender } from '@/utils';

// 将权限路由转换成菜单
export function transformAuthRouteToMenu(routes: AuthRoute.Route[]): GlobalMenuOption[] {
  const globalMenu: GlobalMenuOption[] = [];
  routes.forEach(route => {
    const { name, path, meta } = route;
    const routeName = name as string;
    let menuChildren: GlobalMenuOption[] | undefined;
    if (route.children) {
      menuChildren = transformAuthRouteToMenu(route.children);
    }
    const menuItem: GlobalMenuOption = addPartialProps(
      {
        key: routeName,
        label: meta.title,
        routeName,
        routePath: path
      },
      meta?.icon,
      menuChildren
    );

    if (!hideInMenu(route)) {
      globalMenu.push(menuItem);
    }
  });

  return globalMenu;
}

// 将权限路由转换成搜索的菜单数据
export function transformAuthRoutesToSearchMenus(routes: AuthRoute.Route[], treeMap: AuthRoute.Route[] = []) {
  if (routes && routes.length === 0) return [];
  return routes.reduce((acc, cur) => {
    if (!cur.meta?.hide) {
      acc.push(cur);
    }
    if (cur.children && cur.children.length > 0) {
      transformAuthRoutesToSearchMenus(cur.children, treeMap);
    }
    return acc;
  }, treeMap);
}

// 给菜单添加可选属性
function addPartialProps(menuItem: GlobalMenuOption, icon?: string, children?: GlobalMenuOption[]) {
  const item = { ...menuItem };
  if (icon) {
    Object.assign(item, { icon: iconifyRender(icon) });
  }
  if (children) {
    Object.assign(item, { children });
  }
  return item;
}

// 路由不转换菜单
function hideInMenu(route: AuthRoute.Route) {
  return Boolean(route.meta.hide);
}
