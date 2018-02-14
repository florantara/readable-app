import React from 'react'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import FaHeartO from 'react-icons/lib/fa/heart-o'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import { Link } from 'react-router-dom'

const PostsList = ({ posts }) => {
    return(
        <div>
            { posts.map( post => {
                return (
                        <div key={post.id}>
                            <h4><Link to={`/post/${post.id}`}>{post.title}? </Link><div className="list-info"> <div className="list-info-item"><FaCommentO/> <span className="mui--text-caption">{post.commentCount}</span> </div> <div className="list-info-item"><FaHeartO/> <span className="mui--text-caption">{post.voteScore}</span> </div> <div className="list-info-item"><FaThumbsOUp className="vote-up"/></div><div className="list-info-item"> <FaThumbsODown className="vote-down"/></div> </div></h4>
                        </div>
                    )
                } )
            }
        </div>
    )
}

export default PostsList