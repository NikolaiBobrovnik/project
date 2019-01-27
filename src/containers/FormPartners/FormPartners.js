import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import _includes from 'lodash/includes'
import classNames from 'classnames'
import _get from 'lodash/get'
import actions from 'redux-form/lib/actions'
import { Field, FieldArray, reduxForm } from 'redux-form/immutable'
import { emailValidation, required, minLength } from 'utils/Form/validate'
import { createTextMask } from 'redux-form-input-masks'
import { withViewContext } from 'HOC/ViewContext/ViewContext'
import { axiosAPI } from 'Services/axiosInstances'
import { ReCaptcha } from 'react-recaptcha-v3'
import { KEY_RECAPTCHA } from 'constants/RDP_KEYS'
import { getLocalState } from 'remote-data-provider'
import { connect } from 'react-redux'

import css from './formPartners.scss'

import Input from 'kalashnikov-framework/lib/components/InputNew'
import SelectCheckbox from 'components/SelectCheckbox/SelectCheckbox'
import Checkbox from 'kalashnikov-framework/lib/components/Checkbox/Checkbox'
import Button from 'kalashnikov-framework/lib/components/ButtonNew'
import FormSuccess from 'kalashnikov-framework/lib/components/FormSuccess/FormSuccess'
import RadioButton from 'kalashnikov-framework/lib/components/RadioButton'

import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

const minLength10 = minLength(10)

const checkboxArrayComponent = ({ fields, options }) => {
  const fieldsArray = fields.length ? fields.getAll().toJS() : []

  return _map(options, (label, key) => {
    const checked = _includes(fieldsArray, label)

    const onChange = () => {
      if (checked) {
        const index = fieldsArray.indexOf(label)
        fields.remove(index)
      } else {
        fields.push(label)
      }
    }

    return (
      <Checkbox
        {...{
          key,
          name: label,
          color: 'black',
          required: false,
          className: css.type_checkbox,
          input: {
            checked,
            onChange
          },
          stateless: true,
          label
        }}
      />
    )
  })
}

function mapStateToProps (state) {
  return {
    reCaptchaKey: _get(getLocalState(state, KEY_RECAPTCHA), 'response.key')
  }
}

const formName = 'formPartners'

@withViewContext
@connect(mapStateToProps)
class FormPartners extends PureComponent {
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
        data,
        reCaptchaKey
      },
      state: {
        success, successTitle, successText, error
      }
    } = this

    const phoneMask = createTextMask({
      pattern: '+7(999) 999-99-99'
    })

    const {
      statement: {
        formTitle,
        shopDataTitle,
        submitButton
      },
      formLabels,
      formLabels: {
        name,
        surname,
        middlename,
        phone,
        email,
        shopPhone,
        shopSite,
        shopWeaponBrands,
        shopProductTypes,
        workshopRepairWeapon,
        subscribeAgree
      },
      formData: {
        shopWeaponBrands: shopWeaponBrandsData,
        shopProductTypes: shopProductTypesData
      }
    } = data

    const defaultInput = (name, requiredField = true) => {
      return (
        <Field
          {...{
            name: name,
            type: 'text',
            component: Input,
            label: formLabels[name],
            required: requiredField,
            validate: requiredField ? [required] : undefined
          }}
        />
      )
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
    }
    return (
      <form
        {...{
          className: classNames(
            className,
            css.form,
            isMobile ? css.mobile : css.desktop
          ),
          onSubmit: handleSubmit(this.submit)
        }}
      >
        <legend {...{ className: css.legend }}>{formTitle}</legend>
        {/* {defaultInput('fullName')} */}
        <div {...{ className: css.inputs_group }}>
          <Field
            {...{
              name: 'name',
              type: 'text',
              component: Input,
              label: name,
              required: true,
              validate: [required],
              className: css.input
            }}
          />
          <Field
            {...{
              name: 'surname',
              type: 'text',
              component: Input,
              label: surname,
              required: true,
              validate: [required],
              className: css.input
            }}
          />
        </div>
        <Field
          {...{
            name: 'middlename',
            type: 'text',
            component: Input,
            label: middlename,
            required: true,
            validate: [required]
          }}
        />
        <div {...{ className: css.inputs_group }}>
          <Field
            {...{
              name: 'phone',
              type: 'text',
              component: Input,
              label: phone,
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
              label: email,
              validate: [required, emailValidation],
              className: css.input
            }}
          />
        </div>
        <div className={css.sub_title}>{shopDataTitle}</div>
        {defaultInput('shopCity')}
        {defaultInput('shopAddress')}
        {defaultInput('shopOpeningData')}
        {defaultInput('shopLegalName')}
        {defaultInput('shopName')}
        <div {...{ className: css.inputs_group }}>
          <Field
            {...{
              name: 'shopPhone',
              type: 'text',
              component: Input,
              label: shopPhone,
              className: css.input,
              required: true,
              validate: [required, minLength10],
              ...phoneMask
            }}
          />
          <Field
            {...{
              name: 'shopSite',
              type: 'text',
              required: false,
              component: Input,
              label: shopSite,
              className: css.input
            }}
          />
        </div>
        {defaultInput('shopRealizationVolume', false)}
        <div className={css.input_title}>{shopWeaponBrands}</div>
        <FieldArray
          {...{
            name: 'shopWeaponBrands',
            placeholderText: 'Выбрать бренды',
            options: shopWeaponBrandsData,
            required: false,
            component: SelectCheckbox,
            className: css.select,
            textTransform: 'none',
            checkbox: true
          }}
        />
        <div className={css.input_title_tall}>{shopProductTypes}</div>
        <FieldArray {...{
          name: 'shopProductTypes',
          options: shopProductTypesData,
          component: checkboxArrayComponent
        }} />
        <div className={css.input_title_tall}>{workshopRepairWeapon}</div>
        <div className={css.radio_group}>
          <Field
            {...{
              component: RadioButton,
              name: 'workshopRepairWeapon',
              type: 'radio',
              value: 'yes',
              label: 'Да'
            }}
          />
          <Field
            {...{
              component: RadioButton,
              name: 'workshopRepairWeapon',
              type: 'radio',
              value: 'no',
              label: 'Нет'
            }}
          />
        </div>
        <Field
          {...{
            id: 'subscribeAgreePartners',
            type: 'checkbox',
            name: 'subscribeAgree',
            label: subscribeAgree,
            component: Checkbox,
            color: 'black',
            required: true,
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
            action: 'group_partners',
            verifyCallback: this.verifyCallback
          }}
        />
        }
        <Button
          {...{
            className: css.button,
            type: 'submit',
            title: submitButton,
            backgroundColor: !valid || submitting ? 'gray' : 'accent',
            disabled: !valid || submitting,
            icon: <MdKeyboardArrowRight />,
            isMobile
          }}
        />
        {error &&
          <p {...{ className: css.error }}>{error}</p>
        }
      </form>
    )
  }

  submit = values => {
    let content = values.toJS()

    let formData = new FormData()
    _map(content, (field, key) => {
      const label = this.props.data.formLabels[key]
      formData.append(label, field)
    })

    this.recaptchaRef.current.execute()
    axiosAPI
      .post('/form/partners.php', formData)
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
      .catch(console.error)
  }
}

FormPartners.defaultProps = {
  data: {}
}

FormPartners.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
  valid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  isMobile: PropTypes.bool,
  dispatch: PropTypes.func,
  reCaptchaKey: PropTypes.string
}

export default reduxForm({
  form: formName
})(FormPartners)
