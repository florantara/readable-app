import React from 'react'
import { Link } from 'react-router-dom'
import PostMeta from '../components/PostMeta'
import PropTypes from 'prop-types'

const PostsList = ({ posts }) => {
    return(
        <div className="PostsList">
            { posts && posts.map( post => {
                let date = new Date(post.timestamp)
                return (
                        <div className="PostsList-item" key={post.id}>
                            <h4>
                                <Link to={`/${post.category}/${post.id}`}>{post.title} </Link>
                                <small>by {post.author} on {date.toDateString()}</small>
                            </h4>
                            <PostMeta
                                voteScore={post.voteScore}
                                commentCount={post.commentCount}
                                id={post.id}
                                context="PostsList"
                             />
                        </div>
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