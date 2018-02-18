import React, { Component } from 'react'
import AppBar from '../components/AppBar'
import PostMeta from '../components/PostMeta'
import Container from 'muicss/lib/react/container'
import Panel from 'muicss/lib/react/panel';
import Button from 'muicss/lib/react/button'

import { connect } from 'react-redux'
import { getPost } from '../actions'

class PostDetail extends Component {

    componentWillMount(){
        this.props.fetchPost(this.props.match.params.postID)
    }
    render(){

        let time
        if ( this.props.post ) {
            time = new Date(this.props.post.timestamp)
        }

        return(
            <div className="PostDetail">
                <AppBar />

                <Container>
                    { this.props.post ?

                    <Panel>
                        <h2 className="mui--text-headline">{this.props.post.title}</h2>
                        <p className="mui--text-caption">by <em>{this.props.post.author}</em> on <em>{time.toDateString()}</em></p>

                        <aside>
                            <PostMeta
                                voteScore={this.props.post.voteScore}
                                commentCount={this.props.post.commentCount}
                                id={this.props.post.id}
                                context="PostDetail"
                             />
                        </aside>
                        <hr />

                        <article>
                            {this.props.post.body}
                        </article>


                        <Panel className="CommentsList">

                            { this.props.comments.length > 0 ?
                                [
                                    <h4 key='title' className="mui--bg-primary-dark">{this.props.post.commentCount} comments:</h4>,
                                    this.props.comments.map( comment => {
                                        return (
                                            <div key={comment.id}>
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
                            <div>
                                <h4 className="mui--bg-accent-dark"> No comments. Be the first to add one!</h4>
                                <Button variant="raised">Add Comment</Button>
                            </div>
                            }
                        </Panel>

                    </Panel>
                    :
                    "Loading Post"
                    }
                </Container>
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
    fetchPost: (id) => dispatch( getPost(id) )
})



export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)