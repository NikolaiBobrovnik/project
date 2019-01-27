import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import css from '../formNewVacancy.scss'
import classNames from 'classnames'

export default class AccordeonBox extends PureComponent {
  state = {
    showText: false
  }

  showText () {
    this.setState({
      showText: !this.state.showText
    })
  }

  render () {
    const {
      props: {
        accordeonChildren,
        label
      }
    } = this

    const {
      showText
    } = this.state

    return (
      <div {...{ className: css.container_inputs }}>
        <legend
          {...{
            className: classNames(css.legend, css.legend_color, {
              [css.color]: showText
            }),
            onClick: ::this.showText
          }}
        >
          {label}
        </legend>
        {showText &&
        <div
          {...{
            className: classNames(css.box, {
              [css.hide]: !showText,
              [css.show]: showText
            })
          }}
        >
          {accordeonChildren}
        </div>
        }
      </div>
    )
  }
}

AccordeonBox.propTypes = {
  className: PropTypes.string,
  accordeonChildren: PropTypes.any,
  label: PropTypes.string
}
