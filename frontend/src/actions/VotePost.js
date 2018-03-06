import * as APIUtils from '../utils/api-utils'
import {
    UPVOTE_SINGLE_POST,
    DOWNVOTE_SINGLE_POST,
    UPVOTE_SINGLE_COMMENT,
    DOWNVOTE_SINGLE_COMMENT,
    UPVOTE_POST_IN_LIST,
    DOWNVOTE_POST_IN_LIST
} from '../actions/types.js'


// Vote UP

export const executeVoteUp = post => ({
    type: UPVOTE_SINGLE_POST,
    post
})

const findAndExecuteVoteUp = post => ({
    type: UPVOTE_POST_IN_LIST,
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
    if ( context === "PostsList" ) {
        return APIUtils.voteThisPost(id, option).then(post =>
            dispatch(findAndExecuteVoteUp(post))
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

export const findAndExecuteVoteDown = post => ({
    type: DOWNVOTE_POST_IN_LIST,
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
    if ( context === "PostsList"){
        return APIUtils.voteThisPost(id, option).then(post =>
              dispatch(findAndExecuteVoteDown(post))
        )
    }
    if ( context === "Comment"){
        return APIUtils.voteThisComment(id, option).then(comment =>
              dispatch(findAndExecuteVoteDownComment(comment))
        )
    }

}


