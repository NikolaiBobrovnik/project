import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PopupsActions from 'containers/Popups/_service/PopupsActions'
import toJS from 'HOC/toJS'
import PropTypes from 'prop-types'

import css from './popupReview.scss'

import PopupAlert from 'kalashnikov-framework/lib/components/PopupAlert'
import { withCookies } from 'react-cookie'
import {
  COOKIE_POPUP_REVIEW_NAME,
  COOKIE_POPUP_REVIEW_VALUE_WAIT
} from 'Services/constants/cookies'

function mapDispatchToProps (dispatch) {
  return {
    popupsActions: bindActionCreators(PopupsActions, dispatch)
  }
}

@connect('', mapDispatchToProps)
@toJS
@withCookies
class PopupReview extends Component {
  render () {
    const {
      popupsActions: { closePopup, openPopup },
      cookies
    } = this.props

    return (
      <div>
        <PopupAlert
          {...{
            onClose: () => {
              closePopup('popupReview')
            },
            className: css.popupReview,
            paragraph:
              'Всё стремится к развитию, и наш сайт — \n' +
              'не исключение!\n' +
              '\n' +
              'Здесь вы можете познакомиться с новым сайтом Концерна Калашников до официального релиза, который состоится совсем скоро. Обращаем внимание, что сайт находится в тестовом режиме. Мы доверяем вашему мнению и будем рады услышать отзывы и предложения.',
            buttons: [
              {
                buttonText: 'Написать отзыв',
                onButtonClick: () => {
                  closePopup('popupReview')
                  openPopup('popupReviewForm')
                }
              },
              {
                buttonText: 'Написать позже',
                onButtonClick: () => {
                  closePopup('popupReview')
                  cookies.set(COOKIE_POPUP_REVIEW_NAME, COOKIE_POPUP_REVIEW_VALUE_WAIT, { path: '/' })
                }
              }
            ]
          }}
        />
      </div>
    )
  }
}

PopupReview.propTypes = {
  cookies: PropTypes.object,
  popupsActions: PropTypes.object
}

export default PopupReview
