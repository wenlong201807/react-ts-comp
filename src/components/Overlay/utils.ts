import { useEffect } from 'react';

export function useListener(node:any, eventName: string, callback:any, condition:any) {
  useEffect(() => {
    if (condition) {
      window.addEventListener(eventName, callback, false);

      return () => {
        window.removeEventListener(eventName, callback, false);
      }
    }
  }, [condition]);
}