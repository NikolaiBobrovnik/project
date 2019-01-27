import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _findIndex from 'lodash/findIndex'
import Selector from 'kalashnikov-framework/lib/components/Selector'
import css from './select.scss'

export default class SelectCheckbox extends Component {
  render () {
    const { fields, className, options, ...rest } = this.props
    const checked = fields.length ? fields.getAll().toJS() : []
    const props = {
      ...rest,
      options: options.map(label => ({ label, value: label })),
      className: classNames(className, css.select),
      onChangeCheckbox: this.onChangeCheckbox,
      checkbox: false,
      checked
    }
    return (
      <Selector {...props} />
    )
  }

  onChange = ({ value }) => {
    this.props.input.onChange(value)
  }

  onChangeCheckbox = (label) => {
    const { fields: iFields } = this.props
    const fields = iFields.length ? iFields.getAll().toJS() : []
    const index = _findIndex(fields, label)
    if (index >= 0) {
      iFields.remove(index)
    } else {
      iFields.push(label)
    }
  }

  static propTypes = {
    options: PropTypes.array,
    fields: PropTypes.object,
    className: PropTypes.any,
    input: PropTypes.object
  }
}
