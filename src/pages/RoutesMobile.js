import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  PAGE_HOME
} from './Routes'

import HomePage from './HomePage/HomePage'
import Page404 from 'pages/Page404/Page404'

@withRouter
export default class Routes extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    const isMobile = true

    return (
      <Switch>
        {/* главная */}
        <Route
          {...{
            exact: true,
            path: PAGE_HOME,
            children: () => (
              <HomePage {...{ subscribe: false, isMobile }} />
            )
          }}
        />

        {/* 404 */}
        <Route
          {...{
            path: '*',
            children: () => (
              <Page404 />
            )
          }}
        />
      </Switch>
    )
  }
}

Routes.propTypes = {
  location: PropTypes.object
}
