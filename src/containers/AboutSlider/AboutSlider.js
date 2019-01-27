import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './aboutSlider.scss'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import PhotoSlider from 'kalashnikov-framework/lib/components/PhotoSlider'

const AboutSlider = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: '/about/about.php'
        },
        reducerKey: 'about'
      }}
    >
      {({ textPosition, response: { slider: { title, description, items } } }) => {
        return (
          <MainAsideSection
            {...{
              isMobile,
              separator: true,
              title,
              reverse: isMobile,
              column: true,
              description: description,
              className,
              asideChildren: ''
            }}
          >
            <PhotoSlider
              {...{
                isMobile,
                className: isMobile ? css.slider_mobile : css.slider_desktop,
                items,
                textPosition
              }}
            />
          </MainAsideSection>
        )
      }}
    </RemoteDataProvider>
  )
}

AboutSlider.propTypes = {
  className: PropTypes.string,
  textPosition: PropTypes.string,
  isMobile: PropTypes.bool
}

export default AboutSlider
