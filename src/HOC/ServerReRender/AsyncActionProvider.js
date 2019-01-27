import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AsyncActionController from 'HOC/ServerReRender/AsyncActionController'

export default class AsyncActionProvider extends PureComponent {
  render () {
    return this.props.children
  }

  getChildContext () {
    return {
      asyncActionController: this.props.controller
    }
  }

  static propTypes = {
    children: PropTypes.any.isRequired,
    controller: PropTypes.instanceOf(AsyncActionController).isRequired
  }

  static childContextTypes = {
    asyncActionController: PropTypes.instanceOf(AsyncActionController).isRequired
  }
}
