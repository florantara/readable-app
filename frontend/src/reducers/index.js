import { combineReducers } from 'redux'

import { GET_POSTS, GET_CATEGORIES } from '../actions'


const initialState = {
    loading: true,
    error: null,
    posts: [],
    categories: []

}


function postsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, loading: false, posts: action.posts }
        case GET_CATEGORIES:
            return { ...state, categories: action.categories.categories }
        default:
            return state
    }
}

export default combineReducers({
    data: postsReducer
})