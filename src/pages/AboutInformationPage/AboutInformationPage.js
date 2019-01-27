import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'
import toJS from 'HOC/toJS'
import { connect } from 'react-redux'

import css from './aboutInformationPage.scss'
import classNames from 'classnames'

import FormSubscribe from 'containers/FormSubscribe/FormSubscribe'
// import Information from 'containers/Information/Information'
import HeroBanner from 'containers/HeroBanner/HeroBanner'
import TabsScrollLayout from 'kalashnikov-framework/lib/components/TabsScrollLayout'
import CardDownloadList from 'kalashnikov-framework/lib/components/CardDownloadList'
import PartnerLayout from 'kalashnikov-framework/lib/components/PartnerLayout'
import ProviderLayout from 'kalashnikov-framework/lib/components/ProviderLayout'

function mapStateToProps (state) {
  return {
    baseFontSize: state.get('elasticAdaptive')
  }
}

@connect(mapStateToProps)
@toJS
class AboutInformationPage extends PureComponent {
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
            url: '/about/info.php',
            reducerKey: 'aboutInformation',
            className: isMobile ? css.banner_mobile : css.banner_desktop,
            bannerProps: {
              navBar: true,
              showSeparator: true,
              parallaxHeight: '70rem',
              parallax: true
            },
            breadcrumbsFromTabs: [
              { link: '/about/', title: 'О концерне' },
              { link: '/about/information/', title: 'Информация о закупках' }
            ]
          }}
        />
        <RemoteDataProvider
          {...{
            request: {
              url: '/about/info.php'
            },
            reducerKey: 'information'
          }}
        >
          {({ response: { list: { items } } }) => {
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
                  id: 'information',
                  mainItem: [<CardDownloadList {...{ isMobile }} />, <CardDownloadList {...{ isMobile }} />,
                    <PartnerLayout {...{ isMobile }} />, <CardDownloadList {...{ isMobile }} />, <ProviderLayout {...{ isMobile }} />],
                  items
                }}
              />
            )
          }}
        </RemoteDataProvider>
        <FormSubscribe {...{ isMobile, className: css.subscribe }} />
        {/* <Information {...{ isMobile }} /> */}
      </div>
    )
  }
}

AboutInformationPage.defaultProps = {
  isMobile: false
}

AboutInformationPage.propTypes = {
  response: PropTypes.object,
  baseFontSize: PropTypes.object,
  isMobile: PropTypes.bool
}

export default AboutInformationPage
