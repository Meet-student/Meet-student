
import { useUpdateEffect } from 'ahooks';
import { useRef } from 'react';
function useAutoPlugin(fetchInstance,
  { ready = true, manual, defaultParams, refreshDeps = [], refreshDepsAction }) {
  //是否已经自动运行过了
  const hasAutoRun = useRef(false);
  hasAutoRun.current = false;
  useUpdateEffect(() => {
    if (!manual && ready) {//如果当前是自动模式，并且ready变更为true
      hasAutoRun.current = true;//设置已经自动运行过为true
      fetchInstance.run(...defaultParams);
    }
  }, [ready]);
  useUpdateEffect(() => {
    if (hasAutoRun.current) {
      return;
    }
    if (!manual) {
      hasAutoRun.current = true;
      if (refreshDepsAction) {
        refreshDepsAction();
      } else {
        fetchInstance.refresh();
      }

    }
  }, [...refreshDeps]);
  return {
    onBefore() {
      if (!ready) {
        return { stopNow: true }//跳过当前的执行,先不要发请求，因为我还没准备好
      }
    }
  }
}
//用来设置初始状态state的 ready表示是否就绪，默认值是true,manual是是否是手动模式，默认是false.默认是自动模式
useAutoPlugin.onInit = ({ ready = true, manual = false }) => {
  return { loading: !manual && ready }//如果是自动模式，并且ready=true,loading为true,相当 于会自动发请求
}
export default useAutoPlugin;