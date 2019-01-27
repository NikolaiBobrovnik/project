import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'
import Map from 'containers/Map/Map'

import css from './officess.scss'
import classNames from 'classnames'

class Officess extends PureComponent {
  render () {
    const { props: { isMobile } } = this
    return (
      <RemoteDataProvider
        {...{
          request: {
            url: '/career/contacts.php'
          }
        }}
      >
        {({ response: { data: { offices: { title, items } } } }) => {
          return (
            <div
              {...{
                className: classNames(
                  css.wrapper,
                  isMobile ? css.mobile : css.desktop
                )
              }}
            >
              {title &&
              <div {...{ className: css.title }}>{title}</div>
              }
              <Map {...{ items, isMobile }} />
            </div>
          )
        }}
      </RemoteDataProvider>
    )
  }
}

Officess.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default Officess
