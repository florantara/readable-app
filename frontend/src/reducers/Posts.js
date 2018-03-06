import {
    GET_POSTS,
    POSTS_IMPORTED,
    SORT_POSTS,
    DELETE_POST,
    UPVOTE_POST_IN_LIST,
    DOWNVOTE_POST_IN_LIST
} from '../actions/types'


const postsInitialState = {
    loadingPosts: true,
    importDone: false,
    posts: []
}

export function postsReducer (state = postsInitialState, action) {
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