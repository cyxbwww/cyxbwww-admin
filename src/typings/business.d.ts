/** 用户相关模块 */
declare namespace Auth {
  /**
   * 用户角色类型(前端静态路由用角色类型进行路由权限的控制)
   * - super: 超级管理员(该权限具有所有路由数据)
   * - admin: 管理员
   * - user: 用户
   */
  type RoleType = 'super' | 'admin' | 'user';

  /** 用户信息 */
  interface UserInfo {
    /** 用户id */
    userId: string;
    /** 用户名 */
    userName: string;
    /** 用户角色类型 */
    userRoleIds: [];
  }
}

declare namespace UserManagement {
  interface User extends ApiUserManagement.User {
    /** 序号 */
    index: number;
    /** 表格的key（id） */
    key: string;
  }

  /**
   * 用户状态
   * - 1: 启用
   * - 2: 禁用
   * - 3: 冻结
   * - 4: 软删除
   */
  type UserStatusKey = NonNullable<User['userStatus']>;
}

declare namespace RoleManagement {
  interface Role extends ApiRoleManagement.Role {
    /** 序号 */
    index: number;
    /** 表格的key（id） */
    key: string;
  }
}

declare namespace PermissionManagement {
  interface Permission extends ApiPermissionManagement.Permission {
    /** 序号 */
    index: number;
    /** 表格的key（id） */
    key: string;
  }
}

declare namespace RouteManagement {
  interface Route extends ApiRouteManagement.Route {
    /** 序号 */
    index: number;
    /** 表格的key（id） */
    key: string;
  }
}
