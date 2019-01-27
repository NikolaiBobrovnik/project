import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './aboutPeople.scss'
import classNames from 'classnames'

import PeopleLayout from 'kalashnikov-framework/lib/components/PeopleLayout'

const AboutPeople = ({ className, isMobile, code }) => {
  return (
    <div {...{ className }}>
      <RemoteDataProvider
        {...{
          request: {
            url: code ? '/about/peopleDetail.php' : '/about/people.php',
            params: { code }
          }
        }}
      >
        {({ response: { items } }) => {
          return (
            <div {...{
              className: classNames(
                css.wrapper,
                isMobile ? css.mobile : css.desktop
              )
            }}>
              <PeopleLayout
                {...{
                  isMobile,
                  people: items
                }}
              />
            </div>
          )
        }}
      </RemoteDataProvider>
    </div>
  )
}

AboutPeople.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
  isMobile: PropTypes.bool,
  code: PropTypes.string
}

export default AboutPeople
