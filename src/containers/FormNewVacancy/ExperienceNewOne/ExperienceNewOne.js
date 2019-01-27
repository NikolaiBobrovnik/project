import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'

import css from '../formNewVacancy.scss'

import Input from 'components/Input/Input'

export default class ExperienceNewOne extends PureComponent {
  render () {
    const {
      props: {
        ExperienceOrgLabel,
        ExperiencePositionLabel,
        ExperienceStartLabel,
        ExperienceStopLabel,
        counter
      }
    } = this
    return (
      <div>
        <div {...{ className: css.inputs_group }}>
          <Field
            {...{
              name: `ExperienceOrg[${counter}]`,
              type: 'text',
              component: Input,
              label: ExperienceOrgLabel,
              placeholder: ExperienceOrgLabel,
              validate: false
            }}
          />
          <Field
            {...{
              name: `ExperiencePosition[${counter}]`,
              type: 'text',
              component: Input,
              label: ExperiencePositionLabel,
              placeholder: ExperiencePositionLabel,
              validate: false
            }}
          />
        </div>
        <div {...{ className: css.inputs_group }}>
          <Field
            {...{
              name: `ExperienceStart[${counter}]`,
              type: 'month',
              component: Input,
              label: ExperienceStartLabel,
              className: css.input_year,
              validate: false
            }}
          />
          <Field
            {...{
              name: `ExperienceStop[${counter}]`,
              type: 'month',
              component: Input,
              label: ExperienceStopLabel,
              className: css.input_year,
              validate: false
            }}
          />
        </div>
      </div>
    )
  }
}

ExperienceNewOne.defaultProps = {
  counter: 1
}

ExperienceNewOne.propTypes = {
  ExperienceStopLabel: PropTypes.string,
  ExperienceOrgLabel: PropTypes.string,
  ExperiencePositionLabel: PropTypes.string,
  ExperienceStartLabel: PropTypes.string,
  counter: PropTypes.number
}
