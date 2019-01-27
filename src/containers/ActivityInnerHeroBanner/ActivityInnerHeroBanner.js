import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import find from 'lodash/find'
import PropTypes from 'prop-types'
import { isBrowser } from 'utils'

import BrandHeroBanner from 'kalashnikov-framework/lib/components/BrandHeroBanner'

const ActivityInnerHeroBanner = ({ className, code, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: 'activity/directions.php'
        },
        reducerKey: 'activityDirections'
      }}
    >
      {({ response: { list } }) => {
        let curObject = find(list, o => {
          return o.link.match(code)
        })
        const { image, paragraph, title: activeTitle, breadcrumbs } = curObject
        return (
          <BrandHeroBanner
            {...{
              isBrowser,
              isMobile,
              title: 'Направление',
              image,
              paragraph,
              firstTitle: list[0].title,
              firstTitleLink: list[0].link,
              secondTitle: list[1].title,
              secondTitleLink: list[1].link,
              showScrollIcon: false,
              blockPaddingBottom: 'xs',
              titleSize: isMobile ? 'm' : 'l',
              className,
              activeTitle,
              breadcrumbs,
              parallax: !isMobile,
              parallaxHeight: '115vh'
            }}
          />
        )
      }}
    </RemoteDataProvider>
  )
}

ActivityInnerHeroBanner.propTypes = {
  className: PropTypes.string,
  code: PropTypes.string,
  isMobile: PropTypes.bool
}

export default ActivityInnerHeroBanner
