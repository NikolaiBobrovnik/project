import React, { PureComponent } from 'react'
import classNames from 'classnames'
import ShowHideGroup from 'kalashnikov-framework/lib/components/ShowHideGroup/ShowHideGroup'
import { withViewContext } from 'HOC/ViewContext/ViewContext'
import PropTypes from 'prop-types'
import _ from 'lodash/core'
import css from './supportQnA.scss'

@withViewContext
export default class SupportQnA extends PureComponent {
  render () {
    const { isMobile, className, data: { items } = {} } = this.props
    return (
      <div
        {...{
          className: classNames(className, css.wrapper, {
            [css.mobile]: isMobile,
            [css.desktop]: !isMobile
          })
        }}
      >
        <div {...{ className: css.width_limiter }}>
          {_.map(items, ({ title, text }, key) => {
            return (
              <ShowHideGroup {...{
                isMobile,
                showHide: true,
                uppercase: false,
                title,
                key
              }}>
                <div
                  {...{
                    className: css.text,
                    dangerouslySetInnerHTML: { __html: text }
                  }}
                />
              </ShowHideGroup>
            )
          })}
        </div>
      </div>
    )
  }

  static defaultProps = {
    data: {}
  }

  static propTypes = {
    data: PropTypes.object,
    isMobile: PropTypes.bool,
    className: PropTypes.any
  }
}
