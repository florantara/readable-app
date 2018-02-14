import React , { Component } from 'react'
import Container from 'muicss/lib/react/container'
import Panel from 'muicss/lib/react/panel';

import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getPosts } from '../actions'
import AppBar from '../components/AppBar'
import SortBy from '../components/SortBy'
import CategoriesList from '../components/CategoriesList'
import PostsList from '../components/PostsList'

class Homepage extends Component {

    componentWillMount () {
        this.props.fetchData()
    }

    render() {

        let s1 = {textAlign: 'right'};

        let postsInCategory = this.props.posts.filter( post => post.category === this.props.match.params.category )

        return(

            <div>

                <AppBar />

                <Container>
                    <div className="mui--text-caption">
                        <br/>
                        <p><Link to="/">App</Link> > Category: {this.props.match.params.category}</p>
                    </div>
                    <div className="s-h-50"></div>

                    <CategoriesList />

                    <Panel>
                        <Row>
                            <Col md={6}>
                                <p className="mui--text-headline">Posts in {this.props.match.params.category}</p>
                            </Col>
                            <Col md={6} style={s1}>
                                <SortBy />
                            </Col>
                        </Row>


                        <PostsList posts={postsInCategory} />

                        { this.props.loading && "Loading Posts..." }

                    </Panel>

                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.data.posts,
    loading: state.data.loading
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    fetchData: () => dispatch(getPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)