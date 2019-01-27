import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import SupportQnA from 'containers/SupportQnA/SupportQnA'
import NavBar from 'kalashnikov-framework/lib/components/NavBar'
import css from './supportPage.scss'
// import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
import BrandHeroBanner from 'kalashnikov-framework/lib/components/BrandHeroBanner/BrandHeroBanner'
import _find from 'lodash/find'
import { withRemoteData } from 'remote-data-provider'
import { isBrowser } from 'utils'

@withRemoteData({
  request: {
    url: 'pages/help.php'
  },
  reducerKey: 'help'
})
export default class SupportPage extends Component {
  componentWillMount () {
    // если открываем страницу, а params пустой, то открываем первый таб
    if (!this.props.match.params.iCode) {
      this.props.history.push('/support/qna/')
    }
  }

  componentWillReceiveProps (nextProps) {
    // если изменяется страница, а params пустой, то открываем первый таб
    if (!nextProps.match.params.iCode) {
      this.props.history.push('/support/qna/')
    }
  }

  render () {
    const {
      isMobile,
      match: { params: { iCode } },
      response
    } = this.props
    const { data: { navBar: { tabs = [] } = {} } = {}, qna } = response
    const breadcrumbs = [
      // { title: 'Поддержка', link: '/support/' }
    ]
    const object = _find(tabs, { code: iCode })
    if (object) breadcrumbs.push({ ...object })
    return (
      <div {...{
        className: classNames(
          css.wrapper,
          isMobile ? css.mobile : css.desktop
        )
      }}>
        <BrandHeroBanner
          {...{
            title: 'Поддержка',
            image: '',
            backgroundColor: 'transparent',
            color: 'black',
            parallax: false,
            isMobile,
            blockPaddingBottom: 'none',
            textPaddingTop: 's',
            titleSize: isMobile ? 's' : 'm',
            breadcrumbs,
            isBrowser,
            className: isMobile ? css.mobileheroBanner : css.heroBanner
          }}
        />
        <div {...{ className: css.content_wrap }}>
          <NavBar {...{
            isMobile,
            code: iCode,
            tabs
          }} />
          {iCode === 'qna' && (
            <SupportQnA {...{ isMobile, className: css.container, data: qna }} />
          )}
          {/* <FormSubscribe {...{ isMobile, className: css.subscribe }} /> */}
        </div>
      </div>
    )
  }

  static defaultProps = {
    isMobile: false
  }

  static propTypes = {
    response: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    isMobile: PropTypes.bool
  }
}
