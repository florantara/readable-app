import {
    GET_POST_BY_ID,
    UPVOTE_SINGLE_POST,
    DOWNVOTE_SINGLE_POST,
    UPVOTE_SINGLE_COMMENT,
    DOWNVOTE_SINGLE_COMMENT,
    ADD_COMMENT,
    DELETE_COMMENT,
    GET_COMMENTS,
    DELETE_POST,
} from '../actions'

const individualPost = {
    post: '',
    comments: []
}

export function individualPostReducer ( state = individualPost, action){
    switch ( action.type ){

        case GET_POST_BY_ID:
            return {
                ...state,
                post: action.post,
                comments: action.comments
            }

        case DELETE_POST:
             return {
                 ...state,
                 post: {
                     ...state.post,
                     deleted: true
                 }
             }

         case UPVOTE_SINGLE_POST:
             return {
                 ...state,
                 post: {
                     ...state.post,
                     voteScore: state.post.voteScore + 1

                 }

             }

         case DOWNVOTE_SINGLE_POST:
             return {
                 ...state,
                 post: {
                     ...state.post,
                     voteScore: state.post.voteScore - 1

                 }

             }

         case GET_COMMENTS:
             return {
                 ...state,
                 comments: action.comments
             }

         case ADD_COMMENT:
             return {
                 ...state,
                 comments: [
                     ...state.comments,
                     action.newComment
                 ]
             }

         case DELETE_COMMENT:
             return {
                 ...state,
                 post: {
                     ...state.post,
                     commentCount: state.post.commentCount - 1
                 },
                 comments: state.comments.filter( (comment, index) => comment.id !== action.comment.id )
             }

         case UPVOTE_SINGLE_COMMENT:
             return {
                 ...state,
                 comments: state.comments.map( (comment, index) => comment.id === action.comment.id ?
                     {
                         ...comment,
                         voteScore: comment.voteScore + 1
                     }
                     :
                     comment
                 )
             }

         case DOWNVOTE_SINGLE_COMMENT:
             return {
                 ...state,
                 comments: state.comments.map( (comment, index) => comment.id === action.comment.id ?
                     {
                         ...comment,
                         voteScore: comment.voteScore - 1
                     }
                     :
                     comment
                 )
             }


         default:
             return state

    }
}