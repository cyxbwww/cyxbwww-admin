declare namespace AuthRoute {
  // 多级路由分割符号
  type RouteSplitMark = '_';

  // 路由key
  type RouteKey =
    // 固定的路由
    | 'root'
    | 'login'
    | 'no-permission'
    | 'not-found'
    | 'service-error'
    // 捕获无效 path 的路由
    | 'not-found-page'
    // 自定义的路由
    | 'dashboard';

  // 路由路径
  type RoutePath =
    | '/'
    | Exclude<KeyToPath<RouteKey>, '/root' | 'not-found-page'>
    | SingleRouteParentPath
    | '/:pathMatch(.*)*';

  /**
   * 路由的组件
   * - basic - 基础布局，具有公共部分的布局
   * - blank - 空白布局
   * - multi - 多级路由布局(三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局)
   * - self - 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
   */
  type RouteComponent = 'basic' | 'blank' | 'multi' | 'self';

  // 路由描述
  type RouteMeta = {
    // 路由标题(可用来作document.title或者菜单的名称)
    title: string;
    // 路由的动态路径
    dynamicPath?: PathToDynamicPath<'/login'>;
    // 需要登录权限
    requiresAuth?: boolean;
    // 作为单级路由的父级路由布局组件
    singleLayout?: Extract<RouteComponent, 'basic' | 'blank'>;
    // 访问路由权限
    permissions?: Auth.IdentityType[];
    // 缓存页面
    keepAlive?: boolean;
    // 菜单和面包屑对应的图标
    icon?: string;
    // 是否在菜单中隐藏
    hide?: boolean;
    // 外链链接
    href?: string;
    // 菜单排序
    order?: number;
  };

  // 前端导入的路由模块
  type RouteModule = Record<string, { default: AuthRoute.Route }>;

  // 路由path转换动态路径
  type PathToDynamicPath<Path extends RoutePath> =
    | `${Path}/:module`
    | `${Path}/:module(${string})`
    | `${Path}/:module(${string})?`;

  // 单独一级路由的key (单独路由需要添加一个父级路由用于应用布局组件)
  type SingleRouteKey = Exclude<
    GetSingleRouteKey<RouteKey>,
    GetRouteFirstParentKey<RouteKey> | 'root' | 'not-found-page'
  >;

  // 获取一级路由(包括有子路由的一级路由)
  type GetSingleRouteKey<Key extends RouteKey> = Key extends `${infer _Left}${RouteSplitMark}${infer _Right}`
    ? never
    : Key;

  // 获取子路由的一级父路由
  type GetRouteFirstParentKey<Key extends RouteKey> = Key extends `${infer Left}${RouteSplitMark}${infer _Right}`
    ? Left
    : never;

  // 单独路由父级路由key
  type SingleRouteParentKey = `${SingleRouteKey}-parent`;

  // 单独路由父级路由path
  type SingleRouteParentPath = KeyToPath<SingleRouteParentKey>;

  // 路由key转换路由path
  type KeyToPath<Key extends string> = Key extends `${infer Left}_${infer Right}`
    ? KeyToPath<`${Left}/${Right}`>
    : `/${Key}`;

  // 路由结构
  interface Route {
    // 路由名称(路由唯一标识)
    name: RouteKey;
    // 路由路径
    path: RoutePath;
    // 路由重定向
    redirect?: RoutePath;
    // 路由组件
    component?: RouteComponent;
    // 子路由
    children?: Route[];
    // 路由描述
    meta: RouteMeta;
    // 路由属性
    props?: boolean | Record<string, any> | ((to: any) => Record<string, any>);
  }
}
