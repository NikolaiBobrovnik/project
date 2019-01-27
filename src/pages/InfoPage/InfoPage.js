import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'
import toJS from 'HOC/toJS'
import { connect } from 'react-redux'

import css from './infoPage.scss'

import HeroBanner from 'containers/HeroBanner/HeroBanner'
import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
import TabsScrollLayout from 'kalashnikov-framework/lib/components/TabsScrollLayout'
import CardDownloadList from 'kalashnikov-framework/lib/components/CardDownloadList'
// import Information from 'containers/Information/Information'
import classNames from 'classnames'

function mapStateToProps (state) {
  return {
    baseFontSize: state.get('elasticAdaptive')
  }
}

@connect(mapStateToProps)
@toJS
class InvestorsPage extends PureComponent {
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
            url: 'pages/info.php',
            reducerKey: 'investors',
            className: isMobile ? css.banner_mobile : css.banner_desktop,
            bannerProps: {
              showSeparator: true,
              parallaxHeight: '70rem',
              parallax: true
            }
          }}
        />
        <RemoteDataProvider
          {...{
            request: {
              url: 'pages/info.php'
            },
            reducerKey: 'investors'
          }}
        >
          {({ response: { html, investors: { items } } }) => {
            return (
              <div>
                <div {...{
                  className: css.text,
                  dangerouslySetInnerHTML: { __html: html }
                }}
                />
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
                    id: 'investors',
                    mainItem: [<CardDownloadList {...{ isMobile }} />],
                    items
                  }}
                />
              </div>
            )
          }}
        </RemoteDataProvider>
        <FormSubscribe {...{ isMobile, className: css.subscribe }} />
        {/* <Information {...{ isMobile }} /> */}
      </div>
    )
  }
}

InvestorsPage.propTypes = {
  response: PropTypes.object,
  baseFontSize: PropTypes.object,
  isMobile: PropTypes.bool
}

export default InvestorsPage
