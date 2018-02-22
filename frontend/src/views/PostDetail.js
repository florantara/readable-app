import React, { Component } from 'react'
import AppBar from '../components/AppBar'
import PostMeta from '../components/PostMeta'
import Container from 'muicss/lib/react/container'
import CommentsList from '../components/CommentsList';
import Panel from 'muicss/lib/react/panel'
import placeCursorAtEnd from '../utils/tools'
import Button from 'muicss/lib/react/button'
import  Parser  from 'html-react-parser'
import { connect } from 'react-redux'
import { getPost, postUpdate } from '../actions'

class PostDetail extends Component {

    state={
        editingTitle: 'false',
        editingBody: 'false'
    }

    componentWillMount(){
        this.props.fetchPost(this.props.match.params.postID)
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
        this.props.updatePost(this.props.match.params.postID, postData)
    }
    render(){

        let time, article

        if ( this.props.post ) {
            time = new Date(this.props.post.timestamp)
            article = Parser(this.props.post.body)
        }


        return(
            <div className="PostDetail">
                <AppBar showCreateButton/>


                    { this.props.post ?

                    <Container>

                        <Panel>
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

                            <aside>
                                <PostMeta
                                    voteScore={this.props.post.voteScore}
                                    commentCount={this.props.comments.length}
                                    id={this.props.post.id}
                                    context="PostDetail"
                                 />
                            </aside>
                            <hr />
                            <article
                                ref="bodyInput"
                                suppressContentEditableWarning
                                contentEditable={this.state.editingBody}
                                onKeyPress={this.handleKeyPress}
                                >
                                {article}

                            </article>
                            <Button size="small" onClick={this.handleBodyEdit} variant="flat" color="primary">
                                { this.state.editingBody === 'true' ? "Save" : "Edit Text" }
                            </Button>

                        </Panel>

                        <CommentsList
                            postId={this.props.post.id}
                        />

                    </Container>

                    :
                    "Loading Post"
                    }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    post: state.data.post,
    comments: state.data.comments
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    fetchPost: (id) => dispatch( getPost(id) ),
    updatePost: (id, postData) => dispatch( postUpdate(id, postData) ),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)