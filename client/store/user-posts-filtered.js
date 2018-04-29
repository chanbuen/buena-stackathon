import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const FILTER_USER_POSTS = 'FILTER_USER_POSTS'
// const FIND_DISTANCE = 'FIND_DISTANCE'
/**
 * INITIAL STATE
 */
const defaultFilteredPosts = []

/**
 * ACTION CREATORS
 */

const setFilteredPosts = (posts) => ({type: FILTER_USER_POSTS, posts})
// const setDistance = (posts) => ({type: FIND_DISTANCE, posts})
/**
 * THUNK CREATORS
 */

export const saveFilteredPosts = posts => 
  dispatch =>
      dispatch(setFilteredPosts(posts)) 
 
// export const saveDistance = posts => 
//   dispatch =>
//     dispatch(setDistance(posts))

/**
 * REDUCER
 */
export default function (state = defaultFilteredPosts, action) {
  switch (action.type) {
    case FILTER_USER_POSTS:
    console.log('ACTION FILTERED POSTS', action.posts)
      return action.posts
    // case FIND_DISTANCE:
    //   return action.posts

    default:
      return state
  }
}

