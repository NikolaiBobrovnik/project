import React from 'react'
import { Iterable } from 'immutable'

export default function toJS (WrappedComponent) {
  class toJS extends React.Component {
    render () {
      const KEY = 0
      const VALUE = 1

      const propsJS = Object.entries(
        this.props
      ).reduce((newProps, wrappedComponentProp) => {
        newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
          wrappedComponentProp[VALUE]
        )
          ? wrappedComponentProp[VALUE].toJS()
          : wrappedComponentProp[VALUE]
        return newProps
      }, {})
      return <WrappedComponent {...propsJS} />
    }
  }

  toJS.displayName = `toJS(${getDisplayName(WrappedComponent)})`
  return toJS
}

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
