import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './pskkWhatIs.scss'
import classNames from 'classnames'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import PskkCardLayout from 'kalashnikov-framework/lib/components/PskkCardLayout'

const PskkWhatIs = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'pskk/index.php',
          reducerKey: 'pskk'
        }
      }}
    >
      {({ response: { card: { title, items } } }) => {
        return (
          <div {...{
            className: classNames(
              className,
              css.wrapper,
              isMobile ? css.mobile : css.desktop
            )
          }}>
            <MainAsideSection
              {...{
                className: css.container_main,
                isMobile,
                separator: true,
                reverse: true,
                asideWidth: 4,
                title,
                asideChildren: ''
              }}
            />
            <PskkCardLayout {...{ isMobile, items }} />
          </div>
        )
      }}
    </RemoteDataProvider>
  )
}

PskkWhatIs.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default PskkWhatIs
