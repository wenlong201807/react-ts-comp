import { RefObject, useEffect } from 'react';

// 仅仅在约定的dom范围内才可以点击，其他地方则排出
function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // 如果dom不存在，或者在dom之外，则不做任何事。
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      // 否则执行预设事件
      handler(event);
    };

    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
