
import { useRef } from 'react';
import useUpdateEffect from '../../../useUpdateEffect';
import isDocumentVisible from '../utils/isDocumentVisible';
import subscribeReVisible from '../utils/subscribeReVisible';
function usePollingPlugin(fetchInstance,
  { pollingInterval, pollingWhenHidden }) {
  const timeRef = useRef();
  const unsubscribeRef = useRef();
  const stopPolling = () => {
    if (timeRef.current)
      clearTimeout(timeRef.current);
    unsubscribeRef.current?.();
  }
  useUpdateEffect(() => {
    if (!pollingInterval) {
      stopPolling();
    }
    return () => console.log('stopPolling');
  }, [pollingInterval]);
  if (!pollingInterval) {
    return {};
  }

  return {
    onBefore() {
      stopPolling();
    },
    onFinally() {
      //现在不是一定要开始定时器。而是要判断pollingWhenHidden参数
      //如果设置为页面不可见的不轮询，并且页面不可见
      if (!pollingWhenHidden && !isDocumentVisible()) {
        //在此做一个订阅，订阅页面可见的事件，页面可见之后继续轮询
        unsubscribeRef.current = subscribeReVisible(() => fetchInstance.refresh());
        return;
      }
      timeRef.current = setTimeout(() => {
        fetchInstance.refresh();
      }, pollingInterval);
    },
    onCancel() {
      stopPolling();
    }
  }
}
export default usePollingPlugin;