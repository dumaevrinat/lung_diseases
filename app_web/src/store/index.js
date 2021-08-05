import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export default createStore(rootReducer, applyMiddleware(thunk))

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
