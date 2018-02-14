import * as APIUtils from '../utils/api-utils'
export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'



export const grabPosts = posts => ({
  type: GET_POSTS,
  posts
})

export const getPosts = () => dispatch =>
  APIUtils.fetchPosts().then(posts =>
    dispatch(grabPosts(posts))
  )


export const grabCategories = categories => ({
    type: GET_CATEGORIES,
    categories
})

export const getCategories= () => dispatch =>
APIUtils.fetchCategories().then(categories =>
  dispatch(grabCategories(categories))
)


export const grabPost = post => ({
    type: GET_POST_BY_ID,
    post
})

export const getPost = (id) => dispatch => {
    return APIUtils.fetchPostByID(id).then(post =>
          dispatch(grabPost(post))
    )
}