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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { CSSTransition } from 'react-transition-group';
var Transition = function (props) {
    var nodeRef = React.useRef(null);
    // 报错 findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference.
    // 解决 https://stackoverflow.com/questions/60903335/warning-finddomnode-is-deprecated-in-strictmode-finddomnode-was-passed-an-inst
    // 详细说明 https://blog.csdn.net/qq_40314318/article/details/105209873
    var children = props.children, classNames = props.classNames, animation = props.animation, wrapper = props.wrapper, restProps = __rest(props, ["children", "classNames", "animation", "wrapper"]);
    return (React.createElement(CSSTransition, __assign({ nodeRef: nodeRef, classNames: classNames ? classNames : animation }, restProps), wrapper ? React.createElement("div", { ref: nodeRef }, children) : children));
};
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
};
export default Transition;
