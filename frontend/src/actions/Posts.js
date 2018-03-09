import * as APIUtils from '../utils/api-utils'
import {
    GET_POSTS,
    SORT_POSTS
} from '../actions/types'


// Posts

export const grabPosts = posts => ({
  type: GET_POSTS,
  posts
})

export const getPosts = () => dispatch =>
  APIUtils.fetchPosts().then(posts =>
    dispatch(grabPosts(posts))
  )

// Sort Posts

export const sortPosts = option => ({
    type: SORT_POSTS,
    option
})


