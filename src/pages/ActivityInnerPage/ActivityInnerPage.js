import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import css from './activityInnerPage.scss'
import classNames from 'classnames'

import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
import ActivityInnerHeroBanner from 'containers/ActivityInnerHeroBanner/ActivityInnerHeroBanner'
import ActivityInnerCards from 'containers/ActivityInnerCards/ActivityInnerCards'
import PopupReviewButton from 'containers/PopupReviewButton/PopupReviewButton'
// import Information from 'containers/Information/Information'

@withRouter
class ActivityInnerPage extends PureComponent {
  render () {
    const { isMobile, match: { params: { iCode } } } = this.props
    return (
      <div
        {...{
          className: classNames(
            css.wrapper,
            isMobile ? css.mobile : css.desktop
          )
        }}
      >
        <PopupReviewButton />
        <ActivityInnerHeroBanner
          {...{
            isMobile,
            className: isMobile ? css.banner_mobile : css.banner_desktop,
            code: iCode
          }}
        />
        <ActivityInnerCards {...{ isMobile, code: iCode }} />
        <FormSubscribe {...{ isMobile, className: css.subscribe }} />
        {/* <Information {...{ isMobile }} /> */}
      </div>
    )
  }
}

ActivityInnerPage.defaultProps = {
  isMobile: false
}

ActivityInnerPage.propTypes = {
  match: PropTypes.object,
  isMobile: PropTypes.bool
}

export default ActivityInnerPage
