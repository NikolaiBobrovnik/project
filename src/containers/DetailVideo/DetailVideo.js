import React, { PureComponent } from 'react'
import { RemoteDataProvider } from 'remote-data-provider'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import css from './detailVideo.scss'
import classNames from 'classnames'

import VideoSlider from 'kalashnikov-framework/lib/components/VideoSlider'

@withRouter
class DetailVideo extends PureComponent {
  render () {
    const { className, isMobile, match: { params: { code } } } = this.props
    return (
      <div {...{ className }}>
        <RemoteDataProvider
          {...{
            request: {
              url: '/activity/detail.php',
              params: {
                code
              }
            },
            exCollectorPath: 'vacanciesInner',
            exCollectorChangeableRequest: ['params.data']
          }}
        >
          {({ response: { video } }) => {
            return (
              <div {...{
                className: classNames(
                  css.wrapper,
                  isMobile ? css.mobile : css.desktop
                )
              }}>
                {video &&
                <VideoSlider
                  {...{
                    className: css.slider_container,
                    isMobile,
                    items: video.items
                  }}
                />
                }
              </div>
            )
          }}
        </RemoteDataProvider>
      </div>
    )
  }
}

DetailVideo.propTypes = {
  response: PropTypes.object,
  match: PropTypes.object,
  items: PropTypes.array,
  className: PropTypes.string,
  isMobile: PropTypes.bool
}

export default DetailVideo
