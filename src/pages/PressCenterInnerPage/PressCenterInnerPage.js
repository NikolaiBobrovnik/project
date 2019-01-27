import React from 'react'

import css from './pressCenterInnerPage.scss'

// import Information from 'containers/Information/Information'
import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
import News from 'containers/News/News'
import NewsDetail from 'containers/NewsDetail/NewsDetail'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const PressCenterInnerPage = ({ isMobile }) => {
  return (
    <div
      {...{
        className: classNames(
          css.wrapper,
          isMobile ? css.mobile : css.desktop
        )
      }}
    >
      <NewsDetail {...{ isMobile, className: css.newsDetail }} />
      <News {...{ isMobile, className: css.news_container }} />
      <FormSubscribe {...{ isMobile, className: css.subscribe }} />
      {/* <Information {...{ isMobile, className: css.information }} /> */}
    </div>
  )
}

PressCenterInnerPage.defaultProps = {
  isMobile: false
}

PressCenterInnerPage.propTypes = {
  isMobile: PropTypes.bool
}

export default PressCenterInnerPage
