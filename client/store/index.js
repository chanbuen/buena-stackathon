import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import instagramProfile from './instagram-profile'
import userLat from './user-lat'
import userLng from './user-lng'
import userState from './user-state'
import filteredPosts from './user-posts-filtered'

const reducer = combineReducers({user, instagramProfile, userLat, userLng, userState, filteredPosts})
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
export * from './user-state'
export * from './user-posts-filtered'