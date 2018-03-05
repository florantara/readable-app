import React, { Component } from 'react'
import PostMeta from '../components/PostMeta'
import FaTrash from 'react-icons/lib/fa/trash'
import PropTypes from 'prop-types'
import placeCursorAtEnd from '../utils/tools'
import Button from 'muicss/lib/react/button'

class CommentItem extends Component {

    state = {
        editingComment: 'false'
    }

    // Comment Edit
    handleCommentEdit = () => {
        this.setState({
            editingComment: this.state.editingComment === 'true' ? 'false' : 'true'
        }, () => {
                if ( this.state.editingComment === 'true' ){
                    this.refs.commentBody.focus()
                    placeCursorAtEnd(this.refs.commentBody)
                } else {
                    this.onUpdatePost()
                }
            }
        )

    }

    //Save Comment Edits
    onCommentEditted = (commentId) => {
        this.setState({
            editingComment: 'false'
        })
        this.props.onSaveCommentEditted(commentId, this.refs.commentBody.innerHTML)
    }

    // Update Comment on Enter KeyPress
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.setState({
                editingComment: 'false'
            })
            this.onCommentEditted(this.props.id)
        }
        console.log("handleKeyPress", this.props.id)
    }


    triggerDeleteComment = (commentId) => {
        this.props.onDeleteComment(commentId)

    }

    render(){

        const { author, body, voteScore, id } = this.props;

        return(
            <div>
                <div
                    onClick={() => this.triggerDeleteComment(id)}
                    className="CommentsList-Delete"
                    title="Delete this comment"><FaTrash/></div>

                <small>{author} says:</small>

                <div className="CommentList-Body">
                    <p
                    ref="commentBody"
                    suppressContentEditableWarning
                    contentEditable={this.state.editingComment}
                    onKeyPress={this.handleKeyPress}
                    >
                    {body}
                    </p>
                </div>

                { this.state.editingComment === 'true' ?
                    <Button className="CommentList-Body-editing" size="small" onClick={() => this.onCommentEditted(id)} variant="flat" color="primary">
                        Done
                    </Button>
                    :
                    (<div className="CommentList-Body-edit"><p onClick={() => this.handleCommentEdit(id)}>edit comment</p></div>)
                }

                <PostMeta
                    voteScore={voteScore}
                    id={id}
                    context="Comment"
                />
            </div>
        )
    }

}

CommentItem.propTypes = {
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    id:  PropTypes.string.isRequired,
    onDeleteComment: PropTypes.func.isRequired
}

export default CommentItem