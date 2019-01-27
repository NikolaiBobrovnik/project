import React, { Fragment } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import ActivitiesCardsList from 'kalashnikov-framework/lib/components/ActiivitiesCardsList'

const ActivityInnerCards = ({ code, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: '/activity/inner.php',
          params: { code }
        },
        reducerKey: 'ActivityInnerCards'
      }}
    >
      {({ response: { list, links } = {} }) => {
        return (
          <Fragment>
            <ActivitiesCardsList {...{ isMobile, masonry: true, list }} />
            <ActivitiesCardsList
              {...{
                isMobile,
                list: links,
                masonry: false,
                withSeparator: true
              }}
            />
          </Fragment>
        )
      }}
    </RemoteDataProvider>
  )
}

ActivityInnerCards.defaultProps = {
  isMobile: false
}

ActivityInnerCards.propTypes = {
  code: PropTypes.string,
  isMobile: PropTypes.bool
}

export default ActivityInnerCards
