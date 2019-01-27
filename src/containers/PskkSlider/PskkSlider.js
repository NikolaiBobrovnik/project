import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './pskkSlider.scss'
import classNames from 'classnames'

import PhotoSlider from 'kalashnikov-framework/lib/components/PhotoSlider'
import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import VacanciesItem from 'kalashnikov-framework/lib/components/VacanciesItem'
// import TrainingCardLayout from 'kalashnikov-framework/lib/components/TrainingCardLayout'
import DocumentationLinkBox from 'kalashnikov-framework/lib/components/DocumentationLinkBox'

const PskkSlider = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'pskk/index.php',
          reducerKey: 'pskk'
        }
      }}
    >
      {({ response: { slider: { title, items, documentation, list } } }) => {
        return (
          <div {...{
            className: classNames(
              className,
              css.wrapper,
              isMobile ? css.mobile : css.desktop
            )
          }}>
            <PhotoSlider
              {...{
                arrow: 'left',
                isMobile,
                className: css.slider,
                items
              }}
            />
            <MainAsideSection
              {...{
                className,
                isMobile,
                separator: true,
                reverse: true,
                asideWidth: 4,
                title,
                asideChildren: <DocumentationLinkBox
                  {...{
                    isMobile,
                    items: documentation,
                    className: css.documentation_container
                  }}
                />
              }}
            >
              <div {...{ className: css.list_container }} >
                {list.map((text, key) => {
                  return (
                    <VacanciesItem {...{ isMobile, className: css.item, text, key }} />
                  )
                })}
              </div>
            </MainAsideSection>
          </div>
        )
      }}
    </RemoteDataProvider>
  )
}

PskkSlider.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default PskkSlider
