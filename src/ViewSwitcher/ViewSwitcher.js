import { hot } from 'react-hot-loader'
import React from 'react'
import PropTypes from 'prop-types'
import withSizes from 'react-sizes'
import { setRDPDefaultProps } from 'remote-data-provider'
import { axiosAPI } from 'Services/axiosInstances'

setRDPDefaultProps({
  axiosInstance: axiosAPI
})

const MobileView = process.env.REACT_APP_VIEW_SWITCHER === 'loadable' ? require('./LoadableMobileView') : require('./MobileView')
const DesktopView = process.env.REACT_APP_VIEW_SWITCHER === 'loadable' ? require('./LoadableDesktopView') : require('./DesktopView')

@withSizes(({ width }) => ({ isMobile: width < 768 }))
class ViewSwitcher extends React.Component {
  state = {}

  static getDerivedStateFromProps (props) {
    const html = document.documentElement
    if (props.isMobile) {
      html.classList.add('vs-mobile')
      html.classList.remove('vs-desktop')
    } else {
      html.classList.add('vs-desktop')
      html.classList.remove('vs-mobile')
    }
    return null
  }

  render () {
    return this.props.isMobile ? MobileView.default() : DesktopView.default()
  }
}

ViewSwitcher.propTypes = {
  isMobile: PropTypes.bool
}

export default hot(module)(ViewSwitcher)
