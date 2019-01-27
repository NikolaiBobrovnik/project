import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash/core'

import css from './loyaltyList.scss'

export default class LoyaltyList extends PureComponent {
  render () {
    const {
      props: {
        isMobile,
        items: {
          title,
          text,
          list
        }
      }
    } = this
    return (
      <section
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
        {text &&
        <div {...{ className: css.text }}>{text}</div>
        }
        {
          _.map(list, (item, key) => (
            <div {...{ className: css.container, key }}>
              <div {...{ className: css.container_img }}>
                {item.img &&
                <img {...{
                  className: css.img,
                  src: item.img,
                  alt: ''
                }} />
                }
              </div>
              <div {...{ className: css.container_text }}>
                {item.title &&
                <div {...{ className: css.listTitle }}>{item.title}</div>
                }
                {item.items &&
                _.map(item.items, (item, key) => (
                  <div {...{ className: css.listText, key }}>{item.text}</div>
                ))
                }
              </div>
            </div>
          ))
        }
      </section>
    )
  }
}

LoyaltyList.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool,
  items: PropTypes.object
}
