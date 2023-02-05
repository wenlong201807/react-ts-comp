import React, { useCallback, useEffect, useState, useRef } from 'react';
import { ReactNode, CSSProperties, ReactElement, JSXElementConstructor } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { useListener } from './utils';
import getPlacement, { PointsType, PlacementType } from './placement';

// import './index.scss';

const rootModel = document.querySelector('.root-model');
  if (rootModel) {
    document.body.removeChild(rootModel);
  }
  const div = document.createElement('div');
  div.classList.add('root-model');
  document.body.appendChild(div);

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactElement;
  hasMask?: boolean;
  visible?: boolean | any;
  onVisibleChange?: Function;
  style?: CSSProperties;
  target?: HTMLElement | (() => HTMLElement)|any;
  points?: PointsType;
  placement?: PlacementType;
  beforePosition?: Function;
  dom?:ReactElement | undefined
}

export const Overlay = (props: OverlayProps) => {
  const {
    className,
    children,
    style,
    hasMask,
    visible: pvisible,
    onVisibleChange,
    target,
    points,
    placement,
    beforePosition,
    dom,
    ...others } = props;

  const [visible, setVisible] = useState(pvisible || false);
  const [positionStyle, setPositionStyle] = useState({});
  const overlayRef = useRef(null);

  useEffect(() => {
    if ('visible' in props) {
      setVisible(pvisible);
    }
  }, [pvisible]);

  const handleMouseDown = (e:any) => {

    const safeNodeList: any[] = [];
    // 弹窗默认为安全节点
    if (overlayRef.current) {
      safeNodeList.push(overlayRef.current);
    }
    // if (dom) {
    //   safeNodeList.push(dom);
    // }

    const clickNode = e.target;

    for (let index = 0; index < safeNodeList.length; index++) {
      const node = safeNodeList[index];
      if (node && node.contains(clickNode)) {
        return;
      }
    }

    onVisibleChange?.(false);
  }

  useListener(window, 'mousedown', handleMouseDown, visible);

  const handleKeyDown = (e: { keyCode: number; }) => {
    if (!visible || !overlayRef.current) {
      return;
    }
    if (e.keyCode === 27) {
      onVisibleChange?.(false);
    }
  }

  useListener(window, 'keydown', handleKeyDown, visible);


  // 弹窗挂载，第一次 mount node=真实dom，卸载的时候 node=null
  const overlayRefCallback = useCallback((node: null) => {
    overlayRef.current = node;

    if (node && target) {
      const targetElement = typeof target === 'function' ? target() : target;
      const positionStyle = getPlacement({
        target: targetElement, 
        overlay: node, 
        points,
        placement,
        beforePosition
      });
      setPositionStyle(positionStyle);
    }

  }, []);

  const child:any = React.Children.only(children);
  // const child: ReactElement | undefined = React.Children.only(children);

  const newChildren = React.cloneElement(child, {
    ...others,
    ref: overlayRefCallback,
    style: { ...positionStyle, ...child?.props?.style }
  });

  if (!visible) {
    return null;
  }



  return ReactDOM.createPortal(<div style={{
    position: 'fixed',
    top: '200px',
    left: '200px',
    height: '200px',
    width: '200px',
    zIndex:1000
  }}>
    {/* {hasMask ? <div /> : null} */}
    {newChildren}
  </div>, div);
}
