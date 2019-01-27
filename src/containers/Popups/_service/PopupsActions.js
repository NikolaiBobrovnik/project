import {
  POPUPS_UPDATE,
  OPEN_POPUP,
  POPUP_CLOSE
} from './PopupsReducer'

export function openPopup (payload) {
  return dispatch => {
    dispatch({
      type: OPEN_POPUP,
      payload
    })
  }
}

export function closePopup (payload) {
  return dispatch => {
    dispatch({
      type: POPUP_CLOSE,
      payload
    })
  }
}

export function updatePopups (payload) {
  return dispatch => {
    dispatch({
      type: POPUPS_UPDATE,
      payload
    })
  }
}
