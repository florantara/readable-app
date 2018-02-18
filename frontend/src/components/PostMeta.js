import React from 'react'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import FaHeartO from 'react-icons/lib/fa/heart-o'
import Vote from './Vote'

const PostMeta = ({ commentCount, voteScore, id, context }) => {
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

            <Vote
                id={id}
                context={context}
            />
        </div>
    )
}

export default PostMeta