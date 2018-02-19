import React, { Component } from 'react'
import Panel from 'muicss/lib/react/panel';
import Button from 'muicss/lib/react/button'
import PostMeta from '../components/PostMeta'
import { connect } from 'react-redux'
import { deleteComment } from '../actions'

class CommentsList extends Component{

    onDeleteComment(commentId){
        this.props.deleteComment(commentId)

    }

    render(){
        return(
            <Panel className="CommentsList">

                { this.props.comments.length > 0 ?
                    [
                        <h4 key='title' className="mui--bg-accent-dark">Comments:</h4>,
                        this.props.comments.map( comment => {
                            return (
                                <div key={comment.id}>
                                    <div onClick={this.onDeleteComment.bind(this, comment.id)} className="CommentsList-Delete" title="Delete this comment">&times;</div>
                                    <small>{comment.author} says:</small>
                                    <p>{comment.body}</p>
                                    <PostMeta
                                        voteScore={comment.voteScore}
                                        id={comment.id}
                                        context="Comment"
                                    />
                                </div>
                            )
                        } )
                    ]
                    :
                    <h4 className="mui--bg-accent-dark"> No comments. Be the first to add one!</h4>

                }

                <Button className="CommentList-Button" variant="raised" color="accent" size="small">Add Comment</Button>

            </Panel>
        )
    }
}

const mapStateToProps = state => ({
    comments: state.data.comments
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    deleteComment: (id) => dispatch( deleteComment(id) )

})


export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)