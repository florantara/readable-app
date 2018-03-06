import * as APIUtils from '../utils/api-utils'
import {
    GET_POSTS,
    POSTS_IMPORTED,
    SORT_POSTS
} from '../actions/types'


// Posts

export const grabPosts = posts => ({
  type: GET_POSTS,
  posts
})

export const getPosts = () => dispatch =>
  APIUtils.fetchPosts().then(posts =>
    dispatch(grabPosts(posts))
  )



// Import Some Posts:
//
// This fetches the 10 latest posts from an external
// WordPress Blog (webdesignerdepot)
// so there is more data in the app

export const importPosts = posts => ({
    type: POSTS_IMPORTED,
    posts
})

export const importSomePosts = () => dispatch => (
    APIUtils.importSomePosts().then(posts =>
        dispatch(importPosts(posts))
    ).then( posts => addImportedPosts(posts))
)

// Add each fetched post
export const addImportedPosts = (posts) => {
    let newPosts = posts.posts.map( (post, index) => (
        {
            id: String(post.id),
            timestamp: post.date,
            title: post.title.rendered,
            body: post.content.rendered,
            category: "udacity",
            voteScore: Math.floor(Math.random()*200) + 1,
            author: post._embedded.author[0].name,
            deleted: false,
            commentCount: 0
        })
    )
    newPosts.map( newPost => APIUtils.addPost(newPost))
}

// Sort Posts

export const sortPosts = option => ({
    type: SORT_POSTS,
    option
})


