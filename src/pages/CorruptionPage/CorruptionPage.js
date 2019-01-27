import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'
import toJS from 'HOC/toJS'
import { connect } from 'react-redux'

import css from './corruptionPage.scss'

import HeroBanner from 'containers/HeroBanner/HeroBanner'
import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
import TabsScrollLayout from 'kalashnikov-framework/lib/components/TabsScrollLayout'
import CardDownloadList from 'kalashnikov-framework/lib/components/CardDownloadList'
// import ListNumberedLayout from 'kalashnikov-framework/lib/components/ListNumberedLayout'
// import ListBulletedLayout from 'kalashnikov-framework/lib/components/ListBulletedLayout'
import ListClassic from 'kalashnikov-framework/lib/components/ListClassic'
import classNames from 'classnames'
// import { axiosLocal } from 'Services/axiosInstances'

function mapStateToProps (state) {
  return {
    baseFontSize: state.get('elasticAdaptive')
  }
}

@connect(mapStateToProps)
@toJS
class CorruptionPage extends PureComponent {
  render () {
    const {
      isMobile,
      baseFontSize: { curFontSize }
    } = this.props
    return (
      <div {...{
        className: classNames(
          css.wrapper,
          isMobile ? css.mobile : css.desktop
        )
      }}>
        <HeroBanner
          {...{
            isMobile,
            url: 'pages/corruption.php',
            reducerKey: 'corruption',
            className: isMobile ? css.banner_mobile : css.banner_desktop,
            bannerProps: {
              showSeparator: true,
              parallaxHeight: '70rem'
            }
          }}
        />
        <RemoteDataProvider
          {...{
            request: {
              url: 'pages/corruption.php'
            },
            reducerKey: 'corruption'
          }}
        >
          {({ response: { corruption: {items} } }) => {
            return (
              <TabsScrollLayout
                {...{
                  isMobile,
                  showHideGroupProps: {
                    size: isMobile ? 's' : 'm'
                  },
                  asideProps: {
                    reverse: true
                  },
                  offsetBottom: 1.5 * curFontSize,
                  offset: 8 * curFontSize,
                  id: 'corruption',
                  mainItem: [<ListClassic {...{ isMobile }} />, <CardDownloadList {...{ isMobile }} />],
                  items
                }}
              />
            )
          }}
        </RemoteDataProvider>
        <FormSubscribe {...{ isMobile, className: css.subscribe }} />
      </div>
    )
  }
}

CorruptionPage.propTypes = {
  response: PropTypes.object,
  baseFontSize: PropTypes.object,
  isMobile: PropTypes.bool
}

export default CorruptionPage
