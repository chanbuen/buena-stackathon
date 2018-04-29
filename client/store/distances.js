import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const SET_DISTANCE = 'SET_DISTANCE'

/**
 * INITIAL STATE
 */
const defaultDistances = {}

/**
 * ACTION CREATORS
 */

const setDistances = (distances) => ({type: SET_DISTANCE, distances})
/**
 * THUNK CREATORS
 */

export const saveDistances = (distances) => 
  dispatch =>
      dispatch(setDistances(distances)) 



/**
 * REDUCER
 */
export default function (state = defaultDistances, action) {
  switch (action.type) {
    case SET_DISTANCE:
      return action.distances

    default:
      return state
  }
}

