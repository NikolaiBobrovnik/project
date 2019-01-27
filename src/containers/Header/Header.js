import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withRemoteData, RemoteDataProvider } from 'remote-data-provider'
import toJS from 'HOC/toJS'
import { connect } from 'react-redux'
import * as PopupsActions from 'containers/Popups/_service/PopupsActions'

import Header from 'kalashnikov-framework/lib/components/Head'

function mapStateToProps (state) {
  return {
    baseFontSize: state.get('elasticAdaptive'),
    popupsState: state.get('popups'),
    socials: state.getIn(['remoteData', 'footer', 'response', 'data', 'socials'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    popupsActions: bindActionCreators(PopupsActions, dispatch)
  }
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
@withRemoteData({
  request: {
    url: '/header/header_menu.php'
  }
})
class HeaderComponent extends PureComponent {
  // показываем/скрываем попап контактов
  changeShowContactsPopup = () => {
    this.props.popupsActions.openPopup('contactsPopup')
  }

  changeShowBurgerPopup = ({ showMobileNavigation }) => {
    if (showMobileNavigation) {
      this.props.popupsActions.openPopup('burgerMenuPopup')
    } else {
      this.props.popupsActions.closePopup('burgerMenuPopup')
    }
  }

  render () {
    const {
      props: {
        isMobile,
        location: {
          hash,
          pathname
        },
        history,
        location,
        baseFontSize: { curFontSize },
        popupsState: { contactsPopup },
        response: {
          logoBig,
          logoSmall,
          logoSmallMobile,
          navList
        },
        socials
      }
    } = this

    return (
      <RemoteDataProvider
        {...{
          request: {
            url: '/header/header_sections.php',
            params: {}
          },
          reducerKey: 'HeaderSections'
        }}
      >
        {({ response: { list } = {} }) => {
          return (
            <Header
              {...{
                backgroundColor: isMobile
                  ? 'white'
                  : (
                    pathname === '/' ||
                    (pathname.match('about') && !pathname.match('about/people') && !pathname.match('about/history')) ||
                    pathname.match('activity') ||
                    pathname.match('investors') ||
                    pathname.match('production_system') ||
                    (pathname.match('press-center') &&
                      !(
                        pathname.match('press-center/news/') &&
                        pathname.length > '/press-center/news/'.length
                      )) ||
                    (pathname.match('career') &&
                      !(
                        pathname.match('career/vacancy/') &&
                        pathname.length > '/career/vacancy/'.length
                      ))
                  ) ? 'transparent'
                    : 'white',
                buttons: {
                  showContactsButton: !isMobile,
                  showStructureButton: !isMobile,
                  showSearchButton: true,
                  showUserButton: false
                },
                changeShowContactsPopup: this.changeShowContactsPopup,
                curFontSize,
                changeShowMobileNavigation: this.changeShowBurgerPopup,
                history,
                isLogin: false,
                isMobile,
                location,
                logo: {
                  concernShow: false,
                  logoImageLarge: logoBig,
                  logoImageMedium: logoSmall,
                  logoImageSmall: logoSmallMobile
                },
                navigation: {
                  activeItemLink: hash || pathname,
                  mainNavList: navList,
                  secondNavListShow: true,
                  secondNavList: [
                    {
                      link: 'https://shop.kalashnikov.com/',
                      title: 'Интернет-магазин'
                    }
                  ]
                },
                sections: list,
                showContactsPopup: contactsPopup,
                showLoginLink: false,
                scroll: pathname.indexOf('history') !== 1 ? 'hideshow' : 'lol',
                showMediaButton: true,
                socials
              }}
            />
          )
        }}
      </RemoteDataProvider>
    )
  }
}

HeaderComponent.propTypes = {
  history: PropTypes.object,
  isMobile: PropTypes.bool,
  location: PropTypes.any,
  searchInputState: PropTypes.object,
  searchInputActions: PropTypes.object,
  popupsActions: PropTypes.object,
  popupsState: PropTypes.object,
  baseFontSize: PropTypes.object,
  socials: PropTypes.array,
  response: PropTypes.object
}

export default HeaderComponent
