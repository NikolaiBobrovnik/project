import { fromJS } from 'immutable'

export const TOGGLE_POPUP = 'TOGGLE_POPUP'

const initialState = fromJS({
  showPopUp: false
})

export default function DetailCart (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_POPUP:
      return state.set('showPopUp', action.payload)
    default:
      return state
  }
}
