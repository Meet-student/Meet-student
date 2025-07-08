import React from 'react'
import Sliders from './Sliders';
const RemoteNewList = React.lazy(() => import('remote/NewsList'));
export default function App() {
  return (
    <div>
      <h2>本地组件Sliders</h2>
      <Sliders />
      <h3>远程组件NewsList</h3>
      <React.Suspense>
        <RemoteNewList />
      </React.Suspense>
    </div>
  )
}
