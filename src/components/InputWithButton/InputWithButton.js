import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import { Field, reduxForm } from 'redux-form/immutable'

import css from './inputWithButton.scss'

import Input from '../Input/Input'

/** Инпут-форма с кнопкой */

const InputWithButton = ({
  onSubmit,
  formName,
  button,
  className,
  inputName,
  inputType,
  inputPlaceholder,
  inputClassName,
  inputLabel
}) => {
  return (
    <form
      {...{
        name: formName,
        onSubmit: e => {
          e.preventDefault()
          onSubmit()
        },
        className: classNames(className, css.wrapper)
      }}
    >
      <Field
        {...{
          name: inputName,
          type: inputType,
          component: Input,
          placeholder: inputPlaceholder,
          label: inputLabel,
          className: classNames(css.input, inputClassName)
        }}
      />
      <span {...{ className: css.button }}>{button}</span>
    </form>
  )
}

InputWithButton.propTypes = {
  /** тип инпута */
  inputType: PropTypes.string,
  /** лейбл */
  inputLabel: PropTypes.string,
  /** дополнительный класс для InputWithButton */
  className: PropTypes.string,
  /** имя */
  inputName: PropTypes.string,
  /** placeholder */
  inputPlaceholder: PropTypes.string,
  /** функция отправки формы */
  onSubmit: PropTypes.func,
  /** дополнительный класс для Input */
  inputClassName: PropTypes.string,
  /** компонент кнопки */
  button: PropTypes.element,
  /** имя формы */
  formName: PropTypes.string
}

export default reduxForm({
  form: this.form
})(InputWithButton)
