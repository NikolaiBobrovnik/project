import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import PosterBanner from 'kalashnikov-framework/lib/components/Banners/PosterBanner'

const HomePoster = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: '/home/top_home.php'
        }
      }}
    >
      {({ response: { data } }) => {
        return (
          <PosterBanner
            {...{
              data,
              className,
              isMobile
            }}
          />
        )
      }}
    </RemoteDataProvider>
  )
}

HomePoster.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default HomePoster
