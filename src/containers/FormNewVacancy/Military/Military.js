import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import { required } from 'utils/Form/validate'

import css from '../formNewVacancy.scss'
import classNames from 'classnames'

import AccordeonBox from '../AccordeonBox/AccordeonBox'
import Selector from 'kalashnikov-framework/lib/components/Selector/Selector'

export default class Military extends PureComponent {
  render () {
    const {
      props: {
        name,
        militaryStateLabel,
        militaryStateOptions,
        militaryDutyLabel
      }
    } = this
    return (
      <AccordeonBox
        {...{
          label: name,
          accordeonChildren: <div>
            <div className={css.input_title_tall}>{militaryDutyLabel}</div>
            <div className={css.radio_group}>
              <label>
                <Field
                  {...{
                    component: 'input',
                    type: 'radio',
                    name: 'militaryDuty',
                    value: 'да',
                    validate: [required],
                    className: css.radio
                  }}
                />{' '}
                <div {...{ className: css.radio__text }}>Да</div>
              </label>
              <label>
                <Field
                  {...{
                    // checked: true,
                    component: 'input',
                    type: 'radio',
                    name: 'militaryDuty',
                    value: 'нет',
                    validate: [required],
                    className: css.radio
                  }}
                />{' '}
                <div {...{ className: css.radio__text }}>Нет</div>
              </label>
            </div>
            <div {...{ className: classNames(css.inputs_group, css.inputs_group__width) }}>
              <Field
                {...{
                  wrapperClassName: classNames(css.selectorWrapper),
                  className: css.selector,
                  component: Selector,
                  label: militaryStateLabel,
                  name: 'militaryState',
                  placeholderText: 'Не указано',
                  placeholderColor: 'black',
                  required: true,
                  validate: [required],
                  options: militaryStateOptions,
                  stateless: true,
                  textTransform: 'none'
                }}
              />
            </div>
          </div>
        }}
      />
    )
  }
}

Military.propTypes = {
  name: PropTypes.string,
  militaryStateLabel: PropTypes.string,
  militaryDutyLabel: PropTypes.string,
  militaryStateOptions: PropTypes.array
}
