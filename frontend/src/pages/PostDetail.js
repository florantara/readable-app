import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AppBar from '../components/AppBar'
import PostMeta from '../components/PostMeta'
import Container from 'muicss/lib/react/container'
import CommentsList from '../components/CommentsList';
import Panel from 'muicss/lib/react/panel'
import placeCursorAtEnd from '../utils/tools'
import Button from 'muicss/lib/react/button'
import Parser  from 'html-react-parser'
import FaTrash from 'react-icons/lib/fa/trash'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions/Post'

class PostDetail extends Component {

    state={
        editingTitle: 'false', // These need to be strings because they are going to be in the HTML attribute
        editingBody: 'false',
        postDeleted: false
    }

    componentWillMount(){
        this.props.getPost(this.props.match.params.postID)
    }


    // Title Edit
    handleTitleEdit = () => {
        this.setState({
            editingTitle: this.state.editingTitle === 'true' ? 'false' : 'true'
        }, () => {
                if ( this.state.editingTitle === 'true' ){
                    this.refs.titleInput.focus()
                    placeCursorAtEnd(this.refs.titleInput)
                } else {
                    this.onUpdatePost()
                }
            }
        )

    }

    // Article Body Edit
    handleBodyEdit = () => {
        this.setState({
            editingBody: this.state.editingBody === 'true' ? 'false' : 'true'
        }, () => {
                if ( this.state.editingBody === 'true' ){
                    this.refs.bodyInput.focus()
                    placeCursorAtEnd(this.refs.bodyInput)
                } else {
                    this.onUpdatePost()
                }
            }
        )

    }

    // Update Post on Enter KeyPress
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.setState({
                editingTitle: 'false'
            })
            this.onUpdatePost()
        }
    }

    // Update Post
    onUpdatePost(){
        const postData = {
            title: this.refs.titleInput.innerHTML,
            body: this.refs.bodyInput.innerHTML
        }
        this.props.postUpdate(this.props.match.params.postID, postData)
    }

    // Delete Post
    onDeletePost = () =>{
        this.props.postDelete(this.props.match.params.postID)
        this.setState({
            postDeleted: true
        })
    }
    render(){

        if (this.state.postDeleted === true) {
            return <Redirect to="/" />
        }

        let time, article

        if ( this.props.post ) {
            time = new Date(this.props.post.timestamp)
            article = Parser(this.props.post.body || "")
        }

        return(
            <div className="PostDetail">
                <AppBar showCreateButton/>


                { this.props.post ?

                    this.props.post.body ?

                    <Container>

                        <Link to="/">
                            <p>Back to Homepage</p>
                        </Link>

                        <Panel>
                            <div className="PostDetail-tools">


                                <PostMeta
                                    voteScore={this.props.post.voteScore}
                                    commentCount={this.props.comments.length}
                                    id={this.props.post.id}
                                    context="PostDetail"
                                 />

                                 <FaTrash onClick={this.onDeletePost}/>

                            </div>
                            <h2 className="mui--text-headline"
                                ref="titleInput"
                                suppressContentEditableWarning
                                contentEditable={this.state.editingTitle}
                                onKeyPress={this.handleKeyPress}
                                >

                                {this.props.post.title}

                            </h2>
                            <Button size="small" onClick={this.handleTitleEdit} variant="flat" color="primary">
                                { this.state.editingTitle === 'true' ? "Save" : "Edit title" }
                            </Button>

                            <p className="mui--text-caption">by <em>{this.props.post.author}</em> on <em>{time.toDateString()}</em></p>

                            <hr />
                            <article
                                ref="bodyInput"
                                suppressContentEditableWarning
                                contentEditable={this.state.editingBody}
                                onKeyPress={this.handleKeyPress}
                                >
                                {article}

                            </article>
                            <Button size="small" onClick={this.handleBodyEdit} variant="flat" color="primary" style={{float: 'right'}}>
                                { this.state.editingBody === 'true' ? "Save" : "Edit Text" }
                            </Button>

                        </Panel>

                        <CommentsList
                            postId={this.props.post.id}
                        />

                    </Container>

                    :

                    <Container>
                        <Panel>
                            <h1>Oops! This post doesn't exist anymore!</h1>
                            <Link to="/">
                                <Button size="small" variant="flat" color="primary">
                                    Go back to Homepage
                                </Button>
                            </Link>
                        </Panel>
                    </Container>

                :
                <Loading/>
                }

            </div>
        )
    }
}

const mapStateToProps = state => ({
    post: state.post.post,
    comments: state.post.comments
})

export default connect(mapStateToProps, actions)(PostDetail)