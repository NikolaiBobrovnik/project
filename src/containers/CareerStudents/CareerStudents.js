import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'

import css from './careerStudents.scss'

import CareerStudentsLayout from 'kalashnikov-framework/lib/components/CareerStudents'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class CareerStudents extends PureComponent {
  render () {
    const { isMobile } = this.props
    return (
      <div {...{
        className: classNames(
          css.wrapper,
          isMobile ? css.mobile : css.desktop
        )
      }}>
        <RemoteDataProvider
          {...{
            request: {
              url: 'career/students.php'
            }
          }}
        >
          {({ response: { items } }) => {
            console.log('items', items)
            return (
              <CareerStudentsLayout
                {...{
                  isMobile,
                  items: items,
                  className: css.students_container
                }}
              />
            )
          }}
        </RemoteDataProvider>
      </div>
    )
  }
}

CareerStudents.propTypes = {
  response: PropTypes.object,
  isMobile: PropTypes.bool
}

export default CareerStudents
