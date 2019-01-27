import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Share from 'containers/Share/Share'
import NewsDetailComponent from 'kalashnikov-framework/lib/components/NewsDetail'
import css from './newsDetail.scss'
import classNames from 'classnames'

@withRouter
class NewsDetail extends PureComponent {
  render () {
    const { isMobile, className, match, match: { params: { iCode, code } } } = this.props
    console.log(match.params.code)
    return (
      <RemoteDataProvider
        {...{
          request: {
            url: '/press-center/news-detail.php',
            params: { i_code: iCode, code }
          },
          reducerKey: 'NewsDetail'
        }}
      >
        {({ response: { data } }) => {
          return (
            <div {...{ className: classNames(css.wrapper, className) }}>
              <NewsDetailComponent
                {...{
                  isMobile,
                  ...data
                }}
              />
              <Share {...{ className: css.shareWrapper }} />
            </div>
          )
        }}
      </RemoteDataProvider>
    )
  }
}

NewsDetail.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object,
  isMobile: PropTypes.bool
}

export default NewsDetail
