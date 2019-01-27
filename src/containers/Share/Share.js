import React, { PureComponent } from 'react'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import { isBrowser } from 'utils'
import css from './share.scss'
import classNames from 'classnames'

class SocialList extends PureComponent {
  share = false

  render () {
    const {
      props: {
        className
      }
    } = this

    return (
      <div {...{ className: classNames(css.wrapper, className) }}>
        <div {...{ className: css.title }}>Поделиться:</div>
        <div ref='ya-share2' className={css.share} />
      </div>
    )
  }

  _reInitShare () {
    this._destroyShare()
      ._initShare()

    return this
  }

  _initShare () {
    if (isBrowser) {
      if (_get(window, 'Ya.share2')) {
        const {
          title,
          image,
          desc
        } = this.props

        this.share = window.Ya.share2(this.refs['ya-share2'], {
          theme: {
            counter: false,
            services: 'facebook,vkontakte,odnoklassniki,twitter'
          },
          content: {
            url: window.location.href,
            title: title,
            image: image,
            description: desc
          }
        })
      } else {
        setTimeout(() => this._initShare, 420)
      }
      return this
    }
  }

  _destroyShare () {
    if (this.share) {
      this.share.destroy()
    }

    return this
  }

  componentDidUpdate (prevProps) {
    const { path } = this.props
    if (prevProps.path !== path) {
      this._reInitShare()
    }
  }

  componentDidMount () {
    setTimeout(() => this._initShare(), 500)
  }

  componentWillUnmount () {
    if (this.share) {
      this.share.destroy()
    }
  }
}

export default SocialList

SocialList.propTypes = {
  desc: PropTypes.string,
  image: PropTypes.string,
  path: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string
}
