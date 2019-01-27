import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RemoteDataProvider } from 'remote-data-provider'
import * as PopupsActions from '../_service/PopupsActions'
import toJS from 'HOC/toJS'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import css from './popupStructureMobile.scss'

import HeaderNavigation from 'kalashnikov-framework/lib/components/Header/HeaderNavigation'
import PhoneBlock from 'kalashnikov-framework/lib/components/PhoneBlock/PhoneBlock'

function mapDispatchToProps (dispatch) {
  return {
    popupsActions: bindActionCreators(PopupsActions, dispatch)
  }
}

@withRouter
@connect('', mapDispatchToProps)
@toJS
class PopupStructureMobile extends PureComponent {
  // переход на второй уровень
  changeNavigation = ({ key }) => {
    this.props.popupsActions.updatePopups({
      structurePopupListNumber: key
    })
    this.props.popupsActions.openPopup('structureListPopup')
  }

  componentWillUnmount () {
    this.props.popupsActions.closePopup('structurePopup')
  }

  componentWillMount () {
    this.props.popupsActions.openPopup('structurePopup')
  }

  render () {
    const {
      props: {
        pathname,
        hash
      }
    } = this

    return (
      <div {...{ className: css.mobile_nav }}>
        <h3 {...{ className: css.title }}>
          Концерн <br /> Калашников
        </h3>
        <p {...{ className: css.text }}>
          Концерн является флагманом отечественной стрелковой отрасли, на его
          долю приходится порядка 95% производства стрелкового оружия России.
        </p>
        <RemoteDataProvider
          {...{
            request: {
              url: '/header/header_structure.php'
            },
            reducerKey: 'structure'
          }}
        >
          {({ response: { list = [] } } = {}) => {
            return (
              <HeaderNavigation
                {...{
                  pathname,
                  hash,
                  navigation: list,
                  whiteHeader: false,
                  isMobile: true,
                  theme: 'black',
                  onClick: this.changeNavigation
                }}
              />
            )
          }}
        </RemoteDataProvider>
        <span {...{ className: css.mobile_nav_contacts }}>
          <PhoneBlock
            {...{
              tel: '8 800 200 18 07',
              text: 'Звонок по России бесплатный',
              color: 'white',
              className: css.phoneBlock
            }}
          />
        </span>
      </div>
    )
  }
}

PopupStructureMobile.propTypes = {
  response: PropTypes.object,
  popupsActions: PropTypes.object,
  pathname: PropTypes.string,
  hash: PropTypes.string
}

export default PopupStructureMobile
