import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'

import css from '../formNewVacancy.scss'
import classNames from 'classnames'

import Input from 'components/Input/Input'
import Selector from 'kalashnikov-framework/lib/components/Selector/Selector'

export default class EducationNewOne extends PureComponent {
  render () {
    const {
      props: {
        eduInstLabel,
        eduSpecLabel,
        eduYearsStartLabel,
        eduYearsStopLabel,
        eduFormLabel,
        eduFormOptions,
        counter,
        eduLevel,
        eduLevelOptions,
        dateMask
      }
    } = this
    return (
      <div {...{ className: classNames(css.container_inputs__width) }}>
        <Field
          {...{
            wrapperClassName: classNames(css.selectorWrapper),
            className: css.selector,
            component: Selector,
            label: eduLevel,
            name: `eduLevel[${counter}]`,
            placeholderText: 'Выберите',
            placeholderColor: 'black',
            options: eduLevelOptions,
            stateless: true,
            textTransform: 'none',
            validate: false,
            required: false
          }}
        />
        <Field
          {...{
            name: `eduInst[${counter}]`,
            type: 'text',
            placeholder: 'Название или аббревиатура',
            className: css.input,
            component: Input,
            label: eduInstLabel,
            validate: false
          }}
        />
        <Field
          {...{
            name: `eduSpec[${counter}]`,
            type: 'text',
            placeholder: 'Введите',
            className: css.input,
            component: Input,
            label: eduSpecLabel,
            validate: false
          }}
        />
        <Field
          {...{
            name: `eduYearsStart[${counter}]`,
            type: 'tel',
            placeholder: 'Введите год',
            className: css.input,
            component: Input,
            label: eduYearsStartLabel,
            validate: false,
            ...dateMask
          }}
        />
        <Field
          {...{
            name: `eduYearsStop[${counter}]`,
            type: 'tel',
            placeholder: 'Введите год',
            className: css.input,
            component: Input,
            label: eduYearsStopLabel,
            validate: false,
            ...dateMask
          }}
        />
        <Field
          {...{
            wrapperClassName: classNames(css.selectorWrapper),
            className: css.selector,
            component: Selector,
            label: eduFormLabel,
            name: `eduForm[${counter}]`,
            placeholderText: 'Выберите',
            placeholderColor: 'black',
            options: eduFormOptions,
            stateless: true,
            textTransform: 'none',
            validate: false,
            required: false
          }}
        />
      </div>
    )
  }
}

EducationNewOne.defaultProps = {
  counter: 1
}

EducationNewOne.propTypes = {
  eduLevel: PropTypes.string,
  eduSpecLabel: PropTypes.string,
  eduFormLabel: PropTypes.string,
  eduYearsStartLabel: PropTypes.string,
  eduYearsStopLabel: PropTypes.string,
  eduInstLabel: PropTypes.string,
  eduLevelOptions: PropTypes.array,
  eduFormOptions: PropTypes.array,
  name: PropTypes.string,
  counter: PropTypes.number,
  dateMask: PropTypes.object
}
