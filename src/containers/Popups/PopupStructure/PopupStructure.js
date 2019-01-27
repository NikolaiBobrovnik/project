import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRemoteData } from 'remote-data-provider'
import * as PopupsActions from '../_service/PopupsActions'
import toJS from 'HOC/toJS'
import PropTypes from 'prop-types'

import Structure from 'kalashnikov-framework/lib/components/Structure&Sections/Structure'

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

const options = {
  request: {
    url: 'header/header_structure.php'
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@toJS
@withRemoteData(options)
class PopupStructure extends Component {
  componentWillUnmount () {
    this.props.popupsActions.closePopup('structurePopup')
  }

  componentWillMount () {
    this.props.popupsActions.openPopup('structurePopup')
  }

  render () {
    const {
      response: { list },
      contactsState: { contacts, socials }
    } = this.props

    return (
      <Structure
        {...{
          list,
          contacts,
          socials
        }}
      />
    )
  }
}

PopupStructure.propTypes = {
  response: PropTypes.object,
  popupsActions: PropTypes.object,
  contactsState: PropTypes.object
}

export default PopupStructure
