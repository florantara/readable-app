import * as APIUtils from '../utils/api-utils'
export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'
export const UPVOTE_POST_IN_LIST = 'UPVOTE_POST_IN_LIST'
export const UPVOTE_SINGLE_POST = 'UPVOTE_SINGLE_POST'
export const DOWNVOTE_SINGLE_POST = 'DOWNVOTE_SINGLE_POST'
export const DOWNVOTE_POST_IN_LIST = 'DOWNVOTE_POST_IN_LIST'



export const grabPosts = posts => ({
  type: GET_POSTS,
  posts
})

export const getPosts = () => dispatch =>
  APIUtils.fetchPosts().then(posts =>
    dispatch(grabPosts(posts))
  )



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

export const grabPost = post => ({
    type: GET_POST_BY_ID,
    post
})

export const getPost = (id) => dispatch => {
    return APIUtils.fetchPostByID(id).then(post =>
          dispatch(grabPost(post))
    )
}


// Vote UP

export const executeVoteUp = post => ({
    type: UPVOTE_SINGLE_POST,
    post
})

export const findAndExecuteVoteUp = post => ({
    type: UPVOTE_POST_IN_LIST,
    post
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
}