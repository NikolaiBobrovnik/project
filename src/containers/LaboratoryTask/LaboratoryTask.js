import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './laboratoryTask.scss'
import classNames from 'classnames'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import TaskCardLayout from 'kalashnikov-framework/lib/components/TaskCardLayout'

const LaboratoryTask = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'pskk/lab.php'
        },
        reducerKey: 'lab'
      }}
    >
      {({ response: { task } }) => {
        return (
          <div {...{
            className: classNames(
              className,
              css.wrapper,
              isMobile ? css.mobile : css.desktop
            )
          }}>
            {task &&
            <MainAsideSection
              {...{
                isMobile,
                separator: true,
                reverse: true,
                asideWidth: 3,
                title: task.title,
                description: task.description,
                className: css.wrapper_kaidzen,
                asideChildren: ''
              }}
            >
              <TaskCardLayout {...{ isMobile, task: task.items }} />
            </MainAsideSection>
            }
          </div>
        )
      }}
    </RemoteDataProvider>
  )
}

LaboratoryTask.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default LaboratoryTask
