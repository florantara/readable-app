import { combineReducers } from 'redux'

import {
    GET_POSTS,
    GET_CATEGORIES ,
    GET_POST_BY_ID,
    UPVOTE_POST_IN_LIST,
    UPVOTE_SINGLE_POST,
    DOWNVOTE_SINGLE_POST,
    DOWNVOTE_POST_IN_LIST,
} from '../actions'


const initialState = {
    loading: true,
    error: null,
    posts: [],
    post: null,
    categories: []

}


function postsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, loading: false, posts: action.posts }

        case GET_CATEGORIES:
            return { ...state, categories: action.categories.categories }

        case GET_POST_BY_ID:
            return { ...state, post: action.post }

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

        case UPVOTE_SINGLE_POST:
            return {
                ...state,
                post: {
                    ...state.post,
                    voteScore: state.post.voteScore + 1

                }

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

            case DOWNVOTE_SINGLE_POST:
                return {
                    ...state,
                    post: {
                        ...state.post,
                        voteScore: state.post.voteScore - 1

                    }

                }

        default:
            return state
    }
}

export default combineReducers({
    data: postsReducer
})