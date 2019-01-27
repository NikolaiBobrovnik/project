import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import toJS from 'HOC/toJS'
import { withRouter } from 'react-router-dom'
import * as PopupsActions from 'containers/Popups/_service/PopupsActions'
import PropTypes from 'prop-types'
import _includes from 'lodash/includes'
import _isEqual from 'lodash/isEqual'

import PopupStructure from './PopupStructure/PopupStructure'
import PopupContacts from './PopupContacts/PopupContacts'
import PopupReview from './PopupReview/PopupReview'
import PopupReviewForm from './PopupReviewForm/PopupReviewForm'
import PopupStructureMobile from './PopupStructure/PopupStructureMobile'
import PopupStructureList from './PopupStructureList/PopupStructureList'
import HeaderSections from 'containers/HeaderSections/HeaderSections'
import PopupConsent from './PopupConsent/PopupConsent'
import PopupLogin from './PopupLogin/PopupLogin'

function mapStateToProps (state) {
  return {
    popupsState: state.get('popups')
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
class Popups extends Component {
  componentWillReceiveProps (nextProps) {
    const { props: { isMobile } } = this

    if (!_isEqual(this.props.popupsState, nextProps.popupsState)) {
      if (_includes(nextProps.popupsState, true)) {
        if (!nextProps.popupsState.popupReview) {
          document.documentElement.classList.add(
            isMobile ? 'overflow_hidden_mobile' : 'overflow_hidden'
          )
        }
      } else {
        document.documentElement.classList.remove(
          isMobile ? 'overflow_hidden_mobile' : 'overflow_hidden'
        )
      }
    }

    if (
      _includes(this.props.popupsState, true) &&
      this.props.location.hash !== nextProps.location.hash &&
      !nextProps.location.hash
    ) {
      this.props.history.push({ hash: '' })
    }
  }

  render () {
    const {
      props: {
        isMobile,
        location: { hash },
        popupsState: {
          popupConsent,
          structureListPopup,
          contactsPopup,
          popupReview,
          popupReviewForm
        }
      }
    } = this

    const headerHeight = isMobile ? '6rem' : '4rem'

    return (
      <Fragment>
        {hash === '#structure' &&
          (isMobile ? <PopupStructureMobile /> : <PopupStructure />)}
        {isMobile && structureListPopup && <PopupStructureList />}
        {contactsPopup && <PopupContacts {...{ headerHeight, isMobile }} />}
        {popupReview && <PopupReview />}
        {popupReviewForm && <PopupReviewForm />}
        {hash === '#login' && (
          <PopupLogin
            {...{
              headerHeight,
              isMobile
            }}
          />
        )}
        {!isMobile &&
          hash === '#production' && <HeaderSections {...{ hash }} />}
        {popupConsent && <PopupConsent {...{ isMobile }} />}
      </Fragment>
    )
  }
}

Popups.propTypes = {
  location: PropTypes.object,
  popupsState: PropTypes.object,
  isMobile: PropTypes.bool,
  history: PropTypes.object
}

export default Popups
