import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'
import _find from 'lodash/find'
import { axiosAPI, axiosLocal } from 'Services/axiosInstances'
import { isBrowser } from 'utils'

import BrandHeroBanner from 'kalashnikov-framework/lib/components/BrandHeroBanner'

const HeroBanner = ({
  isMobile,
  url,
  reducerKey,
  className,
  bannerProps,
  breadcrumbsFromTabs,
  code,
  axiosInstance
}) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url
        },
        axiosInstance: axiosInstance === 'axiosAPI' ? axiosAPI : axiosLocal,
        reducerKey
      }}
    >
      {({ response: { banner, navBar } }) => {
        if (breadcrumbsFromTabs) {
          if (navBar && navBar.aside && navBar.aside.code === code) {
            if (!_find(breadcrumbsFromTabs, {'link': navBar.aside.link})) {
              breadcrumbsFromTabs.push({link: navBar.aside.link, title: navBar.aside.text})
            }
          } else if (_find(navBar && navBar.tabs, {code})) {
            const object = _find(navBar.tabs, {code})
            if (!_find(breadcrumbsFromTabs, {'link': object.link})) {
              breadcrumbsFromTabs.push({...object})
            }
          }
        }
        return (
          <BrandHeroBanner
            {...{
              isBrowser,
              isMobile,
              className,
              ...bannerProps,
              ...banner,
              titleSize: isMobile ? 'm' : 'l',
              breadcrumbs: breadcrumbsFromTabs,
              parallax: !isMobile
            }}
          />
        )
      }}
    </RemoteDataProvider>
  )
}

HeroBanner.defaultProps = {
  axiosInstance: 'axiosAPI'
}

HeroBanner.propTypes = {
  isMobile: PropTypes.bool,
  url: PropTypes.string,
  reducerKey: PropTypes.string,
  className: PropTypes.string,
  bannerProps: PropTypes.object,
  breadcrumbsFromTabs: PropTypes.array,
  code: PropTypes.string,
  axiosInstance: PropTypes.string
}

export default HeroBanner
