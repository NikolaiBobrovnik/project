import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import DocumentationLinkLayout from 'kalashnikov-framework/lib/components/DocumentationLinkLayout'

const KaidzenDocumentation = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'pskk/kaidzen.php'
        },
        reducerKey: 'kaidzen'
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

KaidzenDocumentation.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default KaidzenDocumentation
