import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './laboratoryTraining.scss'
import classNames from 'classnames'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import TrainingCardLayout from 'kalashnikov-framework/lib/components/TrainingCardLayout'

const LaboratoryTraining = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'pskk/lab.php'
        },
        reducerKey: 'lab'
      }}
    >
      {({ response: { training } }) => {
        return (
          <div {...{
            className: classNames(
              className,
              css.wrapper,
              isMobile ? css.mobile : css.desktop
            )
          }}>
            {training &&
            <MainAsideSection
              {...{
                isMobile,
                separator: true,
                reverse: true,
                asideWidth: 3,
                title: training.title,
                description: training.description,
                className: css.wrapper_kaidzen,
                asideChildren: ''
              }}
            >
              <TrainingCardLayout {...{ isMobile, training: training.items }} />
            </MainAsideSection>
            }
          </div>
        )
      }}
    </RemoteDataProvider>
  )
}

LaboratoryTraining.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default LaboratoryTraining
