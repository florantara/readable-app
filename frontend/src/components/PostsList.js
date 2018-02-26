import React from 'react'
import { Link } from 'react-router-dom'
import PostMeta from '../components/PostMeta'

const PostsList = ({ posts }) => {
    return(
        <div className="PostsList">
            { posts && posts.map( post => {
                let date = new Date(post.timestamp)
                return (
                        <div className="PostsList-item" key={post.id}>
                            <h4>
                                <Link to={`/post/${post.id}`}>{post.title} </Link>
                                <small>{date.toDateString()}</small>
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

export default PostsList