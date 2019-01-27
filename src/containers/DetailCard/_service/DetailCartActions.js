import {
  TOGGLE_POPUP
} from './detailCartReducer'

export function showPopUp (payload) {
  return dispatch => {
    dispatch({
      type: TOGGLE_POPUP,
      payload
    })
  }
}
