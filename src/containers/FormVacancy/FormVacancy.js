import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import toJS from 'HOC/toJS'
import _get from 'lodash/get'
import actions from 'redux-form/lib/actions'
import { RemoteDataProvider, getLocalState } from 'remote-data-provider'
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable'
import { emailValidation, required, minLength } from 'utils/Form/validate'
import { createTextMask } from 'redux-form-input-masks'
import { axiosAPI } from 'Services/axiosInstances'
import { KEY_RECAPTCHA } from 'constants/RDP_KEYS'
import { connect } from 'react-redux'
import { ReCaptcha } from 'react-recaptcha-v3'

import css from './formVacancy.scss'
import classNames from 'classnames'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import EmailBlock from 'kalashnikov-framework/lib/components/EmailBlock'
import Input from 'components/Input/Input'
import TextArea from 'components/TextArea/TextArea'
import Checkbox from 'kalashnikov-framework/lib/components/Checkbox/Checkbox'
import Button from 'kalashnikov-framework/lib/components/Button'
import FileInput from 'components/FileInput/FileInput'
import FormSuccess from 'kalashnikov-framework/lib/components/FormSuccess/FormSuccess'
import Selector from 'kalashnikov-framework/lib/components/Selector/Selector'

import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'
import * as PopupsActions from 'containers/Popups/_service/PopupsActions'
import { bindActionCreators } from 'redux'

const minLength10 = minLength(10)

const selector = formValueSelector('FormVacancy') // <-- same as form name

function mapStateToProps (state) {
  return {
    currentComeFrom: selector(state, 'comeFrom'),
    reCaptchaKey: _get(getLocalState(state, KEY_RECAPTCHA), 'response.key')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    popupsActions: bindActionCreators(PopupsActions, dispatch)
  }
}

const formName = 'FormVacancy'

