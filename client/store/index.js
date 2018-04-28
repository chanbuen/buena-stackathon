import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import instagramProfile from './instagram-profile'
import userLat from './user-lat'
import userLng from './user-lng'

const reducer = combineReducers({user, instagramProfile, userLat, userLng})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './instagram-profile'
export * from './user-lat'
export * from './user-lng'