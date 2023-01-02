import React, { useState, createContext } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({ index: '0' });
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'react-ts-comp'
 * ~~~
 */
export var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, defaultIndex = props.defaultIndex, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus, children = props.children;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        // https://stackoverflow.com/questions/49496906/react-mapping-children-of-a-parent-component
        // https://zh-hans.reactjs.org/docs/react-api.html#reactchildren
        /**
         * 在 children 里的每个直接子节点上调用一个函数，并将 this 设置为 thisArg。
         * 如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数。
         * 如果子节点为 null 或是 undefined，则此方法将返回 null 或是 undefined，而不会返回数组。
        */
        return React.Children.map(children, function (child, index) {
            var childElement = child; // 需要类型断言，获取child内的属性
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString(),
                });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
};
export default Menu;
