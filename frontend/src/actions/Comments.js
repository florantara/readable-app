import * as APIUtils from '../utils/api-utils'
import {
    DELETE_COMMENT,
    ADD_COMMENT,
    GET_COMMENTS
} from '../actions/types.js'

// Comments

export const updateComments = ( comments ) => ({
    type: GET_COMMENTS,
    comments
})

export const getComments = (postId) => dispatch => (
    APIUtils.fetchPostComments( postId )
    .then( comments => {
        dispatch( updateComments( comments) )
    } )
)

export const deleteCommentFromPost = comment => ({
    type: DELETE_COMMENT,
    comment
})

export const deleteComment = id => dispatch => (
    APIUtils.deleteThisComment(id).then( comment =>
        dispatch(deleteCommentFromPost(comment))
    )
)

export const addCommentToPost = ( newComment ) => ({
    type: ADD_COMMENT,
    newComment
})

export const addComment = newComment => dispatch => (
    APIUtils.addThisComment(newComment).then( comment =>
        dispatch(addCommentToPost( comment ))
    )
)

// Save Edited Comment on Server
export const editComment = (commentEdits, id) => dispatch => (
    APIUtils.editThisComment( commentEdits, id)
)

