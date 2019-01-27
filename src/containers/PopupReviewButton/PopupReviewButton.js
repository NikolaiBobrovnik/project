import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import css from './PopupReviewButton.scss'
import ReviewIcon from 'kalashnikov-framework/lib/components/CustomIcons/Review'
import Button from 'kalashnikov-framework/lib/components/ButtonNew/Button'
import { withViewContext } from 'HOC/ViewContext/ViewContext'
import { bindActionCreators } from 'redux'
import * as PopupsActions from 'containers/Popups/_service/PopupsActions'
import { connect } from 'react-redux'
import toJS from 'HOC/toJS'
import { withCookies } from 'react-cookie'
import {
  COOKIE_POPUP_REVIEW_NAME,
  COOKIE_POPUP_REVIEW_VALUE_DONE,
  COOKIE_POPUP_REVIEW_VALUE_WAIT
} from 'Services/constants/cookies'

let renderedOnSession = false

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

@withViewContext
@connect(mapStateToProps, mapDispatchToProps)
@toJS
@withCookies
export default class PopupReviewButton extends PureComponent {
  componentDidMount () {
    const showReviewButton = process.env.REACT_APP_SHOW_REVIEW_BUTTON
    const {
      cookies,
      isMobile,
      popupsActions: {
        openPopup
      }
    } = this.props

    if (renderedOnSession || showReviewButton !== 'true' || isMobile) return
    renderedOnSession = true

    const popupReviewCookie = cookies.get(COOKIE_POPUP_REVIEW_NAME)

    if (!popupReviewCookie) {
      cookies.set(COOKIE_POPUP_REVIEW_NAME, COOKIE_POPUP_REVIEW_VALUE_WAIT, { path: '/' })
    } else if (popupReviewCookie === COOKIE_POPUP_REVIEW_VALUE_WAIT) {
      cookies.set(COOKIE_POPUP_REVIEW_NAME, COOKIE_POPUP_REVIEW_VALUE_DONE, { path: '/' })
      openPopup('popupReview')
    }
  }

  render () {
    const showReviewButton = process.env.REACT_APP_SHOW_REVIEW_BUTTON

    const {
      isMobile,
      popupsState: {
        popupReview
      },
      popupsActions: {
        openPopup
      }
    } = this.props

    if (showReviewButton !== 'true' || isMobile) {
      return null
    }

    return (
      <Button
        {...{
          className: css.reviewButton,
          disabled: popupReview,
          width: 'square',
          height: 'm',
          icon: <ReviewIcon />,
          iconPosition: 'center',
          iconSize: 'l',
          padding: 'none',
          onClick: () => {
            openPopup('popupReview')
          }
        }}
      />
    )
  }

  static defaultProps = {}

  static propTypes = {
    cookies: PropTypes.object,
    isMobile: PropTypes.bool,
    popupsState: PropTypes.object,
    popupsActions: PropTypes.object
  }
}
