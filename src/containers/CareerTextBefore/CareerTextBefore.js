import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './careerTextBefore.scss'
import classNames from 'classnames'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import _ from 'lodash/core'

const CareerDocumentation = ({ isMobile }) => {
  return (
    <div
      {...{
        className: classNames(css.wrapper, {
          [css.mobile]: isMobile,
          [css.desktop]: !isMobile
        })
      }}
    >
      <RemoteDataProvider
        {...{
          request: {
            url: '/career/index.php'
          }
        }}
      >
        {({ response: { data: { bodyBefore } } }) => {
          return (
            _.map(bodyBefore, ({ title, text }, key) => {
              return (
                <MainAsideSection
                  {...{
                    isMobile,
                    separator: true,
                    reverse: true,
                    asideWidth: 4,
                    title,
                    asideChildren: ''
                  }}
                >
                  <div
                    {...{
                      className: css.text,
                      dangerouslySetInnerHTML: { __html: text }
                    }}
                  />
                </MainAsideSection>
              )
            })
          )
        }}
      </RemoteDataProvider>
    </div>
  )
}

CareerDocumentation.propTypes = {
  isMobile: PropTypes.bool
}

export default CareerDocumentation
