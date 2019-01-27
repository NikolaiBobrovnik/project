import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import qs from 'qs'
import { RemoteDataProvider } from 'remote-data-provider'
import classNames from 'classnames'

import css from './subscribePage.scss'

import SubscribePageComponent from 'kalashnikov-framework/lib/components/SubscribePage/SubscribePage'

@withRouter
class SubscribePage extends PureComponent {
  render () {
    const { subscribe, location: {search}, isMobile } = this.props
    const token = qs.parse(search.replace('?', '')).token

    return (
      <RemoteDataProvider
        {...{
          request: {
            url: subscribe ? '/form/subscribe_confirm.php' : '/pages/unsubscribe.php',
            params: {
              token
            }
          }
        }}
      >
        {({
          response: { data }
        }) => {
          return (
            <SubscribePageComponent
              {...{
                isMobile,
                className: classNames(isMobile ? css.blockMobile : css.block),
                subscribe,
                ...data
              }}
            />
          )
        }}
      </RemoteDataProvider>
    )
  }
}

SubscribePage.propTypes = {
  isMobile: PropTypes.bool,
  subscribe: PropTypes.bool,
  location: PropTypes.object
}

export default SubscribePage
