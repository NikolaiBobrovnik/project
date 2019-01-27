import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

// import css from './aboutDocumentation.scss'

import DocumentationLinkLayout from 'kalashnikov-framework/lib/components/DocumentationLinkLayout'

const AboutDocumentation = ({ className, isMobile }) => {
  return (
    <div {...{ className }}>
      <RemoteDataProvider
        {...{
          request: {
            url: '/about/about.php'
          },
          reducerKey: 'about'
        }}
      >
        {({ response: { documentation } }) => {
          return (
            <DocumentationLinkLayout
              {...{
                isMobile,
                data: documentation
              }}
            />
          )
        }}
      </RemoteDataProvider>
    </div>
  )
}

AboutDocumentation.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default AboutDocumentation
