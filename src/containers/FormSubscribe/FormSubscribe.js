import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import classNames from 'classnames'
import _get from 'lodash/get'
import actions from 'redux-form/lib/actions'
import * as PopupsActions from 'containers/Popups/_service/PopupsActions'
import { ReCaptcha } from 'react-recaptcha-v3'
import { KEY_RECAPTCHA } from 'constants/RDP_KEYS'
import { withRemoteData, getLocalState } from 'remote-data-provider'
import { axiosAPI } from 'Services/axiosInstances'
import { Field, reduxForm } from 'redux-form/immutable'
import { emailValidation, required } from 'utils/Form/validate'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import css from './formSubscribe.scss'

import Button from 'kalashnikov-framework/lib/components/Button'
import Input from 'components/Input/Input'
import Agree from 'containers/Agree/Agree'
import Checkbox from 'kalashnikov-framework/lib/components/Checkbox/Checkbox'
import FormSuccess from 'kalashnikov-framework/lib/components/FormSuccess/FormSuccess'

import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

let options = {
  request: {
    url: '/form/subscribe.php'
  },
  reducerKey: 'formSubscribe'
}

function mapStateToProps (state) {
  return {
    popupsState: state.get('popups'),
    reCaptchaKey: _get(getLocalState(state, KEY_RECAPTCHA), 'response.key')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    popupsActions: bindActionCreators(PopupsActions, dispatch)
  }
}

const formName = 'formSubscribe'

@withRemoteData(options)
@connect(mapStateToProps, mapDispatchToProps)
class FormSubscribe extends PureComponent {
  constructor (props) {
    super(props)
    this.recaptchaRef = React.createRef()
  }

  state = {
    success: false,
    error: false,
    successTitle: '',
    successText: ''
  }

  verifyCallback = reCaptchaToken => {
    const { props: { dispatch } } = this

    dispatch(actions.change(formName, 'g-recaptcha-response', reCaptchaToken))
  }

  render () {
    const {
      isMobile,
      className,
      valid,
      handleSubmit,
      submitting,
      /* popupsActions: {
        openPopupWithOverflow
      }, */
      response: {
        data: {
          title,
          paragraph,
          image,
          form: {
            inputs: {
              name: nameLabel,
              email: emailLabel,
              subscribeAgree: subscribeAgreeLabel
            }
          }
        }
      },
      reCaptchaKey
    } = this.props

    const { success, successTitle, successText } = this.state

    const submit = values => {
      this.recaptchaRef.current.execute()

      let content = values.toJS()
      content.send = 'Y'
      axiosAPI
        .post('/form/subscribe.php', qs.stringify(content))
        .then(response => {
          const { success, successTitle, successText } = response.data
          if (success) {
            this.setState({
              success: true,
              error: false,
              successTitle,
              successText
            })
          } else {
            this.setState({ success: false, error: true, successText })
          }
        })
    }

    return (
      <div
        {...{
          className: classNames(className, css.wrapper, isMobile ? css.mobile : css.desktop),
          style: { backgroundImage: `url(${image})` }
        }}
      >
        {!success ? (
          <form {...{ onSubmit: handleSubmit(submit), className: css.form }}>
            <legend {...{ className: css.title }}>{title}</legend>
            <p {...{ className: css.paragraph }}>{paragraph}</p>
            <span {...{ className: css.row }}>
              <span {...{ className: css.inputsGroup }}>
                <Field
                  {...{
                    name: 'name',
                    type: 'text',
                    component: Input,
                    placeholder: nameLabel,
                    className: css.input,
                    validate: [required]
                  }}
                />
                <Field
                  {...{
                    name: 'email',
                    type: 'email',
                    placeholder: emailLabel,
                    component: Input,
                    validate: [emailValidation, required],
                    className: css.input
                  }}
                />
              </span>
              <Button
                {...{
                  className: css.button,
                  type: 'submit',
                  color: 'white',
                  title: isMobile ? 'Подписаться' : '',
                  width: isMobile ? 'available' : 'default',
                  iconPosition: isMobile ? 'right' : 'center',
                  disabled: !valid || submitting,
                  icon: <MdKeyboardArrowRight />
                }}
              />
            </span>
            <Field
              {...{
                id: 'subscribeAgree',
                type: 'checkbox',
                name: 'subscribeAgree',
                label: subscribeAgreeLabel,
                component: Checkbox,
                color: 'white',
                validate: [required],
                className: css.checkbox,
                stateless: true
              }}
            />
            {reCaptchaKey &&
              <ReCaptcha
                {...{
                  ref: this.recaptchaRef,
                  sitekey: reCaptchaKey,
                  action: 'group_feedback_v2',
                  verifyCallback: this.verifyCallback
                }}
              />
            }
            {/* <span
              {...{
                className: css.openPopup,
                onClick: () => {
                  openPopupWithOverflow('popupConsent')
                }
              }}
            >
              Согласие кандидата на обработку перслональных данных
            </span> */}
            <Agree {...{ isMobile }} />
            {successText &&
              <div {...{ className: css.error }}>{successText}</div>
            }
          </form>
        ) : (
          <FormSuccess
            {...{ title: successTitle, paragraph: successText, theme: 'black' }}
          />
        )}
      </div>
    )
  }
}

FormSubscribe.propTypes = {
  className: PropTypes.string,
  valid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  response: PropTypes.object,
  isMobile: PropTypes.bool,
  popupsActions: PropTypes.object,
  dispatch: PropTypes.func,
  reCaptchaKey: PropTypes.string
}

export default reduxForm({
  form: formName
})(FormSubscribe)
