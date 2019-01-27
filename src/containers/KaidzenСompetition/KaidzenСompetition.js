import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './kaidzenСompetition.scss'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import DocumentationLinkBox from 'kalashnikov-framework/lib/components/DocumentationLinkBox'
import classNames from 'classnames'

const KaidzenСompetition = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'pskk/kaidzen.php'
        },
        reducerKey: 'kaidzen'
      }}
    >
      {({ response: { competition: { img, title, text, items } } }) => {
        return (
          <div {...{
            className: classNames(
              css.wrapper,
              isMobile ? css.mobile : css.desktop
            )
          }}>
            <div
              {...{
                className: css.img,
                style: {
                  backgroundImage: `url(${img})` || 'none',
                  backgroundSize: 'cover'
                }
              }} />
            <MainAsideSection
              {...{
                isMobile,
                separator: true,
                reverse: true,
                asideWidth: 3,
                title,
                className: css.wrapper_kaidzen,
                asideChildren: !isMobile && <DocumentationLinkBox
                  {...{
                    className: css.link,
                    items,
                    isMobile
                  }}
                />
              }}
            >
              <p {...{
                className: css.text,
                dangerouslySetInnerHTML: { __html: text }
              }}
              />
              {isMobile &&
              <DocumentationLinkBox
                {...{
                  items,
                  isMobile,
                  className: css.container_documentation
                }}
              />
              }
            </MainAsideSection>
          </div>
        )
      }}
    </RemoteDataProvider>
  )
}

KaidzenСompetition.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default KaidzenСompetition
