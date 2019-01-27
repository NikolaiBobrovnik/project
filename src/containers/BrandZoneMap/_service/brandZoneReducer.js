import { fromJS } from 'immutable'
export const LOADING_BRAND_ZONE_START = 'LOADING_BRAND_ZONE_START'
export const LOADING_BRAND_ZONE_END = 'LOADING_BRAND_ZONE_END'
export const CHANGE_CURRENT_ZONE_BRAND_ZONE = 'CHANGE_CURRENT_ZONE_BRAND_ZONE'
export const CHANGE_MAP_STATE_BRAND_ZONE = 'CHANGE_MAP_STATE_BRAND_ZONE'
export const CHANGE_CURRENT_CITY_BRAND_ZONE = 'CHANGE_CURRENT_CITY_BRAND_ZONE'
export const SET_FILTERED_BRAND_ZONE = 'SET_FILTERED_BRAND_ZONE'
export const CHANGE_USER_LOCATION_BRAND_ZONE = 'CHANGE_USER_LOCATION_BRAND_ZONE'
export const CHANGE_SHOPS_BRAND_ZONE = 'CHANGE_SHOPS_BRAND_ZONE'
export const SET_MAP_BRAND_ZONE = 'SET_MAP_BRAND_ZONE'
export const CHANGE_SHOW_TYPE_BRAND_ZONE = 'CHANGE_SHOW_TYPE_BRAND_ZONE'

const initialState = fromJS({
  yMaps: false,
  mapState: {
    center: [55.76, 37.64],
    zoom: 10,
    controls: []
  },
  shops: [],
  filteredBrandZones: [],
  cities: {
    currentCity: undefined,
    list: {}
  },
  empty: true,
  isAjax: false,
  currentZone: undefined,
  showType: 'map',
  userLocation: {
    isAjax: true,
    value: false
  },
  search: { q: '' }
})

export default function BrandZone (state = initialState, action) {
  switch (action.type) {
    case LOADING_BRAND_ZONE_START:
      return state.set('isAjax', true)

    case LOADING_BRAND_ZONE_END:
      return state.set('shops', fromJS(action.payload.data.shops))
        .setIn(['cities', 'list'], fromJS(action.payload.data.cities))
        .merge(fromJS({
          isAjax: false,
          empty: false
        }))
    case CHANGE_CURRENT_CITY_BRAND_ZONE:
      return state.setIn(['cities', 'currentCity'], action.payload.data)

    case CHANGE_CURRENT_ZONE_BRAND_ZONE:
      return state.set('currentZone', action.payload.data)

    case CHANGE_SHOW_TYPE_BRAND_ZONE:
      return state.set('showType', action.payload.data)

    case CHANGE_MAP_STATE_BRAND_ZONE: {
      return state.mergeIn(['mapState'], fromJS(action.payload.data))
    }

    case CHANGE_USER_LOCATION_BRAND_ZONE: {
      return state.mergeIn(['userLocation'], fromJS(action.payload.data))
    }

    case SET_FILTERED_BRAND_ZONE: {
      return state.set('filteredBrandZones', fromJS(action.payload.data))
    }

    case SET_MAP_BRAND_ZONE: {
      return state.set('yMaps', action.payload.data)
    }

    case CHANGE_SHOPS_BRAND_ZONE: {
      return state.set('shops', fromJS(action.payload.data))
    }

    default:
      return state
  }
}
