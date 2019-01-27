import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import PosterBanner from 'kalashnikov-framework/lib/components/Banners/PosterBanner'

const LaboratoryPoster = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'pskk/lab.php'
        },
        reducerKey: 'lab'
      }}
    >
      {({ response: { poster } }) => {
        return (
          <PosterBanner
            {...{
              data: poster,
              className,
              isMobile
            }}
          />
        )
      }}
    </RemoteDataProvider>
  )
}

LaboratoryPoster.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default LaboratoryPoster
