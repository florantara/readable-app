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

    state={
        showImportButton: this.props.importDone === false ? true : false,
        loadingImportedPosts: false

    }

    componentWillMount () {
        this.props.getPosts()
    }

    onImportSomePosts = () => {
        this.props.importSomePosts()
        this.setState({
            showImportButton: false,
            loadingImportedPosts: true
        })
    }

    onSortBy = (option) => {
        this.props.sortPosts(option)
    }

    componentWillReceiveProps( nextProps ){
        if ( nextProps.importDone === true ){
            this.setState({
                loadingImportedPosts: false
            })
        }
    }

    render() {

        let s1 = {textAlign: 'right'};

        return(

            <div>

                <AppBar
                    showCreateButton
                    showImportButton={this.state.showImportButton === true ? true : null}
                    onImportSomePosts={this.onImportSomePosts}
                    importingPosts={this.state.loadingImportedPosts}
                />

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
    loadingPosts: state.posts.loadingPosts,
    importDone: state.posts.importDone
})

export default connect(mapStateToProps, actions)(Homepage)