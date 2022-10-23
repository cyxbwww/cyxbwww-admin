/** 后端返回的用户权益相关类型 */
declare namespace ApiAuth {
  /** 返回的token */
  interface Token {
    token: string;
  }
  /** 返回的用户信息 */
  type UserInfo = Auth.UserInfo;
}

/** 后端返回的路由相关类型 */
declare namespace ApiRoute {
  /** 后端返回的路由数据类型 */
  interface Route {
    /** 动态路由 */
    routes: AuthRoute.Route[];
    /** 路由首页对应的key */
    home: AuthRoute.RouteKey;
  }
}

declare namespace ApiUserManagement {
  interface User {
    /** 用户id */
    id: string;
    /** 用户名 */
    name: string | null;
    /** 用户手机号码 */
    phone: string;
    /** 用户邮箱 */
    email: string | null;
    /**
     * 用户状态
     * - 1: 启用
     * - 2: 禁用
     * - 3: 冻结
     * - 4: 软删除
     */
    status: '1' | '2' | '3' | '4' | null;
  }
}
