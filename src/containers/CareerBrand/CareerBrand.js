import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './careerBrand.scss'

import BrandCareerLayout from 'kalashnikov-framework/lib/components/BrandCareerLayout'

const CareerBrand = ({ className, isMobile }) => {
  return (
    <div {...{ className }}>
      <RemoteDataProvider
        {...{
          request: {
            url: 'career/index.php'
          }
        }}
      >
        {({ response: { data: { career } } }) => {
          return (
            <BrandCareerLayout
              {...{
                data: career,
                className: isMobile ? css.brand_mobile : css.brand_desktop,
                isMobile
              }}
            />
          )
        }}
      </RemoteDataProvider>
    </div>
  )
}

CareerBrand.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default CareerBrand
