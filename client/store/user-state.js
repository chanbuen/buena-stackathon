import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const SET_USER_STATE = 'SET_USER_STATE'

/**
 * INITIAL STATE
 */
const defaultUserState = ''

/**
 * ACTION CREATORS
 */

const setState = (state) => ({type: SET_USER_STATE, state})
/**
 * THUNK CREATORS
 */

export const assignUserState = state => 
  dispatch =>
      dispatch(setState(state)) 
 


/**
 * REDUCER
 */
export default function (state = defaultUserState, action) {
 
  switch (action.type) {
    case SET_USER_STATE:
      return action.state

    default:
      return state
  }
}

