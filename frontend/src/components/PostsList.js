import React from 'react'
import { Link } from 'react-router-dom'
import PostMeta from '../components/PostMeta'
import FaTrash from 'react-icons/lib/fa/trash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postDelete } from '../actions/Post'

const PostsList = ({ posts, postDelete }) => {

    // Delete Post
    const onDeletePost = (id) =>{
        postDelete(id)
    }
    return(
        <div className="PostsList">
            { posts && posts.map( post => {
                const date = new Date(post.timestamp)
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
                              <FaTrash onClick={() => onDeletePost(post.id)}/>
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

const mapDispatchToProps = dispatch => ({
    dispatch,
    postDelete: (id) => dispatch(postDelete(id))
})

export default connect(null, mapDispatchToProps)(PostsList)