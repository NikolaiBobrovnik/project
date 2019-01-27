import React from 'react'
import getComponentDisplayName from 'utils/getComponentDisplayName'
export const ViewContext = React.createContext(false)

// This function takes a component...
export function withViewContext (WrappedComponent) {
  // ...and returns another component...
  const Component = (props) => {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <ViewContext.Consumer>
        {isMobile => <WrappedComponent {...props} isMobile={isMobile} />}
      </ViewContext.Consumer>
    )
  }
  Component.displayName = `ViewContext(${getComponentDisplayName(WrappedComponent)})`
  return Component
}
