import { combineReducers } from 'redux-immutable'
import elasticAdaptive from './elasticAdaptive'
import { reducer as remoteData } from 'remote-data-provider'
import { reducer as form } from 'redux-form/immutable'
import popups from '../containers/Popups/_service/PopupsReducer'
import brandZone from '../containers/BrandZoneMap/_service/brandZoneReducer'
import detailCart from '../containers/DetailCard/_service/detailCartReducer'

export const rootReducer = combineReducers({
  remoteData,
  form,
  elasticAdaptive,
  popups,
  brandZone,
  detailCart
})
