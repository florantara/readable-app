import { combineReducers } from 'redux'

import { GET_POSTS } from '../actions'


const initialState = {
    loading: true,
    error: null,
    posts: []

}


function postsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
        console.log( "Reducer: GET_POSTS", action.posts)
      return { ...state, loading: false, posts: action.posts }
    default:
      return state
  }
}

export default combineReducers({
    data: postsReducer
})