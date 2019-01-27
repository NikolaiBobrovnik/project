import React, { PureComponent } from 'react'
import { PAGE_CONTACTS } from 'pages/Routes'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import toJS from 'HOC/toJS'
import { isBrowser } from 'utils'
import { withViewContext } from 'HOC/ViewContext/ViewContext'

import css from './contactsPage.scss'

import HeroBanner from 'containers/HeroBanner/HeroBanner'
import NavBar from 'containers/NavBar/NavBar'
import BrandZoneMap from 'containers/BrandZoneMap/BrandZoneMap'
import BrandZoneCity from 'containers/BrandZoneMap/BrandZoneCity/BrandZoneCity'
import Contacts from 'containers/Contacts/Contacts'
import SupportPartners from 'containers/SupportPartners/SupportPartners'
import License from 'containers/License/License'
import ServiceCentres from 'containers/ServiceCentres/ServiceCentres'

function mapStateToProps (state) {
  return {
    navBar: state.getIn(['remoteData', 'contactsTabs', 'response', 'navBar'])
  }
}

@withRouter
@connect(mapStateToProps)
@toJS
@withViewContext
class ContactsPage extends PureComponent {
  componentWillReceiveProps (nextProps) {
    // если изменяется страница, а params пустой, то открываем первый таб
    if (!nextProps.match.params.code) {
      this.props.history.push('/contacts/contacts/')
    }
  }

  render () {
    const { props: { isMobile, match: { params: { code } }, navBar } } = this

    return (
      <div
        {...{
          className: classNames(
            css.wrapper,
            isMobile ? css.mobile : css.desktop
          )
        }}
      >
        <HeroBanner
          {...{
            isMobile,
            // axiosInstance: 'axiosLocal',
            url: '/contacts/tabs.php',
            reducerKey: 'contactsTabs',
            className: isMobile ? css.banner_mobile : css.banner_desktop,
            bannerProps: {
              parallaxHeight: '70rem',
              blockPaddingBottom: isMobile ? 'm' : 'l'
            },
            breadcrumbsFromTabs: [{ link: PAGE_CONTACTS, title: 'Контакты' }],
            code
          }}
        />
        <NavBar
          {...{
            isMobile,
            code,
            navBar
          }}
        />
        {(code === 'contacts' || !code) && (
          <Contacts
            {...{
              className: css.contacts,
              isMobile
            }}
          />
        )}
        {(code === 'partners') && (
          <SupportPartners />
        )}
        {(code === 'service') && (
          <ServiceCentres
            {...{
              className: css.services,
              isMobile
            }}
          />
        )}
        {code === 'brand-zones' &&
          isBrowser && (
          <div {...{ className: css.brandzoneWrapper }}>
            <div className={css.city}>
              <BrandZoneCity />
            </div>
            <div className={css.map}>
              <BrandZoneMap />
            </div>
          </div>
        )}
        {code === 'license' &&
          <License {...{ isMobile }} />
        }
      </div>
    )
  }
}

ContactsPage.defaultProps = {
  isMobile: false,
  response: {}
}

ContactsPage.propTypes = {
  isMobile: PropTypes.bool,
  match: PropTypes.object,
  navBar: PropTypes.object,
  history: PropTypes.object
}

export default ContactsPage
