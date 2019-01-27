import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import css from './inzhiniringContent.scss'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import DocumentationLinkBox from 'kalashnikov-framework/lib/components/DocumentationLinkBox'

const InzhiniringContent = ({ className, isMobile, items }) => {
  return (
    <Fragment>
      {items.map((item, key) => {
        const { reverse, title, description, img, documentation } = item
        return (
          <div
            {...{ className: isMobile ? css.contentMobile : css.content, key }}
          >
            <MainAsideSection
              {...{
                isMobile,
                separator: true,
                title,
                reverse: reverse,
                column: true,
                description,
                asideWidth: 5,
                className,
                asideChildren: (
                  <DocumentationLinkBox
                    {...{
                      items: documentation,
                      isMobile,
                      className: css.link,
                      key
                    }}
                  />
                )
              }}
            >
              <img
                {...{
                  src: img,
                  className: css.img
                }}
              />
            </MainAsideSection>
          </div>
        )
      })}
    </Fragment>
  )
}

InzhiniringContent.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool,
  items: PropTypes.object
}

export default InzhiniringContent
