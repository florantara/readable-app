import React, { Component } from 'react'
import AppBar from '../components/AppBar'
import PostMeta from '../components/PostMeta'
import Container from 'muicss/lib/react/container'
import Panel from 'muicss/lib/react/panel';

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

                        <hr />
                        <article>
                            {this.props.post.body}
                        </article>

                        <aside>
                            <PostMeta
                                voteScore={this.props.post.voteScore}
                                commentCount={this.props.post.commentCount}
                                postId={this.props.post.id}
                                context="PostDetail"
                             />
                        </aside>

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
    post: state.data.post
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    fetchPost: (id) => dispatch( getPost(id) )
})



export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)