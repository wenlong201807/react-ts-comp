import { useEffect } from 'react';
// 仅仅在约定的dom范围内才可以点击，其他地方则排出
function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            // 如果dom不存在，或者在dom之外，则不做任何事。
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            // 否则执行预设事件
            handler(event);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}
export default useClickOutside;
