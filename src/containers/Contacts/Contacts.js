import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import toJS from 'HOC/toJS'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PopupsActions from 'containers/Popups/_service/PopupsActions'
import { withRemoteData } from 'remote-data-provider'

import css from './contacts.scss'

import FormContacts from 'containers/FormContacts/FormContacts'
import ContactsMap from 'kalashnikov-framework/lib/components/ContactsMap/ContactsMap'
import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'

function mapDispatchToProps (dispatch) {
  return {
    popupsActions: bindActionCreators(PopupsActions, dispatch)
  }
}

@withRemoteData({
  request: {
    url: '/contacts/contacts.php'
  },
  reducerKey: 'Contacts'
})
@connect(null, mapDispatchToProps)
@toJS
class Contacts extends PureComponent {
  showMobileMapContactsPopup = ({ coordinates, title }) => {
    const { props: { popupsActions: { openPopup, updatePopups } } } = this

    updatePopups({
      mapContactsCoordinates: coordinates,
      mapContactsTitle: title
    })
    openPopup('showMapContactsPopup')
  }

  render () {
    const {
      props: {
        className, isMobile,
        response: { data: { maps = [], aside: { text, title, phone } } = {} }
      }
    } = this

    return (
      <div {...{ className }}>
        <FormContacts
          {...{
            className: css.form,
            requestUrl: '/contacts/contacts.php',
            reducerKey: 'formContactsPage',
            form: 'formContactsPage',
            isMobile,
            contacts: true,
            text: text,
            phone: phone,
            reCaptchaAction: 'group_mail_contacts'
          }}
        />
        <MainAsideSection
          {...{
            title: title,
            reverse: true,
            asideWidth: 3,
            isMobile,
            separator: true
            /* asideChildren: (
              <div>
                <p {...{ className: css.name }}>{text}</p>
                <a {...{ className: css.position, href: `tel:${phone.replace(/\D/g, '')}` }}>{phone}</a>
              </div>
            ) */
          }}
        >
          <div {...{ className: css.mapsWrapper }}>
            {maps.map((data, key) => {
              return (
                <ContactsMap
                  {...{
                    isMobile,
                    key,
                    showMobileMapContactsPopup: this.showMobileMapContactsPopup,
                    ...data
                  }}
                />
              )
            })}
          </div>
        </MainAsideSection>
      </div>
    )
  }
}

Contacts.defaultProps = {
  isMobile: false,
  className: '',
  response: {},
  popupsActions: {},
  contacts: true
}

Contacts.propTypes = {
  isMobile: PropTypes.bool,
  className: PropTypes.string,
  response: PropTypes.object,
  popupsActions: PropTypes.object,
  contacts: PropTypes.bool
}

export default Contacts
