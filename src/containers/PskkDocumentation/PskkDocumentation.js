import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './pskkDocumentation.scss'

import DocumentationLinkLayout from 'kalashnikov-framework/lib/components/DocumentationLinkLayout'
import classNames from 'classnames'

const PskkDocumentation = ({ className, isMobile }) => {
  return (
    <div {...{
      className: classNames(
        css.wrapper,
        isMobile ? css.mobile : css.desktop
      )
    }}>
      <RemoteDataProvider {...{
        request: {
          url: 'pskk/index.php',
          reducerKey: 'pskk'
        }
      }}>
        {({ response: { documentation } }) => {
          return (
            <div {...{className: css.documentation_wrapper}}>
              <DocumentationLinkLayout
                {...{
                  isMobile,
                  data: documentation,
                  className: css.documentation_container
                }}
              />
            </div>
          )
        }}
      </RemoteDataProvider>
    </div>
  )
}

PskkDocumentation.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default PskkDocumentation
