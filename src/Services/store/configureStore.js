import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { rootReducer } from '../../reducers/_index'
import Immutable from 'immutable'
import { isDevelopment } from 'utils'
import AsyncActionController from 'HOC/ServerReRender/AsyncActionController'
import { asyncActionMiddleware } from 'remote-data-provider/extensions/serverReRender'
import { globalErrorMiddleware } from 'remote-data-provider/extensions/globalError'
import { collectorMiddleware } from 'remote-data-provider/extensions/collector'

const stateTransformer = state => {
  if (Immutable.Iterable.isIterable(state)) return state.toJS()
  else return state
}

export default function configureStore (
  asyncActionController = new AsyncActionController()
) {
  let store
  let initialState
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    initialState = Immutable.fromJS(window.__INITIAL_STATE__)
  }
  if (isDevelopment) {
    const reduxDebug = process.env.REACT_APP_REDUX_DEBUG === 'true'
    store = compose(
      applyMiddleware(
        thunkMiddleware.withExtraArgument(asyncActionController)
      ),
      applyMiddleware(asyncActionMiddleware(asyncActionController)),
      applyMiddleware(globalErrorMiddleware({ setByDefault: true })),
      applyMiddleware(collectorMiddleware()),
      applyMiddleware(
        createLogger({
          stateTransformer,
          predicate: (getState, action) => reduxDebug || action.debug,
          diff: false, // падает на странице бренд-зон
          collapsed: (getState, action, logEntry) => !logEntry.error && !action.debug
        })
      )
    )(createStore)(rootReducer, initialState)
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../../reducers/_index', () => {
        store.replaceReducer(require('../../reducers/_index').rootReducer)
      })
    }
  } else {
    store = compose(
      applyMiddleware(
        thunkMiddleware.withExtraArgument(asyncActionController)
      ),
      applyMiddleware(asyncActionMiddleware(asyncActionController)),
      applyMiddleware(globalErrorMiddleware({ setByDefault: true })),
      applyMiddleware(collectorMiddleware())
    )(createStore)(rootReducer, initialState)
  }

  return store
}
