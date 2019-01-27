import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import css from './aboutPage.scss'

import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
// import Information from 'containers/Information/Information'
// import AboutDocumentation from 'containers/AboutDocumentation/AboutDocumentation'
import AboutProduction from 'containers/AboutProduction/AboutProduction'
import AboutSlider from 'containers/AboutSlider/AboutSlider'
import AboutDirection from 'containers/AboutDirection/AboutDirection'
import HeroBanner from 'containers/HeroBanner/HeroBanner'

const AboutPage = ({ isMobile }) => {
  return (
    <div {...{ className: classNames(css.wrapper, isMobile ? css.mobile : css.desktop) }}>
      <HeroBanner
        {...{
          isMobile,
          bannerProps: {
            showScrollIcon: true,
            blockPaddingBottom: isMobile ? 's' : 'none'
          },
          url: '/about/about.php',
          reducerKey: 'about',
          className: isMobile ? css.banner_mobile : css.banner_desktop
        }}
      />
      {/* <div {...{ className: css.wrapper_documentation }}>
        <AboutDocumentation {...{ isMobile, className: css.documentation_container }} />
      </div> */}
      <AboutSlider {...{ isMobile, className: css.slider_container }} />
      <div {...{ className: css.direction_container }}>
        <AboutDirection {...{ isMobile }} />
      </div>
      <AboutProduction {...{ isMobile, className: css.production_container }} />
      <FormSubscribe {...{ isMobile, className: css.subscribe }} />
      {/* <Information {...{ isMobile }} /> */}
    </div>
  )
}

AboutPage.defaultProps = {
  isMobile: false
}

AboutPage.propTypes = {
  isMobile: PropTypes.bool
}

export default AboutPage
