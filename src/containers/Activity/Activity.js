import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import BrandActivities from 'kalashnikov-framework/lib/components/BrandActivities'

const Activity = ({className, isMobile}) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'activity/directions.php'
        },
        reducerKey: 'activityDirections'
      }}
    >
      {({ response: { list } }) => {
        return (
          <BrandActivities
            {...{
              hoverable: !isMobile,
              className,
              list,
              isMobile
            }}
          />
        )
      }}
    </RemoteDataProvider>
  )
}

Activity.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default Activity
