import React from 'react'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import FaHeartO from 'react-icons/lib/fa/heart-o'
import Vote from './Vote'

const PostMeta = ({ commentCount, voteScore, id, context }) => {
    return(
        <div className="list-info">
            {commentCount ?
                (<div className="list-info--comments list-info-item">
                    <FaCommentO/>
                    <span className="mui--text-caption">{commentCount}</span>
                </div>)
                : null
            }

            <div className="list-info--votes list-info-item">
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