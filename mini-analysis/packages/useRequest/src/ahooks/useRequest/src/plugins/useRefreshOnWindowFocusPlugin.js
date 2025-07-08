
import { useEffect, useRef } from 'react';
import subscribeFocus from '../utils/subscribeFocus';
import unUnMount from '../../../useUnmount';
import limit from '../utils/limit';
function useRefreshOnWindowFocusPlugin(fetchInstance,
  { refreshOnWindowFocus, focusTimespan }) {
  const unsubscribeRef = useRef();
  const stopSubscribe = () => {
    unsubscribeRef.current?.();
  }
  useEffect(() => {
    if (refreshOnWindowFocus) {
      const limitRefresh = limit(fetchInstance.refresh.bind(fetchInstance), focusTimespan)
      unsubscribeRef.current = subscribeFocus(() => limitRefresh());
    }
    return () => {
      stopSubscribe();
    }
  }, [refreshOnWindowFocus, focusTimespan]);
  unUnMount(() => {
    stopSubscribe();
  })
  return {}
}
export default useRefreshOnWindowFocusPlugin;