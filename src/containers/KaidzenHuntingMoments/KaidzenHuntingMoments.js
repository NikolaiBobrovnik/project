import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'
import css from './kaidzenHuntingMoments.scss'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import PhotoSlider from 'kalashnikov-framework/lib/components/PhotoSlider'
import QuantityContainerLayout from 'kalashnikov-framework/lib/components/QuantityContainerLayout'
import classNames from 'classnames'

const KaidzenHuntingMoments = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'pskk/kaidzen.php'
        },
        reducerKey: 'kaidzen'
      }}
    >
      {({ response: { moments: { title, description, items, quantity } } }) => {
        return (
          <div {...{
            className: classNames(
              css.wrapper,
              isMobile ? css.mobile : css.desktop
            )
          }}>
            <MainAsideSection
              {...{
                isMobile,
                separator: true,
                title,
                reverse: true,
                column: true,
                description: description,
                className,
                // asideWidth: 5
                asideChildren: <QuantityContainerLayout {...{
                  quantity,
                  className: css.container_quantity,
                  isMobile
                }}
                />
              }}
            >
              <PhotoSlider
                {...{
                  isMobile,
                  className: css.slider,
                  items
                }}
              />
            </MainAsideSection>
          </div>
        )
      }}
    </RemoteDataProvider>
  )
}

KaidzenHuntingMoments.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default KaidzenHuntingMoments
