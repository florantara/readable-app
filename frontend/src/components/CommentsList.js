import React, { Component } from 'react'
import Panel from 'muicss/lib/react/panel';
import Button from 'muicss/lib/react/button'
import CommentItem from '../components/CommentItem'
import AddCommentForm from '../components/AddCommentForm'
import { connect } from 'react-redux'
import  * as actions from '../actions/Comments'
import PropTypes from 'prop-types'

class CommentsList extends Component{

    constructor(props) {
        super(props);
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
        this.handleShowCommentForm = this.handleShowCommentForm.bind(this);
        this.onTextareaChange = this.onTextareaChange.bind(this);
    }

    state={
        newCommentText: '',
        authorName: ''
    }

    onDeleteComment(commentId){
        this.props.deleteComment(commentId)

    }

    createGUID = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
    }

    onCommentSubmit( e ){
        e.preventDefault()

        // id - Any unique ID. As with posts, UUID is probably the best here.
        // timestamp - [Timestamp] Get this however you want.
        // body - [String]
        // author - [String]
        // parentId - Should match a post id in the database.

        const comment = {
            id: this.createGUID(),
            timestamp: new Date().getTime(),
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

    onCommentEditted = (id, editedBody) => {

        const commentEdits = {
            timestamp: new Date().getTime(),
            body: editedBody,
        }
        this.props.editComment(commentEdits, id)
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
                        onAuthorChange={this.onAuthorChange}
                        authorName={this.state.authorName}
                        onTextareaChange={this.onTextareaChange}
                        textComment={this.state.newCommentText}
                        onCommentSubmit={this.onCommentSubmit}
                        onCancel={this.handleShowCommentForm}
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
                                    onSaveCommentEditted={(id, edits) => this.onCommentEditted(id, edits)}
                                />
                            )
                        } )
                    ]
                    :
                    <h4> No comments. Be the first to add one!</h4>

                }

                <Button
                    className="CommentList-Button"
                    variant="raised"
                    color="accent"
                    size="small"
                    onClick={this.handleShowCommentForm}
                >
                    Add Comment
                </Button>

            </Panel>
        )
    }
}

const mapStateToProps = state => ({
    comments: state.post.comments
})

CommentsList.propTypes = {
    comments: PropTypes.array.isRequired
}

export default connect(mapStateToProps, actions)(CommentsList)