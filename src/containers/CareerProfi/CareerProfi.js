import React from 'react'

import css from './careerProfi.scss'
import classNames from 'classnames'

import ProfiNumber from 'containers/ProfiNumber/ProfiNumber'
import ProfiVacancy from 'containers/ProfiVacancy/ProfiVacancy'
import PropTypes from 'prop-types'

const CareerProfi = ({ isMobile }) => {
  return (
    <div {...{
      className: classNames(
        css.wrapper,
        isMobile ? css.mobile : css.desktop
      )
    }}>
      <ProfiNumber {...{ isMobile, className: css.container_number }} />
      <ProfiVacancy {...{ isMobile, className: css.container_vacancy }} />
    </div>
  )
}

CareerProfi.defaultProps = {
  isMobile: false
}

CareerProfi.propTypes = {
  isMobile: PropTypes.bool
}

export default CareerProfi
