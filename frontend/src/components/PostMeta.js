import React from 'react'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import FaHeartO from 'react-icons/lib/fa/heart-o'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'

const PostMeta = ({ commentCount, voteScore }) => {
    return(
        <div className="list-info">
            <div className="list-info-item">
                <FaCommentO/>
                <span className="mui--text-caption">{commentCount}</span>
            </div>
            <div className="list-info-item">
                <FaHeartO/>
                <span className="mui--text-caption">{voteScore}</span>
            </div>
            <div className="list-info-item">
                <FaThumbsOUp className="vote-up"/>
            </div>
            <div className="list-info-item">
                <FaThumbsODown className="vote-down"/>
            </div>
        </div>
    )
}

export default PostMeta