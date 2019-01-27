import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './pskkProduction.scss'

import ActivitiesCardsList from 'kalashnikov-framework/lib/components/ActiivitiesCardsList'
import classNames from 'classnames'

const PskkProduction = ({ className, isMobile }) => {
  return (
    <div {...{
      className: classNames(
        css.wrapper,
        isMobile ? css.mobile : css.desktop
      )
    }}>
      <RemoteDataProvider {...{
        request: {
          url: 'pskk/index.php',
          reducerKey: 'pskk'
        }
      }}>
        {({ response: { items } }) => {
          return (
            <div {...{className: css.box_link_wrapper}}>
              <ActivitiesCardsList
                {...{
                  isMobile,
                  list: items,
                  masonry: false,
                  withSeparator: true
                }}
              />
            </div>
          )
        }}
      </RemoteDataProvider>
    </div>
  )
}

PskkProduction.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default PskkProduction
