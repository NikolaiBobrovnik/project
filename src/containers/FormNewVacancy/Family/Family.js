import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import { required } from 'utils/Form/validate'

import css from '../formNewVacancy.scss'
import classNames from 'classnames'

import Input from 'components/Input/Input'
import AccordeonBox from '../AccordeonBox/AccordeonBox'
import Selector from 'kalashnikov-framework/lib/components/Selector/Selector'

export default class Family extends PureComponent {
  render () {
    const {
      props: {
        name,
        familyStatusLabel,
        familyStatusOptions,
        familyKidsLabel,
        familyKidsAgeLabel
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
                  wrapperClassName: classNames(css.selectorWrapper),
                  className: css.selector,
                  component: Selector,
                  label: familyStatusLabel,
                  name: 'familyStatus',
                  placeholderText: 'Не указано',
                  placeholderColor: 'black',
                  required: true,
                  validate: [required],
                  options: familyStatusOptions,
                  stateless: true,
                  textTransform: 'none'
                }}
              />
              <Field
                {...{
                  name: 'familyKids',
                  type: 'text',
                  placeholder: 'Не указано',
                  className: css.input,
                  component: Input,
                  label: familyKidsLabel,
                  required: false
                  // validate: [required]
                }}
              />
            </div>
            <div {...{ className: css.inputs_group }}>
              <Field
                {...{
                  name: 'familyKidsAge',
                  type: 'text',
                  placeholder: 'Не указано',
                  className: css.input,
                  component: Input,
                  label: familyKidsAgeLabel,
                  required: false
                  // validate: [required]
                }}
              />
            </div>
          </div>
        }}
      />
    )
  }
}

Family.propTypes = {
  name: PropTypes.string,
  familyStatusLabel: PropTypes.string,
  familyKidsLabel: PropTypes.string,
  familyKidsAgeLabel: PropTypes.string,
  familyStatusOptions: PropTypes.array,
  familyKidsOptions: PropTypes.array
}
