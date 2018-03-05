import * as APIUtils from '../utils/api-utils'
import {
    GET_POST_BY_ID,
    UPVOTE_SINGLE_POST,
    DOWNVOTE_SINGLE_POST,
    UPVOTE_SINGLE_COMMENT,
    DOWNVOTE_SINGLE_COMMENT,
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


// Vote UP

export const executeVoteUp = post => ({
    type: UPVOTE_SINGLE_POST,
    post
})

export const findAndExecuteVoteUpComment = comment => ({
    type: UPVOTE_SINGLE_COMMENT,
    comment
})

// The voteUp function receives a "context" depending of where it was triggered from.
export const voteUp = (id, option, context) => dispatch => {
    if ( context === "PostDetail" ) {
        return APIUtils.voteThisPost(id, option).then(post =>
            dispatch(executeVoteUp(post))
        )
    }
    if ( context === "Comment" ) {
        return APIUtils.voteThisComment(id, option).then(comment =>
            dispatch(findAndExecuteVoteUpComment(comment))
        )
    }
}

// Vote Down

export const executeVoteDown = post => ({
    type: DOWNVOTE_SINGLE_POST,
    post
})

export const findAndExecuteVoteDownComment = comment => ({
    type: DOWNVOTE_SINGLE_COMMENT,
    comment
})

// The voteDown function receives a "context" depending of where it was triggered from.
export const voteDown = (id, option, context) => dispatch => {
    if ( context === "PostDetail"){
        return APIUtils.voteThisPost(id, option).then(post =>
              dispatch(executeVoteDown(post))
        )
    }
    if ( context === "Comment"){
        return APIUtils.voteThisComment(id, option).then(comment =>
              dispatch(findAndExecuteVoteDownComment(comment))
        )
    }

}


