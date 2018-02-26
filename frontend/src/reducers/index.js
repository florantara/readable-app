import { combineReducers } from 'redux'

import { individualPostReducer } from './IndividualPost';
import { categoriesReducer } from './Categories';
import { postsReducer } from './Posts';

export default combineReducers({
    posts: postsReducer,
    categories: categoriesReducer,
    post: individualPostReducer
})