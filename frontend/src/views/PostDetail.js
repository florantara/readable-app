import React, { Component } from 'react'
import AppBar from '../components/AppBar'
import PostMeta from '../components/PostMeta'
import Container from 'muicss/lib/react/container'
import CommentsList from '../components/CommentsList';
import Panel from 'muicss/lib/react/panel'

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
                <AppBar showCreateButton/>


                    { this.props.post ?

                    <Container>

                        <Panel>
                            <h2 className="mui--text-headline">{this.props.post.title}</h2>
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
                            <article>
                                {this.props.post.body}
                            </article>

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

})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)