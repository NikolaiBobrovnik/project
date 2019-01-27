import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'

import css from './careerCause.scss'

import CareerFiveReasons from 'kalashnikov-framework/lib/components/CareerFiveReasons'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class CareerCause extends PureComponent {
  render () {
    const { isMobile } = this.props
    return (
      <div {...{
        className: classNames(
          css.wrapper,
          isMobile ? css.mobile : css.desktop
        )
      }}>
        <RemoteDataProvider
          {...{
            request: {
              url: 'career/reasons.php'
            }
          }}
        >
          {({ response: { data } }) => {
            return (
              <CareerFiveReasons
                {...{
                  isMobile,
                  items: data,
                  className: css.reasons_container
                }}
              />
            )
          }}
        </RemoteDataProvider>
      </div>
    )
  }
}

CareerCause.propTypes = {
  response: PropTypes.object,
  isMobile: PropTypes.bool
}

export default CareerCause
