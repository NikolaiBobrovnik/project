import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import HomePage from "./HomePage/HomePage";
import Page404 from "pages/Page404/Page404";

export const PAGE_HOME = "/";

@withRouter
export default class Routes extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <Switch>
        {/* главная */}
        <Route {...{ exact: true, path: PAGE_HOME, component: HomePage }} />
        <Route {...{ path: "*", component: Page404 }} />
      </Switch>
    );
  }
}

Routes.propTypes = {
  location: PropTypes.object
};
