import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './information.scss'
import classNames from 'classnames'

import InformationSectionLayout from 'kalashnikov-framework/lib/components/Information/InformationSectionLayout'

const Information = ({ className, isMobile }) => {
  return (
    <div {...{ className }}>
      <RemoteDataProvider
        {...{
          request: {
            url: '/home/bottom_menu.php'
          }
        }}
      >
        {({ response: { data } }) => {
          return (
            <InformationSectionLayout
              {...{
                data,
                isMobile,
                className: classNames(css.information_container, {
                  [css.mobile]: isMobile,
                  [css.desktop]: !isMobile
                })
              }}
            />
          )
        }}
      </RemoteDataProvider>
    </div>
  )
}

Information.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default Information
