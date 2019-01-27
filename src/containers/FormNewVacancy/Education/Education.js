import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import { required } from 'utils/Form/validate'

import css from '../formNewVacancy.scss'
import classNames from 'classnames'

import AccordeonBox from '../AccordeonBox/AccordeonBox'
import EducationNewOne from '../EducationNewOne/EducationNewOne'
import EducationNewTwo from '../EducationNewTwo/EducationNewTwo'
import Input from 'components/Input/Input'
import Selector from 'kalashnikov-framework/lib/components/Selector/Selector'

export default class Education extends PureComponent {
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
        eduLevel,
        eduLevelOptions,
        eduInstLabel,
        eduSpecLabel,
        eduYearsStartLabel,
        eduYearsStopLabel,
        eduFormLabel,
        eduFormOptions,
        name,
        dateMask
      },
      state: { counter }
    } = this
    return (
      <AccordeonBox
        {...{
          label: name,
          accordeonChildren: <div {...{ className: classNames(css.container_inputs__width) }}
          >
            <Field
              {...{
                wrapperClassName: classNames(css.selectorWrapper),
                className: css.selector,
                component: Selector,
                label: eduLevel,
                name: 'eduLevel[0]',
                placeholderText: 'Выберите',
                placeholderColor: 'black',
                required: true,
                validate: [required],
                options: eduLevelOptions,
                stateless: true,
                textTransform: 'none'
              }}
            />
            <Field
              {...{
                name: 'eduInst[0]',
                type: 'text',
                placeholder: 'Название или аббревиатура',
                className: css.input,
                component: Input,
                label: eduInstLabel,
                validate: [required]
              }}
            />
            <Field
              {...{
                name: 'eduSpec[0]',
                type: 'text',
                placeholder: 'Введите',
                className: css.input,
                component: Input,
                label: eduSpecLabel,
                validate: [required]
              }}
            />
            <Field
              {...{
                name: 'eduYearsStart[0]',
                type: 'tel',
                placeholder: 'Введите год',
                className: css.input,
                component: Input,
                label: eduYearsStartLabel,
                validate: [required],
                ...dateMask
              }}
            />
            <Field
              {...{
                name: 'eduYearsStop[0]',
                type: 'tel',
                placeholder: 'Введите год',
                className: css.input,
                component: Input,
                label: eduYearsStopLabel,
                validate: [required],
                ...dateMask
              }}
            />
            <Field
              {...{
                wrapperClassName: classNames(css.selectorWrapper),
                className: css.selector,
                component: Selector,
                label: eduFormLabel,
                name: 'eduForm[0]',
                placeholderText: 'Выберите',
                placeholderColor: 'black',
                required: true,
                validate: [required],
                options: eduFormOptions,
                stateless: true,
                textTransform: 'none'
              }}
            />
            {counter === 0
              ? ''
              : <div {...{ className: css.line }}>
                <EducationNewOne {...{
                  eduInstLabel,
                  eduSpecLabel,
                  eduYearsStartLabel,
                  eduYearsStopLabel,
                  eduFormLabel,
                  eduFormOptions,
                  counter: 1,
                  eduLevel,
                  eduLevelOptions,
                  dateMask: dateMask
                }} />
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
              <EducationNewTwo {...{
                eduInstLabel,
                eduSpecLabel,
                eduYearsStartLabel,
                eduYearsStopLabel,
                eduFormLabel,
                eduFormOptions,
                counter: 2,
                eduLevel,
                eduLevelOptions,
                dateMask: dateMask
              }} />
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

Education.defaultProps = {
  counter: 1
}

Education.propTypes = {
  eduLevel: PropTypes.string,
  eduSpecLabel: PropTypes.string,
  eduFormLabel: PropTypes.string,
  eduYearsStartLabel: PropTypes.string,
  eduYearsStopLabel: PropTypes.string,
  eduInstLabel: PropTypes.string,
  eduLevelOptions: PropTypes.array,
  eduFormOptions: PropTypes.array,
  name: PropTypes.string,
  dateMask: PropTypes.object
}
