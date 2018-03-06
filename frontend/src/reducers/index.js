import { combineReducers } from 'redux'

import { Post } from './Post';
import { categoriesReducer } from './Categories';
import { postsReducer } from './Posts';

export default combineReducers({
    posts: postsReducer,
    categories: categoriesReducer,
    post: Post
})