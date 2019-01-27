import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import classNames from 'classnames'
import _get from 'lodash/get'
import toJS from 'HOC/toJS'
import actions from 'redux-form/lib/actions'
import { createTextMask } from 'redux-form-input-masks'
import { ReCaptcha } from 'react-recaptcha-v3'
import { Field, reduxForm } from 'redux-form/immutable'
import { emailValidation, required, minLength } from 'utils/Form/validate'
import { axiosAPI } from 'Services/axiosInstances'
import { connect } from 'react-redux'
import { getLocalState, RemoteDataProvider } from 'remote-data-provider'
import { KEY_RECAPTCHA } from 'constants/RDP_KEYS'

import css from './formContacts.scss'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import EmailBlock from 'kalashnikov-framework/lib/components/EmailBlock'
import Input from 'components/Input/Input'
import Agree from 'containers/Agree/Agree'
import TextArea from 'components/TextArea/TextArea'
import Button from 'kalashnikov-framework/lib/components/Button'
import FormSuccess from 'kalashnikov-framework/lib/components/FormSuccess/FormSuccess'
import Checkbox from 'kalashnikov-framework/lib/components/Checkbox/Checkbox'

import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

function mapStateToProps (state, ownProps) {
  return {
    reCaptchaKey: _get(getLocalState(state, KEY_RECAPTCHA), 'response.key')
  }
}

@connect(mapStateToProps)
@toJS
class FormContacts extends PureComponent {
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

  verifyCallback = (reCaptchaToken) => {
    const {
      props: {
        dispatch,
        form
      }
    } = this

    dispatch(
      actions.change(
        form,
        'g-recaptcha-response',
        reCaptchaToken
      )
    )
  }

  renderAsideChildren = ({ email, name, position, withForm }) => {
    const { contacts, text, phone } = this.props
    return (
      <div
        {...{
          className: classNames(css.aside, { [css.withForm]: withForm })
        }}
      >
        {contacts
          ? <Fragment>
            <p {...{ className: css.name }}>{text}</p>
            <a {...{ className: css.position, href: `tel:${phone.replace(/\D/g, '')}` }}>{phone}</a>
          </Fragment>
          : <Fragment>
            <span>
              <p {...{ className: css.name }}>{name}</p>
              <p {...{ className: css.position }}>{position}</p>
            </span>
            <EmailBlock {...{ email, className: css.email }} />
          </Fragment>
        }
      </div>
    )
  }

  renderForm = ({
    success,
    successTitle,
    successText,
    isMobile,
    link,
    handleSubmit,
    legend,
    nameLabel,
    surnameLabel,
    middlenameLabel,
    phoneLabel,
    emailLabel,
    commentLabel,
    contactsAgreeLabel,
    valid,
    submitting,
    button,
    phoneMask,
    minLength10,
    onlyForm
  }) => {
    const {
      props: {
        reCaptchaKey,
        reCaptchaAction
      },
      state: {
        error
      }
    } = this

    const submit = values => {
      this.recaptchaRef.current.execute()
      axiosAPI.post(link, qs.stringify(values.toJS())).then(response => {
        const { result, successTitle, successText, message } = response.data
        if (result) {
          this.setState({
            success: true,
            error: false,
            successTitle,
            successText
          })
        } else {
          this.setState({ success: false, error: message })
        }
      })
    }

    if (success) {
      return (
        <FormSuccess
          {...{
            theme: 'white',
            className: css.successForm,
            title: successTitle,
            paragraph: successText
          }}
        />
      )
    } else {
      return (
        <Fragment>
          {legend &&
          <legend {...{ className: css.legend }}>{legend}</legend>
          }
          <form
            {...{
              className: classNames(
                css.form,
                isMobile ? css.mobile : css.desktop
              ),
              onSubmit: handleSubmit(submit)
            }}
          >
            <div {...{ className: css.inputs_group }}>
              <Field
                {...{
                  name: 'name',
                  type: 'text',
                  changeValidationState: this.changeValidationState,
                  component: Input,
                  label: nameLabel,
                  className: css.input,
                  validate: [required]
                }}
              />
              {onlyForm
                ? <Field
                  {...{
                    name: 'surname',
                    type: 'text',
                    changeValidationState: this.changeValidationState,
                    component: Input,
                    label: surnameLabel,
                    className: css.input,
                    validate: [required]
                  }}
                />
                : <Field
                  {...{
                    name: 'surname',
                    type: 'text',
                    changeValidationState: this.changeValidationState,
                    component: Input,
                    label: surnameLabel,
                    className: css.input,
                    required: false
                    // validate: [required]
                  }}
                />
              }
            </div>
            {onlyForm
              ? <div {...{ className: css.inputs_group }}>
                <Field
                  {...{
                    name: 'middlename',
                    type: 'text',
                    changeValidationState: this.changeValidationState,
                    component: Input,
                    label: middlenameLabel,
                    className: css.input,
                    validate: [required]
                  }}
                />
                <Field
                  {...{
                    changeValidationState: this.changeValidationState,
                    name: 'email',
                    type: 'email',
                    component: Input,
                    label: emailLabel,
                    validate: [required, emailValidation],
                    className: css.input
                  }}
                />
              </div>
              : <Fragment>
                <Field
                  {...{
                    name: 'middlename',
                    type: 'text',
                    changeValidationState: this.changeValidationState,
                    component: Input,
                    label: middlenameLabel,
                    required: false
                    // validate: [required]
                  }}
                />
                <div {...{ className: css.inputs_group }}>
                  <Field
                    {...{
                      name: 'phone',
                      type: 'text',
                      changeValidationState: this.changeValidationState,
                      component: Input,
                      label: phoneLabel,
                      className: css.input,
                      validate: [required, minLength10],
                      ...phoneMask
                    }}
                  />
                  <Field
                    {...{
                      changeValidationState: this.changeValidationState,
                      name: 'email',
                      type: 'email',
                      component: Input,
                      label: emailLabel,
                      validate: [required, emailValidation],
                      className: css.input
                    }}
                  />
                </div>
              </Fragment>
            }
            {onlyForm
              ? <Field
                {...{
                  name: 'comment',
                  type: 'text',
                  component: TextArea,
                  className: css.textArea,
                  label: commentLabel,
                  validate: [required]
                }}
              />
              : <Field
                {...{
                  name: 'comment',
                  type: 'text',
                  component: TextArea,
                  className: css.textArea,
                  label: commentLabel,
                  required: false
                  // validate: [required]
                }}
              />
            }
            <div {...{ className: css.footer }}>
              <Field
                {...{
                  id: 'contactsAgree',
                  type: 'checkbox',
                  name: 'contactsAgree',
                  label: contactsAgreeLabel,
                  component: Checkbox,
                  color: 'white',
                  validate: [required],
                  stateless: true
                }}
              />
              <Button
                {...{
                  className: css.button,
                  type: 'submit',
                  color: 'white',
                  iconPosition: 'right',
                  disabled: !valid || submitting,
                  title: button,
                  icon: <MdKeyboardArrowRight />
                }}
              />
            </div>
            <Agree {...{ isMobile, className: css.textLink }} />
            {reCaptchaKey &&
            <ReCaptcha
              {...{
                ref: this.recaptchaRef,
                sitekey: reCaptchaKey,
                action: reCaptchaAction,
                verifyCallback: this.verifyCallback
              }}
            />
            }
            {error &&
              <p {...{ className: css.error }}>{error}</p>
            }
          </form>
        </Fragment>
      )
    }
  }

