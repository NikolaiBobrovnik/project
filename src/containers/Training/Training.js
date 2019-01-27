import React, { Fragment } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './training.scss'
import classNames from 'classnames'

import DocumentationLinkBox from 'kalashnikov-framework/lib/components/DocumentationLinkBox'

const Training = ({ isMobile }) => {
  return (
    <div
      {...{
        className: classNames(css.wrapper, {
          [css.mobile]: isMobile,
          [css.desktop]: !isMobile
        })
      }}
    >
      <RemoteDataProvider
        {...{
          request: {
            url: '/career/training.php'
          }
        }}
      >
        {({ response: { htmlAfter, htmlBefore, pdf } }) => {
          return (
            <Fragment>
              <div {...{ className: css.container, dangerouslySetInnerHTML: { __html: htmlBefore } }} />
              <DocumentationLinkBox {...{ items: pdf, isMobile }} />
              <div {...{ className: css.container, dangerouslySetInnerHTML: { __html: htmlAfter } }} />
            </Fragment>
          )
        }}
      </RemoteDataProvider>
    </div>
  )
}

Training.propTypes = {
  isMobile: PropTypes.bool
}

export default Training
