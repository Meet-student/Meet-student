import React from 'react'
import NewsList from './NewsList';
//const Sliders = React.lazy(() => import('host/Sliders'));
export default function App() {
  return (
    <div>
      <h2>本地组件NewsList</h2>
      <NewsList />
      <h3>远程组件Sliders</h3>

    </div>
  )
}
