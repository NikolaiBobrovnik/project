import React from 'react'
import Loadable from 'react-loadable'
import Loader from './Loader'

function Loading (props) {
  if (props.error) {
    return <div>Error!
      <button onClick={props.retry}>Retry</button>
    </div>
  } else {
    return <Loader />
  }
}

const LoadableApp = Loadable({
  loader: () => import('../App/App'),
  loading: Loading
})

export default function LoadableDesktopView () {
  return <LoadableApp />
}
