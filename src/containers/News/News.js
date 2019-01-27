import React from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import css from './news.scss'
import classNames from 'classnames'

import NewsArticlesLayout from 'kalashnikov-framework/lib/components/NewsArticlesLayout'

const News = ({ className, isMobile }) => {
  return (
    <RemoteDataProvider
      {...{
        request: {
          url: '/home/news.php',
          params: {count: 3}
        }
      }}
    >
      {({ response: { data } }) => {
        return (
          <NewsArticlesLayout
            {...{
              allNewsLink: '/press-center/',
              ...data,
              title: 'Новости',
              isMobile,
              className: classNames(className, css.news_container, {
                [css.mobile]: isMobile,
                [css.desktop]: !isMobile
              })
            }}
          />
        )
      }}
    </RemoteDataProvider>
  )
}

News.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default News
