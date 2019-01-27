import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import css from './brandZoneMapMobile.scss'
import _ from 'lodash/core'
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps'
import BrandZoneList from 'kalashnikov-framework/lib/components/BrandZones/BrandZoneList'
import BrandZoneCard from 'kalashnikov-framework/lib/components/BrandZones/BrandZoneCard'
import vkIcon from './assets/vk.svg'
import fbIcon from './assets/fb.svg'
import ScrollArea from 'components/ScrollArea/ScrollArea'
import moment from 'moment'

import * as BrandZoneActions from 'containers/BrandZoneMap/_service/BrandZoneActions'
import * as DetailCartActions from 'containers/DetailCard/_service/DetailCartActions'
import toJS from 'HOC/toJS'
import pinImg from './assets/map/pin.svg'
import myImg from './assets/map/my.svg'
import pinActiveImg from './assets/map/pin_active.svg'
import SuggestView from './SuggestView/SuggestViewMobile'
// import ModelSlider from 'components/ModelSlider/ModelSlider'
// import SkyLightWrap from 'components/SkyLight/SkyLightWrap'

function mapStateToProps (state) {
  return {
    brandZoneState: state.get('brandZone')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    brandZoneActions: bindActionCreators(BrandZoneActions, dispatch),
    detailCartActions: bindActionCreators(DetailCartActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class BrandZoneMap extends Component {
  socialIcons = {
    vk: vkIcon,
    fb: fbIcon
  }

  state = {
    yMaps: undefined,
    showPopUp: false
  }

  loadContent () {
    if (this.props.brandZoneState.empty && !this.props.brandZoneState.isAjax) {
      this.props.brandZoneActions.getBrandZone()
    }
  }

  componentWillMount () {
    // this.props.brandZoneActions.getLocation()
    this.loadContent()
  }

  showPhotoPopUp = () => {
    this.props.detailCartActions.showPopUp(true)
  }

  handlerClickBrandZoneCard = ({ id, cityId }) => {
    this.props.brandZoneActions.setCurrentZone({ id })
    if (cityId) {
      this.props.brandZoneActions.setCurrentCity({ id: cityId })
    }
    if (id) {
      const { shops } = this.props.brandZoneState
      let data = _.find(shops, (item) => +item.id === id)
      this.props.brandZoneActions.changeMapState({ mapState: { center: data.coordinates } })
    }
  }

  renderBrandZoneList = () => {
    const { cities: { currentCity }, filteredBrandZones } = this.props.brandZoneState
    if (!currentCity) {
      return null
    }
    let brandZoneListItems = []
    _.each(filteredBrandZones, (shop) => {
      const {
        id,
        title,
        address,
        blockTimeTable: { timeTable = [] } = {},
        blockMetro: { metro = [] } = {},
        timeToGet = 0
      } = shop
      let item = {
        title,
        address,
        timeToGet: timeToGet ? moment().to(moment().add(timeToGet, 'seconds')) : '',
        onClick: () => this.handlerClickBrandZoneCard({ id })
      }
      if (metro.length > 1) {
        item.blockMetro = {
          title: metro[0].text,
          metroDots: metro[0].dots
        }
      }
      if (timeTable.length > 1) {
        const dayOfWeek = moment().format('e')
        const curDay = timeTable[dayOfWeek]
        const title = curDay.holiday ? 'Выходной' : `Открыто до ${curDay.timeEnd}`
        item.timeTitle = title
      }
      brandZoneListItems.push(item)
    })

    return (
      <BrandZoneList items={brandZoneListItems} />
    )
  }

  renderPlaceMark = () => {
    let placeMarks = []
    const { shops, userLocation, currentZone } = this.props.brandZoneState
    _.each(shops, ({ coordinates, title, id, cityId }) => {
      if (coordinates && coordinates.length) {
        placeMarks.push(
          <Placemark
            key={id}
            geometry={{
              coordinates
            }}
            properties={{
              hintContent: title
            }}
            options={{
              // Options. You must specify this type of layout.
              iconLayout: 'default#image',
              // Custom image for the placemark icon.
              iconImageHref: +id === +currentZone ? pinActiveImg : pinImg,
              // The size of the placemark.
              iconImageSize: +id === +currentZone ? [58, 58] : [24, 24],
              // The offset of the upper left corner of the icon relative
              // to its "tail" (the anchor point).
              iconImageOffset: +id === +currentZone ? [-29, -29] : [-12, -12]
            }}
            onClick={() => {
              this.handlerClickBrandZoneCard({ id, cityId })
            }}
          />
        )
      } else {
        console.log('Объект без координат:', coordinates, title, id, cityId)
      }
    })
    if (userLocation.value) {
      placeMarks.push(
        <Placemark
          key={'user'}
          geometry={{
            coordinates: userLocation.value
          }}
          properties={{
            hintContent: 'ваше положение'
          }}
          options={{
            // Options. You must specify this type of layout.
            iconLayout: 'default#image',
            // Custom image for the placemark icon.
            iconImageHref: myImg,
            // The size of the placemark.
            iconImageSize: [58, 58],
            // The offset of the upper left corner of the icon relative
            // to its "tail" (the anchor point).
            iconImageOffset: [-29, -29]
          }}
        />
      )
    }

    return placeMarks
  }

  renderBrandZoneCard = () => {
    // const { showPopUp } = this.state
    const { shops, currentZone } = this.props.brandZoneState
    let currentShop = _.find(shops, (item) => +item.id === currentZone)
    const {
      title,
      address,
      description,
      photo,
      timeToGet,
      blockTimeTable: { timeTable = [] } = {},
      blockPhones: { phones = [] } = {},
      blockMetro: { metro = [] } = {},
      blockSocial: { links = {} } = {}
    } = currentShop
    let brandZoneCardData = {
      title,
      address,
      description,
      photo,
      timeToGet: timeToGet ? moment().to(moment().add(timeToGet, 'seconds')) : '',
      onPhotoClick: () => { this.showPhotoPopUp(true) },
      backBtn: (
        <button
          onClick={() => this.handlerClickBrandZoneCard({ id: undefined })}
        >
          Все бренд-зоны
        </button>
      )
    }

    if (_.size(links) > 1) {
      brandZoneCardData.blockSocial = {
        top: {
          title: 'Соцсети'
        }
      }
      brandZoneCardData.blockSocial.top.social = _.map(links, (item, key) => {
        return {
          link: item,
          icon: this.socialIcons[key]
        }
      })
    }

    if (phones.length >= 1) {
      brandZoneCardData.blockPhones = {
        top: {
          title: phones[0],
          toggleBtn: phones.length > 1,
          counter: phones.length - 1,
          isPhone: true
        }
      }
      phones.shift()
      brandZoneCardData.blockPhones.phones = phones
    }

    if (metro.length > 1) {
      brandZoneCardData.blockMetro = {
        top: {
          title: `${metro[0].text} — 7 мин.`,
          toggleBtn: metro.length > 1,
          counter: metro.length - 1,
          metroDots: metro[0].dots
        }
      }
      metro.shift()
      brandZoneCardData.blockMetro.metro = metro
    }

    if (timeTable.length > 1) {
      const dayOfWeek = moment().format('e')
      const curDay = timeTable[dayOfWeek]
      const title = curDay.holiday ? 'Выходной' : `Открыто до ${curDay.timeEnd}`
      brandZoneCardData.blockTimeTable = {
        top: {
          title,
          toggleBtn: timeTable.length > 1
        }
      }
      brandZoneCardData.blockTimeTable.timeTable = _.map(timeTable, ({ day, timeStart, timeEnd, holiday }, key) => {
        return {
          day,
          time: holiday ? 'Выходной' : `${timeStart} – ${timeEnd}`,
          today: key + 1 === +dayOfWeek
        }
      })
    }
    /* let sliderPhoto = _.map(photo, (item, key) => {
      return {
        url: item
      }
    }) */
    return (
      <div>
        <BrandZoneCard {...brandZoneCardData} />
        {/* <div className={css.photo_popup}>
          <SkyLightWrap
            isVisible={showPopUp}
            onCloseClicked={() => {
              this.showPhotoPopUp(false)
            }}
            onOverlayClicked={() => {
              this.showPhotoPopUp(false)
            }}
          >
            {showPopUp &&
            <ModelSlider {...{ images: sliderPhoto, theme: 'popUp' }} />}
          </SkyLightWrap>

        </div> */}
      </div>
    )
  }

  render () {
    const { mapState, currentZone, userLocation, showType } = this.props.brandZoneState
    const { yMaps } = this.state
    return (
      <div className={css.wrapper}>
        {userLocation.isAjax && <div className={css.loader}>Идет определение вашего положения на карте...</div>}
        <div className={css.search}>
          <SuggestView
            yMaps={yMaps}
          />
        </div>
        {showType === 'list' &&
        <div className={css.in}>
          <ScrollArea {...{
            horizontal: false,
            className: css.aside,
            verticalContainerStyle: { width: '0.4rem', opacity: 1 },
            verticalScrollbarStyle: {
              backgroundColor: 'rgba(45, 45, 45, 0.3)',
              width: '0.4rem',
              marginLeft: '0'
            }
          }}>
            {currentZone ? '' : this.renderBrandZoneList()}
          </ScrollArea>
        </div>}
        <div className={showType === 'map' ? css.map : css.map_hidden}>
          <YMaps
            onApiAvaliable={
              (yMaps) => {
                this.setState({ yMaps })
                this.props.brandZoneActions.setMap({ yMaps })
                this.props.brandZoneActions.getUserLocation({ yMaps })
              }
            }
            query={{ mode: 'debug' }}
          >
            <Map
              state={mapState} width={'100%'} height={'100%'}
              instanceRef={ref => { ref && ref.behaviors.disable('scrollZoom') }}>
              {this.renderPlaceMark()}
              <ZoomControl options={{ position: { top: '20rem', right: '2rem' } }} />
            </Map>
          </YMaps>
        </div>
        {currentZone && <div className={showType === 'map' ? css.card_map : css.card_list}>
          {this.renderBrandZoneCard()}
        </div>}
        {showType === 'map' && <button className={css.toggle_type_btn} onClick={() => {
          this.props.brandZoneActions.changeShowType({ showType: 'list' })
        }}>Показать списком</button>}
        {showType === 'list' && <button className={css.toggle_type_btn} onClick={() => {
          this.props.brandZoneActions.changeShowType({ showType: 'map' })
        }}>Показать на карте</button>}
      </div>
    )
  }
}

BrandZoneMap.propTypes = {
  brandZoneActions: PropTypes.object,
  brandZoneState: PropTypes.object,
  detailCartActions: PropTypes.object
}
