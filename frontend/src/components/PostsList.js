import React from 'react'
import { Link } from 'react-router-dom'
import PostMeta from '../components/PostMeta'

const PostsList = ({ posts }) => {
    return(
        <div>
            { posts && posts.map( post => {
                return (
                        <div key={post.id}>
                            <h4>
                                <Link to={`/post/${post.id}`}>{post.title}? </Link>
                                <PostMeta
                                    voteScore={post.voteScore}
                                    commentCount={post.commentCount}
                                    postId={post.id}
                                    context="PostsList"
                                 />
                            </h4>
                        </div>
                    )
                } )
            }
        </div>
    )
}

export default PostsList