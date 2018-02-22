import React , { Component } from 'react'
import Container from 'muicss/lib/react/container'
import Panel from 'muicss/lib/react/panel';

import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getPosts, importSomePosts } from '../actions'
import AppBar from '../components/AppBar'
import SortBy from '../components/SortBy'
import CategoriesList from '../components/CategoriesList'
import PostsList from '../components/PostsList'

class Homepage extends Component {

    state={
        showImportButton: true
    }

    componentWillMount () {
        this.props.fetchData()
    }

    onImportSomePosts = () => {
        this.props.importPosts()
        this.setState({
            showImportButton: false
        })
    }

    render() {

        let s1 = {textAlign: 'right'};

        return(

            <div>

                <AppBar showCreateButton/>

                <Container>
                    <div className="mui--text-caption">
                        <br/>
                        <p><Link to="/">App</Link> > Homepage</p>
                    </div>
                    <div className="s-h-50"></div>

                    <CategoriesList />

                    <Panel>
                        <Row>
                            <Col md={6}>
                                <p className="mui--text-headline">Posts</p>
                            </Col>
                            <Col md={6} style={s1}>
                                <SortBy />
                            </Col>
                        </Row>


                        <PostsList posts={this.props.posts} />

                        { this.props.loading && "Loading Posts..." }



                    </Panel>


                    {this.state.showImportButton ? (<div onClick={this.onImportSomePosts}>Import Some Posts</div>) : null}
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
    fetchData: () => dispatch(getPosts()),
    importPosts: () => dispatch(importSomePosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)