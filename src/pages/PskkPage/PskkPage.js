import React from 'react'

import css from './pskkPage.scss'
import classNames from 'classnames'

import PskkDocumentation from 'containers/PskkDocumentation/PskkDocumentation'
import PskkProduction from 'containers/PskkProduction/PskkProduction'
import PskkSlider from 'containers/PskkSlider/PskkSlider'
import PskkWhatIs from 'containers/PskkWhatIs/PskkWhatIs'
import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
// import Information from 'containers/Information/Information'
import PropTypes from 'prop-types'
import HeroBanner from 'containers/HeroBanner/HeroBanner'

const PskkPage = ({ isMobile }) => {
  return (
    <div {...{
      className: classNames(
        css.wrapper,
        isMobile ? css.mobile : css.desktop
      )
    }}>
      <HeroBanner
        {...{
          isMobile,
          url: 'pskk/index.php',
          reducerKey: 'pskk',
          className: isMobile ? css.banner_mobile : css.banner_desktop
        }}
      />
      <div {...{ className: css.documentation_wrapper }}>
        <PskkDocumentation {...{ isMobile }} />
      </div>
      <PskkWhatIs {...{ isMobile }} />
      <div {...{ className: css.slider_wrapper }}>
        <PskkSlider {...{ isMobile, className: css.slider_container }} />
      </div>
      <PskkProduction {...{ isMobile, className: css.production_container }} />
      <FormSubscribe {...{ isMobile, className: css.subscribe }} />
      {/* <Information {...{ isMobile }} /> */}
    </div>
  )
}

PskkPage.propTypes = {
  isMobile: PropTypes.bool
}

export default PskkPage
