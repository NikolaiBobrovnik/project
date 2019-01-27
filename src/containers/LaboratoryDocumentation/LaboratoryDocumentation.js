import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import DocumentationLinkLayout from 'kalashnikov-framework/lib/components/DocumentationLinkLayout'

const LaboratoryDocumentation = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'pskk/lab.php'
        },
        reducerKey: 'lab'
      }}
    >
      {({ response: { documentation } }) => {
        return (
          <DocumentationLinkLayout
            {...{
              data: documentation,
              className,
              isMobile
            }}
          />
        )
      }}
    </RemoteDataProvider>
  )
}

LaboratoryDocumentation.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default LaboratoryDocumentation
