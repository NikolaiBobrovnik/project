import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import { required } from 'utils/Form/validate'

import css from '../formNewVacancy.scss'

import AccordeonBox from '../AccordeonBox/AccordeonBox'
import Input from 'components/Input/Input'

export default class Passport extends PureComponent {
  render () {
    const {
      props: {
        passportSeriesLabel,
        passportNoLabel,
        passportDLabel,
        passportDivisionCodeLabel,
        name
      }
    } = this
    return (
      <AccordeonBox
        {...{
          label: name,
          accordeonChildren: <div>
            <div {...{ className: css.inputs_group }}>
              <Field
                {...{
                  name: 'passportSeries',
                  type: 'text',
                  component: Input,
                  label: passportSeriesLabel,
                  placeholder: passportSeriesLabel,
                  className: css.input,
                  validate: [required]
                }}
              />
              <Field
                {...{
                  name: 'passportNo',
                  type: 'text',
                  component: Input,
                  label: passportNoLabel,
                  placeholder: passportNoLabel,
                  className: css.input,
                  validate: [required]
                }}
              />
            </div>
            <div {...{ className: css.inputs_group }}>
              <Field
                {...{
                  name: 'passportD',
                  type: 'date',
                  component: Input,
                  label: passportDLabel,
                  className: css.input_day,
                  validate: [required]
                }}
              />
              <Field
                {...{
                  name: 'passportDivisionCode',
                  type: 'text',
                  component: Input,
                  label: passportDivisionCodeLabel,
                  placeholder: passportDivisionCodeLabel,
                  validate: [required]
                }}
              />
            </div>
          </div>
        }}
      />
    )
  }
}

Passport.propTypes = {
  passportSeriesLabel: PropTypes.string,
  passportNoLabel: PropTypes.string,
  passportDLabel: PropTypes.string,
  passportDivisionCodeLabel: PropTypes.string,
  name: PropTypes.string
}
