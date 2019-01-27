import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import forEach from 'lodash/forEach'
import toJS from 'HOC/toJS'
import qs from 'qs'
import classNames from 'classnames'
import _get from 'lodash/get'
import actions from 'redux-form/lib/actions'
import { RemoteDataProvider, getLocalState } from 'remote-data-provider'
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable'
import { required, minLength } from 'utils/Form/validate'
import { createTextMask } from 'redux-form-input-masks'
import { axiosAPI } from 'Services/axiosInstances'
import { ReCaptcha } from 'react-recaptcha-v3'
import { KEY_RECAPTCHA } from 'constants/RDP_KEYS'

import css from './formNewVacancy.scss'

import MainAsideSection from 'kalashnikov-framework/lib/components/MainAsideSection'
import EmailBlock from 'kalashnikov-framework/lib/components/EmailBlock'
import Input from 'components/Input/Input'
import Checkbox from 'kalashnikov-framework/lib/components/Checkbox/Checkbox'
import Button from 'kalashnikov-framework/lib/components/Button'
import FileInput from 'components/FileInput/FileInput'
import FormSuccess from 'kalashnikov-framework/lib/components/FormSuccess/FormSuccess'

import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'
import Selector from 'kalashnikov-framework/lib/components/Selector/Selector'
import Salary from './Salary/Salary'
import Education from './Education/Education'
import Family from './Family/Family'
import Experience from './Experience/Experience'
import Military from './Military/Military'
import Health from './Health/Health'
import { connect } from 'react-redux'
import Passport from './Passport/Passport'
import { bindActionCreators } from 'redux'
import * as PopupsActions from 'containers/Popups/_service/PopupsActions'

const minLength10 = minLength(10)

const selector = formValueSelector('FormNewVacancy') // <-- same as form name

