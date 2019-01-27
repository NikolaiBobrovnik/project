import React, { Component } from 'react'
import Routes from 'pages/RoutesMobile'
import { connect } from 'react-redux'
import toJS from 'HOC/toJS'
import Page404 from 'pages/Page404/Page404'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { hasGlobalError } from 'remote-data-provider/extensions/globalError'

function mapStateToProps (state) {
  return {
    hasGlobalError: hasGlobalError(state)
  }
}

@withRouter
@connect(mapStateToProps)
@toJS
class BodyMobile extends Component {
  render () {
    const { hasGlobalError } = this.props
    return hasGlobalError ? <Page404 /> : <Routes />
  }
}

BodyMobile.defaultProps = {
  hasGlobalError: false
}

BodyMobile.propTypes = {
  hasGlobalError: PropTypes.bool
}

export default BodyMobile
