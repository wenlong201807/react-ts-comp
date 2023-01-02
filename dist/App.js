var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon';
import Transition from './components/Transition';
// import AutoComplete from './components/AutoComplete';
var defalutProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: [],
};
var defalutProps2 = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
};
var generateMenu = function (props) {
    return (React.createElement(Menu, __assign({}, props),
        React.createElement(MenuItem, null, "active"),
        React.createElement(MenuItem, { disabled: true }, "disabled"),
        React.createElement(MenuItem, null, "xyz"),
        React.createElement(SubMenu, { title: "dropdown" },
            React.createElement(MenuItem, null, "drop1"),
            React.createElement(MenuItem, null, "drop3")),
        React.createElement(SubMenu, { title: "opened" },
            React.createElement(MenuItem, null, "opened1"))));
};
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement(Button, { className: "aa" }, "\u9ED8\u8BA4\u6309\u94AE"),
        React.createElement(Button, { disabled: true }, " disabled button"),
        React.createElement(Button, { btnType: "primary", size: "lg" }, "Large Button"),
        React.createElement(Button, { btnType: "primary", size: "sm" }, "Large Button"),
        React.createElement(Button, { btnType: "link", size: "sm", href: "http://www.baidu.com" }, "\u767E\u5EA6 Button"),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("br", null),
        generateMenu(defalutProps),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("br", null),
        generateMenu(defalutProps2),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(Icon, { icon: "coffee", theme: "danger", size: "10x" }),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(Transition, { in: show, timeout: 300, animation: "zoom-in-top", wrapper: true },
            React.createElement("div", null,
                React.createElement("p", null, "asdasdf"),
                React.createElement("p", null, "asdasdf"),
                React.createElement("p", null, "asdasdf"),
                React.createElement("p", null, "asdasdf"))),
        React.createElement(Button, { onClick: function () { return setShow(!show); } }, "\u52A8\u753B\u5C55\u793A"),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("br", null)));
}
export default App;