@reduxForm({
  form: formName
})
@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class FormVacancy extends PureComponent {
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
        dispatch
      }
    } = this

    dispatch(
      actions.change(
        formName,
        'g-recaptcha-response',
        reCaptchaToken
      )
    )
  }

  render () {
    const {
      props: {
        isMobile,
        className,
        valid,
        handleSubmit,
        submitting,
        code,
        vacancyName,
        vacancyCity,
        showHhLink,
        customAgreeLabel,
        currentComeFrom,
        showComeFrom,
        popupsActions: {
          openPopup
        },
        reCaptchaKey
      },
      state: { success, successTitle, successText, error }
    } = this

    const showOther = currentComeFrom === 'Другое (указать)'

    const phoneMask = createTextMask({
      pattern: '+7(999) 999-99-99'
    })

    return (
      <RemoteDataProvider
        {...{
          request: {
            url: '/form/career_feedback.php'
          }
        }}
      >
        {({
          response: {
            data: {
              title,
              text,
              phone,
              email,
              comeFrom: comeFromOptions,
              gender: genderOptions,
              form: {
                legend,
                button,
                inputs: {
                  file,
                  nameF: nameFLabel,
                  nameI: nameILabel,
                  nameO: nameOLabel,
                  bornDate: bornDateLabel,
                  gender: genderLabel,
                  residenceCity: residenceCityLabel,
                  hhLink: hhLinkLabel,
                  desiredVacancy: desiredVacancyLabel,
                  email: emailLabel,
                  phone: phoneLabel,
                  comment: commentLabel,
                  vacancyAgree: vacancyAgreeLabel,
                  customVacancyAgree: customVacancyAgreeLabel,
                  comeFrom: comeFromLabel
                }
              }
            }
          }
        }) => {
          const submit = values => {
            let content = values.toJS()
            content.send = 'Y'

            let formData = new FormData()
            formData.append('city', vacancyCity)
            formData.append('vac_code', code)
            formData.append('vacancy', vacancyName)
            map(content, (field, key) => {
              formData.append(key, field)
            })

            this.recaptchaRef.current.execute()
            axiosAPI
              .post('/form/career_feedback.php', formData)
              .then(response => {
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

          return (
            <MainAsideSection
              {...{
                isMobile,
                separator: false,
                title,
                reverse: true,
                asideWidth: 3,
                className,
                asideChildren: !isMobile && (
                  <div>
                    {text && <p {...{ className: css.text }}>{text}</p>}
                    {phone && (
                      <a
                        {...{
                          className: css.phone,
                          href: `tel:+${phone.replace(/[^0-9]/gim, '')}`
                        }}
                      >
                        {phone}
                      </a>
                    )}
                    {email && (
                      <EmailBlock {...{ email, className: css.email }} />
                    )}
                  </div>
                )
              }}
            >
              {!success ? (
                <form
                  {...{
                    className: classNames(
                      css.form,
                      isMobile ? css.mobile : css.desktop
                    ),
                    onSubmit: handleSubmit(submit)
                  }}
                >
                  <legend {...{ className: css.legend }}>{legend}</legend>
                  <div {...{ className: css.inputs_group }}>
                    <Field
                      {...{
                        name: 'nameF',
                        type: 'text',
                        component: Input,
                        label: nameFLabel,
                        validate: [required],
                        className: css.input
                      }}
                    />
                    <Field
                      {...{
                        name: 'nameI',
                        type: 'text',
                        component: Input,
                        label: nameILabel,
                        validate: [required],
                        className: css.input
                      }}
                    />
                  </div>
                  <div {...{ className: css.inputs_group }}>
                    <Field
                      {...{
                        name: 'nameO',
                        type: 'text',
                        component: Input,
                        label: nameOLabel,
                        validate: [required],
                        className: css.input
                      }}
                    />
                    <Field
                      {...{
                        wrapperClassName: classNames(css.selectorWrapper),
                        className: css.selector,
                        component: Selector,
                        label: genderLabel,
                        name: 'gender',
                        placeholderText: 'Выберите',
                        placeholderColor: 'black',
                        required: true,
                        validate: [required],
                        options: genderOptions,
                        stateless: true,
                        textTransform: 'none'
                      }}
                    />
                  </div>
                  <div {...{ className: css.inputs_group }}>
                    <Field
                      {...{
                        name: 'bornDate',
                        type: 'date',
                        component: Input,
                        label: bornDateLabel,
                        className: css.input,
                        validate: [required]
                      }}
                    />
                    <Field
                      {...{
                        name: 'residenceCity',
                        type: 'text',
                        component: Input,
                        label: residenceCityLabel,
                        validate: [required],
                        className: css.input
                      }}
                    />
                  </div>
                  <div {...{ className: css.inputs_group }}>
                    <Field
                      {...{
                        name: 'phone',
                        type: 'text',
                        component: Input,
                        label: phoneLabel,
                        className: css.input,
                        validate: [required, minLength10],
                        ...phoneMask
                      }}
                    />
                    <Field
                      {...{
                        name: 'email',
                        type: 'email',
                        component: Input,
                        label: emailLabel,
                        validate: [required, emailValidation],
                        className: css.input
                      }}
                    />
                  </div>
                  {showHhLink && (
                    <Field
                      {...{
                        name: 'hhLink',
                        type: 'text',
                        component: Input,
                        label: hhLinkLabel,
                        required: false
                        // className: css.input
                      }}
                    />
                  )}
                  {showComeFrom &&
                  <div {...{ className: css.inputs_group }}>
                    <Field
                      {...{
                        wrapperClassName: classNames(css.selectorWrapper, {[css.input]: showOther}),
                        className: css.selector,
                        component: Selector,
                        label: comeFromLabel,
                        name: 'comeFrom',
                        placeholderText: 'Выберите',
                        placeholderColor: 'black',
                        required: false,
                        options: comeFromOptions,
                        stateless: true,
                        textTransform: 'none'
                      }}
                    />
                    {showOther &&
                    <Field
                      {...{
                        name: 'customComeFrom',
                        type: 'text',
                        component: Input,
                        label: '',
                        placeholder: 'Напишите другое',
                        required: true,
                        validate: [required],
                        className: classNames(css.input, css.otherInput)
                      }}
                    />
                    }
                  </div>
                  }
                  <Field
                    {...{
                      name: 'desiredVacancy',
                      type: 'text',
                      component: Input,
                      label: desiredVacancyLabel,
                      validate: [required]
                    }}
                  />
                  <Field
                    {...{
                      name: 'comment',
                      type: 'text',
                      component: TextArea,
                      className: css.textArea,
                      label: commentLabel,
                      validate: [required]
                    }}
                  />
                  <Field
                    {...{
                      type: 'file',
                      name: 'file',
                      id: 'vacancyFile',
                      text: file,
                      multiple: true,
                      sizeLimit: 2,
                      accept: '.doc, .docx',
                      component: FileInput,
                      className: css.fileInput
                    }}
                  />
                  <div {...{ className: css.footer }}>
                    <div>
                      <Field
                        {...{
                          id: 'vacancyAgree',
                          type: 'checkbox',
                          name: 'vacancyAgree',
                          label: customAgreeLabel
                            ? customVacancyAgreeLabel
                            : vacancyAgreeLabel,
                          component: Checkbox,
                          color: 'white',
                          validate: [required],
                          stateless: true
                        }}
                      />
                      <span
                        {...{
                          className: css.openPopup,
                          onClick: () => {
                            openPopup('popupConsent')
                          }
                        }}
                      >
                        Согласие кандидата на обработку персональных данных
                      </span>
                    </div>
                    {reCaptchaKey &&
                      <ReCaptcha
                        {...{
                          ref: this.recaptchaRef,
                          sitekey: reCaptchaKey,
                          action: 'group_feedback',
                          verifyCallback: this.verifyCallback
                        }}
                      />
                    }
                    <Button
                      {...{
                        className: css.button,
                        type: 'submit',
                        color: 'white',
                        iconPosition: 'right',
                        title: button,
                        disabled: !valid || submitting,
                        icon: <MdKeyboardArrowRight />,
                        isMobile
                      }}
                    />
                    {error &&
                      <p {...{ className: css.error }}>{error}</p>
                    }
                  </div>
                </form>
              ) : (
                <FormSuccess
                  {...{
                    theme: 'white',
                    className: css.successForm,
                    title: successTitle,
                    paragraph: successText
                  }}
                />
              )}
            </MainAsideSection>
          )
        }}
      </RemoteDataProvider>
    )
  }
}

FormVacancy.defaultProps = {
  showHhLink: false,
  currentComeFrom: '',
  customAgreeLabel: true,
  showComeFrom: true
}

FormVacancy.propTypes = {
  showComeFrom: PropTypes.bool,
  customAgreeLabel: PropTypes.bool,
  showHhLink: PropTypes.bool,
  className: PropTypes.string,
  valid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  isMobile: PropTypes.bool,
  code: PropTypes.string,
  vacancyName: PropTypes.string,
  vacancyCity: PropTypes.string,
  currentComeFrom: PropTypes.string,
  popupsActions: PropTypes.object,
  reCaptchaKey: PropTypes.string,
  dispatch: PropTypes.func
}
