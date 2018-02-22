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

export const grabPosts = posts => ({
  type: GET_POSTS,
  posts
})

export const getPosts = () => dispatch =>
  APIUtils.fetchPosts().then(posts =>
    dispatch(grabPosts(posts))
  )



// Import Some Posts
export const importPosts = posts => ({
    type: POSTS_IMPORTED,
    posts
})

export const importSomePosts = () => dispatch => (
    APIUtils.importSomePosts().then(posts =>
        dispatch(importPosts(posts))
    ).then( posts => addImportedPosts(posts))
)


export const addImportedPosts = (posts) => {
    let newPosts = posts.posts.map( (post, index) => (
        {
            id: String(post.id),
            timestamp: Math.floor(Date.parse(post.date) / 1000),
            title: post.title.rendered,
            body: post.content.rendered,
            category: "udacity",
            voteScore: post.author, //Just to get a random number.
            author: "John Doe",
            deleted: false,
            commentCount: 0
        })
    )
    newPosts.map( newPost => APIUtils.addPost(newPost))
}

// Categories

export const grabCategories = categories => ({
    type: GET_CATEGORIES,
    categories
})

export const getCategories= () => dispatch =>
    APIUtils.fetchCategories().then(categories =>
      dispatch(grabCategories(categories))
    )


// Post by ID

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

// Delete Post

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


// Vote UP

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