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


const initialState = {
    loading: true,
    error: null,
    posts: [],
    post: null,
    comments: null,
    categories: []

}


function postsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, loading: false, posts: action.posts }

        case GET_CATEGORIES:
            return { ...state, categories: action.categories.categories }

        case GET_POST_BY_ID:
            return {
                ...state,
                post: action.post,
                comments: action.comments
            }

        case POSTS_IMPORTED:
            let newPosts = action.posts.map( (post,index) => ({
                id: String(post.id),
                timestamp: Math.floor(Date.parse(post.date.slice(0, post.date.length - 9)) / 1000),
                title: post.title.rendered,
                body: post.content.rendered,
                category: "udacity",
                voteScore: post.author, //Just to get a random number.
                author: "John Doe",
                deleted: false,
                commentCount: 0
            }))
            return {
                ...state,
                posts: [
                    ...state.posts,
                    ...newPosts
                ]
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

        case GET_COMMENTS:
            return {
                ...state,
                comments: action.comments
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

        default:
            return state
    }
}

export default combineReducers({
    data: postsReducer
})