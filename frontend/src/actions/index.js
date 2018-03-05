import * as APIUtils from '../utils/api-utils'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const POSTS_IMPORTED = 'POSTS_IMPORTED'
export const SORT_POSTS = 'SORT_POSTS'
export const COMMENT_EDITTED = 'COMMENT_EDITTED'
export const GET_POSTS = 'GET_POSTS'
export const UPVOTE_POST_IN_LIST = 'UPVOTE_POST_IN_LIST'
export const DOWNVOTE_POST_IN_LIST = 'DOWNVOTE_POST_IN_LIST'
export const GET_CATEGORIES = 'GET_CATEGORIES'

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

// Categories

export const grabCategories = categories => ({
    type: GET_CATEGORIES,
    categories
})

export const getCategories= () => dispatch =>
    APIUtils.fetchCategories().then(categories =>
      dispatch(grabCategories(categories))
    )




// Vote UP:
//
// Post in List

const findAndExecuteVoteUp = post => ({
    type: UPVOTE_POST_IN_LIST,
    post
})


// The voteUp function receives a "context" depending of where it was triggered from.
export const voteUp = (id, option, context) => dispatch => {
    if ( context === "PostsList" ) {
        return APIUtils.voteThisPost(id, option).then(post =>
            dispatch(findAndExecuteVoteUp(post))
        )
    }
}


// Vote DOWN
//// Post in List

export const findAndExecuteVoteDown = post => ({
    type: DOWNVOTE_POST_IN_LIST,
    post
})


// The voteDown function receives a "context" depending of where it was triggered from.
export const voteDown = (id, option, context) => dispatch => {
    if ( context === "PostsList"){
        return APIUtils.voteThisPost(id, option).then(post =>
              dispatch(findAndExecuteVoteDown(post))
        )
    }

}
