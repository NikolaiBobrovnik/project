import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NestedStatus from 'react-nested-status'
import SearchPage from 'pages/SearchPage/SearchPage'
import { clearGlobalError } from 'remote-data-provider/extensions/globalError'
import { withRouter } from 'react-router-dom'

function mapDispatchToProps (dispatch) {
  return {
    clearGlobalError: bindActionCreators(clearGlobalError, dispatch)
  }
}

@withRouter
@connect(null, mapDispatchToProps)
class Page404 extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.clearGlobalError()
    }
  }

  render () {
    return (
      <NestedStatus code={404}><SearchPage /></NestedStatus>
    )
  }
}

Page404.defaultProps = {}

Page404.propTypes = {
  clearGlobalError: PropTypes.func,
  location: PropTypes.object
}

export default Page404
