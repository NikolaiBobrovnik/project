import React, { Fragment } from 'react'
import css from './input.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import MdError from 'react-icons/lib/md/error'

const Input = ({
  type,
  label,
  className,
  name,
  required,
  placeholder,
  color,
  input,
  meta: {
    touched,
    error
  }
}) => {
  return (
    <div
      {...{
        className: classNames(className, css.wrapper, {
          [css.white]: color === 'white',
          [css.black]: color === 'black'
        })
      }}
    >
      {label && (
        <label {...{ htmlFor: name, className: css.label }}>{label}</label>
      )}
      <span {...{ className: css.inputWrap }}>
        <input
          {...{
            className: css.input,
            type,
            required,
            placeholder,
            ...input
          }}
        />
        {touched && error && (
          <Fragment>
            <MdError {...{ className: css.error_icon }} />
            <span {...{ className: css.error }}>{error}</span>
          </Fragment>
        )}
      </span>
    </div>
  )
}

Input.propTypes = {
  /** тип инпута */
  type: PropTypes.string,
  /** лейбл */
  label: PropTypes.string,
  /** дополнительный класс */
  className: PropTypes.string,
  /** имя */
  name: PropTypes.string,
  /** required инпута */
  required: PropTypes.bool,
  /** placeholder */
  placeholder: PropTypes.string,
  /** тема */
  color: PropTypes.oneOf(['white', 'black']),
  /** функция изменеия инпута */
  onChange: PropTypes.func,
  /** маска для инпута */
  input: PropTypes.object,
  meta: PropTypes.object
}

Input.defaultProps = {
  type: 'text',
  required: true,
  color: 'black'
}

export default Input
