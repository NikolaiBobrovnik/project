import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// import css from './aboutProduction.scss'

import AboutLayoutLink from 'kalashnikov-framework/lib/components/AboutLayoutLink'

@withRouter
class AboutProduction extends PureComponent {
  render () {
    const { className, isMobile, history: { push } } = this.props
    return (
      <div {...{ className }}>
        <RemoteDataProvider {...{
          request: {
            url: '/about/about.php'
          },
          reducerKey: 'about'
        }}>
          {({ response: { items } }) => {
            return (
              <AboutLayoutLink
                {...{
                  isMobile,
                  items,
                  push
                }}
              />
            )
          }}
        </RemoteDataProvider>
      </div>
    )
  }
}

AboutProduction.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool,
  history: PropTypes.object
}

export default AboutProduction
