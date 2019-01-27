import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRemoteData } from 'remote-data-provider'
import classNames from 'classnames'

import css from './socialsBlock.scss'

import Socials from 'kalashnikov-framework/lib/components/Socials'

let options = {
  request: {
    url: '/career/social.php'
  },
  reducerKey: 'SocialsBlock'
}

@withRemoteData(options)
class SocialsBlock extends PureComponent {
  render () {
    const {
      isMobile,
      className,
      response: {
        data: {
          title,
          paragraph,
          image,
          socials
        }
      }
    } = this.props

    return (
      <div
        {...{
          className: classNames(className, css.wrapper, isMobile ? css.mobile : css.desktop),
          style: { backgroundImage: `url(${image})` }
        }}
      >
        <div {...{ className: css.form }}>
          <h3 {...{ className: css.title }}>{title}</h3>
          <p {...{ className: css.paragraph }}>
            {paragraph}
          </p>
          <Socials
            {...{
              theme: 'white',
              items: socials,
              className: css.socials,
              size: 'm'
            }}
          />
        </div>
      </div>
    )
  }
}

SocialsBlock.propTypes = {
  className: PropTypes.string,
  response: PropTypes.object,
  isMobile: PropTypes.bool,
  socials: PropTypes.array
}

export default SocialsBlock