  render () {
    const phoneMask = createTextMask({
      pattern: '+7(999) 999-99-99'
    })

    const minLength10 = minLength(10)
    const {
      props: {
        isMobile,
        className,
        valid,
        handleSubmit,
        submitting,
        requestUrl,
        reducerKey,
        withForm,
        onlyForm
      },
      state: {
        success, successTitle, successText
      }
    } = this

    return (
      <RemoteDataProvider
        {...{
          request: {
            url: requestUrl
          },
          reducerKey
        }}
      >
        {({
          response: {
            data: {
              title,
              name,
              position,
              email,
              form: {
                legend,
                button,
                inputs: {
                  name: nameLabel,
                  surname: surnameLabel,
                  middlename: middlenameLabel,
                  phone: phoneLabel,
                  email: emailLabel,
                  comment: commentLabel,
                  contactsAgree: contactsAgreeLabel
                },
                link
              },
              paragraph
            }
          }
        }) => {
          if (onlyForm) {
            return (
              <div {...{
                className: classNames(
                  className,
                  isMobile ? css.onlyFormMobile : css.onlyForm
                )
              }}
              >
                {this.renderForm({
                  success,
                  successTitle,
                  successText,
                  isMobile,
                  link,
                  handleSubmit,
                  legend,
                  nameLabel,
                  surnameLabel,
                  middlenameLabel,
                  emailLabel,
                  commentLabel,
                  contactsAgreeLabel,
                  valid,
                  submitting,
                  button,
                  onlyForm
                })}
              </div>
            )
          } else {
            return (
              <MainAsideSection
                {...{
                  isMobile,
                  separator: true,
                  title,
                  reverse: true,
                  asideWidth: 3,
                  className,
                  asideChildren: withForm ? this.renderAsideChildren({ name, position, email, withForm }) : ''
                }}
              >
                { paragraph &&
                  <div
                    {...{
                      className: css.paragraph,
                      dangerouslySetInnerHTML: { __html: paragraph }
                    }}
                  />
                }
                {withForm ? (
                  this.renderForm({
                    success,
                    successTitle,
                    successText,
                    isMobile,
                    link,
                    handleSubmit,
                    legend,
                    nameLabel,
                    surnameLabel,
                    middlenameLabel,
                    phoneLabel,
                    emailLabel,
                    commentLabel,
                    contactsAgreeLabel,
                    valid,
                    submitting,
                    button,
                    minLength10,
                    phoneMask
                  })
                ) : (
                  this.renderAsideChildren({ name, position, email, withForm })
                )}
              </MainAsideSection>
            )
          }
        }}
      </RemoteDataProvider>
    )
  }
}

FormContacts.defaultProps = {
  withForm: true,
  onlyForm: false
}

FormContacts.propTypes = {
  onlyForm: PropTypes.bool,
  withForm: PropTypes.bool,
  className: PropTypes.string,
  valid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  response: PropTypes.object,
  submitting: PropTypes.bool,
  reducerKey: PropTypes.string,
  requestUrl: PropTypes.string,
  isMobile: PropTypes.bool,
  contacts: PropTypes.bool,
  text: PropTypes.string,
  phone: PropTypes.string,
  reCaptchaKey: PropTypes.string,
  reCaptchaAction: PropTypes.string,
  form: PropTypes.string,
  dispatch: PropTypes.func,
  link: PropTypes.string,
  error: PropTypes.string
}

export default reduxForm({
  form: this.form // a unique name for the form
})(FormContacts)
