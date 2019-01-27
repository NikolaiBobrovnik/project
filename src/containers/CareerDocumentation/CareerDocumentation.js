import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './сareerDocumentation.scss'

import DocumentationLinkLayout from 'kalashnikov-framework/lib/components/DocumentationLinkLayout'

const CareerDocumentation = ({ className, isMobile }) => {
  return (
    <div {...{ className }}>
      <RemoteDataProvider
        {...{
          request: {
            url: '/career/index.php'
          }
        }}
      >
        {({ response: { data: { documentation } } }) => {
          return (
            <DocumentationLinkLayout
              {...{
                data: documentation,
                className: isMobile ? css.container_mobile : css.container_desktop,
                isMobile
              }}
            />
          )
        }}
      </RemoteDataProvider>
    </div>
  )
}

CareerDocumentation.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default CareerDocumentation
