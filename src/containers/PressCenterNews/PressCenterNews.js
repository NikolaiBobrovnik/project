import React, {PureComponent} from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'

import NewsArticlesLayout from 'kalashnikov-framework/lib/components/NewsArticlesLayout'
import Pagination from 'kalashnikov-framework/lib/components/Pagination'

class PressCenterNews extends PureComponent {
  state = {
    page: 1
  }

  loadMore = () => {
    this.setState({
      page: this.state.page + 1
    })
  }

  render () {
    const { className, isMobile } = this.props
    const { page } = this.state
    return (
      <RemoteDataProvider
        {...{
          request: {
            url: '/press-center/news.php',
            params: {
              count: 18,
              PAGEN_1: page
            }
          },
          exCollectorPath: 'data.items',
          exCollectorChangeableRequest: ['params.PAGEN_1'],
          reducerKey: 'PressCenterNews'
        }}
      >
        {({ response: { data: { items, fullSize, next } } }) => {
          return (
            <div {...{ className }}>
              <NewsArticlesLayout {...{ items, isMobile }} />
              {next &&
              <Pagination
                {...{
                  isMobile,
                  fullSize,
                  curSize: items.length,
                  onClick: this.loadMore,
                  showNumbers: false,
                  showPlus: false,
                  withBorder: true,
                  color: 'transparent',
                  width: 'full',
                  textPosition: 'center'
                }}
              />
              }
            </div>
          )
        }}
      </RemoteDataProvider>
    )
  }
}

PressCenterNews.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default PressCenterNews
