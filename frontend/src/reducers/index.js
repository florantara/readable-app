import { combineReducers } from 'redux'

import {
    GET_POSTS,
    GET_CATEGORIES ,
    GET_POST_BY_ID
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

        default:
            return state
    }
}

export default combineReducers({
    data: postsReducer
})