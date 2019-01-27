import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import { required } from 'utils/Form/validate'
import TextArea from 'components/TextArea/TextArea'

import css from '../formNewVacancy.scss'

import Input from 'components/Input/Input'
import AccordeonBox from '../AccordeonBox/AccordeonBox'

export default class Health extends PureComponent {
  state = {
    valueAdministrative: '',
    valueDisability: '',
    valueCriminal: ''
  }
  onChangeAdministrative = (e) => {
    this.setState({ valueAdministrative: e.currentTarget.value }, () => {
      console.log(this.state.valueAdministrative)
    })
  }

  onChangeDisability = (e) => {
    this.setState({ valueDisability: e.currentTarget.value }, () => {
      console.log(this.state.valueDisability)
    })
  }

  onChangeCriminal = (e) => {
    this.setState({ valueCriminal: e.currentTarget.value }, () => {
      console.log(this.state.valueCriminal)
    })
  }

  render () {
    const {
      props: {
        name,
        // healthGrowthLabel,
        // healthVisionLabel,
        // healthHearingLabel,
        healthContraindicationsLabel,
        healthDisabilityLabel,
        healthGroupLabel,
        healthCriminalLabel,
        healthCriminalArticleLabel,
        healthCriminalAdministrativeResponsibilityLabel,
        healthCriminalCommentLabel
      }
    } = this
    return (
      <AccordeonBox
        {...{
          label: name,
          accordeonChildren: <div>
            {/* <Field
              {...{
                name: 'healthGrowth',
                type: 'text',
                placeholder: 'Укажите рост',
                className: css.input,
                component: Input,
                label: healthGrowthLabel
              }}
            />
            <Field
              {...{
                name: 'healthVision',
                type: 'text',
                placeholder: 'Зрение',
                className: css.input,
                component: Input,
                label: healthVisionLabel
              }}
            />
            <Field
              {...{
                name: 'healthHearing',
                type: 'text',
                placeholder: 'Слух',
                className: css.input,
                component: Input,
                label: healthHearingLabel
              }}
            /> */}
            <Field
              {...{
                name: 'healthContraindications',
                type: 'text',
                placeholder: 'Опишите свои противопоказания',
                className: css.input,
                component: Input,
                label: healthContraindicationsLabel,
                validate: [required]
              }}
            />
            <div className={css.input_title_tall}>{healthDisabilityLabel}</div>
            <div className={css.radio_group}>
              <label>
                <Field
                  {...{
                    component: 'input',
                    type: 'radio',
                    name: 'healthDisability',
                    value: 'да',
                    validate: [required],
                    className: css.radio,
                    onChange: this.onChangeDisability
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
                    name: 'healthDisability',
                    value: 'нет',
                    validate: [required],
                    className: css.radio,
                    onChange: this.onChangeDisability
                  }}
                />
                <div {...{ className: css.radio__text }}>Нет</div>
              </label>
            </div>
            {this.state.valueDisability === 'да' &&
            <Field
              {...{
                name: 'healthGroup',
                type: 'text',
                placeholder: 'Укажите группу',
                className: css.input,
                component: Input,
                label: healthGroupLabel,
                validate: [required]
              }}
            />
            }
            <div className={css.input_title_tall}>{healthCriminalLabel}</div>
            <div className={css.radio_group}>
              <label>
                <Field
                  {...{
                    component: 'input',
                    type: 'radio',
                    name: 'healthCriminal',
                    value: 'да',
                    validate: [required],
                    className: css.radio,
                    onChange: this.onChangeCriminal
                  }}
                />{' '}
                <div {...{ className: css.radio__text }}>Да</div>
              </label>
              <label>
                <Field
                  {...{
                    component: 'input',
                    type: 'radio',
                    name: 'healthCriminal',
                    value: 'нет',
                    validate: [required],
                    className: css.radio,
                    onChange: this.onChangeCriminal
                  }}
                />{' '}
                <div {...{ className: css.radio__text }}>Нет</div>
              </label>
            </div>
            {this.state.valueCriminal === 'да' &&
            <Field
              {...{
                name: 'healthCriminalArticle',
                type: 'text',
                placeholder: 'Укажите статью',
                className: css.input,
                component: Input,
                label: healthCriminalArticleLabel,
                validate: [required]
              }}
            />
            }
            <div className={css.input_title_tall}>{healthCriminalAdministrativeResponsibilityLabel}</div>
            <div className={css.radio_group}>
              <label>
                <Field
                  {...{
                    component: 'input',
                    type: 'radio',
                    name: 'healthCriminalAdministrativeResponsibility',
                    value: 'да',
                    validate: [required],
                    className: css.radio,
                    onChange: this.onChangeAdministrative
                  }}
                />{' '}
                <div {...{ className: css.radio__text }}>Да</div>
              </label>
              <label>
                <Field
                  {...{
                    component: 'input',
                    type: 'radio',
                    name: 'healthCriminalAdministrativeResponsibility',
                    value: 'нет',
                    validate: [required],
                    className: css.radio,
                    onChange: this.onChangeAdministrative
                  }}
                />{' '}
                <div {...{ className: css.radio__text }}>Нет</div>
              </label>
            </div>
            {this.state.valueAdministrative === 'да' &&
            <Field
              {...{
                name: 'healthCriminalComment',
                type: 'text',
                component: TextArea,
                label: healthCriminalCommentLabel,
                className: css.textArea,
                validate: [required]
              }}
            />
            }
          </div>
        }}
      />
    )
  }
}

Health.propTypes = {
  name: PropTypes.string,
  healthGrowthLabel: PropTypes.string,
  healthVisionLabel: PropTypes.string,
  healthHearingLabel: PropTypes.string,
  healthContraindicationsLabel: PropTypes.string,
  healthDisabilityLabel: PropTypes.string,
  healthGroupLabel: PropTypes.string,
  healthCriminalLabel: PropTypes.string,
  healthCriminalArticleLabel: PropTypes.string,
  healthCriminalAdministrativeResponsibilityLabel: PropTypes.string,
  healthCriminalCommentLabel: PropTypes.string
}
