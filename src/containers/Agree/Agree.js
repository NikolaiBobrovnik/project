import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import AgreeBox from 'kalashnikov-framework/lib/components/Agree'

class Agree extends PureComponent {
  render () {
    const { isMobile, className, color } = this.props
    return (
      <RemoteDataProvider
        {...{
          request: {
            url: '/form/agree.php'
          }
        }}
      >
        {({ response: { html } }) => {
          return (
            <AgreeBox {...{ html, isMobile, className, color }} />
          )
        }}
      </RemoteDataProvider>
    )
  }
}

Agree.propTypes = {
  isMobile: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string
}

export default Agree
