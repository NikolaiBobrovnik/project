import { axiosAPI } from 'Services/axiosInstances'
import Fuse from 'fuse.js'
import {
  CHANGE_CURRENT_CITY_BRAND_ZONE,
  CHANGE_CURRENT_ZONE_BRAND_ZONE, CHANGE_MAP_STATE_BRAND_ZONE,
  LOADING_BRAND_ZONE_END,
  LOADING_BRAND_ZONE_START,
  SET_FILTERED_BRAND_ZONE, CHANGE_SHOPS_BRAND_ZONE, SET_MAP_BRAND_ZONE,
  CHANGE_USER_LOCATION_BRAND_ZONE, CHANGE_SHOW_TYPE_BRAND_ZONE
} from './brandZoneReducer'

import _ from 'lodash/core'

export function getBrandZone () {
  return (dispatch, getState) => {
    dispatch({
      type: LOADING_BRAND_ZONE_START
    })
    axiosAPI.get('https://api.kalashnikovgroup.ru/api/brand-zones/list.php')
      .then(response => {
        let data = response.data.data
        if (data.cities) {
          const { shops, cities } = data
          _.each(cities, (city) => {
            data.cities[city.id].counter = _.filter(shops, ({ cityId }) => city.id === cityId).length
          })
        }
        dispatch({
          type: LOADING_BRAND_ZONE_END,
          payload: {
            data: {
              shops: data.shops,
              cities: data.cities
            }
          }
        })
        dispatch(setCurrentCity({ id: +_.keys(data.cities)[0] }))
        filterBrandZone()(dispatch, getState)
      })
  }
}

export function setCurrentZone ({ id }) {
  return {
    type: CHANGE_CURRENT_ZONE_BRAND_ZONE,
    payload: { data: id }
  }
}
export function changeShowType ({ showType }) {
  return {
    type: CHANGE_SHOW_TYPE_BRAND_ZONE,
    payload: { data: showType }
  }
}

export function setCurrentCity ({ id }) {
  return {
    type: CHANGE_CURRENT_CITY_BRAND_ZONE,
    payload: { data: id }
  }
}

export function changeMapState ({ mapState }) {
  return {
    type: CHANGE_MAP_STATE_BRAND_ZONE,
    payload: { data: mapState }
  }
}

export function setMap ({ yMaps }) {
  return {
    type: SET_MAP_BRAND_ZONE,
    payload: { data: yMaps }
  }
}

export function changeCity ({ id }) {
  return (dispatch, getState) => {
    let currentCityCoordinates = getState().getIn(['brandZone', 'cities', 'list']).toJS()[id].coordinates
    let coord = getState().getIn(['brandZone', 'userLocation', 'value']).toJS()
    let yMaps = getState().getIn(['brandZone', 'yMaps'])
    dispatch(setCurrentCity({ id }))
    filterBrandZone()(dispatch, getState)
    dispatch(setCurrentZone({ id: undefined }))
    dispatch(changeMapState({ mapState: { center: currentCityCoordinates } }))
    if (yMaps) {
      dispatch(getDistanceBetweenPoints({ nearCityId: id, yMaps, coord }))
    }
  }
}

export function getUserLocation () {
  return (dispatch, getState) => {
    let position = null
    let cities = getState().getIn(['brandZone', 'cities']).toJS()
    let yMaps = getState().getIn(['brandZone', 'yMaps'])
    yMaps.geolocation.get({
      mapStateAutoApply: true
    }).then(function (result) {
      position = result.geoObjects.get(0).geometry.getCoordinates()
      dispatch({
        type: CHANGE_USER_LOCATION_BRAND_ZONE,
        payload: { data: {value: position} }
      })
      changeCity({ id: getNearCityId({ yMaps, coord: position, cities }) })(dispatch, getState)
      dispatch({
        type: CHANGE_USER_LOCATION_BRAND_ZONE,
        payload: { data: {isAjax: false} }
      })
      console.log(position)
    })
  }
}

export function changeUserLocation (data) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_USER_LOCATION_BRAND_ZONE,
      payload: { data }
    })
  }
}

export function getNearCityId ({ yMaps, cities, coord }) {
  let nearCity = null
  let distance = Infinity
  _.each(cities.list, (city) => {
    let shopDistance = yMaps.coordSystem.geo.getDistance(coord, city.coordinates)
    if (shopDistance < distance) {
      distance = shopDistance
      nearCity = city
    }
  })
  return nearCity.id
}

export function getDistanceBetweenPoints ({ nearCityId, yMaps, coord }) {
  return (dispatch, getState) => {
    let shops = getState().getIn(['brandZone', 'shops']).toJS()
    let shopsByCityId = shops.filter(({ cityId }) => cityId === nearCityId)

    Promise.all(
      _.map(shopsByCityId, ({ id, coordinates }) => yMaps.route([coord, coordinates], { shopId: id }))
    ).then((routes) => {
      let shops = getState().getIn(['brandZone', 'shops']).toJS()
      let updatedShopsByCityId = _.map(shops, (shop) => {
        const { id: shopId } = shop
        let activeRoute = _.find(routes, ({ routeOptions }) => shopId === routeOptions.shopId)
        if (activeRoute) {
          shop.timeToGet = activeRoute.getTime()
        }
        return shop
      })
      dispatch({
        type: CHANGE_SHOPS_BRAND_ZONE,
        payload: { data: updatedShopsByCityId }
      })
      filterBrandZone()(dispatch, getState)
    })
  }
}

export function filterBrandZone () {
  return (dispatch, getState) => {
    let currentCityId = getState().getIn(['brandZone', 'cities', 'currentCity'])
    let brandZone = getState().getIn(['brandZone', 'shops']).filter((item) => {
      return item.get('cityId') === currentCityId
    }).toJS()
    let searchQuery = getState().getIn(['brandZone', 'search', 'q'])
    if (searchQuery && brandZone) {
      const options = {
        keys: [
          'title',
          'address'
        ]
      }
      const fuse = new Fuse(brandZone, options)
      brandZone = fuse.search(searchQuery)
    }
    dispatch({
      type: SET_FILTERED_BRAND_ZONE,
      payload: { data: brandZone || [] }
    })
  }
}
