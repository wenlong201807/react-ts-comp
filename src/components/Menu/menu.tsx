import React, { FC, useState, createContext, CSSProperties } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps {
  /**默认 active 的菜单项的索引值 */
  defaultIndex?: string;
  className?: string;
  /**菜单类型 横向或者纵向 */
  mode?: MenuMode;
  style?: CSSProperties;
  /**点击菜单项触发的回掉函数 */
  onSelect?: (selectedIndex: string) => void;
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
  children?: React.ReactNode | null;
}
interface IMenuContext {
  index: string;
  onSelect?: (selectedIndex: string) => void;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'react-ts-comp'
 * ~~~
 */
export const Menu: FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    defaultIndex,
    onSelect,
    defaultOpenSubMenus,
    children,
  } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };
  const renderChildren = () => {
    // https://stackoverflow.com/questions/49496906/react-mapping-children-of-a-parent-component
    // https://zh-hans.reactjs.org/docs/react-api.html#reactchildren
    /**
     * 在 children 里的每个直接子节点上调用一个函数，并将 this 设置为 thisArg。
     * 如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数。
     * 如果子节点为 null 或是 undefined，则此方法将返回 null 或是 undefined，而不会返回数组。
    */
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>; // 需要类型断言，获取child内的属性
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        );
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;
