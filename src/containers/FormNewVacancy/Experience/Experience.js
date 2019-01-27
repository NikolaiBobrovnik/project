import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import { required } from 'utils/Form/validate'

import css from '../formNewVacancy.scss'
import classNames from 'classnames'

import ExperienceNewOne from '../ExperienceNewOne/ExperienceNewOne'
import ExperienceNewTwo from '../ExperienceNewTwo/ExperienceNewTwo'
import Input from 'components/Input/Input'
import AccordeonBox from '../AccordeonBox/AccordeonBox'
import Checkbox from 'kalashnikov-framework/lib/components/Checkbox/Checkbox'

export default class Experience extends PureComponent {
  state = {
    counter: 0
  }

  onChange = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  onChangeNull = () => {
    this.setState({
      counter: this.state.counter - 1
    })
  }
  render () {
    const {
      props: {
        name,
        ExperienceOrgLabel,
        ExperiencePositionLabel,
        ExperienceStartLabel,
        ExperienceNowLabel,
        ExperienceStopLabel
      },
      state: { counter }
    } = this
    return (
      <AccordeonBox
        {...{
          label: name,
          accordeonChildren: <div>
            <div {...{ className: css.inputs_group }}>
              <Field
                {...{
                  name: 'ExperienceOrg[0]',
                  type: 'text',
                  component: Input,
                  label: ExperienceOrgLabel,
                  placeholder: ExperienceOrgLabel,
                  validate: [required]
                }}
              />
              <Field
                {...{
                  name: 'ExperiencePosition[0]',
                  type: 'text',
                  component: Input,
                  label: ExperiencePositionLabel,
                  placeholder: ExperiencePositionLabel,
                  validate: [required]
                }}
              />
            </div>
            <div {...{ className: classNames(css.inputs_group, css.inputs_group__width) }}>
              <Field
                {...{
                  name: 'ExperienceStart[0]',
                  type: 'month',
                  component: Input,
                  label: ExperienceStartLabel,
                  className: css.input_year,
                  validate: [required],
                  placeholder: 'месяц год'
                }}
              />
              <Field
                {...{
                  id: 'ExperienceNow',
                  type: 'checkbox',
                  name: 'ExperienceNow',
                  label: ExperienceNowLabel,
                  component: Checkbox,
                  color: 'white',
                  required: false,
                  stateless: true,
                  className: css.checkbox
                }}
              />
            </div>
            <div {...{ className: css.inputs_group }}>
              <Field
                {...{
                  name: 'ExperienceStop[0]',
                  type: 'month',
                  component: Input,
                  label: ExperienceStopLabel,
                  className: css.input_year,
                  placeholder: 'месяц год'
                  // validate: [required]
                }}
              />
            </div>
            {counter === 0
              ? ''
              : <div {...{ className: css.line }}>
                <ExperienceNewOne {...{
                  ExperienceOrgLabel,
                  ExperiencePositionLabel,
                  ExperienceStartLabel,
                  ExperienceStopLabel,
                  counter: 1
                }}
                />
                <button
                  {...{
                    onClick: ::this.onChangeNull,
                    type: 'button',
                    className: css.buttonNext
                  }}
                >Скрыть</button>
              </div>
            }
            {counter === 2 &&
            <div {...{ className: css.line_top }}>
              <ExperienceNewTwo {...{
                ExperienceOrgLabel,
                ExperiencePositionLabel,
                ExperienceStartLabel,
                ExperienceStopLabel,
                counter: 2
              }}
              />
              <button
                {...{
                  onClick: ::this.onChangeNull,
                  type: 'button',
                  className: css.buttonNext
                }}
              >Скрыть</button>
            </div>
            }
            {counter === 2
              ? ''
              : <button
                {...{
                  onClick: ::this.onChange,
                  type: 'button',
                  className: css.buttonNext
                }}
              >Добавить еще +</button>
            }
          </div>
        }}
      />
    )
  }
}

Experience.defaultProps = {
  counter: 1
}

Experience.propTypes = {
  name: PropTypes.string,
  ExperienceStopLabel: PropTypes.string,
  ExperienceNowLabel: PropTypes.string,
  ExperienceOrgLabel: PropTypes.string,
  ExperiencePositionLabel: PropTypes.string,
  ExperienceStartLabel: PropTypes.string,
  yearMask: PropTypes.object
}
