import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import { required } from 'utils/Form/validate'

import css from '../formNewVacancy.scss'
import classNames from 'classnames'

import AccordeonBox from '../AccordeonBox/AccordeonBox'
import Input from 'components/Input/Input'

export default class Salary extends PureComponent {
  render () {
    const {
      props: {
        label,
        label1,
        name
      }
    } = this
    return (
      <AccordeonBox
        {...{
          label: name,
          accordeonChildren: <div
            {...{
              className: classNames(css.inputs_group)
            }}
          >
            <Field
              {...{
                name: 'desiredSalary',
                type: 'text',
                placeholder: '2000Р',
                component: Input,
                label: label1,
                validate: [required]
              }}
            />
            <Field
              {...{
                name: 'currentSalary',
                type: 'text',
                placeholder: '2000Р',
                component: Input,
                label: label,
                validate: [required]
              }}
            />
          </div>
        }}
      />
    )
  }
}

Salary.propTypes = {
  label: PropTypes.string,
  label1: PropTypes.string,
  name: PropTypes.string
}
