import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './aboutDirection.scss'

// import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import HomeDirections from 'containers/HomeDirections/HomeDirections'
import classNames from 'classnames'

const AboutDirection = ({ isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: '/about/about.php'
        },
        reducerKey: 'about'
      }}
    >
      {({ response: { direction: { title, description } } }) => {
        return (
          <div {...{
            className: classNames(
              css.wrapper_directions,
              isMobile ? css.mobile : css.desktop
            )
          }}>
            {title &&
            <h3
              {...{
                className: css.title,
                dangerouslySetInnerHTML: { __html: title }
              }}
            />
            }
            <HomeDirections {...{ isMobile }} />
            {description &&
            <p
              {...{
                className: css.description,
                dangerouslySetInnerHTML: { __html: description }
              }}
            />
            }
          </div>
        )
      }}
    </RemoteDataProvider>
  )
}

AboutDirection.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default AboutDirection
