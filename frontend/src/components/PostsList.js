import React from 'react'
import PostItem from './PostItem'
import PropTypes from 'prop-types'


const PostsList = ({posts}) => {

    return(
        <div className="PostsList">
            { posts && posts.map( post => {
                return (
                    <PostItem key={post.id} post={post}/>
                )
            } )
            }
        </div>
    )

}

PostsList.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostsList