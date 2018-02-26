import { combineReducers } from 'redux'

import {
    GET_POSTS,
    GET_CATEGORIES ,
    GET_POST_BY_ID,
    UPVOTE_POST_IN_LIST,
    UPVOTE_SINGLE_POST,
    DOWNVOTE_SINGLE_POST,
    DOWNVOTE_POST_IN_LIST,
    UPVOTE_SINGLE_COMMENT,
    DOWNVOTE_SINGLE_COMMENT,
    ADD_COMMENT,
    DELETE_COMMENT,
    GET_COMMENTS,
    DELETE_POST,
    POSTS_IMPORTED,
    SORT_POSTS
} from '../actions'


// Categories
const categoriesInitialState = {
    categories: []
}

function categoriesReducer ( state = categoriesInitialState, action ){
    switch (action.type){

        case GET_CATEGORIES:
            return { ...state, categories: action.categories.categories }

        default:
            return state
    }
}

// Individual Post

const individualPost = {
    post: '',
    comments: []
}

function individualPostReducer ( state = individualPost, action){
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
                 posts: state.posts.map( (post, index) => post.id === action.post.id ?
                    {
                        ...post,
                        deleted: true
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

// Posts

const postsInitialState = {
    loadingPosts: true,
    importDone: false,
    posts: []
}

function postsReducer (state = postsInitialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, loadingPosts: false, posts: action.posts }

        case POSTS_IMPORTED:
            let newPosts = action.posts.map( (post,index) => ({
                id: String(post.id),
                timestamp: post.date,
                title: post.title.rendered,
                body: post.content.rendered,
                category: "udacity",
                voteScore: Math.floor(Math.random()*200) + 1,
                author: post._embedded.author[0].name,
                deleted: false,
                commentCount: 0
            }))
            return {
                ...state,
                importDone: true,
                posts: [
                    ...state.posts,
                    ...newPosts
                ]
            }


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

export default combineReducers({
    posts: postsReducer,
    categories: categoriesReducer,
    post: individualPostReducer
})