import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-left'
  | 'zoom-in-bottom'
  | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
  children: React.ReactNode;
};

const Transition: React.FC<TransitionProps> = (props) => {
  const nodeRef = React.useRef(null);
  // 报错 findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference.
  // 解决 https://stackoverflow.com/questions/60903335/warning-finddomnode-is-deprecated-in-strictmode-finddomnode-was-passed-an-inst
  const { children, classNames, animation, wrapper, ...restProps } = props;
  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div ref={nodeRef}>{children}</div> : children}
    </CSSTransition>
  );
};
Transition.defaultProps = {
  unmountOnExit: true, // 此时子节点不存在，对动画后半段有效果
  appear: true,
};

export default Transition;
