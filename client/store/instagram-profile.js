import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const SET_USER_PROFILE = 'SET_USER_PROFILE'

/**
 * INITIAL STATE
 */
const defaultUserProfile = []

/**
 * ACTION CREATORS
 */

const setProfile = (profile) => ({type: SET_USER_PROFILE, profile})
/**
 * THUNK CREATORS
 */

export const requestProfile = (mediaLink) => 
  dispatch =>
    axios.get(mediaLink)
    .then(res => res.data.data)
    .then(media => {
      console.log('MEDIA', media)
      dispatch(setProfile(media)) 
    })
    .catch(err => console.error(`Unable to get media : ${err}`))


/**
 * REDUCER
 */
export default function (state = defaultUserProfile, action) {
  switch (action.type) {
    case SET_USER_PROFILE:
      return action.profile

    default:
      return state
  }
}

