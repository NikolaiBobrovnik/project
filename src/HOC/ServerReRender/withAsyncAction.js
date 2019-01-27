import React, { PureComponent } from 'react'
import AsyncActionController from 'HOC/ServerReRender/AsyncActionController'
import PropTypes from 'prop-types'

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const isBrowser = typeof window !== 'undefined'

const defaultOptions = {
  id: undefined,
  completeActionKey: 'completeAction',
  mapPropsToId: undefined,
  serverOnly: true
}

export default (userOptions = {}) => WrappedComponent => {
  if (typeof userOptions === 'string') {
    userOptions = { id: userOptions }
  }
  const options = Object.assign({}, defaultOptions, userOptions)
  const { id, completeActionKey, mapPropsToId, serverOnly } = options

  if (!id && !mapPropsToId) {
    throw new Error('ServerReRenderDecorator: id or mapPropsToId option is required')
  }

  class withAsyncAction extends PureComponent {
    getActionId () {
      return mapPropsToId ? mapPropsToId(this.props) : id
    }

    completeAction = () => {
      if (
        (serverOnly && isBrowser) ||
        !this.context.asyncActionController
      ) {
        return
      }
      this.context.asyncActionController.completeAction(this.getActionId())
    }

    componentWillMount () {
      if (serverOnly && isBrowser) return
      if (this.context.asyncActionController) {
        this.context.asyncActionController.startAction(this.getActionId())
      }
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
          {...{ [completeActionKey]: this.completeAction }}
        />
      )
    }

    static contextTypes = {
      asyncActionController: PropTypes.instanceOf(AsyncActionController)
    }
  }

  withAsyncAction.displayName = `withAsyncAction(${getDisplayName(WrappedComponent)})`

  return withAsyncAction
}
