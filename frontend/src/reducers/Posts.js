import {
    GET_POSTS,
    SORT_POSTS,
    DELETE_POST,
    UPVOTE_POST_IN_LIST,
    DOWNVOTE_POST_IN_LIST
} from '../actions/types'


const postsInitialState = {
    loadingPosts: true,
    posts: []
}

export function postsReducer (state = postsInitialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, loadingPosts: false, posts: action.posts }

        case SORT_POSTS:
            let sortedPosts
            if ( action.option === 'date') {
                sortedPosts = state.posts.sort( (a, b) => {
                    return new Date(b.timestamp) - new Date(a.timestamp)
                })
            } else {
                sortedPosts = state.posts.sort( (a, b) => {
                    return b.voteScore - a.voteScore
                })
            }
            return {
                ...state,
                posts: [
                    ...sortedPosts
                ]
            }

        case UPVOTE_POST_IN_LIST:
            return {
                ...state,
                posts: state.posts.map( (post, index) => post.id === action.post.id ?
                    {
                        ...post,
                        voteScore: post.voteScore + 1
                    }
                    :
                    post
                )
            }

        case DELETE_POST:

             return {
                 ...state,
                 posts: state.posts.filter( post => post.id !== action.post.id )
             }


        case DOWNVOTE_POST_IN_LIST:
            return {
                ...state,
                posts: state.posts.map( (post, index) => post.id === action.post.id ?
                    {
                        ...post,
                        voteScore: post.voteScore - 1
                    }
                    :
                    post
                )
            }

        default:
            return state
    }
}