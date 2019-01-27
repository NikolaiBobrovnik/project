import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as PopupsActions from '../_service/PopupsActions'
import toJS from 'HOC/toJS'
import PropTypes from 'prop-types'

import StructureList from 'kalashnikov-framework/lib/components/Structure&Sections/StructureList'
import PopupNavSecondLevelWrapperOld from 'kalashnikov-framework/lib/components/Popups/PopupNavSecondLevelWrapperOld'

function mapStateToProps (state) {
  return {
    popupsState: state.get('popups'),
    structureState: state.getIn(['remoteData', 'structure', 'response'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    popupsActions: bindActionCreators(PopupsActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@toJS
@withRouter
class PopupStructureList extends PureComponent {
  state = {
    selectedItem: null
  }

  goBack = () => {
    const {
      props: {
        popupsActions: {
          updatePopups,
          closePopup
        }
      }
    } = this

    updatePopups({
      structurePopupListNumber: null
    })
    closePopup('structureListPopup')
  }

  componentWillUnmount () {
    this.props.popupsActions.closePopup('structureListPopup')
  }

  changeListNum = (prop, key) => {
    this.setState({selectedItem: key})
  }

  render () {
    const {
      structureState: {
        list
      },
      popupsState: {
        structurePopupListNumber
      }
    } = this.props

    if (typeof structurePopupListNumber === 'undefined') {
      return false
    }

    const {
      selectedItem
    } = this.state
    return (
      <PopupNavSecondLevelWrapperOld
        {...{
          theme: 'black',
          title: list[structurePopupListNumber].title,
          onBackButtonClick: this.goBack
        }}
      >
        <StructureList
          {...{
            withCustomScroll: false,
            list: list[structurePopupListNumber].list,
            isMobile: true,
            selectedItem,
            changeListNum: this.changeListNum
          }}
        />
      </PopupNavSecondLevelWrapperOld>
    )
  }
}

PopupStructureList.propTypes = {
  structureState: PropTypes.object,
  popupsActions: PropTypes.object,
  popupsState: PropTypes.object
}

export default PopupStructureList
