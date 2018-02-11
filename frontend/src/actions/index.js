import * as APIUtils from '../utils/api-utils'
export const GET_POSTS = 'GET_POSTS'



export const grabPosts = posts => ({
  type: GET_POSTS,
  posts
})

export const getPosts = () => dispatch =>
  APIUtils.fetchPosts().then(posts =>
    dispatch(grabPosts(posts))
  )