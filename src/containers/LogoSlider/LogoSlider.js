import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'
import _ from 'lodash/core'

import css from './logoSlider.scss'
import classNames from 'classnames'

import LogoSliderBox from 'kalashnikov-framework/lib/components/LogoSlider'

const LogoSlider = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: '/header/header_structure.php',
          reducerKey: 'logoSlider'
        }
      }}
    >
      {({ response: { list } }) => {
        const listOne = _.slice(list, [0], [1])
        return (
          <div {...{
            className: classNames(
              className,
              css.wrapper,
              isMobile ? css.mobile : css.desktop
            )
          }}>
            {_.map(listOne, ({ list }, key) => {
              return (
                <LogoSliderBox
                  {...{
                    isMobile,
                    className: css.slider,
                    list: list,
                    key
                  }}
                />
              )
            })}
          </div>
        )
      }}
    </RemoteDataProvider>
  )
}

LogoSlider.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default LogoSlider
