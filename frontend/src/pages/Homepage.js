import React , { Component } from 'react'
import Container from 'muicss/lib/react/container'
import Panel from 'muicss/lib/react/panel';
import Loading from '../components/Loading'

import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';

import { connect } from 'react-redux'
import * as actions from '../actions/Posts'
import AppBar from '../components/AppBar'
import SortBy from '../components/SortBy'
import CategoriesList from '../components/CategoriesList'
import PostsList from '../components/PostsList'

class Homepage extends Component {

    componentWillMount () {
        this.props.getPosts()
    }

    onSortBy = (option) => {
        this.props.sortPosts(option)
    }

    render() {

        let s1 = {textAlign: 'right'};

        return(

            <div>

                <AppBar showCreateButton/>

                <Container>

                    <CategoriesList />

                    <Panel>
                        <Row>
                            <Col md={6}>
                                <p className="mui--text-headline">Posts</p>
                            </Col>
                            <Col md={6} style={s1}>
                                <SortBy onSortBySelection={this.onSortBy}/>
                            </Col>
                        </Row>


                        <PostsList posts={this.props.posts} />

                        { this.props.loadingPosts && <Loading/> }



                    </Panel>

                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts,
    loadingPosts: state.posts.loadingPosts
})

export default connect(mapStateToProps, actions)(Homepage)