function mapStateToProps (state) {
  return {
    currentComeFrom: selector(state, 'comeFrom'),
    popupsState: state.get('popups'),
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
export default class FormNewVacancy extends PureComponent {
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
      props: {
        isMobile,
        className,
        valid,
        handleSubmit,
        submitting,
        code,
        vacancyName,
        vacancyCity,
        currentComeFrom,
        popupsActions: { openPopup },
        reCaptchaKey
      },
      state: { success, successTitle, successText, error }
    } = this

    const showOther = currentComeFrom === 'Другое (указать)'

    const phoneMask = createTextMask({
      pattern: '+7(999) 999-99-99'
    })

    const dateMask = createTextMask({
      pattern: '9999',
      placeholder: '_',
      guide: false,
      stripMask: false,
      allowEmpty: true
    })

    return (
      <RemoteDataProvider
        {...{
          request: {
            url: '/form/career_feedback_v2.php'
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
              citizenship: citizenshipOptions,
              eduLevel: eduLevelOptions,
              eduForm: eduFormOptions,
              // passportDM: passportDMOptions,
              familyStatus: familyStatusOptions,
              familyKids: familyKidsOptions,
              militaryState: militaryStateOptions,
              gender: genderOptions,
              form: {
                legend,
                button,
                inputs: {
                  label1,
                  label2,
                  label3,
                  label4,
                  label5,
                  label6,
                  label7,
                  label8,
                  nameF: nameFLabel,
                  nameI: nameILabel,
                  nameO: nameOLabel,
                  gender: genderLabel,
                  // hhLink: hhLinkLabel,
                  phone: phoneLabel,
                  file,
                  bornDate: bornDateLabel,
                  citizenship: citizenshipLabel,
                  vacancyAgree: vacancyAgreeLabel,
                  comeFrom: comeFromLabel,
                  desiredSalary: desiredSalaryLabel,
                  currentSalary: currentSalaryLabel,
                  eduLevel,
                  eduInst: eduInstLabel,
                  eduSpec: eduSpecLabel,
                  eduYearsStart: eduYearsStartLabel,
                  eduYearsStop: eduYearsStopLabel,
                  eduForm: eduFormLabel,
                  actualAddress: actualAddressLabel,
                  passportCode: passportCodeLabel,
                  passportSeries: passportSeriesLabel,
                  passportNo: passportNoLabel,
                  passportD: passportDLabel,
                  passportDivisionCode: passportDivisionCodeLabel,
                  familyStatus: familyStatusLabel,
                  familyKids: familyKidsLabel,
                  familyKidsAge: familyKidsAgeLabel,
                  ExperienceOrg: ExperienceOrgLabel,
                  ExperiencePosition: ExperiencePositionLabel,
                  ExperienceStart: ExperienceStartLabel,
                  ExperienceNow: ExperienceNowLabel,
                  ExperienceStop: ExperienceStopLabel,
                  militaryDuty: militaryDutyLabel,
                  militaryState: militaryStateLabel,
                  healthGrowth: healthGrowthLabel,
                  healthVision: healthVisionLabel,
                  healthHearing: healthHearingLabel,
                  healthContraindications: healthContraindicationsLabel,
                  healthDisability: healthDisabilityLabel,
                  healthGroup: healthGroupLabel,
                  healthCriminal: healthCriminalLabel,
                  healthCriminalArticle: healthCriminalArticleLabel,
                  healthCriminalAdministrativeResponsibility: healthCriminalAdministrativeResponsibilityLabel,
                  healthCriminalComment: healthCriminalCommentLabel
                }
              }
            }
          }
        }) => {
          const submit = values => {
            let content = values.toJS()
            content.send = 'Y'

            let formData = []
            formData.city = vacancyCity
            formData.vac_code = code
            formData.vacancy = vacancyName
            forEach(content, function (field, key) {
              formData[key] = field
            })

            this.recaptchaRef.current.execute()
            axiosAPI
              .post('/form/career_feedback_v2.php', qs.stringify(formData))
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
                        validate: [required]
                      }}
                    />
                    <Field
                      {...{
                        name: 'nameI',
                        type: 'text',
                        component: Input,
                        label: nameILabel,
                        validate: [required]
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
                        validate: [required]
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
                        className: css.input_day,
                        validate: [required]
                      }}
                    />
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
                  </div>
                  <Field
                    {...{
                      wrapperClassName: classNames(css.selectorWrapper),
                      className: css.selector,
                      component: Selector,
                      label: citizenshipLabel,
                      name: 'citizenship',
                      placeholderText: 'Выберите',
                      placeholderColor: 'black',
                      required: true,
                      validate: [required],
                      options: citizenshipOptions,
                      stateless: true,
                      textTransform: 'none'
                    }}
                  />
                  <Field
                    {...{
                      name: 'actualAddress',
                      type: 'text',
                      placeholder: actualAddressLabel,
                      component: Input,
                      label: actualAddressLabel,
                      validate: [required]
                    }}
                  />
                  {/* <Field
                    {...{
                      name: 'hhLink',
                      type: 'text',
                      placeholder: hhLinkLabel,
                      component: Input,
                      label: hhLinkLabel
                      // validate: [required]
                    }}
                  /> */}
                  <div {...{ className: css.inputs_group }}>
                    <Field
                      {...{
                        wrapperClassName: classNames(css.selectorWrapper, {
                          [css.input]: showOther
                        }),
                        className: css.selector,
                        component: Selector,
                        label: comeFromLabel,
                        name: 'comeFrom',
                        placeholderText: 'Выберите',
                        placeholderColor: 'black',
                        required: true,
                        validate: [required],
                        options: comeFromOptions,
                        stateless: true,
                        textTransform: 'none'
                      }}
                    />
                    {showOther && (
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
                    )}
                  </div>
                  <Salary
                    {...{
                      name: label1,
                      label: desiredSalaryLabel,
                      label1: currentSalaryLabel
                    }}
                  />
                  <Education
                    {...{
                      name: label2,
                      eduLevel: eduLevel,
                      eduLevelOptions: eduLevelOptions,
                      eduInstLabel: eduInstLabel,
                      eduSpecLabel: eduSpecLabel,
                      eduYearsStartLabel: eduYearsStartLabel,
                      eduYearsStopLabel: eduYearsStopLabel,
                      eduFormLabel: eduFormLabel,
                      eduFormOptions: eduFormOptions,
                      dateMask: dateMask
                    }}
                  />
                  <Passport
                    {...{
                      name: label4,
                      passportDLabel: passportDLabel,
                      passportNoLabel: passportNoLabel,
                      passportSeriesLabel: passportSeriesLabel,
                      passportDivisionCodeLabel: passportDivisionCodeLabel
                    }}
                  />
                  <Family
                    {...{
                      name: label5,
                      familyStatusLabel: familyStatusLabel,
                      familyStatusOptions: familyStatusOptions,
                      familyKidsLabel: familyKidsLabel,
                      familyKidsAgeLabel: familyKidsAgeLabel,
                      familyKidsOptions: familyKidsOptions
                    }}
                  />
                  <Experience
                    {...{
                      name: label6,
                      ExperienceOrgLabel: ExperienceOrgLabel,
                      ExperiencePositionLabel: ExperiencePositionLabel,
                      ExperienceStartLabel: ExperienceStartLabel,
                      ExperienceNowLabel: ExperienceNowLabel,
                      ExperienceStopLabel: ExperienceStopLabel
                    }}
                  />
                  <Military
                    {...{
                      name: label7,
                      militaryStateLabel: militaryStateLabel,
                      militaryStateOptions: militaryStateOptions,
                      militaryDutyLabel: militaryDutyLabel
                    }}
                  />
                  <Health
                    {...{
                      name: label8,
                      healthGrowthLabel,
                      healthVisionLabel,
                      healthHearingLabel,
                      healthContraindicationsLabel,
                      healthDisabilityLabel,
                      healthGroupLabel,
                      healthCriminalLabel,
                      healthCriminalArticleLabel,
                      healthCriminalAdministrativeResponsibilityLabel,
                      healthCriminalCommentLabel
                    }}
                  />
                  <Field
                    {...{
                      type: 'file',
                      name: 'file',
                      id: 'vacancyFileTwo',
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
                          label: vacancyAgreeLabel,
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
                          action: 'group_feedback_v2',
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

FormNewVacancy.defaultProps = {
  currentComeFrom: ''
}

FormNewVacancy.propTypes = {
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
  dispatch: PropTypes.func,
  reCaptchaKey: PropTypes.string
}
