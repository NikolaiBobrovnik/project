import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import AboutDetail from 'kalashnikov-framework/lib/components/AboutDetail'

// import css from './aboutBiography.scss'
// import classNames from 'classnames'

class AboutBiography extends PureComponent {
  render () {
    const {
      isMobile,
      code
    } = this.props
    return (
      <RemoteDataProvider
        {...{
          request: {
            url: '/about/peopleDetail.php',
            params: { code }
          },
          reducerKey: 'PeopleDetail'
        }}
      >
        {({ response: { img, title, date, description, text } }) => {
          return (
            <AboutDetail
              {...{
                offsetBottom: 20,
                offset: 80,
                isMobile,
                img,
                title,
                date,
                description,
                text
              }}
            />
          )
        }}
      </RemoteDataProvider>
    )
  }
}

AboutBiography.propTypes = {
  code: PropTypes.string,
  items: PropTypes.array,
  className: PropTypes.string,
  isMobile: PropTypes.bool,
  response: PropTypes.object
}

export default AboutBiography
