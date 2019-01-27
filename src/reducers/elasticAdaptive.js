import { fromJS } from 'immutable'

export const SET_CURRENT_FONT_SIZE = 'SET_CURRENT_FONT_SIZE'

const initialState = fromJS({
  config: {
    desktop: {
      baseSize: 10,
      baseWidth: 1440,
      widthLimit: 1440
    },
    mobile: {
      baseSize: 10,
      baseWidth: 375,
      widthLimit: undefined
    }
  },
  curFontSize: 10
})

export default function ElasticAdaptive (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_FONT_SIZE:
      return state.set('curFontSize', action.payload.curFontSize)
    default:
      return state
  }
}
