import React from 'react'
import PostMeta from '../components/PostMeta'

const CommentItem = ({author, body, voteScore, id, onDeleteComment}) => {

    const triggerDeleteComment = (commentId) => {
        console.log("Trigger delete")
        onDeleteComment(commentId)

    }

    return(
        <div>
            <div
                onClick={() => triggerDeleteComment(id)}
                className="CommentsList-Delete"
                title="Delete this comment">&times;</div>

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

export default CommentItem