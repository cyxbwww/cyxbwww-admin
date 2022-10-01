import { customIconRender, iconifyRender } from '@/utils';

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
    const menuItem: GlobalMenuOption = addPartialProps({
      menu: {
        key: routeName,
        label: meta.title,
        routeName,
        routePath: path
      },
      icon: meta.icon,
      customIcon: meta.customIcon,
      children: menuChildren
    });

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
function addPartialProps(config: {
  menu: GlobalMenuOption;
  icon?: string;
  customIcon?: string;
  children?: GlobalMenuOption[];
}) {
  const item = { ...config.menu };
  if (config.icon) {
    Object.assign(item, { icon: iconifyRender(config.icon) });
  }
  if (config.customIcon) {
    Object.assign(item, { icon: customIconRender(config.customIcon) });
  }
  if (config.children) {
    Object.assign(item, { children: config.children });
  }
  return item;
}

// 路由不转换菜单
function hideInMenu(route: AuthRoute.Route) {
  return Boolean(route.meta.hide);
}

// 获取当前路由所在菜单数据的paths
export function getActiveKeyPathsOfMenus(activeKey: string, menus: GlobalMenuOption[]) {
  return menus.map(menu => getActiveKeyPathsOfMenu(activeKey, menu)).flat(1);
}

function getActiveKeyPathsOfMenu(activeKey: string, menu: GlobalMenuOption) {
  const keys: string[] = [];
  if (activeKey.includes(menu.routeName)) {
    keys.push(menu.routeName);
  }
  if (menu.children) {
    keys.push(...menu.children.map(item => getActiveKeyPathsOfMenu(activeKey, item as GlobalMenuOption)).flat(1));
  }
  return keys;
}
