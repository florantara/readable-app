import * as APIUtils from '../utils/api-utils'
import {
    GET_POST_BY_ID,
    DELETE_POST
} from '../actions/types.js'

// Individual Post

export const grabPost = (post, comments) => ({
    type: GET_POST_BY_ID,
    post,
    comments
})

export const getPost = (id) => dispatch => (
    APIUtils.fetchPostByID(id)
        .then( post => {
            APIUtils.fetchPostComments( post.id )
            .then( comments => {
                dispatch( grabPost( post, comments) )
            } )
        } )

)

// Delete Individual Post

export const deletePost = (post) => ({
    type: DELETE_POST,
    post
})

export const postDelete = (id) => (dispatch) => (
    APIUtils.deleteThisPost(id).then( post =>
        dispatch(deletePost(post))
    )
)

// Add Post

export const addNewPost = (newPost) => (dispatch) => (
    APIUtils.addPost(newPost)
)

// Edit Post

export const postUpdate = (id, updates) => (dispatch) => (
    APIUtils.updateThisPost(id, updates)
)

