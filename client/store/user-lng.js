import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const SET_USER_LNG = 'SET_USER_LNG'

/**
 * INITIAL STATE
 */
const defaultUserLng = ''

/**
 * ACTION CREATORS
 */

const setLng = (lng) => ({type: SET_USER_LNG, lng})
/**
 * THUNK CREATORS
 */

export const assignUserLng = lng => 
  dispatch =>
      dispatch(setLng(lng)) 
 


/**
 * REDUCER
 */
export default function (state = defaultUserLng, action) {
  switch (action.type) {
    case SET_USER_LNG:
      return action.lng

    default:
      return state
  }
}

