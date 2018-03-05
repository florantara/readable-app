import * as APIUtils from '../utils/api-utils'
export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'
export const UPVOTE_POST_IN_LIST = 'UPVOTE_POST_IN_LIST'
export const UPVOTE_SINGLE_POST = 'UPVOTE_SINGLE_POST'
export const DOWNVOTE_SINGLE_POST = 'DOWNVOTE_SINGLE_POST'
export const DOWNVOTE_POST_IN_LIST = 'DOWNVOTE_POST_IN_LIST'
export const UPVOTE_SINGLE_COMMENT = 'UPVOTE_SINGLE_COMMENT'
export const DOWNVOTE_SINGLE_COMMENT = 'DOWNVOTE_SINGLE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const POSTS_IMPORTED = 'POSTS_IMPORTED'
export const SORT_POSTS = 'SORT_POSTS'
export const COMMENT_EDITTED = 'COMMENT_EDITTED'


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


// Individual Post

export const grabPost = (post, comments) => ({
    type: GET_POST_BY_ID,
    post,
    comments
})

export const getPost = (id) => dispatch => (
    APIUtils.fetchPostByID(id)
        .then( post => {
            APIUtils.fetchPostComments( post.id )
            .then( comments => {
                dispatch( grabPost( post, comments) )
            } )
        } )

)

// Delete Individual Post

export const deletePost = (post) => ({
    type: DELETE_POST,
    post
})

export const postDelete = (id) => (dispatch) => (
    APIUtils.deleteThisPost(id).then( post =>
        dispatch(deletePost(post))
    )
)

// Add Post

export const addNewPost = (newPost) => (dispatch) => (
    APIUtils.addPost(newPost)
)

// Edit Post

export const postUpdate = (id, updates) => (dispatch) => (
    APIUtils.updateThisPost(id, updates)
)

// Comments

export const updateComments = ( comments ) => ({
    type: GET_COMMENTS,
    comments
})

export const getComments = (postId) => dispatch => (
    APIUtils.fetchPostComments( postId )
    .then( comments => {
        dispatch( updateComments( comments) )
    } )
)

export const deleteCommentFromPost = comment => ({
    type: DELETE_COMMENT,
    comment
})

export const deleteComment = id => dispatch => (
    APIUtils.deleteThisComment(id).then( comment =>
        dispatch(deleteCommentFromPost(comment))
    )
)

export const addCommentToPost = ( newComment ) => ({
    type: ADD_COMMENT,
    newComment
})

export const addComment = newComment => dispatch => (
    APIUtils.addThisComment(newComment).then( comment =>
        dispatch(addCommentToPost( comment ))
    )
)

// Edit Comment

export const commentEditted = comment => ({
    type: COMMENT_EDITTED,
    comment
})

export const editComment = (commentEdits, id) => dispatch => (
    APIUtils.editThisComment( commentEdits, id).then( comment =>
        dispatch( commentEditted( comment))
    )
)

// Vote UP:
//
// Individual Post
// Post in List
// Comment

export const executeVoteUp = post => ({
    type: UPVOTE_SINGLE_POST,
    post
})

export const findAndExecuteVoteUp = post => ({
    type: UPVOTE_POST_IN_LIST,
    post
})

export const findAndExecuteVoteUpComment = comment => ({
    type: UPVOTE_SINGLE_COMMENT,
    comment
})

// The voteUp function receives a "context" depending of where it was triggered from.
export const voteUp = (id, option, context) => dispatch => {
    if ( context === "PostDetail" ) {
        return APIUtils.voteThisPost(id, option).then(post =>
            dispatch(executeVoteUp(post))
        )
    }
    if ( context === "PostsList" ) {
        return APIUtils.voteThisPost(id, option).then(post =>
            dispatch(findAndExecuteVoteUp(post))
        )
    }
    if ( context === "Comment" ) {
        return APIUtils.voteThisComment(id, option).then(comment =>
            dispatch(findAndExecuteVoteUpComment(comment))
        )
    }
}


// Vote DOWN
//
// Individual Post
// Post in List
// Comment

export const executeVoteDown = post => ({
    type: DOWNVOTE_SINGLE_POST,
    post
})

export const findAndExecuteVoteDown = post => ({
    type: DOWNVOTE_POST_IN_LIST,
    post
})

export const findAndExecuteVoteDownComment = comment => ({
    type: DOWNVOTE_SINGLE_COMMENT,
    comment
})


// The voteDown function receives a "context" depending of where it was triggered from.
export const voteDown = (id, option, context) => dispatch => {
    if ( context === "PostDetail"){
        return APIUtils.voteThisPost(id, option).then(post =>
              dispatch(executeVoteDown(post))
        )
    }
    if ( context === "PostsList"){
        return APIUtils.voteThisPost(id, option).then(post =>
              dispatch(findAndExecuteVoteDown(post))
        )
    }
    if ( context === "Comment"){
        return APIUtils.voteThisComment(id, option).then(comment =>
              dispatch(findAndExecuteVoteDownComment(comment))
        )
    }

}
