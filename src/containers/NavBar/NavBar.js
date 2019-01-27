import React from 'react'
import PropTypes from 'prop-types'

import css from './navBar.scss'

import NavBarComponent from 'kalashnikov-framework/lib/components/NavBar'

const NavBar = ({code, isMobile, navBar}) => {
  return (
    <NavBarComponent
      {...{
        code,
        className: isMobile ? css.navBarMobile : css.navBar,
        style: isMobile ? 'scrollable' : 'default',
        ...navBar
      }}
    />
  )
}

NavBar.propTypes = {
  isMobile: PropTypes.bool,
  code: PropTypes.string,
  navBar: PropTypes.object
}

export default NavBar
