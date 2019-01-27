import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import toJS from 'HOC/toJS'
import * as PopupsActions from '../_service/PopupsActions'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import css from './popupLogin.scss'

import PopupWrapper from 'kalashnikov-framework/lib/components/Popups/PopupWrapper'
import Button from 'kalashnikov-framework/lib/components/ButtonNew'
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

function mapDispatchToProps (dispatch) {
  return {
    popupsActions: bindActionCreators(PopupsActions, dispatch)
  }
}

const link = 'https://shop.kalashnikov.com/#login'

@withRouter
@connect('', mapDispatchToProps)
@toJS
export default class PopupLogin extends PureComponent {
  closePopup = () => {
    this.props.popupsActions.closePopup('loginPopup')
    this.props.history.push({ hash: '' })
  }

  componentWillUnmount () {
    this.props.popupsActions.closePopup('loginPopup')
  }

  componentWillMount () {
    this.props.popupsActions.openPopup('loginPopup')
  }

  componentWillUpdate (nextProps, nextState, nextContext) {
    if (!this.state.success && nextState.success) {
      this.closePopup()
    }
  }

  render () {
    const {
      props: {
        headerHeight,
        isMobile
      }
    } = this

    return (
      <PopupWrapper
        {...{
          className: classNames(css.popup, {
            [css.mobile]: isMobile,
            [css.desktop]: !isMobile
          }),
          headerHeight,
          onClose: this.closePopup,
          title: <span {...{ className: css.link }}>
            Для авторизации или регистрации перейдите на сайт
            <a {...{ href: link, target: '_blank' }}>
              {' shop.kalashnikov.com'}
            </a>
          </span>,
          isMobile,
          footer: (
            <Button
              {...{
                link,
                icon: <MdKeyboardArrowRight />,
                backgroundColor: 'accent',
                title: 'Перейти',
                targetBlank: true,
                width: isMobile ? 'full' : 'auto'
              }}
            />
          )
        }}
      />
    )
  }
}

PopupLogin.propTypes = {
  popupsActions: PropTypes.object,
  isMobile: PropTypes.bool,
  headerHeight: PropTypes.string,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.any,
  history: PropTypes.object
}
