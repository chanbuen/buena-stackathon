import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const SET_USER_LAT = 'SET_USER_LAT'

/**
 * INITIAL STATE
 */
const defaultUserLat = ''

/**
 * ACTION CREATORS
 */

const setLat = (lat) => ({type: SET_USER_LAT, lat})
/**
 * THUNK CREATORS
 */

export const assignUserLat = lat => 
  dispatch =>
      dispatch(setLat(lat)) 



/**
 * REDUCER
 */
export default function (state = defaultUserLat, action) {
  switch (action.type) {
    case SET_USER_LAT:
      return action.lat

    default:
      return state
  }
}

