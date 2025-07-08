import React, { useState } from 'react'
import { useRequest, clearCache } from './ahooks';
let counter = 0;
function getName(suffix = '') {
  console.log('请求getName');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject(new Error('请求失败'));
      //resolve(' ' + (suffix));
      resolve({ data: ' ' + (++counter), time: new Date().toLocaleTimeString() });
    }, 2000);
  });
}
function User() {
  const { data, loading, refresh } = useRequest(getName, {
    cacheKey: 'cacheKey'
  });
  if (!data || loading) {
    return <div>加载中....</div>
  }
  return (
    <>
      <p>后台加载中{loading ? 'true' : 'false'}</p>
      <button onClick={refresh}>更新</button>
      <p>最后请求的时候{data.time}</p>
      <p>{data.data}</p>
    </>
  )
}
function App() {
  return (
    <>
      <User />
      <hr />
      <User />
    </>
  )
}

export default App;