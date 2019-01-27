import React, { Component } from 'react'
import classNames from 'classnames'
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps'
import PropTypes from 'prop-types'
import ScrollArea from 'react-scrollbar/dist/no-css'
import toJS from 'HOC/toJS'
import { connect } from 'react-redux'

import css from './map.scss'

function mapStateToProps (state) {
  return {
    curFontSize: state.getIn(['elasticAdaptive', 'curFontSize'])
  }
}

@connect(mapStateToProps)
@toJS
class MapComponent extends Component {
  state = {
    curItemKey: 0
  }

  scrollTo = options => {
    const isSmoothScrollSupported =
      'scrollBehavior' in document.documentElement.style
    if (isSmoothScrollSupported) {
      window.scrollTo(options)
    } else {
      window.scrollTo(options.left, options.top)
    }
  }

  getCoords = (elem) => {
    const box = elem.getBoundingClientRect()

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    }
  }

  handleItemClick = key => {
    const {
      props: {
        curFontSize,
        isMobile
      }
    } = this

    this.setState({ curItemKey: key })
    if (isMobile) {
      const element = document.getElementById('map')
      this.scrollTo({ left: 0, top: this.getCoords(element).top - 6 * curFontSize, behavior: 'smooth' })
    }
  }

  renderMap = () => {
    const { props: { isMobile, items }, state: { curItemKey } } = this
    const { coordinates, name } = items[curItemKey]
    const mapState = { center: coordinates, zoom: 14, controls: [] }

    if (coordinates) {
      return (
        <div {...{ className: css.map, id: 'map' }}>
          <YMaps>
            <Map
              state={mapState}
              width={'100%'}
              height={'100%'}
              instanceRef={ref => {
                ref && ref.behaviors.disable('scrollZoom')
              }}
            >
              <Placemark
                geometry={{
                  coordinates
                }}
                properties={{
                  hintContent: name,
                  balloonContent: name
                }}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: '/images/icons/logo_k.svg',
                  iconImageSize: [42, 42],
                  iconImageOffset: [0, 0]
                }}
              />
              {!isMobile && (
                <ZoomControl
                  options={{ position: { top: '17rem', right: '2rem' } }}
                />
              )}
            </Map>
          </YMaps>
        </div>
      )
    } else {
      return null
    }
  }

  renderBrandZoneList = () => {
    const {
      props: {
        items
      }
    } = this

    return (
      <ul {...{ className: css.list }}>
        {items.map(({ name, addr, phone, site, description }, key) => {
          return (
            <li
              {...{
                key,
                className: css.item,
                onClick: () => { this.handleItemClick(key) }
              }}
            >
              {name &&
                <h3
                  {...{
                    className: css.title,
                    dangerouslySetInnerHTML: { __html: name }
                  }}
                />
              }
              {description &&
              <p
                {...{
                  className: css.paragraph,
                  dangerouslySetInnerHTML: { __html: description }
                }}
              />
              }
              {addr &&
                <p
                  {...{
                    className: css.paragraph,
                    dangerouslySetInnerHTML: { __html: addr }
                  }}
                />
              }
              {phone &&
                <a
                  {...{
                    href: `tel:+${phone.replace(/[^0-9]/gim, '')}`,
                    className: css.link
                  }}
                >
                  {phone}
                </a>
              }
              {site &&
                <a
                  {...{
                    href: site,
                    target: '_blank',
                    className: css.link
                  }}
                >
                  {site}
                </a>
              }
            </li>
          )
        })}
      </ul>
    )
  }

  render () {
    const { props: { items, isMobile } } = this

    return (
      <div
        {...{
          className: classNames(css.wrapper, {
            [css.mobile]: isMobile,
            [css.desktop]: !isMobile
          })
        }}
      >
        {items.length > 0 && this.renderMap()}
        <ScrollArea
          {...{
            horizontal: false,
            className: css.clubsList,
            verticalContainerStyle: { width: '0.4rem', opacity: 1 },
            verticalScrollbarStyle: {
              backgroundColor: 'rgba(45, 45, 45, 0.3)',
              width: '0.4rem',
              marginLeft: '0'
            }
          }}
        >
          {this.renderBrandZoneList()}
        </ScrollArea>
      </div>
    )
  }
}

MapComponent.defaultProps = {
  isMobile: false,
  items: []
}

MapComponent.propTypes = {
  isMobile: PropTypes.bool,
  items: PropTypes.array,
  curFontSize: PropTypes.number
}

export default MapComponent
