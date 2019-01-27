import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import { required } from 'utils/Form/validate'

// import css from '../formNewVacancy.scss'
// import classNames from 'classnames'

import AccordeonBox from '../AccordeonBox/AccordeonBox'
import Input from 'components/Input/Input'

export default class Address extends PureComponent {
  render () {
    const {
      props: {
        actualAddressLabel,
        name
      }
    } = this
    return (
      <AccordeonBox
        {...{
          label: name,
          accordeonChildren: <Field
            {...{
              name: 'actualAddress',
              type: 'text',
              placeholder: 'Укажите адрес',
              component: Input,
              label: actualAddressLabel,
              validate: [required]
            }}
          />
        }}
      />
    )
  }
}

Address.propTypes = {
  name: PropTypes.string,
  actualAddressLabel: PropTypes.string
}
