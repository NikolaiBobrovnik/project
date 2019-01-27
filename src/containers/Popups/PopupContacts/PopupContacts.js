import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import toJS from 'HOC/toJS'
import PropTypes from 'prop-types'
import * as PopupsActions from '../_service/PopupsActions'

import css from './popupContacts.scss'

import PhoneBlock from 'kalashnikov-framework/lib/components/PhoneBlock'
import AddressBlock from 'kalashnikov-framework/lib/components/AddressBlock'
import Socials from 'kalashnikov-framework/lib/components/Socials'
import PopupWrapper from 'kalashnikov-framework/lib/components/Popups/PopupWrapper'

function mapStateToProps (state) {
  return {
    contactsState: state.getIn(['remoteData', 'footer', 'response', 'data'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    popupsActions: bindActionCreators(PopupsActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@toJS
class PopupContacts extends PureComponent {
  render () {
    const {
      headerHeight,
      contactsState: { contacts: { text, tel, address }, socials }
    } = this.props

    return (
      <PopupWrapper
        {...{
          headerHeight,
          className: css.wrap,
          defaultInner: true,
          onClose: () => {
            this.props.popupsActions.closePopup('contactsPopup')
          }
        }}
      >
        <PhoneBlock
          {...{ text, tel, color: 'black', className: css.phoneBlock }}
        />
        <AddressBlock
          {...{ address, color: 'black', className: css.addressBlock }}
        />
        <Socials
          {...{
            theme: 'black',
            className: css.socials,
            items: socials
          }}
        />
      </PopupWrapper>
    )
  }
}

PopupContacts.propTypes = {
  headerHeight: PropTypes.any,
  response: PropTypes.object,
  popupsActions: PropTypes.object,
  contactsState: PropTypes.object
}

export default PopupContacts
