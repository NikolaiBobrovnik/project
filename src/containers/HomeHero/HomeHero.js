import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import BrandHero from 'kalashnikov-framework/lib/components/BrandHero'

const HomeHero = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: '/home/mainbanner.php'
        }
      }}
    >
      {({ response: { list, text, buttonLink, buttonText } }) => {
        return (
          <BrandHero
            {...{
              isMobile,
              list,
              text,
              buttonLink,
              buttonText,
              className
            }}
          />
        )
      }}
    </RemoteDataProvider>
  )
}

HomeHero.propTypes = {
  isMobile: PropTypes.bool,
  className: PropTypes.string
}

export default HomeHero
