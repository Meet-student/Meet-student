import { useRef } from 'react';
export function createUpdateEffect(hook) {
  return function (effect, deps) {
    const isMounted = useRef(false);
    hook(() => {
      return () => isMounted.current = false
    });
    hook(() => {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        let destroy = effect();
        return destroy;
      }
    }, deps);
  }
}
/**
 * 为什么要写二次
 * hook isMounted.current = false 这属于内部逻辑
 * return effect();返回用户自定义的销毁函数，也需要执行
 */