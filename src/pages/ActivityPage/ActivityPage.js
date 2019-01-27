import React from 'react'
import PropTypes from 'prop-types'

import css from './activityPage.scss'

import Activity from 'containers/Activity/Activity'

const ActivityPage = ({ isMobile }) => {
  return (
    <Activity {...{ isMobile, className: isMobile ? css.bannerMobile : css.banner }} />
  )
}

ActivityPage.propTypes = {
  isMobile: PropTypes.bool
}

export default ActivityPage
