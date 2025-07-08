
import { useEffect, useRef } from 'react';
function useDebouncePlugin(fetchInstance,
  { debounceWait }) {
  const debounceRef = useRef();
  useEffect(() => {
    if (debounceWait) {
      const originRunAsync = fetchInstance.runAsync.bind(fetchInstance);
      debounceRef.current = debounce(callback => callback(), debounceWait);
      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          debounceRef.current?.(() => originRunAsync(...args).then(resolve, reject));
        });
      }
    }
  }, [debounceWait])
  return {

  }
}
function debounce(fn, wait) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(...args), wait);
  }
}
export default useDebouncePlugin;