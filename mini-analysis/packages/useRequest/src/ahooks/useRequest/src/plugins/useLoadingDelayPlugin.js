
import { useRef } from 'react';
function useLoadingDelayPlugin(fetchInstance,
  { loadingDelay }) {
  const timerRef = useRef();
  if (!loadingDelay) {
    return {};
  }
  const cancelTimeout = () => {
    if (timerRef.current)
      clearTimeout(timerRef.current);
  }
  return {
    onBefore() {//在请求前设置一个定计器,在loadingDelay时间后变成true,当前的loading先设置为true
      timerRef.current = setTimeout(() => {
        fetchInstance.setState({ loading: true });
      }, loadingDelay);
      return { loading: false };
    },
    onFinally() {
      cancelTimeout();
    },
    onCancel() {
      cancelTimeout();
    }
  }
}
export default useLoadingDelayPlugin;