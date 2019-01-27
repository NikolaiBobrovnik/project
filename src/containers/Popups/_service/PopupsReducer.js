import { fromJS } from 'immutable'

export const POPUPS_UPDATE = 'POPUPS_UPDATE'
export const OPEN_POPUP = 'OPEN_POPUP'
export const POPUP_CLOSE = 'POPUP_CLOSE'

const initialState = fromJS({
  showPopups: false,
  structurePopup: false,
  structurePopupListNumber: null,
  structureListPopup: false,
  contactsPopup: false,
  burgerMenuPopup: false,
  popupReview: false,
  popupReviewForm: false,
  loginPopup: false,
  registrationPopup: false,
  confirmPopup: false,
  forgotPasswordPopup: false,
  sectionsPopup: false,
  popupConsent: false
})

export default function Popups (state = initialState, action) {
  switch (action.type) {
    case OPEN_POPUP:
      return state
        .mergeIn([fromJS(action.payload)], true)

    case POPUP_CLOSE:
      return state
        .mergeIn([fromJS(action.payload)], false)

    case POPUPS_UPDATE:
      return state
        .mergeDeep(fromJS(action.payload))

    default:
      return state
  }
}
