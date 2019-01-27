import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import css from './loyalty.scss'
import classNames from 'classnames'

import LoyaltyList from 'components/LoyaltyList/LoyaltyList'
import LoyaltyProgram from 'components/LoyaltyProgram/LoyaltyProgram'

export default class LoyaltyPage extends Component {
  render () {
    const {
      props: {
        isMobile,
        data: { title, items = {}, program = {}, pdf = {} }
      }
    } = this
    return (
      <Fragment>
        <div
          {...{
            className: classNames(css.wrapper, {
              [css.mobile]: isMobile,
              [css.desktop]: !isMobile
            })
          }}
        >
          {title &&
          <div {...{ className: css.title }}>{title}</div>
          }
          <div {...{ className: css.container }}>
            <div {...{ className: css.container_left }}>
              {items &&
              <LoyaltyList {...{ isMobile, items }} />
              }
            </div>
            <div {...{ className: css.container_right }}>
              <LoyaltyProgram {...{ isMobile, program, pdf }} />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

LoyaltyPage.propTypes = {
  isMobile: PropTypes.bool,
  data: PropTypes.object
}
