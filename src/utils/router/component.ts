import type { Component } from 'vue';
import { EnumLayoutComponentName } from '@/enum';
import { views } from '@/views';
import { BasicLayout, BlankLayout } from '@/components/layouts';

type LayoutComponent = Record<EnumType.LayoutComponentName, () => Promise<Component>>;

/**
 * @description 获取页面导入的vue文件(懒加载)
 * @param layoutType - 布局类型
 */
export function getLayoutComponent(layoutType: EnumType.LayoutComponentName) {
  const layoutComponent: LayoutComponent = {
    basic: BasicLayout,
    blank: BlankLayout
  };
  return () => setViewComponentName(layoutComponent[layoutType], EnumLayoutComponentName[layoutType]);
}

// 获取页面导入的vue文件(懒加载)
export function getViewComponent(routeKey: AuthRoute.RouteKey) {
  return () => setViewComponentName(views[routeKey], routeKey) as Promise<Component>;
}

// 给页面组件设置名称
async function setViewComponentName(asyncComponent: () => Promise<Component>, name: string) {
  const component = (await asyncComponent()) as { default: Component };
  Object.assign(component.default, { name });
  return component;
}
