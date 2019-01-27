import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import toJS from 'HOC/toJS'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { RemoteDataProvider, getStatePath } from 'remote-data-provider'
import classNames from 'classnames'
import qs from 'qs'
import declOfNum from 'utils/declOfNum'

import css from './searchPage.scss'

import SearchInput from 'containers/SearchInput/SearchInput'
import Button from 'kalashnikov-framework/lib/components/Button'
import SearchResultList from 'kalashnikov-framework/lib/components/SearchResultList/SearchResultList'
import NavBar from 'kalashnikov-framework/lib/components/NavBar'
import Pagination from 'kalashnikov-framework/lib/components/Pagination'

import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left'

import { withViewContext } from 'HOC/ViewContext/ViewContext'

function mapStateToProps (state) {
  return {
    searchTitle: state.getIn(getStatePath('search').concat('response', 'data', 'title')),
    searchCount: state.getIn(getStatePath('search').concat('response', 'data', 'allCount'))
  }
}

@withRouter
@withViewContext
@connect(mapStateToProps)
@toJS
class SearchPage extends PureComponent {
  state = {
    searchTitle: '',
    searchCount: 0,
    page: 1
  }

  loadMore = () => {
    this.setState({
      page: this.state.page + 1
    })
  }

  render () {
    const { location: { pathname, search }, isMobile } = this.props
    const q = qs.parse(search.replace('?', '')).query

    const page404 = !pathname.match('search')
    const { page } = this.state
    const { searchTitle, searchCount } = this.props

    return (
      <div {...{ className: classNames(css.wrapper, isMobile ? css.mobile : css.desktop) }}>
        <span
          {...{
            className: classNames(css.header, { [css.reverse]: searchCount })
          }}
        >
          <h3 {...{ className: classNames(css.title, { [css.fof]: page404 }) }}>
            {page404
              ? 'Ошибка 404'
              : searchCount
                ? `«${searchTitle}»`
                : `По запросу ${searchTitle} ничего не найдено`}
          </h3>
          <p {...{ className: css.paragraph }}>
            {page404
              ? 'Страница не найдена'
              : searchCount
                ? 'Результаты поиска по запросу:'
                : 'Попробуйте изменить поисковый запрос:'}
          </p>
        </span>
        {(page404 || !searchCount) && (
          <Fragment>
            <SearchInput {...{ className: css.input }} />
            <Button
              {...{
                className: css.button,
                iconPosition: 'left',
                icon: <MdKeyboardArrowLeft />,
                title: 'вернуться на главную',
                link: '/'
              }}
            />
          </Fragment>
        )}
        <RemoteDataProvider
          {...{
            request: {
              url: '/header/search.php',
              params: {
                q,
                PAGEN_1: page
              }
            },
            reducerKey: 'search',
            exCollectorPath: ['data', 'search', 'items'],
            exCollectorChangeableRequest: ['params.PAGEN_1']
          }}
        >
          {({ response: { data: { title, allCount, search: { items } } } }) => {
            if (allCount) {
              return (
                <Fragment>
                  <NavBar
                    {...{
                      className: css.navbar,
                      amount:
                      allCount +
                      declOfNum(allCount, [
                        ' результат',
                        ' результата',
                        ' результатов'
                      ]),
                      curValue: 'результаты',
                      tabs: [
                        {
                          link: { pathname, search },
                          title: 'Результаты',
                          counter: allCount
                        }
                      ]
                    }}
                  />
                  <div {...{ className: isMobile ? css.resultsMobileWrapper : '' }}>
                    <SearchResultList {...{ items, isMobile }} />
                    {allCount > items.length &&
                    <Pagination {...{ className: isMobile ? css.paginationMobile : '', isMobile, fullSize: allCount, curSize: items.length, onClick: this.loadMore }} />
                    }
                  </div>
                </Fragment>
              )
            } else {
              return null
            }
          }}
        </RemoteDataProvider>
      </div>
    )
  }
}

SearchPage.defaultProps = {
  location: {},
  isMobile: false
}

SearchPage.propTypes = {
  location: PropTypes.object,
  isMobile: PropTypes.bool,
  searchTitle: PropTypes.string,
  searchCount: PropTypes.number
}

export default SearchPage
