import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './profiNumber.scss'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import PhotoSlider from 'kalashnikov-framework/lib/components/PhotoSlider'
import ProfiNumberLayout from 'kalashnikov-framework/lib/components/ProfiNumberLayout'
import classNames from 'classnames'

const ProfiNumber = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'career/profi.php'
        }
      }}
    >
      {({ response: { data: { description, slider, items } } }) => {
        return (
          <div {...{
            className: classNames(
              css.wrapper,
              isMobile ? css.mobile : css.desktop
            )
          }}>
            <MainAsideSection
              {...{
                asideWidth: 6,
                reverse: true,
                description: description,
                className,
                column: true,
                isMobile,
                asideChildren: <ProfiNumberLayout {...{
                  items: items,
                  className: css.container_quantity,
                  isMobile
                }}
                />
              }}
            >
              <PhotoSlider
                {...{
                  isMobile,
                  className: css.container_slider,
                  items: slider,
                  arrow: 'left'
                }}
              />
            </MainAsideSection>
          </div>
        )
      }}
    </RemoteDataProvider>
  )
}

ProfiNumber.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default ProfiNumber
