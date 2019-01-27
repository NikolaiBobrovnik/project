import React, { PureComponent } from 'react'
import { withRemoteData } from 'remote-data-provider'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import css from './license.scss'

@withRemoteData({
  request: {
    url: '/contacts/license.php'
  },
  reducerKey: 'license'
})
class License extends PureComponent {
  render () {
    const {
      props: { response: { data: { title, paragraph } }, isMobile }
    } = this

    return (
      <div
        {...{
          className: classNames(css.wrapper, {
            [css.mobile]: isMobile,
            [css.desktop]: !isMobile
          })
        }}
      >
        <h2
          {...{
            className: css.title,
            dangerouslySetInnerHTML: { __html: title }
          }}
        />
        <div
          {...{
            className: css.paragraph,
            dangerouslySetInnerHTML: { __html: paragraph }
          }}
        />
      </div>
    )
  }

  static propTypes = {
    isMobile: PropTypes.bool,
    response: PropTypes.object
  }
}

export default License
