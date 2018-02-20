import React, { Component } from 'react'
import Panel from 'muicss/lib/react/panel';
import Button from 'muicss/lib/react/button'
import CommentItem from '../components/CommentItem'
import AddCommentForm from '../components/AddCommentForm'
import { connect } from 'react-redux'
import { getComments, deleteComment, addComment } from '../actions'
import  uuidv1  from 'uuid/v1'

class CommentsList extends Component{

    state={
        newCommentText: '',
        authorName: ''
    }

    onDeleteComment(commentId){
        this.props.deleteComment(commentId)

    }
    onCommentSubmit( e ){
        e.preventDefault()

        // id - Any unique ID. As with posts, UUID is probably the best here.
        // timestamp - [Timestamp] Get this however you want.
        // body - [String]
        // author - [String]
        // parentId - Should match a post id in the database.

        const comment = {
            id: uuidv1(),
            timestamp: Math.floor(Date.now() / 1000),
            body: this.state.newCommentText,
            author: this.state.authorName,
            parentId: this.props.postId
        }
        this.props.addComment(comment)
        this.props.getComments(this.props.postId)

        this.setState({
            newCommentText: '',
            authorName: '',
            showNewCommentForm: false
        })


    }

    onTextareaChange(e){
        this.setState({
            newCommentText: e.target.value
        })
    }

    onAuthorChange(e){
        this.setState({
            authorName: e.target.value
        })
    }

    handleShowCommentForm(){
        this.setState({
            showNewCommentForm: this.state.showNewCommentForm ? false : true
        })
    }

    componentDidMount(){
        this.props.getComments(this.props.postId)
    }

    render(){
        return(
            <Panel className="CommentsList">

                {this.state.showNewCommentForm &&

                    <AddCommentForm
                        onAuthorChange={this.onAuthorChange.bind(this)}
                        authorName={this.state.authorName}
                        onTextareaChange={this.onTextareaChange.bind(this)}
                        textComment={this.state.newCommentText}
                        onCommentSubmit={this.onCommentSubmit.bind(this)}
                        onCancel={this.handleShowCommentForm.bind(this)}
                    />

                }

                { this.props.comments.length > 0 ?
                    [
                        <h4 key='title'>Comments:</h4>,
                        this.props.comments.map( comment => {
                            return (
                                <CommentItem
                                    key={comment.id}
                                    onDeleteComment={(id) => this.onDeleteComment(id)}
                                    author={comment.author}
                                    voteScore={comment.voteScore}
                                    id={comment.id}
                                    body={comment.body}
                                />
                            )
                        } )
                    ]
                    :
                    <h4 className="mui--bg-accent-dark"> No comments. Be the first to add one!</h4>

                }

                <Button
                    className="CommentList-Button"
                    variant="raised"
                    color="accent"
                    size="small"
                    onClick={this.handleShowCommentForm.bind(this)}
                >
                    Add Comment
                </Button>

            </Panel>
        )
    }
}

const mapStateToProps = state => ({
    comments: state.data.comments
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    getComments: (postId) => dispatch( getComments(postId) ),
    deleteComment: (id) => dispatch( deleteComment(id) ),
    addComment: (comment) => dispatch( addComment(comment) )

})


export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)