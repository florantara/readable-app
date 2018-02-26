import React from 'react'
import PostMeta from '../components/PostMeta'
import FaTrash from 'react-icons/lib/fa/trash'
import PropTypes from 'prop-types'

const CommentItem = ({author, body, voteScore, id, onDeleteComment}) => {

    const triggerDeleteComment = (commentId) => {
        onDeleteComment(commentId)

    }

    return(
        <div>
            <div
                onClick={() => triggerDeleteComment(id)}
                className="CommentsList-Delete"
                title="Delete this comment"><FaTrash/></div>

            <small>{author} says:</small>
            <p>{body}</p>

            <PostMeta
                voteScore={voteScore}
                id={id}
                context="Comment"
            />
        </div>
    )
}

CommentItem.propTypes = {
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    id:  PropTypes.string.isRequired,
    onDeleteComment: PropTypes.func.isRequired
}

export default CommentItem