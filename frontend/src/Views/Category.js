import React , { Component } from 'react'
import Container from 'muicss/lib/react/container'
import Panel from 'muicss/lib/react/panel';

import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import Loading from '../components/Loading'

import { connect } from 'react-redux'
import { getPosts } from '../actions'
import AppBar from '../components/AppBar'
import SortBy from '../components/SortBy'
import CategoriesList from '../components/CategoriesList'
import PostsList from '../components/PostsList'

class Category extends Component {

    componentWillMount () {
        this.props.fetchData()
    }

    render() {

        let s1 = {textAlign: 'right'};

        let postsInCategory = this.props.posts.filter( post => post.category === this.props.match.params.category )

        let activeCategory = this.props.match.params.category

        return(

            <div>

                <AppBar showCreateButton/>

                <Container>

                    <CategoriesList activeCategory={activeCategory}/>

                    <Panel>
                        <Row>
                            <Col md={6}>
                                <p className="mui--text-headline">Posts in: <em>{this.props.match.params.category}</em></p>
                            </Col>
                            <Col md={6} style={s1}>
                                <SortBy />
                            </Col>
                        </Row>


                        <PostsList posts={postsInCategory} />

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

const mapDispatchToProps = dispatch => ({
    dispatch,
    fetchData: () => dispatch(getPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)