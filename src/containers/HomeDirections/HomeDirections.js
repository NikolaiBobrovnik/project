import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import BrandDirectionsLayout from 'kalashnikov-framework/lib/components/Directions/BrandDirectionsLayout'

@withRouter
class HomeDirections extends PureComponent {
  render () {
    const { className, isMobile, history: { push } } = this.props
    return (
      <RemoteDataProvider
        {...{
          request: {
            url: '/home/directions.php'
          }
        }}
      >
        {({ response: { data } }) => {
          return (
            <BrandDirectionsLayout
              {...{
                data,
                className,
                isMobile,
                push
              }}
            />
          )
        }}
      </RemoteDataProvider>
    )
  }
}

HomeDirections.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool,
  history: PropTypes.object
}

export default HomeDirections
